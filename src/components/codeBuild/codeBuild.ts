import { ITags } from '../Template'
import { ICodeBuildArtifactData } from './artifacts'

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

    Source?: 'Source' // *
    SecondarySources?: ['Source']

    Cache?: 'ProjectCache'
    Environment?: 'Environment' // *

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
