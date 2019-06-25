import { IamStatement } from '../../src/components/iam/index'

describe('IAM Statememt Objects', () => {
  test('Defaults', () => {
    const policy1 = new IamStatement('id1243').allows()
    const policy2 = new IamStatement('id1243')
    const expected = {
      Sid: 'id1243',
      Effect: 'Allow',
      Action: '*',
      Resource: '*'
    }
    expect(policy1).toEqual(expected)
    expect(policy2).toEqual(expected)
  })
  test('Default Deny', () => {
    const policy = new IamStatement('id123').denies()
    const expected = {
      Sid: 'id123',
      Effect: 'Deny',
      Action: '*',
      Resource: '*'
    }
    expect(policy).toEqual(expected)
  })
  test(' Unaided User Created Verbose Example : user Knows how to type elements', () => {
    const a = new IamStatement()
      .allows()
      .actions('s3.*', 'lambda.*')
      .resources('resource1', 'resouce2')
      .when(
        { StringLike: { 's3:key': ['myKey', 'otherOptions'] } },
        { StringLike: { 's3:funkyStuff': ['got', 'the', 'funk'] } },
        { StringEquals: { 's3:prefix': 'myPrefix' } }
      )

    const e = {
      Effect: 'Allow',
      Action: ['s3.*', 'lambda.*'],
      Resource: ['resource1', 'resouce2'],
      Condition: {
        StringEquals: { 's3:prefix': 'myPrefix' },
        StringLike: [
          { 's3:key': ['myKey', 'otherOptions'] },
          { 's3:funkyStuff': ['got', 'the', 'funk'] }
        ]
      }
    }
    expect(a).toEqual(e)
  })
})
