export class S3BucketPolicy {
  constructor (name = null, props = {}) {
    this.Type = 'AWS::S3::BucketPolicy'
    this.Properties = { name, ...props }
  }
}
