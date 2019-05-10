import { ITags } from '../Template'
import { ICodeBuildArtifactData } from './artifacts'
import { ICodeBuildSource } from './source'
import { ICodeBuildEnvironmentData } from './environment'

export class CodeBuildProject {
  name: string
  Type: 'AWS::CodeBuild::Project'
  Properties: {
    Name?: string
    BadgeEnabled?: boolean
    Description?: string
    EncryptionKey?: string
    ServiceRole?: string // *
    QueuedTimeoutInMinutes?: number
    TimeoutInMinutes?: number

    Artifacts?: ICodeBuildArtifactData // *
    SecondaryArtifacts?: ICodeBuildArtifactData[]

    Source?: ICodeBuildSource // *
    SecondarySources?: ICodeBuildSource[]
    Environment?: ICodeBuildEnvironmentData

    Cache?: {
      Type: 'LOCAL' | 'NO_CACHE' | 'S3'
      Location?: 'NO_CACHE' | 'LOCAL' | string // s3bucket/prefix
      Modes?: string[] // use only with local
      // LOCAL_SOURCE_CACHE
      // LOCAL_DOCKER_LAYER_CACHE
      // LOCAL_CUSTOM_CACHE
    }

    LogsConfig?: {
      CloudWatchLogs?: {
        Status: string
        GroupName?: string
        StreamName?: string
      }
      S3Logs?: {
        Status: string
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

    Tags?: ITags
  }

  constructor () {
    this.name = ''
    this.Type = 'AWS::CodeBuild::Project'
    this.Properties = {}
  }
  Ref () {}
  Arn () {}
}

export type IFilterGroup = IFilterGroup_nonEvent | IFilterGroup_Event

export interface IFilterGroup_nonEvent {
  Type: 'ACTOR_ACCOUNT_ID' | 'BASE_REF' | 'FILE_PATH' | 'HEAD_REF'
  Pattern: string // regex pattern
  ExcludeMatchedPattern?: boolean
}

export interface IFilterGroup_Event {
  Type: 'EVENT'
  Pattern: EventTypes | EventTypes[]
  ExcludeMatchedPattern?: boolean
}

type EventTypes = 'PUSH' | 'PULL_REQUEST_CREATED' | 'PULL_REQUEST_UPDATED'
