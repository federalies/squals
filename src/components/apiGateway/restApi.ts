import { ITags } from "../Template";
import {APIGateway} from 'aws-sdk'
import { OpenAPIV2, OpenAPIV3 } from "openapi-types";

export class ApiGatewayRestApi {
  name:string
  Type = "AWS::ApiGateway::RestApi"
  Properties: IApiGatewayProps
  constructor () {
    this.name = ''
    this.Properties = {}
  }
  static from(i:string | object | APIGateway | ApiGatewayRestApi):ApiGatewayRestApi{
    return new ApiGatewayRestApi()
  }
  static fromSDK(i:APIGateway){}
  static fromString(i:string):ApiGatewayRestApi{
    return new ApiGatewayRestApi()
  }
  static fromJSON(i:object):ApiGatewayRestApi{
    return new ApiGatewayRestApi()
  }
  static validate():ApiGatewayRestApi{
    return new ApiGatewayRestApi()
  }
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
  RootResourceId(){}
}

// #region All Interfaces

interface IApiGatewayProps{
    ApiKeySourceType? : 'HEADER' | 'AUTHORIZER' 
    BinaryMediaTypes? : string[]
    Body? : OpenAPIV2.Document | OpenAPIV3.Document
    BodyS3Location? : S3Location
    CloneFrom? : string
    Description? : string
    EndpointConfiguration? : EndpointConfiguration
    FailOnWarnings? : boolean
    MinimumCompressionSize? : number
    Name? : string
    Parameters? : ITags
    Policy? : object // @todo is this an IAM policy document?
}

interface S3Location{
  Bucket? : string
  ETag? : string
  Key? : string
  Version? : string
}
interface EndpointConfiguration{
  "Types" : ('EDGE' | 'REGIONAL' | 'PRIVATE')[]
}

// #endregion All Interfaces