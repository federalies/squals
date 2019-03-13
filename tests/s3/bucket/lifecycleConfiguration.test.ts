// @ts-nocheck

import { lifecycleConfig, IlifecycleValidRules } from '../../../src/components/s3/bucket'
describe('defaults', () => {
  test('expiryDays starter', () => {
    // fix this so that the readonly prop is not required
    const rule: IlifecycleValidRules = { expiryDays: 42, ruleName: 'ExpirationInDays' }
    const a = lifecycleConfig(rule)
    const exp: any = {
      LifecycleConfiguration: {
        Rules: [{ ExpirationInDays: 42, Status: 'Enabled' }]
      }
    }
    expect(a).toEqual(exp)
  })

  test('keepOldVersionForDays example', () => {
    // fix this so that the readonly prop is not required
    const rule: IlifecycleValidRules = {
      keepOldVersionForDays: 42,
      ruleName: 'NoncurrentVersionExpirationInDays'
    }
    const a = lifecycleConfig(rule)
    const e: any = {
      LifecycleConfiguration: {
        Rules: [{ NoncurrentVersionExpirationInDays: 42, Status: 'Enabled' }]
      }
    }

    expect(a).toEqual(e)
  })

  test.skip('transitions example', () => {
    // fix this so that the readonly prop is not required
    const rule: any = {
      ruleName: 'Transitions',
      storage: 'somestorage',
      daysTillSlowDown: 42
    }
    const a = lifecycleConfig(rule)
    const e: any = {
      LifecycleConfiguration: {
        Rules: [
          {
            Transitions: [{ StorageClass: 'somestorage', TransitionInDays: 42 }],
            Status: 'Enabled'
          }
        ]
      }
    }
    console.error(JSON.stringify(e, null, 2))
    console.error(JSON.stringify(a, null, 2))

    expect(a).toEqual(e)
  })
  test.skip('transitions list example', () => {
    const rule: any = [
      {
        ruleName: 'Transitions',
        transitions: [{ storage: '', daysTillSlowDown: 42 }]
      },
      {
        ruleName: 'Transitions',
        transitions: [{ storage: '', daysTillSlowDown: 42 }]
      }
    ]
    const a = lifecycleConfig(rule)
    const e = {}
    expect(a).toEqual(e)
  })
  test.skip('transitions list example', () => {
    const rule: any = {}
    const a = {}
    const exp = {}
    expect(a).toEqual(exp)
  })
  test.skip('moveOldVersionRule example', () => {
    const rule: any = {}
    const a = {}
    const exp = {}
    expect(a).toEqual(exp)
  })
  test.skip('expiryDate example', () => {
    const rule: any = {}
    const a = {}
    const exp = {}
    expect(a).toEqual(exp)
  })
  test.skip('quitMultipartsAfterDays example', () => {
    const rule: any = {}
    const a = {}
    const exp = {}
    expect(a).toEqual(exp)
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
