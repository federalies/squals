export class ApiGatewayApiv2Stage {
  name:string
  Type = 'AWS::ApiGatewayV2::Api'
  constructor () {
    this.name = ''
  }
  static from():ApiGatewayApiv2Stage{
    return new ApiGatewayApiv2Stage()
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