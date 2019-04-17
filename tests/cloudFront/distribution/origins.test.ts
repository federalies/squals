// @ts-nocheck

import {
  originsConfig,
  validSSLversions,
  ICdnOrigins_HTTP,
  validCdnOriginPolicies
} from '../../../src/components/cloudFront/distribution'

describe('origins', () => {
  test('String URL Origin', () => {
    const actual = originsConfig('http://federali.s3-website.us-east1.amazonaws.com')
    const expected = {
      Origins: [
        {
          Id: '0',
          DomainName: 'federali.s3-website.us-east1.amazonaws.com',
          OriginPath: '/index.html',
          CustomOriginConfig: { OriginProtocolPolicy: 'http-only' }
        }
      ]
    }
    expect(actual).toEqual(expected)
  })

  test('array of string URL', () => {
    const actual = originsConfig([
      'https://flickr.com',
      'https://dallas.craigslist.org/d/bicycles/search/bia',
      'http://www.orkut.com/index.html'
    ])
    const expected = {
      Origins: [
        {
          Id: '0',
          DomainName: 'flickr.com',
          OriginPath: '/index.html',
          CustomOriginConfig: { OriginProtocolPolicy: 'https-only' }
        },
        {
          Id: '1',
          DomainName: 'dallas.craigslist.org',
          OriginPath: '/d/bicycles/search/bia',
          CustomOriginConfig: { OriginProtocolPolicy: 'https-only' }
        },
        {
          Id: '2',
          DomainName: 'www.orkut.com',
          OriginPath: '/index.html',
          CustomOriginConfig: { OriginProtocolPolicy: 'http-only' }
        }
      ]
    }

    expect(actual).toEqual(expected)
  })

  test('array of urlObjs', () => {
    const actual = originsConfig([
      { url: 'https://www.federali.es', portHTTP: 80, portHTTPS: 443, matchViewerSSl: false },
      { url: 'https://www.federalies.com' }
    ])
    const expected = {
      Origins: [
        {
          Id: '0',
          DomainName: 'www.federali.es',
          OriginPath: '/index.html',
          CustomOriginConfig: { OriginProtocolPolicy: 'https-only' }
        },
        {
          Id: '1',
          DomainName: 'www.federalies.com',
          OriginPath: '/index.html',
          CustomOriginConfig: { OriginProtocolPolicy: 'https-only' }
        }
      ]
    }
    expect(actual).toEqual(expected)
  })

  test('mixed array', () => {
    const actual = originsConfig([
      { bucket: 'mybucket' },
      { url: 'https://www.federalies.com' },
      {
        url: 'https://www.federali.es',
        portHTTP: 80,
        portHTTPS: 443,
        headers: [{ someHeaderA: 'someValue' }, { someHeaderB: 'someValue' }],
        readTimeout: 300,
        keepAlive: 120,
        matchViewerSSl: true,
        originSSLProto: [validSSLversions.SSLv3, validSSLversions['TLSv1.2']]
      }
    ])
    const expected = {
      Origins: [
        {
          Id: '0',
          DomainName: 'mybucket.s3.amazonaws.com',
          S3OriginConfig: {}
        },
        {
          Id: '1',
          DomainName: 'www.federalies.com',
          OriginPath: '/index.html',
          CustomOriginConfig: { OriginProtocolPolicy: 'https-only' }
        },
        {
          Id: '2',
          DomainName: 'www.federali.es',
          OriginPath: '/index.html',
          CustomOriginConfig: { OriginProtocolPolicy: 'https-only' },
          OriginCustomHeaders: [
            {
              HeaderName: 'someHeaderA',
              HeaderValue: 'someValue'
            },
            {
              HeaderName: 'someHeaderB',
              HeaderValue: 'someValue'
            }
          ]
        }
      ]
    }
    expect(actual).toEqual(expected)
  })

  test('S3 Bucket Example', () => {
    const actual = originsConfig({ bucket: 'www.federali.es' })
    const expected = {
      Origins: [
        {
          Id: '0',
          DomainName: 'www.federali.es.s3.amazonaws.com',
          S3OriginConfig: {}
        }
      ]
    }
    expect(actual).toEqual(expected)
  })

  test('Simpliest Example', () => {
    const actual = originsConfig('https://federali.es')
    const expected = {
      Origins: [
        {
          Id: '0',
          DomainName: 'federali.es',
          OriginPath: '/index.html',
          CustomOriginConfig: {
            OriginProtocolPolicy: 'https-only'
          }
        }
      ]
    }
    expect(actual).toEqual(expected)
  })

  test('Bad URL String Example', () => {
    const actual = () => originsConfig('federali.es')
    expect(actual).toThrow()
  })

  test('Bad URL Object Example', () => {
    const actual = () => originsConfig({ url: 'federali.es' })
    expect(actual).toThrow()
  })

  test('Bad Bucket Name Example', () => {
    const actual = () => originsConfig({ bucket: 'user@federalies.com?someThingElse=badURI' })
    expect(actual).toThrow()
  })

  test('Invalid Input Shape Example', () => {
    const someBadVar: any = { someUnwantedKey: true }
    const actual = () => originsConfig(someBadVar)
    expect(actual).toThrow()
  })

  test('Specific Headers', () => {
    const actual = originsConfig({
      url: 'https://federali.es',
      headers: { orignAuthN: 'someValue', originAuthZ: 'otherValue' }
    })
    const e = {
      Origins: [
        {
          Id: '0',
          DomainName: 'federali.es',
          OriginPath: '/index.html',
          CustomOriginConfig: { OriginProtocolPolicy: validCdnOriginPolicies.httpsOnly },
          OriginCustomHeaders: [
            {
              HeaderName: 'orignAuthN',
              HeaderValue: 'someValue'
            },
            {
              HeaderName: 'originAuthZ',
              HeaderValue: 'otherValue'
            }
          ]
        }
      ]
    }
    expect(actual).toEqual(e)
  })
})
