import { IRef } from '../../Template'

/**
 * Title.
 *
 * @description some geat description
 * @param param
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-distribution-viewercertificate.html>
 * @example
 *  var default = viewerCertConfig()
 *  console.log(default) // { CloudFrontDefaultCertificate: true, MinimumProtocolVersion: 'TLSv1.1_2016', SslSupportMethod: 'sni-only' }
 *
 *  var acmCert = getMyCert()
 *  var ACM = viewerCertConfig({ acmCert })
 *  console.log(ACM) // { AcmCertificateArn: 'arn:aws:acm::somegreatSttingvalue',MinimumProtocolVersion: 'TLSv1.2_2018',SslSupportMethod: 'sni-only' }
 */
export const viewerCertConfig = (_input: IcdnViewerCert = {}): any => {
  if (_input.acm) {
    return {
      AcmCertificateArn: _input.acm,
      ..._sslType(_input),
      ..._minProto(_input)
    }
  }
  if (_input.iam) {
    return {
      IamCertificateId: _input.iam,
      ..._sslType(_input),
      ..._minProto(_input)
    }
  } else {
    const ret: ICdnViewerCert_CF = { CloudFrontDefaultCertificate: true }
    return {
      CloudFrontDefaultCertificate: true,
      ..._sslType(_input),
      ..._minProto(_input)
    }
  }
}

// exported for unit tests
export const _sslType = (
  _input: { sslType?: validSSLMethods },
  _default: validSSLMethods = validSSLMethods.sni
) => {
  if (_input.sslType) {
    return { SslSupportMethod: _input.sslType }
  } else {
    return { SslSupportMethod: _default }
  }
}

// exported for unit tests
export const _minProto = (
  _input: { minProto?: validMinTLSProto },
  _default: validMinTLSProto = validMinTLSProto['TLSv1.2_2018']
) => {
  if (_input.minProto) {
    return { MinimumProtocolVersion: _input.minProto }
  } else {
    return { MinimumProtocolVersion: _default }
  }
}

export interface IcdnViewerCert {
  acm?: string | IRef
  iam?: string | IRef
  minProto?: validMinTLSProto
  sslType?: validSSLMethods
}

export enum validSSLMethods {
  'sni' = 'sni-only',
  'vip' = 'vip'
}

export enum validMinTLSProto {
  'SSLv3' = 'SSLv3',
  'TLSv1' = 'TLSv1',
  'TLSv1_2016' = 'TLSv1_2016',
  'TLSv1.1_2016' = 'TLSv1.1_2016',
  'TLSv1.2_2018' = 'TLSv1.2_2018'
}

export type ICdnViewerCert = ICdnViewerCert_ACM | ICdnViewerCert_CF | ICdnViewerCert_IAM

export interface ICdnViewerCert_ACM {
  AcmCertificateArn: String | IRef
  MinimumProtocolVersion?: validMinTLSProto
  SslSupportMethod?: 'sni-only' | 'vip'
}

export interface ICdnViewerCert_IAM {
  IamCertificateId: String | IRef
  MinimumProtocolVersion?: validMinTLSProto
  SslSupportMethod?: 'sni-only' | 'vip'
}

export interface ICdnViewerCert_CF {
  CloudFrontDefaultCertificate: boolean
  MinimumProtocolVersion?: validMinTLSProto
  SslSupportMethod?: 'sni-only' | 'vip'
}
