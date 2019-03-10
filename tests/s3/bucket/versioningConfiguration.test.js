// @ts-nocheck
/**
 * Things to test:
 * 1.
 * 2.
 */

describe.skip('defaults', () => {
  const Import = require('esm')(module)
  const { websiteConfig } = Import('../../../src/components/s3/bucket')
  const sum = (a, b) => a + b

  test.skip('1+2=3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
