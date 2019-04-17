// @ts-nocheck

import { cutomErrorRespConfig } from '../../../src/components/cloudFront/distribution/customErrorResp'

describe('CustomError', () => {
  test('defaults', () => {
    const actual = cutomErrorRespConfig({})
    const expected = {
      CustomErrorResponses: [
        { ErrorCode: 400, ResponsePagePath: '*' },
        { ErrorCode: 500, ResponsePagePath: '*' }
      ]
    }
    expect(actual).toEqual(expected)
  })

  test.skip('invalid Error Code', () => {
    // does not throw an error
    // it SHOULD throw an error
    const errConfig: object = { 600: { asdasd: true } }
    const actual = cutomErrorRespConfig(errConfig)
    const expected = {}
    expect(actual).toEqual(expected)
  })
})
