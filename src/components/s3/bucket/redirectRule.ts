import * as url from 'url'

/** @module S3Bucket */

/**
 * RedirRule makes a valid cloudformation obj.
 *
 * @description AWS:S3:: Make a Redirection Rule Config for a WebsiteConfiguration.
 * @param param - Asd.
 * @param param.to  - The Destination url - where the path will be passed through or slighted altered.
 * @param param.when - String values are treated as server Status codes - numbers are treated as pathprefixes.
 * @param param.replacer - Looks for the `reqd.when` and replaces it in the path.
 * @param param.doFullReplace - Changes the mode to no longer slight modidy the path before redirection. Instead, it rewrites it.
 * @param param.ext.HttpRedirectCode - Feel free to pass in AWS-CFN-property names like `HttpRedirectCode`.
 * @example
 *  var output1 = redirRule({ to:'https://federali.es', when: '/docs' , replacer:'/documents', doFullReplace:true})
 *  var output2 = redirRule({ to:'https://federali.es', when: 404 })
 *  var output3 = redirRule({ to:'https://federali.es/', when: '/doc', replacer: '/docs', doFullReplace: true })
 */
export const redirRule = (param: InRedirRule): OutRouteRule => {
  const { to, when, replacer, doFullReplace, ext } = {
    to: '',
    when: '',
    replacer: '',
    ext: {},
    doFullReplace: false,
    ...param
  }

  if (to && when) {
    const uri = new url.URL(to)
    let ret: OutRouteRule = {
      RoutingRuleCondition:
        typeof when === 'number'
          ? { HttpErrorCodeReturnedEquals: when.toString() }
          : { KeyPrefixEquals: when.toString() },
      RedirectRule: {
        HttpRedirectCode: ext.HttpRedirectCode || '302',
        Protocol: uri.protocol.slice(0, -1),
        HostName: uri.hostname
      }
    }

    if (replacer && typeof when === 'string') {
      doFullReplace
        ? (ret.RedirectRule['ReplaceKeyWith'] = replacer)
        : (ret.RedirectRule['ReplaceKeyPrefixWith'] = replacer)
    }

    return ret
  } else {
    throw new Error(
      `ƒ.redirRule needs the "to" and "when" fields - but found ${{ to }} and ${{ when }} `
    )
  }
}

export interface InRedirRule {
  to: string
  when: string | number
  replacer?: string
  doFullReplace?: boolean
  ext?: { [key: string]: string }
  // HttpRedirectCode?: string throw in ext
}

export interface OutRule_wPrefixReplace {
  HostName?: string
  HttpRedirectCode?: string
  Protocol?: string
  ReplaceKeyPrefixWith?: string
  ReplaceKeyWith?: never
}

export interface OutRule_wFullReplace {
  HostName?: string
  HttpRedirectCode?: string
  Protocol?: string
  ReplaceKeyPrefixWith?: never
  ReplaceKeyWith?: string
}

export interface OutRouteRule {
  RedirectRule: OutRule_wFullReplace | OutRule_wPrefixReplace
  RoutingRuleCondition: {
    HttpErrorCodeReturnedEquals?: string
    KeyPrefixEquals?: string
  }
}
