import { IRef } from '../../Template'
import Url from 'url'

/**
 * Title.
 *
 * @description description
 * @param _input - Asd.
 * @example
 *  var o1 = originsConfig('http://federali.s3-website.us-east1.amazonaws.com')
 *  var o2 = originsConfig(['https://flickr.com', 'http://texas.craigslist.com/skis', 'https://orkut.com'])
 *  var o3 = originsConfig({bucket:'www.federali.es'})
 */
export const originsConfig = (_input: IcdnOriginInput): ICdnOrigins => {
  return { Origins: originsArrayConfig(_input) }
}

export const originsArrayConfig = (_input: IcdnOriginInput): ICdnOriginItem[] => {
  if (typeof _input === 'string') {
    return [originItem(_input, 0)]
  } else {
    if (Array.isArray(_input)) {
      return _input.map((origin, idx) => originItem(origin, idx))
    } else {
      return [originItem(_input, 0)]
    }
  }
}

export type IcdnInputItem = string | IcdnOriginItem
export type IcdnOriginInput = IcdnInputItem | IcdnInputItem[]

export const originBacktoString = (p: ICdnOriginItem): string => {
  if ('CustomOriginConfig' in p) {
    const protocol =
      p.CustomOriginConfig.OriginProtocolPolicy === 'http-only' ? 'http://' : 'https://'
    return protocol === 'http://'
      ? `${protocol}${p.DomainName}:${p.CustomOriginConfig.HTTPPort}${p.OriginPath}`
      : `${protocol}${p.DomainName}:${p.CustomOriginConfig.HTTPSPort}${p.OriginPath}`
  } else {
    // bucket info lost... best we can do is bucket URL..
    // put a user in there ??
    return `https://${p.DomainName}${p.OriginPath}`
  }
}

export const originItem = (_input: string | IcdnOriginItem, _index: number): ICdnOriginItem => {
  let uri: URL
  let ret: ICdnOriginItem

  if (typeof _input === 'string' || _input instanceof String) {
    try {
      uri =
        typeof _input === 'string'
          ? new Url.URL(_input)
          : new Url.URL((_input as IcdnOriginItem_http).url)
      ret = {
        Id: _index.toString(),
        DomainName: uri.hostname,
        CustomOriginConfig: {
          OriginProtocolPolicy:
            uri.protocol === 'http:' // needs the colon
              ? validCdnOriginPolicies.httpOnly
              : validCdnOriginPolicies.httpsOnly
        }
      }
      ret['OriginPath'] = uri.pathname && uri.pathname.length > 1 ? uri.pathname : '/index.html'
    } catch (e) {
      throw new Error(`the origin: ${_input} does not include an origin`)
    }
  } else if ('url' in _input) {
    // Item_http
    try {
      uri = new Url.URL(_input.url)
      ret = {
        Id: _index.toString(),
        DomainName: uri.hostname,
        CustomOriginConfig: {
          OriginProtocolPolicy:
            uri.protocol === 'http:' // needs the colon
              ? validCdnOriginPolicies.httpOnly
              : validCdnOriginPolicies.httpsOnly
        }
      }
      ret['OriginPath'] = uri.pathname && uri.pathname.length > 1 ? uri.pathname : '/index.html'
      if (_input.headers) {
        if (Array.isArray(_input.headers)) {
          let outbound_HdrList: ICdnOriginsCustomHeader[] = _input.headers.reduce(
            (p, c) => {
              return [
                ...p,
                ...Object.entries(c).map(([key, value]) => ({
                  HeaderName: key,
                  HeaderValue: value
                }))
              ]
            },
            [] as ICdnOriginsCustomHeader[]
          )
          ret['OriginCustomHeaders'] = outbound_HdrList
        } else {
          // pojo
          if (_input.headers) {
            let outbound_HdrList: ICdnOriginsCustomHeader[] = Object.entries(_input.headers).map(
              ([key, value]) => ({
                HeaderName: key,
                HeaderValue: value
              })
            )
            ret['OriginCustomHeaders'] = outbound_HdrList
          }
        }
      }
    } catch (e) {
      throw new Error(`the origin: ${_input} does not include an origin`)
    }
  } else if (_input.bucket) {
    // @see: <https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html>
    // @see: <https://stackoverflow.com/questions/50480924/regex-for-s3-bucket-name>
    var validBucketPattern = RegExp(
      '(?!^(d+.?)+$)(^(([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9]).)*([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])$)'
    )
    if (validBucketPattern.test(_input.bucket)) {
      uri = new Url.URL(`http://${_input.bucket}.s3.amazonaws.com`)
      ret = {
        Id: _index.toString(),
        DomainName: uri.hostname,
        S3OriginConfig: {}
      }
      if (_input.useId) ret['S3OriginConfig']['OriginAccessIdentity'] = _input.useId
    } else {
      throw new Error(
        `the origin: ${_input} is not a valid input - Please reference AWS documentation on valid bucket names: < https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html > '`
      )
    }
  } else {
    throw new Error(`the origin: ${_input} does not include an origin`)
  }

  return ret
}

export type IcdnOriginItem = IcdnOriginItem_s3 | IcdnOriginItem_http

interface IcdnOriginItem_s3 {
  bucket: string
  useId?: string | IRef
}

interface IcdnOriginItem_http {
  url: string
  headers?: { [key: string]: string } | { [key: string]: string }[]
  matchViewerSSl?: boolean
  portHTTP?: number
  portHTTPS?: number
  originSSLProto?: validSSLversions[] | validSSLversionsStrings[]
  readTimeout?: number
  keepAlive?: number
}

export interface ICdnOrigins_HTTP {
  Id: string // uniq constraint
  DomainName: string
  OriginCustomHeaders?: ICdnOriginsCustomHeader[]
  OriginPath?: string
  CustomOriginConfig: {
    OriginProtocolPolicy: validCdnOriginPolicies | validCdnOriginPolicyStrings
    HTTPPort?: number
    HTTPSPort?: number
    OriginKeepaliveTimeout?: number
    OriginReadTimeout?: number
    OriginSSLProtocols?: validSSLversions[] | validSSLversionsStrings[]
  }
}

interface ICdnOrigins_S3 {
  Id: string
  DomainName: string
  OriginCustomHeaders?: ICdnOriginsCustomHeader[]
  OriginPath?: string
  S3OriginConfig: {
    OriginAccessIdentity?: string | IRef
  }
}

export interface ICdnOriginsCustomHeader {
  HeaderName: string
  HeaderValue: string
}

export type ICdnOriginItem = ICdnOrigins_HTTP | ICdnOrigins_S3

export interface ICdnOrigins {
  Origins: ICdnOriginItem[]
}

export type validCdnOriginPolicyStrings = 'http-only' | 'match-viewer' | 'https-only'
export enum validCdnOriginPolicies {
  httpOnly = 'http-only',
  matchViewer = 'match-viewer',
  httpsOnly = 'https-only'
}

export type validSSLversionsStrings = 'SSLv3' | 'TLSv1' | 'TLSv1.1' | 'TLSv1.2'
export enum validSSLversions {
  'SSLv3' = 'SSLv3',
  'TLSv1' = 'TLSv1',
  'TLSv1.1' = 'TLSv1.1',
  'TLSv1.2' = 'TLSv1.2'
}
