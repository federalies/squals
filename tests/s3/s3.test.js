/* uses jest as the test runner */

// const ow = require('ow')
// const esmImporter = require('esm')(module)
// import const { cfnS3, S3Bucket, S3BucketPolicy } = esmImporter('../src/s3.js')
// import { S3Bucket, S3BucketPolicy } from '../src/s3.js'

/**
 * is test priority a good thing?
 */

const sum = (a, b) => a + b

describe.skip('defaults', () => {
  test('s3 all defaults', () => {
    console.log(S3BucketPolicy)
    expect(new S3Bucket()).toEqual({ Type: 'AWS::S3::Bucket' })
  })
})

describe.skip('excercise validations', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})

describe.skip('sanitations', () => {
  test.skip('add 1 + 2 = 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})

describe.skip('functionality', () => {
  test('unit/self validate defaults', () => {
    expect(new S3Bucket().validate().passes).toBe(true)
  })
  test('validate defaults', () => {
    expect(new S3Bucket({ BucketName: 'Heya_There' }).validate().passes).toBe(
      true
    )
  })
  test('validate Bad Bucketname param', () => {
    expect(new S3Bucket({ Bucketname: 'Heya_There' }).validate().passes).toBe(
      false
    )
  })
})
