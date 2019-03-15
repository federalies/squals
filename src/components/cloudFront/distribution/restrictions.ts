export const restrictionsConfig = (_input: IcacheRestrictions = {}): ICdnRestrictions => {
  // default = none
  // whitelist:[]
  // blacklist:[]

  let { whitelist, blacklist } = _input

  if ('blacklist' in _input) {
    blacklist = Array.isArray(blacklist) ? blacklist : (new Array(blacklist) as string[])

    return {
      Restrictions: {
        GeoRestriction: {
          RestrictionType: 'blacklist',
          Locations: blacklist
        }
      }
    }
  } else if ('whitelist' in _input) {
    whitelist = Array.isArray(whitelist) ? whitelist : (new Array(blacklist) as string[])

    return {
      Restrictions: {
        GeoRestriction: {
          RestrictionType: 'whitelist',
          Locations: whitelist
        }
      }
    }
  } else {
    // default catch all
    return {
      Restrictions: {
        GeoRestriction: {
          RestrictionType: 'none'
        }
      }
    }
  }
}

export type IcacheRestrictions = IcacheRestrictions_yesList | IcacheRestrictions_noList

export interface IcacheRestrictions_yesList {
  whitelist?: string | string[]
  blacklist?: never
}

export interface IcacheRestrictions_noList {
  blacklist?: string | string[]
  whitelist?: never
}

export type ICdnRestrictions = ICdnRestrictions_allCountries | ICdnRestrictions_restricted

export interface ICdnRestrictions_allCountries {
  Restrictions: {
    GeoRestriction: {
      readonly RestrictionType: 'none'
      Locations?: string[]
    }
  }
}

export interface ICdnRestrictions_restricted {
  Restrictions: {
    GeoRestriction: {
      RestrictionType: 'blacklist' | 'whitelist'
      Locations: string[]
    }
  }
}
