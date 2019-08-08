/**
 * Lambda Function Documentation
 */

import {
  squals,
  genComponentName,
  validatorGeneric,
  baseSchemas,
  IStrRefGetAtt,
  IGetAtt,
  IRef,
  ITags,
  Itags,
  tags
} from '../Template'
import { urlToOptions, s3Obj as Is3Obj } from 's3-url'
import { ILambda_Runtimes, ILambda_RuntimesEnums } from './Runtimes'
import { struct } from 'superstruct'
import {
  verifyIfThen,
  ifHas,
  multipleOf,
  stringNotEqual,
  ifType
} from '../../utils/validations/objectCheck'
import { flowRight } from 'lodash-es'

/**
 * @class LambdaFunction
 * @implements {squals}
 * @description When you want to create a new function in a cloud definition, most strings accept [[IRef]] and [[IRef]], be sure to leverage autocomplete
 * @param i is the minimum needed info to setup a lambda function 5:[name, handler, role, code, runtime]
 * @ref: <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-function.html>
 * ```javascript
 * const myLambdaFunc = new LambdaFunction({
 *   name: 'myFirstFunc',
 *   handler: 'myFunc.index',
 *   role: 'IAM_lambRole',
 *   code: 's3://bucket/key?v=version8',
 *   runtime: 'nodejs10.x'})
 * ```
 */
export class LambdaFunction implements squals {
  name: string
  Type = 'AWS::Lambda::Function'
  Properties: ILambdaFunc_Props
  private _promises: { [prefix: string]: Promise<any> } = {}
  constructor (i: ILambdaFunc_min) {
    // name is double usage
    this.name = typeof i.name === 'string' ? i.name : genComponentName()

    this.Properties = {
      FunctionName: i.name,
      Handler: i.handler,
      Role: i.role,
      Runtime: i.runtime,
      Description: i.desc,
      KmsKeyArn: i.kmsArn,
      Layers: i.layers,
      MemorySize: i.memSize || 64 * 2,
      Environment: i.environment,
      ReservedConcurrentExecutions: i.concurrent,
      Timeout: i.timeout || 60 * 2,
      Code:
        typeof i.code !== 'string'
          ? { S3Bucket: i.code.bucket, S3Key: i.code.key, S3ObjectVersion: i.code.version }
          : !i.code.startsWith('s3://')
            ? { ZipFile: i.code }
            : {
              S3Bucket: urlToOptions(i.code).Bucket || '',
              S3Key: urlToOptions(i.code).Key || '',
              S3ObjectVersion: urlToOptions(i.code).v
            }
    }
    this.Properties.TracingConfig = i.tracingConfig ? { Mode: i.tracingConfig } : undefined
    this.Properties.Tags = i.tags ? tags(i.tags) : undefined
    this.Properties.VpcConfig = i.vpc
      ? { SecurityGroupIds: i.vpc.secGrpIds, SubnetIds: i.vpc.secGrpIds }
      : undefined
  }
  static fromString (i: string): LambdaFunction {
    return LambdaFunction.from(JSON.parse(i))
  }
  static fromJSON (i: object): LambdaFunction {
    return LambdaFunction.validateJSON(i as ILambdaFunc_json)
  }
  static fromJS (i: object): LambdaFunction {
    return LambdaFunction.validateJS(i as ILambdaFunc_min)
  }
  static from (i: string | object): LambdaFunction {
    return LambdaFunction.validate(i as ILambdaFunc_min)
  }
  static validate (i: string | object): LambdaFunction {
    return validatorGeneric<LambdaFunction>(i as squals, LambdaFunction)
  }
  static validateJS (i: ILambdaFunc_min): LambdaFunction {
    const CodeLoc = struct({
      bucket: 'string',
      key: 'string',
      version: 'string'
    })
    const LambdaJS = struct({
      name: baseSchemas.StrRefGetAtt,
      handler: baseSchemas.StrRefGetAtt,
      role: baseSchemas.StrRefGetAtt,
      code: struct.union(['string', CodeLoc]),
      runtime: struct.enum(Object.keys(ILambda_RuntimesEnums)),
      desc: 'string?',
      memSize: 'number?',
      concurrent: 'number?',
      timeout: 'number?',
      environment: struct.optional(struct.dict(['string', 'string'])),
      kmsArn: struct.optional(baseSchemas.StrRefGetAtt),
      layers: struct.optional([baseSchemas.StrRefGetAtt]),
      deadLetter: struct.optional([baseSchemas.StrRefGetAtt]),
      tracingConfig: struct.optional(struct.enum(['Active', 'PassThrough'])),
      tags: struct.optional(struct.dict(['string', 'string'])),
      vpc: struct.optional(
        struct({
          secGrpIds: struct([baseSchemas.StrRefGetAtt]),
          subnets: struct([baseSchemas.StrRefGetAtt])
        })
      )
    })

    const interdependcices = flowRight([
      verifyIfThen(ifType('code', 'string'), stringNotEqual('code', '')),
      verifyIfThen(ifHas('code.bucket'), stringNotEqual('code.bucket', '')),
      verifyIfThen(ifHas('code.key'), stringNotEqual('code.key', '')),
      verifyIfThen(ifHas('memSize'), multipleOf(64)),
      LambdaJS
    ])

    return new LambdaFunction(interdependcices(i))
  }
  static validateJSON (i: ILambdaFunc_json): LambdaFunction {
    const KeyValTags = struct({ Key: 'string', Value: 'string' })

    const LambdaFunctionJSON = struct(
      struct.dict([
        'string',
        struct({
          Type: 'AWS::Lambda::Function',
          Properties: struct({
            FunctionName: baseSchemas.StrRefGetAtt,
            Handler: baseSchemas.StrRefGetAtt,
            Role: baseSchemas.StrRefGetAtt,
            Runtime: struct.enum(Object.keys(ILambda_RuntimesEnums)),
            Code: struct.union([
              struct({ ZipFile: 'string' }),
              struct({ S3Bucket: 'string', S3Key: 'string', S3ObjectVersion: 'string?' })
            ]),
            // ^ required
            Description: 'string?',
            KmsKeyArn: struct.optional(baseSchemas.StrRefGetAtt),
            Layers: struct.optional(struct([baseSchemas.StrRefGetAtt])),
            MemorySize: 'number?',
            ReservedConcurrentExecutions: 'number?',
            Timeout: 'number?',
            DeadLetterConfig: struct.optional(
              struct({
                TargetArn: struct.optional(baseSchemas.StrRefGetAtt)
              })
            ),
            Environment: struct.optional(
              struct({
                Variables: struct.optional(struct.dict(['string', 'string']))
              })
            ),
            TracingConfig: struct.optional(
              struct({
                Mode: struct.enum(['Active', 'PassThrough'])
              })
            ),
            VpcConfig: struct.optional(
              struct({
                SecurityGroupIds: struct([baseSchemas.StrRefGetAtt]),
                SubnetIds: struct([baseSchemas.StrRefGetAtt])
              })
            ),
            Tags: struct.optional(struct([KeyValTags]))
          })
        })
      ])
    )

    const _name = Object.keys(LambdaFunctionJSON(i))[0]
    // setup a dummy object and use the side channel to set all the same properties
    const ret = new LambdaFunction({
      name: '',
      handler: '',
      role: '',
      code: '',
      runtime: 'nodejs10.x'
    })
    ret.name = _name
    ret.Properties = i[_name].Properties
    return ret
  }
  _name (n: string) {
    this.name = n
    return this
  }
  functionName (i: string | IGetAtt | IRef) {
    this.Properties.FunctionName = i
    return this
  }
  role (r: string | IGetAtt | IRef) {
    this.Properties.Role = r
    return this
  }
  handler (i: string | IGetAtt | IRef) {
    this.Properties.Handler = i
    return this
  }
  runtime (r: ILambda_Runtimes) {
    this.Properties.Runtime = r
    return this
  }
  desc (d: string) {
    this.Properties.Description = d
    return this
  }
  /**
   * @param _sizeMB - Choose MB (number) in increments of 64.
   * @description Build the Layers
   * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-function.html#cfn-lambda-function-layers>
   */
  layers (...layerArns: (string | IGetAtt | IRef)[]) {
    this.Properties.Layers = layerArns
    return this
  }
  /**
   * @param _sizeMB - Choose MB (number) in increments of 64.
   * @description Build the MemorySize attribute
   * @throws if size is not multiple of 64
   */
  memSize (_sizeMB: number) {
    if (_sizeMB % 64 === 0) {
      this.Properties.MemorySize = _sizeMB
    } else {
      throw new Error(`expecting memorySize to be a multiple of 64 - got:${_sizeMB}`)
    }
    return this
  }
  /**
   * @param n - Integer > 0.
   * @description Build the ReservedConcurrentExecutions attribute
   * @throws if param: n <= 0
   */
  concurrentExecs (n: number) {
    if (n <= 0) {
      throw new Error(``)
    }
    this.Properties.ReservedConcurrentExecutions = n
    return this
  }
  /**
   * @param i - Build out the Property: Code .
   * @throws if S3 Locaition is detected - but invalid data is found
   */
  code (i: string | { bucket: string; key: string; version?: string }) {
    // @todo - blow out the accepted types and leverage private API

    this.Properties.Code =
      typeof i !== 'string'
        ? { S3Bucket: i.bucket, S3Key: i.key, S3ObjectVersion: i.version }
        : !i.startsWith('s3://')
          ? { ZipFile: i }
          : {
            S3Bucket: urlToOptions(i).Bucket || '',
            S3Key: urlToOptions(i).Key || '',
            S3ObjectVersion: urlToOptions(i).v
          }
    if (typeof i !== 'string' && (i.bucket === '' || i.key === '')) {
      throw new Error(
        `the S3 code location needs a legit location with bucket and key` +
          ` information provided - but instead got:: ${JSON.stringify({ ...i })}`
      )
    }
    return this
  }
  // private codeInBucket (i: { bucket: string; key: string; version?: string }) {
  //   return this
  // }
  // private codeBundler (f: string) {
  //   return this
  // }
  // private codeInFile (f: string) {
  //   return this
  // }
  // private async codeInStreamAsync (i: ReadStream) {
  //   // @question @thinking @wip
  //   // do we really want to introduce network calls to template-gen?
  //   const a = new AWS.S3().listObjectsV2({ Bucket: '' }).createReadStream()
  //   const result = await a.pipe(zlib).pipe(concat())
  //   this.Properties.Code = { ZipFile: result }
  //   return this
  // }

  tracing (t: 'Active' | 'PassThrough') {
    this.Properties.TracingConfig = { Mode: t }
    return this
  }
  tags (...t: Itags[]) {
    this.Properties.Tags = tags(t)
    return this
  }
  vpc (i: { secGrpIds: (string | IGetAtt | IRef)[]; subnets: (string | IGetAtt | IRef)[] }) {
    this.Properties.VpcConfig = { SecurityGroupIds: i.secGrpIds, SubnetIds: i.subnets }
    return this
  }
  /**
   * @param N - Max number of sec for expected runtime [3,900].
   * @description see how long this function should be permitted to run
   * @note constuctor sets the default to `120` and this builder fn takes the absolute value of the input such that its always positive
   * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-function.html#cfn-lambda-function-timeout>
   */
  timeout (N: number) {
    this.Properties.Timeout = N > 0 ? N : -N
    return this
  }
  async settle (): Promise<LambdaFunction> {
    await Promise.all(Object.values(this._promises))
    return this
  }
  toJSON (withRelated?: boolean): object[] {
    return []
  }
  Ref (): IRef {
    return { Ref: this.name }
  }
  Arn (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'Arn'] }
  }
}

export interface ILambdaFunc_min {
  name: IStrRefGetAtt
  handler: IStrRefGetAtt
  role: IStrRefGetAtt
  code: string | { bucket: string; key: string; version?: string }
  runtime: ILambda_Runtimes | ILambda_RuntimesEnums
  // --
  desc?: string
  kmsArn?: IStrRefGetAtt
  layers?: IStrRefGetAtt[]
  memSize?: number
  concurrent?: number
  timeout?: number
  deadLetter?: IStrRefGetAtt // (arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()
  environment?: Itags
  tracingConfig?: 'Active' | 'PassThrough'
  vpc?: {
    secGrpIds: IStrRefGetAtt[]
    subnets: IStrRefGetAtt[]
  }
  tags?: Itags
}

export interface ILambdaFunc_json {
  [name: string]: {
    Type: 'AWS::Lambda::Function'
    Properties: ILambdaFunc_Props
  }
}

export interface ILambdaFunc_Props {
  FunctionName: IStrRefGetAtt
  Handler: IStrRefGetAtt
  Role: IStrRefGetAtt
  Runtime: ILambda_Runtimes
  Code:
    | {
        S3Bucket: string
        S3Key: string
        S3ObjectVersion?: string
      }
    | { ZipFile: string }

  Description?: string
  KmsKeyArn?: IStrRefGetAtt
  Layers?: IStrRefGetAtt[]
  MemorySize?: number
  ReservedConcurrentExecutions?: number
  Timeout?: number

  DeadLetterConfig?: {
    TargetArn?: IStrRefGetAtt // (arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()
  }
  Environment?: {
    Variables?: { [key: string]: string }
  }
  TracingConfig?: {
    Mode: 'Active' | 'PassThrough'
  }
  VpcConfig?: {
    SecurityGroupIds: IStrRefGetAtt[]
    SubnetIds: IStrRefGetAtt[]
  }
  Tags?: ITags[]
}
