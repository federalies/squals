// @ts-nocheck

import { replicationConfig } from '../../../src/components/s3/bucket'

describe('Defaults', () => {
  test('exmaple from jsdocs', () => {
    const a = replicationConfig({
      iamARN: 'arn:aws:iam::someIAMValue',
      rules: [{ dest: { bucket: 'somebucket' } }]
    })
    const e: any = {
      ReplicationConfiguration: {
        Role: 'arn:aws:iam::someIAMValue',
        Rules: [
          {
            Prefix: '',
            Status: 'Enabled',
            Destination: {
              Bucket: 'somebucket'
            }
          }
        ]
      }
    }
    expect(a).toEqual(e)
  })

  // @todo !research to determine if replicateEncData=true and
  // kmsId are correlated or not...
  // perhaps kmsID should default replicateEncData to true??
  // needs more research
  test('Replicate Encrypted Data', () => {
    const a = replicationConfig({
      iamARN: 'arn:aws:iam::someIAMValue',
      rules: { replicateEncData: true, dest: { bucket: 'somebucket', kmsId: 'SomeSecretKeyID' } }
    })
    const e: any = {
      ReplicationConfiguration: {
        Role: 'arn:aws:iam::someIAMValue',
        Rules: [
          {
            Prefix: '',
            Status: 'Enabled',
            Destination: {
              Bucket: 'somebucket',
              EncryptionConfiguration: {
                ReplicaKmsKeyID: 'SomeSecretKeyID'
              }
            },
            SourceSelectionCriteria: {
              SseKmsEncryptedObjects: {
                Status: 'Enabled'
              }
            }
          }
        ]
      }
    }
    expect(a).toEqual(e)
  })

  test('Replicate to Another Acct w/ lower storage class', () => {
    const a = replicationConfig({
      iamARN: 'arn:aws:iam::someIAMValue',
      rules: {
        dest: { account: 'SomeOtherAcct', bucket: 'someOtherBucket', storageClass: 'STANDARD_IA' }
      }
    })
    const e: any = {
      ReplicationConfiguration: {
        Role: 'arn:aws:iam::someIAMValue',
        Rules: [
          {
            Prefix: '',
            Status: 'Enabled',
            Destination: {
              Bucket: 'someOtherBucket',
              Account: 'SomeOtherAcct',
              StorageClass: 'STANDARD_IA',
              AccessControlTranslation: {
                Owner: 'Destination'
              }
            }
          }
        ]
      }
    }
    expect(a).toEqual(e)
  })

  test('turn status off', () => {
    const a = replicationConfig({
      iamARN: 'arn:aws:iam::someIAMValue',
      rules: [
        {
          id: 'replicationId1',
          prefix: 'archives/',
          status: false,
          replicateEncData: false,
          dest: { bucket: 'somebucket' }
        }
      ]
    })
    const e: any = {
      ReplicationConfiguration: {
        Role: 'arn:aws:iam::someIAMValue',
        Rules: [
          {
            Id: 'replicationId1',
            Prefix: 'archives/',
            Status: 'Disabled',
            Destination: {
              Bucket: 'somebucket'
            },
            SourceSelectionCriteria: {
              SseKmsEncryptedObjects: {
                Status: 'Disabled'
              }
            }
          }
        ]
      }
    }
    expect(a).toEqual(e)
  })

  test('Bad Storage Class throws error', () => {
    const a = () =>
      replicationConfig({
        iamARN: 'arn:aws:iam::someIAMValue',
        rules: [{ dest: { bucket: 'somebucket', storageClass: 'SUPER_CHEAP_STORAGE' } }]
      })
    expect(a).toThrow()
  })

  test(`if you can get the ƒ.rulesItem to run, it's default throws an error`, () => {
    // @todo !research perhaps this is valid to have an empty RULE:[] in the output
    // catch this via the JSON schema | AWS network call
    const input: any = {
      iamARN: 'arn:aws:iam::someIAMValue',
      rules: [undefined]
    }
    const a = () => replicationConfig(input)
    expect(a).toThrow()
  })

  test('empty rules throws error', () => {
    const iamARN = 'arn:aws:iam::someIAMValue'
    const destBucket = 'someBucket'
    const a = replicationConfig({ iamARN, destBucket })
    const e = {
      ReplicationConfiguration: {
        Role: iamARN,
        Rules: [
          {
            Prefix: '',
            Id: 'Squals_DefaultRule_ReplicateAll',
            Status: 'Enabled',
            Destination: {
              Bucket: destBucket
            },
            SourceSelectionCriteria: {
              SseKmsEncryptedObjects: {
                Status: 'Enabled'
              }
            }
          }
        ]
      }
    }
    expect(a).toEqual(e)
  })

  test('empty rules throws error', () => {
    // @todo !research perhaps this is valid to have an empty RULE:[] in the output
    // catch this via the JSON schema | AWS network call
    const input: any = { iamARN: 'arn:aws:iam::someIAMValue' }
    const a = () => replicationConfig(input)
    expect(a).toThrow()
  })

  test('empty rules throws error', () => {
    const input: any = { destBucket: 'someBucket' }
    const a = () => replicationConfig(input)
    expect(a).toThrow()
  })

  // test.skip('Example D', () => {
  //   const a = {}
  //   const e = {}
  //   expect(a).toEqual(e)
  // })
})

// describe.skip('Validations', () => {
//   test.skip('1+2=3', () => {
//     expect(1 + 2).toBe(3)
//   })
// })
