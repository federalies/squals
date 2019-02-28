/**
 * AWS::S3 Cors Rule Config Method title.
 *
 * @description descrip.
 * @param {Array<string>} methods - Asdf.
 * @param {Array<string>} origins - Asdf.
 * @param {Object} defaults - Asdf.
 * @param {Array<string>} defaults.headersExposed - Asdf.
 * @param {Array<string>} defaults.headersAllowed - Asdf.
 * @param {string} defaults.id - Asdf.
 * @param {number} defaults.maxAge - Asdf.
 * @returns {Object} - Asdf.
 * @example
 *  var cors = corsRule(['GET', 'POST'],['localhost'],{id:"Local Development Rule", maxAge:3600*6})
 */
const corsRule = (
  methods,
  origins,
  { headersExposed, headersAllowed, id, maxAge } = {
    headersExposed: null,
    headersAllowed: null,
    id: null,
    maxAge: null
  }
) => {
  const [...AllowedMethods] = methods // GET | PUT | HEAD | POST | DELETE.
  const [...AllowedOrigins] = origins // reqd

  let rule = { AllowedMethods, AllowedOrigins }
  if (id && id.length < 255) rule['Id'] = id.toString()
  if (Number.isSafeInteger(maxAge)) rule['MaxAge'] = maxAge

  if (headersAllowed) {
    rule['AllowedHeaders'] = headersAllowed.map(v => v.toString())
  }
  if (headersExposed) {
    rule['ExposedHeaders'] = headersExposed.map(v => v.toString())
  }

  return rule
}

/**
 *
 * Cors Config.
 *
 * @description asdf.
 * @param {Array<{methods: Array<string>, origins: Array<string>, opts: Object}>} rules - * Array of Objects with methods, origins, & opts.
 * @returns {Object} - Asd.
 * @example
 *   var a =corsConfig([{methods:[],origins:[],opts:{}}])
 */
const corsConfig = rules => {
  return {
    CorsConfiguration: {
      CorsRules: rules.map(v => corsRule(v.methods, v.origins, v.opts))
    }
  }
}

export { corsConfig, corsRule }
