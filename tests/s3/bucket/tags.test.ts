// @ts-nocheck

import { tags, Tags, TagFilters } from '../../../src/components/s3/bucket'

describe('defaults', () => {
  test('jsdoc example', () => {
    const a = tags({ key1: 'value1' })
    const e: any = [{ Key: 'key1', Value: 'value1' }]
    expect(a).toEqual(e)
  })

  test('tags object to array', () => {
    const a = tags({ key1: 'value1', key2: 'value2' })
    const e: any = [{ Key: 'key1', Value: 'value1' }, { Key: 'key2', Value: 'value2' }]
    expect(a).toEqual(e)
  })

  test('tags array to array', () => {
    const a = tags([{ key1: 'value1', key2: 'value2' }, { key3: 'value3', key4: 'value4' }])
    const e: any = [
      { Key: 'key1', Value: 'value1' },
      { Key: 'key2', Value: 'value2' },
      { Key: 'key3', Value: 'value3' },
      { Key: 'key4', Value: 'value4' }
    ]
    expect(a).toEqual(e)
  })

  test('Tags Maker', () => {
    const a = Tags({ key1: 'value1' })
    const e: any = { Tags: [{ Key: 'key1', Value: 'value1' }] }
    expect(a).toEqual(e)
  })

  test('TagFilters Maker', () => {
    const a = TagFilters({ key1: 'value1' })
    const e: any = { TagFilters: [{ Key: 'key1', Value: 'value1' }] }
    expect(a).toEqual(e)
  })
})
