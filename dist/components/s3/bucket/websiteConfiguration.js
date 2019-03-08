var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./redirectRule", "lodash-es"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var redirectRule_1 = require("./redirectRule");
    var lodash_es_1 = require("lodash-es");
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
    var websiteConfig = function (param) {
        var _a = __assign({ redir: '', indexpage: 'index.html', errorpage: 'search.html' }, param), redir = _a.redir, indexpage = _a.indexpage, errorpage = _a.errorpage;
        if (lodash_es_1.isEmpty(redir)) {
            return {
                WebsiteConfiguration: {
                    IndexDocument: indexpage,
                    ErrorDocument: errorpage
                }
            };
        }
        else if (Array.isArray(redir)) {
            // redirect is an Array of Rules
            // oh what if we pre-empt and pass
            return {
                WebsiteConfiguration: {
                    IndexDocument: indexpage,
                    ErrorDocument: errorpage,
                    RoutingRules: redir.map(function (arg) {
                        // @ts-ignore
                        var _a = __assign({}, arg), to = _a.to, when = _a.when, replacer = _a.replacer, doFullReplace = _a.doFullReplace;
                        return redirectRule_1.redirRule({ to: to, when: when, replacer: replacer, doFullReplace: doFullReplace });
                    })
                }
            }; // redirect is an Array of Rules
        }
        else {
            // redirect should be a URL
            try {
                var uri = new URL(redir);
                return {
                    WebsiteConfiguration: {
                        IndexDocument: indexpage,
                        ErrorDocument: errorpage,
                        RedirectAllRequestsTo: {
                            Protocol: uri.protocol.slice(0, -1),
                            HostName: uri.hostname
                        }
                    }
                };
            }
            catch (err) {
                // invalid  redirALL
                console.log({ redir: redir });
                console.error(err);
                throw new Error("\u0192.websiteConfig was expects the field: redir to be - as a URL string starting with " +
                    "https(s) or an array of redir rules " +
                    ("but instead the value for redir - is : " + redir));
            }
        }
    };
    exports.websiteConfig = websiteConfig;
});
