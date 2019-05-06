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

    Cache?: 'ProjectCache'
    Environment?: 'Environment' // *

    Artifacts?: 'Artifacts' // *
    SecondaryArtifacts?: [' Artifacts']

    LogsConfig?: 'LogsConfig'

    Source?: 'Source' // *
    SecondarySources?: ['Source']

    Triggers?: 'ProjectTriggers'
    VpcConfig?: 'VpcConfig'
    Tags?: ['Tag']
  }

  constructor () {
    this.name = ''
    this.Type = 'AWS::CodeBuild::Project'
    this.Properties = {}
  }
  Ref () {}
  Arn () {}
}
