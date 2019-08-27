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

// import {
//   verifyIfThen,
//   ifHas,
//   multipleOf,
//   stringNotEqual,
//   ifType
// } from '../../utils/validations/objectCheck'

import hbs from 'handlebars'

export class SESTemplate implements squals {
  name: string
  Type = 'AWS::SES::Template'
  Properties: ISESTemplate_props

  constructor (i: ISESTemplate_min) {
    this.name = genComponentName(i.name)
    this.Properties = {
      Template: {
        TemplateName: i.templateName,
        ...(i.subject ? { SubjectPart: i.subject } : {}),
        ...(i.html ? { HtmlPart: i.html } : {}),
        ...(i.text ? { TextPart: i.text } : {})
      }
    }
  }

  static fromString (s: string): SESTemplate {
    return SESTemplate.validate(JSON.parse(s))
  }

  static fromJSON (i: object): SESTemplate {
    return SESTemplate.validateJSON(i as ISESTemplate_json)
  }

  static fromJS (i: object): SESTemplate {
    return SESTemplate.validateJS(i as ISESTemplate_min)
  }

  static from (i: string | object): SESTemplate {
    return SESTemplate.validate(i)
  }

  static validate (i: string | object): SESTemplate {
    return validatorGeneric<SESTemplate>(i as squals, SESTemplate)
  }

  /**
   *
   * @param i
   * @throws
   */
  static validateJS (i: ISESTemplate_min): SESTemplate {
    struct({
      name: 'string?',
      templateName: 'StrRefGetAtt',
      subject: 'StrRefGetAtt?',
      html: 'StrRefGetAtt?',
      text: 'StrRefGetAtt?'
    })(i)
    return new SESTemplate(i)
  }

  /**
   *
   * @param i
   * @throws
   */
  static validateJSON (i: ISESTemplate_json): SESTemplate {
    struct(
      struct.dict([
        'string',
        struct.interface({
          Type: struct.literal('AWS::SES::Template'),
          Properties: struct({
            Template: struct({
              TemplateName: 'StrRefGetAtt',
              SubjectPart: 'StrRefGetAtt?',
              HtmlPart: 'StrRefGetAtt?',
              TextPart: 'StrRefGetAtt?'
            })
          })
        })
      ])
    )(i)
    // setup dummy and do direct assignment

    const ret = new SESTemplate({ templateName: '' })
    ret.name = Object.keys(i)[0]

    // sematic validations
    const htmlPart = i[ret.name].Properties.Template.HtmlPart
    const textPart = i[ret.name].Properties.Template.TextPart

    if (htmlPart && typeof htmlPart === 'string') {
      hbs.precompile(htmlPart)
    }
    if (textPart && typeof textPart === 'string') {
      hbs.precompile(textPart)
    }

    ret.Properties = i[ret.name].Properties
    return ret
  }

  toJSON () {
    return {
      [this.name]: {
        Type: 'AWS::SES::Template',
        Properties: this.Properties
      }
    }
  }

  /**
   *
   * @param s
   */
  _name (s: string): SESTemplate {
    this.name = s
    return this
  }

  /**
   * @param i - Setter value for templateName.
   * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-template-template.html#cfn-ses-template-template-templatename>
   */
  templateName (i: string): SESTemplate {
    this.Properties.Template.TemplateName = i
    return this
  }

  /**
   *
   * @param s
   * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-template-template.html>
   */
  subject (s: IStrRefGetAtt): SESTemplate {
    this.Properties.Template.SubjectPart = s
    return this
  }

  /**
   *
   * @param s
   * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-template-template.html>
   * @see: handlebar templates
   */
  html (s: IStrRefGetAtt): SESTemplate {
    this.Properties.Template.HtmlPart = s
    return this
  }

  /**
   *
   * @param s
   * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-template-template.html>
   */
  text (s: IStrRefGetAtt): SESTemplate {
    this.Properties.Template.TextPart = s
    return this
  }
}

// # region interfaces
interface ISESTemplate_min {
  name?: string
  templateName: IStrRefGetAtt
  subject?: IStrRefGetAtt
  html?: IStrRefGetAtt
  text?: IStrRefGetAtt
}

interface ISESTemplate_props {
  Template: /* @diff from the AwsDefn file */ {
    TemplateName: IStrRefGetAtt // @diff from the AwsDefn file
    SubjectPart?: IStrRefGetAtt
    HtmlPart?: IStrRefGetAtt
    TextPart?: IStrRefGetAtt
  }
}

interface ISESTemplate_json {
  [name: string]: {
    Type: 'AWS::SES::Template'
    Properties: ISESTemplate_props
  }
}
// # endregion interfaces
