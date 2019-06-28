import { IRef } from '../Template'
import generate from 'nanoid/generate'
import { actions } from './statement/actions'
import { conditions } from './statement/conditions'
import { resourceArn } from './statement/resources'

// #region Statements
export class IamStatement {
  //
  // do not add a name this statement object is never intended to show up stagg in a tempalte.
  // it must alway be accompanied by a polciy
  //
  // name : never
  //
  Sid?: string

  Effect: 'Allow' | 'Deny'
  Condition?: ICondition_out

  Action?: '*' | string[]
  NotAction?: '*' | string[]

  Resource?: '*' | string[]
  NotResource?: '*' | string[]

  Principal?: '*' | IPrincipalKinds[]
  NotPrincipal?: '*' | IPrincipalKinds[]

  private _genId (): string {
    const alphabet = '2346789qwertyupasdfghjkzxcvbnmQWERTYUPAFGHJKLZXCVBNM'
    return generate(alphabet, 30)
  }

  static c = conditions() // initializes and returns complicated object
  static r = resourceArn // simple pass function pointer
  static a = actions() // returns object
  static p = () => {}

  constructor (id?: string | IamStatement) {
    if (id) {
      if (typeof id === 'string') {
        this.Sid = id
        this.Effect = 'Allow'
        this.Action = '*'
        this.Resource = '*'
      } else {
        this.Sid = id.Sid
        this.Effect = id.Effect
        this.Condition = id.Condition
        this.Action = id.Action
        this.NotAction = id.NotAction
        this.Resource = id.Resource
        this.NotResource = id.NotResource
        this.Principal = id.Principal
        this.NotPrincipal = id.NotPrincipal
      }
    } else {
      this.Effect = 'Allow'
      this.Action = '*'
      this.Resource = '*'
    }
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
    this.Action = actions
    return this
  }
  omittedActions (...actions: string[]) {
    this.NotAction = actions
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
  resources (...resources: string[] | ['*']) {
    // this.Resource = resources === ['*'] ? '*' : resources
    this.Resource = resources
    return this
  }
  omittedResources (...resources: string[] | ['*']) {
    this.NotResource = resources
    return this
  }
  when (...conditions: ICondition_in[]) {
    // merge the array based on the operand key then assign to this
    this.Condition = mergeOnOperand(conditions)
    return this
  }
  //
  // andWhen (...conditions: ICondition_in[]) {
  //   // could add this - to keep the state
  //   return this
  // }
  //
  // toJSON () {} // not implemented because this object should never go stag
}
const mergeOnOperand = (conditions: ICondition_in[], _existing?: ICondition_out) => {
  const existing = _existing || {}
  return conditions.reduce(
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
    existing as { [op: string]: IConditionPredicate | IConditionPredicate[] }
  )
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
  [dataField: string]: boolean | string | string[] | number | number[]
}

type IPrincipalKinds =
  | { AWS: string | string[] }
  | { Federated: string | string[] }
  | { Service: string | string[] }

// #endregion interfaces
