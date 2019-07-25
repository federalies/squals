import assert from 'deep-equal'
import { Struct } from 'superstruct'

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
export function verifyIntersection<T>(
  i: T,
  expIntersectSize: number,
  operator?: '==' | '!==' | '<' | '>' | '<=' | '>=',
  operatorFn?: (a: number, b: number) => boolean,
  ...keys: string[]
) {
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
  if (!_operatorFn(elemLeft.length, Math.min(expIntersectSize, keys.length))) {
    throw new Error(
      `An object was supposed to have ${expIntersectSize} key(s) from the list ${keys}. But input:${i} has these problem keys:${elemLeft}`
    )
  }
  return i
}
// #region verify Key Sets
export const verifyAny = (...keys: string[]) => <T>(input: T) =>
  verifyIntersection<T>(input, 1, '>=', undefined, ...keys)
export const verifyAll = (...keys: string[]) => <T>(input: T) =>
  verifyIntersection<T>(input, keys.length, '==', undefined, ...keys)

export const verifyOnlyOne = (...keys: string[]) => <T>(input: T) =>
  verifyIntersection<T>(input, 1, '==', undefined, ...keys)
export const verifyXor = (...keys: string[]) => <T>(input: T) =>
  verifyIntersection<T>(input, 1, '==', undefined, ...keys) // alias
export const verifyHasTwo = (...keys: string[]) => <T>(input: T) =>
  verifyIntersection<T>(input, 2, '==', undefined, ...keys) // alias

export const verifyHasAtLeastTwo = (...keys: string[]) => <T>(input: T) =>
  verifyIntersection<T>(input, 2, '>=', undefined, ...keys) // alias
export const verifyHasAtLeastOne = (...keys: string[]) => <T>(input: T) =>
  verifyIntersection<T>(input, 1, '>=', undefined, ...keys) // alias
export const verifyHasAtLeastN = (n: number, ...keys: string[]) => <T>(input: T) =>
  verifyIntersection<T>(input, n, '>=', undefined, ...keys) // alias
// #endregion

// #region verify conditionals
export function verifyIfThen(
  _if: (i: {}) => boolean,
  _then: (i: {}) => void,
  _else?: (i: {}) => void
) {
  return <T>(input: T) => {
    if (_if(input)) {
      _then(input)
    } else {
      if (_else) _else(input)
    }
    return input
  }
}

export const ifCondition = (keyPath: string, fnOp: (pathData: any) => boolean, delim = '.') => <T>(
  i: T
): boolean => {
  return fnOp(getPath(keyPath, i, delim))
}

export const ifType = (keyPath: string, isType: string, delim = '.') => (i: unknown): boolean => {
  return typeof getPath(keyPath, i, delim) === isType
}
export const ifHas = (keyPath: string, delim = '.') => (i: unknown): boolean => {
  return !!(getPath(keyPath, i, delim) && true) as boolean
}

export const ifPathEq = (keyPath: string, expected: any, delim = '.') => <T>(i: T): boolean => {
  return assert(getPath(keyPath, i, delim), expected) as boolean
}

export const ifPathType = (keyPath: string, expected: any, delim = '.') => <T>(i: T): boolean => {
  return typeof getPath(keyPath, i, delim) === expected
}

export const has = (keyPath: string, delim = '.') => <T>(i: T): any => {
  if (!getPath(keyPath, i, delim)) {
    throw new Error(
      `based on the prior condition, "${keyPath}" is expected in ${JSON.stringify(i, null, 2)}`
    )
  }
  return i
}

export const verifyStringStructData = (
  keyPath: string,
  transformFn: (i: string) => any,
  s: Struct,
  delim = '.'
) => <T>(i: T) => {
  return s(transformFn(getPath(keyPath, i, delim))) as T
}
export const multipleOf = (n: number) => <T>(input: T) => {
  if (Number(input) % n !== 0) {
    throw new Error(`Expecting memSize:MB to be multiple of 64 - got::${n}`)
  }
  return input
}

export const stringNotEqual = (keyPath: string, s: string, delim = '.') => <T>(input: T) => {
  if (getPath(keyPath, input, delim) === s) {
    throw new Error(
      `input::${{
        keyPath,
        input,
        result: getPath(keyPath, input, delim)
      }} should not be equal to :: ${s}`
    )
  }
  return input
}

export const pathEq = (keyPath: string, expected: any, delim = '.') => <T>(i: T): T => {
  if (!assert(getPath(keyPath, i, delim), expected)) {
    throw new Error(
      `based on the prior condition, parth::"${keyPath}" was expected to equal ${JSON.stringify(
        expected,
        null,
        2
      )} - but instead there was: ${JSON.stringify(getPath(keyPath, i, delim), null, 2)}`
    )
  }
  return i
}

export const verifySyntax = (pathToSource: string, compilationFunc: (s: string) => any) => <T>(
  input: T
) => {
  const schema = compilationFunc(getPath(pathToSource, input))
  if (!schema) {
    throw new Error('the schema is invlalid')
  }
  return input
}

// #endregion
