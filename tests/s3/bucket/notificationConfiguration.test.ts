// @ts-nocheck

import { notifConfig } from '../../../src/components/s3/bucket'

describe('defaults', () => {
  // @todo: should correlate to the example in the JSDOc
  test('As Empty As Reasonable: lambda', () => {
    const a = notifConfig({
      arn: 'arn:aws:lambda::123456789012:resourceA/division_abc',
      event: 's3:ObjectCreated:*',
      filterList: ['Yosem*', '*.jpg']
    })
    const e = {
      NotificationConfiguration: {
        LambdaConfigurations: [
          {
            Function: 'arn:aws:lambda::123456789012:resourceA/division_abc',
            Event: 's3:ObjectCreated:*',
            Filter: {
              S3Key: {
                Rules: [
                  {
                    Name: 'prefix',
                    Value: 'Yosem'
                  },
                  {
                    Name: 'suffix',
                    Value: '.jpg'
                  }
                ]
              }
            }
          }
        ]
      }
    }
    expect(a).toEqual(e)
  })

  test('A comprehensive list tends to be pretty long', () => {
    const a = notifConfig([
      {
        arn: 'arn:aws:lambda::123456789012:resourceA/division_abc',
        event: 's3:ObjectCreated:*',
        filterList: '*.jpg'
      },
      {
        arn: 'arn:aws:sqs::123456789012:resourceA/division_abc',
        event: 's3:ObjectRemoved:Delete',
        filterList: 'Yosem*'
      },
      {
        arn: 'arn:aws:sns::123456789012:resourceA/division_abc',
        event: 's3:ObjectCreated:Post',
        filterList: ['Yosem*', '*.jpg']
      }
    ])
    const e: any = {
      NotificationConfiguration: {
        LambdaConfigurations: [
          {
            Function: 'arn:aws:lambda::123456789012:resourceA/division_abc',
            Event: 's3:ObjectCreated:*',
            Filter: {
              S3Key: {
                Rules: [
                  {
                    Name: 'suffix',
                    Value: '.jpg'
                  }
                ]
              }
            }
          }
        ],
        QueueConfigurations: [
          {
            Queue: 'arn:aws:sqs::123456789012:resourceA/division_abc',
            Event: 's3:ObjectRemoved:Delete',
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
        ],
        TopicConfigurations: [
          {
            Topic: 'arn:aws:sns::123456789012:resourceA/division_abc',
            Event: 's3:ObjectCreated:Post',
            Filter: {
              S3Key: {
                Rules: [
                  {
                    Name: 'prefix',
                    Value: 'Yosem'
                  },
                  {
                    Name: 'suffix',
                    Value: '.jpg'
                  }
                ]
              }
            }
          }
        ]
      }
    }
    expect(a).toEqual(e)
  })

  test('Simple SNS Example', () => {
    const a = notifConfig({
      arn: 'arn:aws:sns::123456789012:resourceA/division_abc/subdivision_xyz/ProdServerCert',
      event: 's3:ObjectCreated:*',
      filterList: ['Yosem*', '*.jpg']
    })
    const e = {
      NotificationConfiguration: {
        TopicConfigurations: [
          {
            Topic:
              'arn:aws:sns::123456789012:resourceA/division_abc/subdivision_xyz/ProdServerCert',
            Event: 's3:ObjectCreated:*',
            Filter: {
              S3Key: {
                Rules: [
                  {
                    Name: 'prefix',
                    Value: 'Yosem'
                  },
                  {
                    Name: 'suffix',
                    Value: '.jpg'
                  }
                ]
              }
            }
          }
        ]
      }
    }
    expect(a).toEqual(e)
  })

  test('simple SQS example', () => {
    const a = notifConfig({
      arn: 'arn:aws:sqs::123456789012:resourceA/division_abc/subdivision_xyz/ProdServerCert',
      event: 's3:ObjectCreated:*',
      filterList: ['Yosem*', '*.jpg']
    })
    const e = {
      NotificationConfiguration: {
        QueueConfigurations: [
          {
            Queue:
              'arn:aws:sqs::123456789012:resourceA/division_abc/subdivision_xyz/ProdServerCert',
            Event: 's3:ObjectCreated:*',
            Filter: {
              S3Key: {
                Rules: [
                  {
                    Name: 'prefix',
                    Value: 'Yosem'
                  },
                  {
                    Name: 'suffix',
                    Value: '.jpg'
                  }
                ]
              }
            }
          }
        ]
      }
    }
    expect(a).toEqual(e)
  })

  test('All FilterList Items MUST have a *wildcard', () => {
    const a = () =>
      notifConfig({
        arn: 'arn:aws:lambda::123456789012:resourceA/division_abc/subdivision_xyz/ProdServerCert',
        event: 's3:ObjectCreated:*',
        filterList: 'Yosem'
      })
    expect(a).toThrow()
  })

  test('notifications can trigger sqs|sns|lambda services - anythin else throws errors', () => {
    const a = () =>
      notifConfig({
        arn: 'arn:aws:ec2::123456789012:resourceA/division_abc/subdivision_xyz/ProdServerCert',
        event: 's3:ObjectCreated:*',
        filterList: 'Yosem*'
      })
    // should throw an "invalid notification event type"
    expect(a).toThrow()
  })

  test('Invalid S3 event types throw errors', () => {
    const a = () =>
      notifConfig({
        arn: 'arn:aws:sqs::123456789012:resourceA/division_abc/subdivision_xyz/ProdServerCert',
        event: 's3---SomeOtherEvent',
        filterList: 'Yosem*'
      })
    expect(a).toThrow()
  })

  // @idea - allow an array of Events? -
  // let the transform perform the cross product? would you want to then exclude some?
  // something like : ` M X N minus the ExclusionSet`
  //
  // @todo - this posses a pretty serious problem since the input allows/encourages
  // interlaced types and then separates via ARN processing
  test.skip('pass in a CFM ƒ.ARN ref', () => {})
})
