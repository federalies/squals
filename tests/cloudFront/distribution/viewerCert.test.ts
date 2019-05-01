// @ts-nocheck

import {
  viewerCertConfig,
  validMinTLSProto,
  IcdnViewerCert,
  validSSLMethods
} from '../../../src/components/cloudFront/distribution/viewerCertificate'
// import { validSSLversions } from '../../../src/components/cloudFront'

describe('origins', () => {
  test('Default Values', () => {
    const actual = viewerCertConfig()
    const expected = {
      CloudFrontDefaultCertificate: true,
      MinimumProtocolVersion: 'TLSv1.2_2018',
      SslSupportMethod: 'sni-only'
    }
    expect(actual).toEqual(expected)
  })

  test('Acm Input', () => {
    const acm = 'someString'
    const actual = viewerCertConfig({ acm })
    const expected = {
      AcmCertificateArn: acm,
      MinimumProtocolVersion: 'TLSv1.2_2018',
      SslSupportMethod: 'sni-only'
    }
    expect(actual).toEqual(expected)
  })

  test('Acm Input via IRef', () => {
    const acm = 'someString'
    const actual = viewerCertConfig({ acm: { Ref: 'someString' } })
    const expected = {
      AcmCertificateArn: { Ref: 'someString' },
      MinimumProtocolVersion: 'TLSv1.2_2018',
      SslSupportMethod: 'sni-only'
    }
    expect(actual).toEqual(expected)
  })

  test('Specific Acm Input', () => {
    const cert: IcdnViewerCert = {
      acm: 'someThingHere',
      minProto: validMinTLSProto['TLSv1.1_2016'],
      sslType: validSSLMethods.vip
    }
    const actual = viewerCertConfig(cert)
    const expected = {
      AcmCertificateArn: 'someThingHere',
      MinimumProtocolVersion: 'TLSv1.1_2016',
      SslSupportMethod: 'vip'
    }
    expect(actual).toEqual(expected)
  })

  test('IAM Input', () => {
    const iam = 'someString'
    const actual = viewerCertConfig({ iam })
    const expected = {
      IamCertificateId: iam,
      MinimumProtocolVersion: 'TLSv1.2_2018',
      SslSupportMethod: 'sni-only'
    }
    expect(actual).toEqual(expected)
  })

  test('IAM Input via IRef', () => {
    const iam = { Ref: 'someString' }
    const actual = viewerCertConfig({ iam })
    const expected = {
      IamCertificateId: iam,
      MinimumProtocolVersion: 'TLSv1.2_2018',
      SslSupportMethod: 'sni-only'
    }
    expect(actual).toEqual(expected)
  })
})
