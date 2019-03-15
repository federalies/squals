import { _CDNPolicies } from './origins'

export const cacheBehaviorConfig = (param: any = {}): any => {
  return { CacheBehaviors: [] }
}

export const cacheBehavior = (p: any): any => {
  return {}
}

export interface IcacheBehavior {
  path: string
}

// @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-distribution-cachebehavior.html#cfn-cloudfront-distribution-cachebehavior-viewerprotocolpolicy>
export interface ICdnCaheBehavior {
  PathPattern: string
  TargetOriginId: string // is a REF to the orign property - must be consistent
  ViewerProtocolPolicy: _CDNPolicies
  ForwardedValues: {
    Querystring: boolean // default to ON
    Headers?: string[] //  to forward_All headers = ['*']
    QuerystringCacheKeys?: string[] // six jacket combos but pictures only show color changes... cache the `color` and not the `size`
    Cookies?: {
      Forward: 'none' | 'all' | 'whitelist'
      WhitelistedNames: string[] // only if whitelist
    }
  }
  AllowedMethods?: string[] // see enum
  CachedMethods?: string[] // see enum first 2 values
  Compress?: boolean // default to ON
  FieldLevelEncryptionId?: string // defaults to '' @help poorly documented @see <https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CreateFieldLevelEncryptionConfig.html>
  LambdaFunctionAssociations?: ICdnLambdaFunctionAssociation[]
  DefaultTTL?: number // units:seconds
  MaxTTL?: number // default: 31536000 (1year)
  MinTTL?: number // postive
  SmoothStreaming?: boolean // starts as OFF
  TrustedSigners?: string[] // A list of AWS accounts that can create signed URLs in order to access private content.
}

export enum validMethodSets {
  HeadGet = 'HEAD|GET',
  HeadGetOpts = 'HEAD|GET|OPTIONS',
  All = 'HEAD|GET|OPTIONS|POST|PUT|DELETE|PATCH'
}

export interface ICdnLambdaFunctionAssociation {
  EventType?: validCdnEvents
  LambdaFunctionARN?: string
}

export enum validCdnEvents {
  viewerRequest = 'viewer-request',
  viewerResponse = 'viewer-response',
  originRequest = 'origin-request',
  originResponse = 'origin-response'
}
