import { AppSyncFuncConfig } from './config'

// const a = new AppSyncFuncConfig({ name: 'config', sourceName: 'SomeSource' })
// const out = a.toJSON()
// const b = AppSyncFuncConfig.validate(out)

class A {
  inputs: (object | string)[]
  constructor (...i: (object | string)[]) {
    this.inputs = i
  }
  maybeClone () {
    return new A(...this.inputs)
  }
  setter (...j: (object | string)[]) {
    this.inputs = [...this.inputs, ...j]
    return this
  }
}

const a = new A('a')
const b = a.maybeClone().setter('b', 'c')

a.setter('d', b)
b.setter('e', 'f')

console.log({ a })
console.log({ b })
