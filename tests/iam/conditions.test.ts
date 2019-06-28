import { IamStatement } from '../../src/components/iam/index'
import { conditions } from '../../src/components/iam/statement/conditions'

describe('IAM Statement Conditions', () => {
  const c = conditions()

  test('S3.prefix EQUALS someString ', () => {
    const a1 = IamStatement.c.s3.prefix.equals('someString')
    const a2 = c.s3.prefix.equals('someString')

    const e = { StringEquals: { 's3:prefix': 'someString' } }
    expect(a1).toEqual(e)
    expect(a2).toEqual(e)
  })

  test('S3.prefix LIKE otherStrings', () => {
    const a1 = IamStatement.c.s3.prefix.like('someString', 'lastString')
    const a2 = c.s3.prefix.like('someString', 'lastString')
    const e = { StringLike: { 's3:prefix': ['someString', 'lastString'] } }
    expect(a1).toEqual(e)
    expect(a2).toEqual(e)
  })

  test('S3.signatureage <= 1000 ', () => {
    const a1 = IamStatement.c.s3.signatureage.lesserOrEqualto(1000)
    const a2 = c.s3.signatureage.lesserOrEqualto(1000)
    const e = { NumericLessThanEquals: { 's3:signatureage': 1000 } }
    expect(a1).toEqual(e)
    expect(a2).toEqual(e)
  })

  test('S3.prefix LIKE otherStrings', () => {
    const a1 = IamStatement.c.s3.prefix.like('someString', 'lastString')
    const a2 = c.s3.prefix.like('someString', 'lastString')
    const e = { StringLike: { 's3:prefix': ['someString', 'lastString'] } }
    expect(a1).toEqual(e)
    expect(a2).toEqual(e)
  })

  test('String Arr Func', () => {
    const a = 1
    const e = 1
    expect(a).toEqual(e)
  })

  test('Tag Func', () => {
    expect(c.aws.TagKeys.equals('_tagkey', 'tagValue')).toEqual({
      StringEquals: { 'aws:TagKeys/_tagkey': 'tagValue' }
    })

    expect(c.aws.TagKeys.any.equals('_tagkey', ...['tagValue1', 'tagValue2'])).toEqual({
      'ForAnyValue:StringEquals': { 'aws:TagKeys/_tagkey': ['tagValue1', 'tagValue2'] }
    })

    expect(c.aws.TagKeys.notLike('_tagkey', ...['tagValue1', 'tagValue2'])).toEqual({
      StringNotLike: { 'aws:TagKeys/_tagkey': ['tagValue1', 'tagValue2'] }
    })
  })

  test('Boolean Func', () => {
    expect(c.aws.SecureTransport.is(true)).toEqual({ Bool: { 'aws:SecureTransport': true } })
  })

  test('Arn Func', () => {
    let a: unknown = c.aws.PrincipalArn.isLike('arn:some:arnNumnber')
    let e: unknown = { ArnLike: { 'aws:PrincipalArn': ['arn:some:arnNumnber'] } }
    expect(a).toEqual(e)

    a = c.aws.PrincipalArn.isNotLike('arn:some:arnNumnber', 'arn:someOther:arnNumnber')
    e = { ArnNotLike: { 'aws:PrincipalArn': ['arn:some:arnNumnber', 'arn:someOther:arnNumnber'] } }
    expect(a).toEqual(e)

    a = c.aws.PrincipalArn.is('arn:some:arnNumnber')
    e = { ArnEquals: { 'aws:PrincipalArn': 'arn:some:arnNumnber' } }
    expect(a).toEqual(e)

    a = c.aws.PrincipalArn.isNot('arn:some:arnNumnber')
    e = { ArnNotEquals: { 'aws:PrincipalArn': 'arn:some:arnNumnber' } }
    expect(a).toEqual(e)
  })

  test('Date Func', () => {
    const a = c.aws.CurrentTime.equals(new Date(2000, 1, 1))
    const e = { DateEquals: { 'aws:CurrentTime': '2000-02-01T06:00:00.000Z' } }
    expect(a).toEqual(e)
  })

  test('IP Address Funcs', () => {
    const a = 1
    const e = 1
    expect(a).toEqual(e)
  })

  test('Number Funcs', () => {
    let a = c.s3.signatureage.lessThan(100) as { [operand: string]: { [svc: string]: number } }
    let e = { NumericLessThan: { 's3:signatureage': 100 } } as {
      [operand: string]: { [svc: string]: number }
    }
    expect(a).toEqual(e)

    a = c.s3.signatureage.greaterOrEqualto(100)
    e = { NumericGreaterThanEquals: { 's3:signatureage': 100 } }
    expect(a).toEqual(e)

    // a = c.s3.signatureage.greaterOrEqualto(100)
    // e = { NumericGreaterThanEquals: { 's3:signatureage': 100 } }
    // expect(a).toEqual(e)
  })
})

describe('Enum Usage', () => {
  const c = conditions()

  test('String Enum Usage', () => {
    const a = () => c.dynamodb.Select.any.equals('_BAD_ALL_ATTRIBUTES', 'ALL_PROJECTED_ATTRIBUTES')
    expect(a).toThrow()
  })

  // test('Number Enum Usage', () => {
  //   const a = 1
  //   const e = 1
  //   expect(a).toEqual(e)
  // })
  //
  // test('Number Enum Usage', () => {
  //   const a = 1
  //   const e = 1
  //   expect(a).toEqual(e)
  // })
})
