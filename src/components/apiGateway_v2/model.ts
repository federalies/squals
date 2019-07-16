export class ApiGatewayApiv2Model {
  name:string
  Type = 'AWS::ApiGatewayV2::Model'
  constructor () {
    this.name = ''
  }
  static from():ApiGatewayApiv2Model{
    return new ApiGatewayApiv2Model()
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