// @ts-nocheck

import { websiteConfig } from '../../../src/components/s3/bucket'

// describe('website', () => {
//   const noop = (input: any) => {
//     return input
//   }
//   test.skip('sdsd', () => {
//     const myB = new S3.Bucket()
//     noop(myB)
//   })
// })

describe('Website Default Configuration Options', () => {
  test('Website Config Defaults from JsDocs', () => {
    const actual = websiteConfig()
    const expected = {
      WebsiteConfiguration: {
        IndexDocument: 'index.html',
        ErrorDocument: 'search.html'
      }
    }
    expect(actual).toEqual(expected)
  })

  test('invalid redirect URL string', () => {
    const a = () => websiteConfig({ redir: 'notavlidIURL' })
    expect(a).toThrow()
  })

  test('redirect all to URL string', () => {
    const a = websiteConfig({ redir: 'https://federali.es' })
    const e = {
      WebsiteConfiguration: {
        IndexDocument: 'index.html',
        ErrorDocument: 'search.html',
        RedirectAllRequestsTo: {
          Protocol: 'https',
          HostName: 'federali.es'
        }
      }
    }
    expect(a).toEqual(e)
  })

  test('array of redirect rules', () => {
    const a = websiteConfig({ redir: [{ when: 'docs/', to: 'https://example.com' }] })
    const e = {
      WebsiteConfiguration: {
        IndexDocument: 'index.html',
        ErrorDocument: 'search.html',
        RoutingRules: [
          {
            RoutingRuleCondition: {
              KeyPrefixEquals: 'docs/'
            },
            RedirectRule: {
              HttpRedirectCode: '302',
              Protocol: 'https',
              HostName: 'example.com'
            }
          }
        ]
      }
    }
    expect(a).toEqual(e)
  })

  test.skip('2. Redirect Rule Config', () => {
    const wcRedirRule = websiteConfig({
      redir: [{ when: '/docs', to: 'https://federali.es' }]
    })
    expect(wcRedirRule).toEqual({
      WebsiteConfiguration: {
        IndexDocument: 'index.html',
        ErrorDocument: 'search.html',
        RoutingRules: [
          {
            RoutingRuleCondition: {
              KeyPrefixEquals: '/docs'
            },
            RedirectRule: {
              Protocol: 'https',
              HostName: 'federali.es',
              HttpRedirectCode: '302'
            }
          }
        ]
      }
    })
  })

  test.skip('3. Redirect-All Config', () => {
    const wcRedirAll = websiteConfig({ redir: 'https://federali.es' })

    expect(wcRedirAll).toEqual({
      WebsiteConfiguration: {
        IndexDocument: 'index.html',
        ErrorDocument: 'search.html',
        RedirectAllRequestsTo: {
          Protocol: 'https',
          HostName: 'federali.es'
        }
      }
    })
  })
})
