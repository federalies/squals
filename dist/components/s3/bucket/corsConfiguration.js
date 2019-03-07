"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_es_1 = require("lodash-es");
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
var corsConfig = function (rules) {
    return Array.isArray(rules)
        ? {
            CorsConfiguration: {
                CorsRules: rules.map(function (item) { return corsRule(item); })
            }
        }
        : {
            CorsConfiguration: {
                CorsRules: [corsRule(rules)]
            }
        };
};
exports.corsConfig = corsConfig;
/**
 * AWS::S3 Cors Rule Config Method title.
 *
 * @description descrip.
 * @param params - Is a structured set of properties unless using the dynamic key options with methods separeted by a | and the domains are listed as a string or array.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-cors-corsrule.html>
 * @todo analyse the Verb and origin inputs and perhaps output an array of corsRules - so that many rules could be reduced to 1 set of dense cofig - and the lib would spit out something more sensible than merely the cross product
 * @example
 * var cors1 = corsRule({id:"Local Development Rule1", methods:'GET', origins:'localhost', maxAge:3600*6})
 *  var cors2 = corsRule({id:"Local Development Rule2", methods:['GET', 'POST'], origins:['localhost'], maxAge:3600*6})
 *  var cors3 = corsRule({id:"Local Development Rule3", maxAge:3600*6,  GET:'localhost'})
 *  var cors4 = corsRule({id:"Local Development Rule4", maxAge:3600*6, 'GET|POST':['mydomain.com','localhost']})
 */
var corsRule = function (params) {
    var _a = __assign({ methods: [], origins: [], headersExposed: [], headersAllowed: [], id: null, maxAge: null }, params), methods = _a.methods, origins = _a.origins, headersExposed = _a.headersExposed, headersAllowed = _a.headersAllowed, id = _a.id, maxAge = _a.maxAge, HTTPVERBS = __rest(_a, ["methods", "origins", "headersExposed", "headersAllowed", "id", "maxAge"]);
    var validMethods = ['GET', 'PUT', 'HEAD', 'POST', 'DELETE'];
    // collect complex verb Keys into Verbs
    var Verbs = Object.keys(HTTPVERBS);
    Verbs = Verbs.reduce(function (p, verbCombo) {
        verbCombo.split('|').map(function (verb) {
            p.push(verb);
        });
        return p;
    }, []);
    // collect origin arrays into a single array
    var Origins = Object.values(HTTPVERBS);
    Origins = Origins.reduce(function (p, originSet) {
        originSet.map(function (o) { return p.push(o); });
        return p;
    }, []);
    // check for complex verbs to proces
    if (!lodash_es_1.isEmpty(Verbs)) {
        Verbs = lodash_es_1.uniq(__spread(methods, Verbs));
        Origins = lodash_es_1.uniq(__spread(origins, Origins));
    }
    var AllowedMethods = Array.isArray(methods) ? methods : new Array(methods);
    var AllowedOrigins = Array.isArray(origins) ? origins : new Array(origins);
    var rule = {
        AllowedMethods: __spread(AllowedMethods, Verbs),
        AllowedOrigins: __spread(AllowedMethods, Origins)
    };
    if (AllowedOrigins.length < 1) {
        throw new Error('in the corsConfig the origins param must be an array with 1+ domain listed');
    }
    if (lodash_es_1.difference(rule.AllowedMethods, validMethods).length > 0) {
        throw new Error("\u0192.corsRule requires the HTTP Verbs be valid spelling found: " + rule.AllowedMethods);
    }
    if (id && id.length < 255)
        rule['Id'] = id.toString();
    if (maxAge && Number.isSafeInteger(maxAge))
        rule['MaxAge'] = maxAge;
    if (headersAllowed && headersAllowed.length > 0) {
        var hdrAllowed = headersAllowed;
        rule['AllowedHeaders'] = hdrAllowed;
    }
    if (headersExposed && headersExposed.length > 0) {
        var hdrExposed = headersExposed;
        rule['ExposedHeaders'] = hdrExposed;
    }
    return rule;
};
exports.corsRule = corsRule;
