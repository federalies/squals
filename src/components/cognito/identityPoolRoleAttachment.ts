
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
      class CognitoIdentityPoolRoleAttachment implements squals {
         name :string 
Type = 'AWS::Cognito::IdentityPoolRoleAttachment' 
Properties :ICognitoIdentityPoolRoleAttachment_props 

         
       constructor (  ) { 
         
            this.name = genComponentName()
            this.Properties = {}
            // finish the constructor
 } 


      static fromString ( s: string ) { 
         
 return CognitoIdentityPoolRoleAttachment.validate(JSON.parse(s)) 
 } 


      static fromJSON ( i: object ) { 
         
 return CognitoIdentityPoolRoleAttachment.validateJSON(i as ICognitoIdentityPoolRoleAttachment_json ) 
 } 


      static fromJS ( i: object ) { 
         
 return  CognitoIdentityPoolRoleAttachment.validateJS(i as ICognitoIdentityPoolRoleAttachment_min ) 
 } 


      static from ( i: string | object ) { 
         
 return  CognitoIdentityPoolRoleAttachment.validate(i) 
 } 


      static validate ( i: string | object ) { 
         
 return  validatorGeneric<CognitoIdentityPoolRoleAttachment>(i) 
 } 


      static validateJS ( i: ICognitoIdentityPoolRoleAttachment_min ) { 
         throw new Error('not implemented yet')
 } 


      static validateJSON ( i: ICognitoIdentityPoolRoleAttachment_json ) { 
         throw new Error('not implemented yet')
 } 


       _name ( s: string ) { 
         this.name = s
 return this 
 } 


       toJSON (  ) { 
         
 return  {[this.name]:{
               Type:'AWS::Cognito::IdentityPoolRoleAttachment',
               Properties: this.Properties
           }} 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypoolroleattachment.html#cfn-cognito-identitypoolroleattachment-rolemappings>
                           */
       roleMappings ( i: {[str:string]: object } ) { 
         this.Properties.RoleMappings = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypoolroleattachment.html#cfn-cognito-identitypoolroleattachment-identitypoolid>
                           */
       identityPoolId ( i: IStrRefGetAtt ) { 
         this.Properties.IdentityPoolId = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypoolroleattachment.html#cfn-cognito-identitypoolroleattachment-roles>
                           */
       roles ( i: {[str:string]: object } ) { 
         this.Properties.Roles = i
 return this 
 } 

      }
      //# region interfaces
      interface ICognitoIdentityPoolRoleAttachment_min 
        {
   roleMappings?: {[str:string]: object },
   identityPoolId: IStrRefGetAtt,
   roles?: {[str:string]: object }
}
      
      interface ICognitoIdentityPoolRoleAttachment_props
        {
   RoleMappings?: {[str:string]: object },
   IdentityPoolId: IStrRefGetAtt,
   Roles?: {[str:string]: object }
}
      
      interface ICognitoIdentityPoolRoleAttachment_json {
      [n:string]:{
          Type: 'AWS::Cognito::IdentityPoolRoleAttachment'
          Properties: ICognitoIdentityPoolRoleAttachment_props
        }
      }
      //# endregion interfaces

      