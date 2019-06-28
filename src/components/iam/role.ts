import { IamPolicy, IPolicyDoc } from './policy'
import { IGetAtt, IRef } from '../Template'
import randomWord from 'random-word'
import Randoma from 'randoma'

export class IamRole {
  name: string
  Type = 'AWS::IAM::Role'
  Properties: {
    AssumeRolePolicyDocument: {
      PolicyName: string
      PolicyDocument: IPolicyDoc
    }
    MaxSessionDuration?: number
    Path?: string
    PermissionsBoundary?: string
    ManagedPolicyArns?: (string | IGetAtt)[]
    Policies?: (IamPolicy | IRef)[]
    RoleName?: string
  }
  constructor (i: IRole | IRole_min) {
    if (this.isIRoleJSON(i)) {
      this.name = Object.keys(i)[0]
      this.Properties = i[this.name].Properties
    } else {
      this.name =
        i.name ||
        `${randomWord()}${new Randoma({
          seed: new Date().getTime()
        }).integer()}`
      this.Properties = {
        AssumeRolePolicyDocument: { PolicyName: i.PolicyName, PolicyDocument: i.PolicyDocument }
      }
    }
  }
  private isIRoleJSON (i: IRole | IRole_min): i is IRole {
    return Object.keys(i).length === 1
  }
  toJSON (): IRole {
    return {
      [this.name]: {
        Type: 'AWS::IAM::Role',
        Properties: this.Properties
      }
    }
  }
  Ref (): IRef {
    return { Ref: this.name }
  }
  Arn (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'Arn'] }
  }
  RoleId (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'RoleId'] }
  }
}

interface IRole {
  [name: string]: {
    Type: 'AWS::IAM::Role'
    Properties: {
      AssumeRolePolicyDocument: {
        PolicyName: string
        PolicyDocument: IPolicyDoc
      }
      MaxSessionDuration?: number
      Path?: string
      PermissionsBoundary?: string
      ManagedPolicyArns?: (string | IGetAtt)[]
      Policies?: (IamPolicy | IRef)[]
      RoleName?: string
    }
  }
}
interface IRole_min {
  name?: string
  PolicyName: string
  PolicyDocument: IPolicyDoc
}
