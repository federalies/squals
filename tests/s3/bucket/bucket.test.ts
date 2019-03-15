// @ts-nocheck

import { S3 } from '../../../src/components/s3'

describe('defaults', () => {
  test('Unamed All Default Bucket', () => {
    expect(new S3.Bucket()).toHaveProperty('Type', 'AWS::S3::Bucket')
  })

  test('Named Default Bucket', () => {
    const s = new S3.Bucket({ name: 'IhaveAName' })
    const expected: any = { Type: 'AWS::S3::Bucket', name: 'IhaveAName', Properties: {} }
    expect(s.clean()).toEqual(expected)
  })

  test('CFM Ref', () => {
    // ordered param is terrible... fix this mess.
    const actual = new S3.Bucket({ name: 'MyBucket' })
    expect(actual.Ref()).toEqual({ Ref: 'MyBucket' })
  })

  test('CFM GetAtt:Arn', () => {
    const actual = new S3.Bucket({ name: 'MyBucket' })
    expect(actual.Arn()).toEqual({ 'Fn::GetAtt': ['MyBucket', 'Arn'] })
  })

  test('CFM GetAtt:DomainName', () => {
    const actual = new S3.Bucket({ name: 'MyBucket' })
    expect(actual.DomainName()).toEqual({ 'Fn::GetAtt': ['MyBucket', 'DomainName'] })
  })

  test('CFM GetAtt:RegionalDomainName', () => {
    const actual = new S3.Bucket({ name: 'MyBucket' })
    expect(actual.RegionalDomainName()).toEqual({
      'Fn::GetAtt': ['MyBucket', 'RegionalDomainName']
    })
  })

  test('CFM GetAtt:WebsiteURL', () => {
    const actual = new S3.Bucket({ name: 'MyBucket' })
    expect(actual.WebsiteURL()).toEqual({ 'Fn::GetAtt': ['MyBucket', 'WebsiteURL'] })
  })

  test('toJSON on simple S3.Bucket', () => {
    const a = new S3.Bucket({ name: 'myBucket' })
    const e = `{"myBucket":{"Type":"AWS::S3::Bucket"}}`
    expect(JSON.stringify(a)).toEqual(e)
  })

  test('clearOut ', () => {
    // make a bucket, alter the bucket state via a mutator
    // but then clear out the mutation
    const a1 = new S3.Bucket({ name: 'WebsiteBucket' })
      .website()
      .clearOut('WebsiteConfiguration')
      .clearOut('AccessControl')
    const e1 = new S3.Bucket({ name: 'WebsiteBucket' })

    const a2 = new S3.Bucket({ name: 'WebsiteBucket2' })
      .logging()
      .website()
      .clearOut('LoggingConfiguration')
    const e2 = new S3.Bucket({ name: 'WebsiteBucket2' }).website()

    expect(a1).toEqual(e1)
    expect(a2).toEqual(e2)
  })

  // @todo double check for better words - other than mutator
  test('accelerate mutator', () => {
    const name = 'coolS3.Bucket'
    const a = new S3.Bucket({ name }).accelerate()
    const e = {
      name,
      Type: 'AWS::S3::Bucket',
      Properties: {
        AccelerateConfiguration: {
          AccelerationStatus: 'Enabled'
        }
      }
    }
    expect(a).toEqual(e)
  })

  test('analytics mutator', () => {
    const name = 'coolS3.Bucket'
    const a = new S3.Bucket({ name }).analytics({ id: 'analyzeItAll' })
    const e = {
      name,
      Type: 'AWS::S3::Bucket',
      Properties: {
        AnalyticsConfigurations: [
          {
            Id: 'analyzeItAll',
            Prefix: '',
            StorageClassAnalysis: {}
          }
        ]
      }
    }
    expect(a).toEqual(e)
  })

  test('encryption mutator', () => {
    const name = 'coolS3.Bucket'
    const actual = new S3.Bucket({ name }).encryption()
    const expected = {
      Type: 'AWS::S3::Bucket',
      name,
      Properties: {
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
    }

    expect(actual).toEqual(expected)
  })

  test('cors mutator', () => {
    const name = 'coolS3.Bucket'
    const actual = new S3.Bucket({ name }).cors({ _: { 'GET|PUT|POST': ['localhost'] } })
    const expected = {
      Type: 'AWS::S3::Bucket',
      name,
      Properties: {
        CorsConfiguration: {
          CorsRules: [
            {
              AllowedMethods: ['GET', 'PUT', 'POST'],
              AllowedOrigins: ['localhost']
            }
          ]
        }
      }
    }
    expect(actual).toEqual(expected)
  })

  test('inventory mutator', () => {
    const name = 'coolS3.Bucket'
    const actual = new S3.Bucket({ name }).inventory({
      id: 'InvRuleID.1',
      dest: { arn: 'arn:s3:bucketName' }
    })
    const expected = {
      Type: 'AWS::S3::Bucket',
      name,
      Properties: {
        InventoryConfigurations: [
          {
            Destination: {
              BucketArn: 'arn:s3:bucketName',
              Format: 'CSV'
            },
            Enabled: true,
            Id: 'InvRuleID.1',
            IncludedObjectVersions: 'All',
            ScheduleFrequency: 'Weekly'
          }
        ]
      }
    }
    expect(actual).toEqual(expected)
  })

  test('lifecycle mutator', () => {
    const name = 'coolS3.Bucket'
    const actual = new S3.Bucket({ name }).lifecycle({ expiryDays: 42 })
    const expected = {
      Type: 'AWS::S3::Bucket',
      name,
      Properties: {
        LifecycleConfiguration: {
          Rules: [
            {
              ExpirationInDays: 42,
              Status: 'Enabled'
            }
          ]
        }
      }
    }
    expect(actual).toEqual(expected)
  })

  test('logging mutator', () => {
    const name = 'coolS3.Bucket'
    const actual = new S3.Bucket({ name }).logging()
    const expected = {
      Type: 'AWS::S3::Bucket',
      name,
      Properties: {
        LoggingConfiguration: {}
      }
    }
    expect(actual).toEqual(expected)
  })

  test('metrics mutator', () => {
    const name = 'coolS3.Bucket'
    const actual = new S3.Bucket({ name }).metrics({ id: 'metricsRuleID' })
    const expected = {
      Type: 'AWS::S3::Bucket',
      name,
      Properties: {
        MetricsConfigurations: [
          {
            Id: 'metricsRuleID'
          }
        ]
      }
    }
    expect(actual).toEqual(expected)
  })

  test('publicAccess mutator', () => {
    const name = 'coolS3.Bucket'
    const actual = new S3.Bucket({ name }).publicAccess()
    const expected = {
      Type: 'AWS::S3::Bucket',
      name,
      Properties: {
        PublicAccessBlockConfiguration: {}
      }
    }
    expect(actual).toEqual(expected)
  })

  test('notifications mutator', () => {
    const name = 'coolS3.Bucket'
    const actual = new S3.Bucket({ name }).notifications({
      filterList: 'Yosem*',
      arn: 'arn:aws:lambda::123456789012:resA/div_abc',
      event: 's3:ObjectCreated:*'
    })
    const expected = {
      Type: 'AWS::S3::Bucket',
      name,
      Properties: {
        NotificationConfiguration: {
          LambdaConfigurations: [
            {
              Event: 's3:ObjectCreated:*',
              Function: 'arn:aws:lambda::123456789012:resA/div_abc',
              Filter: {
                S3Key: {
                  Rules: [
                    {
                      Name: 'prefix',
                      Value: 'Yosem'
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
    expect(actual).toEqual(expected)
  })

  test('replication mutator', () => {
    const name = 'coolS3.Bucket'
    const actual = new S3.Bucket({ name }).replication({
      iamARN: 'thisIsMyArn',
      rules: {
        replicateEncData: true,
        dest: { kmsId: 'myKeyID', bucket: 'BucketToCatchReplicatedData' }
      }
    })
    const expected = {
      Type: 'AWS::S3::Bucket',
      name,
      Properties: {
        ReplicationConfiguration: {
          Role: 'thisIsMyArn',
          Rules: [
            {
              Destination: {
                Bucket: 'BucketToCatchReplicatedData',
                EncryptionConfiguration: {
                  ReplicaKmsKeyID: 'myKeyID'
                }
              },
              Prefix: '',
              Status: 'Enabled',
              SourceSelectionCriteria: {
                SseKmsEncryptedObjects: {
                  Status: 'Enabled'
                }
              }
            }
          ]
        }
      }
    }
    expect(actual).toEqual(expected)
  })

  test('versions mutator', () => {
    const name = 'coolS3.Bucket'
    const actual = new S3.Bucket({ name }).versions()
    const expected = {
      Type: 'AWS::S3::Bucket',
      name,
      Properties: {
        VersioningConfiguration: {
          Status: 'Enabled'
        }
      }
    }
    expect(actual).toEqual(expected)
  })

  test('tags mutator', () => {
    const name = 'coolS3.Bucket'
    const actual = new S3.Bucket({ name }).tags({ my: 'tag' })
    const expected = {
      Type: 'AWS::S3::Bucket',
      name,
      Properties: {
        Tags: [{ Key: 'my', Value: 'tag' }]
      }
    }
    expect(actual).toEqual(expected)
  })

  test('default website mutator', () => {
    const name = 'ItsMyName'
    const actual = new S3.Bucket({ name }).website()
    const expected: any = {
      name,
      Type: 'AWS::S3::Bucket',
      Properties: {
        AccessControl: 'PublicRead',
        WebsiteConfiguration: {
          IndexDocument: 'index.html',
          ErrorDocument: 'search.html'
        }
      }
    }
    expect(actual).toEqual(expected)
  })

  test('website mutator', () => {
    const name = 'coolS3.Bucket'
    const actual = new S3.Bucket({ name }).website({ redir: 'https://federali.es' })
    const expected = {
      Type: 'AWS::S3::Bucket',
      name,
      Properties: {
        AccessControl: 'PublicRead',
        WebsiteConfiguration: {
          IndexDocument: 'index.html',
          ErrorDocument: 'search.html',
          RedirectAllRequestsTo: {
            Protocol: 'https',
            HostName: 'federali.es'
          }
        }
      }
    }
    expect(actual).toEqual(expected)
  })

  test.skip('Make a Bucket based on Other Bucket', () => {})
  test.skip('Make a Bucket from a list of Other Buckets', () => {})
  test.skip('Make a Bucket from an existing template resource snippet', () => {})
  test.skip('Make a List of Buckets from an existing template', () => {})
  test.skip('Bucket from AWS sdk object', () => {})
})
