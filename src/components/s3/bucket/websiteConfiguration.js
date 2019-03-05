import { Url } from 'url' // eslint-disable-line
import { redirRule } from './redirectRule'

/** @module S3Bucket */

/**
 * AWS:S3:: Website Configuration.
 *
 * @description Make a Website Cofig
 * @param {string|Array<Object>} redir - String: redirects all traffic to the `protocol://host` provided in the string - Array: goes in as redir rules.
 * @param {string} [indexpage='index.html'] - Asd.
 * @param {string} [errorpage='search.html'] - Asd.
 * @returns {outWebsiteConfig} Cloudformation obj.
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

/**
 * @typedef outWebsiteConfig
 * @type {Object}
 * @property {outWebsiteConfigElem} WebsiteConfiguration  -  sd..
 */

/**
 * @typedef outWebsiteConfigElem
 * @type {outWebsiteConfigNoRedirRules | outWebsiteConfigRedirAllElem | outWebsiteConfigRedirRules}
 */

/**
 * @typedef outWebsiteConfigRedirAllElem
 * @type {Object}
 * @property {string} ErrorDocument - asd.
 * @property {string} IndexDocument - asd.
 * @property {Object} RedirectAllRequestsTo - asd.
 * @property {Object} RedirectAllRequestsTo.HostName - asd.
 * @property {Object} RedirectAllRequestsTo.Protocol - asd.
 */

/**
 * @typedef outWebsiteConfigRedirRules
 * @type {Object}
 * @property {string} ErrorDocument -  sd - asd.
 * @property {string} IndexDocument - asd.
 * @property {Array<outRoutingRule>} RoutingRules - asd.
 */

/**
 * @typedef outWebsiteConfigNoRedirRules
 * @type {Object}
 * @property {string} ErrorDocument -  sd - asd.
 * @property {string} IndexDocument - asd.
 */

/**
 * @typedef outRoutingRule
 * @type {outRuleElem}
 */

/**
 * @typedef outRuleElem
 * @type {Object}
 * @property {Object} RedirectRule - asd
 * @property {string} RedirectRule.HostName - asd
 * @property {string} RedirectRule.HostName - asd
 * @property {string} RedirectRule.HttpRedirectCode - asd
 * @property {string} RedirectRule.Protocol - asd
 * @property {string} RedirectRule.ReplaceKeyPrefixWith - asd
 * @property {string} RedirectRule.ReplaceKeyWith - as
 * @property {Object} RoutingRuleCondition
 * @property {string} RoutingRuleCondition.HttpErrorCodeReturnedEquals
 * @property {string} RoutingRuleCondition.KeyPrefixEquals
 */

export { websiteConfig }
