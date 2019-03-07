import { difference, isEmpty, uniq } from 'lodash-es'
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
const corsConfig = (
  rules: InCorsRule | InCorsRule[]
): { CorsConfiguration: { CorsRules: OutCorsRule[] } } => {
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
 * @param params - Is a structured set of properties unless using the dynamic key options with methods separeted by a | and the domains are listed as a string or array.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-cors-corsrule.html>
 * @todo analyse the Verb and origin inputs and perhaps output an array of corsRules - so that many rules could be reduced to 1 set of dense cofig - and the lib would spit out something more sensible than merely the cross product
 * @example
 * var cors1 = corsRule({id:"Local Development Rule1", methods:'GET', origins:'localhost', maxAge:3600*6})
 *  var cors2 = corsRule({id:"Local Development Rule2", methods:['GET', 'POST'], origins:['localhost'], maxAge:3600*6})
 *  var cors3 = corsRule({id:"Local Development Rule3", maxAge:3600*6,  GET:'localhost'})
 *  var cors4 = corsRule({id:"Local Development Rule4", maxAge:3600*6, 'GET|POST':['mydomain.com','localhost']})
 */
const corsRule = (params: InCorsRule): OutCorsRule => {
  let { methods, origins, headersExposed, headersAllowed, id, maxAge, ...HTTPVERBS } = {
    methods: [],
    origins: [],
    headersExposed: [],
    headersAllowed: [],
    id: null,
    maxAge: null,
    ...params
  }

  const validMethods = ['GET', 'PUT', 'HEAD', 'POST', 'DELETE']

  // collect complex verb Keys into Verbs
  let Verbs = Object.keys(HTTPVERBS)
  Verbs = Verbs.reduce((p: string[], verbCombo: string) => {
    verbCombo.split('|').map((verb: string) => {
      p.push(verb)
    })
    return p
  }, [])

  // collect origin arrays into a single array
  let Origins = Object.values(HTTPVERBS)
  Origins = Origins.reduce((p: string[], originSet: string[]) => {
    originSet.map(o => p.push(o))
    return p
  }, [])

  // check for complex verbs to proces
  if (!isEmpty(Verbs)) {
    Verbs = uniq([...methods, ...Verbs])
    Origins = uniq([...origins, ...Origins]) as string[]
  }

  const AllowedMethods = Array.isArray(methods) ? methods : new Array(methods)
  const AllowedOrigins = Array.isArray(origins) ? origins : new Array(origins)

  const rule: OutCorsRule = {
    AllowedMethods: [...AllowedMethods, ...Verbs],
    AllowedOrigins: [...AllowedMethods, ...Origins]
  }

  if (AllowedOrigins.length < 1) {
    throw new Error('in the corsConfig the origins param must be an array with 1+ domain listed')
  }
  if (difference(rule.AllowedMethods, validMethods).length > 0) {
    throw new Error(
      `ƒ.corsRule requires the HTTP Verbs be valid spelling found: ${rule.AllowedMethods}`
    )
  }

  if (id && id.length < 255) rule['Id'] = id.toString()
  if (maxAge && Number.isSafeInteger(maxAge)) rule['MaxAge'] = maxAge

  if (headersAllowed && headersAllowed.length > 0) {
    let hdrAllowed = headersAllowed as string[]
    rule['AllowedHeaders'] = hdrAllowed
  }
  if (headersExposed && headersExposed.length > 0) {
    let hdrExposed = headersExposed as string[]
    rule['ExposedHeaders'] = hdrExposed
  }

  return rule
}

interface InCorsRule {
  methods: string | Array<string>
  origins: string | Array<string>
  headersExposed?: Array<string>
  headersAllowed?: Array<string>
  id?: string
  maxAge?: number
}

interface OutCorsRule {
  AllowedMethods: Array<string>
  AllowedOrigins: Array<string>
  AllowedHeaders?: Array<string>
  ExposedHeaders?: Array<string>
  Id?: string
  MaxAge?: number
}

export { corsConfig, corsRule }
