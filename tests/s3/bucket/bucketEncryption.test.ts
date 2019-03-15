// @ts-nocheck

import { encryptionConfig } from '../../../src/components/s3'

describe('happy path for bucketEncryption', () => {
  test('default encryption rules', () => {
    const myBucketEnc = encryptionConfig()

    const expected: any = {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: 'aws:kms'
            }
          }
        ]
      }
    }
    expect(myBucketEnc).toEqual(expected)
  })
  test('with object passed in', () => {
    const myBucketEnc = encryptionConfig({ algo: 'aws:kms' })

    const expected: any = {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: 'aws:kms'
            }
          }
        ]
      }
    }
    expect(myBucketEnc).toEqual(expected)
  })
  test('with list passed in', () => {
    const myBucketEnc = encryptionConfig([
      { algo: 'aws:kms', keyID: 'arn:aws:kms:us-east-1:1234/5678example' },
      { algo: 'AES256' }
    ])

    const expected: any = {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: 'aws:kms',
              KMSMasterKeyID: 'arn:aws:kms:us-east-1:1234/5678example'
            }
          },
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: 'AES256'
            }
          }
        ]
      }
    }
    expect(myBucketEnc).toEqual(expected)
  })
  test('with invald algo', () => {
    const actual = () => encryptionConfig({ algo: 'SomeBadAlgo' })
    expect(actual).toThrow()
  })

  test('check to make sure if you use AES256, you must use the keyID', () => {
    const a = () =>
      encryptionConfig({ algo: 'AES256', keyID: 'arn:aws:kms:us-east-1:1234/5678example' })
    expect(a).toThrow()
  })
  // test.skip('', () => {})
})
