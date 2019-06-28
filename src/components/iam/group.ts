import { IRef, IGetAtt } from '../Template'
import { IamPolicy } from './policy'
import randomWord from 'random-word'
import Randoma from 'randoma'

export class IamGroup {
  name: string
  Type = 'AWS::IAM::Group'
  Properties: {
    GroupName?: string
    ManagedPolicyArns?: (string | IGetAtt)[]
    Path?: string
    Policies?: (IamPolicy | IRef)[]
  }
  constructor (i?: string | IGroup) {
    // i - user: string
    // i - template obj

    if (i) {
      if (typeof i === 'string') {
        this.name = i
        this.Properties = {}
      } else {
        this.name = Object.keys(i)[0]
        this.Properties = i[this.name].Properties
      }
    } else {
      this.Properties = {}
      this.name = `${randomWord()}${new Randoma({
        seed: new Date().getTime()
      }).integer()}`
    }
  }
  Ref (): IRef {
    return { Ref: this.name }
  }
  Arn (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'SecretAccessKey'] }
  }
  toJSON () {
    return { [this.name]: { Type: this.Type, Properties: this.Properties } }
  }
}

interface IGroup {
  [name: string]: {
    Type: 'AWS::IAM::Group'
    Properties: {
      GroupName?: string
      ManagedPolicyArns?: (string | IGetAtt)[]
      Path?: string
      Policies?: IamPolicy[] | IRef[]
    }
  }
}
