
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
      class CognitoUserPool implements squals {
         name :string 
Type = 'AWS::Cognito::UserPool' 
Properties :ICognitoUserPool_props 

         
       constructor (  ) { 
         
            this.name = genComponentName()
            this.Properties = {}
            // finish the constructor
 } 


      static fromString ( s: string ) { 
         
 return CognitoUserPool.validate(JSON.parse(s)) 
 } 


      static fromJSON ( i: object ) { 
         
 return CognitoUserPool.validateJSON(i as ICognitoUserPool_json ) 
 } 


      static fromJS ( i: object ) { 
         
 return  CognitoUserPool.validateJS(i as ICognitoUserPool_min ) 
 } 


      static from ( i: string | object ) { 
         
 return  CognitoUserPool.validate(i) 
 } 


      static validate ( i: string | object ) { 
         
 return  validatorGeneric<CognitoUserPool>(i) 
 } 


      static validateJS ( i: ICognitoUserPool_min ) { 
         throw new Error('not implemented yet')
 } 


      static validateJSON ( i: ICognitoUserPool_json ) { 
         throw new Error('not implemented yet')
 } 


       _name ( s: string ) { 
         this.name = s
 return this 
 } 


       toJSON (  ) { 
         
 return  {[this.name]:{
               Type:'AWS::Cognito::UserPool',
               Properties: this.Properties
           }} 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-userpooltags>
                           */
       userPoolTags ( i: {[str:string]: object } ) { 
         this.Properties.UserPoolTags = i
 return this 
 } 

/**
                  * @param i object
                  * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-policies>
                  */
       policies ( i: object ) { 
         this.Properties.Policies = i
 return this 
 } 

/**
                  * @param i object
                  * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-verificationmessagetemplate>
                  */
       verificationMessageTemplate ( i: object ) { 
         this.Properties.VerificationMessageTemplate = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-mfaconfiguration>
                           */
       mfaConfiguration ( i: IStrRefGetAtt ) { 
         this.Properties.MfaConfiguration = i
 return this 
 } 

/**
                  * @param i object[]
                  * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-schema>
                  */
       schema ( i: object[] ) { 
         this.Properties.Schema = i
 return this 
 } 

/**
                  * @param i object
                  * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-admincreateuserconfig>
                  */
       adminCreateUserConfig ( i: object ) { 
         this.Properties.AdminCreateUserConfig = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-smsauthenticationmessage>
                           */
       smsAuthenticationMessage ( i: IStrRefGetAtt ) { 
         this.Properties.SmsAuthenticationMessage = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-userpoolname>
                           */
       userPoolName ( i: IStrRefGetAtt ) { 
         this.Properties.UserPoolName = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-smsverificationmessage>
                           */
       smsVerificationMessage ( i: IStrRefGetAtt ) { 
         this.Properties.SmsVerificationMessage = i
 return this 
 } 

/**
                  * @param i object
                  * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-userpooladdons>
                  */
       userPoolAddOns ( i: object ) { 
         this.Properties.UserPoolAddOns = i
 return this 
 } 

/**
                  * @param i object
                  * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-emailconfiguration>
                  */
       emailConfiguration ( i: object ) { 
         this.Properties.EmailConfiguration = i
 return this 
 } 

/**
                  * @param i object
                  * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-smsconfiguration>
                  */
       smsConfiguration ( i: object ) { 
         this.Properties.SmsConfiguration = i
 return this 
 } 

/**
                  * @param i - IStrRefGetAtt[]
                  * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-aliasattributes>
                  */
       aliasAttributes ( i: IStrRefGetAtt[] ) { 
         this.Properties.AliasAttributes = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-emailverificationsubject>
                           */
       emailVerificationSubject ( i: IStrRefGetAtt ) { 
         this.Properties.EmailVerificationSubject = i
 return this 
 } 

/**
                  * @param i object
                  * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-lambdaconfig>
                  */
       lambdaConfig ( i: object ) { 
         this.Properties.LambdaConfig = i
 return this 
 } 

/**
                  * @param i - IStrRefGetAtt[]
                  * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-usernameattributes>
                  */
       usernameAttributes ( i: IStrRefGetAtt[] ) { 
         this.Properties.UsernameAttributes = i
 return this 
 } 

/**
                  * @param i - IStrRefGetAtt[]
                  * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-autoverifiedattributes>
                  */
       autoVerifiedAttributes ( i: IStrRefGetAtt[] ) { 
         this.Properties.AutoVerifiedAttributes = i
 return this 
 } 

/**
                  * @param i object
                  * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-deviceconfiguration>
                  */
       deviceConfiguration ( i: object ) { 
         this.Properties.DeviceConfiguration = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html#cfn-cognito-userpool-emailverificationmessage>
                           */
       emailVerificationMessage ( i: IStrRefGetAtt ) { 
         this.Properties.EmailVerificationMessage = i
 return this 
 } 


       Arn (  ) { 
         
 return {'Fn::GetAtt':[this.name, 'Arn']}  
 } 


       ProviderURL (  ) { 
         
 return {'Fn::GetAtt':[this.name, 'ProviderURL']}  
 } 


       ProviderName (  ) { 
         
 return {'Fn::GetAtt':[this.name, 'ProviderName']}  
 } 

      }
      //# region interfaces
      interface ICognitoUserPool_min 
        {
   userPoolTags?: {[str:string]: object },
   policies?: {
      PasswordPolicy?: {
         RequireNumbers?: boolean,
         MinimumLength?: number,
         TemporaryPasswordValidityDays?: number,
         RequireUppercase?: boolean,
         RequireLowercase?: boolean,
         RequireSymbols?: boolean
      }
   },
   verificationMessageTemplate?: {
      EmailMessageByLink?: IStrRefGetAtt,
      EmailMessage?: IStrRefGetAtt,
      SmsMessage?: IStrRefGetAtt,
      EmailSubject?: IStrRefGetAtt,
      DefaultEmailOption?: IStrRefGetAtt,
      EmailSubjectByLink?: IStrRefGetAtt
   },
   mfaConfiguration?: IStrRefGetAtt,
   schema?: [
      {
         DeveloperOnlyAttribute?: boolean,
         Mutable?: boolean,
         AttributeDataType?: IStrRefGetAtt,
         StringAttributeConstraints?: {
            MinLength?: IStrRefGetAtt,
            MaxLength?: IStrRefGetAtt
         },
         Required?: boolean,
         NumberAttributeConstraints?: {
            MinValue?: IStrRefGetAtt,
            MaxValue?: IStrRefGetAtt
         },
         Name?: IStrRefGetAtt
      }
   ],
   adminCreateUserConfig?: {
      InviteMessageTemplate?: {
         EmailMessage?: IStrRefGetAtt,
         SMSMessage?: IStrRefGetAtt,
         EmailSubject?: IStrRefGetAtt
      },
      UnusedAccountValidityDays?: number,
      AllowAdminCreateUserOnly?: boolean
   },
   smsAuthenticationMessage?: IStrRefGetAtt,
   userPoolName?: IStrRefGetAtt,
   smsVerificationMessage?: IStrRefGetAtt,
   userPoolAddOns?: {
      AdvancedSecurityMode?: IStrRefGetAtt
   },
   emailConfiguration?: {
      ReplyToEmailAddress?: IStrRefGetAtt,
      EmailSendingAccount?: IStrRefGetAtt,
      SourceArn?: IStrRefGetAtt
   },
   smsConfiguration?: {
      ExternalId?: IStrRefGetAtt,
      SnsCallerArn?: IStrRefGetAtt
   },
   aliasAttributes?: IStrRefGetAtt[],
   emailVerificationSubject?: IStrRefGetAtt,
   lambdaConfig?: {
      CreateAuthChallenge?: IStrRefGetAtt,
      PreAuthentication?: IStrRefGetAtt,
      DefineAuthChallenge?: IStrRefGetAtt,
      PreSignUp?: IStrRefGetAtt,
      PreTokenGeneration?: IStrRefGetAtt,
      UserMigration?: IStrRefGetAtt,
      PostAuthentication?: IStrRefGetAtt,
      PostConfirmation?: IStrRefGetAtt,
      CustomMessage?: IStrRefGetAtt,
      VerifyAuthChallengeResponse?: IStrRefGetAtt
   },
   usernameAttributes?: IStrRefGetAtt[],
   autoVerifiedAttributes?: IStrRefGetAtt[],
   deviceConfiguration?: {
      DeviceOnlyRememberedOnUserPrompt?: boolean,
      ChallengeRequiredOnNewDevice?: boolean
   },
   emailVerificationMessage?: IStrRefGetAtt
}
      
      interface ICognitoUserPool_props
        {
   UserPoolTags?: {[str:string]: object },
   Policies?: {
      PasswordPolicy?: {
         RequireNumbers?: boolean,
         MinimumLength?: number,
         TemporaryPasswordValidityDays?: number,
         RequireUppercase?: boolean,
         RequireLowercase?: boolean,
         RequireSymbols?: boolean
      }
   },
   VerificationMessageTemplate?: {
      EmailMessageByLink?: IStrRefGetAtt,
      EmailMessage?: IStrRefGetAtt,
      SmsMessage?: IStrRefGetAtt,
      EmailSubject?: IStrRefGetAtt,
      DefaultEmailOption?: IStrRefGetAtt,
      EmailSubjectByLink?: IStrRefGetAtt
   },
   MfaConfiguration?: IStrRefGetAtt,
   Schema?: [
      {
         DeveloperOnlyAttribute?: boolean,
         Mutable?: boolean,
         AttributeDataType?: IStrRefGetAtt,
         StringAttributeConstraints?: {
            MinLength?: IStrRefGetAtt,
            MaxLength?: IStrRefGetAtt
         },
         Required?: boolean,
         NumberAttributeConstraints?: {
            MinValue?: IStrRefGetAtt,
            MaxValue?: IStrRefGetAtt
         },
         Name?: IStrRefGetAtt
      }
   ],
   AdminCreateUserConfig?: {
      InviteMessageTemplate?: {
         EmailMessage?: IStrRefGetAtt,
         SMSMessage?: IStrRefGetAtt,
         EmailSubject?: IStrRefGetAtt
      },
      UnusedAccountValidityDays?: number,
      AllowAdminCreateUserOnly?: boolean
   },
   SmsAuthenticationMessage?: IStrRefGetAtt,
   UserPoolName?: IStrRefGetAtt,
   SmsVerificationMessage?: IStrRefGetAtt,
   UserPoolAddOns?: {
      AdvancedSecurityMode?: IStrRefGetAtt
   },
   EmailConfiguration?: {
      ReplyToEmailAddress?: IStrRefGetAtt,
      EmailSendingAccount?: IStrRefGetAtt,
      SourceArn?: IStrRefGetAtt
   },
   SmsConfiguration?: {
      ExternalId?: IStrRefGetAtt,
      SnsCallerArn?: IStrRefGetAtt
   },
   AliasAttributes?: IStrRefGetAtt[],
   EmailVerificationSubject?: IStrRefGetAtt,
   LambdaConfig?: {
      CreateAuthChallenge?: IStrRefGetAtt,
      PreAuthentication?: IStrRefGetAtt,
      DefineAuthChallenge?: IStrRefGetAtt,
      PreSignUp?: IStrRefGetAtt,
      PreTokenGeneration?: IStrRefGetAtt,
      UserMigration?: IStrRefGetAtt,
      PostAuthentication?: IStrRefGetAtt,
      PostConfirmation?: IStrRefGetAtt,
      CustomMessage?: IStrRefGetAtt,
      VerifyAuthChallengeResponse?: IStrRefGetAtt
   },
   UsernameAttributes?: IStrRefGetAtt[],
   AutoVerifiedAttributes?: IStrRefGetAtt[],
   DeviceConfiguration?: {
      DeviceOnlyRememberedOnUserPrompt?: boolean,
      ChallengeRequiredOnNewDevice?: boolean
   },
   EmailVerificationMessage?: IStrRefGetAtt
}
      
      interface ICognitoUserPool_json {
      [n:string]:{
          Type: 'AWS::Cognito::UserPool'
          Properties: ICognitoUserPool_props
        }
      }
      //# endregion interfaces

      