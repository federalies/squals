import randomWord from 'random-word'
import Randoma from 'randoma'
import { IRef } from '../Template'

export class IamInstanceProfile {
  name: string
  Type = 'AWS::IAM::InstanceProfile'
  Properties: {
    Roles: (string | IRef)[]
    InstanceProfileName?: string
    Path?: string
  }
  constructor (i?: string | IInstanceProfile) {
    if (i) {
      if (typeof i === 'string') {
        this.name = i
        this.Properties = { Roles: [] }
      } else {
        this.name = Object.keys(i)[0]
        this.Properties = i[this.name].Properties
      }
    } else {
      this.name = `${randomWord()}${new Randoma({
        seed: new Date().getTime()
      }).integer()}`
      this.Properties = { Roles: [] }
    }
  }
}

interface IInstanceProfile {
  [name: string]: {
    Type: 'AWS::IAM::InstanceProfile'
    Properties: {
      Roles: (string | IRef)[]
      InstanceProfileName?: string
      Path?: string
    }
  }
}
