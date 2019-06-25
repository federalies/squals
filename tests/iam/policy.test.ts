import { IIamStatement, IamPolicy, IamStatement, actions } from '../../src/components/iam/index'

describe('IAM Policy Objects', () => {
  const c = IamStatement.cond
  test('Defaults', () => {
    const name = 'name'
    const a = new IamPolicy(name).statements(new IamStatement())
    const e = {
      PolicyName: 'name',
      PolicyDocument: {
        Version: '2012-10-17',
        Id: 'name',
        Statement: [{ Effect: 'Allow', Resource: '*', Action: '*' }]
      }
    }
    expect(a).toHaveProperty('name')
    expect(a.Type).toEqual('AWS::IAM::Policy')
    expect(a.Properties).toEqual(e)
  })

  test('Basic Deny', () => {
    const name = 'name2'
    const a = new IamPolicy(name).statements(new IamStatement().denies())
    const e = {
      PolicyName: 'name2',
      PolicyDocument: {
        Version: '2012-10-17',
        Id: 'name2',
        Statement: [{ Effect: 'Deny', Resource: '*', Action: '*' }]
      }
    }
    expect(a).toHaveProperty('name')
    expect(a.Type).toEqual('AWS::IAM::Policy')
    expect(a.Properties).toEqual(e)
  })

  test('More Advanced Statement', () => {
    // much of this may be non-sensible cloudformation
    // the grammar has not been tightend up yet
    const name = 'name2'
    const a = new IamPolicy(name).statements(
      new IamStatement()
        .id('All_s3and_ec2')
        .allows()
        .actions('s3.*', 'ec2.*')
        .resources('someResourceString')
        .when(
          c.s3.prefix.equals('myPrefix'),
          c.s3.versionid.equals('someVersionId'),
          c.aws.SourceIp.is('11.11.11.11')
        ),
      new IamStatement()
        .id('no containers - yes to dynamo')
        .denies()
        .actions('ecs.*', 'ecr.*')
        .resources('*')
        .omittedActions('dynamo.*')
        .omittedResources('dynamo:west*', 'dynamo:east*')
    )

    const Statement = [
      {
        Sid: 'All_s3and_ec2',
        Effect: 'Allow',
        Action: ['s3.*', 'ec2.*'],
        Resource: 'someResourceString',
        Condition: {
          StringEquals: [{ 's3:prefix': 'myPrefix' }, { 's3:versionid': 'someVersionId' }],
          IpAddress: { 'aws:SourceIp': '11.11.11.11' }
        }
      },
      {
        Sid: 'no containers - yes to dynamo',
        Effect: 'Deny',
        Action: ['ecs.*', 'ecr.*'],
        Resource: '*',
        NotAction: 'dynamo.*',
        NotResource: ['dynamo:west*', 'dynamo:east*']
      }
    ]

    const e = {
      PolicyName: name,
      PolicyDocument: {
        Version: '2012-10-17',
        Id: name,
        Statement
      }
    }

    expect(a).toHaveProperty('name')
    expect(a.Type).toEqual('AWS::IAM::Policy')
    expect(a.Properties).toEqual(e)
  })
  test('Test Using helper', () => {
    const stmt = IamStatement
    const act = actions()
    const c1 = c.s3.prefix.equals('someprefix')
    const c2 = c.s3.versionid.equals('versionString')
    const a = new IamPolicy().statements(
      new stmt()
        .id('myId')
        .allows()
        .actions(act.s3.ALL)
        .resources('*')
        .when(c1, c2),
      new stmt()
        .id('second')
        .denies()
        .actions('*')
        .resources('*')
    )
    const e = [
      {
        Sid: 'myId',
        Effect: 'Allow',
        Action: 's3.*',
        Resource: '*',
        Condition: {
          StringEquals: [{ 's3:prefix': 'someprefix' }, { 's3:versionid': 'versionString' }]
        }
      },
      {
        Sid: 'second',
        Effect: 'Deny',
        Action: '*',
        Resource: '*'
      }
    ]

    expect(a).toHaveProperty('name')
    expect(a.Type).toEqual('AWS::IAM::Policy')
    expect(a.Properties.PolicyDocument.Statement).toEqual(e)
  })
})

// Note: should the module attempt to incorporate some of the limits?
// @see: <https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-limits.html>
// @ref: <https://policysim.aws.amazon.com/> perhaps that can be used to verify? available in the `AWS-JS-SDK`
//
