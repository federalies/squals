"use strict";
/** @module S3Bucket */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * AWS::S3: Make a destination.
 *
 * @description Make a Destination object.
 * @param opts - Config/option input.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-destination.html>
 * @example
 *  var dest = destination()
 */
exports.destination = function (config) {
    var arn = config.arn, format = config.format, acctId = config.acctId, prefix = config.prefix;
    var ret;
    if (arn) {
        if (format && ['CSV', 'ORC', 'Parquet'].includes(format)) {
            ret = {
                Destination: {
                    BucketArn: arn.toString(),
                    Format: format || 'CSV'
                }
            };
        }
        else {
            throw new Error("\u0192.destination param of 'format' has valid values of CSV + ORC + Parquet - found: " + format);
        }
    }
    else {
        throw new Error('ƒ.destination requires an `arn` param');
    }
    if (acctId)
        ret.Destination['BucketAccountId'] = acctId;
    if (prefix)
        ret.Destination['Prefix'] = prefix;
    return ret;
};
