export class CodePipelineCustomActionType {
  constructor (props = {}) {
    this.Type = 'AWS::CodePipeline::CustomActionType'
    this.Properties = {}
    this.Properties.Provider = 'String'
    this.Properties.Vettings = 'Settings'
    this.Properties.Version = 'String'
  }
}
export class CodePipelinePipeline {
  constructor (props = {}) {
    this.Type = 'AWS::CodePipeline::Pipeline'
    this.Properties = {}
    this.Properties.Name = String
    this.Properties.ArtifactStores = [
      {
        ArtifactStore: {
          Location: String,
          Type: String,
          EncryptionKey: {
            Id: String,
            Type: String
          }
        },
        Region: String
      }
    ]
    this.Properties.DisableInboundStageTransitions = [
      {
        Reason: String,
        StageName: String
      }
    ]
    this.Properties.RestartExecutionOnUpdate = Boolean
    this.Properties.RoleArn = String
    this.Properties.Stages = [
      {
        Name: String,
        Actions: [
          {
            ActionTypeId: {
              Category: String,
              Owner: String,
              Provider: String,
              Version: String
            },
            Configuration: { Key: 'Value' },
            InputArtifacts: [
              {
                Name: String
              }
            ],
            Name: String,
            OutputArtifacts: [
              {
                Name: String
              }
            ],
            Region: String,
            RoleArn: String,
            RunOrder: 1
          }
        ],
        Blockers: [
          {
            Name: String,
            Type: String
          }
        ]
      }
    ]
  }
}
export class CodePipelineWebhook {
  constructor (props = {}) {
    this.Type = 'AWS::CodePipeline::Webhook'
    this.Properties = {}
    this.Properties.Authentication = String
    this.Properties.TargetPipeline = String
    this.Properties.TargetAction = String
    this.Properties.Name = String
    this.Properties.TargetPipelineVersion = 'Int'
    this.Properties.RegisterWithThirdParty = Boolean
    this.Properties.AuthenticationConfiguration = {
      AllowedIPRange: String,
      SecretToken: String
    }
    this.Properties.Filters = [
      {
        JsonPath: String,
        MatchEquals: String
      }
    ]
  }
}
