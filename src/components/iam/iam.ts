import { IRef } from '../Template'
import generate from 'nanoid/generate'
import { actions } from './actions'
import { conditions } from './conditions'

// #region Policy
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
    if (name) {
      this.name = name
      this.Properties = {
        PolicyName: name,
        PolicyDocument: {
          Version: '2012-10-17',
          Id: name,
          Statement: []
        }
      }
    } else {
      this.name = '__'
      this.Properties = {
        PolicyName: this._genId(),
        PolicyDocument: {
          Id: this._genId(14),
          Version: '2012-10-17',
          Statement: []
        }
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
      // ...statements.map(v => v.toJSON())
      ...statements
    ]
    return this
  }
  addStatements (...statements: IamStatement[]) {
    this.Properties.PolicyDocument.Statement = this.Properties.PolicyDocument.Statement.concat(
      statements
      // statements.map(v => v.toJSON())
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
        Properties: {
          ...this.Properties,
          PolicyDocument: {
            ...this.Properties.PolicyDocument,
            // Statement: this.Properties.PolicyDocument.Statement.map(v => v.toJSON())
            Statement: this.Properties.PolicyDocument.Statement
          }
        }
      }
    }
  }
  Ref (): IRef {
    return { Ref: this.name }
  }
}
// #endregion Policy

// #region Statements
export class IamStatement {
  Sid?: string

  Effect: 'Allow' | 'Deny'
  Condition?: ICondition_out

  Action?: '*' | string | string[]
  NotAction?: '*' | string | string[]

  Resource?: '*' | string | string[]
  NotResource?: '*' | string | string[]

  Principal?: '*' | IPrincipalKinds[]
  NotPrincipal?: '*' | IPrincipalKinds[]

  private _genId (): string {
    const alphabet = '2346789qwertyupasdfghjkzxcvbnmQWERTYUPAFGHJKLZXCVBNM'
    return generate(alphabet, 30)
  }

  static acts = actions()
  static cond = conditions()
  static princ = () => {}
  static copy = (i?: IamPolicy): IamPolicy => {
    // make a new one based on `i`
    return new IamPolicy()
  }

  constructor (id?: string) {
    if (id) {
      this.Sid = id
    }
    this.Effect = 'Allow'
    this.Action = '*'
    this.Resource = '*'
  }
  allows () {
    this.Effect = 'Allow'
    return this
  }
  denies () {
    this.Effect = 'Deny'
    return this
  }
  autoId () {
    this.Sid = this._genId()
    return this
  }
  id (id: string) {
    this.Sid = id
    return this
  }
  actions (...actions: string[]) {
    this.Action = actions.length > 1 ? actions : actions[0]
    return this
  }
  omittedActions (...actions: string[]) {
    this.NotAction = actions.length > 1 ? actions : actions[0]
    return this
  }
  principal (...principals: ['*'] | IPrincipalKinds[]) {
    this.Principal = principals === ['*'] ? '*' : (principals as IPrincipalKinds[])
    return this
  }
  notForPrincipal (...principals: ['*'] | IPrincipalKinds[]) {
    this.NotPrincipal = principals === ['*'] ? '*' : (principals as IPrincipalKinds[])
    return this
  }
  resources (...resources: string[]) {
    this.Resource = resources.length > 1 ? resources : resources[0]
    return this
  }
  omittedResources (...resources: string[]) {
    this.NotResource = resources.length > 1 ? resources : resources[0]
    return this
  }
  when (...conditions: ICondition_in[]) {
    // merge the array based on the operand key then assign to this
    const cond = conditions.reduce(
      (p, c) => {
        const [op, filterData] = Object.entries(c)[0]
        if (op in p) {
          let foundOp = p[op]
          if (Array.isArray(foundOp)) {
            // 3rd op-elem
            foundOp.push(filterData)
          } else {
            // 2nd op-element
            p[op] = new Array(p[op] as IConditionPredicate, filterData)
          }
        } else {
          // 1st op-element
          p[op] = filterData
        }
        return p
      },
      {} as { [op: string]: IConditionPredicate | IConditionPredicate[] }
    )

    this.Condition = cond
    return this
  }
  validates (): boolean {
    let valid = true
    let conflicts = []
    // if (this.Principal && this.NotPrincipal) {
    //   valid = false
    //   conflicts.push('Principals')
    // }
    // if (this.Resource && this.NotResource) {
    //   valid = false
    //   conflicts.push('Resource')
    // }
    // if (this.Action && this.NotAction) {
    //   valid = false
    //   conflicts.push('Action')
    // }
    // if (!valid) throw new Error(`The statement has conflicting key(s): ${conflicts}`)
    return valid
  }
  // toJSON () {
  //   this.validates()
  //   return this
  // }
}

// #endregion Statements

// #region interfaces

export interface IIamStatement {
  Sid?: string
  Effect: 'Allow' | 'Deny'
  Condition?: ICondition_out
  Action?: '*' | string | string[]
  NotAction?: '*' | string | string[]
  Resource?: '*' | string | string[]
  NotResource?: '*' | string | string[]
  Principal?: '*' | IPrincipalKinds[]
  NotPrincipal?: '*' | IPrincipalKinds[]
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

interface ICondition_in {
  [operand: string]: IConditionPredicate
}
export interface ICondition_out {
  [operand: string]: IConditionPredicate | IConditionPredicate[]
}
interface IPolicyDoc {
  Version?: '2012-10-17'
  Id?: string
  Statement: IamStatement[]
}

interface IConditionPredicate {
  [dataField: string]: string | string[]
}

type IPrincipalKinds =
  | { AWS: string | string[] }
  | { Federated: string | string[] }
  | { Service: string | string[] }

// #endregion interfaces
