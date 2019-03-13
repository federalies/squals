// @ts-nocheck

import { publicAccesConfig } from '../../../src/components/s3/bucket'

describe('defaults', () => {
  test('docs example - all true', () => {
    const a = publicAccesConfig({
      publicAclBlock: true,
      publicBuckets: true,
      pulicAclIgnore: true,
      publicPolciy: true
    })
    const e = {
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true
      }
    }
    expect(a).toEqual(e)
  })
  test('all false', () => {
    const a = publicAccesConfig({
      publicAclBlock: false,
      publicBuckets: false,
      pulicAclIgnore: false,
      publicPolciy: false
    })
    const e = {
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: false,
        BlockPublicPolicy: false,
        IgnorePublicAcls: false,
        RestrictPublicBuckets: false
      }
    }
    expect(a).toEqual(e)
  })

  test('Only ACLs present', () => {
    const a = publicAccesConfig({
      publicAclBlock: true,
      pulicAclIgnore: true
    })
    const e = {
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        IgnorePublicAcls: true
      }
    }
    expect(a).toEqual(e)
  })

  test('Only Public Bucket Present', () => {
    const a = publicAccesConfig({
      publicBuckets: false
    })
    const e = {
      PublicAccessBlockConfiguration: {
        RestrictPublicBuckets: false
      }
    }
    expect(a).toEqual(e)
  })
})
