#! node -r esm schema-segmenter.js

/**
 *
 * What is this:
 *  Much of the validations of cloudformation templates are - are the right inputs avaiable?
 *  Are all composition rules satisfied?
 *
 * Why?
 * - It's nice to answer those at the smallest lelvel
 *
 * * Overview:
 * - cache the AWS definition
 * - chop up AWS definitions
 * - translate the AWS definitions to JSON-schema.org styles
 *
 * Weeds2
 * - save selected resourceDefs to a list
 * - can iterate through the list - expanding various partial defs of resource.properties
 *    - dont foreget to save off the collection `Type`: `List` otherwise the collection type is `MAP` if the `TYPE` is a ref
 *    - `PrimitiveType` seems mutually exclusive form `Type`
 *    - where those can be determine by the presence of an `ItemType` key referencing a PropertyDef
 *
 *
 * CLI options:
 * - keep the AWS defintion file
 * - only update/generate the JSON schemmas for certain AWS Services
 * - (future) JSON-Schema version to use
 *
 * Assumptions:
 * - the format of the folder
 */

import AWScfg from '../cloudformation.awsFormat.js/index.js'
// const fs = require('fs')
const path = require('path')

// const AWSprimitiveTypes = ['Boolean', 'Integer', 'String', 'Json', 'Double']
// const AWSotherTypes = ['Map', 'List'] // Where MAP means grab the property def Key

const mapAws2JsonSchema = t => {
  // console.log(`check my t: ${t}`)
  switch (t.toString().toLowerCase()) {
    case 'null':
      return 'null'
    case 'boolean':
      return 'boolean'
    case 'string':
      return 'string'
    case 'list':
      return 'array'
    case 'map':
    case 'json':
      return 'object'
    case 'integer':
    case 'double':
      return 'number'
    default:
      return t.toString()
  }
}

const selectedTypes = [
  'AWS::S3:'
  // 'AWS::Lambda:',
  // 'AWS::CloudFront:',
  // 'AWS::Route53:',
  // 'AWS::ApiGateway:',
  // 'AWS::AppSync:',
  // 'AWS::CodeBuild:',
  // 'AWS::CodePipeline:',
  // 'AWS::CodeCommit:',
  // 'AWS::DynamoDB:',
  // 'AWS::SQS:',
  // 'AWS::SNS:',
  // 'AWS::SES:',
  // 'AWS::CertificateManager:',
  // 'AWS::KinesisFirehose:',
  // 'AWS::KinesisAnalytics:',
  // 'AWS::Kinesis:'
]

// in case Pupeteer happens...
// let validLbl = Array.from(document.querySelectorAll('#main-col-body > div > dl > dd > p > em')).filter(n=> n.innerText.includes('Valid'))

const propertyDefs = Object.keys(AWScfg.PropertyTypes).reduce((a, awsResourceKey) => {
  if (selectedTypes.find(prefix => awsResourceKey.startsWith(prefix))) {
    return {
      ...a,
      [awsResourceKey]: AWScfg.PropertyTypes[awsResourceKey]
    }
  } else {
    return a
  }
}, {})

// console.log({ propertyDefs })

const pluckRequired = ([_orig, _buildOut]) => {
  const props = _orig[Object.keys(_orig)[0]].Properties
  const required = Object.entries(props).reduce((a, [key, val]) => {
    val.Required && a.push(key)
    return a
  }, [])
  // this funciton turns into a no-op
  // required:[] is the same as the key missing from the schema
  if (required.length > 0) {
    return [_orig, { ..._buildOut, required }]
  } else {
    return [_orig, { ..._buildOut }]
  }
}

const typeConvert = v => {
  let { _resource, ...prop } = v

  prop = Object.keys(prop)[0]
  const val = v[prop]
  let ret = { type: 'string' }

  if (val.PrimitiveType) {
    ret = { type: mapAws2JsonSchema(val.PrimitiveType) }
  } else if (val.Type === 'List') {
    ret = {
      type: 'array',
      items: { $ref: `#/definitions/${val.ItemType}` }
    }
  } else if (val.Type) {
    ret = { $ref: `#definitions/${_resource}.${val.Type}` }
  }
  return ret
}

const pluckPropertes = ([_orig, _buildOut], _typeConvert = typeConvert) => {
  return pluckPropertesWithLookUp([_orig, _buildOut], _typeConvert)
}

const pluckPropertesWithLookUp = ([_orig, _buildOut], lookUpFn) => {
  const properties = Object.entries(_orig[Object.keys(_orig)[0]].Properties).reduce(
    (acc, [property, val]) => {
      acc[property] = {
        ...lookUpFn({ [property]: val, _resource: Object.keys(_orig)[0] })
      }
      return acc
    },
    {}
  )
  return [_orig, { ..._buildOut, properties }]
}

const pluckDefinitions = ([_orig, _buildOut]) => {
  const definitions = Object.entries(propertyDefs).reduce((a, [k, v]) => {
    return { ...a, [k]: { type: 'object', properties: { ...v.Properties } } }
  }, {})

  // console.log({ _orig, _buildOut })

  return [_orig, { ..._buildOut, definitions }]
}

const base = _input => {
  const resourceKey = Object.keys(_input)[0]
  return [
    _input,
    {
      $id: `https://raw.githack.com/federalies/squals/master/src/validations/json-schemas/schemas/${resourceKey}.schema.json`,
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: `${resourceKey}`,
      type: 'object'
    }
  ]
}

const choseRight = ([, right]) => right

const schemaTransforms = data => {
  return [choseRight, pluckDefinitions, pluckPropertes, pluckRequired, base].reduceRight(
    (_data, f) => {
      _data = f(_data)
      return _data
    },
    data
  )
}

// eslint-disable-next-line
const resopurceDefs = Object.keys(AWScfg.ResourceTypes)
  .reduce((a, awsResourceKey) => {
    if (selectedTypes.find(prefix => awsResourceKey.startsWith(prefix))) {
      a.push({ [awsResourceKey]: AWScfg.ResourceTypes[awsResourceKey] })
    }
    return a
  }, [])
  .map(resDef => {
    const schema = schemaTransforms(resDef)
    console.log(JSON.stringify(schema, null, 2))
    //
    // // /* map-side-effect */
    // fs.createWriteStream(
    //   path.resolve(
    //     __dirname,
    //     `../schemas/${Object.keys(resDef)[0]}.test-schema.json`
    //   )
    // ).write(JSON.stringify(resDef, null, 2))

    // return schema
  })
