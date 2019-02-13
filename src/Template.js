import { isEmpty, intersection } from 'lodash-es'
export class Template {
  constructor (props = {}) {
    this.AWSTemplateFormatVersion = '2010-09-09'
    this.Description = 'A simple website template'
    this.Mappings = {}
    this.Conditions = {}
    this.Resources = {}
    this.Transform = []
    this.Outputs = {}
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
  toString (replacer = null, spaces = 2) {
    const printable = Object.entries(this).reduce((a, [k, v]) => {
      if (v && !isEmpty(v)) a[k] = v
      return a
    }, {})
    return JSON.stringify(printable, replacer, spaces)
  }
}
