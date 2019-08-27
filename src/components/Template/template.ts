/**
 * @todo @research Should template gen funcs make network calls? - if so, How can they quarintined?
 * @todo make FederOS optin - so that squals can be used by other companies who just want to make
 * dependency tree, and insert `DependsOn` keys where needed: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html
 */

import randomWord from 'random-word'
import Randoma from 'randoma'
import * as yaml from 'js-yaml'
import { StructError, struct as _struct, superstruct } from 'superstruct'

export class Template {
  AWSTemplateFormatVersion: '2010-09-09'
  Description?: string
  Metadata?: object
  Mappings?: object
  Conditions?: object
  Transform?: object
  Outputs?: object
  private _resources = [] as squals[]

  constructor(props: any = {}) {
    this.AWSTemplateFormatVersion = '2010-09-09'
    this.Description = props.desc || `Squals AutoGen Description ${new Date().getTime()}`
    if (props.metadata) this.Metadata = { ...props.metadata }
    if (props.mappings) this.Mappings = { ...props.mappings }
    if (props.conditions) this.Conditions = { ...props.conditions }
    if (props.transform) this.Transform = { ...props.transform }
    if (props.outputs) this.Outputs = { ...props.outputs }
  }
  validate() {
    return { pass: true, msg: null }
  }
  addResources(..._inputs: squals[]) {
    this._resources = [...this._resources, ..._inputs]
    return this
  }
  resource(i: squals) {
    this._resources = [...this._resources, i]
    return this
  }
  toJSON(): object {
    return {
      AWSTemplateFormatVersion: this.AWSTemplateFormatVersion,
      Resources: {
        ...this._resources.reduce((p, v) => ({ ...p, ...v.toJSON() }), {})
      },
      ...(this.Description ? { Description: this.Description } : {}),
      ...(this.Metadata ? { Metadata: this.Metadata } : {}),
      ...(this.Mappings ? { Mappings: this.Mappings } : {}),
      ...(this.Conditions ? { Conditions: this.Conditions } : {}),
      ...(this.Outputs ? { Outputs: this.Outputs } : {}),
      ...(this.Transform ? { Transform: this.Transform } : {})
    }
  }
  toString(replacer = null, spaces?: number): string {
    return JSON.stringify(this.toJSON(), replacer, spaces)
  }
  fromYAML(input: string): Template {
    const s = yaml.safeLoad(input)
    return new Template()
  }
  toYAML(): string {
    const t = this.toJSON()
    return yaml.dump(t)
  }
}

/**
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param tagList - TagList  * asdasd.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
export const tags = (...tagList: Itags[]): ITags[] => {
  const handleItem = (multiTagObj: Itags) => {
    return Object.entries(multiTagObj).reduce((p: ITags[], [k, v]) => {
      return [...p, { Key: k, Value: v }]
    }, [])
  }
  const handleArray = (tagList: Itags[]) => {
    return tagList.reduce((p: ITags[], c) => {
      return [...p, ...handleItem(c)]
    }, [])
  }

  return handleArray(tagList)
}

/**
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param tagList - Asd.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
export const Tags = (...tagList: Itags[]): IResourceTags | object => {
  if (tagList.length > 0) {
    return {
      Tags: tags(...tagList)
    }
  } else {
    return {}
  }
}

/**
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param tagList - Incoming tagList.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
export const TagFilters = (tagList: Itags[]): ITagFilters => {
  return {
    TagFilters: tags(...tagList)
  }
}

export const genComponentName = (name?: string, seed: number | string = new Date().getTime()) => {
  return name || `${randomWord()}${new Randoma({ seed }).integer()}`
}

/**
 *
 * @description used in codeGen process to automate the boilerplate
 * @param input
 * @param className
 *
 */
export function validatorGeneric<T>(input: string | object, className: squalsClassInterface<T>) {
  if (typeof input === 'string') {
    return className.fromString(input)
  } else if (input instanceof className) {
    const ret = className.validateJSON((input as squals).toJSON())
    return Array.isArray(ret) ? ret[0] : ret
  } else {
    const name = Object.keys(input)[0]
    const { Type, Properties } = (input as any)[name]
    if (Type && Properties) {
      return className.validateJSON(input)
    } else {
      return className.validateJS(input)
    }
  }
}

/**
 *
 * @old
 * @migrate usage patterns to use struct imported from Template
 */
export const baseSchemas = {
  Ref: _struct({ Ref: 'string' }),
  GetAtt: _struct({ 'Fn::GetAtt': _struct.tuple(['string', 'string']) }),
  StrRef: _struct.union(['string', _struct({ Ref: 'string' })]),
  StrRefGetAtt: _struct.union([
    'string',
    _struct({ Ref: 'string' }),
    _struct({ 'Fn::GetAtt': _struct.tuple(['string', 'string']) })
  ])
}

export const struct = superstruct({
  types: {
    Ref: i => {
      const Ref = _struct({ Ref: 'string' })
      const r = Ref.validate(i)
      return r instanceof StructError ? r.format() : true
    },
    GetAtt: i => {
      const IGetAtt = _struct({
        'Fn::GetAtt': _struct.tuple(['string', 'string'])
      })
      const r = IGetAtt.validate(i)
      return r instanceof StructError ? r.format() : true
    },
    StrRef: i => {
      const StrRef = _struct.union(['string', _struct({ Ref: 'string' })])
      const r = StrRef.validate(i)
      return r instanceof StructError ? r.format() : true
    },
    // maybe use a lazy operator to incoporate all instrinsic functions
    CFNstringish: i => {
      const StrRef = _struct.union(['string', _struct({ Ref: 'string' })])
      const r = StrRef.validate(i)
      return r instanceof StructError ? r.format() : true
    },
    StrRefGetAtt: i => {
      const IStrRefGetAtt = _struct(
        _struct.union([
          'string',
          _struct({ Ref: 'string' }),
          _struct({ 'Fn::GetAtt': _struct.tuple(['string', 'string']) }),
          _struct({
            'Fn::Join': _struct.tuple(['string', _struct.list(['string', { Ref: 'string' }])])
          })
        ])
      )
      const r = IStrRefGetAtt.validate(i)
      return r instanceof StructError ? r.format() : true
    },
    Join: i => {
      const Join = _struct({
        'Fn::Join': _struct.tuple(['string', 'CFNstringish'])
      })
      const r = Join.validate(i)
      return r instanceof StructError ? r.format() : true
    }
  }
})

/**
 * Intrinsic Join Funciton
 * @description Tell CFN to join some segments to gether before complete processing
 * @arity 2
 * @param seperator
 * @param stringNrefs[]...
 * @example
 * const ret = join(".")('192','168','0','1') // { 'Fn::Join': ['.', ['192','168','0','1']] }
 */
export const join = (seperator: string) => (...stringNrefs: IStrRefGetAtt[]): IJoin => {
  return { 'Fn::Join': [seperator, [...stringNrefs]] }
}

/**
 * Intrinsic Base64 Funciton
 * @description tell cloudformation to base64 encode some data befor evaluating
 * @see [Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-base64.html)
 * @param i
 * @example
 * const ret = base64(join(".")('192','168','0','1')) // {'Fn::Base64': { 'Fn::Join': ['.', ['192', '168', '0', '1']] }}
 */
export const base64 = (i: Exclude<IIntrinsicTypes, ISplit>): IBase64 => {
  return { 'Fn::Base64': i }
}

/**
 * Intrinsic Base64 Funciton
 * @description tell CFN to make a CIDR address of the imputs before continuing
 * @see [Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-cidr.html)
 * @param ip
 * @param count
 * @param bits
 * @example
 * const ret = cidr('192.168.0.11/24', 5, 6) // { 'Fn::Cidr': ['192.168.0.11/24', 5, 6] }
 */
export const cidr = (ip: IcfnStringish, count: number, bits: number): ICidr => {
  return { 'Fn::Cidr': [ip, count, bits] }
}

/**
 * Intrinsic FindInMap Funciton
 * @description Add dynamic look ups to your CFN template to make them adapt based on the region or other input you chosee
 * @see [Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-findinmap.html)
 * @arity 2
 * @param mappingDataSetName
 * @param attr
 * @param inputKey
 * @example
 * const ret = findInMap('RegionalDataLookup','Attribute')({Ref: 'SomeOtherThing'}) // { 'Fn::FindInMap': ['RegionalDataLookup', {Ref: 'SomeOtherThing'}, 'Attribute'] }
 */
export const findInMap = (mappingDataSetName: string, attr: string) => (
  inputKey: Exclude<IIntrinsicTypes, ISplit>
): IFindInMap => {
  return { 'Fn::FindInMap': [mappingDataSetName, inputKey, attr] }
}

/**
 * Intrinsic ImportVal Funciton
 * @description Tell CFN to import an output from another Stack
 * @see [Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-importvalue.html)
 * @param sharedValueToImport
 * @example
 * const ret = importVal({ Ref: 'someString' }) // { 'Fn::ImportValue': { Ref: 'someString' } }
 */
export const importVal = (sharedValueToImport: IImoprtValue_val) => {
  return { 'Fn::ImportValue': sharedValueToImport }
}

/**
 * Intrinsic Select Funciton
 * @description Tell CFN to select an element from an array
 * @see [Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-select.html)
 * @arity 2
 * @param idx
 * @param list
 * @example
 * const ret = select['A', "b", "C", 'd'])(2)
 */
export const select = (list: string[] | ISelect_value)=>(idx: number | IFindInMap): ISelect => {
  return { 'Fn::Select': [idx, list] }
}

/**
 * Intrinsic Split Funciton
 * @description Take a sperable dataset and tell cloudformation to treat it more like an array - rather than a singular blob
 * @see [Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-split.html)
 * @arity 2
 * @param seperator
 * @param data
 * @example
 * const ret = split('|')('Hello|World|Hope|You|Are|Doing|Fine')
 */
export const split = (seperator: string) => (
  data: string | Exclude<IIntrinsicTypes, ISplit>
): ISplit => {
  return { 'Fn::Split': [seperator, data] }
}

/**
 * Intrinsic Sub Funciton
 * @description Tell CFN to substitute the value in a template string with otyher values
 * @see [Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html)
 * @arity 2
 * @param templ is a tempalte string that uses JS tempalte string syntax to replace parts of the template string with the values of the ref'd keys
 * @param params
 * @note be careful not to use js backtick template strings - since the syntax is similar for the CNF sub function ${}
 * @example
 * const ret = sub("www.${Domain}")({Domain:{Ref:'RootDomainName'}}) // { 'Fn::Sub': ['www.${Domain}', { Domain: { Ref: 'RootDomainName' } }] }
 */
export const sub = (templ: string) => (params: {
  [LookupVal: string]: Exclude<IIntrinsicTypes, ISub>
}): ISub => {
  return { 'Fn::Sub': [templ, params] }
}

/**
 * Intrinsic Transform Funciton
 * @description  Macros enable you to perform custom processing on templates, from simple actions like find-and-replace operations to extensive transformations of entire templates
 * @see [Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-transform.html)
 * @arity 2
 * @param macro give the name of the macro to use
 * @param params The list parameters, specified as key-value pairs, to pass to the macro.
 * @example
 * const ret = transform("AWS::Include")({Location:{Ref:'InputValue'}}) // { "Fn::Transform" : { "Name" : "AWS::Include", "Parameters" : { "Location" : { "Ref" : "InputValue" } } } }
 */
export const transform = (macro: string) => (params: {
  [key: string]: IRef | IGetAtt | IFindInMap
}): ITransform => {
  return { 'Fn::Transform': { Name: macro, Parameters: params } }
}

// #region interfaces

/**
 *
 * @type tells compliler that <T> is implementing the squals interface so that a class function can be passed in as a param
 */
type squalsClassInterface<T> = {
  new (...args: any[]): T
  fromString: (i: string) => T
  fromJSON: (i: object) => T
  fromJS: (i: object) => T
  from: (i: string | object) => T
  validate: (i: object | string) => T
  validateJS: (i: any) => T
  validateJSON: (i: any) => T
}

/**
 * @description basic interface (abstract class) for all  cloud components
 * @abstract
 * @class
 */
export abstract class squals {
  // chainable
  static new: () => squals
  static fromString: (i: string) => squals // allows for class to permit data partials - and for validate to catch it
  static fromJSON: (i: object) => squals // same
  static fromJS: (i: object) => squals // same
  static from: (i: string | object) => squals
  static validate: (o: string | object) => squals // returns chainable obj OR throws
  static validateJS: (i: object) => squals
  static validateJSON: (i: object) => squals
  // exports
  abstract toJSON: (includeRelated?: boolean) => object | object[]
  // static withRelated: (...i: object[]) => object[]
}

export interface Itemplate {
  resources: object
  desc?: string
  metadata?: object
  mappings?: object
  conditions?: object
  transform?: object
  outputs?: object
}
export interface IResourceTags {
  Tags: ITags[]
}

export interface ITagFilters {
  TagFilters: ITags[]
}

export enum StackChangeBehaviors {
  noInteruption = 1,
  someInteruption,
  replacement
}

export interface Itags {
  [key: string]: string
}

export interface ITags {
  Key: string
  Value: string
}

// #region ƒ.intrinsics

export interface IRef {
  Ref: string
}
export interface IGetAtt {
  'Fn::GetAtt': [string, string]
}
export interface IBase64 {
  'Fn::Base64': Exclude<IIntrinsicTypes, ISplit>
}
export interface ICidr {
  'Fn::Cidr': [IcfnStringish, number, number]
}
export interface IFindInMap {
  'Fn::FindInMap': [string, Exclude<IIntrinsicTypes, ISplit>, string]
}
export interface IGetAZs {
  'Fn::GetAZs': IRef | string
}
/**
 * @see [AWS Guide Ref](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-importvalue.html)
 */
export interface IImportValue {
  'Fn::ImportValue': IImoprtValue_val
}
export interface IJoin {
  'Fn::Join': [string, IIntrinsicTypes[]]
}
export interface ISelect {
  'Fn::Select': [
    number | IFindInMap,
    string[] | (IRef | IGetAtt | IFindInMap | IGetAZs | ISplit | IIf)
  ]
}
export interface ISplit {
  'Fn::Split': [string, string[] | Exclude<IIntrinsicTypes, ISplit>]
}
export interface ISub {
  'Fn::Sub': [string, { [lookupVal: string]: Exclude<IIntrinsicTypes, ISub> }]
}
type ISelect_value = IRef | IGetAtt | IFindInMap | IGetAZs | ISplit | IIf

type IImoprtValue_val = Exclude<Exclude<Exclude<IIntrinsicTypes, IGetAtt>, IGetAZs>, IImportValue>

export type IIntrinsicTypes =
  | string
  | IBase64
  | IFindInMap
  | IGetAtt
  | IGetAZs
  | IIf
  | IJoin
  | ISelect
  | IRef
  | IImportValue // no IF
  | ISub // not in sub
  | ISplit // not in split, IF

export interface ITransform {
  'Fn::Transform': {
    Name: string
    Parameters: { [key: string]: IRef | IGetAtt | IFindInMap }
  }
}

export type IIf = ICondition_If
export interface ICondition_If {
  'Fn::If': [
    IConditional,
    [
      Exclude<Exclude<IIntrinsicTypes, IImportValue>, ISplit>,
      Exclude<Exclude<IIntrinsicTypes, IImportValue>, ISplit>
    ]
  ]
}
export interface ICondition_And {
  'Fn::And': IConditional[]
}
export interface ICondition_Eq {
  'Fn::Equals': [IIntrinsicTypes, IIntrinsicTypes]
}
export interface ICondition_Not {
  'Fn::Not': [string, (IRef | IFindInMap | IConditional)[]]
}
export interface ICondition_Or {
  'Fn::Or': [string, (IRef | IFindInMap | IConditional)[]]
}
export interface ICondition_prefixedRef {
  Condition: string
}
export type ICondition_directRef = string

type IConditional =
  | ICondition_If
  | ICondition_And
  | ICondition_Eq
  | ICondition_Not
  | ICondition_Or
  | ICondition_prefixedRef
  | ICondition_directRef

// #endregion ƒ.intrinsics
export type IStrRefGetAtt = string | IRef | IGetAtt
export type IcfnStringish = string | IRef | IGetAtt | IJoin | ISub | ISelect | IFindInMap // | IBase64
export type IcfnStringArrayish = string[] | ISplit | IFindInMap

// #endregion interfaces
