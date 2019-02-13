export class CloudFrontCDN {
  constructor (props = {}) {
    props = {
      Aliases: [],
      Enabled: true,
      IPV6Enabled: true,
      DefaultRootObject: 'index.html',
      WebACLId: '',
      Comment: '',
      PriceClass: 'PriceClass_All', // enum
      HttpVersion: 'http2', // enum
      ...props
    }
    this.Type = 'AWS::CloudFront::Distribution'
    this.Properties = {
      DistributionConfig: {
        Aliases: props.Aliases,
        Enabled: props.Enabled,
        IPV6Enabled: props.IPV6Enabled,
        DefaultRootObject: props.DefaultRootObject,
        HttpVersion: props.HttpVersion,
        Comment: props.Comment,
        PriceClass: props.PriceClass,
        WebACLId: props.WebACLId
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
    this.Type = 'a'
  }
}

export class CloudFrontStreaming {
  constructor (props = {}) {
    this.Type = 'a'
  }
}
