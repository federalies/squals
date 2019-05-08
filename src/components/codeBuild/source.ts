import { BuildSpec } from './buildspec'
import { indexableStrOrNumber, first, firstKey, firstVal } from './artifacts'
import * as Url from 'url'

/**
 *
 * @description create a Code Build Source Data Elemen
 * @param input
 * @example
 * var a = sourceConfig()
 */
export const sourceConfig = (input: IcodeBuildsource): ICodeBuildSource => {
  //  => {
  if (!input) {
    return {}
  } else {
    //
    // common
    const [key, _value] = Object.entries(input)[0]
    let ret: ICodeBuildSource = { Type: 'NO_SOURCE' }
    let value = _value as IcodeBuildSource
    if (value.buildSpec) ret['BuildSpec'] = value.buildSpec
    if (value.gitCloneDepth) ret['GitCloneDepth'] = value.gitCloneDepth
    if (value.sourceId) ret['SourceIdentifier'] = value.sourceId
    if ('reportBuild' in value) ret['ReportBuildStatus'] = !!value.reportBuild
    if ('allowInsureSsl' in value) ret['InsecureSsl'] = value.allowInsureSsl
    if ('allowFetchGitSubModules' in value) {
      ret['GitSubmodulesConfig'] = { FetchSubmodules: !!value.allowFetchGitSubModules }
    }

    // handle location not pipeline
    if (
      's3' in input ||
      'codeCommit' in input ||
      'github' in input ||
      'githubEnterprise' in input ||
      'bitbucket' in input
    ) {
      let value = _value as IcodeBuildSource_notPipeline
      ret = { ...ret, Type: TypeTransform(firstKey(input)) }
      if (value.location) ret['Location'] = value.location
    } else if (key === 'pipeline') {
      // yes pipeline
      ret = { ...ret, Type: TypeTransform(key) }
    } else {
      // uri string key
      let uri: string
      try {
        uri = new Url.URL(key).hostname
      } catch (e) {
        // or invalid
        throw new Error('the repo url given is not a valid URL')
      }
      ret = { ...ret, Type: TypeTransform(uri) }
    }
    return ret
  }
}

/**
 *
 * @description Type Transform
 * @param input
 * @example
 * console.log(TypeTransform() // "NO_SOURCE"
 * console.log(TypeTransform('')) // "NO_SOURCE"
 * console.log(TypeTransform('githubEnterprise')) // "GITHUB_ENTERPRISE"
 * console.log(TypeTransform('s3')) // "S3"
 * console.log(TypeTransform('codeCommit')) // "CODECOMMIT"
 * console.log(TypeTransform('bitbucket')) // "BITBUCKET"
 * console.log(TypeTransform('https://github.com/federalies/squals.git')) // "GITHUB"
 * console.log(TypeTransform('https://bitbucket.org/federalies/squals.git')) // "BITBUCKET"
 * console.log(TypeTransform('https://git-codecommit.region-ID.amazonaws.com/v1/repos/repo-name')) // "CODECOMMIT"
 * console.log(TypeTransform('https://somevaliddomain.com/withRepo/path')) // "GITHUB_ENTERPRISE"
 * var a TypeTransform('ftp://somevaliddomain.com/withRepo/path') // throws Error
 */
export const TypeTransform = (input: IcodeSourceTypes): ICodeBuildTypes => {
  if (!input) {
    return 'NO_SOURCE'
  } else {
    switch (input) {
      case 'githubEnterprise':
        return 'GITHUB_ENTERPRISE'
      case '':
        return 'NO_SOURCE'
      case 's3':
      case 'codeCommit':
      case 'bitbucket':
        return input.toUpperCase() as ICodeBuildTypes
      default:
        let domain: string
        try {
          domain = new Url.URL(input).hostname
        } catch (e) {
          throw new Error('the key was not a valid URL')
        }
        if (domain.toLowerCase().includes('github.com')) {
          return 'GITHUB'
        } else if (domain.toLowerCase().includes('bitbucket.org')) {
          return 'BITBUCKET'
        } else if (domain.toLowerCase().match(/codecommit\.[-(\w)]+\.amazonaws.com/g)) {
          return 'CODECOMMIT'
        } else {
          console.warn(`assuming this URL: ${domain} is github enterprise url`)
          return 'GITHUB_ENTERPRISE'
        }
    }
  }
}

export interface ICodeBuildSource {
  Type?: ICodeBuildTypes

  Location?: string
  // ignored for PIPELINE
  // s3 needs bucket+path to .zip or folder
  // CodeCommit - https clone URL
  // github - https clone URL
  // bitbucket - https clone URL
  BuildSpec?: string | BuildSpec
  GitCloneDepth?: number // not supported with s3 source Type
  GitSubmodulesConfig?: {
    FetchSubmodules: boolean
  }
  InsecureSsl?: boolean // github enterrpise only
  ReportBuildStatus?: boolean
  SourceIdentifier?: string
  Auth?: {
    Resource?: string
    Type?: string
  }
}

export type IcodeBuildsource =
  | IcodeBuildSource_httpsCloneUrl
  | { s3: IcodeBuildSource_notPipeline }
  | { codeCommit: IcodeBuildSource_notPipeline }
  | { bitbucket: IcodeBuildSource_notPipeline }
  | { github: IcodeBuildSource_notPipeline }
  | { githubEnterprise: IcodeBuildSource_notPipeline }
  | { pipeline: IcodeBuildSource_pipeline }

export interface IcodeBuildSource_httpsCloneUrl {
  [url: string]: IcodeBuildSource_pipeline
}

export interface IcodeBuildSource {
  buildSpec?: string
  gitCloneDepth?: number
  sourceId?: string
  allowFetchGitSubModules?: boolean
  allowInsureSsl?: boolean
  reportBuild?: boolean
}

export interface IcodeBuildSource_pipeline extends IcodeBuildSource {
  location?: never
}

export interface IcodeBuildSource_notPipeline extends IcodeBuildSource {
  location: string
}

export type ICodeBuildTypes =
  | 'S3'
  | 'BITBUCKET'
  | 'CODECOMMIT'
  | 'CODEPIPELINE'
  | 'GITHUB'
  | 'GITHUB_ENTERPRISE'
  | 'NO_SOURCE'
export type IcodeSourceTypes =
  | 's3'
  | 'codeCommit'
  | 'github'
  | 'githubEnterprise'
  | 'bitbucket'
  | string
