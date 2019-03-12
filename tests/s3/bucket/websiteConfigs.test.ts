import { S3Bucket, websiteConfig } from '../../../src/components/s3/bucket'

describe('website', () => {
  const noop = (input: any) => {
    return input
  }
  test.skip('sdsd', () => {
    const myB = new S3Bucket()
    noop(myB)
  })
})

describe('Website Default Configuration Options', () => {
  // const Import = require('esm')(module)

  test.skip('1. Website Bare Default', () => {
    const wc = websiteConfig()
    expect(wc).toEqual({
      WebsiteConfiguration: {
        IndexDocument: 'index.html',
        ErrorDocument: 'search.html'
      }
    })
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
              // ReplaceKeyPrefixWith: String,
              // ReplaceKeyWith: String
            }
          }
        ]
      }
    })
  })

  test.skip('3. Redirect-All Config', () => {
    const wcRedirAll = websiteConfig({ redir: 'https://federali.es' })
    // console.log(JSON.stringify(wcRedirAll, null, 2))
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
