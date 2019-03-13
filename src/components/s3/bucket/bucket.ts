/* eslint no-unused-vars: ["error", { "args": "none" }] */

// import * as url from 'url'
// import { isEmpty } from 'lodash-es'
import { OutTags, InTags, Tags } from './tags'
import { versioning } from './versioningConfiguration'
import { accelerate } from './accelerateConfiguration'
import { OutAnalyticsItem, InAnalyticsConfigItem, analyticsConfig } from './analyticsConfiguration'
import { OutServerSideEncRule, InParamSSRule, bucketEncryption } from './bucketEncryption'
import { OutCorsRule, corsConfig, InCorsRule } from './corsConfiguration'
import { OutInventoryRule, InInventoryRule, inventoryConfig } from './inventoryConfiguration'
import { ILifecycleItem, lifecycleConfig, IlifecycleValidRules } from './lifecycleConfiguration'
import { OutLogging, loggingConfg, InLoggingConfig } from './loggingConfiguration'
import { OutMetricsRule, InMetricsRule, metricsConfig } from './metricsConfiguration'
import { OutSeparatedNotificationSets, InNotifs, notifConfig } from './notificationConfiguration'
import {
  OutPublicAccessConfig,
  InPublicAccessConfig,
  publicAccesConfig
} from './publicAccessBlockConfiguration'
import { OutReplicationRule, InReplicaConfig, replicationConfig } from './replicationConfiguration'
import { OutWebsiteConfigElem, inWebsiteConfig, websiteConfig } from './websiteConfiguration'
import randomWord from 'random-word'
import Randoma from 'randoma'

export class S3Bucket implements IndexSignature {
  name: string
  Type: 'AWS::S3::Bucket'
  Properties?: {
    BucketName?: string
    AccessControl?: IValidPublicAccessControls
    AccelerateConfiguration?: { AccelerationStatus: 'Enabled' | 'Suspended' }
    AnalyticsConfigurations?: OutAnalyticsItem[]
    BucketEncryption?: { ServerSideEncryptionConfiguration: OutServerSideEncRule[] }
    CorsConfiguration?: { CorsRules: OutCorsRule[] }
    InventoryConfigurations?: OutInventoryRule[]
    LifecycleConfiguration?: { Rules: ILifecycleItem[] }
    LoggingConfiguration?: OutLogging
    MetricsConfigurations?: OutMetricsRule[]
    NotificationConfiguration?: OutSeparatedNotificationSets
    PublicAccessBlockConfiguration?: OutPublicAccessConfig
    ReplicationConfiguration?: {
      Role: string
      Rules: OutReplicationRule[]
    }
    Tags?: OutTags[]
    VersioningConfiguration?: { Status: 'Suspended' | 'Enabled' }
    WebsiteConfiguration?: OutWebsiteConfigElem
    [prop: string]: any
  }
  [key: string]: any
  private properties = [
    'BucketName',
    'AccessControl',
    'AccelerateConfiguration',
    'AnalyticsConfiguration',
    'BucketEncryption',
    'CorsConfiguration',
    'InventoryConfiguration',
    'LifecycleConfiguration',
    'LoggingConfiguration',
    'MetricsConfiguration',
    'NotificationConfiguration',
    'PublicAccessBlockConfiguration',
    'ReplicationConfiguration',
    'Tags',
    'VersioningConfiguration',
    'WebsiteConfiguration'
  ]

  private bucketACLS = [
    'AuthenticatedRead',
    'AwsExecRead',
    'BucketOwnerRead',
    'BucketOwnerFullControl',
    'LogDeliveryWrite',
    'Private',
    'PublicRead',
    'PublicReadWrite'
  ]

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

    const noop = (input: any) => {
      return input
    }

    noop(this.bucketACLS) // @todo use these sans noop
    noop(this.properties)
  }

  clean (): S3Bucket {
    let _this: S3Bucket = this
    let propNameCheckList: string[] = [...Object.getOwnPropertyNames(_this)]
    let propRemovePrivate: string[] = ['bucketACLS', 'properties']

    propRemovePrivate.forEach(removeMe => {
      delete _this[removeMe]
    })

    propNameCheckList.forEach(propName => {
      if (_this[propName] === null || _this[propName] === undefined || _this[propName] === {}) {
        delete _this[propName]
      }
    })

    return _this
  }

  toJSON (replacer: any, space: any): string {
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

    return JSON.stringify(
      {
        [this.name]: {
          Type: this.Type
        }
      },
      replacer,
      space
    )
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

  accelerate (status?: boolean): S3Bucket {
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
  analytics (configs: InAnalyticsConfigItem | InAnalyticsConfigItem[]): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...analyticsConfig(configs)
    }
    return _this
  }
  encryption (rules: InParamSSRule | InParamSSRule[]): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...bucketEncryption(rules)
    }
    return _this
  }
  cors (rules: InCorsRule | InCorsRule[]): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...corsConfig(rules)
    }
    return _this
  }
  inventory (configs: InInventoryRule | InInventoryRule[]): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...inventoryConfig(configs)
    }
    return _this
  }
  lifecycle (rules: IlifecycleValidRules | IlifecycleValidRules[]): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...lifecycleConfig(rules)
    }
    return _this
  }
  logging (loggingCfg: InLoggingConfig): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...loggingConfg(loggingCfg)
    }
    return this
  }
  metrics (meterThese: InMetricsRule | InMetricsRule[]): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...metricsConfig(meterThese)
    }
    return _this
  }

  publicAccess (params: InPublicAccessConfig): S3Bucket {
    const _this: S3Bucket = this

    _this.Properties = {
      ..._this.Properties,
      ...publicAccesConfig(params)
    }
    return _this
  }
  notifications (notifList: InNotifs | InNotifs[]): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...notifConfig(notifList)
    }
    return _this
  }
  replication (params: InReplicaConfig): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...replicationConfig(params)
    }
    return _this
  }
  version (isEnabled: boolean = true): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...versioning(isEnabled)
    }
    return _this
  }
  tags (tagList: InTags | InTags[]): S3Bucket {
    const _this: S3Bucket = this
    _this.Properties = {
      ..._this.Properties,
      ...Tags(tagList)
    }
    return _this
  }
  website (config: boolean | inWebsiteConfig = true): S3Bucket {
    let AccessControl: IValidPublicAccessControls = 'PublicRead'

    if (config === false) {
      if (this.Properties) delete this.Properties.WebsiteConfiguration
      return this
    } else if (config && config === true) {
      this.Properties = {
        ...this.Properties,
        ...websiteConfig(),
        AccessControl
      }
      return this
    } else if (config) {
      this.Properties = {
        ...this.Properties,
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

interface IInS3Bucket {}
interface IRef {
  Ref: string
}
interface IGetAtt {
  'Fn::GetAtt': [string, string]
}

// interface IValidation {
//   passes: boolean
//   failMsgs: string
// }

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
