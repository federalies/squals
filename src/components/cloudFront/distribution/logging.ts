/**
 * Title.
 *
 * @description asdasd.
 * @param _input
 * @example
 *  var l = loggingConfig({bucket:'mybucket'})
 */
export const loggingConfig = (_input: IcacheLogging): any => {
  const { bucket, cookies, prefix } = _input
  if (bucket === '') {
    throw new Error(`bucket name cannot be empty string`)
  } else {
    const ret: ICdnLogging = { Bucket: bucket }
    if ('cookies' in _input) ret['IncludeCookies'] = cookies
    if ('prefix' in _input) ret['Prefix'] = prefix
  }
  return true
}

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
