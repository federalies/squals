export class ApiGatewayApiv2Route {
  name:string
  Type = 'AWS::ApiGatewayV2::Route'
  constructor () {
    this.name = ''
  }
  static from():ApiGatewayApiv2Route{
    return new ApiGatewayApiv2Route()
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