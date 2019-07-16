export class ApiGatewayDomainName {
  name:string
  Type = 'AWS::ApiGateway::DomainName'
  constructor () {
    this.name = ''
  }
  static from():ApiGatewayDomainName{
    return new ApiGatewayDomainName()
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