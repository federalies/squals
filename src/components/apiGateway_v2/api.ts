import { ITags } from '../Template'

export class ApiGatewayApiv2 {
  name: string
  Type = 'AWS::ApiGatewayV2::Api'
  Properties: IApiGatewayv2Props
  constructor () {
    this.name = ''
    this.Properties = {
      Name: '',
      ProtocolType: 'WEBSOCKET',
      RouteSelectionExpression: ''
    }
  }
  static fromString (i: string) {}
  static fromJSON (i: object) {}
  static fromJS (i: object) {}
  static from (i: string | JSON): ApiGatewayApiv2 {
    return new ApiGatewayApiv2()
  }
  static validate () {}
  static validateJS () {}
  static validateJSON () {}
  toJSON (): object[] {
    return [
      {
        [this.name]: {
          Type: 'AWS::ApiGatewayV2::Api',
          Properties: this.Properties
        }
      }
    ]
  }
  Ref () {}
  Arn () {}
  Other () {}
}

// #region All Interfaces

interface IApiGatewayv2Props {
  Name: string
  ProtocolType: 'WEBSOCKET'
  RouteSelectionExpression: string
  ApiKeySelectionExpression?: string
  Description?: string
  DisableSchemaValidation?: boolean
  Tags?: ITags
  Version?: string
}

// #endregion All Interfaces
