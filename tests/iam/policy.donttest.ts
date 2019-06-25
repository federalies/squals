// import { cond as condition } from '../../src/components/iam/policy'

const condition = (d: Function) => ({ str: { a: 1 } })

describe.skip('IAM.PolicyStatements.Conditioons', () => {
  describe.skip('String Comparison Conditions', () => {
    test('String Equals', () => {
      let cond = (aws: any) => aws.UserAgent === 'Example Corp Java Client'
      const actual = condition(cond)
      const expected = { StringEquals: { 'aws:UserAgent': 'Example Corp Java Client' } }
      expect(actual).toEqual(expected)
    })

    test('String Not Equals', () => {
      let cond = (aws: any) => aws.UserAgent === 'Example Corp Java Client'
      const actual = condition(cond)
      const expected = { StringEquals: { 'aws:UserAgent': 'Example Corp Java Client' } }

      expect(actual).toEqual(expected)
    })

    test('StringEqualsIgnoreCase', () => {
      let cond = (aws: any) => aws.UserAgent === 'Example Corp Java Client'
      const expected = { StringEquals: { 'aws:UserAgent': 'Example Corp Java Client' } }
      expect(condition(cond)).toEqual(expected)
    })

    test('StringNotEqualsIgnoreCase', () => {
      let cond = (aws: any) => aws.UserAgent === 'Example Corp Java Client'
      const expected = { StringEquals: { 'aws:UserAgent': 'Example Corp Java Client' } }
      expect(condition(cond)).toEqual(expected)
    })

    test('StringLike', () => {
      let cond = (aws: any) => aws.UserAgent === 'Example Corp Java Client'
      const expected = { StringEquals: { 'aws:UserAgent': 'Example Corp Java Client' } }
      expect(condition(cond)).toEqual(expected)
    })

    test('StringNotLike', () => {
      let cond = (aws: any) => aws.UserAgent === 'Example Corp Java Client'
      const expected = { StringEquals: { 'aws:UserAgent': 'Example Corp Java Client' } }
      expect(condition(cond)).toEqual(expected)
    })
  })
  describe.skip('Numeric Conditions', () => {
    test('NumericEquals', () => {
      let cond = (aws: any) => aws.UserAgent === 'Example Corp Java Client'
      const expected = { StringEquals: { 'aws:UserAgent': 'Example Corp Java Client' } }
      expect(condition(cond)).toEqual(expected)
    })

    test('NumericNotEquals', () => {
      let cond = (aws: any) => aws.UserAgent === 'Example Corp Java Client'
      const expected = { StringEquals: { 'aws:UserAgent': 'Example Corp Java Client' } }
      expect(condition(cond)).toEqual(expected)
    })

    test('NumericLessThan', () => {
      let cond = (aws: any) => aws.UserAgent === 'Example Corp Java Client'
      const expected = { StringEquals: { 'aws:UserAgent': 'Example Corp Java Client' } }
      expect(condition(cond)).toEqual(expected)
    })
    test('NumericLessThanEquals', () => {
      let cond = (aws: any) => aws.UserAgent === 'Example Corp Java Client'
      const expected = { StringEquals: { 'aws:UserAgent': 'Example Corp Java Client' } }
      expect(condition(cond)).toEqual(expected)
    })
    test('NumericGreaterThan', () => {
      let cond = (aws: any) => aws.UserAgent === 'Example Corp Java Client'
      const expected = { StringEquals: { 'aws:UserAgent': 'Example Corp Java Client' } }
      expect(condition(cond)).toEqual(expected)
    })
    test('NumericGreaterThanEquals', () => {
      let cond = (aws: any) => aws.UserAgent === 'Example Corp Java Client'
      const expected = { StringEquals: { 'aws:UserAgent': 'Example Corp Java Client' } }
      expect(condition(cond)).toEqual(expected)
    })
  })
  describe.skip('Date Conditions', () => {
    test.skip('DateEquals', () => {})
    test.skip('DateNotEquals', () => {})
    test.skip('DateLessThan', () => {})
    test.skip('DateLessThanEquals', () => {})
    test.skip('DateGreaterThan', () => {})
    test.skip('DateGreaterThanEquals', () => {})
  })
  describe.skip('IP Address Conditions', () => {
    test.skip('IpAddress', () => {})
    test.skip('NotIpAddress', () => {})
  })
  describe.skip('Arn Conditions', () => {
    test.skip('ArnEquals', () => {
      const filterPrefix = 'arn:aws:sns:REGION:123456789012:TOPIC-ID'
      const StrictEq = condition((aws: any) => aws.SourceArn === `${filterPrefix}`)
      expect(StrictEq).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
    })
    test.skip('ArnNotEquals', () => {
      const filterPrefix = 'arn:aws:sns:REGION:123456789012:TOPIC-ID'
      const HardDif = condition((aws: any) => aws.SourceArn !== `${filterPrefix}`)
      expect(HardDif).toEqual({ ArnNotEquals: { 'aws:SourceArn': filterPrefix } })
    })

    test.skip('ArnLike', () => {
      const filterPrefix = 'arn:aws:sns:REGION:123456789012:TOPIC-ID'

      const looseEq = condition((aws: any) => aws.SourceArn == `${filterPrefix}`)
      const looseEqwStar = condition((aws: any) => aws.SourceArn == `${filterPrefix}*`)
      const endsW = condition((aws: any) => aws.SourceArn.endsWith(filterPrefix))
      const startsW = condition((aws: any) => aws.SourceArn.startsWith(filterPrefix))
      const matching = condition((aws: any) => aws.SourceArn.match(filterPrefix))
      const subst = condition((aws: any) => aws.SourceArn.substring(1, 3) === filterPrefix)
      const slicing = condition((aws: any) => aws.SourceArn.slice(1) === filterPrefix)
      const including = condition((aws: any) => aws.SourceArn.includes(filterPrefix))
      const splitting = condition((aws: any) => aws.SourceArn.split(':')[2] === filterPrefix)

      // alter these tempaltized starters
      expect(looseEq).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
      expect(looseEq).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
      expect(looseEqwStar).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
      expect(endsW).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
      expect(startsW).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
      expect(matching).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
      expect(subst).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
      expect(slicing).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
      expect(including).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
      expect(splitting).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
    })
    test.skip('ArnNotLike', () => {
      const filterPrefix = 'arn:aws:sns:REGION:123456789012:TOPIC-ID'

      const LooseDif = condition(
        ({ aws, s3, sns, dynamodb }: IConditionFunc) => aws.SourceArn != `${filterPrefix}`
      )
      const looseDiffwStar = condition((aws: any) => aws.SourceArn != `${filterPrefix}*`)

      const notEndsW = condition((aws: any) => !aws.SourceArn.endsWith(filterPrefix))
      const notStartsW = condition((aws: any) => !aws.SourceArn.startsWith(filterPrefix))
      const notMatching = condition((aws: any) => !aws.SourceArn.match(filterPrefix))
      const notIncluding = condition((aws: any) => !aws.SourceArn.includes(filterPrefix))

      const notSubst = condition((aws: any) => aws.SourceArn.substring(1, 3) !== filterPrefix)
      const notSlicing = condition((aws: any) => aws.SourceArn.slice(1) !== filterPrefix)
      const notSplitting = condition((aws: any) => aws.SourceArn.split(':')[2] !== filterPrefix)

      // alter these tempaltized starters
      expect(LooseDif).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
      expect(looseDiffwStar).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
      expect(notEndsW).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
      expect(notStartsW).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
      expect(notMatching).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
      expect(notIncluding).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
      expect(notSubst).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
      expect(notSlicing).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
      expect(notSplitting).toEqual({ ArnLike: { 'aws:SourceArn': filterPrefix } })
    })
  })
  describe.skip('Bool + Null Conditions', () => {
    test.skip('Bool', () => {})
  })
  describe.skip('String Like If Exists Conditions', () => {
    test.skip('StringLikeIfExists', () => {})
  })
})

describe.skip('IAM.PolicyDocumen.Condtions - 2arity Functions', () => {
  test('Simple 2arity Example', () => {
    // setup basic data
    const arnStr = 'arn:aws:sns:REGION:123456789012:TOPIC-ID'

    let cond = (myData: string) => (aws: any) => aws.SourceArn === myData

    const actual = condition(cond(arnStr))

    const expected = { ArnEquals: { 'aws:SourceArn': arnStr } }
    expect(actual).toEqual(expected)
  })
  test('Not So Simple 2 arity Example', () => {
    // setup basic data
    const myColumnChecks = ['ID', 'Message', 'Tags']
    // 2stage condition function 1. Inject My Data 2. Mix that with AST Transforms
    let cond = (myData: string[]) => (dynamodb: any) =>
      [...myData].every(val => dynamodb.Attributes.includes(val))
    const actual = condition(cond(myColumnChecks))
    const expected = {
      'ForAllValues:StringEquals': {
        'dynamodb:Attributes': myColumnChecks
      }
    }
    expect(actual).toEqual(expected)
  })
})

interface IConditionFunc {
  aws: {
    CurrentTime?: Date
    EpochTime?: number
    TokenIssueTime?: Date
    principaltype?: string
    SecureTransport?: boolean
    SourceIp?: string
    UserAgent?: string
    userid?: string
    username?: string
    Referer?: string
    SourceArn: string
  }
  ec2: {
    SourceInstanceARN?: string
  }
  s3: {
    prefix?: string
    VersionId?: string
    LocationConstraint?: string
    delimiter?: string
    RequestObjectTagKeys?: string
    'max-keys'?: number
    'x-amz-acl'?: string
    'x-amz-acl'?: string
    'x-amz-copy-source'?: string
    'x-amz-metadata-directive'?: string
    'x-amz-server-side-encryption'?: string
    'x-amz-server-side-encryption-aws-kms-key-id'?: string
    'object-lock-remaining-retention-days'?: string
    'ExistingObjectTag/____tagkey'?: string
    'RequestObjectTag/____tagkey'?: string
  }
  sns: {
    Endpoint?: string
    Protocol?: 'https' | 'email' | 'sms' | 'push'
  }
  dynamodb: {
    LeadingKeys: string[]
    Attributes: string[]
  }
}
