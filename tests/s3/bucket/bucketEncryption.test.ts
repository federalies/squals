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
      { algo: 'aws:kms', keyID: '1234567890' },
      { algo: 'AES256', keyID: '0987654321' }
    ])

    const expected: any = {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: 'aws:kms',
              KMSMasterKeyID: '1234567890'
            }
          },
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: 'AES256',
              KMSMasterKeyID: '0987654321'
            }
          }
        ]
      }
    }
    expect(myBucketEnc).toEqual(expected)
  })
  test.skip('with invald algo', () => {})
  test.skip('check to make sure if you use AES256, you must use the keyID', () => {})
  // test.skip('', () => {})
})
