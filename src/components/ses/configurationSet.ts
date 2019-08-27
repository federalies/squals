/**
 * A configuration Set is merely a "name" that allows the compostiion of Event Rules
 */
import {
  squals,
  struct,
  baseSchemas,
  validatorGeneric,
  genComponentName,
  IStrRefGetAtt,
  IGetAtt,
  ITags,
  Itags,
  IRef
} from '../Template'
import {
  verifyIfThen,
  ifHas,
  multipleOf,
  stringNotEqual,
  ifType
} from '../../utils/validations/objectCheck'

export class SESConfigurationSet implements squals {
  name: string
  Type = 'AWS::SES::ConfigurationSet'
  Properties: ISESConfigurationSet_props

  constructor (i: ISESConfigurationSet_min) {
    this.name = genComponentName(i.name)
    this.Properties = {
      Name: i.configName
    }
  }

  /* istanbul ignore next */
  static fromString (s: string): SESConfigurationSet {
    return SESConfigurationSet.validate(JSON.parse(s))
  }

  /* istanbul ignore next */
  static fromJSON (i: object): SESConfigurationSet {
    return SESConfigurationSet.validateJSON(i as ISESConfigurationSet_json)
  }

  /* istanbul ignore next */
  static fromJS (i: object): SESConfigurationSet {
    return SESConfigurationSet.validateJS(i as ISESConfigurationSet_min)
  }

  /* istanbul ignore next */
  static from (i: string | object): SESConfigurationSet {
    return SESConfigurationSet.validate(i)
  }

  /* istanbul ignore next */
  static validate (i: string | object): SESConfigurationSet {
    return validatorGeneric<SESConfigurationSet>(i as squals, SESConfigurationSet)
  }

  static validateJS (i: ISESConfigurationSet_min): SESConfigurationSet {
    struct({
      configName: 'StrRefGetAtt',
      name: 'string?'
    })(i)
    return new SESConfigurationSet(i)
  }

  static validateJSON (i: ISESConfigurationSet_json): SESConfigurationSet {
    // validation logic here then...
    struct(
      struct.dict([
        'string',
        struct.interface({
          Type: struct.literal('AWS::SES::ConfigurationSet'),
          Properties: struct({ Name: 'StrRefGetAtt' })
        })
      ])
    )(i)

    const ret = new SESConfigurationSet({ configName: '' })
    ret.name = Object.keys(i)[0]
    ret.Properties = i[ret.name].Properties
    return ret
  }

  toJSON (): ISESConfigurationSet_json {
    return {
      [this.name]: {
        Type: 'AWS::SES::ConfigurationSet',
        Properties: this.Properties
      }
    }
  }

  _name (s: string): SESConfigurationSet {
    this.name = s
    return this
  }
  congfigName (s: IStrRefGetAtt) {
    this.Properties.Name = s
    return this
  }
  Ref (): IRef {
    return { Ref: this.name }
  }
}
// # region interfaces
export interface ISESConfigurationSet_min {
  name?: string
  configName: IStrRefGetAtt
}

export interface ISESConfigurationSet_props {
  Name: IStrRefGetAtt
}

export interface ISESConfigurationSet_json {
  [name: string]: {
    Type: 'AWS::SES::ConfigurationSet'
    Properties: ISESConfigurationSet_props
  }
}
// # endregion interfaces
