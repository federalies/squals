// @ts-nocheck
const Import = require('esm')(module)
const { analyticsConfig } = Import('./analyticsConfiguration')

test('Analyics Single Object Input', () => {
  const actual = analyticsConfig({
    id: 'asdf',
    prefix: 'docs/',
    tagList: [{ k: 'val' }]
  })

  const expected = {
    AnalyticsConfigurations: [
      {
        Id: 'asdf',
        TagFilters: [
          {
            Key: 'k',
            Value: 'val'
          }
        ],
        Prefix: 'docs/',
        StorageClassAnalysis: {
          DataExport: {
            OutputSchemaVersion: 'V_1'
          }
        }
      }
    ]
  }
  expect(actual).toEqual(expected)
})

// describe('matching cities to foods', () => {
//   // Applies only to tests in this describe block
//   beforeEach(() => {
//     return utils1()
//   })

//   test('Vienna <3 sausage', () => {
//     expect(utils2('Vienna', 'Wiener Schnitzel')).toBe(true)
//   })

//   test('San Juan <3 plantains', () => {
//     expect(utils2('San Juan', 'Mofongo')).toBe(true)
//   })
// })
