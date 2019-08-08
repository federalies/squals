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

class CognitoIdentityPool implements squals {
  name: string
  Type = 'AWS::Cognito::IdentityPool'
  Properties: ICognitoIdentityPool_props

  constructor () {
    this.name = genComponentName()
    this.Properties = {}
    // finish the constructor
  }

  static fromString (s: string): CognitoIdentityPool {
    return CognitoIdentityPool.validate(JSON.parse(s))
  }

  static fromJSON (i: object): CognitoIdentityPool {
    return CognitoIdentityPool.validateJSON(i as ICognitoIdentityPool_json)
  }

  static fromJS (i: object): CognitoIdentityPool {
    return CognitoIdentityPool.validateJS(i as ICognitoIdentityPool_min)
  }

  static from (i: string | object): CognitoIdentityPool {
    return CognitoIdentityPool.validate(i)
  }

  static validate (i: string | object): CognitoIdentityPool {
    return validatorGeneric<CognitoIdentityPool>(i as squals, CognitoIdentityPool)
  }

  static validateJS (i: ICognitoIdentityPool_min): CognitoIdentityPool {
    // validation logic here
    return new CognitoIdentityPool(i)
  }

  static validateJSON (i: ICognitoIdentityPool_json): CognitoIdentityPool {
    // validation logic here then...
    const ret = new CognitoIdentityPool()
    ret.name = Object.keys(i)[0]
    ret.Properties = i[ret.name].Properties
    return ret
  }

  _name (s: string) {
    this.name = s
    return this
  }

  toJSON () {
    return {
      [this.name]: {
        Type: 'AWS::Cognito::IdentityPool',
        Properties: this.Properties
      }
    }
  }

  /**
   * @param i - Object.
   * @see [pushSync docs](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypool.html#cfn-cognito-identitypool-pushsync)
   */
  pushSync (i: object) {
    this.Properties.PushSync = i
    return this
  }

  /**
   * @param i - Object[].
   * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypool.html#cfn-cognito-identitypool-cognitoidentityproviders>
   */
  cognitoIdentityProviders (i: object[]) {
    this.Properties.CognitoIdentityProviders = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypool.html#cfn-cognito-identitypool-cognitoevents>
   */
  cognitoEvents (i: { [str: string]: object }) {
    this.Properties.CognitoEvents = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypool.html#cfn-cognito-identitypool-developerprovidername>
   */
  developerProviderName (i: IStrRefGetAtt) {
    this.Properties.DeveloperProviderName = i
    return this
  }

  /**
   * @param i - Object.
   * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypool.html#cfn-cognito-identitypool-cognitostreams>
   */
  cognitoStreams (i: object) {
    this.Properties.CognitoStreams = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypool.html#cfn-cognito-identitypool-identitypoolname>
   */
  identityPoolName (i: IStrRefGetAtt) {
    this.Properties.IdentityPoolName = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypool.html#cfn-cognito-identitypool-allowunauthenticatedidentities>
   */
  allowUnauthenticatedIdentities (i: boolean) {
    this.Properties.AllowUnauthenticatedIdentities = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypool.html#cfn-cognito-identitypool-supportedloginproviders>
   */
  supportedLoginProviders (i: { [str: string]: object }) {
    this.Properties.SupportedLoginProviders = i
    return this
  }

  /**
   * @param i - IStrRefGetAtt[].
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypool.html#cfn-cognito-identitypool-samlproviderarns>
   */
  samlProviderARNs (i: IStrRefGetAtt[]) {
    this.Properties.SamlProviderARNs = i
    return this
  }

  /**
   * @param i - IStrRefGetAtt[].
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypool.html#cfn-cognito-identitypool-openidconnectproviderarns>
   */
  openIdConnectProviderARNs (i: IStrRefGetAtt[]) {
    this.Properties.OpenIdConnectProviderARNs = i
    return this
  }

  Name () {
    return { 'Fn::GetAtt': [this.name, 'Name'] }
  }
}

// # region interfaces
interface ICognitoIdentityPool_min {
  name?: string
  allowUnAuth: boolean
  pushSync?: {
    appArn?: IStrRefGetAtt[]
    roleArn?: IStrRefGetAtt
  }
  cognitoIdProviders?: {
    ServerSideTokenCheck?: boolean
    ProviderName?: IStrRefGetAtt
    ClientId?: IStrRefGetAtt
  }[]
  cognitoEvents?: { [str: string]: object }
  developerProviderName?: IStrRefGetAtt
  cognitoStreams?: {
    StreamingStatus?: IStrRefGetAtt
    StreamName?: IStrRefGetAtt
    RoleArn?: IStrRefGetAtt
  }
  identityPoolName?: IStrRefGetAtt
  supportedLoginProviders?: { [str: string]: object }
  samlProviderARNs?: IStrRefGetAtt[]
  openIdConnectProviderARNs?: IStrRefGetAtt[]
}

interface ICognitoIdentityPool_props {
  AllowUnauthenticatedIdentities: boolean
  IdentityPoolName?: IStrRefGetAtt
  SupportedLoginProviders?: { [str: string]: object }
  SamlProviderARNs?: IStrRefGetAtt[]
  OpenIdConnectProviderARNs?: IStrRefGetAtt[]
  CognitoEvents?: { [str: string]: object }
  DeveloperProviderName?: IStrRefGetAtt
  PushSync?: {
    ApplicationArns?: IStrRefGetAtt[]
    RoleArn?: IStrRefGetAtt
  }
  CognitoIdentityProviders?: [
    {
      ServerSideTokenCheck?: boolean
      ProviderName?: IStrRefGetAtt
      ClientId?: IStrRefGetAtt
    }
  ]
  CognitoStreams?: {
    StreamingStatus?: IStrRefGetAtt
    StreamName?: IStrRefGetAtt
    RoleArn?: IStrRefGetAtt
  }
}

interface ICognitoIdentityPool_json {
  [n: string]: {
    Type: 'AWS::Cognito::IdentityPool'
    Properties: ICognitoIdentityPool_props
  }
}
// # endregion interfaces
