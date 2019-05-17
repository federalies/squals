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

export const firstKey = (data: object): string => {
  return Object.keys(data)[0]
}
export const firstVal = (data: object): object => {
  return Object.values(data)[0]
}

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
        if (props.logs && props.logs.s3) {
          this.Properties.LogsConfig = {
            ...this.Properties.LogsConfig,
            S3Logs: {
              Status: 'ENABLED',
              Location: props.logs.s3.loc,
              EncryptionDisabled: !('encOff' in props.logs.s3) ? false : props.logs.s3.encOff
            }
          }
        }
        if (props.logs && props.logs.cw) {
          const [GroupName, StreamName] = props.logs.cw.split('.')

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
          const _in = Array.isArray(props.triggers) ? props.triggers : new Array(props.triggers)

          this.Properties.Triggers = {
            Webhook: true,
            FilterGroups: _in.map(v => {
              return {
                Type: v.type,
                Pattern:
                  v.type !== 'EVENT'
                    ? v.pattern
                    : Array.isArray(v.pattern)
                      ? v.pattern.join(', ')
                      : v.pattern,
                ExcludeMatchedPattern: v.isMatchingPattern
              }
            })
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

  artifacts (input?: Iartifact | Iartifact[]): CodeBuildProject {
    if (input) {
      this.Properties = { ...this.Properties, ...artifactsConfig(input) }
    } else {
      const { Artifacts, SecondaryArtifacts, ...theRest } = this.Properties
      this.Properties = {
        ...theRest,
        ...artifactsConfig()
      }
    }
    return this
  }
  env (env?: IcodeBuildEnv): CodeBuildProject {
    if (env) {
      this.Properties = { ...this.Properties, ...envConfig(env) }
    } else {
      const { Environment, ...theRest } = this.Properties
      this.Properties = { ...theRest, ...envConfig() }
    }
    return this
  }
  envPreset (
    preset: imagePresets,
    opts: {
    size?: 'small' | 'medium' | 'large'
    os?: 'linux' | 'windows'
    image?: string
    }
  ): CodeBuildProject {
    const { os, size, image } = envPresets(preset, {
      size: opts.size,
      os: opts.os,
      image: opts.image
    })

    return this.env({ os, size, image })
  }
  cache (input: IcodeBuildcache): CodeBuildProject {
    if (input) {
      if (Array.isArray(input)) {
        // must be LOCAL
        this.Properties = { ...this.Properties, Cache: { Type: 'LOCAL', Modes: input } }
      } else {
        // must be s3 string
        const { Bucket, Key } = s3uri.urlToOptions(input)
        this.Properties = {
          ...this.Properties,
          Cache: { Type: 'S3', Location: `${Bucket}/${Key}` }
        }
      }
    } else {
      this.Properties = { ...this.Properties, Cache: { Type: 'NO_CACHE' } }
    }
    return this
  }
  logs (_in: IcodeBuildLogs): CodeBuildProject {
    const defaulted = { ...{ s3: { encOff: false } }, ..._in }

    if ('cw' in defaulted && defaulted.cw) {
      const [GroupName, StreamName] = defaulted.cw.split(':')

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

    if ('s3' in defaulted && 'loc' in defaulted.s3) {
      const { Bucket, Key } = s3uri.urlToOptions(defaulted.s3.loc)
      const Location = `${Bucket}/${Key}`

      this.Properties.LogsConfig = {
        ...this.Properties.LogsConfig,
        S3Logs: {
          Status: 'ENABLED',
          Location,
          EncryptionDisabled: defaulted.s3.encOff
        }
      }
    } else {
      delete (this.Properties.LogsConfig as any).S3Logs
    }

    return this
  }
  sources (input: IcodeBuildsource | IcodeBuildsource[]): CodeBuildProject {
    this.Properties = { ...this.Properties, ...sourceConfig(input) }
    return this
  }
  triggers (input?: IcodeBuildTriggerKinds | IcodeBuildTriggerKinds[]): CodeBuildProject {
    if (input) {
      const _in = Array.isArray(input) ? input : new Array(input)
      this.Properties.Triggers = {
        Webhook: true,
        FilterGroups: _in.map(v => {
          return {
            Type: v.type,
            Pattern:
              v.type !== 'EVENT'
                ? v.pattern
                : Array.isArray(v.pattern)
                  ? v.pattern.join(', ')
                  : v.pattern,
            ExcludeMatchedPattern: v.isMatchingPattern
          }
        })
      }
    } else {
      delete this.Properties.Triggers
    }
    return this
  }
  vpc (_in: IcodeBuildVpc): CodeBuildProject {
    this.Properties.VpcConfig = {
      SecurityGroupIds: Array.isArray(_in.secGrpIds) ? _in.secGrpIds : new Array(_in.secGrpIds),
      Subnets: Array.isArray(_in.subnets) ? _in.subnets : new Array(_in.subnets),
      VpcId: _in.id
    }
    return this
  }
  enableBadge (turnOn: boolean): CodeBuildProject {
    this.Properties.BadgeEnabled = turnOn
    return this
  }
  encryptionKey (encKey: string): CodeBuildProject {
    this.Properties.EncryptionKey = encKey
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
  triggers?: IcodeBuildTriggerKinds | IcodeBuildTriggerKinds[]
  tags?: Itags | Itags[]
}

export interface IcodeBuildVpc {
  id: string
  secGrpIds: string | string[]
  subnets: string | string[]
}

type IcodeBuildcache = ILocalCacheMode[] | undefined | string /* s3uri */

type ILocalCacheMode = 'LOCAL_SOURCE_CACHE' | 'LOCAL_DOCKER_LAYER_CACHE' | 'LOCAL_CUSTOM_CACHE'

type IcodeBuildTriggerKinds =
  | IcodeBuildTriggerFiterGroup_base
  | IcodeBuildTriggerFiterGroup_event
  | IcodeBuildTriggerFiterGroup_actor
  | IcodeBuildTriggerFiterGroup_file
  | IcodeBuildTriggerFiterGroup_head

export interface IcodeBuildLogs {
  cw?: string // GOURP.THREAD expects a dot separation
  s3?: { loc: string; encOff?: boolean }
}

export interface IcodeBuildTriggerFiterGroup_base {
  isMatchingPattern: boolean
  pattern: string
  type: 'BASE_REF'
}

export interface IcodeBuildTriggerFiterGroup_event {
  isMatchingPattern: boolean
  pattern: eventPatterns | eventPatterns[]
  type: 'EVENT'
}

export interface IcodeBuildTriggerFiterGroup_actor {
  isMatchingPattern: boolean
  pattern: string
  type: 'ACTOR_ACCOUNT_ID'
}

export interface IcodeBuildTriggerFiterGroup_file {
  isMatchingPattern: boolean
  pattern: string
  type: 'FILE_PATH'
}

export interface IcodeBuildTriggerFiterGroup_head {
  isMatchingPattern: boolean
  pattern: string
  type: 'HEAD_REF'
}

type eventPatterns =
  | 'PUSH'
  | 'PULL_REQUEST_CREATED'
  | 'PULL_REQUEST_UPDATED'
  | 'PULL_REQUEST_REOPENED'
