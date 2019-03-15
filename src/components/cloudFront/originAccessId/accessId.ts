//
//
export class OriginAccessID {
  name: string
  Type: 'AWS::CloudFront::CloudFrontOriginAccessIdentity'
  Properties: {
    CloudFrontOriginAccessIdentityConfig: {
      Comment: string
    }
  }
  constructor (_in: { name?: string; comment: string }) {
    const { name, comment } = _in
    if (name) {
      this.name = name
    } else {
      this.name = `Comment:${comment}`
    }
    this.Type = 'AWS::CloudFront::CloudFrontOriginAccessIdentity'
    this.Properties = { CloudFrontOriginAccessIdentityConfig: { Comment: comment } }
  }

  toJSON () {
    const _this = {
      [name]: {
        Type: this.Type,
        ...this.Properties
      }
    }
  }

  Ref () {
    return { Ref: this.name }
  }

  S3CanonicalUserId () {
    return { 'Fn::GetAtt': [this.name, 'S3CanonicalUserId'] }
  }
}
