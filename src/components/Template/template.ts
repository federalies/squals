// import { isEmpty, intersection } from 'lodash-es'

export class Template {
  AWSTemplateFormatVersion: '2010-09-09'
  Description: string
  Metadata: object
  Mappings: object
  Conditions: object
  Resources: object
  Transform: object
  Outputs: object

  constructor (props: any = {}) {
    this.AWSTemplateFormatVersion = '2010-09-09'
    this.Description = 'AutoGen Description'
    this.Metadata = { ...props.Metadata }
    this.Mappings = { ...props.Mappings }
    this.Conditions = { ...props.Conditions }
    this.Resources = { ...props.Resources }
    this.Transform = {}
    this.Outputs = { ...props.Outputs }
    // if (Object.keys(props)) {
    //   intersection(
    //     ['Description', 'Mappings', 'Conditions', 'Resources', 'Transform', 'Outputs'],
    //     Object.keys(props)
    //   ).map(yesValid => {
    //     this[yesValid] = props[yesValid]
    //   })
    // }
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
    return _this // cleaned up version
  }
  toString (replacer = null, spaces?: number) {
    return JSON.stringify(this.toJSON(), replacer, spaces)
  }
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

export interface IResourceTags {
  Tags: ITags[]
}

export interface ITagFilters {
  TagFilters: ITags[]
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
export interface IResourceTags {
  Tags: ITags[]
}

export interface ITagFilters {
  TagFilters: ITags[]
}
