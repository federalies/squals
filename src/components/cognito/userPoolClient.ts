
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
      class CognitoUserPoolClient implements squals {
         name :string 
Type = 'AWS::Cognito::UserPoolClient' 
Properties :ICognitoUserPoolClient_props 

         
       constructor (  ) { 
         
            this.name = genComponentName()
            this.Properties = {}
            // finish the constructor
 } 


      static fromString ( s: string ) { 
         
 return CognitoUserPoolClient.validate(JSON.parse(s)) 
 } 


      static fromJSON ( i: object ) { 
         
 return CognitoUserPoolClient.validateJSON(i as ICognitoUserPoolClient_json ) 
 } 


      static fromJS ( i: object ) { 
         
 return  CognitoUserPoolClient.validateJS(i as ICognitoUserPoolClient_min ) 
 } 


      static from ( i: string | object ) { 
         
 return  CognitoUserPoolClient.validate(i) 
 } 


      static validate ( i: string | object ) { 
         
 return  validatorGeneric<CognitoUserPoolClient>(i) 
 } 


      static validateJS ( i: ICognitoUserPoolClient_min ) { 
         throw new Error('not implemented yet')
 } 


      static validateJSON ( i: ICognitoUserPoolClient_json ) { 
         throw new Error('not implemented yet')
 } 


       _name ( s: string ) { 
         this.name = s
 return this 
 } 


       toJSON (  ) { 
         
 return  {[this.name]:{
               Type:'AWS::Cognito::UserPoolClient',
               Properties: this.Properties
           }} 
 } 

/**
                  * @param i object
                  * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html#cfn-cognito-userpoolclient-analyticsconfiguration>
                  */
       analyticsConfiguration ( i: object ) { 
         this.Properties.AnalyticsConfiguration = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html#cfn-cognito-userpoolclient-generatesecret>
                           */
       generateSecret ( i: boolean ) { 
         this.Properties.GenerateSecret = i
 return this 
 } 

/**
                  * @param i - IStrRefGetAtt[]
                  * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html#cfn-cognito-userpoolclient-callbackurls>
                  */
       callbackURLs ( i: IStrRefGetAtt[] ) { 
         this.Properties.CallbackURLs = i
 return this 
 } 

/**
                  * @param i - IStrRefGetAtt[]
                  * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html#cfn-cognito-userpoolclient-allowedoauthscopes>
                  */
       allowedOAuthScopes ( i: IStrRefGetAtt[] ) { 
         this.Properties.AllowedOAuthScopes = i
 return this 
 } 

/**
                  * @param i - IStrRefGetAtt[]
                  * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html#cfn-cognito-userpoolclient-readattributes>
                  */
       readAttributes ( i: IStrRefGetAtt[] ) { 
         this.Properties.ReadAttributes = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html#cfn-cognito-userpoolclient-allowedoauthflowsuserpoolclient>
                           */
       allowedOAuthFlowsUserPoolClient ( i: boolean ) { 
         this.Properties.AllowedOAuthFlowsUserPoolClient = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html#cfn-cognito-userpoolclient-defaultredirecturi>
                           */
       defaultRedirectURI ( i: IStrRefGetAtt ) { 
         this.Properties.DefaultRedirectURI = i
 return this 
 } 

/**
                  * @param i - IStrRefGetAtt[]
                  * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html#cfn-cognito-userpoolclient-supportedidentityproviders>
                  */
       supportedIdentityProviders ( i: IStrRefGetAtt[] ) { 
         this.Properties.SupportedIdentityProviders = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html#cfn-cognito-userpoolclient-clientname>
                           */
       clientName ( i: IStrRefGetAtt ) { 
         this.Properties.ClientName = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html#cfn-cognito-userpoolclient-userpoolid>
                           */
       userPoolId ( i: IStrRefGetAtt ) { 
         this.Properties.UserPoolId = i
 return this 
 } 

/**
                  * @param i - IStrRefGetAtt[]
                  * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html#cfn-cognito-userpoolclient-allowedoauthflows>
                  */
       allowedOAuthFlows ( i: IStrRefGetAtt[] ) { 
         this.Properties.AllowedOAuthFlows = i
 return this 
 } 

/**
                  * @param i - IStrRefGetAtt[]
                  * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html#cfn-cognito-userpoolclient-explicitauthflows>
                  */
       explicitAuthFlows ( i: IStrRefGetAtt[] ) { 
         this.Properties.ExplicitAuthFlows = i
 return this 
 } 

/**
                  * @param i - IStrRefGetAtt[]
                  * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html#cfn-cognito-userpoolclient-logouturls>
                  */
       logoutURLs ( i: IStrRefGetAtt[] ) { 
         this.Properties.LogoutURLs = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html#cfn-cognito-userpoolclient-refreshtokenvalidity>
                           */
       refreshTokenValidity ( i: number ) { 
         this.Properties.RefreshTokenValidity = i
 return this 
 } 

/**
                  * @param i - IStrRefGetAtt[]
                  * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html#cfn-cognito-userpoolclient-writeattributes>
                  */
       writeAttributes ( i: IStrRefGetAtt[] ) { 
         this.Properties.WriteAttributes = i
 return this 
 } 


       Name (  ) { 
         
 return {'Fn::GetAtt':[this.name, 'Name']}  
 } 


       ClientSecret (  ) { 
         
 return {'Fn::GetAtt':[this.name, 'ClientSecret']}  
 } 

      }
      //# region interfaces
      interface ICognitoUserPoolClient_min 
        {
   analyticsConfiguration?: {
      UserDataShared?: boolean,
      ExternalId?: IStrRefGetAtt,
      ApplicationId?: IStrRefGetAtt,
      RoleArn?: IStrRefGetAtt
   },
   generateSecret?: boolean,
   callbackURLs?: IStrRefGetAtt[],
   allowedOAuthScopes?: IStrRefGetAtt[],
   readAttributes?: IStrRefGetAtt[],
   allowedOAuthFlowsUserPoolClient?: boolean,
   defaultRedirectURI?: IStrRefGetAtt,
   supportedIdentityProviders?: IStrRefGetAtt[],
   clientName?: IStrRefGetAtt,
   userPoolId: IStrRefGetAtt,
   allowedOAuthFlows?: IStrRefGetAtt[],
   explicitAuthFlows?: IStrRefGetAtt[],
   logoutURLs?: IStrRefGetAtt[],
   refreshTokenValidity?: number,
   writeAttributes?: IStrRefGetAtt[]
}
      
      interface ICognitoUserPoolClient_props
        {
   AnalyticsConfiguration?: {
      UserDataShared?: boolean,
      ExternalId?: IStrRefGetAtt,
      ApplicationId?: IStrRefGetAtt,
      RoleArn?: IStrRefGetAtt
   },
   GenerateSecret?: boolean,
   CallbackURLs?: IStrRefGetAtt[],
   AllowedOAuthScopes?: IStrRefGetAtt[],
   ReadAttributes?: IStrRefGetAtt[],
   AllowedOAuthFlowsUserPoolClient?: boolean,
   DefaultRedirectURI?: IStrRefGetAtt,
   SupportedIdentityProviders?: IStrRefGetAtt[],
   ClientName?: IStrRefGetAtt,
   UserPoolId: IStrRefGetAtt,
   AllowedOAuthFlows?: IStrRefGetAtt[],
   ExplicitAuthFlows?: IStrRefGetAtt[],
   LogoutURLs?: IStrRefGetAtt[],
   RefreshTokenValidity?: number,
   WriteAttributes?: IStrRefGetAtt[]
}
      
      interface ICognitoUserPoolClient_json {
      [n:string]:{
          Type: 'AWS::Cognito::UserPoolClient'
          Properties: ICognitoUserPoolClient_props
        }
      }
      //# endregion interfaces

      