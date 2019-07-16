// node -r esm _scratch.js

import { struct } from 'superstruct'

const schema1 = struct({
  a: struct.optional('string'),
  b: struct.optional('string')
})

// but what if you need A OR B to be guarenteed?
// use case is upposerted via JOI

const f1 = {
  a: 'hello'
}
const f2 = {
  b: 'world'
}

console.log(schema1(f1))
console.log(schema1(f2))

const semiUsefulNestedSchema = struct({
  a: 'string?',
  b: 'string?',
  c: struct.object({
    e: 'string?',
    f: 'string?',
    g: struct.object({
      country: 'string',
      lang: struct.dynamic((value, parent) => {
        return parent.country === 'USA'
          ? struct.enum(['en'])
          : struct.enum(['es', 'fr', 'zn', 'de', 'nl'])
      })
    })
  })
})

const moreUsefulNestedSchema = struct({
  a: 'string?',
  b: 'string?',
  c: struct.object({
    country: 'string',
    e: 'string?',
    f: 'string?',
    g: struct.object({
      lang: struct.dynamic((value, parent, root) => {
        // NOTICE the addiition of _root_ so that
        // I can traverse the data structure to pluck out the attributes I need to compare against
        return root.c.country === 'USA' // root is undeinfed, thus c is not defined
          ? struct.enum(['en'])
          : struct.enum(['es', 'fr', 'zn', 'de', 'nl'])
      })
    })
  })
})

console.log(
  semiUsefulNestedSchema({
    a: 'hello',
    b: 'world',
    c: {
      g: {
        country: 'USA',
        lang: `en` // 'english'
      }
    }
  })
)

console.log(
  moreUsefulNestedSchema({
    a: 'hello',
    b: 'world',
    c: {
      country: 'Mexico',
      g: {
        lang: `es` // 'spanish'
      }
    }
  })
)

// what I want is to make `i` conditional on the value of `a`
