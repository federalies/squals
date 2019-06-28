import randomWord from 'random-word'
import Randoma from 'randoma'
import { IamPolicy, IPolicyDoc } from './policy'
import { IGetAtt, IRef } from '../Template'

export class IamUser {
  name: string
  Type = 'AWS::IAM::User'
  Properties: {
    UserName?: string
    Groups?: (string | IRef)[]
    Path?: string
    ManagedPolicyArns?: string[]
    PermissionsBoundary?: string
    LoginProfile?: {
      Password: string
      PasswordResetRequired?: boolean // default true
    }
    Policies?: (IPolicyDoc | IRef)[]
  }

  constructor (p?: string | IUser) {
    if (p) {
      if (typeof p === 'string') {
        this.name = p
        this.Properties = {}
      } else {
        this.name = Object.keys(p)[0]
        this.Properties = p[this.name].Properties
      }
    } else {
      this.name = `${randomWord()}${new Randoma({
        seed: new Date().getTime()
      }).integer()}`
      this.Properties = {}
    }
  }
  toJSON (): IUser {
    return {
      [this.name]: { Type: 'AWS::IAM::User', Properties: this.Properties }
    }
  }
  get Arn (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'Arn'] }
  }
  get Ref (): IRef {
    return { Ref: this.name }
  }
}

interface IUser {
  [name: string]: {
    Type: 'AWS::IAM::User'
    Properties: {
      UserName?: string
      Groups?: (string | IRef)[]
      Path?: string
      ManagedPolicyArns?: string[]
      PermissionsBoundary?: string
      LoginProfile?: {
        Password: string
        PasswordResetRequired?: boolean // default true
      }
      Policies?: (IPolicyDoc | IRef)[]
    }
  }
}
