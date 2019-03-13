// @ts-nocheck

import { loggingConfg } from '../../../src/components/s3/bucket'

describe('defaults', () => {
  test('empty ƒ call', () => {
    const a = loggingConfg()
    const e: any = { LoggingConfiguration: {} }
    expect(a).toEqual(e)
  })

  test('with prefix', () => {
    const a = loggingConfg({ logPrefix: 'logs/' })
    const e: any = {
      LoggingConfiguration: {
        LogFilePrefix: 'logs/'
      }
    }
    expect(a).toEqual(e)
  })

  test('with bucketname', () => {
    const a = loggingConfg({ saveLogsToBucket: 'thisOtherBucket' })
    const e: any = {
      LoggingConfiguration: {
        DestinationBucketName: 'thisOtherBucket'
      }
    }
    expect(a).toEqual(e)
  })
})
