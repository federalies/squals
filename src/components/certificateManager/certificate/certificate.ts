import Url from 'url'
import { Itags } from '../../Template'
import { url } from 'inspector'

export class Certificate {
  Type: 'AWS::CertificateManager::Certificate'
  Properties: {
    DomainName: string
    DomainValidationOptions?: ICertValidationOpts[]
    SubjectAlternativeNames?: string[]
    ValidationMethod?: 'EMAIL' | 'DNS'
    Tags?: ['ResourceTag']
  }

  constructor (props: Icert) {
    this.Type = 'AWS::CertificateManager::Certificate'
    this.Properties = { DomainName: 'props.domains' }
  }

  private _domains (_in: IdoaminInput) {
    if (Array.isArray(_in)) {
      if (_in[0] && typeof _in[0] === 'string') {
        return { DomainName: this._handleFirstDoamin(_in) }
      } else {
        return {}
      }
    } else {
      return { DomainName: _in }
    }
  }

  private _handleFirstDoamin (_in: string[] | IdomainClaimWithDiffDomainValidating[]) {
    if (_in.length > 0) {
      const first = _in[0]

      if (typeof first === 'string') {
        try {
          return { DomainName: new Url.URL(first).hostname }
        } catch (e) {
          throw new Error(
            'the first entry in the string[] of domains to setup for an HTTP cert via ACM was not a valid URL'
          )
        }
      } else {
        try {
          return { DomainName: new Url.URL(first.domain).hostname }
        } catch (e) {
          throw new Error(
            'the first entry in the string[] of domains to setup for an HTTP cert via ACM was not a valid URL'
          )
        }
      }
    } else {
      throw new Error('got an empty string[] of domains to setup for an HTTP cert via ACM')
    }
  }

  //
} // end of class

interface ICertValidationOpts {
  DomainName: String
  ValidationDomain: String
}

interface Icert {
  domains: IdoaminInput
  proofType: 'EMAIL' | 'DNS'
  tags: Itags
}

interface IdomainClaimWithDiffDomainValidating {
  domain: string
  proofingDomain: string
}

type IdoaminInput =
  | string
  | IdomainClaimWithDiffDomainValidating
  | string[]
  | IdomainClaimWithDiffDomainValidating[]
