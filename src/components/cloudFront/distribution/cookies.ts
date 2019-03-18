/**
 *
 * Title.
 *
 * @description desc.
 * @param _input
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-distribution-cookies.html>
 * @example
 * var c1 = cookiesConfig({cookies:['chocolate', 'sugar']}
 * var c2 = cookiesConfig({forward:'none'}
 * var c3 = cookiesConfig({forward:'all'}
 */
export const cookiesConfig = (_input: IcdnCookies): ICdnCookies => {
  if ('cookies' in _input) {
    return {
      Forward: 'whitelist',
      WhitelistedNames: _input.cookies
    }
  } else {
    return _input.forward === 'none'
      ? {
        Forward: 'none'
      }
      : {
        Forward: 'all'
      }
  }
}

export type IcdnCookies = IcdnCookies_list | IcdnCookies_universal

export interface IcdnCookies_list {
  cookies: string[]
}

export interface IcdnCookies_universal {
  forward: 'none' | 'all'
}

export interface ICdnCookies {
  Forward: string
  WhitelistedNames?: string[]
}
