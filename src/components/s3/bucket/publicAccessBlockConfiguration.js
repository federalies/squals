/**
 * Public Access Condfig.
 *
 * @description specifies the public access configuration for an Amazon S3 bucket.
 * @param {*} param - Object with 4 valid key/properties.
 * @param {*} param.publicAclBlock  - Should S3 reject public ACLs for this bucket.
 * @param {*} param.pulicAclIgnore  - Should S3 ignore public ACLs for this bucket.
 * @param {*} param.publicPolciy  - Should S3 block public bucket policies for this bucket.
 * @param {*} param.publicBuckets  - Should S3 lock down public bucket policies for this bucket.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-publicaccessblockconfiguration.html>
 * @returns {Object} An `PublicAccessBlockConfiguration` property.
 * @example
 *  var a = publicAccesConfig({publicAclBlock: true,  pulicAclIgnore:true, publicPolciy:true, publicBuckets:true})
 */
const publicAccesConfig = ({
  publicAclBlock,
  pulicAclIgnore,
  publicPolciy,
  publicBuckets
}) => {
  let config = {}
  if (publicAclBlock) config['BlockPublicAcls'] = publicAclBlock
  if (publicPolciy) config['BlockPublicPolicy'] = publicPolciy
  if (pulicAclIgnore) config['IgnorePublicAcls'] = pulicAclIgnore
  if (publicBuckets) config['RestrictPublicBuckets'] = publicBuckets
  return { PublicAccessBlockConfiguration: config }
}
export { publicAccesConfig }
