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
// @ts-nocheck
// the dynamic key usage on the input params is causing a severe head-ache with TS check
// it also seems like TS check is not ready to accept some newer js features like Object.values or js varibableName Property construction
//
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
 * @param {!inCorsRule|!Object<string, string|Array<string>>} params - Is a structured set of properties unless using the dynamic key options with methods separeted by a | and the domains are listed as a string or array.
 * @returns {outCorsRule} - Valid Cloudformation keys.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-cors-corsrule.html>
 * @example
 * var cors1 = corsRule({id:"Local Development Rule1", methods:'GET', origins:'localhost', maxAge:3600*6})
 *  var cors2 = corsRule({id:"Local Development Rule2", methods:['GET', 'POST'], origins:['localhost'], maxAge:3600*6})
 *  var cors3 = corsRule({id:"Local Development Rule3", maxAge:3600*6,  GET:'localhost'})
 *  var cors4 = corsRule({id:"Local Development Rule4", maxAge:3600*6, 'GET|POST':['mydomain.com','localhost']})
 */
var corsRule = function (params) {
    var _a = __assign({ methods: [], origins: [], headersExposed: [], headersAllowed: [], id: null, maxAge: null }, params), methods = _a.methods, origins = _a.origins, headersExposed = _a.headersExposed, headersAllowed = _a.headersAllowed, id = _a.id, maxAge = _a.maxAge, HTTPVERBS = __rest(_a, ["methods", "origins", "headersExposed", "headersAllowed", "id", "maxAge"]);
    var validMethods = ['GET', 'PUT', 'HEAD', 'POST', 'DELETE'];
    var AllowedMethods;
    if (Object.keys(HTTPVERBS).length > 0) {
        methods = lodash_es_1.uniq(__spread(methods, Object.keys(HTTPVERBS)[0].split('|')));
        if (Array.isArray(Object.values(HTTPVERBS)[0])) {
            origins = lodash_es_1.uniq(__spread(origins, Object.values(HTTPVERBS)[0]));
        }
        else {
            origins = lodash_es_1.uniq(__spread(origins, [Object.values(HTTPVERBS)[0]]));
        }
    }
    if (methods &&
        Array.isArray(methods) &&
        methods.length > 0 &&
        methods.every(function (elem) {
            return validMethods.includes(elem.toString().toUpperCase());
        })) {
        AllowedMethods = methods;
    }
    else if (methods && validMethods.includes(methods.toString().toUpperCase())) {
        AllowedMethods = [methods];
    }
    else {
        throw new Error("\u0192.corsConfig - the param:methods must be an array with 1+ valid HTTP verb found:" + methods);
    }
    var AllowedOrigins;
    if (origins && Array.isArray(origins) && origins.length > 0) {
        AllowedOrigins = origins;
    }
    else if (origins) {
        AllowedOrigins = [origins];
    }
    else {
        throw new Error('in the corsConfig the origins param must be an array with 1+ domain listed');
    }
    var rule = { AllowedMethods: AllowedMethods, AllowedOrigins: AllowedOrigins };
    if (id && id.length < 255)
        rule['Id'] = id.toString();
    if (Number.isSafeInteger(maxAge))
        rule['MaxAge'] = maxAge;
    if (headersAllowed && headersAllowed.length > 0) {
        rule['AllowedHeaders'] = headersAllowed.map(function (v) { return v.toString(); });
    }
    if (headersExposed && headersExposed.length > 0) {
        rule['ExposedHeaders'] = headersExposed.map(function (v) { return v.toString(); });
    }
    return rule;
};
exports.corsRule = corsRule;
