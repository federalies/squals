import { resourceArn } from '../../src/components/iam/statement/resources'

describe('resrouce ARN string builder', () => {
  // https://github.com/sandfox/aws-arn-parser/blob/master/test/data/to-string.json
  test('RDS Exmaple ', () => {
    const a = resourceArn({
      svc: 'rds',
      region: 'eu-west-1',
      acct: '123456789012',
      resource: 'db:mysql-db'
    })
    expect(a).toEqual('arn:aws:rds:eu-west-1:123456789012:db:mysql-db')
  })
  test('EB Exmaple ', () => {
    const a = resourceArn({
      svc: 'elasticbeanstalk',
      region: 'us-east-1',
      acct: '123456789012',
      resource: 'environment/My App/MyEnvironment'
    })
    expect(a).toEqual(
      'arn:aws:elasticbeanstalk:us-east-1:123456789012:environment/My App/MyEnvironment'
    )
  })
  test('IAM Exmaple ', () => {
    const a = resourceArn({
      svc: 'iam',
      acct: 123456789012,
      resource: 'user/David'
    })
    expect(a).toEqual('arn:aws:iam::123456789012:user/David')
  })
  test('S3 Exmaple ', () => {
    const a = resourceArn({
      svc: 's3',
      resource: 'my_corporate_bucket/exampleobject.png'
    })
    expect(a).toEqual('arn:aws:s3:::my_corporate_bucket/exampleobject.png')
  })
  test('Give it all away now', () => {
    const a = resourceArn({ svc: 's3' })
    expect(a).toEqual('arn:aws:s3:::*')
  })
})
