import { IGetAtt, IRef } from '../../Template'

export const cacheBehaviorsConfig = (
  param: IcdnCaheBehavior | IcdnCaheBehavior[] | null | undefined
): { CacheBehaviors: ICdnCaheBehavior[] } | object => {
  if (Array.isArray(param)) {
    return { CacheBehaviors: cacheBehaviorsConfigData(param) }
  } else if (param) {
    return { CacheBehaviors: cacheBehaviorsConfigData(param) }
  } else {
    return {} as object
  }
}

export const cacheBehaviorsConfigData = (
  param: IcdnCaheBehavior | IcdnCaheBehavior[]
): ICdnCaheBehavior[] => {
  return Array.isArray(param)
    ? param.map(v => cacheBehaviorItem(v) as ICdnCaheBehavior)
    : [cacheBehaviorItem(param) as ICdnCaheBehavior]
}

export const cacheDefaultBehaviorConfig = (
  p: IcdnCacheDefaultBehavior = { id: '0' }
): ICdnCacheDefaultBehaviorConfig => {
  return { DefaultCacheBehavior: cacheBehaviorItem(p) as ICdnCacheDefaultBehavior }
}

export const cacheBehaviorItem = (
  param: IcdnCaheBehavior | IcdnCacheDefaultBehavior
): ICdnCaheBehavior | ICdnCacheDefaultBehavior => {
  let ret: any = {}
  if (param.allowedMethods) {
    ret['AllowedMethods'] = param.allowedMethods.toUpperCase().split('|')
  }
  if (param.cachedMethods) ret['CachedMethods'] = param.cachedMethods.toUpperCase().split('|')
  if (param.lambdas) ret['LambdaFunctionAssociations'] = param.lambdas
  if (param.defaultTTL) ret['DefaultTTL'] = param.defaultTTL
  if (param.maxTTL) ret['MaxTTL'] = param.maxTTL
  if (param.minTTL) ret['MinTTL'] = param.minTTL
  if (param.smoothStreaming) ret['SmoothStreaming'] = param.smoothStreaming
  if (param.trustedSigners) ret['TrustedSigners'] = param.trustedSigners
  if ('compress' in param) {
    ret['Compress'] = param.compress
  } else {
    ret['Compress'] = true
  }

  if ('fieldLevelEncryptionId' in param) {
    ret['FieldLevelEncryptionId'] = param.fieldLevelEncryptionId
  } else {
    ret['FieldLevelEncryptionId'] = ''
  }

  if ('path' in param) {
    ret = {
      TargetOriginId: param.id,
      ViewerProtocolPolicy: param.inboundTrafficPolicy
        ? param.inboundTrafficPolicy
        : 'redirect-to-https',
      ForwardedValues: forwardValues(param.fwd),
      PathPattern: param.path
    }
    return ret as ICdnCaheBehavior
  } else {
    ret = {
      TargetOriginId: param.id,
      ViewerProtocolPolicy: param.inboundTrafficPolicy
        ? param.inboundTrafficPolicy
        : 'redirect-to-https',
      ForwardedValues: forwardValues(param.fwd)
    }
    return ret as ICdnCacheDefaultBehavior
  }
}

const forwardValues = (fwd: IfwdVals = {}): IForwardValues => {
  // set defaults
  const { querystring } = { querystring: true, ...fwd }
  let ret: IForwardValues = { QueryString: querystring }

  if (fwd.headers) ret['Headers'] = fwd.headers
  if (fwd.querystringCacheKeys) ret['QuerystringCacheKeys'] = fwd.querystringCacheKeys
  if (fwd.cookies) {
    if (fwd.cookies === 'none') {
      ret['Cookies'] = { Forward: 'none' }
    } else if (fwd.cookies === 'all') {
      ret['Cookies'] = { Forward: 'all' }
    } else if (Array.isArray(fwd.cookies)) {
      ret['Cookies'] = { Forward: 'whitelist', WhitelistedNames: fwd.cookies }
    }
  }
  return ret
}

interface IfwdVals {
  querystring?: boolean // default to ON
  headers?: string[] //  to forward_All headers = ['*']
  querystringCacheKeys?: string[] // example: six jacket combos but pictures only show color changes... cache the `color` and not the `size`
  cookies?: 'none' | 'all' | string[] // saves the string[] into the whitelistNames
}
interface IForwardValues {
  QueryString: boolean // default to ON
  Headers?: string[] //  to forward_All headers = ['*']
  QuerystringCacheKeys?: string[] // six jacket combos but pictures only show color changes... cache the `color` and not the `size`
  Cookies?: {
    Forward: 'none' | 'all' | 'whitelist'
    WhitelistedNames?: string[] // only if whitelist
  }
}

export interface IcdnCacheDefaultBehavior {
  id: string // is a REF to the orign property - must be consistent
  inboundTrafficPolicy?: 'allow-all' | 'redirect-to-https' | 'https-only'
  fwd?: IfwdVals
  allowedMethods?: validCdnAllowedMethodSet
  cachedMethods?: validCdnCacheableMethodSet
  compress?: boolean // default to ON
  fieldLevelEncryptionId?: string // defaults to '' @help poorly documented @see <https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CreateFieldLevelEncryptionConfig.html>
  lambdas?: ICdnLambdaFunctionAssociation[]
  defaultTTL?: number // units:seconds
  maxTTL?: number // default: 31536000 (1year)
  minTTL?: number // postive
  smoothStreaming?: boolean // starts as OFF
  trustedSigners?: string[] // A list of AWS accounts that can create signed URLs in order to access private content.
}
export interface IcdnCaheBehavior extends IcdnCacheDefaultBehavior {
  path: string
}

// @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-distribution-cachebehavior.html#cfn-cloudfront-distribution-cachebehavior-viewerprotocolpolicy>
export interface ICdnCacheDefaultBehavior {
  TargetOriginId: string // is a REF to the orign property - must be consistent
  ViewerProtocolPolicy: 'allow-all' | 'redirect-to-https' | 'https-only'
  ForwardedValues: IForwardValues
  AllowedMethods?: string[]
  CachedMethods?: string[] // see enum first 2 values
  Compress?: boolean // default to ON
  FieldLevelEncryptionId?: string // defaults to '' @help poorly documented @see <https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CreateFieldLevelEncryptionConfig.html>
  LambdaFunctionAssociations?: ICdnLambdaFunctionAssociation[]
  DefaultTTL?: number // units:seconds
  MaxTTL?: number // default: 31536000 (1year)
  MinTTL?: number // postive
  SmoothStreaming?: boolean // starts as OFF
  TrustedSigners?: string[] // A list of AWS accounts that can create signed URLs in order to access private content. @todo better understanding needed
}

export interface ICdnCaheBehavior extends ICdnCacheDefaultBehavior {
  PathPattern: string
}

export interface ICdnCacheDefaultBehaviorConfig {
  DefaultCacheBehavior: ICdnCacheDefaultBehavior
}

export interface IcdnLambdaFunction {
  event?: validCdnEvents
  lambda?: string | IGetAtt | IRef
}

export interface ICdnLambdaFunctionAssociation {
  EventType?: validCdnEvents
  LambdaFunctionARN?: string | IGetAtt | IRef
}

export interface ICdnCacheBehaviors {
  CacheBehaviors: ICdnCaheBehavior[]
}

export enum validCdnEvents {
  viewerRequest = 'viewer-request',
  viewerResponse = 'viewer-response',
  originRequest = 'origin-request',
  originResponse = 'origin-response'
}

export enum validCdnAllowedMethodSet {
  HeadGet = 'HEAD|GET',
  HeadGetOpts = 'HEAD|GET|OPTIONS',
  All = 'HEAD|GET|OPTIONS|POST|PUT|DELETE|PATCH'
}

export enum validCdnCacheableMethodSet {
  HeadGet = 'HEAD|GET',
  HeadGetOpts = 'HEAD|GET|OPTIONS'
}
