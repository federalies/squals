// @ts-nocheck
/**
 * Things to test:
 * 1.
 * 2.
 */

import { analyticsConfig, OutAnalyticsConfig } from '../../../src/components/s3/bucket'

describe('defaults', () => {
  test('analyze docs/ w- tagList Array', () => {
    // OutAnalyticsItem
    const actual = analyticsConfig({
      id: 'testA',
      prefix: 'doc/',
      tagList: [{ keyy1: 'values' }, { keyy: 'value' }]
    })
    const expected: OutAnalyticsConfig = {
      AnalyticsConfigurations: [
        {
          Id: 'testA',
          Prefix: 'doc/',
          TagFilters: [{ Key: 'keyy1', Value: 'values' }, { Key: 'keyy', Value: 'value' }],
          StorageClassAnalysis: {}
        }
      ]
    }
    expect(actual).toEqual(expected)
  })
  test('analyze docs/ w- tagList item', () => {
    // OutAnalyticsItem
    const actual = analyticsConfig({ id: 'testA', prefix: 'doc/', tagList: { keyy: 'value' } })
    const expected: OutAnalyticsConfig = {
      AnalyticsConfigurations: [
        {
          Id: 'testA',
          Prefix: 'doc/',
          TagFilters: [{ Key: 'keyy', Value: 'value' }],
          StorageClassAnalysis: {}
        }
      ]
    }
    expect(actual).toEqual(expected)
  })
  test('analyze `docs/`+ `archive/`', () => {
    // OutAnalyticsItem
    const actual = analyticsConfig([
      { id: 'test0' },
      { id: 'testA', prefix: 'doc/' },
      { id: 'testB', prefix: 'archive/', tagList: { Legacy: 'singular' } },
      { id: 'testC', prefix: 'archives/', tagList: [{ Legacy: 'plural' }] }
    ])
    const expected: OutAnalyticsConfig = {
      AnalyticsConfigurations: [
        {
          Id: 'test0',
          Prefix: '',
          StorageClassAnalysis: {}
        },
        {
          Id: 'testA',
          Prefix: 'doc/',
          StorageClassAnalysis: {}
        },
        {
          Id: 'testB',
          Prefix: 'archive/',
          TagFilters: [{ Key: 'Legacy', Value: 'singular' }],
          StorageClassAnalysis: {}
        },
        {
          Id: 'testC',
          Prefix: 'archives/',
          TagFilters: [{ Key: 'Legacy', Value: 'plural' }],
          StorageClassAnalysis: {}
        }
      ]
    }
    expect(actual).toEqual(expected)
  })
})
