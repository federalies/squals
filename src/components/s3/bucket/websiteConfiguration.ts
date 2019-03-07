import * as Url from 'url'
import { redirRule, OutRouteRule, InRedirRule } from './redirectRule'
import { isEmpty } from 'lodash-es'
/** @module S3Bucket */

/**
 * AWS:S3:: Website Configuration.
 *
 * @description Make a Website Cofig
 * @param param - Asd.
 * @param param.redir - String: redirects all traffic to the `protocol://host` provided in the string - Array: goes in as redir rules.
 * @param param.indexpage -'index.html'] - Asd.
 * @param param.errorpage -'search.html'] - Asd.
 * @returns  Cloudformation obj.
 * @todo BUILD Out better output type/interfaces showing Object shape/properties
 * @example
 *  var webcfgPlain = websiteConfig()
 *  var webcfgWRedirRules = websiteConfig({redir:[{when:'docs/', to:'squals.readthedocs.io/', replacer:'', doFullReplace:true}]})
 */
const websiteConfig = (param: inConfig): OutWebsiteConfig => {
  const { redir, indexpage, errorpage } = {
    redir: '',
    indexpage: 'index.html',
    errorpage: 'search.html',
    ...param
  }

  if (isEmpty(redir)) {
    return {
      WebsiteConfiguration: {
        IndexDocument: indexpage,
        ErrorDocument: errorpage
      }
    }
  } else if (Array.isArray(redir)) {
    // redirect is an Array of Rules

    // oh what if we pre-empt and pass
    return {
      WebsiteConfiguration: {
        IndexDocument: indexpage,
        ErrorDocument: errorpage,
        RoutingRules: redir.map(arg => {
          // @ts-ignore
          const { to, when, replacer, doFullReplace } = { ...arg }
          return redirRule({ to, when, replacer, doFullReplace })
        })
      }
    } // redirect is an Array of Rules
  } else {
    // redirect should be a URL
    try {
      const uri = new URL(redir)
      return {
        WebsiteConfiguration: {
          IndexDocument: indexpage,
          ErrorDocument: errorpage,
          RedirectAllRequestsTo: {
            Protocol: uri.protocol.slice(0, -1), // remove the colon from http(s):
            HostName: uri.hostname
          }
        }
      }
    } catch (err) {
      // invalid  redirALL
      console.log({ redir })
      console.error(err)
      throw new Error(
        `ƒ.websiteConfig was expects the field: redir to be - as a URL string starting with ` +
          `https(s) or an array of redir rules ` +
          `but instead the value for redir - is : ${redir}`
      )
    }
  }
}

interface inConfig {
  indexPage?: string
  errorPage?: string
  redir?: string | InRedirRule[]
}

interface OutWebsiteConfig {
  WebsiteConfiguration: OutWebsiteConfigElem
}

type OutWebsiteConfigElem =
  | OutWebsiteEnabled
  | OutWebsiteConfigRedirRules
  | OutWebsiteConfigRedirAll

interface OutWebsiteConfigRedirAll extends OutWebsiteEnabled {
  RedirectAllRequestsTo: { HostName: string; Protocol: string }
}

interface OutWebsiteConfigRedirRules extends OutWebsiteEnabled {
  RoutingRules: Array<OutRouteRule>
}

interface OutWebsiteEnabled {
  IndexDocument: string
  ErrorDocument: string
}

export { websiteConfig }
