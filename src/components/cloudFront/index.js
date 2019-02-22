/* eslint no-unused-vars: ["error", { "args": "none" }] */

export class CloudFrontCDN {
  constructor (props = {}) {
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
