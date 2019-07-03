import { IRef, genComponentName } from '../Template'
import { IamStatement } from './statements'
import generate from 'nanoid/generate'

export class IamPolicy {
  name: string
  Type = 'AWS::IAM::Policy'
  Properties: {
    PolicyDocument: IPolicyDoc
    PolicyName: string
    Groups?: (string | IRef)[]
    Roles?: (string | IRef)[]
    User?: (string | IRef)[]
  }

  private _genId (length: number = 30): string {
    const alphabet = '2346789qwertyupasdfghjkzxcvbnmQWERTYUPAFGHJKLZXCVBNM'
    return generate(alphabet, length)
  }

  constructor (name?: string) {
    this.name = name || genComponentName()
    this.Properties = {
      PolicyName: this.name,
      PolicyDocument: {
        Version: '2012-10-17',
        Id: this.name,
        Statement: []
      }
    }
  }
  policyName (input: string) {
    this.Properties.PolicyName = input
    return this
  }
  policyDocId (input: string) {
    this.Properties.PolicyDocument.Id = input
    return this
  }

  statements (...statements: IamStatement[]) {
    this.Properties.PolicyDocument.Statement = [
      ...this.Properties.PolicyDocument.Statement,
      ...statements
    ]
    return this
  }
  addStatements (...statements: IamStatement[]) {
    this.Properties.PolicyDocument.Statement = this.Properties.PolicyDocument.Statement.concat(
      statements
    )
    return this
  }
  statementFilter (
    filterFn: (value: IamStatement, index: number, array: IamStatement[]) => boolean
  ) {
    this.Properties.PolicyDocument.Statement = this.Properties.PolicyDocument.Statement.filter(
      filterFn
    )
    return this
  }
  clearStatements () {
    this.Properties.PolicyDocument.Statement = []
    return this
  }
  toJSON (): IIamPolicy {
    return {
      [this.name]: {
        Type: 'AWS::IAM::Policy',
        Properties: this.Properties
      }
    }
  }
  NamedPolicy () {
    return {
      PolicyName: this.Properties.PolicyName,
      PolicyDocument: this.Properties.PolicyDocument
    }
  }
  Ref (): IRef {
    return { Ref: this.name }
  }
}

// #region interfaces

export interface IPolicyDoc {
  Version?: '2012-10-17'
  Id?: string
  Statement: IamStatement[]
}
interface IIamPolicy {
  [name: string]: {
    Type: 'AWS::IAM::Policy'
    Properties: {
      PolicyDocument: IPolicyDoc
      PolicyName: string
      Groups?: (string | IRef)[]
      Roles?: (string | IRef)[]
      User?: (string | IRef)[]
    }
  }
}

// #endregion interfaces
