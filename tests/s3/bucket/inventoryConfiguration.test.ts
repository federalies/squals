// @ts-nocheck
/**
 * Things to test:
 * 1.
 * 2.
 */

describe.skip('defaults', () => {
  const Import = require('esm')(module)
  const { inventoryConfig } = Import('../../../src/components/s3/bucket')
  const a = inventoryConfig([])

  test.skip('1+2=3', () => {
    expect(1 + 2).toBe(3)
  })
})
