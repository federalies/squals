const findValidValues = elem => {
  if (elem.nextElementSibling) {
    return [elem.innerText, ...findValidValues(elem.nextElementSibling)]
  }
  return [elem.innerText]
}

const findPropName = elem => {
  return elem.parentElement.parentElement.previousElementSibling.children[1]
    .innerText
}

const validLbls = Array.from(
  document.querySelectorAll('#main-col-body > div > dl > dd > p > em')
).filter(n => n.innerText.includes('Valid values:'))

const allEnums = validLbls.map(elem => {
  return { [findPropName(elem)]: findValidValues(elem.nextElementSibling) }
})

console.log({ allEnums })
