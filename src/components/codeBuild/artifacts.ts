import s3Url from 's3-url'

/**
 * @description Multi-Use Function where Array has special meaning.
 * @param input
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-codebuild-project-artifacts.html>
 * @example
 * var a = artifactsConfig({})
 * var aTricky = artifactsConfig([{}])
 * var bSecondary = artifactsConfig([{},{}])
 */
export const artifactsConfig = (input: Iartifact | Iartifact[]) => {
  if (Array.isArray(input)) {
    const _in = [...input]
    if (_in.length > 2) {
      return {
        Artifacts: artifacts(_in.shift()),
        SecondaryArtifacts: artifacts(_in)
      }
    } else {
      return {
        Artifacts: artifacts(_in.pop())
      }
    }
  } else {
    return {
      Artifacts: artifacts(input)
    }
  }
}

export const artifacts = (
  input: Iartifact | Iartifact[]
): ICodeBuildArtifactData | ICodeBuildArtifactData[] => {
  // maintain input shape array->array | obj->obj
  return Array.isArray(input) ? input.map(v => artifactItem(v)) : artifactItem(input)
}

/**
 *
 * @description generate an artifact.
 * @param input
 * @example
 * var a = artifactItem('s3://bucket/path/to/dir/<BUILD_ID>/name')
 * var b = artifactItem({'s3://bucket/path/to/dir/<BUILD_ID>/name.zip':{id:"artifact", override:true, encOff:true}})
 * var c = artifactItem({s3:{ bucket:'bucket', path:'some/path',  useBuildId: true, name: 'myFile', zip:true }})
 * var d = artifactItem({pipeline: {id:'artifactId', zip:true, override:true, encOff:true }})
 * var e = artifactItem({'': {id:'myArtifactId' })
 * var f = artifactItem()``
 *
 */
export const artifactItem = (input: Iartifact): ICodeBuildArtifactData => {
  if (input) {
    if (Object.keys(input).length > 1) {
      throw new Error('only doing 1 key at a time.')
    } else {
      if (typeof input === 'string') {
        // example:a
        if (input.startsWith('s3://')) {
          const r = s3Url.urlToOptions(input)
          if (r.Bucket && r.Key) {
            return { Type: 'S3', Location: r.Bucket, Name: r.Key }
          } else {
            throw new Error('expected s3uri starts with s3:// , has bucket and has key')
          }
        } else {
          throw new Error('not a valid s3 uri')
        }
      } else {
        if ('s3' in input) {
          // example: c
          const ret: ICodeBuildArtifact_s3 = { Type: 'S3', Location: 'bucket', Name: 'name' }
          return ret
        } else if ('pipeline' in input) {
          // example: d
          const ret: ICodeBuildArtifact_noneS3 = { Type: 'CODEPIPELINE' }
          return ret
        } else if ('' in input) {
          // example: e
          return { Type: 'NO_ARTIFACTS' }
        } else if (firstKey(input).startsWith('s3://')) {
          const s3data = s3Url.urlToOptions(firstKey(input))
          if (s3data.Bucket && s3data.Key) {
            return { Type: 'S3', Location: s3data.Bucket, Name: s3data.Key }
          } else {
            throw new Error('expected s3uri starts with s3:// , has bucket and has key')
          }
        } else {
          throw new Error(
            `was expcting : string | {s3:{...}} | {pipeline:{...}} | {'':{...}} | {<s3://bucket/path/key>:{...}} |`
          )
        }
      }
    }
  } else {
    // example: f
    // no artifact
    return { Type: 'NO_ARTIFACTS' }
  }
}

type indexableStrorNumber = { [key: string]: object }[] | { [key: string]: object }

export const firstKey = (input: indexableStrorNumber): string => {
  if (Array.isArray(input)) {
    return Object.keys(input[0])[0]
  } else {
    return Object.keys(input)[0]
  }
}

export const firstVal = (input: indexableStrorNumber): object => {
  if (Array.isArray(input)) {
    return Object.values(input[0])[0]
  } else {
    return Object.values(input)[0]
  }
}
export const first = (input: indexableStrorNumber): object => {
  if (Array.isArray(input)) {
    return input[0]
  } else {
    const k = Object.keys(input)[0]
    return { [k]: input[k] }
  }
}

export interface ICodeBuildArtifact {
  Artifacts?: ICodeBuildArtifactData
  SecondaryArtifacts?: ICodeBuildArtifactData[]
}

export type Iartifact =
  | Iartifcat_s3uri
  | Iartifcat_s3
  | Iartifcat_pipeline
  | Iartifcat_namedNoArtifact
  | undefined
  | string

interface Iartifcat_s3uri {
  [uri: string]: { id?: 'artifact'; override?: true; encOff?: true }
}

interface Iartifcat_s3 {
  s3: {
    bucket: string
    path?: string
    useBuildId?: boolean
    name?: string
    zip?: boolean
  }
}

interface Iartifcat_pipeline {
  pipeline: {
    id?: 'artifactId'
    zip?: true
    override?: true
    encOff: true
  }
}

interface Iartifcat_namedNoArtifact {
  '': { id?: 'artifactId' }
}

export type ICodeBuildArtifactData = ICodeBuildArtifact_noneS3 | ICodeBuildArtifact_s3

export interface ICodeBuildArtifact_noneS3 {
  Type: 'CODEPIPELINE' | 'NO_ARTIFACTS' | 'S3'
  ArtifactIdentifier?: string
  OverrideArtifactName?: boolean
  Packaging?: 'NONE' | 'ZIP' // default = NONE
}

export interface ICodeBuildArtifact_s3 extends ICodeBuildArtifact_noneS3 {
  Location: string // aka bucket
  NamespaceType?: 'BUILD_ID' | 'NONE' // default = NONE
  Name: string
  Path?: string // default = ''
  EncryptionDisabled?: boolean
}

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
