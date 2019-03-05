const url = require('url')

/** @module S3Bucket */

/**
 * RedirRule makes a valid cloudformation obj.
 *
 * @description AWS:S3:: Make a Redirection Rule Config for a WebsiteConfiguration.
 * @param {Object} param - Asd.
 * @param {string} param.to  - The Destination url - where the path will be passed through or slighted altered.
 * @param {string|number} param.when - String values are treated as server Status codes - numbers are treated as pathprefixes.
 * @param {string} [param.replacer=null] - Looks for the `reqd.when` and replaces it in the path.
 * @param {string} [param.doFullReplace=false] - Changes the mode to no longer slight modidy the path before redirection. Instead, it rewrites it.
 * @param  {string} [param.HttpRedirectCode='302'] - Feel free to pass in AWS-CFN-property names like `HttpRedirectCode`.
 * @example
 *  var output1 = redirRule({ to:'https://otherdomain.com', when: '/docs' , replacer:'/documents', doFullReplace:true})
 *  var output2 = redirRule({ to:'https://otherdomain.com', when: 404 })
 *  var output3 = redirRule({ to:'https://otherdomain.com/', when: '/doc', replacer: '/docs', doFullReplace: true })
 * @returns {outRuleElem} Cloudoformation object.
 */
const redirRule = param => {
  // @ts-ignore
  const { to, when, replacer, doFullReplace, ...opts } = {
    to: null,
    when: null,
    replacer: null,
    doFullReplace: null,
    ...param
  }

  if (!to) {
    throw new Error(``)
  }

  if (!when) {
    throw new Error(``)
  }

  const desturl = to
  const cond = when

  const uri = new url.URL(desturl)
  let condition = {
    RoutingRuleCondition: Number.isSafeInteger(
      Number.parseInt(cond.toString(), 10)
    )
      ? { HttpErrorCodeReturnedEquals: cond.toString() }
      : { KeyPrefixEquals: cond.toString() }
  }
  let destination = {
    RedirectRule: {
      HttpRedirectCode: opts.HttpRedirectCode || '302',
      Protocol: uri.protocol,
      HostName: uri.hostname
    }
  }
  // @ts-ignore
  if (!Number.isSafeInteger(cond.toString()) && replacer) {
    doFullReplace
      ? (destination.RedirectRule['ReplaceKeyWith'] = replacer)
      : (destination.RedirectRule['ReplaceKeyPrefixWith'] = replacer)
  }
  // @ts-ignore

  return { ...condition, ...destination }
}

export { redirRule }

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

/**
 * Property 'RoutingRuleCondition' is missing in type
 * '{ RedirectRule: { HttpRedirectCode: string; Protocol: string; HostName: string; }; }'
 * but required in type 'outRuleElem'.
 */
