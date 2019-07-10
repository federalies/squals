import { IRef, IGetAtt, squals, ITags, Itags, tags, baseSchemas } from '../Template'
import { AppSyncResolver, AppSyncFuncConfig, AppSyncDataSource, AppSyncSchema, IDataSource_byHand } from '.'
import Joi from '@hapi/joi'

export class AppSyncGraphQlApi implements squals {
  name: string
  Type = 'AWS::AppSync::GraphQLApi'
  Properties: IGraphQl_props
  _linked = {
    resovlers: [] as AppSyncResolver[],
    configs: [] as AppSyncFuncConfig[],
    sources: [] as AppSyncDataSource[],
    schemas: [] as AppSyncSchema[]
  }

  /**
   * create new progamatic representations of a GraphQL Api
   * 
   */
  constructor (i?: IGraphQl_json | IGraphQLapi | AppSyncGraphQlApi) {
    if(i instanceof AppSyncGraphQlApi){
      this.name = i.name
      this.Properties = i.Properties
      this._linked = i._linked
    }else {
      if( Object.keys(i as IGraphQl_json | IGraphQLapi ).length>1){
        i = i as IGraphQl_json
        this.name = Object.keys(i)[0]
        this.Properties = i[this.name].Properties
      }else {
        i = i as IGraphQLapi
        this.name = i.name
        this.Properties = { Name: i.name, AuthenticationType: i.authType }
        if(i.logs){this.Properties.LogConfig = {
            CloudWatchLogsRoleArn : i.logs.roleArn,
            FieldLogLevel : i.logs.level
          }
        }
        if(i.openId){
          this.Properties.OpenIDConnectConfig = {
            AuthTTL: i.openId.authTTLms,
            ClientId: i.openId.clientId,
            IatTTL: i.openId.iatTTLms,
            Issuer: i.openId.issuer
          }
        }
        if(i.pool){
          this.Properties.UserPoolConfig = {
            UserPoolId : i.pool.id,
            AppIdClientRegex : i.pool.clientIdRegex,
            AwsRegion : i.pool.region,
            DefaultAction : i.pool.defaultAction || 'ALLOW'
          }
        }
        if(i.additional){

        }
      }
    }
  }

  static from(i: string | JSON ): AppSyncGraphQlApi {
    return typeof i === 'string' 
    ? AppSyncGraphQlApi.fromString(i)
    : AppSyncGraphQlApi.fromJSON(i)
  }

  static fromString (i: string ):AppSyncGraphQlApi {
    return AppSyncGraphQlApi.fromJSON(JSON.parse(i))
  }
  /**
   * alternative constuctor for createing
   * @param i export JSON or verbose programtic
   */
  static fromJSON (i: JSON): AppSyncGraphQlApi {
    return AppSyncGraphQlApi.validate(i)
  }

  private static validateJSON(i: object):IGraphQl_json{
    const unions = {
      strRefGet : [Joi.string(), baseSchemas.Ref, baseSchemas.GetAtt]
    }

    Joi.object().keys({
      Type: Joi.string().required(),
      Properties: Joi.object({
        Name: Joi.string().required(),
        AuthenticationType: Joi.string().required(), // 'API_KEY' | 'AWS_IAM' | 'OPENID_CONNECT' | 'AMAZON_COGNITO_USER_POOLS'
        AdditionalAuthenticationProviders: Joi.string().optional(), // AdditionalAuthenticationProviders
        LogConfig: Joi.object().optional(),
        OpenIDConnectConfig: Joi.object().optional(), // OpenIDConnectConfig
        Tags: Joi.string().optional(), // Tags
        UserPoolConfig: Joi.object().optional() // UserPoolConfig
      }).required()
    }).validate(i) 
    
    // validation failures throws errors 
    // returns validated input on pass
    return i as IGraphQl_json
  }

  private static validateJS(i:object):IGraphQLapi{

    const unions = {
      strRefGet : [Joi.string(), baseSchemas.Ref, baseSchemas.GetAtt]
    }
    Joi.object().keys({
      name: Joi.string().required(),
      authType: Joi.string().required().valid('API_KEY', 'AWS_IAM' , 'OPENID_CONNECT' , 'AMAZON_COGNITO_USER_POOLS'),
      logs : Joi.object({
        level: Joi.string().required().valid('NONE' , 'ERROR' , 'ALL'),
        roleArn: Joi.alternatives().try(...unions.strRefGet).required()
      }).optional(),
      openId:'',
      tags:'',
      UserPoolConfig: ''
    }).validate(i) // throws erros for validation failures
    // throws erros for validation failures
    // returns true if no Error thrown
    return i as IGraphQLapi
  } 

  static validate (i: IGraphQl_json | IGraphQLapi | AppSyncGraphQlApi | JSON ): AppSyncGraphQlApi {
    if(!(i instanceof AppSyncGraphQlApi)){
      if('name' in i ){
        i = i as IGraphQLapi
        return new AppSyncGraphQlApi(AppSyncGraphQlApi.validateJS(i))
      } else {
        return new AppSyncGraphQlApi(AppSyncGraphQlApi.validateJSON(i))
      } 
    } else {
      // type to key checks

      return i
    }
  }
  
  withRelated ( ...i: JSON[] ):AppSyncGraphQlApi {
    throw new Error('not implemented yet')
    // return []
  }

  logConfig (): AppSyncGraphQlApi {
    return this
  }
  authProviders(...p:IGraphQL_authProviders[]):AppSyncGraphQlApi{
    // special function that treats element1 diff from the remaining
    return this
  }
  openIdConnection (): AppSyncGraphQlApi {
    return this
  }
  userPoolConfig (): AppSyncGraphQlApi {
    return this
  }
  linkDataSouces (...d: (IDataSource_byHand | AppSyncDataSource)[]) {
    return this
  }
  linkFunctionConfigs (...c: AppSyncFuncConfig[]): AppSyncGraphQlApi {
    return this
  }
  linkApiKeys (...i: IapiKey[]): AppSyncGraphQlApi {
    return this
  }
  linkeResolvers (...r: AppSyncResolver[]): AppSyncGraphQlApi {
    return this
  }
  linkSchemas (...s: AppSyncSchema[]): AppSyncGraphQlApi {
    return this
  }
  tags(...t: Itags[] ): AppSyncGraphQlApi{
    this.Properties.Tags = tags(t)
    return this
  }
  
  toJSON (withRelated:boolean = false): JSON[] {
    
    return withRelated ? [
      {
        [this.name]: {
          Type: 'AWS::AppSync::GraphQLApi',
          Properties: this.Properties
        }
      } as unknown as JSON,
      ...(this._linked.resovlers.map(v => v.toJSON()) as unknown as JSON[]),
      ...(this._linked.configs.map(v => v.toJSON())as unknown as JSON[]),
      ...(this._linked.sources.map(v => v.toJSON())as unknown as JSON[]),
      ...(this._linked.schemas.map(v => v.toJSON())as unknown as JSON[]),
    ] : [
      {
        [this.name]: {
          Type: 'AWS::AppSync::GraphQLApi',
          Properties: this.Properties
        }
      } as unknown as JSON
    ]
  }
  Ref (): IRef {
    return { Ref: this.name }
  }
  ApiId (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'ApiId'] }
  }
  Arn (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'Arn'] }
  }
  GraphQLUrl (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'GraphQLUrl'] }
  }
}

// #region linked_interfaces

interface IapiKey {
  id: string | IRef | IGetAtt
  desc?: string
  exp?: number
}




// #endregion linked_interfaces

// #region interfaces

interface IGraphQLapi{
  name:string
  authType:'API_KEY' | 'AWS_IAM' | 'OPENID_CONNECT' | 'AMAZON_COGNITO_USER_POOLS'
  logs?:{
    level:'NONE' | 'ERROR' | 'ALL'
    roleArn: string | IRef | IGetAtt
  }
  additional?:IGraphQL_authProviders[]
  openId?: IGraphQLapi_openId
  pool?: IGraphQLapi_cognitoPool
  tags?: Itags[]
}
interface IGraphQLapi_cognitoPool{
  id: string 
  region: string
  clientIdRegex?: string
  defaultAction? : 'ALLOW'|'DENY'
}
interface IGraphQLapi_openId{
  issuer: string | IRef | IGetAtt
  clientId?: string | IRef | IGetAtt
  authTTLms?: number | IRef | IGetAtt
  iatTTLms?: number | IRef | IGetAtt
}

interface IGraphQL_authProviders {
  authType:'API_KEY' | 'AWS_IAM' | 'OPENID_CONNECT' | 'AMAZON_COGNITO_USER_POOLS'
  openID?: IGraphQLapi_openId
  userPool?: IGraphQLapi_cognitoPool
}
  
interface IGraphQl_json{
  [name:string]:{
    Type: 'AWS::AppSync::GraphQLApi'
    Properties: IGraphQl_props
  }
}

interface IGraphQl_props{
    Name: string | IRef | IGetAtt
    AuthenticationType: 'API_KEY' | 'AWS_IAM' | 'OPENID_CONNECT' | 'AMAZON_COGNITO_USER_POOLS'
    AdditionalAuthenticationProviders?: IGraphQL_AddlAuthProv[] 
    LogConfig?: {
      CloudWatchLogsRoleArn : string | IRef | IGetAtt
      FieldLogLevel : 'NONE' | 'ERROR' | 'ALL' | IRef | IGetAtt
    }
    OpenIDConnectConfig?: IGraphQL_OpenIDConnect
    UserPoolConfig?: IGraphQL_UserPoolConfig
    Tags?: ITags[]
  }

interface IGraphQL_AddlAuthProv {
  AuthenticationType: 'API_KEY' | 'AWS_IAM' | 'OPENID_CONNECT' | 'AMAZON_COGNITO_USER_POOLS'
  OpenIDConnectConfig?: IGraphQL_OpenIDConnect
  UserPoolConfig?: IGraphQL_UserPoolConfig
}

interface IGraphQL_UserPoolConfig{
  AppIdClientRegex? : string | IRef | IGetAtt
  AwsRegion? : string | IRef | IGetAtt
  UserPoolId? : string| IRef | IGetAtt
  DefaultAction? : 'ALLOW' | 'DENY' //  dont use the default action within the additoinalAuthProviders
} 

interface IGraphQL_OpenIDConnect{
  AuthTTL?: number | IRef | IGetAtt
  ClientId?: string | IRef | IGetAtt
  IatTTL?: number | IRef | IGetAtt
  Issuer?: string | IRef | IGetAtt
}
// #endregion interfaces