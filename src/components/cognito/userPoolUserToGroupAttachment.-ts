
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
      class CognitoUserPoolUserToGroupAttachment implements squals {
         name :string 
Type = 'AWS::Cognito::UserPoolUserToGroupAttachment' 
Properties :ICognitoUserPoolUserToGroupAttachment_props 

         
       constructor (  ) { 
         
            this.name = genComponentName()
            this.Properties = {}
            // finish the constructor
 } 


      static fromString ( s: string ) { 
         
 return CognitoUserPoolUserToGroupAttachment.validate(JSON.parse(s)) 
 } 


      static fromJSON ( i: object ) { 
         
 return CognitoUserPoolUserToGroupAttachment.validateJSON(i as ICognitoUserPoolUserToGroupAttachment_json ) 
 } 


      static fromJS ( i: object ) { 
         
 return  CognitoUserPoolUserToGroupAttachment.validateJS(i as ICognitoUserPoolUserToGroupAttachment_min ) 
 } 


      static from ( i: string | object ) { 
         
 return  CognitoUserPoolUserToGroupAttachment.validate(i) 
 } 


      static validate ( i: string | object ) { 
         
 return  validatorGeneric<CognitoUserPoolUserToGroupAttachment>(i) 
 } 


      static validateJS ( i: ICognitoUserPoolUserToGroupAttachment_min ) { 
         throw new Error('not implemented yet')
 } 


      static validateJSON ( i: ICognitoUserPoolUserToGroupAttachment_json ) { 
         throw new Error('not implemented yet')
 } 


       _name ( s: string ) { 
         this.name = s
 return this 
 } 


       toJSON (  ) { 
         
 return  {[this.name]:{
               Type:'AWS::Cognito::UserPoolUserToGroupAttachment',
               Properties: this.Properties
           }} 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolusertogroupattachment.html#cfn-cognito-userpoolusertogroupattachment-groupname>
                           */
       groupName ( i: IStrRefGetAtt ) { 
         this.Properties.GroupName = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolusertogroupattachment.html#cfn-cognito-userpoolusertogroupattachment-userpoolid>
                           */
       userPoolId ( i: IStrRefGetAtt ) { 
         this.Properties.UserPoolId = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolusertogroupattachment.html#cfn-cognito-userpoolusertogroupattachment-username>
                           */
       username ( i: IStrRefGetAtt ) { 
         this.Properties.Username = i
 return this 
 } 

      }
      //# region interfaces
      interface ICognitoUserPoolUserToGroupAttachment_min 
        {
   groupName: IStrRefGetAtt,
   userPoolId: IStrRefGetAtt,
   username: IStrRefGetAtt
}
      
      interface ICognitoUserPoolUserToGroupAttachment_props
        {
   GroupName: IStrRefGetAtt,
   UserPoolId: IStrRefGetAtt,
   Username: IStrRefGetAtt
}
      
      interface ICognitoUserPoolUserToGroupAttachment_json {
      [n:string]:{
          Type: 'AWS::Cognito::UserPoolUserToGroupAttachment'
          Properties: ICognitoUserPoolUserToGroupAttachment_props
        }
      }
      //# endregion interfaces

      