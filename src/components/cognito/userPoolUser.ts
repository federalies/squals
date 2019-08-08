
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
      class CognitoUserPoolUser implements squals {
         name :string 
Type = 'AWS::Cognito::UserPoolUser' 
Properties :ICognitoUserPoolUser_props 

         
       constructor (  ) { 
         
            this.name = genComponentName()
            this.Properties = {}
            // finish the constructor
 } 


      static fromString ( s: string ) { 
         
 return CognitoUserPoolUser.validate(JSON.parse(s)) 
 } 


      static fromJSON ( i: object ) { 
         
 return CognitoUserPoolUser.validateJSON(i as ICognitoUserPoolUser_json ) 
 } 


      static fromJS ( i: object ) { 
         
 return  CognitoUserPoolUser.validateJS(i as ICognitoUserPoolUser_min ) 
 } 


      static from ( i: string | object ) { 
         
 return  CognitoUserPoolUser.validate(i) 
 } 


      static validate ( i: string | object ) { 
         
 return  validatorGeneric<CognitoUserPoolUser>(i) 
 } 


      static validateJS ( i: ICognitoUserPoolUser_min ) { 
         throw new Error('not implemented yet')
 } 


      static validateJSON ( i: ICognitoUserPoolUser_json ) { 
         throw new Error('not implemented yet')
 } 


       _name ( s: string ) { 
         this.name = s
 return this 
 } 


       toJSON (  ) { 
         
 return  {[this.name]:{
               Type:'AWS::Cognito::UserPoolUser',
               Properties: this.Properties
           }} 
 } 

/**
                  * @param i object[]
                  * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpooluser.html#cfn-cognito-userpooluser-validationdata>
                  */
       validationData ( i: object[] ) { 
         this.Properties.ValidationData = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpooluser.html#cfn-cognito-userpooluser-userpoolid>
                           */
       userPoolId ( i: IStrRefGetAtt ) { 
         this.Properties.UserPoolId = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpooluser.html#cfn-cognito-userpooluser-username>
                           */
       username ( i: IStrRefGetAtt ) { 
         this.Properties.Username = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpooluser.html#cfn-cognito-userpooluser-messageaction>
                           */
       messageAction ( i: IStrRefGetAtt ) { 
         this.Properties.MessageAction = i
 return this 
 } 

/**
                  * @param i - IStrRefGetAtt[]
                  * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpooluser.html#cfn-cognito-userpooluser-desireddeliverymediums>
                  */
       desiredDeliveryMediums ( i: IStrRefGetAtt[] ) { 
         this.Properties.DesiredDeliveryMediums = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpooluser.html#cfn-cognito-userpooluser-forcealiascreation>
                           */
       forceAliasCreation ( i: boolean ) { 
         this.Properties.ForceAliasCreation = i
 return this 
 } 

/**
                  * @param i object[]
                  * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpooluser.html#cfn-cognito-userpooluser-userattributes>
                  */
       userAttributes ( i: object[] ) { 
         this.Properties.UserAttributes = i
 return this 
 } 

      }
      //# region interfaces
      interface ICognitoUserPoolUser_min 
        {
   validationData?: [
      {
         Value?: IStrRefGetAtt,
         Name?: IStrRefGetAtt
      }
   ],
   userPoolId: IStrRefGetAtt,
   username?: IStrRefGetAtt,
   messageAction?: IStrRefGetAtt,
   desiredDeliveryMediums?: IStrRefGetAtt[],
   forceAliasCreation?: boolean,
   userAttributes?: [
      {
         Value?: IStrRefGetAtt,
         Name?: IStrRefGetAtt
      }
   ]
}
      
      interface ICognitoUserPoolUser_props
        {
   ValidationData?: [
      {
         Value?: IStrRefGetAtt,
         Name?: IStrRefGetAtt
      }
   ],
   UserPoolId: IStrRefGetAtt,
   Username?: IStrRefGetAtt,
   MessageAction?: IStrRefGetAtt,
   DesiredDeliveryMediums?: IStrRefGetAtt[],
   ForceAliasCreation?: boolean,
   UserAttributes?: [
      {
         Value?: IStrRefGetAtt,
         Name?: IStrRefGetAtt
      }
   ]
}
      
      interface ICognitoUserPoolUser_json {
      [n:string]:{
          Type: 'AWS::Cognito::UserPoolUser'
          Properties: ICognitoUserPoolUser_props
        }
      }
      //# endregion interfaces

      