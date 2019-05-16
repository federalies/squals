import s3uri from 's3-url'
import { ITags, IGetAtt, Itags, IRef } from '../Template'
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
      SecurityGroupIds: string[]
      Subnets: string[]
      VpcId: string
    }

    Tags?: ITags[] // max len === 50
  }

  constructor (props: IcodeBuild | string | IGetAtt | IRef) {
    this.Type = 'AWS::CodeBuild::Project'

    let defaultName = `${randomWord()}${new Randoma({
      seed: new Date().getTime()
    }).integer()}`

    if (typeof props === 'string') {
      this.name = defaultName
      this.Properties = {
        BadgeEnabled: true,
        ServiceRole: props,
        ...sourceConfig(),
        ...envConfig(),
        ...artifactsConfig()
      }
    } else {
      // input == object
      if ('Fn:GetAtt' in (props as IGetAtt)) {
        this.name = defaultName
        this.Properties = {
          BadgeEnabled: true,
          ServiceRole: props as IGetAtt,
          ...sourceConfig(),
          ...artifactsConfig(),
          ...envConfig()
        }
      }
      if ('Ref' in (props as IRef)) {
        this.name = defaultName
        this.Properties = {
          BadgeEnabled: true,
          ServiceRole: props as IRef,
          ...sourceConfig(),
          ...artifactsConfig(),
          ...envConfig()
        }
      } else {
        const _props = props as IcodeBuild
        this.name = { name: defaultName, ..._props }.name
        this.Properties = {
          BadgeEnabled: !('enabledBadge' in _props) ? true : _props.enabledBadge,
          ServiceRole: _props.serviceRoleArn,
          ...sourceConfig(_props.sources),
          ...artifactsConfig(_props.artifacts),
          ...envConfig(_props.env)
        }
        this.Properties.Cache = !_props.cache
          ? { Type: 'NO_CACHE' }
          : Array.isArray(_props.cache)
            ? { Type: 'LOCAL', Modes: _props.cache }
            : {
              Type: 'S3',
              Location: `${s3uri.urlToOptions(_props.cache).Bucket}/${
                s3uri.urlToOptions(_props.cache).Key
              }`
            }

        if (_props.description) this.Properties.Description = _props.description
        if (_props.logs) {
          this.Properties.LogsConfig = {
            S3Logs: { Status: 'ENABLED' },
            CloudWatchLogs: { Status: 'ENABLED' }
          }
        }
        _props.logs
        // if(_props.name)
        // if(_props.preset)
        // if(_props.tags)
        // if(_props.timeOutBuildAfter)
        // if(_props.triggers)
        // if(_props.vpc)
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
  vpc (_in: {
  SecGrpIds: string | string[]
  subnets: string | string[]
  vpcId: string
  }): CodeBuildProject {
    this.Properties.VpcConfig = {
      SecurityGroupIds: Array.isArray(_in.SecGrpIds) ? _in.SecGrpIds : new Array(_in.SecGrpIds),
      Subnets: Array.isArray(_in.subnets) ? _in.subnets : new Array(_in.subnets),
      VpcId: _in.vpcId
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
  logs?: IcodeBuildLogs
  enabledBadge?: boolean
  cache?: IcodeBuildcache
  vpc?: string
  triggers?: string
  tags?: Itags | Itags[]
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
  cw?: string
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
