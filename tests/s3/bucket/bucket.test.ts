/**
 * Things to test:
 * 1. Bad Input on `AccessControl` <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html#cfn-s3-bucket-accesscontrol>
 *  1.1 Bad type
 *  1.2 Wrong String
 * 2.
 *
 */

import { S3Bucket } from '../../../src/components/s3'

describe('defaults', () => {
  test('1+2=3', () => {
    expect(new S3Bucket(undefined, 'IhaveAName')).toEqual({ IhaveAName: { Type: 'AWS:S3' } })
  })
})
