/* eslint no-unused-vars: ["error", { "args": "none" }] */
import randomWord from 'random-word'
import Randoma from 'randoma'

export class CloudFrontCDN {
  constructor (props = {}, name = null) {
    this.name =
      name ||
      `${randomWord()}-${randomWord()}-${new Randoma({
        seed: new Date().getTime()
      }).integer()}`

    this.Type = 'AWS::CloudFront::Distribution'
    props = {
      Enabled: true,
      IPV6Enabled: true,
      DefaultRootObject: 'index.html',
      PriceClass: 'PriceClass_All', // enum
      HttpVersion: 'http2', // enum
      WebACLId: null, // '',
      Comment: null, // '',
      Aliases: null, // [],
      ...props
    }
    this.Properties = {
      DistributionConfig: {
        ...props
        // CacheBehaviors: [],
        // CustomErrorResponses: [],
        // Origins: [],
        // DefaultCacheBehavior: DefaultCacheBehavior,
        // Logging: Logging,
        // Restrictions: Restriction,
        // ViewerCertificate: ViewerCertificate
      },
      Tags: []
    }
  }
  addOrigins (origins) {
    this.Properties.DistributionConfig = {
      ...this.Properties.DistributionConfig,
      Origins: origins
    }
    return this
  }

  DomainName () {
    /**
     * Returns the Amazon Resource Name (ARN) of the specified bucket.
     * Example: arn:aws:s3:::mybucket
     * */
    return { 'Fn::GetAtt': [this.name, 'DomainName'] }
  }
}

export class CloudFrontID {
  constructor (props = {}) {
    this.Type = 'AWS::CloudFront::CloudFrontOriginAccessIdentity'
    this.Properties = {
      CloudFrontOriginAccessIdentityConfig:
        'CloudFrontOriginAccessIdentityConfig'
    }
  }

  Ref () {
    return {}
  }
  DomainName () {
    return {}
  }
}

export class CloudFrontStreaming {
  constructor (props = {}) {
    this.Type = 'AWS::CloudFront::StreamingDistribution'
  }
}
