/* eslint no-unused-vars: ["error", { "args": "none" }] */
import { Itags, ITags } from '../../Template'
import { Tags } from './tags'
import { versioningConfig } from './versioningConfiguration'
import { accelerate } from './accelerateConfiguration'
import {
  IBucketAnalyticsItem,
  IbucketAnalyticsConfigItem,
  analyticsConfig
} from './analyticsConfiguration'
import { IBucketServerSideEncRule, IbucketParamSSRule, encryptionConfig } from './bucketEncryption'
import { IBucketCorsRule, corsConfig, IbucketCorsRule } from './corsConfiguration'
import {
  IBucketInventoryRule,
  IbucketInventoryRule,
  inventoryConfig
} from './inventoryConfiguration'
import {
  IBucketLifecycleItem,
  lifecycleConfig,
  IbucketlifecycleValidRules
} from './lifecycleConfiguration'
import { IBucketLogging, loggingConfg, IbucketLoggingConfig } from './loggingConfiguration'
import { IBucketMetricsRule, IbucketMetricsRule, metricsConfig } from './metricsConfiguration'
import {
  IBucketSeparatedNotificationSets,
  IbucketNotifs,
  notifConfig
} from './notificationConfiguration'
import {
  IBucketPublicAccessConfig,
  IbucketPublicAccessConfig,
  publicAccesConfig
} from './publicAccessBlockConfiguration'
import {
  IBucketReplicationRule,
  IbucketReplicaConfig,
  replicationConfig
} from './replicationConfiguration'
import {
  IBucketWebsiteConfigElem,
  IbucketWebsiteConfig,
  websiteConfig
} from './websiteConfiguration'
import randomWord from 'random-word'
import Randoma from 'randoma'

export class S3Bucket implements IndexSignature {
  name: string
  Type: 'AWS::S3::Bucket'
  Properties?: {
    BucketName?: string
    AccessControl?: IValidPublicAccessControls
    AccelerateConfiguration?: { AccelerationStatus: 'Enabled' | 'Suspended' }
    AnalyticsConfigurations?: IBucketAnalyticsItem[]
    BucketEncryption?: { ServerSideEncryptionConfiguration: IBucketServerSideEncRule[] }
    CorsConfiguration?: { CorsRules: IBucketCorsRule[] }
    InventoryConfigurations?: IBucketInventoryRule[]
    LifecycleConfiguration?: { Rules: IBucketLifecycleItem[] }
    LoggingConfiguration?: IBucketLogging
    MetricsConfigurations?: IBucketMetricsRule[]
    NotificationConfiguration?: IBucketSeparatedNotificationSets
    PublicAccessBlockConfiguration?: IBucketPublicAccessConfig
    ReplicationConfiguration?: {
      Role: string
      Rules: IBucketReplicationRule[]
    }
    Tags?: ITags[]
    VersioningConfiguration?: { Status: 'Suspended' | 'Enabled' }
    WebsiteConfiguration?: IBucketWebsiteConfigElem
    [prop: string]: any
  }
  [key: string]: any

  // @todo these will be usesful when validating incoming templates?
  // private properties = [
  //   'BucketName',
  //   'AccessControl',
  //   'AccelerateConfiguration',
  //   'AnalyticsConfiguration',
  //   'BucketEncryption',
  //   'CorsConfiguration',
  //   'InventoryConfiguration',
  //   'LifecycleConfiguration',
  //   'LoggingConfiguration',
  //   'MetricsConfiguration',
  //   'NotificationConfiguration',
  //   'PublicAccessBlockConfiguration',
  //   'ReplicationConfiguration',
  //   'Tags',
  //   'VersioningConfiguration',
  //   'WebsiteConfiguration'
  // ]

  // private bucketACLS = [
  //   'AuthenticatedRead',
  //   'AwsExecRead',
  //   'BucketOwnerRead',
  //   'BucketOwnerFullControl',
  //   'LogDeliveryWrite',
  //   'Private',
  //   'PublicRead',
  //   'PublicReadWrite'
  // ]

  /**
   * S3Bucket Class that models info needed for Cloudformation.
   *
   * @description S3 Object maker
   * @example
   *  // #! node myExample.js
   *  var ImportESM = require('esm')(module)
   *  var S3Bucket = ImportESM('./src/s3/bucket.js')
   *  var myBucket = new S3Bucket()
   *  console.log({myBucket})
   */
  constructor (props: IndexSignature = {}) {
    this.Type = 'AWS::S3::Bucket'
    const defaultName = `arn:aws:s3:::${randomWord()}-${randomWord()}-${new Randoma({
      seed: new Date().getTime()
    }).integer()}`

    let { name, ...inprops } = { name: defaultName, ...props }
    this.name = name

    this.Properties = inprops
  }

  clean (): S3Bucket {
    let _this: S3Bucket = this
    let propNameCheckList: string[] = [...Object.getOwnPropertyNames(_this)]
    // @todo add back when template import is supported
    // let propRemovePrivate: string[] = ['bucketACLS', 'properties']
    // propRemovePrivate.forEach(removeMe => {
    //   delete _this[removeMe]
    // })

    propNameCheckList.forEach(propName => {
      if (_this[propName] === null || _this[propName] === undefined || _this[propName] === {}) {
        delete _this[propName]
      }
    })

    return _this
  }

  toJSON (replacer?: any, space?: any) {
    const removeEmpty = (obj: any) => {
      Object.keys(obj).forEach(key => {
        if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key])
        else if (obj[key] === undefined) delete obj[key]
      })
      return obj
    }

    const _this =
      this.Properties && Object.keys(this.Properties).length > 0
        ? {
          [this.name]: {
            Type: this.Type,
            Properties: removeEmpty(this.Properties)
          }
        }
        : {
          [this.name]: {
            Type: this.Type
          }
        }
    return _this
  }

  clearOut (propName: string): S3Bucket {
    const _this: S3Bucket = this
    if (propName && _this.Properties) {
      if (propName in _this.Properties) {
        delete _this.Properties[propName]
      }
    }
    return _this
  }

  accelerate (status: boolean = true): S3Bucket {
    // true = Enabled
    // false = Suspened
    // use clearOut for removal
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...accelerate(status)
    }
    return _this
  }
  analytics (configs: IbucketAnalyticsConfigItem | IbucketAnalyticsConfigItem[]): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...analyticsConfig(configs)
    }
    return _this
  }
  encryption (rules: IbucketParamSSRule | IbucketParamSSRule[] = {}): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...encryptionConfig(rules)
    }
    return _this
  }
  cors (rules: IbucketCorsRule | IbucketCorsRule[]): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...corsConfig(rules)
    }
    return _this
  }
  inventory (configs: IbucketInventoryRule | IbucketInventoryRule[]): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...inventoryConfig(configs)
    }
    return _this
  }
  lifecycle (rules: IbucketlifecycleValidRules | IbucketlifecycleValidRules[]): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...lifecycleConfig(rules)
    }
    return _this
  }
  logging (loggingCfg: IbucketLoggingConfig = {}): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...loggingConfg(loggingCfg)
    }
    return this
  }
  metrics (meterThese: IbucketMetricsRule | IbucketMetricsRule[]): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...metricsConfig(meterThese)
    }
    return _this
  }

  publicAccess (params: IbucketPublicAccessConfig = {}): S3Bucket {
    const _this: S3Bucket = this

    _this.Properties = {
      ..._this.Properties,
      ...publicAccesConfig(params)
    }
    return _this
  }
  notifications (notifList: IbucketNotifs | IbucketNotifs[]): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...notifConfig(notifList)
    }
    return _this
  }
  replication (params: IbucketReplicaConfig): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...replicationConfig(params)
    }
    return _this
  }
  versions (isEnabled: boolean = true): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...versioningConfig(isEnabled)
    }
    return _this
  }
  tags (tagList: Itags | Itags[]): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...Tags(tagList)
    }
    return _this
  }
  website (config: boolean | IbucketWebsiteConfig = true): S3Bucket {
    let AccessControl: IValidPublicAccessControls = 'PublicRead'
    if (config === true) {
      this.Properties = {
        ...this.Properties,
        AccessControl,
        ...websiteConfig()
      }
      return this
    } else if (config) {
      this.Properties = {
        ...this.Properties,
        AccessControl,
        ...websiteConfig(config)
      }
      return this
    } else {
      return this
    }
  }

  Ref (): IRef {
    /**
     * When the logical ID of this resource is provided to the Ref intrinsic function,
     * Ref returns the resource name.
     * Example: mystack-mybucket-kdwwxmddtr2g.
     * */
    return { Ref: this.name }
  }

  Arn (): IGetAtt {
    /**
     * Returns the Amazon Resource Name (ARN) of the specified bucket.
     * Example: arn:aws:s3:::mybucket
     * */
    return { 'Fn::GetAtt': [this.name, 'Arn'] }
  }

  DomainName (): IGetAtt {
    /**
     * Returns the IPv4 DNS name of the specified bucket.
     * Example: mystack-mybucket-kdwwxmddtr2g.s3.amazonaws.com
     * Or with a `DualStackDomainName` it returns the IPv6 DNS name of the specified bucket.
     *
     * Example: mystack-mybucket-kdwwxmddtr2g.s3.dualstack.us-east-2.amazonaws.com
     */
    return { 'Fn::GetAtt': [this.name, 'DomainName'] }
  }

  RegionalDomainName (): IGetAtt {
    /**
     * Returns the regional domain name of the specified bucket
     * Example: mystack-mybucket-kdwwxmddtr2g.s3.us-east-2.amazonaws.com
     */

    return { 'Fn::GetAtt': [this.name, 'RegionalDomainName'] }
  }

  WebsiteURL (): IGetAtt {
    /**
     * Returns the Amazon S3 website endpoint for the specified bucket.
     * Example (IPv4): http://mystack-mybucket-kdwwxmddtr2g.s3-website-us-east-2.amazonaws.com/
     * Example (IPv6): http://mystack-mybucket-kdwwxmddtr2g.s3.dualstack.us-east-2.amazonaws.com/
     */
    return { 'Fn::GetAtt': [this.name, 'WebsiteURL'] }
  }

  // outputs (existingOutputs: any) {
  //   return {
  //     ...existingOutputs,
  //     [`${this.name}-websiteURL`]: {
  //       Description: 'The WebsiteURL of the S3Bucket',
  //       Value: this.WebsiteURL()
  //     }
  //   }
  // }

  // validate () {
  //   const testStatusBuilder = (passing = true, msgAccum = {}) => {
  //     return (pass, addMsg) => {
  //       msgAccum = pass ? { ...msgAccum } : { ...msgAccum, ...addMsg }
  //       passing = passing && pass
  //       return {
  //         test: pass,
  //         allTestsPass: passing,
  //         failMsgs: msgAccum
  //       }
  //     }
  //   }
  //   const didTestPass = testStatusBuilder()

  //   // @ts-ignore
  //   const { allTestsPass, failMsgs } = validations(this).reduce((p, t) => {
  //     return didTestPass(t.test, t.msg)
  //   })
  //   return { passes: allTestsPass, failMsgs }
  // }
}

interface IRef {
  Ref: string
}
interface IGetAtt {
  'Fn::GetAtt': [string, string]
}

type IValidPublicAccessControls =
  | 'AuthenticatedRead'
  | 'AwsExecRead'
  | 'BucketOwnerRead'
  | 'BucketOwnerFullControl'
  | 'LogDeliveryWrite'
  | 'Private'
  | 'PublicRead'
  | 'PublicReadWrite'

interface IndexSignature {
  [key: string]: any
}
