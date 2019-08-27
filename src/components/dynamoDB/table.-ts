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
  ifType
} from '../../utils/validations/objectCheck'
class DynamoDBTable implements squals {
  name: string
  Type = 'AWS::DynamoDB::Table'
  Properties: IDynamoDBTable_props

  constructor () {
    this.name = genComponentName()
    this.Properties = {}
    // finish the constructor
  }

  static fromString (s: string) {
    return DynamoDBTable.validate(JSON.parse(s))
  }

  static fromJSON (i: object) {
    return DynamoDBTable.validateJSON(i as IDynamoDBTable_json)
  }

  static fromJS (i: object) {
    return DynamoDBTable.validateJS(i as IDynamoDBTable_min)
  }

  static from (i: string | object) {
    return DynamoDBTable.validate(i)
  }

  static validate (i: string | object) {
    return validatorGeneric<DynamoDBTable>(i)
  }

  static validateJS (i: IDynamoDBTable_min) {
    throw new Error('not implemented yet')
  }

  static validateJSON (i: IDynamoDBTable_json) {
    throw new Error('not implemented yet')
  }

  _name (s: string) {
    this.name = s
    return this
  }

  toJSON () {
    return {
      [this.name]: {
        Type: 'AWS::DynamoDB::Table',
        Properties: this.Properties
      }
    }
  }

  /**
   * @param i - Object[].
   * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html#cfn-dynamodb-table-attributedef>
   */
  attributeDefinitions (i: object[]) {
    this.Properties.AttributeDefinitions = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html#cfn-dynamodb-table-billingmode>
   */
  billingMode (i: IStrRefGetAtt) {
    this.Properties.BillingMode = i
    return this
  }

  /**
   * @param i - Object[].
   * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html#cfn-dynamodb-table-gsi>
   */
  globalSecondaryIndexes (i: object[]) {
    this.Properties.GlobalSecondaryIndexes = i
    return this
  }

  /**
   * @param i - Object[].
   * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html#cfn-dynamodb-table-keyschema>
   */
  keySchema (i: object[]) {
    this.Properties.KeySchema = i
    return this
  }

  /**
   * @param i - Object[].
   * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html#cfn-dynamodb-table-lsi>
   */
  localSecondaryIndexes (i: object[]) {
    this.Properties.LocalSecondaryIndexes = i
    return this
  }

  /**
   * @param i - Object.
   * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html#cfn-dynamodb-table-pointintimerecoveryspecification>
   */
  pointInTimeRecoverySpecification (i: object) {
    this.Properties.PointInTimeRecoverySpecification = i
    return this
  }

  /**
   * @param i - Object.
   * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html#cfn-dynamodb-table-provisionedthroughput>
   */
  provisionedThroughput (i: object) {
    this.Properties.ProvisionedThroughput = i
    return this
  }

  /**
   * @param i - Object.
   * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html#cfn-dynamodb-table-ssespecification>
   */
  sSESpecification (i: object) {
    this.Properties.SSESpecification = i
    return this
  }

  /**
   * @param i - Object.
   * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html#cfn-dynamodb-table-streamspecification>
   */
  streamSpecification (i: object) {
    this.Properties.StreamSpecification = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html#cfn-dynamodb-table-tablename>
   */
  tableName (i: IStrRefGetAtt) {
    this.Properties.TableName = i
    return this
  }

  /**
   * @param i - Object[].
   * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html#cfn-dynamodb-table-tags>
   */
  tags (i: object[]) {
    this.Properties.Tags = i
    return this
  }

  /**
   * @param i - Object.
   * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html#cfn-dynamodb-table-timetolivespecification>
   */
  timeToLiveSpecification (i: object) {
    this.Properties.TimeToLiveSpecification = i
    return this
  }

  StreamArn () {
    return { 'Fn::GetAtt': [this.name, 'StreamArn'] }
  }

  Arn () {
    return { 'Fn::GetAtt': [this.name, 'Arn'] }
  }
}

// # region interfaces
interface IDynamoDBTable_min {
  attributeDefinitions?: [
    {
      AttributeName: IStrRefGetAtt
      AttributeType: IStrRefGetAtt
    }
  ]
  billingMode?: IStrRefGetAtt
  globalSecondaryIndexes?: [
    {
      IndexName: IStrRefGetAtt
      KeySchema: [
        {
          AttributeName: IStrRefGetAtt
          KeyType: IStrRefGetAtt
        }
      ]
      Projection: {
        NonKeyAttributes?: IStrRefGetAtt[]
        ProjectionType?: IStrRefGetAtt
      }
      ProvisionedThroughput?: {
        ReadCapacityUnits: number
        WriteCapacityUnits: number
      }
    }
  ]
  keySchema: [
    {
      AttributeName: IStrRefGetAtt
      KeyType: IStrRefGetAtt
    }
  ]
  localSecondaryIndexes?: [
    {
      IndexName: IStrRefGetAtt
      KeySchema: [
        {
          AttributeName: IStrRefGetAtt
          KeyType: IStrRefGetAtt
        }
      ]
      Projection: {
        NonKeyAttributes?: IStrRefGetAtt[]
        ProjectionType?: IStrRefGetAtt
      }
    }
  ]
  pointInTimeRecoverySpecification?: {
    PointInTimeRecoveryEnabled?: boolean
  }
  provisionedThroughput?: {
    ReadCapacityUnits: number
    WriteCapacityUnits: number
  }
  sSESpecification?: {
    SSEEnabled: boolean
  }
  streamSpecification?: {
    StreamViewType: IStrRefGetAtt
  }
  tableName?: IStrRefGetAtt
  tags?: [
    {
      Key: string
      Value: string
    }
  ]
  timeToLiveSpecification?: {
    AttributeName: IStrRefGetAtt
    Enabled: boolean
  }
}

interface IDynamoDBTable_props {
  AttributeDefinitions?: [
    {
      AttributeName: IStrRefGetAtt
      AttributeType: IStrRefGetAtt
    }
  ]
  BillingMode?: IStrRefGetAtt
  GlobalSecondaryIndexes?: [
    {
      IndexName: IStrRefGetAtt
      KeySchema: [
        {
          AttributeName: IStrRefGetAtt
          KeyType: IStrRefGetAtt
        }
      ]
      Projection: {
        NonKeyAttributes?: IStrRefGetAtt[]
        ProjectionType?: IStrRefGetAtt
      }
      ProvisionedThroughput?: {
        ReadCapacityUnits: number
        WriteCapacityUnits: number
      }
    }
  ]
  KeySchema: [
    {
      AttributeName: IStrRefGetAtt
      KeyType: IStrRefGetAtt
    }
  ]
  LocalSecondaryIndexes?: [
    {
      IndexName: IStrRefGetAtt
      KeySchema: [
        {
          AttributeName: IStrRefGetAtt
          KeyType: IStrRefGetAtt
        }
      ]
      Projection: {
        NonKeyAttributes?: IStrRefGetAtt[]
        ProjectionType?: IStrRefGetAtt
      }
    }
  ]
  PointInTimeRecoverySpecification?: {
    PointInTimeRecoveryEnabled?: boolean
  }
  ProvisionedThroughput?: {
    ReadCapacityUnits: number
    WriteCapacityUnits: number
  }
  SSESpecification?: {
    SSEEnabled: boolean
  }
  StreamSpecification?: {
    StreamViewType: IStrRefGetAtt
  }
  TableName?: IStrRefGetAtt
  Tags?: [
    {
      Key: string
      Value: string
    }
  ]
  TimeToLiveSpecification?: {
    AttributeName: IStrRefGetAtt
    Enabled: boolean
  }
}

interface IDynamoDBTable_json {
  [n: string]: {
    Type: 'AWS::DynamoDB::Table'
    Properties: IDynamoDBTable_props
  }
}
// # endregion interfaces
