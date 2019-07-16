export class ApiGatewayApiv2routeResponse {
  name:string
  Type = 'AWS::ApiGatewayV2::RouteResponse'
  constructor () {
    this.name = ''
  }
  static from():ApiGatewayApiv2routeResponse{
    return new ApiGatewayApiv2routeResponse()
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