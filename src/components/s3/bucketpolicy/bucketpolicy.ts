import randomWord from 'random-word'
import Randoma from 'randoma'
import { AccessPolicy } from './accessPolicy'

interface Ref {
  Ref: string
}

export class S3BucketPolicy {
  Type: 'AWS::S3::BucketPolicy'
  name?: string
  Properties?: {
    Bucket: string | Ref
    PolicyDocument: AccessPolicy
  }

  constructor (props: any = {}, name: string = '') {
    this.Type = 'AWS::S3::BucketPolicy'
    this.Properties = { ...props }
    this.name =
      name === ''
        ? `arn:aws:s3:::${randomWord()}-${randomWord()}-${new Randoma({
          seed: new Date().getTime()
        }).integer()}`
        : name
  }
}
