// @ts-nocheck

import {
  CloudFrontCDN,
  ICdnGeoRestriction_listed
} from '../../../src/components/cloudFront/distribution'
import { EUMembers } from '../../../src/components/cloudFront/distribution/restriction_enums'

describe('CDN Targets', () => {
  const print = (data: any): void => {
    console.log(JSON.stringify(data, null, 2))
  }

  test('max defaults', () => {
    const a = new CloudFrontCDN({ origins: 'http://federli.es' })

    expect(a).toHaveProperty('Type', 'AWS::CloudFront::Distribution')
    expect(a).toHaveProperty('Properties')
    expect(a).toHaveProperty('Properties.DistributionConfig')
    expect(a).toHaveProperty('Properties.DistributionConfig.Origins', [
      {
        Id: '0',
        DomainName: 'federli.es',
        CustomOriginConfig: {
          OriginProtocolPolicy: 'http-only'
        },
        OriginPath: '/index.html'
      }
    ])
    expect(a).toHaveProperty('Properties.DistributionConfig.DefaultCacheBehavior', {
      TargetOriginId: '0',
      ViewerProtocolPolicy: 'redirect-to-https',
      ForwardedValues: {
        QueryString: true
      }
    })
    expect(a).toHaveProperty('Properties.DistributionConfig.CustomErrorResponses', [
      {
        ErrorCode: 400,
        ResponsePagePath: '*'
      },
      {
        ErrorCode: 500,
        ResponsePagePath: '*'
      }
    ])
    expect(a).toHaveProperty('Properties.DistributionConfig.CloudFrontDefaultCertificate', true)
    expect(a).toHaveProperty('Properties.DistributionConfig.SslSupportMethod', 'sni-only')
    expect(a).toHaveProperty('Properties.DistributionConfig.MinimumProtocolVersion', 'TLSv1.2_2018')
    expect(a).toHaveProperty('Properties.DistributionConfig.Enabled', true)
    expect(a).toHaveProperty('Properties.DistributionConfig.IPV6Enabled', true)
    expect(a).toHaveProperty('Properties.DistributionConfig.PriceClass', 'PriceClass_All')
    expect(a).toHaveProperty('Properties.DistributionConfig.DefaultRootObject', '/index.html')
  })

  test('specify CustomResponseErrors + GeoRestrictions', () => {
    const a = new CloudFrontCDN({
      origins: 'http://federli.es',
      errResp: { 400: { errCacheSecs: 200 } },
      restrictions: { blacklist: EUMembers() }
    })

    // print(a.Properties.DistributionConfig)
    // print(a.Properties.DistributionConfig.CustomErrorResponses)

    if (
      a.Properties.DistributionConfig.Restrictions &&
      'Locations' in a.Properties.DistributionConfig.Restrictions.GeoRestriction
    ) {
      let geoRestrictions = a.Properties.DistributionConfig.Restrictions
        .GeoRestriction as ICdnGeoRestriction_listed
      expect(geoRestrictions.Locations).toEqual(EUMembers())
    } else {
      expect(a.Properties.DistributionConfig.Restrictions).toHaveProperty(
        'GeoRestriction.RestrictionType'
      )
      expect(a.Properties.DistributionConfig.Restrictions).toHaveProperty(
        'GeoRestriction.Locations'
      )
    }

    expect(a).toHaveProperty(
      'Properties.DistributionConfig.Restrictions.GeoRestriction.RestrictionType'
    )
    expect(a).toHaveProperty('Properties.DistributionConfig.Restrictions.GeoRestriction.Locations')
    expect(a.Properties.DistributionConfig.CustomErrorResponses).toEqual([
      {
        ErrorCode: 400,
        ErrorCachingMinTTL: 200
      }
    ])
  })

  test('CDN Add Origin', () => {
    const myCDN = new CloudFrontCDN({ origins: 'http://federali.es' })
    myCDN.origins(['https://squals.js.org', 'http://federalies.js.org'])
    const updatedOrigins = [
      {
        DomainName: 'federali.es',
        CustomOriginConfig: {
          OriginProtocolPolicy: 'http-only'
        },
        OriginPath: '/index.html',
        Id: '0'
      },
      {
        DomainName: 'squals.js.org',
        CustomOriginConfig: {
          OriginProtocolPolicy: 'https-only'
        },
        OriginPath: '/index.html',
        Id: '1'
      },
      {
        DomainName: 'federalies.js.org',
        CustomOriginConfig: {
          OriginProtocolPolicy: 'http-only'
        },
        OriginPath: '/index.html',
        Id: '2'
      }
    ]
    expect(myCDN.Properties.DistributionConfig.Origins).toEqual(updatedOrigins)
  })

  test.skip('', () => {
    expect('').toEqual('')
  })

  test.skip('super fancy setups', () => {
    expect({}).toHaveProperty('', {})
    // use an origin access ID
    // maybe even a streaming Distribution if you want to be crazy
  })
})
