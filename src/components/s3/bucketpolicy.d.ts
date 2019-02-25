interface FnGetAtt {
  'Fn::GetAtt': [string, string]
}
interface Ref {
  Ref: string
}

// enum validProperties { A, B, C }

declare class S3BucketPolicy {
  constructor(name?: string, props?: object)
  Type: string
  Properties?: object
  toJSON(): object
  Ref(): Ref
  Arn(): FnGetAtt
  DomainName(): FnGetAtt
  RegionalDomainName(): FnGetAtt
  WebsiteURL(): FnGetAtt
  validate(): FnGetAtt
}

export = S3BucketPolicy
