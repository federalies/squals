import { Parser } from 'acorn'

export class IAMPolicyDocument {
  constructor () {}
  toJSON (): object {
    // validate the object here
    // is passed return
    return {}
  }
}

const mappings: Imappings = {
  aws: {
    CurrentTime: 'Date',
    EpochTime: 'Number',
    FederatedProvider: 'String',

    'RequestObjectTag/<key>': 'String',
    'RequestTag/${TagKey}': 'String',
    'ResourceTag/${TagKey}': 'String'
  },
  s3: {
    prefix: 'String',
    LocationConstraint: 'String',
    RequestObjectTagKeys: 'String',
    VersionId: 'String',
    authtype: 'String',
    delimiter: 'String',
    locationconstraint: 'String',
    signatureage: 'Number',
    signatureversion: 'String',
    versionid: 'String',
    'max-keys': 'Number',
    TagKeys: 'String',
    'ExistingObjectTag/<key>': 'String',
    'x-amz-acl': 'String',
    'x-amz-content-sha256': 'String',
    'x-amz-copy-source': 'String',
    'x-amz-grant-full-control': 'String',
    'x-amz-grant-read': 'String',
    'x-amz-grant-read-acp': 'String',
    'x-amz-grant-write': 'String',
    'x-amz-grant-write-acp': 'String',
    'x-amz-metadata-directive': 'String',
    'x-amz-server-side-encryption': 'String',
    'x-amz-server-side-encryption-aws-kms-key-id': 'String',
    'x-amz-storage-class': 'String',
    'x-amz-website-redirect-location': 'String'
  },
  ec2: {},
  dynamodb: {
    Attributes: 'String',
    EnclosingOperation: 'String',
    LeadingKeys: 'String[]',
    ReturnConsumedCapacity: ['TOTAL', 'NONE'],
    ReturnValues: ['ALL_OLD', 'UPDATED_OLD', 'ALL_NEW', 'UPDATED_NEW', 'NONE'],
    Select: 'String'
  },
  codecommit: { References: 'String' },
  lambda: {
    FunctionArn: 'Arn',
    Layer: 'String',
    Principal: 'String'
  },
  elasticbeanstalk: {
    FromApplication: 'Arn',
    FromApplicationVersion: 'Arn',
    FromConfigurationTemplate: 'Arn',
    FromEnvironment: 'Arn',
    FromPlatform: 'Arn',
    FromSolutionStack: 'Arn',
    InApplication: 'Arn'
  },
  ecr: {
    'ResourceTag/${TagKey}': 'String'
  },
  ses: {
    FeedbackAddres: 'String',
    FromAddress: 'String',
    FromDisplayName: 'String',
    Recipients: 'String'
  },
  sns: {
    Endpoint: 'String',
    Protocol: 'String'
  },
  sts: { ExternalId: 'String' },
  saml: {
    aud: 'String',
    cn: 'String',
    commonName: 'String',
    doc: 'String',
    eduorghomepageuri: 'String',
    eduorgidentityauthnpolicyuri: 'String',
    eduorglegalname: 'String',
    eduorgsuperioruri: 'String',
    eduorgwhitepagesuri: 'String',
    edupersonaffiliation: 'String',
    edupersonassurance: 'String',
    edupersonentitlement: 'String',
    edupersonnickname: 'String',
    edupersonorgdn: 'String',
    edupersonorgunitdn: 'String',
    edupersonprimaryaffiliation: 'String',
    edupersonprimaryorgunitdn: 'String',
    edupersonprincipalname: 'String',
    edupersonscopedaffiliation: 'String',
    edupersontargetedid: 'String',
    givenName: 'String',
    iss: 'String',
    mail: 'String',
    name: 'String',
    namequalifier: 'String',
    organizationStatus: 'String',
    primaryGroupSID: 'String',
    sub: 'String',
    sub_type: 'String',
    surname: 'String',
    uid: 'String',
    x500UniqueIdentifier: 'String'
  }
}

const strToFuncs = (typing: ConditionsTyping, keysPath: string[], opts?: { avail: string[] }) => {
  switch (typing) {
    case 'Date':
      return {
        equals: (d: Date | string) => {
          if (d instanceof Date) {
            return { DateEquals: { [keysPath.join(':')]: d.toJSON().toString() } }
          } else {
            return { DateEquals: { [keysPath.join(':')]: d } }
          }
        },
        notEquals: (d: Date | string) => {
          if (d instanceof Date) {
            return { DateNotEquals: { [keysPath.join(':')]: d.toJSON().toString() } }
          } else {
            return { DateNotEquals: { [keysPath.join(':')]: d } }
          }
        },
        greaterThan: (d: Date) => {
          return { DateGreaterThan: { [keysPath.join(':')]: d.toJSON().toString() } }
        },
        lessThan: (d: Date) => {
          return { DateLessThan: { [keysPath.join(':')]: d.toJSON().toString() } }
        },
        greaterOrEqualto: (d: Date) => {
          return { DateGreaterThanEquals: { [keysPath.join(':')]: d.toJSON().toString() } }
        },
        lesserOrEqualto: (d: Date) => {
          return { DateLessThanEquals: { [keysPath.join(':')]: d.toJSON().toString() } }
        }
      } as IDateCondition
    case 'Number':
      return {
        equals: (n: number) => ({ NumericEquals: { [keysPath.join(':')]: n } }),
        notEquals: (n: number) => ({ NumericNotEquals: { [keysPath.join(':')]: n } }),
        greaterThan: (n: number) => ({ NumericGreaterThan: { [keysPath.join(':')]: n } }),
        lessThan: (n: number) => ({ NumericLessThan: { [keysPath.join(':')]: n } }),
        greaterOrEqualto: (n: number) => ({
          NumericGreaterThanEquals: { [keysPath.join(':')]: n }
        }),
        lesserOrEqualto: (n: number) => ({ NumericLessThanEquals: { [keysPath.join(':')]: n } })
      } as INumericCondition
    case 'String':
      return {
        equals: (s: string) => ({ StringEquals: { [keysPath.join(':')]: s } }),
        notEquals: (s: string) => ({ StringNotEquals: { [keysPath.join(':')]: s } }),
        like: (s: string | string[]) => ({ StringLike: { [keysPath.join(':')]: s } }),
        notLike: (s: string) => ({ StringNotLike: { [keysPath.join(':')]: s } }),
        ignoringCase: {
          equals: (s: string) => ({ StringEqualsIgnoreCase: { [keysPath.join(':')]: s } }),
          notEquals: (s: string) => ({ StringNotEqualsIgnoreCase: { [keysPath.join(':')]: s } })
        },
        all: {
          equals: (s: string[]) => ({ 'ForAllValue:StringEquals': { [keysPath.join(':')]: s } }),
          notEquals: (s: string[]) => ({
            'ForAllValue:StringNotEquals': { [keysPath.join(':')]: s }
          }),
          like: (s: string[]) => ({ 'ForAllValue:StringLike': { [keysPath.join(':')]: s } }),
          notLike: (s: string[]) => ({ 'ForAllValue:StringNotLike': { [keysPath.join(':')]: s } }),
          ignoringCase: {
            equals: (s: string[]) => ({
              'ForAllValue:StringEqualsIgnoreCase': { [keysPath.join(':')]: s }
            }),
            notEquals: (s: string[]) => ({
              'ForAllValue:StringNotEqualsIgnoreCase': { [keysPath.join(':')]: s }
            })
          }
        },
        any: {
          equals: (s: string[]) => ({
            'ForAnyValue:StringEquals': { [keysPath.join(':')]: s }
          }),
          notEquals: (s: string[]) => ({
            'ForAnyValue:StringNotEquals': { [keysPath.join(':')]: s }
          }),
          like: (s: string[]) => ({
            'ForAnyValue:StringLike': { [keysPath.join(':')]: s }
          }),
          notLike: (s: string[]) => ({
            'ForAnyValue:StringNotLike': { [keysPath.join(':')]: s }
          }),
          ignoringCase: {
            equals: (s: string[]) => ({
              'ForAnyValue:StringEqualsIgnoreCase': { [keysPath.join(':')]: s }
            }),
            notEquals: (s: string[]) => ({
              'ForAnyValue:StringNotEqualsIgnoreCase': { [keysPath.join(':')]: s }
            })
          }
        }
      } as IStringCondition
    case 'String[]':
      return {
        all: {
          equals: (s: string[]) => ({ 'ForAllValue:StringEquals': { [keysPath.join(':')]: s } }),
          notEquals: (s: string[]) => ({
            'ForAllValue:StringNotEquals': { [keysPath.join(':')]: s }
          }),
          like: (s: string[]) => ({ 'ForAllValue:StringLike': { [keysPath.join(':')]: s } }),
          notLike: (s: string[]) => ({ 'ForAllValue:StringNotLike': { [keysPath.join(':')]: s } }),
          ignoringCase: {
            equals: (s: string[]) => ({
              'ForAllValue:StringEqualsIgnoreCase': { [keysPath.join(':')]: s }
            }),
            notEquals: (s: string[]) => ({
              'ForAllValue:StringNotEqualsIgnoreCase': { [keysPath.join(':')]: s }
            })
          }
        },
        any: {
          equals: (s: string[]) => ({ 'ForAnyValue:StringEquals': { [keysPath.join(':')]: s } }),
          notEquals: (s: string[]) => ({
            'ForAnyValue:StringNotEquals': { [keysPath.join(':')]: s }
          }),
          like: (s: string[]) => ({ 'ForAnyValue:StringLike': { [keysPath.join(':')]: s } }),
          notLike: (s: string[]) => ({ 'ForAnyValue:StringNotLike': { [keysPath.join(':')]: s } }),
          ignoringCase: {
            equals: (s: string[]) => ({
              'ForAnyValue:StringEqualsIgnoreCase': { [keysPath.join(':')]: s }
            }),
            notEquals: (s: string[]) => ({
              'ForAnyValue:StringNotEqualsIgnoreCase': { [keysPath.join(':')]: s }
            })
          }
        }
      } as IStringCondition_plural
    case 'IPAddress':
      return {
        is: (ip: string) => ({
          IpAddress: { [keysPath.join(':')]: ip }
        }),
        isNot: (ip: string) => ({
          NotIpAddress: { [keysPath.join(':')]: ip }
        })
      } as IIPAddressCondition
    case 'Arn':
      return {
        is: (arn: string) => ({ ArnEquals: { [keysPath.join(':')]: arn } }),
        isNot: (arn: string) => ({ ArnNotEquals: { [keysPath.join(':')]: arn } }),
        isLike: (arn: string) => ({ ArnLike: { [keysPath.join(':')]: arn } }),
        isNotLike: (arn: string) => ({ ArnNotLike: { [keysPath.join(':')]: arn } })
      } as IArnCondition
    case 'Bool':
      return {
        is: (b: boolean) => ({ Bool: { [keysPath.join(':')]: b } })
      } as IBoolCondition
    default:
      return {
        is: (s: string) => {
          if (opts && !opts.avail.includes(s)) {
            throw new Error(
              `There is a valid set of options for ${keysPath.join(':')} the options are: ${
                opts.avail
              }`
            )
          } else {
            return { StringEquals: { [keysPath.join(':')]: s } }
          }
        }
      }
  }
}

const transformTypeToFuncs = (mappings: Imappings) => {}

const conditions = Object.entries(mappings).reduce((p1, [svcKey, svcVal]) => {
  return {
    ...p1,
    [svcKey]: Object.entries(svcVal).reduce((p2, [resKey, resVal]) => {
      return { ...p2, [resKey]: strToFuncs(resVal, [svcKey, resKey]) }
    }, {})
  }
}, {})

console.log((conditions as any).s3.prefix.equals)

// #region Interfaces
interface IDateCondition {
  equals(d: Date | string): { DateEquals: { [Attr: string]: string } }
  notEquals(d: Date | string): { DateNotEquals: { [Attr: string]: string } }
  greaterThan(d: Date): { DateGreaterThan: { [Attr: string]: string } }
  lessThan(d: Date): { DateLessThan: { [Attr: string]: string } }
  greaterOrEqualto(d: Date): { DateGreaterThanEquals: { [Attr: string]: string } }
  lesserOrEqualto(d: Date): { DateLessThanEquals: { [Attr: string]: string } }
}
interface INumericCondition {
  equals(n: number): { NumericEquals: { [Attr: string]: number } }
  notEquals(n: number): { NumericNotEquals: { [Attr: string]: number } }
  greaterThan(n: number): { NumericGreaterThan: { [Attr: string]: number } }
  lessThan(n: number): { NumericLessThan: { [Attr: string]: number } }
  greaterOrEqualto(n: number): { NumericGreaterThanEquals: { [Attr: string]: number } }
  lesserOrEqualto(n: number): { NumericLessThanEquals: { [Attr: string]: number } }
}
interface IStringCondition extends IStringCondition_plural {
  equals(s: string): { StringEquals: { [Attr: string]: string } }
  notEquals(s: string): { StringNotEquals: { [Attr: string]: string } }
  like(s: string | string[]): { StringLike: { [Attr: string]: string } }
  notLike(s: string): { StringNotLike: { [Attr: string]: string } }
  ignoringCase: {
    equals(s: string): { StringEqualsIgnoreCase: { [Attr: string]: string } }
    notEquals(s: string): { StringNotEqualsIgnoreCase: { [Attr: string]: string } }
  }
}
interface IStringCondition_plural {
  all: {
    equals(s: string[]): { 'ForAllValue:StringEquals': { [Attr: string]: string[] } }
    notEquals(s: string[]): { 'ForAllValue:StringNotEquals': { [Attr: string]: string[] } }
    like(s: string[]): { 'ForAllValue:StringLike': { [Attr: string]: string[] } }
    notLike(s: string[]): { 'ForAllValue:StringNotLike': { [Attr: string]: string[] } }
    ignoringCase: {
      equals(s: string[]): { 'ForAllValue:StringEqualsIgnoreCase': { [Attr: string]: string[] } }
      notEquals(
        s: string[]
      ): { 'ForAllValue:StringNotEqualsIgnoreCase': { [Attr: string]: string[] } }
    }
  }
  any: {
    equals(s: string[]): { 'ForAnyValue:StringEquals': { [Attr: string]: string[] } }
    notEquals(s: string[]): { 'ForAnyValue:StringNotEquals': { [Attr: string]: string[] } }
    like(s: string[]): { 'ForAnyValue:StringLike': { [Attr: string]: string[] } }
    notLike(s: string[]): { 'ForAnyValue:StringNotLike': { [Attr: string]: string[] } }
    ignoringCase: {
      equals(s: string[]): { 'ForAnyValue:StringEqualsIgnoreCase': { [Attr: string]: string[] } }
      notEquals(
        s: string[]
      ): { 'ForAnyValue:StringNotEqualsIgnoreCase': { [Attr: string]: string[] } }
    }
  }
}
interface IBoolCondition {
  is(b: boolean): { Bool: { [keysPath: string]: boolean } }
}
interface IIPAddressCondition {
  is(ip: string): { IpAddress: { [keysPath: string]: string } }
  isNot(ip: string): { NotIpAddress: { [keysPath: string]: string } }
}
interface IArnCondition {
  is(arn: string): { ArnEquals: { [resource: string]: string } }
  isNot(arn: string): { ArnNotEquals: { [resource: string]: string } }
  isLike(arn: string): { ArnLike: { [resource: string]: string } }
  isNotLike(arn: string): { ArnNotLike: { [resource: string]: string } }
}
interface IIAMPolicyStatement {
  Effect: 'Allow' | 'Deny'
  Action: string | string[]
  Resource: string | string[]
  Condition: string
}
interface Imappings {
  [svcKey: string]: {
    [reskey: string]: ConditionsTyping
  }
}
type ConditionsTyping =
  | 'Date'
  | 'Number'
  | 'String'
  | 'Bool'
  | 'Arn'
  | 'IPAddress'
  | 'String[]'
  | string[]

// #endregion Interfaces

// #region Graveyard
/**
 *
 *
 *
 * // console.log(transformWalk(mappings, strToFuncs))

    // condition.

    // interface IiamPolicyStatement {
    //   effect?: 'Allow' | 'Deny'
    //   actions: string | string[]
    //   notActions: string | string[]
    //   resrouce: string | string[]
    //   condition?: string | string[]
    //   principal?: string[][][]
    //   notPrincipal?: string[][][]
    // }

 *
 *
 *
 *
 */
// #endregion DeadCode
