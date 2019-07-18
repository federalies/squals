import assert from 'deep-equal'

export const setIntersection = (a: any[], b: any[]) => {
  // count Up the Overlap
  let empty: any[] = []
  const objKeys = new Set(a)
  const probe = new Set(b)
  const overlap = new Set(empty)

  probe.forEach(v => {
    if (objKeys.has(v)) {
      overlap.add(v)
    }
  })
  return Array.from(overlap.keys())
}
export const verifyIntersection = (
  i: {},
  num: number,
  operator?: '==' | '!==' | '<' | '>' | '<=' | '>=',
  operatorFn?: (a: number, b: number) => boolean,
  ...keys: string[]
) => {
  let _operatorFn: (a: number, b: number) => boolean

  const elemLeft = setIntersection(Object.keys(i), keys)

  if (!operatorFn) {
    switch (operator) {
      case '==':
        _operatorFn = (a, b) => a === b
        break
      case '!==':
        _operatorFn = (a, b) => a !== b
        break
      case '<':
        _operatorFn = (a, b) => a < b
        break
      case '>':
        _operatorFn = (a, b) => a > b
        break
      case '<=':
        _operatorFn = (a, b) => a <= b
        break
      case '>=':
        _operatorFn = (a, b) => a >= b
        break
      default:
        _operatorFn = (a, b) => a === b
    }
  } else {
    _operatorFn = operatorFn
  }

  // Math.min becuause you might compose a HasTwoKeys()
  // but then not verify that the end-caller actuall passes
  // in two keys to check against
  if (!_operatorFn(elemLeft.length, Math.min(num, keys.length))) {
    throw new Error(
      `An object was supposed to have ${num} key(s) from the list ${keys}. But input:${i} has these problem keys:${elemLeft}`
    )
  }
  return i
}
// #region verify Key Sets
export const verifyAny = (...keys: string[]) => (input: {}) =>
  verifyIntersection(input, 1, '>=', undefined, ...keys)
export const verifyAll = (...keys: string[]) => (input: {}) =>
  verifyIntersection(input, keys.length, '==', undefined, ...keys)

export const verifyOnlyOne = (...keys: string[]) => (input: {}) =>
  verifyIntersection(input, 1, '==', undefined, ...keys)
export const verifyXor = (...keys: string[]) => (input: {}) =>
  verifyIntersection(input, 1, '==', undefined, ...keys) // alias
export const verifyHasTwo = (...keys: string[]) => (input: {}) =>
  verifyIntersection(input, 2, '==', undefined, ...keys) // alias

export const verifyHasAtLeastTwo = (...keys: string[]) => (input: {}) =>
  verifyIntersection(input, 2, '>=', undefined, ...keys) // alias
export const verifyHasAtLeastOne = (...keys: string[]) => (input: {}) =>
  verifyIntersection(input, 1, '>=', undefined, ...keys) // alias
export const verifyHasAtLeastN = (n: number, ...keys: string[]) => (input: {}) =>
  verifyIntersection(input, n, '>=', undefined, ...keys) // alias

export const verifyRequired = (
  i: {},
  fn: (intersectionKeyN: number, expectedN: number) => boolean,
  ...keys: string[]
) => verifyIntersection(i, keys.length, undefined, fn, ...keys) // alias
// #endregion

// #region verify conditionals
export const verifyIfThen = (
  _if: (i: {}) => boolean,
  _then: (i: {}) => void,
  _else?: (i: {}) => void
) => (input: {}) => {
  if (_if(input)) {
    _then(input)
  } else {
    if (_else) _else(input)
  }
  return input
}

export const getPath = (keyPath: string, dataToCheck: any, delim = '.'): any | undefined => {
  let temp = dataToCheck
  if (keyPath.includes(delim)) {
    keyPath.split(delim).forEach(key => {
      if (Object.keys(temp).length > 0 && key in temp) {
        temp = temp[key]
      } else {
        temp = undefined
      }
    })
  } else {
    return dataToCheck[keyPath]
  }
  return temp
}
export const ifHas = (keyPath: string, delim = '.') => (i: any): boolean => {
  return !!(getPath(keyPath, i, delim) && true)
}
export const ifPathEq = (keyPath: string, expected: any, delim = '.') => (i: any): boolean => {
  return assert(getPath(keyPath, i, delim), expected)
}

export const has = (keyPath: string, delim = '.') => (i: any): void => {
  if (!getPath(keyPath, i, delim)) {
    throw new Error(
      `based on the prior condition, "${keyPath}" is expected in ${JSON.stringify(i, null, 2)}`
    )
  }
}
export const pathEq = (keyPath: string, expected: any, delim = '.') => (i: any): void => {
  if (!assert(getPath(keyPath, i, delim), expected)) {
    throw new Error(
      `based on the prior condition, parth::"${keyPath}" was expected to equal ${JSON.stringify(
        expected,
        null,
        2
      )} - but instead there was: ${JSON.stringify(getPath(keyPath, i, delim), null, 2)}`
    )
  }
}

// #endregion

// #region lil inline tests
// console.log(verifyAll({ a: 1, b: 2, c: 3 }, 'a', 'b', 'c'))
// console.log(verifyAll({ a: 1, b: 2, c: 3 }, 'a', 'b'))
// console.log(verifyHasTwo({ a: 1, b: 2, c: 3 }, 'a'))
// console.log(verifyRequired({ a: 1, b: 2, c: 3 }, (a, e) => a === e, ...['a', 'b', 'c']))

// getPath
// console.log(getPath('a', { a: 1, b: { c: 3, d: 4 } }))
// console.log(getPath('b.c', { a: 1, b: { c: 3, d: 4 } }))
// console.log(getPath('b.d', { a: 1, b: { c: 3, d: { e: 5 } } }))
// console.log(getPath('b.c.d', { a: 1, b: { c: 3, d: { e: 5 } } }))

// conditionals
// console.log(verifyIfThen(ifHas('a'), has('b'))({ a: 1, b: 2, c: 3 }))
// console.log(verifyIfThen(ifHas('b.c'), has('b.d'))({ a: 1, b: { c: 3, d: 4 } }))
// console.log(verifyIfThen(ifHas('b.f'), has('a'), has('b'))({ a: 1, b: { c: 3, d: 4 } }))
// console.log(verifyIfThen(ifPathEq('a', 1), has('b'), has('b'))({ a: 2, b: 2, c: 3 }))
// console.log(
//   verifyIfThen(ifPathEq('a', 2), has('b'), pathEq('b.d', { e: 5 }))({
//     a: 1,
//     b: { c: 3, d: { e: 5 } }
//   })
// )
// #endregion
