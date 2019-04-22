/* eslint no-unused-vars: ["error", { "args": "none" }] */
import randomWord from 'random-word'
import Randoma from 'randoma'
import { ITags, IGetAtt, IRef, Itags, Tags } from '../../Template'
import { ICdnOriginItem, IcdnOriginInput, originsConfig, originsArrayConfig } from './origins'
import {
  ICdnCacheDefaultBehavior,
  ICdnCaheBehavior,
  cacheDefaultBehaviorConfig,
  IcdnCacheDefaultBehavior,
  IcdnCaheBehavior,
  cacheBehaviorsConfig
} from './behaviors'
import { IcacheRestrictions, restrictionsConfig, ICdnGeoRestrictionData } from './restrictions'
import { ICdnViewerCert, IcdnViewerCert, viewerCertConfig } from './viewerCertificate'
import { ICdnLogging, IcdnLoggingInput } from './logging'
import {
  ICdnCustomErrorResp,
  IcacheErrResponseRules,
  cutomErrorRespConfig
} from './customErrorResp'
import { loggingConfig } from './logging'

export class CloudFrontCDN {
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
      ...Tags(props.tags),
      DistributionConfig: {
        ...originsConfig(props.origins),
        ...cacheDefaultBehaviorConfig(),
        ...cacheBehaviorsConfig(props.behaviors),
        ...restrictionsConfig(props.restrictions),
        ...cutomErrorRespConfig(props.errResp),
        ...loggingConfig(props.logging),
        ...viewerCertConfig(props.viewerCertificate),
        ...this.addAliases(props.aliases),
        Enabled: typeof props.enabled === 'boolean' ? props.enabled : true,
        Comment:
          typeof props.comments === 'string' ? props.comments : 'made via fedarelies : squals',
        IPV6Enabled: typeof props.isIpv6 === 'boolean' ? props.isIpv6 : true,
        PriceClass: typeof props.priceClass === 'string' ? props.priceClass : validPriceClass.all,
        HttpVersion: typeof props.httpVersion === 'string' ? props.httpVersion : 'http2',
        DefaultRootObject:
          typeof props.defaultRootObject === 'string' ? props.defaultRootObject : '/index.html'
      }
    }
  }

  /**
   * @description stateful orgin additive?
   */
  origins (origins: IcdnOriginInput): CloudFrontCDN {
    const _this = this
    const _listofAllOriginsbutNoIds: ICdnOriginItem[] = [
      ...this.Properties.DistributionConfig.Origins,
      ...originsArrayConfig(origins)
    ].map((v, i) => ({ ...v, Id: i.toString() }))

    _this.Properties = {
      DistributionConfig: {
        ...this.Properties.DistributionConfig,
        Origins: _listofAllOriginsbutNoIds
      }
    }
    return _this
  }

  /**
   *
   * @param logConfig - Repalcememt value.
   * @example
   * var l =
   */
  logging (logConfig: IcdnLoggingInput): CloudFrontCDN {
    const _this = this
    _this.Properties = {
      DistributionConfig: {
        ...this.Properties.DistributionConfig,
        ...loggingConfig(logConfig)
      }
    }
    return _this
  }

  /**
   *
   * @param errRespCfg
   */
  errorResponses (errRespCfg: any): CloudFrontCDN {
    const _this = this
    _this.Properties = {
      DistributionConfig: {
        ...this.Properties.DistributionConfig,
        ...cutomErrorRespConfig(errRespCfg)
      }
    }
    return _this
  }

  /**
   *
   * @param cert
   */
  viewerCertificate (cert?: IcdnViewerCert): CloudFrontCDN {
    const _this = this
    _this.Properties = {
      DistributionConfig: {
        ...this.Properties.DistributionConfig,
        ...viewerCertConfig(cert)
      }
    }
    return _this
  }

  /**
   *
   * @param restriction
   */
  restrictions (restriction: IcacheRestrictions): CloudFrontCDN {
    const _this = this
    _this.Properties = {
      DistributionConfig: {
        ...this.Properties.DistributionConfig,
        ...restrictionsConfig(restriction)
      }
    }
    return _this
  }

  /**
   *
   * @param replacementBehaviors
   */
  behaviors (replacementBehaviors: IcdnCaheBehavior | IcdnCaheBehavior[]): CloudFrontCDN {
    const _this = this

    _this.Properties = {
      DistributionConfig: {
        ...this.Properties.DistributionConfig,
        ...cacheBehaviorsConfig(replacementBehaviors)
      }
    }
    return _this
  }

  /**
   *
   * @description functional replacement of the comment attribute
   * @param comment - Replace the comment.
   * @example
   * var myCDN = CloudFront({origins: 'https://federali.es'})
   * var diffCDNObj = myCDN.comments('This Is the new comment String value')š
   * console.log(myCDN === diffCDNObj) // false
   */
  comments (comment: string): CloudFrontCDN {
    const _this = this

    _this.Properties = {
      DistributionConfig: {
        ...this.Properties.DistributionConfig,
        Comment: comment
      }
    }
    return _this
  }

  /**
   *
   * @param aliases
   */
  aliases (aliases: string | string[]): CloudFrontCDN {
    const _this = this

    _this.Properties = {
      DistributionConfig: {
        ...this.Properties.DistributionConfig,
        ...this.addAliases(aliases)
      }
    }

    return _this
  }
  addAliases (aliases?: string | string[]): { Aliases: string[] } | object {
    if (Array.isArray(aliases)) {
      return { Aliases: [...this.Properties.DistributionConfig.Aliases, ...aliases] }
    } else if (aliases) {
      return { Aliases: [aliases] }
    } else {
      return {}
    }
  }

  webAcl (webACLId?: string): CloudFrontCDN {
    const _this = this
    _this.Properties = {
      DistributionConfig: {
        ...this.Properties.DistributionConfig,
        WebACLId: webACLId
      }
    }
    return _this
  }
  usehttp2 (http2: boolean = true): CloudFrontCDN {
    const _this = this
    _this.Properties = {
      DistributionConfig: {
        ...this.Properties.DistributionConfig,
        HttpVersion: http2 ? 'http2' : 'http1.1'
      }
    }
    return _this
  }
  priceClass (input: validPriceClass | validPriceClassStrings = 'PriceClass_All'): CloudFrontCDN {
    const _this = this
    _this.Properties = {
      DistributionConfig: {
        ...this.Properties.DistributionConfig,
        PriceClass: input
      }
    }
    return _this
  }
  defaultObject (defaultObj: string): CloudFrontCDN {
    const _this = this
    _this.Properties = {
      DistributionConfig: {
        ...this.Properties.DistributionConfig,
        DefaultRootObject: defaultObj
      }
    }
    return _this
  }
  useIpV6 (useV6: boolean = true): CloudFrontCDN {
    const _this = this
    _this.Properties = {
      DistributionConfig: {
        ...this.Properties.DistributionConfig,
        IPV6Enabled: useV6
      }
    }
    return _this
  }
  enabled (isEnabled: boolean = true): CloudFrontCDN {
    const _this = this
    _this.Properties = {
      DistributionConfig: {
        ...this.Properties.DistributionConfig,
        Enabled: isEnabled
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
  logging?: IcdnLoggingInput
  viewerCertificate?: IcdnViewerCert
  comments?: string
  enabled?: boolean
  isIpv6?: boolean
  aliases?: string | string[]
  webACLId?: string
  defaultRootObject?: string
  httpVersion?: 'http1.1' | 'http2'
  priceClass?: validPriceClass | validPriceClassStrings
  tags?: Itags | Itags[]
}
