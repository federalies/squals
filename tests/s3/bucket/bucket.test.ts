// @ts-nocheck

/**
 * Things to test:
 * 1. Bad Input on `AccessControl` <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html#cfn-s3-bucket-accesscontrol>
 *  1.1 Bad type
 *  1.2 Wrong String
 * 2.
 *
 */

import { S3Bucket } from '../../../src/components/s3/bucket'

describe('defaults', () => {
  test('Unamed All Default Bucket', () => {
    expect(new S3Bucket()).toHaveProperty('Type', 'AWS::S3::Bucket')
  })

  test('Named Default Bucket', () => {
    const s = new S3Bucket({ name: 'IhaveAName' })
    const expected: any = { Type: 'AWS::S3::Bucket', name: 'IhaveAName', Properties: {} }
    expect(s.clean()).toEqual(expected)
  })

  test('Default Website Configuration', () => {
    const actual = new S3Bucket({ name: 'ItsMyName' }).website()
    const expected: any = {
      name: 'ItsMyName',
      Type: 'AWS::S3::Bucket',
      Properties: {
        AccessControl: 'PublicRead',
        WebsiteConfiguration: {
          IndexDocument: 'index.html',
          ErrorDocument: 'search.html'
        }
      }
    }
    expect(actual.clean()).toEqual(expected)
  })

  test('CFM Ref', () => {
    // ordered param is terrible... fix this mess.
    const actual = new S3Bucket({ name: 'MyBucket' })
    expect(actual.Ref()).toEqual({ Ref: 'MyBucket' })
  })

  test('CFM GetAtt:Arn', () => {
    const actual = new S3Bucket({ name: 'MyBucket' })
    expect(actual.Arn()).toEqual({ 'Fn::GetAtt': ['MyBucket', 'Arn'] })
  })

  test('CFM GetAtt:DomainName', () => {
    const actual = new S3Bucket({ name: 'MyBucket' })
    expect(actual.DomainName()).toEqual({ 'Fn::GetAtt': ['MyBucket', 'DomainName'] })
  })

  test('CFM GetAtt:RegionalDomainName', () => {
    const actual = new S3Bucket({ name: 'MyBucket' })
    expect(actual.RegionalDomainName()).toEqual({
      'Fn::GetAtt': ['MyBucket', 'RegionalDomainName']
    })
  })

  test('CFM GetAtt:WebsiteURL', () => {
    const actual = new S3Bucket({ name: 'MyBucket' })
    expect(actual.WebsiteURL()).toEqual({ 'Fn::GetAtt': ['MyBucket', 'WebsiteURL'] })
  })

  test.skip('Bucket Based on Other Bucket', () => {})
  test.skip('Make a Bucket Cfg from 1 Other Bucket', () => {})
  test.skip('Make a Bucket Cfg from 1 Other Bucket', () => {})
  test.skip('Bucket from AWS sdk', () => {})
})
describe.skip('validations', () => {})
