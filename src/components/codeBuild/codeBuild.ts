import s3uri from 's3-url'
import { ITags, IGetAtt, Itags, IRef, Tags } from '../Template'
import { ICodeBuildArtifactData, Iartifact, artifactsConfig } from './artifacts'
import { ICodeBuildSource, IcodeBuildsource, sourceConfig } from './source'
import {
  ICodeBuildEnvironmentData,
  IcodeBuildEnv,
  envPresets,
  imagePresets,
  envConfig
} from './environment'
import Randoma from 'randoma'
import randomWord from 'random-word'

// export const firstKey = (data: object): string => {
//   return Object.keys(data)[0]
// }
// export const firstVal = (data: object): object => {
//   return Object.values(data)[0]
// }

export class CodeBuildProject {
  name: string
  Type: 'AWS::CodeBuild::Project'
  Properties: {
    Artifacts: ICodeBuildArtifactData
    ServiceRole: string | IGetAtt | IRef
    Source: ICodeBuildSource
    Environment: ICodeBuildEnvironmentData

    Name?: string // [0,255]
    Description?: string // [0,255]

    BadgeEnabled?: boolean

    EncryptionKey?: string

    QueuedTimeoutInMinutes?: number // [5, 480]
    TimeoutInMinutes?: number

    SecondaryArtifacts?: ICodeBuildArtifactData[] // max len === 12

    SecondarySources?: ICodeBuildSource[] // // max len === 12

    Cache?: {
      Type: 'LOCAL' | 'NO_CACHE' | 'S3'
      Location?: string // s3bucket/prefix ignored for LOCAL and NO_CACHE
      Modes?: ILocalCacheMode[] // use only with local
    }
    LogsConfig?: {
      CloudWatchLogs?: {
        Status: 'ENABLED' | 'DISABLED'
        GroupName?: string
        StreamName?: string
      }
      S3Logs?: {
        Status: 'ENABLED' | 'DISABLED'
        EncryptionDisabled?: boolean
        Location?: string
      }
    }
    Triggers?: {
      Webhook?: boolean
      FilterGroups?: IFilterGroup[]
    }
    VpcConfig?: {
      VpcId: string
      SecurityGroupIds: string[]
      Subnets: string[]
    }
    Tags?: ITags[] // max len === 50
  }

  static triggerEventNameTransform (event: string): string {
    switch (event) {
      case 'event':
        return 'EVENT'
      case 'base':
        return 'BASE_REF'
      case 'actor':
        return 'ACTOR_ACCOUNT_ID'
      case 'path':
        return 'FILE_PATH'
      case 'head':
        return 'HEAD_REF'
      default:
        throw new Error('invalid top level key for the event object')
    }
  }

  static triggerFilterGroupConfig (
    input: IcodeBuildTriggerTypes | IcodeBuildTriggerTypes[]
  ): { FilterGroups: IFilterGroup[] } {
    const ret = (Array.isArray(input) ? input : new Array(input)).map(v => {
      const eventType = Object.keys(v)[0]
      const filterData = Object.values(v)[0]

      if (eventType === 'event') {
        return {
          Type: CodeBuildProject.triggerEventNameTransform(eventType) as IFilterGroupKinds,
          Pattern: Array.isArray(filterData.pattern)
            ? filterData.pattern.join(',').toUpperCase()
            : filterData.pattern.toUpperCase(),
          ExcludeMatchedPattern: !('isExclusion' in filterData) ? true : filterData.isExclusion
        }
      } else {
        return {
          Type: CodeBuildProject.triggerEventNameTransform(eventType) as IFilterGroupKinds,
          Pattern: filterData.pattern,
          ExcludeMatchedPattern: !('isExclusion' in filterData) ? true : filterData.isExclusion
        }
      }
    })

    return { FilterGroups: ret }
  }

  constructor (props: IcodeBuild | string | IGetAtt | IRef) {
    this.Type = 'AWS::CodeBuild::Project'

    let defaultName = `${randomWord()}${new Randoma({
      seed: new Date().getTime()
    }).integer()}`
    this.name = defaultName
    // input is string
    if (typeof props === 'string') {
      this.Properties = {
        BadgeEnabled: true,
        ServiceRole: props,
        ...sourceConfig(),
        ...envConfig(),
        ...artifactsConfig()
      }
    } else {
      // input is object
      if (['Fn::GetAtt', 'Ref'].includes(Object.keys(props)[0])) {
        this.Properties = {
          BadgeEnabled: true,
          ServiceRole: props as IGetAtt | IRef,
          ...sourceConfig(),
          ...artifactsConfig(),
          ...envConfig()
        }
      } else {
        props = props as IcodeBuild
        this.name = { name: defaultName, ...props }.name

        this.Properties = {
          BadgeEnabled: !('enabledBadge' in props) ? true : props.enabledBadge,
          ServiceRole: props.serviceRoleArn,
          ...sourceConfig(props.sources),
          ...artifactsConfig(props.artifacts),
          ...envConfig(props.env)
        }
        this.Properties.Cache = !props.cache
          ? { Type: 'NO_CACHE' }
          : Array.isArray(props.cache)
            ? { Type: 'LOCAL', Modes: props.cache }
            : {
              Type: 'S3',
              Location: `${s3uri.urlToOptions(props.cache).Bucket}/${
                s3uri.urlToOptions(props.cache).Key
              }`
            }

        if (props.description) this.Properties.Description = props.description
        if (props.logs && 's3' in props.logs) {
          this.Properties.LogsConfig = {
            ...this.Properties.LogsConfig,
            S3Logs: {
              Status: 'ENABLED',
              Location: props.logs.s3.loc,
              EncryptionDisabled: !('encOff' in props.logs.s3) ? false : props.logs.s3.encOff
            }
          }
        }
        if (props.logs && 'cw' in props.logs) {
          let GroupName: string, StreamName: string

          if (props.logs.cw.includes(':')) {
            ;[GroupName, StreamName] = props.logs.cw.split(':')
          } else if (props.logs.cw.includes('.')) {
            ;[GroupName, StreamName] = props.logs.cw.split('.')
          } else {
            throw new Error(
              'the <CodeBuildProject>.logs.cw string is assumed to be a string separated by a : or .'
            )
          }
          this.Properties.LogsConfig = {
            ...this.Properties.LogsConfig,
            CloudWatchLogs: {
              Status: 'ENABLED',
              GroupName,
              StreamName
            }
          }
        }

        if (props.name) this.Properties.Name = props.name
        if (props.preset) {
          this.Properties = { ...this.Properties, ...envConfig(envPresets(props.preset)) }
        }
        if (props.tags) this.Properties = { ...this.Properties, ...Tags(props.tags) }
        if (props.timeOutBuildAfter) this.Properties.TimeoutInMinutes = props.timeOutBuildAfter

        if (props.triggers) {
          this.Properties.Triggers = {
            Webhook: true,
            ...CodeBuildProject.triggerFilterGroupConfig(props.triggers)
          }
        }

        if (props.vpc) {
          this.Properties.VpcConfig = {
            VpcId: props.vpc.id,
            SecurityGroupIds: Array.isArray(props.vpc.secGrpIds)
              ? props.vpc.secGrpIds
              : new Array(props.vpc.secGrpIds),
            Subnets: Array.isArray(props.vpc.subnets)
              ? props.vpc.subnets
              : new Array(props.vpc.subnets)
          }
        }
      }
    }
  }
  Ref (): IRef {
    return { Ref: this.name }
  }
  Arn (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'Arn'] }
  }

  artifacts (input?: Iartifact | Iartifact[] | null): CodeBuildProject {
    if (input === null) {
      // not removable
      this.Properties = { ...this.Properties, ...artifactsConfig() }
    } else {
      this.Properties = { ...this.Properties, ...artifactsConfig(input) }
    }
    return this
  }
  env (env?: IcodeBuildEnv | null): CodeBuildProject {
    if (env === null) {
      const { Environment, ...theRest } = this.Properties
      this.Properties = { ...theRest, ...envConfig() }
    } else {
      this.Properties = { ...this.Properties, ...envConfig(env) }
    }

    return this
  }
  envPreset (
    preset: imagePresets,
    opts: {
    size?: 'small' | 'medium' | 'large'
    os?: 'linux' | 'windows'
    image?: string
    } = { size: 'small', os: 'linux' }
  ): CodeBuildProject {
    const { os, size, image } = envPresets(preset, {
      size: opts.size,
      os: opts.os,
      image: opts.image
    })

    return this.env({ os, size, image })
  }
  cache (input?: IcodeBuildcache | null): CodeBuildProject {
    if (input !== null) {
      if (input) {
        if (Array.isArray(input)) {
          // must be LOCAL mode
          this.Properties.Cache = { Type: 'LOCAL', Modes: input }
        } else {
          // input:'s3://string'
          if (!input.startsWith('s3://')) {
            throw new Error(
              'string caches are assumed to be an S3 locaiton - which should be formatted as s3://<bucket>/<pathprefixed/keyname>'
            )
          } else {
            const { Bucket, Key } = s3uri.urlToOptions(input)
            this.Properties.Cache = { Type: 'S3', Location: `${Bucket}/${Key}` }
          }
        }
      } else {
        // input:void
        this.Properties.Cache = { Type: 'NO_CACHE' }
      }
    } else {
      // input:null
      this.Properties.Cache = { Type: 'NO_CACHE' }
    }
    return this
  }
  logs (_in: IcodeBuildLogs | null): CodeBuildProject {
    if (_in === null) {
      delete this.Properties.LogsConfig
    } else {
      if ('cw' in _in) {
        let GroupName: string, StreamName: string

        if (_in.cw.includes(':')) {
          ;[GroupName, StreamName] = _in.cw.split(':')
        } else if (_in.cw.includes('.')) {
          ;[GroupName, StreamName] = _in.cw.split('.')
        } else {
          throw new Error(
            'the <CodeBuildProject>.logs.cw string is assumed to be a string separated by a : or .'
          )
        }
        this.Properties.LogsConfig = {
          ...this.Properties.LogsConfig,
          CloudWatchLogs: {
            Status: 'ENABLED',
            GroupName,
            StreamName
          }
        }
      } else {
        delete (this.Properties.LogsConfig as any).CloudWatchLogs
      }
      if ('s3' in _in && 'loc' in _in.s3) {
        if (!_in.s3.loc.startsWith('s3://')) {
          throw new Error(
            'string caches are assumed to be an S3 locaiton - which should be formatted as s3://<bucket>/<pathprefixed/keyname>'
          )
        } else {
          const { Bucket, Key } = s3uri.urlToOptions(_in.s3.loc)
          const Location = `${Bucket}/${Key}`

          this.Properties.LogsConfig = {
            ...this.Properties.LogsConfig,
            S3Logs: {
              Status: 'ENABLED',
              Location,
              EncryptionDisabled: !('encOff' in _in.s3) ? false : _in.s3.encOff
            }
          }
        }
      } else {
        delete (this.Properties.LogsConfig as any).S3Logs
      }
    }

    return this
  }
  sources (input?: IcodeBuildsource | IcodeBuildsource[] | null): CodeBuildProject {
    if (input === null) {
      // not fully removeable
      this.Properties = { ...this.Properties, ...sourceConfig() }
    } else {
      this.Properties = { ...this.Properties, ...sourceConfig(input) }
    }
    return this
  }
  triggers (input: IcodeBuildTriggerTypes | IcodeBuildTriggerTypes[] | null): CodeBuildProject {
    if (input !== null) {
      this.Properties.Triggers = {
        Webhook: true,
        ...CodeBuildProject.triggerFilterGroupConfig(input)
      }
    } else {
      delete this.Properties.Triggers
    }
    return this
  }
  vpc (_in: IcodeBuildVpc | null): CodeBuildProject {
    if (_in !== null) {
      this.Properties.VpcConfig = {
        SecurityGroupIds: Array.isArray(_in.secGrpIds) ? _in.secGrpIds : new Array(_in.secGrpIds),
        Subnets: Array.isArray(_in.subnets) ? _in.subnets : new Array(_in.subnets),
        VpcId: _in.id
      }
    } else {
      delete this.Properties.VpcConfig
    }
    return this
  }
  enableBadge (turnOn: boolean = true): CodeBuildProject {
    this.Properties.BadgeEnabled = turnOn
    return this
  }
  encryptionKey (encKey: string | null): CodeBuildProject {
    if (encKey !== null) {
      this.Properties.EncryptionKey = encKey
    } else {
      delete this.Properties.EncryptionKey
    }
    return this
  }
  toJSON (): object {
    const { name, ...obj } = this
    return { [name]: obj }
  }
}

export type IFilterGroupKinds = 'EVENT' | 'ACTOR_ACCOUNT_ID' | 'BASE_REF' | 'FILE_PATH' | 'HEAD_REF'
export interface IFilterGroup {
  Type: IFilterGroupKinds
  Pattern: string // regex pattern or comma separated
  ExcludeMatchedPattern?: boolean
}

// type EventTypes = 'PUSH' | 'PULL_REQUEST_CREATED' | 'PULL_REQUEST_UPDATED'

export interface IcodeBuild {
  // irreducable
  serviceRoleArn: string | IGetAtt | IRef

  // defaultables
  sources?: IcodeBuildsource // empty-> NO_SOURCE
  artifacts?: Iartifact | Iartifact[] // empty-> NO_SOURCE
  env?: IcodeBuildEnv // min:1 -- defaultable  small:linux - aws/codebuild/standard:2.0 'small:linux:node'
  preset?: imagePresets // ez config options for env

  // optionals
  name?: string
  description?: string
  timeOutBuildAfter?: number
  enabledBadge?: boolean

  logs?: IcodeBuildLogs
  cache?: IcodeBuildcache
  vpc?: IcodeBuildVpc
  triggers?: IcodeBuildTriggerTypes | IcodeBuildTriggerTypes[]
  tags?: Itags | Itags[]
}

export interface IcodeBuildVpc {
  id: string
  secGrpIds: string | string[]
  subnets: string | string[]
}

type IcodeBuildcache = ILocalCacheMode[] | string /* s3uri */

type ILocalCacheMode = 'LOCAL_SOURCE_CACHE' | 'LOCAL_DOCKER_LAYER_CACHE' | 'LOCAL_CUSTOM_CACHE'

export type IcodeBuildLogs = IcodeBuildLogs_cw | IcodeBuildLogs_s3 | IcodeBuildLogs_both

export interface IcodeBuildLogs_cw {
  cw: string // GROUP.THREAD expects a dot or colon separation
}
export interface IcodeBuildLogs_s3 {
  s3: { loc: string; encOff?: boolean }
}
export interface IcodeBuildLogs_both {
  cw: string // GROUP.THREAD expects a dot or colon separation
  s3: { loc: string; encOff?: boolean }
}

type IcodeBuildTriggerTypes =
  | IcodeBuildTrigger_event
  | IcodeBuildTrigger_base
  | IcodeBuildTrigger_actor
  | IcodeBuildTrigger_path
  | IcodeBuildTrigger_head

export interface IcodeBuildTrigger_event {
  event: {
    pattern: eventPatterns_lower | eventPatterns_lower[]
    isExclusion?: boolean
  }
}
export interface IcodeBuildTrigger_base {
  base: { pattern: string; isExclusion?: boolean }
}
export interface IcodeBuildTrigger_actor {
  actor: { pattern: string; isExclusion?: boolean }
}
export interface IcodeBuildTrigger_path {
  path: { pattern: string; isExclusion?: boolean }
}
export interface IcodeBuildTrigger_head {
  head: { pattern: string; isExclusion?: boolean }
}

type eventPatterns_lower =
  | 'push'
  | 'pull_request_created'
  | 'pull_request_updated'
  | 'pull_request_reopened'
