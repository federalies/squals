const findValidValues = (elem?: any): string[] => {
  if (elem.nextElementSibling) {
    return [elem.innerText, ...findValidValues(elem.nextElementSibling)]
  }
  return [elem.innerText]
}

const findPropName = (elem: any): string => {
  return elem.parentElement.parentElement.previousElementSibling.children[1].innerText
}

const validLbls: any = Array.from(
  document.querySelectorAll('#main-col-body > div > dl > dd > p > em')
).filter((n: any) => n.innerText.includes('Valid values:') as string)

const allEnums = validLbls.map((elem: Element) => {
  return { [findPropName(elem)]: findValidValues(elem.nextElementSibling) }
})

console.log({ allEnums })
