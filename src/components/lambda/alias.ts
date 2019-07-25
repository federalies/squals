import { IGetAtt, IRef, genComponentName, squals } from '../Template'

export class LambdaAlias implements squals {
  name: string
  Type = 'AWS::Lambda::Alias'
  Properties: ILambdaAlias_Props
  constructor (i: ILambdaAlias_min) {
    this.name = typeof i.name === 'string' ? i.name : genComponentName()
    this.Properties = {
      Name: i.name,
      FunctionName: i.func,
      FunctionVersion: i.v ? i.v : '$LATEST',
      Description: i.desc
    }
    this.Properties.RoutingConfig = i.versionWts
      ? {
        AdditionalVersionWeights: i.versionWts.map(val => ({
          FunctionVersion: val.v,
          FunctionWeight: val.weight
        }))
      }
      : undefined
  }
  static fromString () {}
  static fromJSON () {}
  static fromJS () {}
  static from () {}
  static validate () {}
  static validateJS () {}
  static validateJSON () {}
  _name () {
    return this
  }
  functionName () {
    return this
  }
  functionVersion () {
    return this
  }
  desc () {
    return this
  }
  routeConfig (...i: { v: string; weight: number }[]) {
    return this
  }
  toJSON (withRelated?: boolean): object[] {
    return []
  }
  Ref () {}
}

interface ILambdaAlias_min {
  name: string | IGetAtt | IRef // alias needs a name to be reusable, right?
  func: string | IGetAtt | IRef
  v?: string
  desc?: string
  versionWts?: { v: string; weight: number }[]
}

interface ILambdaAlias_Props {
  /*
    Function name - 'MyFunction'
    Function ARN - arn:aws:lambda:us-west-2:123456789012:function:MyFunction.
    Partial ARN - 123456789012:function:MyFunction.
  */
  FunctionName: string | IGetAtt | IRef
  Name: string | IGetAtt | IRef // (?!^[0-9]+$)([a-zA-Z0-9-_]+)
  Description?: string
  FunctionVersion: string | IGetAtt | IRef // (\$LATEST|[0-9]+)
  RoutingConfig?: {
    AdditionalVersionWeights: {
      FunctionVersion: string
      FunctionWeight: number
    }[]
  }
}
