// @ts-nocheck

import {
  cacheBehaviorsConfig,
  cacheDefaultBehaviorConfig,
  cacheBehaviorItem
} from '../../../src/components/cloudFront/distribution/behaviors'

describe('defaults', () => {
  test('limited defaults', () => {
    const actual = cacheBehaviorsConfig({ id: '1', path: 'index.html' })
    const expected = {
      CacheBehaviors: [
        {
          TargetOriginId: '1',
          PathPattern: 'index.html',
          ViewerProtocolPolicy: 'redirect-to-https',
          ForwardedValues: { QueryString: true }
        }
      ]
    }
    expect(actual).toEqual(expected)
  })

  test('limited defaults', () => {
    const actual = cacheDefaultBehaviorConfig({ id: '1' })
    const expected = {
      DefaultCacheBehavior: {
        TargetOriginId: '1',
        ViewerProtocolPolicy: 'redirect-to-https',
        ForwardedValues: { QueryString: true }
      }
    }
    expect(actual).toEqual(expected)
  })

  test('limited item defaults', () => {
    const actual = cacheBehaviorItem({ id: '1' })
    const expected = {
      TargetOriginId: '1',
      ViewerProtocolPolicy: 'redirect-to-https',
      ForwardedValues: { QueryString: true }
    }
    expect(actual).toEqual(expected)
  })
})
