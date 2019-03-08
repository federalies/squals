import { OutRouteRule, InRedirRule } from './redirectRule';
/** @module S3Bucket */
/**
 * AWS:S3:: Website Configuration.
 *
 * @description Make a Website Cofig
 * @param param - Asd.
 * @param param.redir - String: redirects all traffic to the `protocol://host` provided in the string - Array: goes in as redir rules.
 * @param param.indexpage -'index.html'] - Asd.
 * @param param.errorpage -'search.html'] - Asd.
 * @returns  Cloudformation obj.
 * @todo BUILD Out better output type/interfaces showing Object shape/properties
 * @example
 *  var webcfgPlain = websiteConfig()
 *  var webcfgWRedirRules = websiteConfig({redir:[{when:'docs/', to:'squals.readthedocs.io/', replacer:'', doFullReplace:true}]})
 */
declare const websiteConfig: (param: inWebsiteConfig) => OutWebsiteConfig;
export interface inWebsiteConfig {
    indexPage?: string;
    errorPage?: string;
    redir?: string | InRedirRule[];
}
export interface OutWebsiteEnabled {
    IndexDocument: string;
    ErrorDocument: string;
}
export interface OutWebsiteConfigRedirAll extends OutWebsiteEnabled {
    RedirectAllRequestsTo: {
        HostName: string;
        Protocol: string;
    };
}
export interface OutWebsiteConfigRedirRules extends OutWebsiteEnabled {
    RoutingRules: OutRouteRule[];
}
export declare type OutWebsiteConfigElem = OutWebsiteEnabled | OutWebsiteConfigRedirRules | OutWebsiteConfigRedirAll;
export interface OutWebsiteConfig {
    WebsiteConfiguration: OutWebsiteConfigElem;
}
export { websiteConfig };
//# sourceMappingURL=websiteConfiguration.d.ts.map