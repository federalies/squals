export class ApiGatewayApiDeployment {
  name:string
  Type = 'AWS::ApiGatewayV2::Deployment'
  constructor () {
    this.name = ''
  }
  static from():ApiGatewayApiDeployment{
    return new ApiGatewayApiDeployment()
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