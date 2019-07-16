export class ApiGatewayApiAuthorizer {
  name:string
  Type = 'AWS::ApiGatewayV2::Authorizer'
  constructor () {
    this.name = ''
  }
  static from():ApiGatewayApiAuthorizer{
    return new ApiGatewayApiAuthorizer()
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