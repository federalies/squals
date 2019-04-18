// @ts-nocheck

import {
  restrictionsConfig,
  ICdnGeoRestrictions,
  ICdnGeoRestriction_listed
} from '../../../src/components/cloudFront/distribution/restrictions'
import * as region from '../../../src/components/cloudFront/distribution/restriction_enums'

describe('CDN Restrictions', () => {
  test('default', () => {
    const a = restrictionsConfig()
    const e = {
      Restrictions: {
        GeoRestriction: {
          RestrictionType: 'none'
        }
      }
    }
    expect(a).toEqual(e)
  })

  test('whitelist Array', () => {
    const a = restrictionsConfig({ whitelist: region.CanadaPlusUSA() })
    const e = {
      Restrictions: {
        GeoRestriction: {
          RestrictionType: 'whitelist',
          Locations: ['US', 'CA']
        }
      }
    }
    expect(a).toEqual(e)
  })
  test('blacklist Array', () => {
    const a = restrictionsConfig({ blacklist: region.CanadaPlusUSA() })
    const e = {
      Restrictions: {
        GeoRestriction: {
          RestrictionType: 'blacklist',
          Locations: ['US', 'CA']
        }
      }
    }
    expect(a).toEqual(e)
  })

  test('whitelist One Country', () => {
    const a = restrictionsConfig({ whitelist: 'US' })
    const e = {
      Restrictions: {
        GeoRestriction: {
          RestrictionType: 'whitelist',
          Locations: ['US']
        }
      }
    }
    expect(a).toEqual(e)
  })
  test('blacklist single item', () => {
    // just because its funnny:
    // who would do this??
    // dont do this in production. Cmon its Canada!
    const a = restrictionsConfig({ blacklist: 'CA' })
    const e = {
      Restrictions: {
        GeoRestriction: {
          RestrictionType: 'blacklist',
          Locations: ['CA']
        }
      }
    }
    expect(a).toEqual(e)
  })

  test('should be not possible', () => {
    const a = () => restrictionsConfig({ blacklist: 'CA', whitelist: 'US' })
    expect(a).toThrow()
  })

  test('easy whitelist array', () => {
    const a = restrictionsConfig({ whitelist: ['US', 'CA', 'MX'] })
    const e = {
      Restrictions: {
        GeoRestriction: {
          RestrictionType: 'whitelist',
          Locations: ['US', 'CA', 'MX']
        }
      }
    }
    expect(a).toEqual(e)
  })

  test('give it some trash - watch it assume no resticttions', () => {
    const bogusInput: any = { badKey: true, otherSuperfluousKey: true }
    const a = restrictionsConfig(bogusInput)
    const e = {
      Restrictions: {
        GeoRestriction: {
          RestrictionType: 'none'
        }
      }
    }
    expect(a).toEqual(e)
  })
})

describe('spotcheck some enums helper functions', () => {
  test('North America', () => {
    const a = restrictionsConfig({ whitelist: region.NorthAmericas() }) as ICdnGeoRestrictions
    const b = a.Restrictions.GeoRestriction as ICdnGeoRestriction_listed
    expect(a.Restrictions.GeoRestriction.RestrictionType).toEqual('whitelist')
    expect(a.Restrictions.GeoRestriction).toHaveProperty('Locations')
    expect(b.Locations).toContain('US')
    expect(b.Locations).toHaveLength(39)
  })

  test('South America', () => {
    const a = restrictionsConfig({ whitelist: region.SouthAmericas() }) as ICdnGeoRestrictions
    const b = a.Restrictions.GeoRestriction as ICdnGeoRestriction_listed
    expect(a.Restrictions.GeoRestriction.RestrictionType).toEqual('whitelist')
    expect(b.Locations).toContain('BR')
    expect(b.Locations).toHaveLength(13)
  })

  test('Central America', () => {
    const a = restrictionsConfig({ whitelist: region.CentralAmericas() }) as ICdnGeoRestrictions
    const b = a.Restrictions.GeoRestriction as ICdnGeoRestriction_listed
    expect(a.Restrictions.GeoRestriction.RestrictionType).toEqual('whitelist')
    expect(b.Locations).toContain('BZ')
    expect(b.Locations).toHaveLength(7)
  })

  test('EUMembers', () => {
    const a = restrictionsConfig({ whitelist: region.EUMembers() }) as ICdnGeoRestrictions
    const b = a.Restrictions.GeoRestriction as ICdnGeoRestriction_listed

    expect(a.Restrictions.GeoRestriction.RestrictionType).toEqual('whitelist')
    expect(b.Locations).toContain('GB')
    expect(b.Locations).toHaveLength(29)
  })

  test('Americas', () => {
    const a = restrictionsConfig({ whitelist: region.Americas() }) as ICdnGeoRestrictions
    const b = a.Restrictions.GeoRestriction as ICdnGeoRestriction_listed
    expect(a.Restrictions.GeoRestriction.RestrictionType).toEqual('whitelist')
    expect(b.Locations).toContain('US')
    expect(b.Locations).toHaveLength(51)
  })

  test('Europe', () => {
    const a = restrictionsConfig({ whitelist: region.Europe() }) as ICdnGeoRestrictions
    const b = a.Restrictions.GeoRestriction as ICdnGeoRestriction_listed
    expect(a.Restrictions.GeoRestriction.RestrictionType).toEqual('whitelist')
    expect(b.Locations).toContain('NL')
    expect(b.Locations).toContain('IS')
    expect(b.Locations).toHaveLength(37)
  })

  test('Oceania', () => {
    const a = restrictionsConfig({
      whitelist: region.dedupe([...region.Oceania()])
    }) as ICdnGeoRestrictions
    const b = a.Restrictions.GeoRestriction as ICdnGeoRestriction_listed
    expect(a.Restrictions.GeoRestriction.RestrictionType).toEqual('whitelist')
    expect(b.Locations).toContain('AU')
    expect(b.Locations).toHaveLength(15)
  })

  test('All The "Not Implemented Yet"s', () => {
    const a1 = () => restrictionsConfig({ whitelist: region.Asia() }) as ICdnGeoRestrictions
    const a2 = () => restrictionsConfig({ whitelist: region.SouthAsia() }) as ICdnGeoRestrictions
    const a3 = () => restrictionsConfig({ whitelist: region.WesternAsia() }) as ICdnGeoRestrictions
    const a4 = () => restrictionsConfig({ whitelist: region.CentralAsia() }) as ICdnGeoRestrictions
    const a5 = () => restrictionsConfig({ whitelist: region.EastAsia() }) as ICdnGeoRestrictions
    const a6 = () =>
      restrictionsConfig({ whitelist: region.SoutheastAsia() }) as ICdnGeoRestrictions

    expect(a1).toThrow('Not Implemented Yet')
    expect(a2).toThrow('Not Implemented Yet')
    expect(a3).toThrow('Not Implemented Yet')
    expect(a4).toThrow('Not Implemented Yet')
    expect(a5).toThrow('Not Implemented Yet')
    expect(a6).toThrow('Not Implemented Yet')
  })
})
