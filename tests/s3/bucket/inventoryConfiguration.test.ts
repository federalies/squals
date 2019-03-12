// @ts-nocheck

import { inventoryConfig } from '../../../src/components/s3/bucket'

describe('defaults', () => {
  test('single simple inventory rule', () => {
    const actual = inventoryConfig({ id: 'ThisIsMyID', dest: { arn: 'arn:asdf' } })
    const expected: any = {
      InventoryConfigurations: [
        {
          Id: 'ThisIsMyID',
          Enabled: true,
          IncludedObjectVersions: 'All',
          ScheduleFrequency: 'Weekly',
          Destination: {
            BucketArn: 'arn:asdf',
            Format: 'CSV'
          }
        }
      ]
    }
    expect(expected).toEqual(actual)
  })
  test('simple inventory rule list', () => {
    const actual = inventoryConfig([
      { id: '#myID1', dest: { arn: 'arn:asdf1' } },
      {
        id: '#myID2',
        prefix: 'somepreix/',
        optionals: ['Size', 'ETag', 'StorageClass'],
        dest: { arn: 'arn:asdf2' }
      }
    ])
    const expected: any = {
      InventoryConfigurations: [
        {
          Id: '#myID1',
          Enabled: true,
          IncludedObjectVersions: 'All',
          ScheduleFrequency: 'Weekly',
          Destination: {
            BucketArn: 'arn:asdf1',
            Format: 'CSV'
          }
        },
        {
          Id: '#myID2',
          Enabled: true,
          Prefix: 'somepreix/',
          OptionalFields: ['Size', 'ETag', 'StorageClass'],
          IncludedObjectVersions: 'All',
          ScheduleFrequency: 'Weekly',
          Destination: {
            BucketArn: 'arn:asdf2',
            Format: 'CSV'
          }
        }
      ]
    }
    expect(expected).toEqual(actual)
  })
})

describe('invalids', () => {
  test('invalud optionals ', () => {
    const actual = () =>
      inventoryConfig({
        id: 'MyinventoryID',
        optionals: ['somestring'],
        dest: { arn: 'arn:asdf' }
      })
    expect(actual).toThrow()
  })

  test('invalud versions ', () => {
    const actual = () =>
      inventoryConfig({
        id: 'MyinventoryID',
        versions: 'EVERYTHING', // All | Current
        dest: { arn: 'arn:asdf' }
      })
    expect(actual).toThrow()
  })

  test('invalud frequency ', () => {
    const actual = () =>
      inventoryConfig({
        id: 'MyinventoryID',
        frequency: 'Everyday', // Daily  | Weekly
        dest: { arn: 'arn:asdf' }
      })
    expect(actual).toThrow()
  })

  test('empty dest & id', () => {
    const actual = () => inventoryConfig({ id: '', dest: { arn: '' } })
    expect(actual).toThrow()
  })
})
