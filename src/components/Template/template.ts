// import { isEmpty, intersection } from 'lodash-es'

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
  toJSON () {
    let _this = this
    if (Array.isArray(this.Resources)) {
      _this.Resources = this.Resources.reduce((p, c) => ({ ...p, ...c.toJSON() }), {})
    }
    return _this // cleaned up version
  }
  toString (replacer = null, spaces?: number) {
    return JSON.stringify(this.toJSON(), replacer, spaces)
  }
}

/**
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param tagList - TagList  * asdasd.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
export const tags: (tagList: Itags | Itags[]) => ITags[] = function (tagList) {
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
