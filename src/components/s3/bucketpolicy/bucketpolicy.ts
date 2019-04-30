import randomWord from 'random-word'
import Randoma from 'randoma'
import { AccessPolicy } from './accessPolicy'

interface Ref {
  Ref: string
}

export class S3BucketPolicy {
  name: string
  Type: 'AWS::S3::BucketPolicy'
  Properties?: {
    Bucket: string | Ref
    PolicyDocument: AccessPolicy
  }

  constructor (props: any = {}) {
    this.Type = 'AWS::S3::BucketPolicy'
    let defaultName = `${randomWord()}${new Randoma({
      seed: new Date().getTime()
    }).integer()}`

    this.Properties = { ...props }
    this.name = { name: defaultName, ...props }.name
  }
  toJSON (): object {
    return {
      [this.name]: {
        Type: this.Type,
        Properties: this.Properties
      }
    }
  }
}
