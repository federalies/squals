/* eslint no-unused-vars: ["error", { "args": "none" }] */
import randomWord from 'random-word'
import Randoma from 'randoma'

export class CloudFrontCDN {
  name: string
  Type: 'AWS::CloudFront::Distribution'
  Tags?: []
  Properties: {
    DistributionConfig: {
      Enabled: Boolean
      Origins: ICDNOrigins[]
      DefaultCacheBehavior: {
        TargetOriginId: string
        ViewerProtocolPolicy: string
        ForwardedValues: {
          _Querystring: Boolean
          Headers: [string]
          QuerystringCacheKeys: [string]
          Cookies: {
            Forward: string
            WhitelistedNames: [string]
          }
        }
        AllowedMethods?: [string]
        CachedMethods?: [string]
        Compress?: Boolean
        DefaultTTL?: Number
        FieldLevelEncryptionId?: string
        LambdaFunctionAssociations?: ['LambdaFunctionAssociation']
        MaxTTL?: Number
        MinTTL?: Number
        SmoothStreaming?: Boolean
        TrustedSigners?: string[]
      }
      Aliases?: string[]
      CacheBehaviors?: ['CacheBehavior']
      Comment?: string
      CustomErrorResponses?: ['CustomErrorResponse']
      DefaultRootObject?: string // index.html
      HttpVersion?: 'http1.1' | 'http2'
      IPV6Enabled?: Boolean
      Logging?: 'Logging'
      PriceClass?: string
      Restrictions?: 'Restriction'
      ViewerCertificate?: 'ViewerCertificate'
      WebACLId?: string
    }
  }

  constructor (props: any = {}) {
    this.name =
      name ||
      `${randomWord()}-${randomWord()}-${new Randoma({
        seed: new Date().getTime()
      }).integer()}`

    this.Type = 'AWS::CloudFront::Distribution'
    const defaults: any = {}
    this.Properties = defaults
  }

  addOrigins (origins: ICDNOrigins[]) {
    const _this = this
    _this.Properties = {
      DistributionConfig: {
        ...this.Properties.DistributionConfig,
        Origins: origins
      }
    }
    return _this
  }

  Ref () {
    return { Ref: this.name }
  }

  DomainName () {
    /**
     * Returns the Amazon Resource Name (ARN) of the specified bucket.
     * Example: arn:aws:s3:::mybucket
     * */
    return { 'Fn::GetAtt': [this.name, 'DomainName'] }
  }
}

export enum validPriceClass {
  'one' = 'PriceClass_100',
  'two' = 'PriceClass_200',
  'all' = 'PriceClass_All'
}
export interface ICDNCacheBehavior {
  AllowedMethods: string[]
  CachedMethods: string[]
  Compress: Boolean
  DefaultTTL: Number
  FieldLevelEncryptionId: string
  ForwardedValues: {
    Cookies: {
      Forward: string[]
      WhitelistedNames: string[]
    }
    Headers: string[]
    Querystring: boolean
    QuerystringCacheKeys: string[]
  }
  LambdaFunctionAssociations: ICDNLambdaFunctionAssociations[]
  MaxTTL: Number
  MinTTL: Number
  PathPattern: string
  SmoothStreaming: Boolean
  TargetOriginId: string
  TrustedSigners: string[]
  ViewerProtocolPolicy: string
}

export interface ICDNOrigins {
  Id: string
  DomainName: string
  CustomOriginConfig?: {
    OriginProtocolPolicy: string
    HTTPPort?: number
    HTTPSPort?: number
    OriginKeepaliveTimeout?: number
    OriginReadTimeout?: number
    OriginSSLProtocols?: string[]
  }
  OriginCustomHeaders?: ICDNCustomHeader[]
  OriginPath?: string
  S3OriginConfig?: {
    OriginAccessIdentity: string
  }
}

interface ICDNCustomHeader {
  HeaderName: string
  HeaderValue: string
}

interface ICDNLambdaFunctionAssociations {
  EventType: string
  LambdaFunctionARN: string
}
