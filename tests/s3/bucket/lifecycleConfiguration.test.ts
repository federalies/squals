// @ts-nocheck
/**
 * Things to test:
 * 1.
 * 2.
 */

describe.skip('defaults', () => {
  test.skip('1+2=3', () => {
    expect(1 + 2).toBe(3)
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
