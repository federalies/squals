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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "url"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var url = __importStar(require("url"));
    /** @module S3Bucket */
    /**
     * RedirRule makes a valid cloudformation obj.
     *
     * @description AWS:S3:: Make a Redirection Rule Config for a WebsiteConfiguration.
     * @param param - Asd.
     * @param param.to  - The Destination url - where the path will be passed through or slighted altered.
     * @param param.when - String values are treated as server Status codes - numbers are treated as pathprefixes.
     * @param param.replacer - Looks for the `reqd.when` and replaces it in the path.
     * @param param.doFullReplace - Changes the mode to no longer slight modidy the path before redirection. Instead, it rewrites it.
     * @param param.ext.HttpRedirectCode - Feel free to pass in AWS-CFN-property names like `HttpRedirectCode`.
     * @example
     *  var output1 = redirRule({ to:'https://federali.es', when: '/docs' , replacer:'/documents', doFullReplace:true})
     *  var output2 = redirRule({ to:'https://federali.es', when: 404 })
     *  var output3 = redirRule({ to:'https://federali.es/', when: '/doc', replacer: '/docs', doFullReplace: true })
     * @returns {outRuleElem} Cloudoformation object.
     */
    exports.redirRule = function (param) {
        var _a = __assign({ to: '', when: '', replacer: '', ext: {}, doFullReplace: false }, param), to = _a.to, when = _a.when, replacer = _a.replacer, doFullReplace = _a.doFullReplace, ext = _a.ext;
        if (to && when) {
            var uri = new url.URL(to);
            var ret = {
                RoutingRuleCondition: typeof when === 'number'
                    ? { HttpErrorCodeReturnedEquals: when.toString() }
                    : { KeyPrefixEquals: when.toString() },
                RedirectRule: {
                    HttpRedirectCode: ext.HttpRedirectCode || '302',
                    Protocol: uri.protocol.slice(0, -1),
                    HostName: uri.hostname
                }
            };
            if (replacer && (typeof when === 'string' || when instanceof String)) {
                doFullReplace
                    ? (ret.RedirectRule['ReplaceKeyWith'] = replacer)
                    : (ret.RedirectRule['ReplaceKeyPrefixWith'] = replacer);
            }
            return ret;
        }
        else {
            throw new Error("\u0192.redirRule needs the \"to\" and \"when\" fields - but found " + { to: to } + " and " + { when: when } + " ");
        }
    };
});
