// @ts-nocheck
// the dynamic key usage on the input params is causing a severe head-ache with TS check
// it also seems like TS check is not ready to accept some newer js features like Object.values or js varibableName Property construction
//
import { uniq } from 'lodash-es'
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
const corsConfig = rules => {
  return Array.isArray(rules)
    ? {
      CorsConfiguration: {
        CorsRules: rules.map(item => corsRule(item))
      }
    }
    : {
      CorsConfiguration: {
        CorsRules: [corsRule(rules)]
      }
    }
}

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
const corsRule = params => {
  let {
    methods,
    origins,
    headersExposed,
    headersAllowed,
    id,
    maxAge,
    ...HTTPVERBS
  } = {
    methods: [],
    origins: [],
    headersExposed: [],
    headersAllowed: [],
    id: null,
    maxAge: null,
    ...params
  }

  const validMethods = ['GET', 'PUT', 'HEAD', 'POST', 'DELETE']
  let AllowedMethods

  if (Object.keys(HTTPVERBS).length > 0) {
    methods = uniq([...methods, ...Object.keys(HTTPVERBS)[0].split('|')])
    if (Array.isArray(Object.values(HTTPVERBS)[0])) {
      origins = uniq([...origins, ...Object.values(HTTPVERBS)[0]])
    } else {
      origins = uniq([...origins, Object.values(HTTPVERBS)[0]])
    }
  }

  if (
    methods &&
    Array.isArray(methods) &&
    methods.length > 0 &&
    methods.every(elem => {
      return validMethods.includes(elem.toString().toUpperCase())
    })
  ) {
    AllowedMethods = methods
  } else if (
    methods &&
    validMethods.includes(methods.toString().toUpperCase())
  ) {
    AllowedMethods = [methods]
  } else {
    throw new Error(
      `ƒ.corsConfig - the param:methods must be an array with 1+ valid HTTP verb found:${methods}`
    )
  }

  let AllowedOrigins
  if (origins && Array.isArray(origins) && origins.length > 0) {
    AllowedOrigins = origins
  } else if (origins) {
    AllowedOrigins = [origins]
  } else {
    throw new Error(
      'in the corsConfig the origins param must be an array with 1+ domain listed'
    )
  }

  let rule = { AllowedMethods, AllowedOrigins }
  if (id && id.length < 255) rule['Id'] = id.toString()
  if (Number.isSafeInteger(maxAge)) rule['MaxAge'] = maxAge

  if (headersAllowed && headersAllowed.length > 0) {
    rule['AllowedHeaders'] = headersAllowed.map(v => v.toString())
  }
  if (headersExposed && headersExposed.length > 0) {
    rule['ExposedHeaders'] = headersExposed.map(v => v.toString())
  }

  return rule
}

const log = data => console.log(JSON.stringify(data, null, 2))

var cors1 = corsRule({
  id: 'Local Development Rule1',
  methods: 'GET',
  origins: 'localhost',
  maxAge: 3600 * 6
})
var cors2 = corsRule({
  id: 'Local Development Rule2',
  methods: ['GET', 'POST'],
  origins: ['localhost'],
  maxAge: 3600 * 6
})
var cors3 = corsRule({
  id: 'Local Development Rule3',
  maxAge: 3600 * 6,
  GET: 'localhost'
})
var cors4 = corsRule({
  id: 'Local Development Rule4',
  maxAge: 3600 * 6,
  'GET|POST': ['mydomain.com', 'localhost']
})

log({ cors1, cors2, cors3, cors4 })

/**
 * @typedef inCorsRule
 * @type {Object}
 * @property {!string|!Array<string>} methods - asd
 * @property {!string|!Array<string>} origins - asd
 * @property {?Array<string>} headersExposed - asd
 * @property {?Array<string>} headersAllowed - asd
 * @property {?string} id - asd
 * @property {?number} maxAge - asd
 */

/**
 * @typedef inCorsConfig
 * @type {inCorsRule | Array<inCorsRule>}
 */

/**
 * @typedef outCorsRule
 * @type {Object}
 * @property {!Array<string>} AllowedMethods - An HTTP method that you allow the origin to execute.
 * @property {!Array<string>} AllowedOrigins - An origin that you allow to send cross-domain requests.
 * @property {?Array<string>} [AllowedHeaders] - Headers that are specified in the Access-Control-Request-Headers header. These headers are allowed in a preflight OPTIONS request. In response to any preflight OPTIONS request, Amazon S3 returns any requested headers that are allowed.
 * @property {?Array<string>} [ExposedHeaders] - One or more headers in the response that are accessible to client applications (for example, from a JavaScript XMLHttpRequest object).
 * @property {?string} [Id] - A unique identifier for this rule. The value cannot be more than 255 characters.
 * @property {?number} [MaxAge] - The time in seconds that your browser is to cache the preflight response for the specified resource.
 */

/**
 * @typedef outputCorsConfig
 * @type {Object}
 * @property {!Object} CorsConfiguration
 * @property {!Array<outCorsRule>} CorsConfiguration.CorsRules
 */

export { corsConfig, corsRule }
