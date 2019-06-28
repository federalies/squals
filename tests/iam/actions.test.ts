import { actions } from '../../src/components/iam/statement/actions'

describe('IAM Statement Conditions', () => {
  test('Start with S3 ', () => {
    const a = actions().s3.abortMultiPartUpload
    const e = 's3:AbortMultipartUpload'
    expect(a).toEqual(e)
  })
})
