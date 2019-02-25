import url from 'url'
import { redirRule } from './redirectRule'

/**
 *
 * AWS:S3:: Website Configuration.
 *
 * @description Make a Website Cofig
 * @param {Array.<Object>|string} redir - String: redirects all traffic to the `protocol://host` provided in the string - Array: goes in as redir rules.
 * @param {string} [indexpage='index.html'] - Asd.
 * @param {string} [errorpage='search.html'] - Asd.
 * @returns {Object} Cloudformation obj.
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
      const uri = url.URL(redir)
      return {
        WebsiteConfiguration: {
          IndexDocument: indexpage,
          ErrorDocument: errorpage,
          RedirectAllRequestsTo: {
            Protocol: uri.Protocol,
            HostName: uri.HostName
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
          const { to, when, replacer, doFullReplace } = { ...arg }
          return redirRule({ to, when }, { replacer, doFullReplace })
        })
      }
    }
  }
}

export { websiteConfig }
