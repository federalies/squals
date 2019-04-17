/* eslint no-unused-vars: ["error", { "args": "none" }] */
import randomWord from 'random-word'
import Randoma from 'randoma'
import { ITags, IGetAtt, IRef, Itags } from '../../Template'
import { ICdnOriginItem, IcdnOriginInput, originsConfig, originsArrayConfig } from './origins'
import {
  ICdnCacheDefaultBehavior,
  ICdnCaheBehavior,
  cacheDefaultBehaviorConfig,
  IcdnCacheDefaultBehavior,
  IcdnCaheBehavior,
  cacheBehaviorsConfig
} from './behaviors'
import {
  IcacheRestrictions,
  restrictionsConfig,
  ICdnGeoRestrictions,
  ICdnGeoRestrictionData
} from './restrictions'
import { ICdnViewerCert, IcdnViewerCert, viewerCertConfig } from './viewerCertificate'
import { ICdnLogging, IcacheLogging } from './logging'
import {
  ICdnCustomErrorResp,
  IcacheErrResponseRules,
  cutomErrorRespConfig
} from './customErrorResp'

export class CloudFrontCDN {
  //  implements IndexSignature }{
  name: string
  Type: 'AWS::CloudFront::Distribution'
  Properties: {
    Tags?: ITags[]
    DistributionConfig: {
      Enabled: boolean
      IPV6Enabled?: boolean

      Origins: ICdnOriginItem[]
      DefaultCacheBehavior: ICdnCacheDefaultBehavior

      CacheBehaviors?: ICdnCaheBehavior[]
      CustomErrorResponses?: ICdnCustomErrorResp[]
      Logging?: ICdnLogging
      ViewerCertificate?: ICdnViewerCert
      Restrictions?: { GeoRestriction: ICdnGeoRestrictionData }

      Comment?: string
      Aliases?: string[]
      WebACLId?: string
      DefaultRootObject?: string
      HttpVersion?: string
      PriceClass?: validPriceClass | validPriceClassStrings
    }
  }

  constructor (props: icdnDistributiounInput) {
    this.Type = 'AWS::CloudFront::Distribution'

    let defaultName = `${randomWord()}-${randomWord()}-${new Randoma({
      seed: new Date().getTime()
    }).integer()}`

    let { name } = { name: defaultName, ...props }
    this.name = name

    // setup squals defaults
    this.Properties = {
      DistributionConfig: {
        ...originsConfig(props.origins),
        ...cacheDefaultBehaviorConfig(),
        ...cacheBehaviorsConfig(props.behaviors),
        ...cutomErrorRespConfig(props.errResp),
        ...viewerCertConfig(props.viewerCertificate),
        // ...restrictionsConfig(props.restrictions),
        Enabled: typeof props.enabled === 'boolean' ? props.enabled : true,
        Comment:
          typeof props.comments === 'string' ? props.comments : 'made via fedarelies : squals',
        IPV6Enabled: typeof props.isIpv6 === 'boolean' ? props.isIpv6 : true,
        PriceClass: typeof props.priceClass === 'string' ? props.priceClass : validPriceClass.all,
        HttpVersion: typeof props.priceClass === 'string' ? props.httpVersion : 'http2',
        DefaultRootObject:
          typeof props.defaultRootObject === 'string' ? props.defaultRootObject : '/index.html'
      }
    }
  }

  addOrigins (origins: IcdnOriginInput) {
    const _this = this
    _this.Properties = {
      DistributionConfig: {
        ...this.Properties.DistributionConfig,
        Origins: [...this.Properties.DistributionConfig.Origins, ...originsArrayConfig(origins)]
      }
    }
    return _this
  }

  Ref (): IRef {
    return { Ref: this.name }
  }

  DomainName (): IGetAtt {
    /**
     * Returns the Amazon Resource Name (ARN) of the specified bucket.
     * Example: arn:aws:s3:::mybucket
     * */
    return { 'Fn::GetAtt': [this.name, 'DomainName'] }
  }
}

export type validPriceClassStrings = 'PriceClass_100' | 'PriceClass_200' | 'PriceClass_All'
export enum validPriceClass {
  'one' = 'PriceClass_100',
  'two' = 'PriceClass_200',
  'all' = 'PriceClass_All'
}

interface icdnDistributiounInput {
  origins: IcdnOriginInput
  defaultCacheBehavior?: IcdnCacheDefaultBehavior
  behaviors?: IcdnCaheBehavior | IcdnCaheBehavior[]
  restrictions?: IcacheRestrictions
  errResp?: IcacheErrResponseRules
  logging?: IcacheLogging
  viewerCertificate?: IcdnViewerCert
  comments?: string
  enabled?: boolean
  isIpv6?: boolean
  aliases?: string[]
  webACLId?: string
  defaultRootObject?: string
  httpVersion?: 'http1.1' | 'http2'
  priceClass?: validPriceClass | validPriceClassStrings
  tags?: Itags
}
