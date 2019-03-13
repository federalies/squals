// @ts-nocheck

import { metricsConfig } from '../../../src/components/s3/bucket'

describe('defaults', () => {
  test('empty as reasonable', () => {
    const a = metricsConfig({ id: 'ASDF' })
    const e: any = {
      MetricsConfigurations: [
        {
          Id: 'ASDF'
        }
      ]
    }
    expect(a).toEqual(e)
  })

  test('add a tagList', () => {
    const a = metricsConfig({
      id: 'ASDF',
      tagList: { myTag: 'isGreat', second: 'Tag', otherTag: 'withaKey' }
    })
    const e: any = {
      MetricsConfigurations: [
        {
          Id: 'ASDF',
          TagFilters: [
            { Key: 'myTag', Value: 'isGreat' },
            { Key: 'second', Value: 'Tag' },
            { Key: 'otherTag', Value: 'withaKey' }
          ]
        }
      ]
    }
    expect(a).toEqual(e)
  })

  test('taglist as array', () => {
    const a = metricsConfig({ id: 'ASDF', tagList: [{ first: '1', second: '2' }, { third: '3' }] })
    const e: any = {
      MetricsConfigurations: [
        {
          Id: 'ASDF',
          TagFilters: [
            { Key: 'first', Value: '1' },
            { Key: 'second', Value: '2' },
            { Key: 'third', Value: '3' }
          ]
        }
      ]
    }
    expect(a).toEqual(e)
  })

  test('add a prefix', () => {
    const a = metricsConfig({ id: 'ASDF', prefix: 'metrics/' })
    const e: any = {
      MetricsConfigurations: [
        {
          Id: 'ASDF',
          Prefix: 'metrics/'
        }
      ]
    }
    expect(a).toEqual(e)
  })

  test('list of metrics rules', () => {
    const a = metricsConfig([{ id: 'example1' }, { id: 'example2', prefix: 'metrics/' }])
    const e: any = {
      MetricsConfigurations: [
        {
          Id: 'example1'
        },
        {
          Id: 'example2',
          Prefix: 'metrics/'
        }
      ]
    }
    expect(a).toEqual(e)
  })
})
