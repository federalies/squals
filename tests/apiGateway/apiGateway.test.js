// @ts-nocheck
// import require source files

describe.skip('defaults', () => {
  const sum = (a, b) => a + b

  test.skip('1+2=3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})

describe.skip('validations', () => {
  const sum = (a, b) => a + b
  test.skip('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})

describe.skip('sanitations', () => {
  const sum = (a, b) => a + b
  test.skip('add 1 + 2 = 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})

describe.skip('functionality', () => {
  const sum = (a, b) => a + b
  test.skip('add 1 + 2 = 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
