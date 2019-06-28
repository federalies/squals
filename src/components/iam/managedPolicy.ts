import { IRef } from '../Template'
import { IPolicyDoc } from './policy'
import randomWord from 'random-word'
import Randoma from 'randoma'

export class IamManagedPolicy {
  name: string
  Type = 'AWS::IAM::ManagedPolicy'
  Properties: {
    PolicyDocument: IPolicyDoc | IRef
    ManagedPolicyName?: string
    Description?: string
    Path?: string
    Groups?: (IRef | string)[]
    Roles?: (IRef | string)[]
    Users?: (IRef | string)[]
  }

  constructor (i: IPolicyMin | IManagedPolicy) {
    const { PolicyDocument, PolicyName } = i
    if (PolicyDocument && PolicyName) {
      i = i as IPolicyMin
      this.name = `${randomWord()}${new Randoma({
        seed: new Date().getTime()
      }).integer()}`
      this.Properties = { PolicyDocument: i.PolicyDocument, ManagedPolicyName: i.PolicyName }
    } else {
      i = i as IManagedPolicy
      this.name = Object.keys(i)[0]
      this.Properties = i[this.name].Properties
    }
  }
  Ref (): IRef {
    return { Ref: this.name }
  }
  toJSON (): IManagedPolicy {
    return {
      [this.name]: {
        Type: 'AWS::IAM::ManagedPolicy',
        Properties: this.Properties
      }
    }
  }
}

interface IPolicyMin {
  PolicyDocument: IPolicyDoc
  PolicyName: string
}
interface IManagedPolicy {
  [name: string]: {
    Type: 'AWS::IAM::ManagedPolicy'
    Properties: {
      PolicyDocument: IPolicyDoc | IRef
      ManagedPolicyName?: string
      Description?: string
      Path?: string
      Groups?: (IRef | string)[]
      Roles?: (IRef | string)[]
      Users?: (IRef | string)[]
    }
  }
}
