// @ts-nocheck

import { versioningConfig } from '../../../src/components/s3/bucket'

describe('defaults', () => {
  test('jsdoc example', () => {
    const a = versioningConfig(true)
    const e = { VersioningConfiguration: { Status: 'Enabled' } }
    expect(a).toEqual(e)
  })

  test('set to false', () => {
    const a = versioningConfig(false)
    const e = { VersioningConfiguration: { Status: 'Suspended' } }
    expect(a).toEqual(e)
  })
})
