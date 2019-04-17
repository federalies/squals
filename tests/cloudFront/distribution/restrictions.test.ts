// @ts-nocheck

import {
  restrictionsConfig,
  ICdnGeoRestrictions
} from '../../../src/components/cloudFront/distribution/restrictions'
import {
  NorthAmericas,
  Americas,
  SouthAmericas,
  SouthAsia,
  CentralAmericas,
  CanadaPlusUSA,
  EUMembers,
  Oceania,
  SoutheastAsia,
  EastAsia,
  CentralAsia,
  Asia,
  WesternAsia,
  dedupe,
  Europe
} from '../../../src/components/cloudFront/distribution/restriction_enums'

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
    const a = restrictionsConfig({ whitelist: CanadaPlusUSA() })
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
    const a = restrictionsConfig({ blacklist: CanadaPlusUSA() })
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
    const a = restrictionsConfig({ whitelist: NorthAmericas() }) as ICdnGeoRestrictions
    expect(a.Restrictions.GeoRestriction.RestrictionType).toEqual('whitelist')
    expect(a.Restrictions.GeoRestriction.Locations).toContain('US')
    expect(a.Restrictions.GeoRestriction.Locations).toHaveLength(39)
  })

  test('South America', () => {
    const a = restrictionsConfig({ whitelist: SouthAmericas() }) as ICdnGeoRestrictions
    expect(a.Restrictions.GeoRestriction.RestrictionType).toEqual('whitelist')
    expect(a.Restrictions.GeoRestriction.Locations).toContain('BR')
    expect(a.Restrictions.GeoRestriction.Locations).toHaveLength(13)
  })

  test('Central America', () => {
    const a = restrictionsConfig({ whitelist: CentralAmericas() }) as ICdnGeoRestrictions
    expect(a.Restrictions.GeoRestriction.RestrictionType).toEqual('whitelist')
    expect(a.Restrictions.GeoRestriction.Locations).toContain('BZ')
    expect(a.Restrictions.GeoRestriction.Locations).toHaveLength(7)
  })

  test('EUMembers', () => {
    const a = restrictionsConfig({ whitelist: EUMembers() }) as ICdnGeoRestrictions
    expect(a.Restrictions.GeoRestriction.RestrictionType).toEqual('whitelist')
    expect(a.Restrictions.GeoRestriction.Locations).toContain('GB')
    expect(a.Restrictions.GeoRestriction.Locations).toHaveLength(29)
  })

  test('Americas', () => {
    const a = restrictionsConfig({ whitelist: Americas() }) as ICdnGeoRestrictions
    expect(a.Restrictions.GeoRestriction.RestrictionType).toEqual('whitelist')
    expect(a.Restrictions.GeoRestriction.Locations).toContain('US')
    expect(a.Restrictions.GeoRestriction.Locations).toHaveLength(51)
  })

  test('Europe', () => {
    const a = restrictionsConfig({ whitelist: Europe() }) as ICdnGeoRestrictions
    expect(a.Restrictions.GeoRestriction.RestrictionType).toEqual('whitelist')
    expect(a.Restrictions.GeoRestriction.Locations).toContain('NL')
    expect(a.Restrictions.GeoRestriction.Locations).toContain('IS')
    expect(a.Restrictions.GeoRestriction.Locations).toHaveLength(37)
  })

  test('Oceania', () => {
    const a = restrictionsConfig({ whitelist: dedupe([...Oceania()]) }) as ICdnGeoRestrictions
    expect(a.Restrictions.GeoRestriction.RestrictionType).toEqual('whitelist')
    expect(a.Restrictions.GeoRestriction.Locations).toContain('AU')
    expect(a.Restrictions.GeoRestriction.Locations).toHaveLength(15)
  })

  test('All The "Not Implemented Yet"s', () => {
    const a1 = () => restrictionsConfig({ whitelist: Asia() }) as ICdnGeoRestrictions
    const a2 = () => restrictionsConfig({ whitelist: SouthAsia() }) as ICdnGeoRestrictions
    const a3 = () => restrictionsConfig({ whitelist: WesternAsia() }) as ICdnGeoRestrictions
    const a4 = () => restrictionsConfig({ whitelist: CentralAsia() }) as ICdnGeoRestrictions
    const a5 = () => restrictionsConfig({ whitelist: EastAsia() }) as ICdnGeoRestrictions
    const a6 = () => restrictionsConfig({ whitelist: SoutheastAsia() }) as ICdnGeoRestrictions

    expect(a1).toThrow('Not Implemented Yet')
    expect(a2).toThrow('Not Implemented Yet')
    expect(a3).toThrow('Not Implemented Yet')
    expect(a4).toThrow('Not Implemented Yet')
    expect(a5).toThrow('Not Implemented Yet')
    expect(a6).toThrow('Not Implemented Yet')
  })
})
