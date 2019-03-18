/**
 * Public Access Condfig.
 *
 * @description specifies the public access configuration for an Amazon S3 bucket.
 * @param param - Object with 4 valid key/properties.
 * @param param.publicAclBlock  - Should S3 reject public ACLs for this bucket.
 * @param param.pulicAclIgnore  - Should S3 ignore public ACLs for this bucket.
 * @param param.publicPolciy  - Should S3 block public bucket policies for this bucket.
 * @param param.publicBuckets  - Should S3 lock down public bucket policies for this bucket.
 * @todo add defaults to this function
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-publicaccessblockconfiguration.html>

 * @example
 *  var a = publicAccesConfig({publicAclBlock: true,  pulicAclIgnore:true, publicPolciy:true, publicBuckets:true})
 */
export const publicAccesConfig = (params: IbucketPublicAccessConfig) => {
  const { publicAclBlock, publicPolciy, pulicAclIgnore, publicBuckets } = params
  let config: IBucketPublicAccessConfig = {}
  if ('publicAclBlock' in params) config['BlockPublicAcls'] = publicAclBlock as boolean
  if ('publicPolciy' in params) config['BlockPublicPolicy'] = publicPolciy as boolean
  if ('pulicAclIgnore' in params) config['IgnorePublicAcls'] = pulicAclIgnore as boolean
  if ('publicBuckets' in params) config['RestrictPublicBuckets'] = publicBuckets as boolean

  return { PublicAccessBlockConfiguration: config }
}

export interface IbucketPublicAccessConfig {
  publicAclBlock?: boolean
  pulicAclIgnore?: boolean
  publicPolciy?: boolean
  publicBuckets?: boolean
}

export interface IBucketPublicAccessConfig {
  BlockPublicAcls?: boolean
  BlockPublicPolicy?: boolean
  IgnorePublicAcls?: boolean
  RestrictPublicBuckets?: boolean
}
