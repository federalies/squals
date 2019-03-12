// @ts-nocheck

import { destination } from '../../../src/components/s3/bucket'

describe('defaults', () => {
  test('default destination with ARN', () => {
    const actual = destination({ arn: 'AWS::ARN::_____' })
    const expected: any = {
      Destination: {
        BucketArn: 'AWS::ARN::_____',
        Format: 'CSV'
      }
    }
    expect(actual).toEqual(expected)
  })

  test('default destination with ARN', () => {
    const actual = destination({ format: 'ORC', arn: 'AWS::ARN::_____' })
    const expected: any = {
      Destination: {
        BucketArn: 'AWS::ARN::_____',
        Format: 'ORC'
      }
    }
    expect(actual).toEqual(expected)
  })

  test('with optional params', () => {
    const actual = destination({
      prefix: 'PREFIX',
      acctId: 'ACCOUNTID',
      format: 'ORC',
      arn: 'AWS::ARN::_____'
    })
    const expected: any = {
      Destination: {
        BucketArn: 'AWS::ARN::_____',
        Format: 'ORC',
        Prefix: 'PREFIX',
        BucketAccountId: 'ACCOUNTID'
      }
    }
    expect(actual).toEqual(expected)
  })

  test('throw error on lack of ARN', () => {
    const actual = () => destination({ arn: '' })
    expect(actual).toThrow()
  })

  test('throw error on lack of ARN', () => {
    const actual = () => destination({ format: 'otherFormat', arn: 'aws:arn:name' })
    expect(actual).toThrow()
  })
})
