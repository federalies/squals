// @ts-nocheck

import { versioning } from '../../../src/components/s3/bucket'

describe('defaults', () => {
  test('jsdoc example', () => {
    const a = versioning(true)
    const e = { VersioningConfiguration: { Status: 'Enabled' } }
    expect(a).toEqual(e)
  })

  test('set to false', () => {
    const a = versioning(false)
    const e = { VersioningConfiguration: { Status: 'Suspended' } }
    expect(a).toEqual(e)
  })
})
