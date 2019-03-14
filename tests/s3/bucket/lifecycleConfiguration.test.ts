// @ts-nocheck

import { lifecycleConfig } from '../../../src/components/s3/bucket'

describe('defaults', () => {
  test('expiryDays starter', () => {
    // fix this so that the readonly prop is not required
    const a = lifecycleConfig({ expiryDays: 42 })
    const exp: any = {
      LifecycleConfiguration: {
        Rules: [{ ExpirationInDays: 42, Status: 'Enabled' }]
      }
    }
    expect(a).toEqual(exp)
  })

  test('expiryDays starter', () => {
    // fix this so that the readonly prop is not required
    const rule: any = {
      id: 'ThisIsANameForTheRule',
      prefix: 'onlyAppliedToTheseKeys/',
      tagList: { myTag: 'isMine' },
      status: false,
      expiryDays: 42
    }
    const a = lifecycleConfig(rule)
    const exp: any = {
      LifecycleConfiguration: {
        Rules: [
          {
            Id: 'ThisIsANameForTheRule',
            Status: 'Disabled',
            Prefix: 'onlyAppliedToTheseKeys/',
            TagFilters: [{ Key: 'myTag', Value: 'isMine' }],
            ExpirationInDays: 42
          }
        ]
      }
    }
    expect(a).toEqual(exp)
  })

  test('keepOldVersionForDays example', () => {
    const a = lifecycleConfig({ keepOldVersionForDays: 42 })
    const e: any = {
      LifecycleConfiguration: {
        Rules: [{ NoncurrentVersionExpirationInDays: 42, Status: 'Enabled' }]
      }
    }

    expect(a).toEqual(e)
  })

  test('transitions duration example', () => {
    const a = lifecycleConfig({
      transitions: { storage: 'somestorage', daysTillSlowDown: 42 }
    })
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
    expect(a).toEqual(e)
  })

  test('transitions absolute date example (no tagList)', () => {
    const a = lifecycleConfig({
      id: '#myID',
      status: false,
      prefix: '2019-',
      transitions: [
        { storage: 'STANDARD_IA', atDate: '2019-10-01' },
        { storage: 'GLACIER', atDate: '2020-12-01' }
      ]
    })
    const e: any = {
      LifecycleConfiguration: {
        Rules: [
          {
            Status: 'Disabled',
            Id: '#myID',
            Prefix: '2019-',
            Transitions: [
              { StorageClass: 'STANDARD_IA', TransitionDate: '2019-10-01' },
              { StorageClass: 'GLACIER', TransitionDate: '2020-12-01' }
            ]
          }
        ]
      }
    }
    expect(a).toEqual(e)
  })

  test('transitions absolute date example (with tagList)', () => {
    const a = lifecycleConfig({
      id: '#myID',
      status: true,
      tagList: { myTag: '12' },
      prefix: '2019-',
      transitions: [
        { storage: 'STANDARD_IA', atDate: '2019-10-01' },
        { storage: 'GLACIER', atDate: '2020-12-01' }
      ]
    })
    const e: any = {
      LifecycleConfiguration: {
        Rules: [
          {
            Status: 'Enabled',
            Id: '#myID',
            TagFilters: [{ Key: 'myTag', Value: '12' }],
            Prefix: '2019-',
            Transitions: [
              { StorageClass: 'STANDARD_IA', TransitionDate: '2019-10-01' },
              { StorageClass: 'GLACIER', TransitionDate: '2020-12-01' }
            ]
          }
        ]
      }
    }
    expect(a).toEqual(e)
  })

  test('transitions list example', () => {
    const rule: any = [
      {
        transitions: [
          { storage: 'STANDARD_IA', daysTillSlowDown: 12 },
          { storage: 'GLACIER', daysTillSlowDown: 22 }
        ]
      },
      {
        expiryDays: 42
      }
    ]
    const a = lifecycleConfig(rule)
    const e = {
      LifecycleConfiguration: {
        Rules: [
          {
            Status: 'Enabled',
            Transitions: [
              {
                StorageClass: 'STANDARD_IA',
                TransitionInDays: 12
              },
              {
                StorageClass: 'GLACIER',
                TransitionInDays: 22
              }
            ]
          },
          {
            Status: 'Enabled',
            ExpirationInDays: 42
          }
        ]
      }
    }
    expect(a).toEqual(e)
  })

  test('moveOldVersionRule example', () => {
    const rule: any = { moveOldVersionRules: { storage: 'STANDARD_IA', daysTillSlowDown: 42 } }
    const a = lifecycleConfig(rule)
    const exp = {
      LifecycleConfiguration: {
        Rules: [
          {
            Status: 'Enabled',
            NoncurrentVersionTransitions: [
              {
                StorageClass: 'STANDARD_IA',
                TransitionInDays: 42
              }
            ]
          }
        ]
      }
    }
    expect(a).toEqual(exp)
  })

  test('moveOldVersionRule List example', () => {
    const rule: any = {
      moveOldVersionRules: [
        { storage: 'STANDARD', daysTillSlowDown: 12 },
        { storage: 'STANDARD_IA', daysTillSlowDown: 42 }
      ]
    }
    const a = lifecycleConfig(rule)
    const exp = {
      LifecycleConfiguration: {
        Rules: [
          {
            Status: 'Enabled',
            NoncurrentVersionTransitions: [
              {
                StorageClass: 'STANDARD',
                TransitionInDays: 12
              },
              {
                StorageClass: 'STANDARD_IA',
                TransitionInDays: 42
              }
            ]
          }
        ]
      }
    }
    expect(a).toEqual(exp)
  })

  test('expiryDate example', () => {
    const rule: any = { expiryDate: '2019-12-31' }
    const a = lifecycleConfig(rule)
    const exp = {
      LifecycleConfiguration: {
        Rules: [
          {
            Status: 'Enabled',
            ExpirationDate: '2019-12-31'
          }
        ]
      }
    }
    expect(a).toEqual(exp)
  })

  test('quitMultipartsAfterDays example', () => {
    const rule: any = { quitMultipartsAfterDays: 2 }
    const a = lifecycleConfig(rule)
    const exp = {
      LifecycleConfiguration: {
        Rules: [
          {
            Status: 'Enabled',
            AbortIncompleteMultipartUpload: {
              DaysAfterInitiation: 2
            }
          }
        ]
      }
    }
    expect(a).toEqual(exp)
  })
})
