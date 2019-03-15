/**
 * Title.
 *
 * @description asda.
 * @see <https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CustomErrorResponse.html>
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-distribution-customerrorresponse.html>
 * @param param - Asd.
 */
export const cutomErrorResp = (param: any = {}): any => {
  return true
}

type IcacheCustResp = IcacheCustomErrorResp | IcachePath2Err

export interface IcacheCustomErrorResp {
  errCode: number
  resPath: string
  resCode: string
}

export interface IcachePath2Err {
  [path: string]: number // error code
}

export interface ICdnCustomErrorResp {
  ErrorCachingMinTTL: number
  ErrorCode: number
  ResponseCode: number
  ResponsePagePath: string
}
