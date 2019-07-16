export class ApiGatewayApiIntegrationResponse {
  name:string
  Type = 'AWS::ApiGatewayV2::IntegrationResponse'
  constructor () {
    this.name = ''
  }
  static from():ApiGatewayApiIntegrationResponse{
    return new ApiGatewayApiIntegrationResponse()
  }
  static fromString(){}
  static fromJSON(){}
  static validate(){}
  private static validateJS(){}
  private static validateJSON(){}
  toJSON(){}
  Ref(){}
  Arn(){}
  Other(){}
}

// #region All Interfaces

interface example{}

// #endregion All Interfaces