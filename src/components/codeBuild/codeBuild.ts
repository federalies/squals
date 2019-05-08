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

    Cache?: 'ProjectCache'
    Environment?: ICodeBuildEnvironmentData

    LogsConfig?: 'LogsConfig'

    Triggers?: 'ProjectTriggers'
    VpcConfig?: 'VpcConfig'
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
