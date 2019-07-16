export class ApiGatewayApiMapping {
    name:string
    Type = 'AWS::ApiGatewayV2::ApiMapping'
    constructor () {
      this.name = ''
    }
    static from():ApiGatewayApiMapping{
      return new ApiGatewayApiMapping()
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