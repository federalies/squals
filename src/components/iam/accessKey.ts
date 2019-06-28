import { IRef, IGetAtt } from '../Template'
import randomWord from 'random-word'
import Randoma from 'randoma'

export class IamAccessKey {
  Type = 'AWS::IAM::AccessKey'
  name: string
  Properties: {
    UserName: string
    Serial?: number
    Status?: 'Active' | 'Inactive'
  }
  /**
   *
   * @param i - Input to AccessKey is `username` or the exported object from a template.
   * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-accesskey.htmlhttps://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-accesskey.html>
   */
  constructor (i: string | IAccessKey) {
    if (typeof i === 'string') {
      this.Properties = { UserName: i }
      this.name = `${randomWord()}${new Randoma({
        seed: new Date().getTime()
      }).integer()}`
    } else {
      this.name = Object.keys(i)[0]
      this.Type = i[this.name].Type
      this.Properties = i[this.name].Properties
    }
  }
  isActive (b: boolean): IamAccessKey {
    this.Properties.Status = b ? 'Active' : 'Inactive'
    return this
  }
  toJSON (): IAccessKey {
    return { [this.name]: { Type: 'AWS::IAM::AccessKey', Properties: this.Properties } }
  }
  Ref (): IRef {
    return { Ref: this.name }
  }
  SecretAccessKey (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'SecretAccessKey'] }
  }
}

interface IAccessKey {
  [name: string]: {
    Type: 'AWS::IAM::AccessKey'
    Properties: {
      UserName: string
      Serial?: number
      Status?: 'Active' | 'Inactive'
    }
  }
}
