/**
 * @module CloudFrontCDN
 */

/**
 * Setup Location Restrictions.
 *
 * @param _input
 * @description Setup GeoRestrictions on the CDN so that it is not available in various regions
 * @example
 * var noRestrictions = restrictionsConfig() // same as if no restrictions are setup
 * var restrictAllEUcuzGDPR = restrictionsConfig({blacklist:EUMembers()})
 * var allowAFewSpanishSpeakingCountries = restrictionsConfig({whitelist:['MX','ES','CO','AR','CL','EC', 'VE', 'PE']})
 */
export const restrictionsConfig = (_input: IcacheRestrictions = {}): ICdnGeoRestrictions => {
  if ('blacklist' in _input && 'whitelist' in _input) {
    throw new Error('For Geo Restictions on CDNs use only a blacklist or a whitelist ')
  } else if (_input.whitelist) {
    return restrict(_input.whitelist)
  } else if (_input.blacklist) {
    return restrict(_input.blacklist, 'blacklist')
  } else if (_input && Object.keys({ ..._input }).length === 0) {
    return allCountries()
  } else {
    console.warn(
      `You passed someting into the CDN restrictionsConfig but it was not what the funciton was expecting - you gave:${_input}` +
        `was expecting: an {}, or { [key: "whitelist" | "blacklist"] : string | string[] } \n` +
        `Giving you the benefit of the doubt... and nudging the output to a valid "no restictions"`
    )
    return allCountries()
  }
}

const allCountries = (): ICdnGeoRestrictions => {
  return {
    Restrictions: {
      GeoRestriction: {
        RestrictionType: 'none'
      }
    }
  }
}
const restrict = (
  countryList: string | string[],
  isaYesList: 'whitelist' | 'blacklist' = 'whitelist'
): ICdnGeoRestrictions => {
  return {
    Restrictions: {
      GeoRestriction: {
        RestrictionType: isaYesList === 'whitelist' ? 'whitelist' : 'blacklist',
        Locations: Array.isArray(countryList) ? countryList : new Array(countryList)
      }
    }
  }
}

export interface IcacheRestrictions {
  whitelist?: string | string[]
  blacklist?: string | string[]
}

export type ICdnGeoRestrictionData = ICdnGeoRestrictions_none | ICdnGeoRestriction_listed

export interface ICdnGeoRestrictions_none {
  RestrictionType: 'none'
}

export interface ICdnGeoRestriction_listed {
  RestrictionType: 'blacklist' | 'whitelist'
  Locations: string[]
}

export interface ICdnGeoRestrictions {
  Restrictions: {
    GeoRestriction: ICdnGeoRestrictionData
  }
}
