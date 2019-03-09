/**
 * Things to test:
 * 1. Bad Input on `AccessControl` <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html#cfn-s3-bucket-accesscontrol>
 *  1.1 Bad type
 *  1.2 Wrong String
 * 2.
 *
 */

import { S3Bucket } from '../../../src/components/s3'
import { merge } from 'lodash-es'

describe('defaults', () => {
  test('Unamed Bucket', () => {
    expect(new S3Bucket()).toHaveProperty('Type', 'AWS::S3::Bucket')
  })

  test('Named Bucket', () => {
    expect(new S3Bucket(undefined, 'IhaveAName')).toEqual({
      IhaveAName: { Type: 'AWS::S3::Bucket' }
    })
  })

  test.skip('Make Bucket from Other Bucket', () => {
    const b1 = new S3Bucket()
    const b2 = new S3Bucket()

    const merge = (...a: S3Bucket[]) => {
      // in: list of Type:T \\ out 1 typeT
      /**
       * the last one in the list wins
       * just like in a destructure [...a, ....b, ...c]
       */
      return a.pop()
    }
    //
    //
    const b3 = new S3Bucket(merge(b1, b2), 'newName')
    //
    // add more constraints here....
    expect(b3).toHaveProperty('Type', 'AWS::S3::Bucket')
  })
})
