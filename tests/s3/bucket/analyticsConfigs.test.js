// @ts-nocheck
// until I figure out how to make typescript happy with JEST tests

describe.skip('defaults', () => {
  const sum = (a, b) => a + b

  test.skip('1+2=3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
