/**
 * @module CloudFrontCDN
 */

/**
 * Title.
 *
 * @description asdasd.
 * @param _input
 * @example
 *  var l = loggingConfig({bucket:'mybucket'})
 */
export const loggingConfig = (_input: IcdnLoggingInput = {}): { Logging: ICdnLogging } | object => {
  if ('bucket' in _input) {
    const { bucket, cookies, prefix } = _input
    const ret: ICdnLogging = { Bucket: bucket }
    if ('cookies' in _input) ret['IncludeCookies'] = cookies
    if ('prefix' in _input) ret['Prefix'] = prefix
    return { Logging: ret }
  } else {
    return {}
  }
}

export type IcdnLoggingInput = IcacheLogging | object

export interface IcacheLogging {
  bucket: string
  cookies?: boolean
  prefix?: string
}
export interface ICdnLogging {
  Bucket: string
  IncludeCookies?: boolean
  Prefix?: string
}
