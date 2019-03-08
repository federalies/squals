/** @module S3Bucket */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.publicAccesConfig = function (params) {
        var publicAclBlock = params.publicAclBlock, publicPolciy = params.publicPolciy, pulicAclIgnore = params.pulicAclIgnore, publicBuckets = params.publicBuckets;
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
});
