const difference = (setA, setB) => {
  return Array.from(
    setB.reduce((_difference, elem) => {
      _difference.delete(elem)
      return _difference
    }, new Set(setA))
  )
}

const uniq = dupppedList => {
  return Array.from(new Set(dupppedList))
}

console.log(uniq([1, 1, 1, 2, 3, 4, 4, 4, 5, 6, 7, 7]))
// should be 1,2,3

console.log(difference([1, 2, 3, 4, 5, 6], [4, 5, 6, 7, 8]))
// should be 1,2,3

console.log(difference([1, 2, 3, 4, 5, 6], []))
// 1::6

console.log(difference([], [1, 2, 3, 4]))
