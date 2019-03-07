/** @module S3Bucket */
/**
 *
 * Cors Config.
 *
 * @description asdf.
 * @param {inCorsConfig} rules - * Array of Objects with methods, origins, & opts.
 * @returns {Object} - Asd.
 * @example
 *   var cfmCorsConfig = corsConfig([{methods:[],origins:[]}])
 */
declare const corsConfig: (rules: InCorsRule | InCorsRule[]) => {
    CorsConfiguration: {
        CorsRules: OutCorsRule | OutCorsRule[];
    };
};
/**
 * AWS::S3 Cors Rule Config Method title.
 *
 * @description descrip.
 * @param {!inCorsRule|!Object<string, string|Array<string>>} params - Is a structured set of properties unless using the dynamic key options with methods separeted by a | and the domains are listed as a string or array.
 * @returns {outCorsRule} - Valid Cloudformation keys.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-cors-corsrule.html>
 * @example
 * var cors1 = corsRule({id:"Local Development Rule1", methods:'GET', origins:'localhost', maxAge:3600*6})
 *  var cors2 = corsRule({id:"Local Development Rule2", methods:['GET', 'POST'], origins:['localhost'], maxAge:3600*6})
 *  var cors3 = corsRule({id:"Local Development Rule3", maxAge:3600*6,  GET:'localhost'})
 *  var cors4 = corsRule({id:"Local Development Rule4", maxAge:3600*6, 'GET|POST':['mydomain.com','localhost']})
 */
declare const corsRule: (params: InCorsRule) => OutCorsRule;
interface InCorsRule {
    methods: string | Array<string>;
    origins: string | Array<string>;
    headersExposed?: Array<string>;
    headersAllowed?: Array<string>;
    id?: string;
    maxAge?: number;
}
interface OutCorsRule {
    AllowedMethods: Array<string>;
    AllowedOrigins: Array<string>;
    AllowedHeaders?: Array<string>;
    ExposedHeaders?: Array<string>;
    Id?: string;
    MaxAge?: number;
}
export { corsConfig, corsRule };
//# sourceMappingURL=corsConfiguration.d.ts.map