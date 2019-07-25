import { ISpdx_LicenseList } from './SPDX_licences'
import { IGetAtt, IRef, squals, genComponentName, baseSchemas } from '../Template'
import { ILambda_Runtimes } from './Runtimes'
import { UrlObject } from 'url'
import { struct } from 'superstruct'
import { flowRight } from 'lodash-es'
import {
  verifyIfThen,
  ifCondition,
  verifyStringStructData
} from '../../utils/validations/objectCheck'
import { urlToOptions } from 's3-url'

export class LambdaVersion implements squals {
  name: string
  Type = 'AWS::Lambda::LayerVersion'
  Properties: ILambda_LayerVersion_props

  constructor (i: ILambda_LayerVersion_min) {
    this.name = i.name || genComponentName()
    this.Properties = { Content: { S3Bucket: '', S3Key: '', S3ObjectVersion: '' } }
  }

  static fromString () {}
  static fromJSON () {}
  static fromJS () {}
  static from () {}
  static validate () {}
  static validateJS (i: ILambda_LayerVersion_min): LambdaVersion {
    // compose a shorter helper func
    const maybeOneOfThese = flowRight(
      struct.optional,
      struct.union
    )

    // shape1
    const BucketShape = struct({
      bucket: 'string',
      key: 'string',
      version: 'string?'
    })

    // shape2
    const NodeUrlObject = struct({
      auth: 'string?',
      hash: 'string?',
      host: 'string?',
      hostname: 'string?',
      href: 'string?',
      path: 'string?',
      pathname: 'string?',
      protocol: 'string?',
      search: 'string?',
      slashes: 'boolean?',
      port: maybeOneOfThese(['string', 'number']),
      query: maybeOneOfThese(['string', struct.dict(['string', 'object'])])
    })

    // uses helper and part1,2
    struct({
      content: struct.union(['string', BucketShape]),
      layerName: struct.optional(baseSchemas.StrRefGetAtt),
      license: maybeOneOfThese(['string', NodeUrlObject]),
      compatRuntimes: struct.optional(struct(['string'])),
      desc: 'string?'
    })(i)

    const interdepends = verifyIfThen(
      ifCondition('content', (content: string) => {
        return content.startsWith('s3://') as boolean
      }),
      verifyStringStructData(
        'content',
        urlToOptions,
        struct({ Buket: 'string', Key: 'string', v: 'string' })
      )
    )

    return new LambdaVersion(interdepends(i))
  }
  static validateJSON (i: ILambda_LayerVersion_json): LambdaVersion {
    const LambdaVersionJSON = struct(
      struct.dict([
        'string',
        struct.interface({
          Type: struct.literal(''),
          Properties: struct({
            Content: struct({
              S3Bucket: 'string',
              S3Key: 'string',
              S3ObjectVersion: 'string?'
            }),
            CompatibleRuntimes: struct(['string']),
            Description: 'string?',
            LayerName: 'string?',
            LicenseInfo: 'string?'
          })
        })
      ])
    )
    LambdaVersionJSON(i)
    const _name = Object.keys(i)[0]
    i[_name].Properties
    const ret = new LambdaVersion({ content: '' })
    ret.name = _name
    ret.Properties = i[_name].Properties
    return ret
  }

  content (dataIn: string | { bucket: string; key: string; version: string }) {
    this.Properties.Content =
      typeof dataIn === 'string'
        ? {
          S3Bucket: urlToOptions(dataIn).Bucket || '',
          S3Key: urlToOptions(dataIn).Key || '',
          S3ObjectVersion: urlToOptions(dataIn).v
        }
        : { S3Bucket: dataIn.bucket, S3Key: dataIn.key, S3ObjectVersion: dataIn.version }

    if (this.Properties.Content.S3Bucket === '' || this.Properties.Content.S3Key === '') {
      if (typeof dataIn === 'string') {
        console.error(
          `the value for the s3url was :: ${dataIn} - Problem: Bucket + Key are required. Also make sure you use '?v=___' for version Information`
        )
      }
      throw new Error(`The S3Bucket and/or S3Keys are empty - they should be valid string values`)
    }
    return this
  }

  runTimes (...runTimes: ILambda_Runtimes[]) {
    this.Properties.CompatibleRuntimes = runTimes
    return this
  }
  license (license: ISpdx_LicenseList | string) {
    this.Properties.LicenseInfo = license
    return this
  }
  _name (n: string) {
    this.name = n
    return this
  }
  description (d: string) {
    this.Properties.Description = d
    return this
  }
  layerName (name: string) {
    this.Properties.LayerName = name
    return this
  }

  toJSON (withRelated?: boolean): object[] {
    return []
  }

  Ref (): IRef {
    return { Ref: this.name }
  }
}

export interface ILambda_LayerVersion_min {
  name?: string
  content: string | { bucket: string; key: string; version: string }
  layerName?: string | IRef | IGetAtt
  license?: ISpdx_LicenseList | UrlObject | string
  desc?: string
  compatRuntimes?: ILambda_Runtimes[]
}

export interface ILambda_LayerVersion_props {
  Content: {
    S3Bucket: string
    S3Key: string
    S3ObjectVersion?: string
  }
  CompatibleRuntimes?: ILambda_Runtimes[]
  Description?: string
  LayerName?: string
  LicenseInfo?: string
}

export interface ILambda_LayerVersion_json {
  [name: string]: {
    Type: 'AWS::Lambda::LayerVersion'
    Properties: ILambda_LayerVersion_props
  }
}
