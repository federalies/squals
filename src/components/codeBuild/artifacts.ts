/**
 * Assuming Type = 'S3'
 * If
 * `Location` = `myBucket`
 * `path` = `MyArtifacts`,
 * namespaceType = `BUILD_ID`,
 * name = `MyArtifact.zip`
 *
 * then
 * the output artifact =  `myBucket\MyArtifacts/<build-ID>/MyArtifact.zip`
 *
 * --OR--
 *
 * If
 * `path` = `/`,
 * namespaceType = `BUILD_ID`,
 * name = `MyArtifact.zip`
 *
 * then
 * the output artifact =  `MyArtifacts/<build-ID>`
 */

import s3Url from 's3-url'
import path from 'path'

export type ICodeBuildArtifactReturn = ICodeBuildArtifactReturn_one | ICodeBuildArtifactReturn_multi
export interface ICodeBuildArtifactReturn_one {
  Artifacts: ICodeBuildArtifactData
}
export interface ICodeBuildArtifactReturn_multi {
  Artifacts: ICodeBuildArtifactData
  SecondaryArtifacts: ICodeBuildArtifactData[]
}

/**
 * @description Multi-Use Function where Array has special meaning.
 * @param input
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-codebuild-project-artifacts.html>
 * @example
 * var a = artifactsConfig({})
 * var aTricky = artifactsConfig([{}])
 * var bSecondary = artifactsConfig([{},{}])
 */
export const artifactsConfig = (input?: Iartifact | Iartifact[]): ICodeBuildArtifactReturn => {
  if (Array.isArray(input)) {
    const _in = [...input]
    if (_in.length > 1) {
      return {
        Artifacts: artifacts(_in.shift()),
        SecondaryArtifacts: artifacts(_in)
      } as ICodeBuildArtifactReturn_multi
    } else {
      return {
        Artifacts: artifacts(_in.pop())
      } as ICodeBuildArtifactReturn_one
    }
  } else {
    return {
      Artifacts: artifacts(input)
    } as ICodeBuildArtifactReturn_one
  }
}

/**
 * @description artifact builder
 * @param input
 * @example
 * var a  = artifacts()
 * var b  = artifacts('s3://bucket/key')
 * var c  = artifacts(['s3://bucket/key'])
 * var d  = artifacts({'s3://bucket/key':{id:'artifacId'}})
 * var e  = artifacts(['s3://bucket/key','s3://bucket2/key2'])
 */
export const artifacts = (
  input?: Iartifact | Iartifact[]
): ICodeBuildArtifactData | ICodeBuildArtifactData[] => {
  // maintain input shape array->array | obj->obj
  return Array.isArray(input) ? input.map(v => artifactItem(v)) : artifactItem(input)
}

/**
 *
 * @description generates an artifact.
 * @param input
 * @example
 * var fromUndefIn = artifactItem()
 * var fromStrIn = artifactItem('s3://bucket/path/to/dir/<BUILD_ID>/name')
 * var fromS3KeyIn = artifactItem({'s3://bucket/path/to/dir/<BUILD_ID>/name.zip':{id:"artifact", override:true, encOff:true}})
 * var fromS3Obj = artifactItem({s3:{ bucket:'bucket', path:'some/path',  useBuildId: true, name: 'myFile', zip:true }})
 * var fromPipeObj = artifactItem({pipeline: {id:'artifactId', zip:true, override:true, encOff:true }})
 * var fromEmptyStrIn = artifactItem({'none': {id:'myArtifactId' }})
 */
export const artifactItem = (input?: Iartifact): ICodeBuildArtifactData => {
  if (input) {
    if (typeof input === 'string') {
      // example:a
      return handleStr(input)
    } else if (Array.isArray(input) || Object.keys(input).length > 1) {
      throw new Error('only doing 1 key at a time.')
    } else {
      if ('s3' in input && 'bucket' in input.s3) {
        // {'s3':{bucket:''. name:'', ...opts}}
        return handleS3type(input as Iartifcat_s3)
      } else if ('pipeline' in input) {
        // {'pipeline':{opts}}
        return handlePipeline(input as Iartifcat_pipeline)
      } else if ('none' in input) {
        // {'':{opts}}
        return handleNoArtifact(input as Iartifcat_namedNoArtifact)
      } else if (firstKey(input).startsWith('s3://')) {
        // {s3://bucket/path/file.zip:{opts}}
        return handleS3UriObj(input as Iartifcat_s3uri)
      } else {
        throw new Error(
          `was expcting : string | {s3:{...}} | {pipeline:{...}} | {none:{...}} | {<s3://bucket/path/key>:{...}} |`
        )
      }
    }
  } else {
    // input === undefined --> no artifact
    return { Type: 'NO_ARTIFACTS' }
  }
}

export const handleStr = (s3string: string): ICodeBuildArtifactData => {
  if (s3string.toLowerCase().startsWith('s3://')) {
    const s3data = s3Url.urlToOptions(s3string)

    if (s3data.Bucket && s3data.Key) {
      let s3path: string = s3string
        .slice('s3://'.length)
        .slice(s3data.Bucket.length)
        .replace(/([<:]*BUILD_ID+[>]*[/]*)/gi, '')

      return handleS3type({
        s3: {
          bucket: s3data.Bucket,
          name: path.parse(s3data.Key).name,
          path: path.parse(s3path).dir.slice(1),
          useBuildId: s3string.includes(`<BUILD_ID>`) || s3string.includes(`:BUILD_ID`),
          zip: s3string.endsWith(`.zip`)
        }
      })
    } else {
      throw new Error('expected s3uri should start with s3:// AND have a bucket and key present')
    }
  } else {
    throw new Error('epxecting a valid s3uri which should start with `s3://` ')
  }
}

export const handleS3UriObj = (data: Iartifcat_s3uri): ICodeBuildArtifactData => {
  const s3key = Object.keys(data)[0]
  const artifactOpts = Object.values(data)[0]
  const s3data = s3Url.urlToOptions(s3key)

  if (s3data.Bucket && s3data.Key) {
    //
    let s3path: string = s3key
      .slice('s3://'.length)
      .slice(s3data.Bucket.length)
      .replace(/([<:]*BUILD_ID+[>]*[/]*)/gi, '')

    return handleS3type({
      s3: {
        bucket: s3data.Bucket,
        name: path.parse(s3data.Key).name,
        path: path.parse(s3path).dir.slice(1),
        useBuildId: s3key.includes(`<BUILD_ID>`) || s3key.includes(`:BUILD_ID`),
        zip: s3key.endsWith(`.zip`),
        encOff: artifactOpts.encOff,
        id: artifactOpts.id,
        override: artifactOpts.override
      }
    })
  } else {
    throw new Error('expected s3uri starts with s3:// , has bucket and has key')
  }
}
export const handleS3type = (input: Iartifcat_s3): ICodeBuildArtifactData => {
  const data = input as Iartifcat_s3
  const ret: ICodeBuildArtifact_s3 = {
    Type: 'S3',
    Location: data.s3.bucket,
    Name: data.s3.name
  }
  if (data.s3.id) ret['ArtifactIdentifier'] = data.s3.id
  if (data.s3.path) ret['Path'] = data.s3.path
  if ('encOff' in data.s3) ret['EncryptionDisabled'] = !!data.s3.encOff
  if ('override' in data.s3) ret['OverrideArtifactName'] = !!data.s3.override
  if ('useBuildId' in data.s3) ret['NamespaceType'] = data.s3.useBuildId ? 'BUILD_ID' : 'NONE'
  if ('zip' in data.s3) ret['Packaging'] = data.s3.zip ? 'ZIP' : 'NONE'
  return ret
}

export const handlePipeline = (input: Iartifcat_pipeline): ICodeBuildArtifactData => {
  const ret: ICodeBuildArtifact_noneS3 = { Type: 'CODEPIPELINE' }
  if (input.pipeline.id) ret['ArtifactIdentifier'] = input.pipeline.id
  if ('zip' in input.pipeline) ret['Packaging'] = input.pipeline.zip ? 'ZIP' : 'NONE'
  if ('override' in input.pipeline) ret['OverrideArtifactName'] = !!input.pipeline.override
  return ret
}

export const handleNoArtifact = (input: Iartifcat_namedNoArtifact) => {
  const ret: ICodeBuildArtifact_noneS3 = { Type: 'NO_ARTIFACTS' }
  const val = input['none']
  if (val.id) ret['ArtifactIdentifier'] = val.id
  return ret
}

export const firstKey = function<T> (input: T): string {
  if (Array.isArray(input)) {
    return Object.keys(input[0])[0]
  } else {
    return Object.keys(input)[0]
  }
}

// #region interfaces

// type indexableStrOrNumber<T> = { [key: string]: T }[] | { [key: string]: T }

export interface ICodeBuildArtifact {
  Artifacts?: ICodeBuildArtifactData
  SecondaryArtifacts?: ICodeBuildArtifactData[]
}

export type Iartifact =
  | Iartifcat_s3uri
  | Iartifcat_s3
  | Iartifcat_pipeline
  | Iartifcat_namedNoArtifact
  | string

interface Iartifcat_s3uri {
  [s3uri: string]: {
    id?: string
    override?: boolean
    encOff?: boolean
  }
}

interface Iartifcat_s3 {
  s3: {
    bucket: string
    name: string
    path?: string
    useBuildId?: boolean
    zip?: boolean
    id?: string
    override?: boolean
    encOff?: boolean
  }
}

interface Iartifcat_pipeline {
  pipeline: {
    id?: string
    zip?: boolean
    override?: boolean
  }
}

interface Iartifcat_namedNoArtifact {
  none: { id?: string }
}

export type ICodeBuildArtifactData = ICodeBuildArtifact_noneS3 | ICodeBuildArtifact_s3

export interface ICodeBuildArtifact_noneS3 {
  Type: 'CODEPIPELINE' | 'NO_ARTIFACTS' | 'S3'
  ArtifactIdentifier?: string
  OverrideArtifactName?: boolean
  Packaging?: 'NONE' | 'ZIP' // default = NONE
}

export interface ICodeBuildArtifact_s3 extends ICodeBuildArtifact_noneS3 {
  Type: 'S3'
  Location: string // aka bucket
  Name: string
  NamespaceType?: 'BUILD_ID' | 'NONE' // default = NONE
  Path?: string // default = ''
  EncryptionDisabled?: boolean
}

// #endregion interfaces
