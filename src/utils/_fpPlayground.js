const fList = [
  (v, i) => {
    console.log({ v1: v, i })
    return v + 5 + i
  },
  v => {
    console.log({ v2: v })
    return v + 10
  },
  v => {
    console.log({ v3: v })
    return v / 5
  }
]

// const flowRight = (...functions) => functions.reduce((a, c) => (...args) => a(c(...args)))
const flow = (...functions) => functions.reduceRight((a, c) => (...args) => a(c(...args)))

// const fR = flowRight(...fList)
const f = flow(...fList)

// console.log([20, 30, 40].map((v, i, a) => fR(v, i, a)))
console.log([1, 2, 3, 4].map((v, i, a) => f(v, i, a)))
