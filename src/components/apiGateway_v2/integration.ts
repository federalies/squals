export class ApiGatewayApiIntegretion {
  name:string
  Type = 'AWS::ApiGatewayV2::Integration'
  constructor () {
    this.name = ''
  }
  static from():ApiGatewayApiIntegretion{
    return new ApiGatewayApiIntegretion()
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