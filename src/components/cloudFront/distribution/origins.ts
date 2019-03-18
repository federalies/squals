import { IRef } from '../../Template'
import Url from 'url'

/**
 * Title.
 *
 * @description description
 * @param _input -
 * @example
 *  var o1 = originsConfig('http://federali.s3-website.us-east1.amazonaws.com')
 *  var o2 = originsConfig(['https://flickr.com', 'http://texas.craigslist.com/skis', 'https://orkut.com'])
 */
export const originsConfig = (_input: string | string[] | IoriginItem[]): ICdnOrigins => {
  if (typeof _input === 'string') {
    return { Origins: [originItem(_input, 0)] }
  } else {
    const _in = _input as string[]
    return { Origins: _in.map((origin, idx) => originItem(origin, idx)) }
  }
}

export const originItem = (_input: string | IoriginItem, _index: number): ICdnOriginItem => {
  let uri: URL
  let ret: ICdnOriginItem
  let isBUcket: boolean = false
  try {
    if (typeof _input === 'string') {
      uri = new Url.URL(_input)
    } else {
      if ('url' in _input) {
        uri = new Url.URL(_input.url)
      } else {
        uri = new Url.URL(`http://${_input.bucket}.amazonqqq`) // @todo research this
      }
    }
  } catch (e) {
    throw new Error(`the origin: ${_input} does not include an origin`)
  }

  if (isBUcket) {
    ret = {
      Id: _index.toString(),
      DomainName: uri.hostname,
      CustomOriginConfig: {
        OriginProtocolPolicy: validCdnOriginPolicies.httpOnly
      }
    }
  } else {
    ret = {
      Id: _index.toString(),
      DomainName: uri.hostname,
      CustomOriginConfig: {
        OriginProtocolPolicy: validCdnOriginPolicies.httpOnly
      }
    }
  }

  return ret
}

export type IoriginItem = IoriginItem_s3 | IoriginItem_http

interface IoriginItem_s3 {
  bucket: string
  region?: string
  useId?: string | IRef
  headers?: string[]
  matchViewerSSl?: boolean
  portHTTP?: number
  portHTTPS?: number
  originSSLProto?: validSSLprotocols[]
  readTimeout?: number
  keepAlive?: number
}

interface IoriginItem_http {
  url: string
  headers?: string[]
  matchViewerSSl?: boolean
  portHTTP?: number
  portHTTPS?: number
  originSSLProto?: validSSLprotocols[]
  readTimeout?: number
  keepAlive?: number
}

interface ICdnOrigins_HTTP {
  Id: string // uniq constraint
  DomainName: string
  OriginCustomHeaders?: ICdnOriginsCustomHeader[]
  OriginPath?: string
  CustomOriginConfig: {
    OriginProtocolPolicy: validCdnOriginPolicies
    HTTPPort?: number
    HTTPSPort?: number
    OriginKeepaliveTimeout?: number
    OriginReadTimeout?: number
    OriginSSLProtocols?: validSSLprotocols[]
  }
}

interface ICdnOrigins_S3 {
  Id: string
  DomainName: string
  S3OriginConfig: {
    OriginAccessIdentity?: string | IRef
  }
  OriginCustomHeaders?: ICdnOriginsCustomHeader[]
  OriginPath?: string
}

export interface ICdnOriginsCustomHeader {
  HeaderName: string
  HeaderValue: string
}

export type ICdnOriginItem = ICdnOrigins_HTTP | ICdnOrigins_S3

export interface ICdnOrigins {
  Origins: ICdnOriginItem[]
}

export enum validCdnOriginPolicies {
  httpOnly = 'http-only',
  matchViewer = 'match-viewer',
  httpsOnly = 'https-only'
}

export enum validSSLprotocols {
  'SSLv3' = 'SSLv3',
  'TLSv1' = 'TLSv1',
  'TLSv1.1' = 'TLSv1.1',
  'TLSv1.2' = 'TLSv1.2'
}
