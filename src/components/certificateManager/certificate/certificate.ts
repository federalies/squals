import Url from 'url'
// import Joi, { JoiObject } from 'joi'
import randomWord from 'random-word'
import Randoma from 'randoma'
import { Tags, Itags, ITags, tags } from '../../Template'
import { IRef } from '../../Template'
export class AWSCertificate {
  name: string
  _price: number
  _schema?: {
    in: object[]
    out: object[]
  }
  Type: 'AWS::CertificateManager::Certificate'
  Properties: {
    DomainName: string
    DomainValidationOptions?: ICertValidationOpts[]
    SubjectAlternativeNames?: string[]
    ValidationMethod?: 'EMAIL' | 'DNS'
    Tags?: ITags[]
  }

  constructor (props: IcertObj | string | string[]) {
    console.warn(
      `WARNING: This certificate will pause completion of the rest of the application until its validated - via email or DNS depending on your setup.`
    )
    this._price = 0

    // runtime input validation
    // this.schema = {
    //   in: [
    //     Joi.string(),
    //     Joi.array().items(Joi.string()),
    //     Joi.object().keys({
    //       domains: Joi.array()
    //         .items(Joi.string())
    //         .required(),
    //       name: Joi.string().optional(),
    //       autoGenWildcards: Joi.boolean().optional(),
    //       proofType: Joi.string().optional, // 'email' | 'dns'
    //       tags: Joi.array().items(Joi.object())
    //     })
    //   ],
    //   out: [{}]
    // }

    // const atLeastOnePassed = this.schema.in.some(schema => {
    //   return (schema as any).validate(props)
    // })

    this.Type = 'AWS::CertificateManager::Certificate'

    let defaultName = `${randomWord()}${new Randoma({
      seed: new Date().getTime()
    }).integer()}`

    if (typeof props === 'string') {
      this.name = defaultName
      this.Properties = {
        DomainName: props,
        ValidationMethod: 'EMAIL'
      }
    } else if (isStringArr(props)) {
      this.name = defaultName
      this.Properties = {
        DomainName: props[0],
        SubjectAlternativeNames: props.slice(1),
        ValidationMethod: 'EMAIL'
      }
    } else if ('domain' in (props as IcertObj)) {
      let { name } = { name: defaultName, ...props }
      this.name = name
      this.Properties = {
        ..._handleFirstDomain(props.domains),
        ..._transformInputDomainData(props.domains),
        ...Tags(props.tags),
        SubjectAlternativeNames: [''],
        ValidationMethod: 'EMAIL'
      }
    } else {
      throw new Error('Certificate Constructor does not know what to do with the input')
    }
  }
  addDomains (input: IcertDomainInput): AWSCertificate {
    return this
  }
  proveViaEmail (useEmail: true): AWSCertificate {
    const _this = this

    _this.Properties = {
      ...this.Properties,
      ValidationMethod: useEmail ? 'EMAIL' : 'DNS'
    }

    return _this
  }
  tags (inTags: Itags | Itags[]): AWSCertificate {
    const _this = this

    _this.Properties = {
      ...this.Properties,
      ...Tags(inTags)
    }

    return _this
  }
  Ref (): IRef {
    return {
      Ref: this.name
    }
  }
  toJSON (): object {
    return {
      [this.name]: {
        Type: this.Type,
        Properties: this.Properties
      }
    }
  }
  everyDomain (): string[] {
    return [this.Properties.DomainName, ...this.Properties.SubjectAlternativeNames]
  }
  altDomains (): string[] {
    return [this.Properties.DomainName, ...this.Properties.SubjectAlternativeNames]
  }
  mainDomain (): string {
    return this.Properties.DomainName
  }
  //
} // end of class
export const isStringArr = (input: string[] | any): input is string[] => {
  return input.length > 0 && (typeof input[0] === 'string' || input[0] instanceof String)
}

export const isObjArr = (input: string[] | object[]): input is object[] => {
  return input.length > 0 && typeof input[0] === 'object'
}

export const _transformInputDomainData = (
  _in: IcertDoaminItems | IcertDomainLists
): ICertMultiStrDomain => {
  if (Array.isArray(_in)) {
    // list mode
    if (isStringArr(_in)) {
      return {
        ..._handleFirstDomain(_in),
        SubjectAlternativeNames: _in.slice(1)
      }
    } else if (isObjArr(_in)) {
      return {
        ..._handleFirstDomain(_in),
        ..._domainObjOpts(_in.slice(1))
      }
    } else {
      throw new Error(
        'Certificate Domain input array got an invalid array type. Make sure it has 1 valid domain name as a string or {domain:string, proofingDomain: string}'
      )
    }
  } else {
    // item mode
    if (typeof _in === 'string') {
      return {
        DomainName: _in
      }
    } else if ('domain' in _in) {
      return {
        DomainName: _in.domain,
        DomainValidationOptions: [
          {
            DomainName: _in.domain,
            ValidationDomain: _in.proofingDomain
          }
        ]
      }
    } else {
      throw new Error(
        'Certificate Domain input got an invalid type. Make sure it has 1 valid domain name as a string or {domain:string, proofingDomain: string}'
      )
    }
  }
}

export const _domainObjOpts = (_in: { domain: string; proofingDomain: string }[]) => {
  return _in.length > 0
    ? {
      DomainValidationOptions: _in.map(obj => ({
        DomainName: obj.domain,
        ValidationDomain: obj.proofingDomain
      }))
    }
    : {}
}

export const _domainStringOpts = (_in: string[]) => {
  return _in.length > 0
    ? {
      DomainValidationOptions: _in.map(domainString => ({
        DomainName: domainString,
        ValidationDomain: domainString
      }))
    }
    : {}
}
export const _handleFirstDomain = (
  _in: IcertDoaminItems | IcertDomainLists
): { DomainName: string } => {
  // set the placeholder var based on input mode
  let _firstDomain: string

  if (Array.isArray(_in)) {
    if (isStringArr(_in)) {
      _firstDomain = _in[0]
    } else if (isObjArr(_in)) {
      _firstDomain = _in[0].domain
    } else {
      throw new Error(
        'Certificate Domain input array got an invalid array type. Make sure it has 1 valid domain name as a string or {domain:string, proofingDomain: string}'
      )
    }
  } else {
    // item (string | object)
    if (typeof _in === 'string') {
      _firstDomain = _in
    } else if ('domain' in _in) {
      _firstDomain = _in.domain
    } else {
      throw new Error('got an empty string[] of domains to setup for an HTTP cert via ACM')
    }
  }
  if (_firstDomain.startsWith('http')) {
    try {
      return { DomainName: new Url.URL(_firstDomain).hostname }
    } catch (e) {
      throw new Error(
        'the first entry in the string[] of domains to setup for an HTTP cert via ACM was not a valid URL'
      )
    }
  } else {
    // @todo do validation? here?
    return { DomainName: _firstDomain }
  }
}

type ICertMultiStrDomain = ICertDomainWithValidations | ICertDomainAndAlternates
export interface ICertDomainAndAlternates {
  DomainName: string
  SubjectAlternativeNames?: string[]
}
export interface ICertDomainWithValidations {
  DomainName: string
  DomainValidationOptions?: ICertValidationOpts[]
}

export interface ICertValidationOpts {
  DomainName: string
  ValidationDomain: string
}

export interface IcertObj {
  domains: IcertDoaminItems | IcertDomainLists // 1st domainItem is special
  name?: string
  autoGenWildcards: boolean
  proofType: 'email' | 'dns'
  tags: Itags
}

export type IcertDomainInput = IcertDoaminItems | IcertDomainLists
export type IcertDoaminItems = string | { domain: string; proofingDomain: string }
export type IcertDomainLists = string[] | { domain: string; proofingDomain: string }[]
