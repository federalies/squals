// @ts-nocheck
/**
 * Things to test:
 * 1.
 * 2.
 */

const process = require('process')
const Import = require('esm')(module)
console.log({ pwd: process.pwd })

console.log({ esm: require('esm') })
console.log({ Import })
console.log({ lifec: Import('../../../src/components/s3/bucket') })

describe('WAT?', () => {
  const Import = require('esm')(module)
  const { lifecycleConfig } = Import('../../../src/components/s3/bucket')

  test('sinple 2+2=4', () => {
    const lifecycleCfg = lifecycleConfig([])
    console.log({ lifecycleCfg })
    expect(2 + 2).toBe(4)
  })
})

// log({ 1: lifecycleConfig({ c: [{ expiryDate: '2020-01-01' }] }) })

// log({
//   2: lifecycleConfig({
//     c: [{ expiryDays: 5 }],
//     o: {
//       status: false,
//       id: 'someid',
//       prefix: 'pre/',
//       tagList: [{ myTag: 'value' }, { otherTag: 'its value' }]
//     }
//   })
// })

// log({
//   3: lifecycleConfig(
//     {
//       c: [{ expiryDays: 5 }],
//       o: {
//         status: false,
//         id: 'someid',
//         prefix: 'pre/',
//         tagList: [{ myTag: 'value' }, { otherTag: 'its value' }]
//       }
//     },
//     [{ c: [{ keepOldVersionForDays: 2 }], o: {} }]
//   )
// })

// log({ 4: lifecycleConfig({ c: [{ quiteMultipartsAfterDays: 2 }] }) })
// log({
//   5: lifecycleConfig({ c: [{ keepOldVersionForDays: 2 }] }, [
//     { c: [{ expiryDays: 5 }] }
//   ])
// })
// log({
//   6: lifecycleConfig({
//     c: [
//       {
//         moveOldVersion: [{ storage: 'STANDARD_IA', daysTillslowdown: 2 }]
//       }
//     ]
//   })
// })
// log({
//   7: lifecycleConfig({
//     c: [
//       {
//         transitions: [{ storage: 'STANDARD_IA', atDate: '2020-01-01' }]
//       }
//     ]
//   })
// })
