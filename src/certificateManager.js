export class CertificateManager {
  constructor (props) {
    this.Type = 'AWS::CertificateManager::Certificate'
    this.a = props.a
  }
}

// "DomainName" : String,
// "DomainValidationOptions" : [ DomainValidationOptions, ... ],
// "SubjectAlternativeNames" : [ String, ... ],
// "Tags" : [ Resource Tag, ... ],
// "ValidationMethod" : String
