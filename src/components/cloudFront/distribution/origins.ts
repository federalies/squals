import { IRef } from '../../Template'

export const originsConfig = (param: any = {}): any => {
  return true
}

interface IcdnOrigins {
  id?: string // autogen?
  domain: string
}

interface ICDNOrigins_HTTP {
  DomainName: string
  Id: string // uniq constraint
  OriginCustomHeaders?: ICDNOriginsCustomHeader[]
  OriginPath?: string
  CustomOriginConfig: {
    OriginProtocolPolicy: _CDNPolicies
    HTTPPort?: number
    HTTPSPort?: number
    OriginKeepaliveTimeout?: number
    OriginReadTimeout?: number
    OriginSSLProtocols?: string[]
  }
}

interface ICDNOrigins_S3 {
  DomainName: string
  Id: string
  S3OriginConfig: {
    OriginAccessIdentity?: IRef
  }
  OriginCustomHeaders?: ICDNOriginsCustomHeader[]
  OriginPath?: string
}

export enum _CDNPolicies {
  httpOnly = 'http-only',
  matchViewer = 'match-viewer',
  httpsOnly = 'https-only'
}

export type ICDNOrigins = ICDNOrigins_HTTP | ICDNOrigins_S3

export interface ICDNOriginsCustomHeader {
  HeaderName: string
  HeaderValue: string
}
