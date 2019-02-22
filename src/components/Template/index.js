import { isEmpty, intersection } from 'lodash-es'
export class Template {
  constructor (props = {}) {
    this.AWSTemplateFormatVersion = '2010-09-09'
    this.Description = props.Description || 'Auto Description'
    this.Mappings = { ...props.Mappings }
    this.Conditions = { ...props.Conditions }
    this.Resources = { ...props.Resources }
    this.Transform = []
    this.Outputs = { ...props.Outputs }
    if (Object.keys(props)) {
      intersection(
        [
          'Description',
          'Mappings',
          'Conditions',
          'Resources',
          'Transform',
          'Outputs'
        ],
        Object.keys(props)
      ).map(yesValid => {
        this[yesValid] = props[yesValid]
      })
    }
  }
  validate () {
    return { pass: true, msg: null }
  }
  addResources (_inputs) {
    this.Resources = { ...this.Resources, ..._inputs }
    return this
  }
  toJSON () {
    let cleaned = this
    return cleaned
  }
  toString (replacer = null, spaces = null) {
    const printable = Object.entries(this).reduce((a, [k, v]) => {
      if (v && !isEmpty(v)) a[k] = v
      return a
    }, {})
    return JSON.stringify(printable, replacer, spaces)
  }
}
