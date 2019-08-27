// @todo post-code-generation
//
// 1. Go through and remove all refs of object
// 2. Look for enums in the documentation
// 3. Flatten deep structures in the _min interface
// 4. finish the constructor that maps the _min inputs to the _props outputs
// 5. Look at the relationship between objects - consider if there would be a need for a _linkedData = {stringKey: object[] }
// 6. Look for MultiMode, All-optional sections - and teas out if that should be a required union type Ex: LmabdaFunction:Code
// 7. Chop Up Mega interfaces to make them more apprachable Ex: S3-Bucket
// 8. Deal with remaining typescript warnings
//
import {
  squals,
  struct,
  baseSchemas,
  validatorGeneric,
  genComponentName,
  IStrRefGetAtt,
  IGetAtt,
  ITags,
  Itags,
  IRef
} from '../Template'
import {
  verifyIfThen,
  ifHas,
  multipleOf,
  stringNotEqual,
  ifType,
  ifCondition
} from '../../utils/validations/objectCheck'
export class KinesisFirehoseDeliveryStream implements squals {
  // #region attributes
  name: string
  Type = 'AWS::KinesisFirehose::DeliveryStream'
  Properties: IKinesisFirehoseDeliveryStream_props
  _defaults: {
    retryDurionSec: number
  }

  // #endregion attributes

  constructor (i: IKinesisFirehoseDeliveryStream_min) {
    this.name = genComponentName(i.name)
    this._defaults = { retryDurionSec: 60 }
    this.Properties = {
      ...(i.deliveryStreamName ? { DeliveryStreamName: i.deliveryStreamName } : {}),
      ...(i.deliveryStreamType ? { DeliveryStreamType: i.deliveryStreamType } : {})
    }
    const { deliveryStreamName, deliveryStreamType, name, ...theRest } = i
    this.configureDestination(theRest)
  }
  static _cw (i: Icw_config_min): ICloudWatchConfig_props {
    return {
      Enabled: 'enabled' in i ? i.enabled : true,
      LogGroupName: i.group,
      LogStreamName: i.stream
    }
  }
  static _encryption (i: IencConfig_min): IEncryptionConfiguration_props {
    return i.keyArn === 'NoEncryption'
      ? { NoEncryptionConfig: 'NoEncryption' }
      : { KMSEncryptionConfig: { AWSKMSKeyARN: i.keyArn } }
  }
  static _processors (...iList: Iprocessor_min[]): Iprocessor_prop[] {
    return iList.map(topListEntry => {
      return {
        Type: 'Lambda',
        Parameters: topListEntry.params.map(param => ({
          ParameterName: param.name,
          ParameterValue: param.value
        }))
      } as Iprocessor_prop
    })
  }
  static _s3 (i: Is3_config_min): IS3DestinationConfiguration {
    return {
      BucketARN: i.bucketARN,
      RoleARN: i.roleARN,
      CompressionFormat: i.compression,
      BufferingHints: { IntervalInSeconds: i.hints.s, SizeInMBs: i.hints.MBs },
      ...(i.prefix ? { Prefix: i.prefix } : {}),
      ...(i.errPrefix ? { ErrorOutputPrefix: i.errPrefix } : {}),
      ...(i.encryption ? { EncryptionConfiguration: this._encryption(i.encryption) } : {}),
      ...(i.cw ? { CloudWatchLoggingOptions: this._cw(i.cw) } : {})
    }
  }
  static _s3Dest (i: s3DestinationConfiguration_min): IS3DestinationConfiguration {
    const { opt, ...s3_min } = i
    return this._s3(s3_min)
  }
  static _kinesis (i: kinesisStreamSourceConfiguration_min): IKinesisStreamSourceConfiguration {
    return { RoleARN: i.roleARN, KinesisStreamARN: i.kinesisStreamARN }
  }
  static _elasticSearch (
    i: elasticsearchDestinationConfiguration_min,
    _defaults = { retryDurionSec: 60 }
  ): IElasticsearchDestinationConfiguration {
    return {
      DomainARN: i.domainARN,
      IndexName: i.indexName,
      RoleARN: i.roleARN,
      TypeName: i.typeName,
      IndexRotationPeriod: i.indexRotationPeriod,
      BufferingHints: { IntervalInSeconds: i.hints.s, SizeInMBs: i.hints.MBs },
      RetryOptions: { DurationInSeconds: i.retryDurationSec || _defaults.retryDurionSec },
      S3Configuration: this._s3(i.s3),
      ...(i.cw ? { CloudWatchLoggingOptions: this._cw(i.cw) } : {}),
      ...(i.s3BackupMode ? { S3BackupMode: i.s3BackupMode } : { S3BackupMode: 'Enabled' }),
      ...(i.processWith
        ? {
          ProcessingConfiguration: {
            Enabled: i.processWith.enabled,
            ...(i.processWith.processors
              ? { Processors: this._processors(...i.processWith.processors) }
              : {})
          }
        }
        : {})
    }
  }
  static _redshift (i: redshiftDestinationConfiguration_min): IRedshiftDestinationConfiguration {
    return {
      RoleARN: i.roleARN,
      Password: i.password,
      Username: i.username,
      S3Configuration: this._s3(i.s3),
      ClusterJDBCURL: i.clusterJDBCURL,
      CopyCommand: {
        CopyOptions: i.copyCmd.options,
        DataTableColumns: i.copyCmd.dataTableCols,
        DataTableName: i.copyCmd.dataTableName
      },
      ...(i.cw ? { CloudWatchLoggingOptions: this._cw(i.cw) } : {}),
      ...(i.processWith
        ? {
          ProcessingConfiguration: {
            Enabled: i.processWith.enabled,
            ...(i.processWith.processors
              ? { Processors: this._processors(...i.processWith.processors) }
              : {})
          }
        }
        : {})
    }
  }
  static _splunk (i: splunkDestinationConfiguration_min): ISplunkDestinationConfiguration {
    return {
      HECEndpoint: i.hec.endpoint,
      HECToken: i.hec.token,
      HECEndpointType: i.hec.endpointType,
      HECAcknowledgmentTimeoutInSeconds: i.hec.acknowledgmentTimeoutInSeconds,
      S3Configuration: this._s3(i.s3),
      ...(i.cw ? { CloudWatchLoggingOptions: this._cw(i.cw) } : {}),
      ...(i.retryDurationSec ? { RetryOptions: { DurationInSeconds: i.retryDurationSec } } : {}),
      ...(i.s3BackupMode ? { S3BackupMode: i.s3BackupMode } : {}),
      ...(i.processWith
        ? {
          ProcessingConfiguration: {
            Enabled: i.processWith.enabled,
            ...(i.processWith.processors
              ? { Processors: this._processors(...i.processWith.processors) }
              : {})
          }
        }
        : {})
    }
  }
  static _s3Extended (
    i: extendedS3DestinationConfiguration_min
  ): IExtendedS3DestinationConfiguration {
    const schema = (i: S3ExtendedDataConversionSchema_min): IExtendedS3_SchemaConfiguration => ({
      CatalogId: i.catalogId,
      DatabaseName: i.databaseName,
      Region: i.region,
      RoleARN: i.roleARN,
      TableName: i.tableName,
      VersionId: i.versionId
    })
    const inFmt = (
      i: S3ExtendedDataConversionInputFmt_min
    ): IExtendedS3_InputFormatConfiguration => {
      let ret: IExtendedS3_InputFormatConfiguration = { Deserializer: {} }
      if (!(i.hiveJson || i.openXJson)) {
        throw new Error(`please use one of the input Deserializers`)
      }
      if (i.hiveJson) {
        ret.Deserializer.HiveJsonSerDe = { TimestampFormats: i.hiveJson.timestampFormats }
      }
      if (i.openXJson) {
        ret.Deserializer.OpenXJsonSerDe = {
          CaseInsensitive: i.openXJson.caseInsensitive,
          ColumnToJsonKeyMappings: i.openXJson.columnToJsonKeyMappings,
          ConvertDotsInJsonKeysToUnderscores: i.openXJson.convertDotsInJsonKeysToUnderscores
        }
      }
      return ret
    }
    const outFmt = (
      i: S3ExtendedDataConversionOutFmt_min
    ): IExtendedS3_OutputFormatConfiguration => {
      let ret: IExtendedS3_OutputFormatConfiguration = { Serializer: {} }

      if (!(i.orc || i.parquet)) {
        throw new Error(`pick a Serializer`)
      }
      if (i.orc) {
        ret.Serializer.OrcSerDe = {
          BlockSizeBytes: i.orc.blockSizeBytes,
          BloomFilterColumns: i.orc.bloomFilterColumns,
          BloomFilterFalsePositiveProbability: i.orc.bloomFilterFalsePositiveProbability,
          Compression: i.orc.compression,
          DictionaryKeyThreshold: i.orc.dictionaryKeyThreshold,
          EnablePadding: i.orc.enablePadding,
          FormatVersion: i.orc.formatVersion,
          PaddingTolerance: i.orc.paddingTolerance,
          RowIndexStride: i.orc.rowIndexStride,
          StripeSizeBytes: i.orc.stripeSizeBytes
        }
      }
      if (i.parquet) {
        ret.Serializer.ParquetSerDe = {
          BlockSizeBytes: i.parquet.blockSizeBytes,
          Compression: i.parquet.compression,
          EnableDictionaryCompression: i.parquet.enableDictionaryCompression,
          MaxPaddingBytes: i.parquet.maxPaddingBytes,
          PageSizeBytes: i.parquet.pageSizeBytes,
          WriterVersion: i.parquet.writerVersion
        }
      }
      return ret
    }

    const ret: IExtendedS3DestinationConfiguration = {
      BucketARN: i.bucketARN,
      BufferingHints: { IntervalInSeconds: i.hints.s, SizeInMBs: i.hints.MBs },
      CompressionFormat: i.compression,
      RoleARN: i.roleARN,
      ...(i.prefix ? { Prefix: i.prefix } : {}),
      ...(i.s3BackupMode ? { S3BackupMode: i.s3BackupMode } : {}),
      ...(i.s3 ? { S3BackupConfiguration: this._s3(i.s3) } : {}),
      ...(i.cw ? { CloudWatchLoggingOptions: this._cw(i.cw) } : {}),
      ...(i.encryption ? { EncryptionConfiguration: this._encryption(i.encryption) } : {}),
      ...(i.errPrefix ? { ErrorOutputPrefix: i.errPrefix } : {}),
      ...(i.processWith
        ? {
          ProcessingConfiguration: {
            Enabled: i.processWith.enabled,
            ...(i.processWith.processors
              ? { Processors: this._processors(...i.processWith.processors) }
              : {})
          }
        }
        : {}),
      ...(i.dataConversion
        ? {
          DataFormatConversionConfiguration: {
            Enabled: i.dataConversion.enabled,
            SchemaConfiguration: schema(i.dataConversion.schema),
            InputFormatConfiguration: inFmt(i.dataConversion.inputFmt),
            OutputFormatConfiguration: outFmt(i.dataConversion.outputFmt)
          }
        }
        : {})
    }
    return ret
  }

  static fromString (s: string): KinesisFirehoseDeliveryStream {
    return KinesisFirehoseDeliveryStream.validate(JSON.parse(s))
  }

  static fromJSON (i: object): KinesisFirehoseDeliveryStream {
    return KinesisFirehoseDeliveryStream.validateJSON(i as IKinesisFirehoseDeliveryStream_json)
  }

  static fromJS (i: object): KinesisFirehoseDeliveryStream {
    return KinesisFirehoseDeliveryStream.validateJS(i as IKinesisFirehoseDeliveryStream_min)
  }

  static from (i: string | object): KinesisFirehoseDeliveryStream {
    return KinesisFirehoseDeliveryStream.validate(i)
  }

  /**
   * @description is the smart/ergonomic function that the various input options
   * @throws
   * @param i - Is the input interface for the KinesisFirehoseDeliveryStream.
   *
   */
  static validate (i: string | object): KinesisFirehoseDeliveryStream {
    return validatorGeneric<KinesisFirehoseDeliveryStream>(
      i as squals,
      KinesisFirehoseDeliveryStream
    )
  }

  /**
   * @param i - Is the input interface for the KinesisFirehoseDeliveryStream.
   * @throws
   *
   */
  static validateJS (i: IKinesisFirehoseDeliveryStream_min): KinesisFirehoseDeliveryStream {
    // validation logic here
    throw new Error(`Yikes not real excited to make this part yet...`)
  }

  /**
   * @param i - Is the JSON interface for the KinesisFirehoseDeliveryStream.
   * @throws
   *
   */
  static validateJSON (i: IKinesisFirehoseDeliveryStream_json): KinesisFirehoseDeliveryStream {
    // validation logic here then...
    // dummy constuctor object
    throw new Error(`yikes not implemented yet`)
    const ret = new KinesisFirehoseDeliveryStream({
      opt: 'kinesis',
      roleARN: '',
      kinesisStreamARN: ''
    })
    ret.name = Object.keys(i)[0]
    ret.Properties = i[ret.name].Properties
    return ret
  }

  toJSON (): IKinesisFirehoseDeliveryStream_json {
    const newLocal: IKinesisFirehoseDeliveryStream_json = {
      [this.name]: { Type: 'AWS::KinesisFirehose::DeliveryStream', Properties: this.Properties }
    }
    return newLocal
  }

  _name (s: string): KinesisFirehoseDeliveryStream {
    this.name = s
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisfirehose-deliverystream.html#cfn-kinesisfirehose-deliverystream-deliverystreamname>
   */
  deliveryStreamName (i: IStrRefGetAtt): KinesisFirehoseDeliveryStream {
    this.Properties.DeliveryStreamName = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisfirehose-deliverystream.html#cfn-kinesisfirehose-deliverystream-deliverystreamtype>
   */
  deliveryStreamType (i: IStrRefGetAtt): KinesisFirehoseDeliveryStream {
    this.Properties.DeliveryStreamType = i
    return this
  }

  /**
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisfirehose-deliverystream.html#cfn-kinesisfirehose-deliverystream-deliverystreamtype>
   * @param i - Is a multi type param where you might first type the opt: 's3' | 's3ext' | 'redshift' | 'kinesis' | 'splunk' | 'elasticSearch'.
   */
  configureDestination (i: IStreamDestinationOptions_min): KinesisFirehoseDeliveryStream {
    switch (i.opt) {
      case 'elasticSearch':
        this.Properties.ElasticsearchDestinationConfiguration = KinesisFirehoseDeliveryStream._elasticSearch(
          i
        )
        break
      case 'kinesis':
        this.Properties.KinesisStreamSourceConfiguration = KinesisFirehoseDeliveryStream._kinesis(i)
        break
      case 's3':
        this.Properties.S3DestinationConfiguration = KinesisFirehoseDeliveryStream._s3Dest(i)
        break
      case 's3ext':
        this.Properties.ExtendedS3DestinationConfiguration = KinesisFirehoseDeliveryStream._s3Extended(
          i
        )
        break
      case 'redshift':
        this.Properties.RedshiftDestinationConfiguration = KinesisFirehoseDeliveryStream._redshift(
          i
        )
        break
      case 'splunk':
        this.Properties.SplunkDestinationConfiguration = KinesisFirehoseDeliveryStream._splunk(i)
        break
      default:
        throw new Error(`that was not a valid opt`)
    }
    return this
  }

  Arn (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'Arn'] }
  }
}

// #region interfaces

type IcompressionTypes = 'GZIP' | 'Snappy' | 'UNCOMPRESSED' | 'ZIP'

// #region minimal interfaces

// #region reusableComponents
interface Icw_config_min {
  enabled?: boolean
  group?: IStrRefGetAtt
  stream?: IStrRefGetAtt
}

interface IencConfig_min {
  keyArn: 'NoEncryption' | IStrRefGetAtt
}

interface Is3_config_min {
  prefix?: IStrRefGetAtt
  roleARN: IStrRefGetAtt
  bucketARN: IStrRefGetAtt
  errPrefix?: IStrRefGetAtt
  compression: IcompressionTypes
  encryption?: IencConfig_min
  cw?: Icw_config_min
  hints: {
    s: number
    MBs: number
  }
}

interface Iprocessing_config_min {
  enabled?: boolean
  processors?: Iprocessor_min[]
}

interface Iprocessor_min {
  type?: 'Lambda'
  params: {
    name:
      | 'BufferIntervalInSeconds'
      | 'BufferSizeInMBs'
      | 'LambdaArn'
      | 'NumberOfRetries'
      | 'RoleArn'
    value: IStrRefGetAtt
  }[]
}

interface S3ExtendedDataConversionInputFmt_min {
  hiveJson?: {
    timestampFormats: IStrRefGetAtt[]
  }
  openXJson?: {
    caseInsensitive?: boolean
    columnToJsonKeyMappings?: { [k: string]: string }
    convertDotsInJsonKeysToUnderscores?: boolean
  }
}

interface S3ExtendedDataConversionOutFmt_min {
  orc?: {
    blockSizeBytes?: number
    bloomFilterColumns?: IStrRefGetAtt[]
    bloomFilterFalsePositiveProbability?: number
    compression?: IStrRefGetAtt
    dictionaryKeyThreshold?: number
    enablePadding?: boolean
    formatVersion?: IStrRefGetAtt
    paddingTolerance?: number
    rowIndexStride?: number
    stripeSizeBytes?: number
  }
  parquet?: {
    blockSizeBytes?: number
    compression?: IStrRefGetAtt
    enableDictionaryCompression?: boolean
    maxPaddingBytes?: number
    pageSizeBytes?: number
    writerVersion?: IStrRefGetAtt
  }
}

interface S3ExtendedDataConversionSchema_min {
  catalogId: IStrRefGetAtt
  databaseName: IStrRefGetAtt
  region: IStrRefGetAtt
  roleARN: IStrRefGetAtt
  tableName: IStrRefGetAtt
  versionId: IStrRefGetAtt
}

// #endregion reusableComponents

type IKinesisFirehoseDeliveryStream_min = IKinesisFirehoseDeliveryStream_min_base &
  IStreamDestinationOptions_min

interface IKinesisFirehoseDeliveryStream_min_base {
  name?: string
  deliveryStreamName?: IStrRefGetAtt
  deliveryStreamType?: 'DirectPut' | 'KinesisStreamAsSource'
  readonly opt: 's3' | 's3ext' | 'redshift' | 'kinesis' | 'splunk' | 'elasticSearch'
}

type IStreamDestinationOptions_min =
  | s3DestinationConfiguration_min
  | kinesisStreamSourceConfiguration_min
  | redshiftDestinationConfiguration_min
  | splunkDestinationConfiguration_min
  | elasticsearchDestinationConfiguration_min
  | extendedS3DestinationConfiguration_min

type s3DestinationConfiguration_min = { readonly opt: 's3' } & Is3_config_min

interface kinesisStreamSourceConfiguration_min {
  readonly opt: 'kinesis'
  kinesisStreamARN: IStrRefGetAtt
  roleARN: IStrRefGetAtt
}

interface redshiftDestinationConfiguration_min {
  readonly opt: 'redshift'
  clusterJDBCURL: IStrRefGetAtt
  password: IStrRefGetAtt
  username: IStrRefGetAtt
  roleARN: IStrRefGetAtt
  s3: Is3_config_min
  cw?: Icw_config_min
  processWith?: Iprocessing_config_min
  copyCmd: {
    options?: IStrRefGetAtt
    dataTableName: IStrRefGetAtt
    dataTableCols?: IStrRefGetAtt
  }
}

interface splunkDestinationConfiguration_min {
  readonly opt: 'splunk'
  hec: {
    endpoint: IStrRefGetAtt
    token: IStrRefGetAtt
    endpointType: IStrRefGetAtt
    acknowledgmentTimeoutInSeconds?: number
  }
  s3: Is3_config_min
  cw?: Icw_config_min
  processWith?: Iprocessing_config_min
  s3BackupMode?: 'Disabled' | 'Enabled'
  retryDurationSec?: number
}

interface elasticsearchDestinationConfiguration_min {
  readonly opt: 'elasticSearch'
  domainARN: IStrRefGetAtt
  indexName: IStrRefGetAtt
  indexRotationPeriod: IStrRefGetAtt
  roleARN: IStrRefGetAtt
  typeName: IStrRefGetAtt
  s3: Is3_config_min
  processWith?: Iprocessing_config_min
  cw?: Icw_config_min
  s3BackupMode?: 'Disabled' | 'Enabled'
  retryDurationSec?: number
  hints: {
    s: number
    MBs: number
  }
}

interface extendedS3DestinationConfiguration_min {
  readonly opt: 's3ext'
  bucketARN: IStrRefGetAtt
  compression: IcompressionTypes
  encryption?: IencConfig_min
  errPrefix?: IStrRefGetAtt
  prefix?: IStrRefGetAtt
  processWith?: Iprocessing_config_min
  roleARN: IStrRefGetAtt
  cw?: Icw_config_min
  s3BackupMode?: 'Disabled' | 'Enabled'
  s3?: Is3_config_min // yes optional on this one
  retryDurationSec?: number
  hints: {
    s: number
    MBs: number
  }
  dataConversion?: {
    enabled: boolean
    schema: S3ExtendedDataConversionSchema_min
    inputFmt: S3ExtendedDataConversionInputFmt_min
    outputFmt: S3ExtendedDataConversionOutFmt_min
  }
}

// #endregion minimal interfaces

// #region proper interfaces

interface IProcessorConfig {
  Enabled?: boolean
  Processors?: Iprocessor_prop[]
}

interface Iprocessor_prop {
  Type: 'Lambda'
  Parameters: {
    ParameterName:
      | 'BufferIntervalInSeconds'
      | 'BufferSizeInMBs'
      | 'LambdaArn'
      | 'NumberOfRetries'
      | 'RoleArn'
    ParameterValue: IStrRefGetAtt
  }[]
}

interface ICloudWatchConfig_props {
  Enabled?: boolean
  LogGroupName?: IStrRefGetAtt
  LogStreamName?: IStrRefGetAtt
}

interface IEncryptionConfiguration_props {
  NoEncryptionConfig?: 'NoEncryption'
  KMSEncryptionConfig?: {
    AWSKMSKeyARN: IStrRefGetAtt
  }
}

type IKinesisFirehoseDeliveryStream_props = {
  DeliveryStreamName?: IStrRefGetAtt
  DeliveryStreamType?: IStrRefGetAtt
  ExtendedS3DestinationConfiguration?: IExtendedS3DestinationConfiguration
  ElasticsearchDestinationConfiguration?: IElasticsearchDestinationConfiguration
  KinesisStreamSourceConfiguration?: IKinesisStreamSourceConfiguration
  RedshiftDestinationConfiguration?: IRedshiftDestinationConfiguration
  S3DestinationConfiguration?: IS3DestinationConfiguration
  SplunkDestinationConfiguration?: ISplunkDestinationConfiguration
}

interface IElasticsearchDestinationConfiguration {
  DomainARN: IStrRefGetAtt
  IndexName: IStrRefGetAtt
  IndexRotationPeriod: IStrRefGetAtt
  RoleARN: IStrRefGetAtt
  S3BackupMode: IStrRefGetAtt
  TypeName: IStrRefGetAtt
  S3Configuration: IS3DestinationConfiguration
  ProcessingConfiguration?: IProcessorConfig
  CloudWatchLoggingOptions?: ICloudWatchConfig_props
  RetryOptions: {
    DurationInSeconds: number
  }
  BufferingHints: {
    IntervalInSeconds: number
    SizeInMBs: number
  }
}

interface IKinesisStreamSourceConfiguration {
  KinesisStreamARN: IStrRefGetAtt
  RoleARN: IStrRefGetAtt
}

interface IRedshiftDestinationConfiguration {
  CloudWatchLoggingOptions?: ICloudWatchConfig_props
  ClusterJDBCURL: IStrRefGetAtt
  CopyCommand: {
    CopyOptions?: IStrRefGetAtt
    DataTableColumns?: IStrRefGetAtt
    DataTableName: IStrRefGetAtt
  }
  Password: IStrRefGetAtt
  ProcessingConfiguration?: IProcessorConfig
  RoleARN: IStrRefGetAtt
  S3Configuration: IS3DestinationConfiguration
  Username: IStrRefGetAtt
}

interface IS3DestinationConfiguration {
  BucketARN: IStrRefGetAtt
  BufferingHints: {
    IntervalInSeconds: number
    SizeInMBs: number
  }
  CloudWatchLoggingOptions?: ICloudWatchConfig_props
  CompressionFormat: IcompressionTypes
  EncryptionConfiguration?: {
    KMSEncryptionConfig?: {
      AWSKMSKeyARN: IStrRefGetAtt
    }
    NoEncryptionConfig?: IStrRefGetAtt
  }
  ErrorOutputPrefix?: IStrRefGetAtt
  Prefix?: IStrRefGetAtt
  RoleARN: IStrRefGetAtt
}

interface ISplunkDestinationConfiguration {
  CloudWatchLoggingOptions?: ICloudWatchConfig_props
  HECAcknowledgmentTimeoutInSeconds?: number
  HECEndpoint: IStrRefGetAtt
  HECEndpointType: IStrRefGetAtt
  HECToken: IStrRefGetAtt
  ProcessingConfiguration?: IProcessorConfig
  RetryOptions?: {
    DurationInSeconds: number
  }
  S3BackupMode?: IStrRefGetAtt
  S3Configuration: IS3DestinationConfiguration
}

interface IExtendedS3DestinationConfiguration {
  BucketARN: IStrRefGetAtt
  RoleARN: IStrRefGetAtt
  CompressionFormat: IcompressionTypes
  CloudWatchLoggingOptions?: ICloudWatchConfig_props
  ErrorOutputPrefix?: IStrRefGetAtt
  Prefix?: IStrRefGetAtt
  ProcessingConfiguration?: IProcessorConfig
  S3BackupConfiguration?: IS3DestinationConfiguration
  S3BackupMode?: IStrRefGetAtt
  BufferingHints: {
    IntervalInSeconds: number
    SizeInMBs: number
  }
  EncryptionConfiguration?: {
    NoEncryptionConfig?: 'NoEncryption'
    KMSEncryptionConfig?: {
      AWSKMSKeyARN: IStrRefGetAtt
    }
  }
  DataFormatConversionConfiguration?: {
    Enabled: boolean
    InputFormatConfiguration: IExtendedS3_InputFormatConfiguration
    OutputFormatConfiguration: IExtendedS3_OutputFormatConfiguration
    SchemaConfiguration: IExtendedS3_SchemaConfiguration
  }
}

interface IExtendedS3_InputFormatConfiguration {
  Deserializer: {
    HiveJsonSerDe?: {
      TimestampFormats?: IStrRefGetAtt[]
    }
    OpenXJsonSerDe?: {
      CaseInsensitive?: boolean // true
      ConvertDotsInJsonKeysToUnderscores?: boolean // false
      ColumnToJsonKeyMappings?: { [k: string]: string }
    }
  }
}

interface IExtendedS3_OutputFormatConfiguration {
  Serializer: {
    OrcSerDe?: {
      BlockSizeBytes?: number
      BloomFilterColumns?: IStrRefGetAtt[]
      BloomFilterFalsePositiveProbability?: number
      Compression?: IStrRefGetAtt
      DictionaryKeyThreshold?: number
      EnablePadding?: boolean
      FormatVersion?: IStrRefGetAtt
      PaddingTolerance?: number
      RowIndexStride?: number
      StripeSizeBytes?: number
    }
    ParquetSerDe?: {
      BlockSizeBytes?: number
      Compression?: IStrRefGetAtt
      EnableDictionaryCompression?: boolean
      MaxPaddingBytes?: number
      PageSizeBytes?: number
      WriterVersion?: IStrRefGetAtt
    }
  }
}

interface IExtendedS3_SchemaConfiguration {
  CatalogId: IStrRefGetAtt
  DatabaseName: IStrRefGetAtt
  Region: IStrRefGetAtt
  RoleARN: IStrRefGetAtt
  TableName: IStrRefGetAtt
  VersionId: IStrRefGetAtt
}

interface IKinesisFirehoseDeliveryStream_json {
  [name: string]: {
    Type: 'AWS::KinesisFirehose::DeliveryStream'
    Properties: IKinesisFirehoseDeliveryStream_props
  }
}

// #endregion proper interfaces

// #endregion interfaces
