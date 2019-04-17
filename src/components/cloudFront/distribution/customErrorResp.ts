import joi from 'joi'

/**
 * Title.
 *
 * @description asda.
 * @see <https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CustomErrorResponse.html>
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-distribution-customerrorresponse.html>
 * @param param - Asd.
 */
export const cutomErrorRespConfig = (
  p: IcacheErrResponseRules = {}
): { CustomErrorResponses: ICdnCustomErrorResp[] } => {
  // setup default
  let param: IcacheErrResponseRules
  if (Object.keys(p).length > 0) {
    param = { ...p }
  } else {
    param = {
      '400': { resPath: '*' },
      '500': { resPath: '*' }
    }
  }

  const isallValidInputErrorCodes = Object.keys(param).reduce((p, c) => {
    let k = Object.keys(c)[0]
    let v = Object.values(c)[0]
    return p && k in ['400', '403', '404', '405', '414', '500', '501', '502', '503', '504']
  }, true)

  if (!isallValidInputErrorCodes) {
    throw new Error('CDN Error Codes must match the list of approved Error Codes')
  }
  return { CustomErrorResponses: cutomErrorRespItems(param) }
}

/**
 * Ttile.
 *
 * @description desasd
 * @param p - Adaasd.
 * @example
 * var custErrResp = cutomErrorRespItem()
 */
export const cutomErrorRespItems = (p: IcacheErrResponseRules): ICdnCustomErrorResp[] => {
  return Object.entries(p).map(([key, ruleValue]) => {
    let ret: ICdnCustomErrorResp = {
      ErrorCode: Number(key)
    }

    if (ruleValue && ruleValue.errCacheSecs) {
      ret['ErrorCachingMinTTL'] = Number(ruleValue.errCacheSecs)
    }
    if (ruleValue && ruleValue.resCode) ret['ResponseCode'] = Number(ruleValue.resCode)
    if (ruleValue && ruleValue.resPath) ret['ResponsePagePath'] = ruleValue.resPath
    return ret
  })
}

export type errCodes = '400' | '403' | '404' | '405' | '414' | '500' | '501' | '502' | '503' | '504'
export type resCodes =
  | '200'
  | '400'
  | '403'
  | '404'
  | '405'
  | '414'
  | '500'
  | '501'
  | '502'
  | '503'
  | '504'

export type IcacheErrResponseRules = { [K in errCodes]?: IexpcacheErrResponseRules }

export interface IexpcacheErrResponseRules {
  resPath?: string // path * special case
  resCode?: resCodes
  errCacheSecs?: number
}

export type IcacheErrResponseRuleInputs = IcacheErrResponseRules

export interface ICdnCustomErrorResp {
  ErrorCode: number
  ErrorCachingMinTTL?: number
  ResponseCode?: number
  ResponsePagePath?: string
}
