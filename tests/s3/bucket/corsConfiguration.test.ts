// @ts-nocheck

import { corsConfig } from '../../../src/components/s3/bucket/corsConfiguration'

describe('defaults', () => {
  test('Reasonable example', () => {
    const actual = corsConfig({
      methods: ['GET', 'POST'],
      origins: ['localhost', 'myComp.local', 'federali.es']
    })
    const expected: any = {
      CorsConfiguration: {
        CorsRules: [
          {
            AllowedMethods: ['GET', 'POST'],
            AllowedOrigins: ['localhost', 'myComp.local', 'federali.es']
          }
        ]
      }
    }
    expect(actual).toEqual(expected)
  })

  test('uses the fancy _ VERB:Origin syntax', () => {
    const actual = corsConfig({
      _: { 'GET|POST': ['localhost', 'myComp.local', 'federali.es'] }
    })
    const expected: any = {
      CorsConfiguration: {
        CorsRules: [
          {
            AllowedMethods: ['GET', 'POST'],
            AllowedOrigins: ['localhost', 'myComp.local', 'federali.es']
          }
        ]
      }
    }
    expect(actual).toEqual(expected)
  })

  test('Cross product of _ VERB:Origin syntax', () => {
    const actual = corsConfig({
      _: {
        'GET|PUT': 'localhost',
        'PUT|POST': ['myComp.local', 'federali.es'],
        POST: 'thefederali.org'
      }
    })
    const expected: any = {
      CorsConfiguration: {
        CorsRules: [
          {
            AllowedMethods: ['GET', 'PUT', 'POST'],
            AllowedOrigins: ['localhost', 'myComp.local', 'federali.es', 'thefederali.org']
          }
        ]
      }
    }
    expect(actual).toEqual(expected)
  })

  test('single element methods and origins', () => {
    const actual = corsConfig({ methods: 'GET', origins: 'localhost' })
    const expected: any = {
      CorsConfiguration: {
        CorsRules: [
          {
            AllowedMethods: ['GET'],
            AllowedOrigins: ['localhost']
          }
        ]
      }
    }
    expect(actual).toEqual(expected)
  })

  test('_ VERBS:Origins where origins is a string', () => {
    const actual = corsConfig({
      _: {
        'GET|PUT|POST': 'localhost'
      }
    })

    const expected: any = {
      CorsConfiguration: {
        CorsRules: [
          {
            AllowedMethods: ['GET', 'PUT', 'POST'],
            AllowedOrigins: ['localhost']
          }
        ]
      }
    }

    expect(actual).toEqual(expected)
  })

  test('array of cors rules ', () => {
    const actual = corsConfig([
      {
        _: {
          'GET|PUT|POST': 'localhost'
        }
      },
      {
        methods: ['GET', 'PUT'],
        origins: ['localhost', 'federali.es']
      }
    ])
    const expected: any = {
      CorsConfiguration: {
        CorsRules: [
          {
            AllowedMethods: ['GET', 'PUT', 'POST'],
            AllowedOrigins: ['localhost']
          },
          {
            AllowedMethods: ['GET', 'PUT'],
            AllowedOrigins: ['localhost', 'federali.es']
          }
        ]
      }
    }
    expect(actual).toEqual(expected)
  })

  test('pass in bunch of optionals', () => {
    const actual = corsConfig({
      id: 'IamAnID',
      maxAge: 123,
      headersExposed: ['exposeMe'],
      headersAllowed: ['allowMe'],
      _: {
        'GET|PUT|POST': ['localhost', 'thefederali.org', 'myComp.local', 'federali.es']
      }
    })
    const expected: any = {
      CorsConfiguration: {
        CorsRules: [
          {
            Id: 'IamAnID',
            MaxAge: 123,
            ExposedHeaders: ['exposeMe'],
            AllowedHeaders: ['allowMe'],
            AllowedMethods: ['GET', 'PUT', 'POST'],
            AllowedOrigins: ['localhost', 'thefederali.org', 'myComp.local', 'federali.es']
          }
        ]
      }
    }
    expect(actual).toEqual(expected)
  })

  test('invalid Input on _ VERB:Origin syntax', () => {
    // supress the thrown error until
    // the funciton is called in the JEST ƒ.expect
    const actual = () =>
      corsConfig({
        _: {
          'GET|PUTS|CONNECT': ['myComp.local', 'federali.es', 'localhost']
        }
      })
    expect(actual).toThrow()
  })

  test('no methods, no origins', () => {
    const actual = () => corsConfig({ methods: [], origins: [] })
    expect(actual).toThrow()
  })

  test('no _ inputs', () => {
    const actual = () => corsConfig({ _: {}, id: 'willThrowError', maxAge: 12 })
    expect(actual).toThrow()
  })
})
