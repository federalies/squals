"use strict";
/** @module S3Bucket */
Object.defineProperty(exports, "__esModule", { value: true });
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
var publicAccesConfig = function (_a) {
    var publicAclBlock = _a.publicAclBlock, pulicAclIgnore = _a.pulicAclIgnore, publicPolciy = _a.publicPolciy, publicBuckets = _a.publicBuckets;
    var config = {};
    if (publicAclBlock)
        config['BlockPublicAcls'] = publicAclBlock;
    if (publicPolciy)
        config['BlockPublicPolicy'] = publicPolciy;
    if (pulicAclIgnore)
        config['IgnorePublicAcls'] = pulicAclIgnore;
    if (publicBuckets)
        config['RestrictPublicBuckets'] = publicBuckets;
    return { PublicAccessBlockConfiguration: config };
};
exports.publicAccesConfig = publicAccesConfig;
