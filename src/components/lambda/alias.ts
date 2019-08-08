import { IGetAtt, IRef, genComponentName, squals, validatorGeneric, baseSchemas } from '../Template'
import { struct } from 'superstruct'

/**
 * @class LambdaAlias
 * @description Makes an AWS LambdaAlias
 * @implements {squals}
 * @ref <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-alias.html>
 */
export class LambdaAlias implements squals {
  name: string
  Type = 'AWS::Lambda::Alias'
  Properties: ILambdaAlias_Props
  /**
   * @constructor
   * @param i - Takes in minimum required.
   * istabbul ignore next
   * ```javascript
   * const simple = new LambdaAlias({name:'Silence Dogood', func:'Ben Franklin'})
   * const complicated = new LambdaAlias({
   *  name:'Silence Dogood',
   *  func:'Ben Franklin',
   *  v: 'v9',
   *  desc: 'The 1722 alias for the function BenFranklin quotes fn',
   *  versionWts: [{v:'v8',weight:0.8},{v:'v7',weight:0.2}]
   * })
   * ```.
   */
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
  static fromString (i: string): LambdaAlias {
    return LambdaAlias.validate(JSON.parse(i))
  }
  static fromJSON (i: object): LambdaAlias {
    return LambdaAlias.validateJSON(i as ILambdaAlias_json)
  }
  static fromJS (i: object): LambdaAlias {
    return LambdaAlias.validateJS(i as ILambdaAlias_min)
  }
  static from (i: string | object): LambdaAlias {
    return LambdaAlias.validate(i)
  }
  static validate (i: string | object): LambdaAlias {
    return validatorGeneric<LambdaAlias>(i as squals, LambdaAlias)
  }
  static validateJS (i: ILambdaAlias_min): LambdaAlias {
    const Lambda_Alias = struct({
      name: baseSchemas.StrRefGetAtt,
      func: baseSchemas.StrRefGetAtt,
      v: 'string?',
      desc: 'string?',
      versionWts: struct.optional(struct([baseSchemas.StrRefGetAtt]))
    })
    return new LambdaAlias(Lambda_Alias(i) as ILambdaAlias_min)
  }
  static validateJSON (i: ILambdaAlias_json): LambdaAlias {
    // validate
    const Lambda_Alias = struct(
      struct.dict([
        'string',
        struct.interface({
          Type: struct.literal('AWS::Lambda::Alias'),
          Properties: struct({
            FunctionName: baseSchemas.StrRefGetAtt,
            Name: baseSchemas.StrRefGetAtt,
            FunctionVersion: baseSchemas.StrRefGetAtt,
            Description: 'string?',
            RoutingConfig: struct.optional({
              AdditionalVersionWeights: struct([
                struct({
                  FunctionVersion: 'string',
                  FunctionWeight: 'number'
                })
              ])
            })
          })
        })
      ])
    )

    const _name = Object.keys(Lambda_Alias(i))[0]
    const ret = new LambdaAlias({ func: '', name: '' })
    ret.name = _name
    ret.Properties = i[_name].Properties
    return ret
  }

  _name (i: string) {
    this.name = i
    return this
  }
  aliasName(i: string | IGetAtt | IRef) {
    this.Properties.Name = i
    return this
  }
  functionName (i: string | IGetAtt | IRef) {
    this.Properties.FunctionName = i
    return this
  }
  functionVersion (i: string | IGetAtt | IRef) {
    this.Properties.FunctionVersion = i
    return this
  }
  desc (i: string) {
    this.Properties.Description = i
    return this
  }
  routeConfig (...i: { v: string; weight: number }[]) {
    this.Properties.RoutingConfig = {
      AdditionalVersionWeights: i.map(val => ({
        FunctionVersion: val.v,
        FunctionWeight: val.weight
      }))
    }
    return this
  }
  toJSON (withLinked?: boolean): object[] {
    return [
      {
        [this.name]: {
          Type: 'AWS::Lambda::Alias',
          Properties: this.Properties
        }
      } as ILambdaAlias_json
    ]
  }
  Ref (): IRef {
    return { Ref: this.name }
  }
}

// #region interfaces
export interface ILambdaAlias_min {
  name: string | IGetAtt | IRef // alias needs a name to be reusable, right?
  func: string | IGetAtt | IRef
  v?: string
  desc?: string
  versionWts?: { v: string; weight: number }[]
}

export interface ILambdaAlias_json {
  [name: string]: {
    Type: 'AWS::Lambda::Alias'
    Properties: ILambdaAlias_Props
  }
}

export interface ILambdaAlias_Props {
  /*
    Function name - 'MyFunction'
    Function ARN - arn:aws:lambda:us-west-2:123456789012:function:MyFunction.
    Partial ARN - 123456789012:function:MyFunction.
  */
  FunctionName: string | IGetAtt | IRef
  Name: string | IGetAtt | IRef // (?!^[0-9]+$)([a-zA-Z0-9-_]+)
  FunctionVersion: string | IGetAtt | IRef // (\$LATEST|[0-9]+)
  Description?: string
  RoutingConfig?: {
    AdditionalVersionWeights: {
      FunctionVersion: string
      FunctionWeight: number
    }[]
  }
}
// #endregion interfaces
