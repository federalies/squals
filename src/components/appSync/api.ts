import { IRef, IGetAtt, squals, ITags, Itags, tags, baseSchemas } from '../Template'
import {
  AppSyncResolver,
  AppSyncFuncConfig,
  AppSyncDataSource,
  AppSyncSchema,
  IDataSource_byHand
} from '.'

import { struct } from 'superstruct'
// import { AppSync } from 'aws-sdk'

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
   * Create new progamatic representations of a GraphQL Api.
   *
   */
  constructor (i: IGraphQLapi) {
    this.name = i.name
    this.Properties = { Name: i.name, AuthenticationType: i.authType || 'API_KEY' }
    if (i.logs) {
      this.Properties.LogConfig = {
        CloudWatchLogsRoleArn: i.logs.roleArn,
        FieldLogLevel: i.logs.level
      }
    }
    if (i.openId) {
      this.Properties.OpenIDConnectConfig = {
        AuthTTL: i.openId.authTTLms,
        ClientId: i.openId.clientId,
        IatTTL: i.openId.iatTTLms,
        Issuer: i.openId.issuer
      }
    }
    if (i.pool) {
      this.Properties.UserPoolConfig = {
        UserPoolId: i.pool.id,
        AppIdClientRegex: i.pool.clientIdRegex,
        AwsRegion: i.pool.region,
        DefaultAction: i.pool.defaultAction || 'ALLOW'
      }
    }
    if (i.additional) {
      this.Properties.AdditionalAuthenticationProviders = []
    }
  }

  static from (i: string | object): AppSyncGraphQlApi {
    const firstKey = Object.keys(i)[0]
    const { Type, Properties } = (i as any)[firstKey]
    return typeof i === 'string'
      ? AppSyncGraphQlApi.fromString(i)
      : Type && Properties
        ? AppSyncGraphQlApi.fromJSON(i)
        : new AppSyncGraphQlApi(AppSyncGraphQlApi.validateJS(i))
  }

  static fromString (i: string): AppSyncGraphQlApi {
    const inputObj = JSON.parse(i)
    return AppSyncGraphQlApi.from(inputObj)
  }

  static fromJSON (i: object): AppSyncGraphQlApi {
    const v = AppSyncGraphQlApi.validateJSON(i)
    const componentName = Object.keys(v)[0]
    const props = v[componentName].Properties
    const ret = new AppSyncGraphQlApi({ name: componentName })
    // wont have any _linked components since those are striped on export
    ret.Properties = { ...ret.Properties, ...props }
    return ret
  }

  private static fromSDK (i: any): AppSyncGraphQlApi {
    // make public post implementation
    throw new Error('not implemented yet')
  }

  private static validateJSON (i: object): IGraphQl_json {
    // #region schema segments
    const ref = struct({ Ref: 'string' })
    const getAtt = struct({ 'Fn:GetAtt': struct.tuple(['string', 'string']) })
    const strGetAttRef = struct(struct.union(['string', getAtt, ref]))

    const cognitoPool = struct({
      AppIdClientRegex: 'string',
      AwsRegion: 'string',
      UserPoolId: 'string'
    })

    const userPool = struct.intersection([
      cognitoPool,
      struct({
        DefaultAction: struct.enum(['DENY, ALLOW'])
      })
    ])

    const openID = struct({
      AuthTTL: 'number',
      ClientId: 'string',
      IatTTL: 'number',
      Issuer: 'string'
    })

    const additionalProviderItem = struct({
      AuthenticationType: struct.enum([
        'API_KEY',
        'AWS_IAM',
        'OPENID_CONNECT',
        'AMAZON_COGNITO_USER_POOLS'
      ]),
      OpenIDConnectConfig: struct.optional(openID),
      UserPoolConfig: struct.optional(cognitoPool)
    })
    // #endregion schema segments

    struct(
      struct.dict([
        'string',
        struct({
          Type: struct.literal('AWS::AppSync::GraphQLApi'),
          Properties: struct({
            Name: strGetAttRef,
            AuthenticationType: struct.enum([
              'API_KEY',
              'AWS_IAM',
              'OPENID_CONNECT',
              'AMAZON_COGNITO_USER_POOLS'
            ]),
            AdditionalAuthenticationProviders: struct([additionalProviderItem]),
            LogConfig: struct.optional(struct({ a: 1 })),
            OpenIDConnectConfig: struct.optional(openID),
            Tags: struct.optional([struct.dict(['string', 'string'])]),
            UserPoolConfig: struct.optional(userPool)
          })
        })
      ])
    )(i)

    // validation failures throws errors
    // returns validated input on pass
    return i as IGraphQl_json
  }

  private static validateJS (i: object): IGraphQLapi {
    const ref = struct({ Ref: 'string' })
    const getAtt = struct({ 'Fn:GetAtt': struct.tuple(['string', 'string']) })
    const strGetAttRef = struct(struct.union(['string', getAtt, ref]))
    const listOfDicts = struct([struct.dict(['string', 'string'])])

    const _cognitoPool = struct.interface({
      id: 'string',
      region: 'string',
      clientIdRegex: 'string?'
    })

    const _userpool = struct.interface(
      struct.intersection([_cognitoPool, struct({ defaultAction: struct.enum(['ALLOW', 'DENY']) })])
    )

    const _openIdSchema = struct.interface({
      issuer: struct.optional(strGetAttRef),
      clientId: struct.optional(strGetAttRef),
      authTTLms: struct.optional(strGetAttRef),
      iatTTLms: struct.optional(strGetAttRef)
    })

    struct(
      struct.interface({
        name: 'string',
        authType: struct.enum([
          'API_KEY',
          'AWS_IAM',
          'OPENID_CONNECT',
          'AMAZON_COGNITO_USER_POOLS'
        ]),
        logs: struct({
          level: struct.enum(['NONE', 'ERROR', 'ALL']),
          roleArn: strGetAttRef
        }),
        openId: struct.optional(_openIdSchema),
        tags: struct.optional(listOfDicts),
        pool: struct.optional(_userpool),
        additional: struct.optional(
          struct({
            authType: struct.enum([
              'API_KEY',
              'AWS_IAM',
              'OPENID_CONNECT',
              'AMAZON_COGNITO_USER_POOLS'
            ]),
            openId: struct.optional(_openIdSchema),
            pool: struct.optional(_cognitoPool)
          })
        )
      })
    )(i)

    // throws errors for validation failures
    // returns true if no Error thrown

    return i as IGraphQLapi
  }

  static validate (i: AppSyncGraphQlApi | object): AppSyncGraphQlApi {
    if (!(i instanceof AppSyncGraphQlApi)) {
      if ('name' in i) {
        i = i as IGraphQLapi
        return new AppSyncGraphQlApi(AppSyncGraphQlApi.validateJS(i))
      } else {
        i = i as JSON // _json
        AppSyncGraphQlApi.validateJSON(i)
        // transform JSON to js
        return new AppSyncGraphQlApi({ name: 'fix me' })
      }
    } else {
      // type to key checks
      const firstKey = Object.keys(i)[0]
      const { Type, Properties } = (i as any)[firstKey]
      if (Type && Properties) {
        this.validateJSON(i)
      } else {
        this.validateJS(i)
      }
      return i
    }
  }

  withRelated (...i: object[]): AppSyncGraphQlApi {
    throw new Error('not implemented yet')
    // attempts to look through the array of stuff and pull in related
    // return []
  }

  logConfig (i: {
  roleArn: string | IRef | IGetAtt
  level: 'NONE' | 'ERROR' | 'ALL' | IRef | IGetAtt
  }): AppSyncGraphQlApi {
    this.Properties.LogConfig = {
      CloudWatchLogsRoleArn: i.roleArn,
      FieldLogLevel: i.level
    }
    return this
  }

  defaultAuthUses (
    authDescr?: 'API_KEY' | 'AWS_IAM',
    authConfig?: IGraphQLapi_openId | IGraphQLapi_userPool
  ): AppSyncGraphQlApi {
    if (authConfig) {
      if ('issuer' in authConfig) {
        // open ID
        this.Properties.AuthenticationType = 'OPENID_CONNECT'
        this.Properties.OpenIDConnectConfig = {
          AuthTTL: authConfig.authTTLms,
          ClientId: authConfig.clientId,
          IatTTL: authConfig.iatTTLms,
          Issuer: authConfig.issuer
        }
      } else {
        // cognito
        this.Properties.AuthenticationType = 'AMAZON_COGNITO_USER_POOLS'
        this.Properties.UserPoolConfig = {
          UserPoolId: authConfig.id,
          AppIdClientRegex: authConfig.clientIdRegex,
          AwsRegion: authConfig.region,
          DefaultAction: authConfig.defaultAction
        }
      }
    } else {
      if (authDescr) {
        // strings
        this.Properties.AuthenticationType = authDescr
      } else {
        // default
        this.Properties.AuthenticationType = 'API_KEY'
      }
    }
    return this
  }

  moreAuthProviders (...p: IGraphQL_authProviders[]): AppSyncGraphQlApi {
    this.Properties.AdditionalAuthenticationProviders = p.map(v => {
      switch (v.authType) {
        case 'AMAZON_COGNITO_USER_POOLS':
          return {
            AuthenticationType: v.authType,
            UserPoolConfig: {
              UserPoolId: v.pool.id,
              AwsRegion: v.pool.region,
              AppIdClientRegex: v.pool.clientIdRegex
            },
            OpenIDConnectConfig: undefined
          }
        case 'OPENID_CONNECT':
          return {
            AuthenticationType: v.authType,
            UserPoolConfig: undefined,
            OpenIDConnectConfig: {
              AuthTTL: v.openId.authTTLms,
              ClientId: v.openId.clientId,
              IatTTL: v.openId.iatTTLms,
              Issuer: v.openId.issuer
            }
          }
        case 'API_KEY':
          return {
            AuthenticationType: v.authType,
            UserPoolConfig: undefined,
            OpenIDConnectConfig: undefined
          }
        case 'AWS_IAM':
          return {
            AuthenticationType: v.authType,
            UserPoolConfig: undefined,
            OpenIDConnectConfig: undefined
          }
      }
    })
    return this
  }

  openIdConnection (): AppSyncGraphQlApi {
    return this
  }

  userPoolConfig (): AppSyncGraphQlApi {
    return this
  }

  linkDataSouces (...d: (IDataSource_byHand | AppSyncDataSource)[]) {
    // set the API ID for each input object
    return this
  }

  linkFunctionConfigs (...c: AppSyncFuncConfig[]): AppSyncGraphQlApi {
    // set the API ID for each input object
    return this
  }

  linkApiKeys (...i: IapiKey[]): AppSyncGraphQlApi {
    // set the API ID for each input object
    return this
  }

  linkeResolvers (...r: AppSyncResolver[]): AppSyncGraphQlApi {
    // set the API ID for each input object
    return this
  }

  linkSchemas (...s: AppSyncSchema[]): AppSyncGraphQlApi {
    // set the API ID for each input object
    return this
  }

  tags (...t: Itags[]): AppSyncGraphQlApi {
    this.Properties.Tags = tags(t)
    return this
  }

  toJSON (withRelated: boolean = false): JSON[] {
    return withRelated
      ? [
          ({
            [this.name]: {
              Type: 'AWS::AppSync::GraphQLApi',
              Properties: this.Properties
            }
          } as unknown) as JSON,
          ...((this._linked.resovlers.map(v => v.toJSON()) as unknown) as JSON[]),
          ...((this._linked.configs.map(v => v.toJSON()) as unknown) as JSON[]),
          ...((this._linked.sources.map(v => v.toJSON()) as unknown) as JSON[]),
          ...((this._linked.schemas.map(v => v.toJSON()) as unknown) as JSON[])
      ]
      : [
          ({
            [this.name]: {
              Type: 'AWS::AppSync::GraphQLApi',
              Properties: this.Properties
            }
          } as unknown) as JSON
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

// #region internal_interfaces

interface IGraphQLapi {
  name: string // doubles with internal use to
  authType?: 'API_KEY' | 'AWS_IAM' | 'OPENID_CONNECT' | 'AMAZON_COGNITO_USER_POOLS'
  logs?: {
    level: 'NONE' | 'ERROR' | 'ALL'
    roleArn: string | IRef | IGetAtt
  }
  openId?: IGraphQLapi_openId
  pool?: IGraphQLapi_userPool
  additional?: IGraphQL_authProviders[]
  tags?: Itags[]
}
interface IGraphQLapi_cognitoPool {
  id: string
  region: string
  clientIdRegex?: string
}

type IGraphQLapi_userPool = IGraphQLapi_cognitoPool & { defaultAction: 'ALLOW' | 'DENY' }

interface IGraphQLapi_openId {
  issuer: string | IRef | IGetAtt
  clientId?: string | IRef | IGetAtt
  authTTLms?: number | IRef | IGetAtt
  iatTTLms?: number | IRef | IGetAtt
}

type IGraphQL_authProviders =
  | { authType: 'API_KEY' }
  | { authType: 'AWS_IAM' }
  | IGraphQL_authProviders_openID
  | IGraphQL_authProviders_cognito

interface IGraphQL_authProviders_openID {
  authType: 'OPENID_CONNECT'
  openId: IGraphQLapi_openId
}

interface IGraphQL_authProviders_cognito {
  authType: 'AMAZON_COGNITO_USER_POOLS'
  pool: IGraphQLapi_cognitoPool
}

interface IGraphQl_json {
  [name: string]: {
    Type: 'AWS::AppSync::GraphQLApi'
    Properties: IGraphQl_props
  }
}

interface IGraphQl_props {
  Name: string | IRef | IGetAtt
  AuthenticationType: 'API_KEY' | 'AWS_IAM' | 'OPENID_CONNECT' | 'AMAZON_COGNITO_USER_POOLS'
  AdditionalAuthenticationProviders?: IGraphQL_AddlAuthProv[]
  LogConfig?: {
    CloudWatchLogsRoleArn: string | IRef | IGetAtt
    FieldLogLevel: 'NONE' | 'ERROR' | 'ALL' | IRef | IGetAtt
  }
  OpenIDConnectConfig?: IGraphQL_OpenIDConnect
  UserPoolConfig?: IGraphQL_UserPoolConfig
  Tags?: ITags[]
}

interface IGraphQL_AddlAuthProv {
  AuthenticationType: 'API_KEY' | 'AWS_IAM' | 'OPENID_CONNECT' | 'AMAZON_COGNITO_USER_POOLS'
  OpenIDConnectConfig?: IGraphQL_OpenIDConnect
  UserPoolConfig?: IGraphQL_CognitoPool
}

interface IGraphQL_CognitoPool {
  AppIdClientRegex?: string | IRef | IGetAtt
  AwsRegion?: string | IRef | IGetAtt
  UserPoolId?: string | IRef | IGetAtt
}

type IGraphQL_UserPoolConfig = IGraphQL_CognitoPool & {
  DefaultAction: 'ALLOW' | 'DENY'
}

interface IGraphQL_OpenIDConnect {
  AuthTTL?: number | IRef | IGetAtt
  ClientId?: string | IRef | IGetAtt
  IatTTL?: number | IRef | IGetAtt
  Issuer?: string | IRef | IGetAtt
}
// #endregion internal_interfaces
