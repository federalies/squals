// import require source files

const sum = (a, b) => a + b

describe.skip('defaults', () => {
  test.skip('1+2=3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})

describe.skip('validations', () => {
  test.skip('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})

describe.skip('sanitations', () => {
  test.skip('add 1 + 2 = 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})

describe.skip('functionality', () => {
  test.skip('add 1 + 2 = 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
