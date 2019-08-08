/**
 * @todo @research Should template gen funcs make network calls? - if so, How can they quarintined?
 * @todo make FederOS optin - so that squals can be used by other companies who just want to make
 * dependency tree, and insert `DependsOn` keys where needed: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html
 */

// import { isEmpty, intersection } from 'lodash-es'
import randomWord from 'random-word'
import Randoma from 'randoma'
import * as yaml from 'js-yaml'
import { StructError, struct as _struct, superstruct } from 'superstruct'

export class Template {
  AWSTemplateFormatVersion: '2010-09-09'
  Resources: object
  Description?: string
  Metadata?: object
  Mappings?: object
  Conditions?: object
  Transform?: object
  Outputs?: object

  constructor (props: any = {}) {
    this.AWSTemplateFormatVersion = '2010-09-09'
    this.Description = props.desc || `Squals AutoGen Description ${new Date().getTime()}`
    this.Resources = { ...props.resources }
    if (props.metadata) this.Metadata = { ...props.metadata }
    if (props.mappings) this.Mappings = { ...props.mappings }
    if (props.conditions) this.Conditions = { ...props.conditions }
    if (props.transform) this.Transform = { ...props.transform }
    if (props.outputs) this.Outputs = { ...props.outputs }
  }
  validate () {
    return { pass: true, msg: null }
  }
  addResources (_inputs: object) {
    this.Resources = { ...this.Resources, ..._inputs }
    return this
  }
  toJSON (): object {
    const _this = this
    if (Array.isArray(this.Resources)) {
      _this.Resources = this.Resources.reduce((p, c) => ({ ...p, ...(c as any).toJSON() }), {})
    }
    return _this // cleaned up version
  }
  toString (replacer = null, spaces?: number): string {
    return JSON.stringify(this.toJSON(), replacer, spaces)
  }
  resourceArray (): object[] {
    if (Array.isArray(this.Resources)) {
      return this.Resources
    } else {
      return Object.entries(this.Resources).map((k, v) => {
        return { [(k as unknown) as string]: v }
      })
    }
  }
  fromYAML (input: string): Template {
    return new Template()
  }
  toYAML (): string {
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
export const tags = (tagList: Itags | Itags[]): ITags[] => {
  const handleItem = (tagList: Itags) => {
    return Object.entries(tagList).reduce((p: ITags[], [k, v]) => {
      return [...p, { Key: k, Value: v }]
    }, [])
  }
  const handleArray = (tagList: Itags[]) => {
    return tagList.reduce((p: ITags[], c) => {
      return [...p, ...handleItem(c)]
    }, [])
  }

  return Array.isArray(tagList) ? handleArray(tagList) : handleItem(tagList)
}

/**
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param tagList - Asd.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
export const Tags = (tagList?: Itags | Itags[]): IResourceTags | object => {
  if (tagList) {
    return {
      Tags: tags(tagList)
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
export const TagFilters = (tagList: Itags | Itags[]): ITagFilters => {
  return {
    TagFilters: tags(tagList)
  }
}

export const genComponentName = (seed: number | string = new Date().getTime()) => {
  return `${randomWord()}${new Randoma({ seed }).integer()}`
}

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
      const IGetAtt = _struct({ 'Fn::GetAtt': _struct.tuple(['string', 'string']) })
      const r = IGetAtt.validate(i)
      return r instanceof StructError ? r.format() : true
    },
    StrRef: i => {
      const StrRef = _struct.union(['string', _struct({ Ref: 'string' })])
      const r = StrRef.validate(i)
      return r instanceof StructError ? r.format() : true
    },
    StrRefGetAtt: i => {
      const IStrRefGetAtt = _struct(
        _struct.union([
          'string',
          _struct({ Ref: 'string' }),
          _struct({ 'Fn::GetAtt': _struct.tuple(['string', 'string']) })
        ])
      )
      const r = IStrRefGetAtt.validate(i)
      return r instanceof StructError ? r.format() : true
    }
  }
})

export function validatorGeneric<T> (input: string | object, className: squalsClassInterface<T>) {
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

export interface IRef {
  Ref: string
}

export interface IGetAtt {
  'Fn::GetAtt': [string, string]
}

export interface Itags {
  [key: string]: string
}

export interface ITags {
  Key: string
  Value: string
}

export type IStrRefGetAtt = string | IRef | IGetAtt
