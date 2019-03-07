/** @module S3Bucket */
/**
 * AWS::S3: Make a destination.
 *
 * @description Make a Destination object.
 * @param opts - Config/option input.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-destination.html>
 * @example
 *  var dest = destination()
 */
export declare const destination: (config: InDestination) => {
    Destination: OutDestinationItem;
};
export interface InDestination {
    arn: string;
    prefix?: string;
    acctId?: string;
    format?: string;
}
export interface OutDestinationItem {
    BucketArn: string;
    Format: string;
    Prefix?: string;
    BucketAccountId?: string;
}
//# sourceMappingURL=destination.d.ts.map