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
