// @todo post-code-generation
//
// 1. Go through and remove all refs of object
// 2. Look for enums in the documentation
// 3. Flatten deep structures in the _min interface
// 4. finish the constructor that maps the _min inputs to the _props outputs
// 5. Look at the relationship between objects - consider if there would be a need for a _linkedData = {stringKey: object[] }
// 6. Look for MultiMode, All-optional sections - and teas out if that should be a required union type Ex: LmabdaFunction:Code
// 7. Chop Up Mega interfaces to make them more apprachable Ex: S3-Bucket
// 8. Deal with remaining typescript warnings
//
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

// import { cloneDeep } from 'lodash-es'

export class SESReceiptFilter implements squals {
  name: string
  Type = 'AWS::SES::ReceiptFilter'
  Properties: ISESReceiptFilter_props

  constructor (i: ISESReceiptFilter_min) {
    this.name = genComponentName(i.name)
    this.Properties = {
      Filter: {
        ...(i.filterName ? { Name: i.filterName } : {}),
        IpFilter: {
          Policy: i.policy,
          Cidr: i.cidr
        }
      }
    }
  }

  static fromString (s: string): SESReceiptFilter {
    return SESReceiptFilter.validate(JSON.parse(s))
  }

  static fromJSON (i: object): SESReceiptFilter {
    return SESReceiptFilter.validateJSON(i as ISESReceiptFilter_json)
  }

  static fromJS (i: object): SESReceiptFilter {
    return SESReceiptFilter.validateJS(i as ISESReceiptFilter_min)
  }

  static from (i: string | object): SESReceiptFilter {
    return SESReceiptFilter.validate(i)
  }

  static validate (i: string | object): SESReceiptFilter {
    return validatorGeneric<SESReceiptFilter>(i as squals, SESReceiptFilter)
  }

  static validateJS (i: ISESReceiptFilter_min): SESReceiptFilter {
    // validation logic here
    return new SESReceiptFilter(i)
  }

  static validateJSON (i: ISESReceiptFilter_json): SESReceiptFilter {
    // validation logic here then...
    const ret = new SESReceiptFilter({ policy: 'Allow', cidr: '/24' })
    // const c = cloneDeep(i)
    ret.name = Object.keys(i)[0]
    ret.Properties = i[ret.name].Properties
    return ret
  }

  _name (s: string): SESReceiptFilter {
    this.name = s
    return this
  }

  toJSON () {
    return {
      [this.name]: {
        Type: 'AWS::SES::ReceiptFilter',
        Properties: this.Properties
      }
    }
  }

  /**
   * @param i - Object.
   * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptfilter.html#cfn-ses-receiptfilter-filter>
   */
  filter (cidr: IStrRefGetAtt, policy: 'Block' | 'Allow' = 'Block'): SESReceiptFilter {
    this.Properties.Filter.IpFilter.Cidr = cidr
    this.Properties.Filter.IpFilter.Policy = policy
    return this
  }
}

// # region interfaces

/**
 * @see [Implied Policy from AWS-JS-SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#createReceiptFilter-property)
 */
interface ISESReceiptFilter_min {
  name?: string
  filterName?: IStrRefGetAtt
  cidr: IStrRefGetAtt
  policy: 'Block' | 'Allow'
}

interface ISESReceiptFilter_props {
  Filter: {
    Name?: IStrRefGetAtt
    IpFilter: {
      Policy: 'Block' | 'Allow'
      Cidr: IStrRefGetAtt
    }
  }
}

interface ISESReceiptFilter_json {
  [name: string]: {
    Type: 'AWS::SES::ReceiptFilter'
    Properties: ISESReceiptFilter_props
  }
}
// # endregion interfaces
