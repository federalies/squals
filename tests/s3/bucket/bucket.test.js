// @ts-nocheck
/**
 * Things to test:
 * 1. Bad Input on `AccessControl` <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html#cfn-s3-bucket-accesscontrol>
 *  1.1 Bad type
 *  1.2 Wrong String
 * 2.
 *
 */

describe('defaults', () => {
  const Import = require('esm')(module)
  const { S3Bucket } = Import('../../../src/components/s3/')
  // import { merge } from 'lodash-es'

  test('Unamed All Default Bucket', () => {
    expect(new S3Bucket()).toHaveProperty('Type', 'AWS::S3::Bucket')
  })

  test('Named Default Bucket', () => {
    expect(new S3Bucket(undefined, 'IhaveAName')).toEqual({
      IhaveAName: { Type: 'AWS::S3::Bucket' }
    })
  })

  test.skip('Bucket Based on Other Bucket', () => {})

  test.skip('Make Bucket from Other Bucket', () => {
    const b1 = new S3Bucket()
    const b2 = new S3Bucket()

    const merge = (...a) => {
      return a.pop()
    }
    //
    //
    const b3 = new S3Bucket(merge(b1, b2), 'newName')
    //
    // add more constraints here....
    expect(b3).toHaveProperty('Type', 'AWS::S3::Bucket')
  })
  test.skip('Bucket from AWS sdk', () => {})
})
