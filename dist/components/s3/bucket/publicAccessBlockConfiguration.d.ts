/** @module S3Bucket */
/**
 * Public Access Condfig.
 *
 * @description specifies the public access configuration for an Amazon S3 bucket.
 * @param {Object} param - Object with 4 valid key/properties.
 * @param {!boolean} param.publicAclBlock  - Should S3 reject public ACLs for this bucket.
 * @param {!boolean} param.pulicAclIgnore  - Should S3 ignore public ACLs for this bucket.
 * @param {!boolean} param.publicPolciy  - Should S3 block public bucket policies for this bucket.
 * @param {!boolean} param.publicBuckets  - Should S3 lock down public bucket policies for this bucket.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-publicaccessblockconfiguration.html>
 * @returns {{PublicAccessBlockConfiguration: Object}} An `PublicAccessBlockConfiguration` property.
 * @example
 *  var a = publicAccesConfig({publicAclBlock: true,  pulicAclIgnore:true, publicPolciy:true, publicBuckets:true})
 */
declare const publicAccesConfig: ({ publicAclBlock, pulicAclIgnore, publicPolciy, publicBuckets }: {
    publicAclBlock: any;
    pulicAclIgnore: any;
    publicPolciy: any;
    publicBuckets: any;
}) => {
    PublicAccessBlockConfiguration: {};
};
export { publicAccesConfig };
//# sourceMappingURL=publicAccessBlockConfiguration.d.ts.map