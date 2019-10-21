/**
 * @module CloudFrontCDN
 */

import randomWord from 'random-word'
import Randoma from 'randoma'

export class OriginAccessID {
  name: string
  Type: 'AWS::CloudFront::CloudFrontOriginAccessIdentity'
  Properties: {
    CloudFrontOriginAccessIdentityConfig: {
      Comment: string
    }
  }
  constructor (_in: { name?: string; comment: string }) {
    const { comment } = _in

    let defaultName = `${randomWord()}${new Randoma({
      seed: new Date().getTime()
    }).integer()}`

    this.name = { name: defaultName, ..._in }.name
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
