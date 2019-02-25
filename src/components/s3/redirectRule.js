const url = require('url')

/**
 * RedirRule makes a valid cloudformation obj.
 *
 * @description AWS:S3:: Make a Redirection Rule Config for a WebsiteConfiguration.
 * @param {Object} reqd - Asd.
 * @param {string} reqd.to  - the Destination url - where the path will be passed through or slighted altered.
 * @param {string|number} reqd.when - String values are treated as server Status codes - numbers are treated as pathprefixes.
 * @param {Object} opts - Asd.
 * @param {string} [opts.replacer=null] - looks for the `reqd.when` and replaces it in the path
 * @param {string} [opts.doFullReplace=false] - changes the mode to no longer slight modidy the path before redirection. Instead, it rewrites it.
 * @param  {...Object} reachin - Extion object that can be updated to incorporate deeper
 * @param  {string} [reachin.HttpRedirectCode='302'] - feel free to pass in AWS-CFN-property names like `HttpRedirectCode`
 * @example
 *  var output1 = redirRule({ to: `https://otherdomain.com`, when: '/docs' }, {replacer:'/documents', doFullReplace:true})
 *  var output2 = redirRule({ to: `https://otherdomain.com`, when: 404 })
 *  var output3 = redirRule({ to: `https://otherdomain.com/`, when: '/doc' },{ replacer: '/docs', doFullReplace: true })
 *  console.log({ output1,output2,output3 })
 * @returns {object} cloudoformation object.
 */

const redirRule = (
  { to: desturl, when: cond },
  { replacer, doFullReplace } = { replacer: null, doFullReplace: false },
  ...opts
) => {
  const uri = new url.URL(desturl)
  let condition = {}
  let destination = {
    RedirectRule: {
      HttpRedirectCode: opts.HttpRedirectCode || '302',
      Protocol: uri.protocol,
      HostName: uri.hostname
    }
  }
  if (!Number.isSafeInteger(cond) && replacer) {
    doFullReplace
      ? (destination.RedirectRule['ReplaceKeyWith'] = replacer)
      : (destination.RedirectRule['ReplaceKeyPrefixWith'] = replacer)
  }
  if (Number.isSafeInteger(cond)) {
    condition = {
      RoutingRuleCondition: { HttpErrorCodeReturnedEquals: `${cond}` }
    }
  } else {
    condition = { RoutingRuleCondition: { KeyPrefixEquals: `${cond}` } }
  }
  return { ...condition, ...destination }
}

export { redirRule }
