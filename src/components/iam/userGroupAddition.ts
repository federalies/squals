import randomWord from 'random-word'
import Randoma from 'randoma'
import { IRef } from '../Template'

export class IamUserGroupAddition {
  name: string
  Type = 'AWS::IAM::UserToGroupAddition'
  Properties: {
    GroupName: string
    Users: (string | IRef)[]
  }

  constructor (p: IUserGroupAdd_min | IUserGroupAdd) {
    const { grp, users } = p
    if (grp && users) {
      p = p as IUserGroupAdd_min
      this.name = p.name
        ? p.name
        : `${randomWord()}${new Randoma({
          seed: new Date().getTime()
        }).integer()}`
      this.Properties = { GroupName: p.grp, Users: p.users }
    } else {
      p = p as IUserGroupAdd
      this.name = Object.keys(p)[0]
      this.Properties = p[this.name].Properties
    }
  }
  toJSON (): IUserGroupAdd {
    return {
      [this.name]: {
        Type: 'AWS::IAM::UserToGroupAddition',
        Properties: this.Properties
      }
    }
  }
  get Ref (): IRef {
    return { Ref: this.name }
  }
}

interface IUserGroupAdd {
  [name: string]: {
    Type: 'AWS::IAM::UserToGroupAddition'
    Properties: {
      GroupName: string
      Users: (string | IRef)[]
    }
  }
}

interface IUserGroupAdd_min {
  grp: string
  users: string[]
  name?: string
}
