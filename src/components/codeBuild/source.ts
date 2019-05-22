import { BuildSpec } from './buildspec'
import * as Url from 'url'

export const sourceConfig = (
  input?: IcodeBuildsource | IcodeBuildsource[]
): ICodeBuildSourceConfig => {
  if (Array.isArray(input)) {
    const _in = [...input]

    if (_in.length > 1) {
      return {
        Source: sources(_in.shift()),
        SecondarySources: sources(_in)
      } as ICodeBuildSourceConfig_multi
    } else {
      return {
        Source: sources(_in.pop())
      } as ICodeBuildSourceConfig_one
    }
  } else {
    return {
      Source: sources(input)
    } as ICodeBuildSourceConfig_one
  }
}

export const sources = (
  input?: IcodeBuildsource | IcodeBuildsource[]
): ICodeBuildSource | ICodeBuildSource[] => {
  // maintain input shape array->array | obj->obj
  return Array.isArray(input) ? input.map(v => sourceItem(v)) : sourceItem(input)
}

/**
 *
 * @description create a Code Build Source Data Elemen
 * @param input
 * @see
 * @example
 * var a = sources({'https://github.com/federalies/squals')
 */
export const sourceItem = (input?: IcodeBuildsource): ICodeBuildSource => {
  if (!input) {
    return { Type: 'NO_SOURCE' }
  } else {
    if (typeof input === 'string') {
      let ret: ICodeBuildSource = {
        Type: typeTransform(input, false),
        Location: input,
        BuildSpec: 'buildspec.yml'
      }
      return ret
    } else {
      // common
      const [key, _value] = Object.entries(input)[0]
      let value = _value as IcodeBuildSource

      let ret: ICodeBuildSource = { Type: 'NO_SOURCE' }

      if (value.buildSpec) {
        ret['BuildSpec'] =
          typeof value.buildSpec === 'string'
            ? value.buildSpec
            : (value.buildSpec as BuildSpec).toYAML()
      }
      if (value.gitCloneDepth) ret['GitCloneDepth'] = value.gitCloneDepth
      if (value.sourceId) ret['SourceIdentifier'] = value.sourceId
      if ('reportBuild' in value) ret['ReportBuildStatus'] = !!value.reportBuild
      if ('allowInsureSsl' in value) ret['InsecureSsl'] = value.allowInsureSsl
      if ('allowFetchGitSubModules' in value) {
        ret['GitSubmodulesConfig'] = { FetchSubmodules: !!value.allowFetchGitSubModules }
      }

      // handle location not pipeline
      if (
        key === 's3' ||
        key === 'codeCommit' ||
        key === 'github' ||
        key === 'githubEnterprise' ||
        key === 'bitbucket'
      ) {
        let value = _value as IcodeBuildSource_wLoc
        ret = { ...ret, Type: typeTransform(key) }
        if (value.location) ret['Location'] = value.location
      } else if (key === 'pipeline') {
        // yes pipeline
        ret = { ...ret, Type: typeTransform(key) }
      } else {
        // uri string key
        let uriHostname: string
        try {
          uriHostname = new Url.URL(key).hostname
        } catch (e) {
          // or invalid
          throw new Error('the repo url given is not a valid URL')
        }
        ret = { ...ret, Type: typeTransform(uriHostname), Location: key }
      }
      return ret
    }
  }
}

/**
 *
 * @description Type Transform
 * @param input
 * @example
 * console.log(typeTransform() // "NO_SOURCE"
 * console.log(typeTransform('')) // "NO_SOURCE"
 * console.log(typeTransform('githubEnterprise')) // "GITHUB_ENTERPRISE"
 * console.log(typeTransform('s3')) // "S3"
 * console.log(typeTransform('codeCommit')) // "CODECOMMIT"
 * console.log(typeTransform('bitbucket')) // "BITBUCKET"
 * console.log(typeTransform('https://github.com/federalies/squals.git')) // "GITHUB"
 * console.log(typeTransform('https://bitbucket.org/federalies/squals.git')) // "BITBUCKET"
 * console.log(typeTransform('https://git-codecommit.region-ID.amazonaws.com/v1/repos/repo-name')) // "CODECOMMIT"
 * console.log(typeTransform('https://somevaliddomain.com/withRepo/path')) // "GITHUB_ENTERPRISE"
 * var a typeTransform('ftp://somevaliddomain.com/withRepo/path') // throws Error
 */
export const typeTransform = (
  hostFQDN?: IcodeSourceTypes,
  validatedDomain = true
): ICodeBuildTypes => {
  if (!hostFQDN) {
    return 'NO_SOURCE'
  } else {
    switch (hostFQDN) {
      case 'githubEnterprise':
        return 'GITHUB_ENTERPRISE'
      case 'pipeline':
      case 'codepipeline':
        return 'CODEPIPELINE'
      case 's3':
      case 'github':
      case 'codeCommit':
      case 'bitbucket':
        return hostFQDN.toUpperCase() as ICodeBuildTypes
      default:
        if (hostFQDN.toLowerCase().includes('github.com')) {
          return 'GITHUB'
        } else if (hostFQDN.toLowerCase().includes('bitbucket.org')) {
          return 'BITBUCKET'
        } else if (hostFQDN.toLowerCase().match(/codecommit\.[-(\w)]+\.amazonaws.com/g)) {
          return 'CODECOMMIT'
        } else {
          if (!validatedDomain) {
            let domain: string = hostFQDN
            try {
              domain = new Url.URL(hostFQDN).hostname
              console.warn(`assuming this URL: ${domain} is github enterprise url`)
              return 'GITHUB_ENTERPRISE'
            } catch (err) {
              console.error(hostFQDN)
              throw new Error(
                'the URI must be valid + starting with `http(s)://` - Even for a github enterprise domain name'
              )
            }
          } else {
            console.warn(`assuming this URL: ${hostFQDN} is github enterprise url`)
            return 'GITHUB_ENTERPRISE'
          }
        }
    }
  }
}

export interface ICodeBuildSource {
  Type: ICodeBuildTypes
  Location?: string
  // ignored for PIPELINE
  // s3 needs bucket+path to .zip or folder
  // CodeCommit - https clone URL
  // github - https clone URL
  // bitbucket - https clone URL
  BuildSpec?: string
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

export type ICodeBuildSourceConfig = ICodeBuildSourceConfig_one | ICodeBuildSourceConfig_multi
export interface ICodeBuildSourceConfig_one {
  Source: ICodeBuildSource
}
export interface ICodeBuildSourceConfig_multi extends ICodeBuildSourceConfig_one {
  SecondarySources: ICodeBuildSource[]
}

export type IcodeBuildsource =
  | string
  | IcodeBuildSource_httpsCloneUrl
  | { s3: IcodeBuildSource_wLoc }
  | { codeCommit: IcodeBuildSource_wLoc }
  | { bitbucket: IcodeBuildSource_wLoc }
  | { github: IcodeBuildSource_wLoc }
  | { githubEnterprise: IcodeBuildSource_wLoc }
  | { pipeline: IcodeBuildSource_noLoc }

export interface IcodeBuildSource_httpsCloneUrl {
  [url: string]: IcodeBuildSource_noLoc
}

export interface IcodeBuildSource {
  buildSpec?: string | BuildSpec
  gitCloneDepth?: number
  sourceId?: string
  allowFetchGitSubModules?: boolean
  allowInsureSsl?: boolean
  reportBuild?: boolean
}

export interface IcodeBuildSource_noLoc extends IcodeBuildSource {
  location?: never
}

export interface IcodeBuildSource_wLoc extends IcodeBuildSource {
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
