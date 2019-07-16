import { ITags } from "../Template";

export class ApiGatewayApiv2 {
  name:string
  Type = 'AWS::ApiGatewayV2::Api'
  Properties: IApiGatewayv2Props
  constructor () {
    this.name = ''
    this.Properties = {
      Name:'',
      ProtocolType : 'WEBSOCKET', 
      RouteSelectionExpression:'' 
    }
  }
  static from(i:string | JSON):ApiGatewayApiv2{
    return new ApiGatewayApiv2()
  }
  static fromString(i:string){}
  static fromJSON(i:JSON){}
  static validate(){}
  private static validateJS(){}
  private static validateJSON(){}
  toJSON():object[] {
    return [
      {
        [this.name]:{
          Type:'AWS::ApiGatewayV2::Api',
          Properties: this.Properties
        }
      }
    ]
  }
  Ref(){}
  Arn(){}
  Other(){}
}

// #region All Interfaces

interface IApiGatewayv2Props{
  Name : string
  ProtocolType : 'WEBSOCKET'
  RouteSelectionExpression : string
  ApiKeySelectionExpression? : string
  Description? : string
  DisableSchemaValidation? : boolean
  Tags? : ITags
  Version? : string
}

// #endregion All Interfaces