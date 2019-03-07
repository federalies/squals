/** @module S3Bucket */
/**
 * AWS::S3:Bucket Tags.
 *
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param tagList - TagList  * asdasd.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
export declare const tags: (tagList: InTags | Array<InTags>) => Array<OutTags>;
/**
 * AWS::S3:Bucket Tags.
 *
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param {Array<{string:string}>} tagList - * asdasd.
 * @returns {{Tags:Array<{Key:string,Value:string}>}} - Asd.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
export declare const Tags: (tagList: InTags | Array<InTags>) => {
    Tags: Array<OutTags>;
};
/**
 * AWS::S3:Bucket Tags.
 *
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param {Array<{string: string}>} tagList - Incoming tagList.
 * @returns {{TagFilters:Array<{Key: string, Value:string}>}} - Asd.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
export declare const TagFilters: (tagList: InTags | Array<InTags>) => {
    TagFilters: Array<OutTags>;
};
export interface InTags {
    [key: string]: string;
}
export interface OutTags {
    Key: string;
    Value: string;
}
//# sourceMappingURL=tags.d.ts.map