export class CodePipelineCustomActionType {
  Type: string
  Properties: {
    Provider: string
    Settings: object
    Version: string
  }
  constructor (props = {}) {
    this.Type = 'AWS::CodePipeline::CustomActionType'
    this.Properties = { Provider: 'String', Settings: {}, Version: '' }
  }
}

export class CodePipelinePipeline {
  Type = 'AWS::CodePipeline::Pipeline'
  Properties?: {
    Name: string
    Settings: object
    Version: string
  }

  // this.Properties = {}
  // this.Properties.Name = String
  // this.Properties.ArtifactStores = [
  //   {
  //     ArtifactStore: {
  //       Location: String,
  //       Type: String,
  //       EncryptionKey: {
  //         Id: String,
  //         Type: String
  //       }
  //     },
  //     Region: String
  //   }
  // ]
  // this.Properties.DisableInboundStageTransitions = [
  //   {
  //     Reason: String,
  //     StageName: String
  //   }
  // ]
  // this.Properties.RestartExecutionOnUpdate = Boolean
  // this.Properties.RoleArn = String
  // this.Properties.Stages = [
  //   {
  //     Name: String,
  //     Actions: [
  //       {
  //         ActionTypeId: {
  //           Category: String,
  //           Owner: String,
  //           Provider: String,
  //           Version: String
  //         },
  //         Configuration: { Key: 'Value' },
  //         InputArtifacts: [
  //           {
  //             Name: String
  //           }
  //         ],
  //         Name: String,
  //         OutputArtifacts: [
  //           {
  //             Name: String
  //           }
  //         ],
  //         Region: String,
  //         RoleArn: String,
  //         RunOrder: 1
  //       }
  //     ],
  //     Blockers: [
  //       {
  //         Name: String,
  //         Type: String
  //       }
  //     ]
  //   }
  // ]

  constructor (props = {}) {
    this.Type = 'AWS::CodePipeline::Pipeline'
  }
}
export class CodePipelineWebhook {
  Type = 'AWS::CodePipeline::Webhook'
  //
  //
  //
  // this.Properties = {}
  // this.Properties.Authentication = String
  // this.Properties.TargetPipeline = String
  // this.Properties.TargetAction = String
  // this.Properties.Name = String
  // this.Properties.TargetPipelineVersion = 'Int'
  // this.Properties.RegisterWithThirdParty = Boolean
  // this.Properties.AuthenticationConfiguration = {
  //     AllowedIPRange: String,
  //     SecretToken: String
  // }
  // this.Properties.Filters = [
  // {
  //     JsonPath: String,
  //     MatchEquals: String
  // }
  // ]

  constructor (props = {}) {
    this.Type = 'AWS::CodePipeline::Webhook'
  }
}
