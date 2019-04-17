export class Certificate {
  constructor () {}
}

/**
 {
  "Type" : "AWS::CertificateManager::Certificate",
  "Properties" : {
    "DomainName" : String,
    "DomainValidationOptions" : [ {
  "DomainName" : String,
  "ValidationDomain" : String
} ],
    "SubjectAlternativeNames" : [ 'String' ],
    "Tags" : [ Resource Tag, ... ],
    "ValidationMethod" : String
  }
}
 */
