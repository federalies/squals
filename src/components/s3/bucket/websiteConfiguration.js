import { Url } from 'url' // eslint-disable-line
import { redirRule } from './redirectRule'

/** @module S3Bucket */

/**
 * AWS:S3:: Website Configuration.
 *
 * @description Make a Website Cofig
 * @param {Array<Object>|string} redir - String: redirects all traffic to the `protocol://host` provided in the string - Array: goes in as redir rules.
 * @param {string} [indexpage='index.html'] - Asd.
 * @param {string} [errorpage='search.html'] - Asd.
 * @returns {Object} Cloudformation obj.
 * @todo BUILD Out better output type/interfaces showing Object shape/properties
 * @example
 *  var webcfgPlain = websiteConfig()
 *  var webcfgWRedir = websiteConfig([{when:'docs/', to:'squals.readthedocs.io/', replacer:'', doFullReplace:true}])
 */
const websiteConfig = (
  redir = null,
  indexpage = 'index.html',
  errorpage = 'search.html'
) => {
  if (!Array.isArray(redir)) {
    // redirect is a URL
    try {
      const uri = new URL(redir)
      return {
        WebsiteConfiguration: {
          IndexDocument: indexpage,
          ErrorDocument: errorpage,
          RedirectAllRequestsTo: {
            Protocol: uri.protocol,
            HostName: uri.hostname
          }
        }
      }
    } catch (err) {
      // NO redirects
      console.error(
        `within a WebsiteConfiguration - the param:< redir > ` +
          `was expected to be a valid URL or an array ` +
          `continuing with the redir param ignored. ` +
          ` @ref ${JSON.stringify({ redir })}`
      )
      return {
        WebsiteConfiguration: {
          IndexDocument: indexpage,
          ErrorDocument: errorpage
        }
      }
    }
  } else {
    // redirect is an Array of Rules
    return {
      WebsiteConfiguration: {
        IndexDocument: indexpage,
        ErrorDocument: errorpage,
        RoutingRules: redir.map(arg => {
          // add your defaults here in the { ...args }
          // add any other defaults for the `reachin` param
          // @ts-ignore
          const { to, when, replacer, doFullReplace } = { ...arg }
          return redirRule({ to, when, replacer, doFullReplace })
        })
      }
    }
  }
}

export { websiteConfig }
