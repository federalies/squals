import { IRef, IGetAtt, squals } from '../Template'
import { AppSyncResolver, AppSyncFuncConfig, AppSyncDataSource, AppSyncSchema } from '.'
import Joi from '@hapi/joi'

export class AppSyncGraphQlApi implements squals {
  name: string
  Type = 'AWS::AppSync::GraphQLApi'
  Properties: {
    Name: string
    AuthenticationType: 'API_KEY' | 'AWS_IAM' | 'OPENID_CONNECT' | 'AMAZON_COGNITO_USER_POOLS'
    AdditionalAuthenticationProviders?: string // AdditionalAuthenticationProviders
    LogConfig?: string // LogConfig
    OpenIDConnectConfig?: string // OpenIDConnectConfig
    Tags?: string // Tags
    UserPoolConfig?: string // UserPoolConfig
  }
  _linked: {
    resovlers: AppSyncResolver[]
    configs: AppSyncFuncConfig[]
    sources: AppSyncDataSource[]
    schemas: AppSyncSchema[]
  }

  constructor () {
    this.name = ''
    this.Properties = { Name: '', AuthenticationType: 'API_KEY' }
    this._linked = {
      resovlers: [],
      configs: [],
      sources: [],
      schemas: []
    }
  }
  static fromJSON (i: IGraphQL_min): AppSyncGraphQlApi {
    const name = Object.keys(i)[0]
    const { Properties } = i[name]
    return new AppSyncGraphQlApi()
  }

  logConfig (): AppSyncGraphQlApi {
    return this
  }
  openIdConnection (): AppSyncGraphQlApi {
    return this
  }
  userPoolConfig (): AppSyncGraphQlApi {
    return this
  }
  linkDataSouces (...d: AppSyncDataSource[]) {
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
  validate (): AppSyncGraphQlApi {
    const schema = Joi.object().keys({
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
    })
    return this
  }
  toJSON (): object[] {
    return [
      {
        [this.name]: {
          Type: 'AWS::AppSync::GraphQLApi',
          Properties: this.Properties
        }
      },
      ...this._linked.resovlers.map(v => v.toJSON()),
      ...this._linked.configs.map(v => v.toJSON()),
      ...this._linked.sources.map(v => v.toJSON()),
      ...this._linked.schemas.map(v => v.toJSON())
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

interface IapiKey {
  desc?: string
  exp?: number
}

interface IGraphQL_min {
  [name: string]: {
    Type: 'AWS::AppSync::GraphQLApi'
    Properties: {
      AuthenticationType: string
      Name: string
      AdditionalAuthenticationProviders?: string // AdditionalAuthenticationProviders
      LogConfig?: string // LogConfig
      OpenIDConnectConfig?: string // OpenIDConnectConfig
      Tags?: string // Tags
      UserPoolConfig?: string // UserPoolConfig
    }
  }
}

interface AddlAuthProv {
  AuthenticationType: 'API_KEY' | 'AWS_IAM' | 'OPENID_CONNECT' | 'AMAZON_COGNITO_USER_POOLS'
  OpenIDConnectConfig: {
    AuthTTL: number
    ClientId: string
    IatTTL: number
    Issuer: string
  }
  UserPoolConfig: {
    AppIdClientRegex: string
    AwsRegion: string
    UserPoolId: string
  }
}
