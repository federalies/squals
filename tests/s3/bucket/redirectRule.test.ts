// @ts-nocheck

import { redirRule } from '../../../src/components/s3/bucket'

// @todo `to` should be optional and it should reference the websiteURL of the current bucket

describe('defaults', () => {
  test('docs example', () => {
    const a = redirRule({ to: 'https://federali.es', when: '/docs' })
    const e = {
      RoutingRuleCondition: {
        KeyPrefixEquals: '/docs'
      },
      RedirectRule: {
        HttpRedirectCode: '302',
        Protocol: 'https',
        HostName: 'federali.es'
      }
    }
    expect(a).toEqual(e)
  })

  test('make a rewrite rule chagning URL requests for <url>/doc to be plural', () => {
    const a = redirRule({ to: 'https://federali.es', when: '/doc', replacer: '/docs' })
    const e = {
      RoutingRuleCondition: {
        KeyPrefixEquals: '/doc'
      },
      RedirectRule: {
        HttpRedirectCode: '302',
        Protocol: 'https',
        HostName: 'federali.es',
        ReplaceKeyPrefixWith: '/docs'
      }
    }
    expect(a).toEqual(e)
  })

  test('failure to call the redirRule funciton with `to` and `when` will throw an error ', () => {
    const input: any = { replacer: 'docs' }
    const a = () => redirRule(input)
    const e = {
      RoutingRuleCondition: {
        KeyPrefixEquals: '/doc'
      },
      RedirectRule: {
        HttpRedirectCode: '302',
        Protocol: 'https',
        HostName: 'federali.es',
        ReplaceKeyPrefixWith: '/docs'
      }
    }
    expect(a).toThrow()
  })

  // @todo
  // how to handle a rewrite rule that might help SPA authors
  // redirect all deeplinks to the idex page with the path
  // appended as a /#/asdasd or something else based on what router
  // they are using
  test('make a rewrite rule chagning URL requests for <url>/doc to something wholy different', () => {
    const a = redirRule({
      to: 'https://federali.es',
      when: '/docs',
      replacer: 'pagemoved.html',
      doFullReplace: true
    })
    const e = {
      RoutingRuleCondition: {
        KeyPrefixEquals: '/docs'
      },
      RedirectRule: {
        HttpRedirectCode: '302',
        Protocol: 'https',
        HostName: 'federali.es',
        ReplaceKeyWith: 'pagemoved.html'
      }
    }
    expect(a).toEqual(e)
  })

  test('docs server status code condition', () => {
    const a = redirRule({ to: 'https://federali.es', when: 404 })
    const e = {
      RoutingRuleCondition: {
        HttpErrorCodeReturnedEquals: '404'
      },
      RedirectRule: {
        HttpRedirectCode: '302',
        Protocol: 'https',
        HostName: 'federali.es'
      }
    }
    expect(a).toEqual(e)
  })
})
