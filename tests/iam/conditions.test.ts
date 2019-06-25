import { IamStatement } from '../../src/components/iam/index'
import { conditions } from '../../src/components/iam/conditions'

describe('IAM Statement Conditions', () => {
  const c = conditions()

  test('S3.prefix EQUALS someString ', () => {
    const a1 = IamStatement.cond.s3.prefix.equals('someString')
    const a2 = c.s3.prefix.equals('someString')

    const e = { StringEquals: { 's3:prefix': 'someString' } }
    expect(a1).toEqual(e)
    expect(a2).toEqual(e)
  })

  test('S3.prefix LIKE otherStrings', () => {
    const a1 = IamStatement.cond.s3.prefix.like('someString', 'lastString')
    const a2 = c.s3.prefix.like('someString', 'lastString')
    const e = { StringLike: { 's3:prefix': ['someString', 'lastString'] } }
    expect(a1).toEqual(e)
    expect(a2).toEqual(e)
  })

  test('S3.signatureage <= 1000 ', () => {
    const a1 = IamStatement.cond.s3.signatureage.lesserOrEqualto(1000)
    const a2 = c.s3.signatureage.lesserOrEqualto(1000)
    const e = { NumericLessThanEquals: { 's3:signatureage': 1000 } }
    expect(a1).toEqual(e)
    expect(a2).toEqual(e)
  })

  test('S3.prefix LIKE otherStrings', () => {
    const a1 = IamStatement.cond.s3.prefix.like('someString', 'lastString')
    const a2 = c.s3.prefix.like('someString', 'lastString')
    const e = { StringLike: { 's3:prefix': ['someString', 'lastString'] } }
    expect(a1).toEqual(e)
    expect(a2).toEqual(e)
  })
})
