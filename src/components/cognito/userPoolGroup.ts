
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
      class CognitoUserPoolGroup implements squals {
         name :string 
Type = 'AWS::Cognito::UserPoolGroup' 
Properties :ICognitoUserPoolGroup_props 

         
       constructor (  ) { 
         
            this.name = genComponentName()
            this.Properties = {}
            // finish the constructor
 } 


      static fromString ( s: string ) { 
         
 return CognitoUserPoolGroup.validate(JSON.parse(s)) 
 } 


      static fromJSON ( i: object ) { 
         
 return CognitoUserPoolGroup.validateJSON(i as ICognitoUserPoolGroup_json ) 
 } 


      static fromJS ( i: object ) { 
         
 return  CognitoUserPoolGroup.validateJS(i as ICognitoUserPoolGroup_min ) 
 } 


      static from ( i: string | object ) { 
         
 return  CognitoUserPoolGroup.validate(i) 
 } 


      static validate ( i: string | object ) { 
         
 return  validatorGeneric<CognitoUserPoolGroup>(i) 
 } 


      static validateJS ( i: ICognitoUserPoolGroup_min ) { 
         throw new Error('not implemented yet')
 } 


      static validateJSON ( i: ICognitoUserPoolGroup_json ) { 
         throw new Error('not implemented yet')
 } 


       _name ( s: string ) { 
         this.name = s
 return this 
 } 


       toJSON (  ) { 
         
 return  {[this.name]:{
               Type:'AWS::Cognito::UserPoolGroup',
               Properties: this.Properties
           }} 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolgroup.html#cfn-cognito-userpoolgroup-groupname>
                           */
       groupName ( i: IStrRefGetAtt ) { 
         this.Properties.GroupName = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolgroup.html#cfn-cognito-userpoolgroup-description>
                           */
       description ( i: IStrRefGetAtt ) { 
         this.Properties.Description = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolgroup.html#cfn-cognito-userpoolgroup-userpoolid>
                           */
       userPoolId ( i: IStrRefGetAtt ) { 
         this.Properties.UserPoolId = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolgroup.html#cfn-cognito-userpoolgroup-precedence>
                           */
       precedence ( i: number ) { 
         this.Properties.Precedence = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolgroup.html#cfn-cognito-userpoolgroup-rolearn>
                           */
       roleArn ( i: IStrRefGetAtt ) { 
         this.Properties.RoleArn = i
 return this 
 } 

      }
      //# region interfaces
      interface ICognitoUserPoolGroup_min 
        {
   groupName?: IStrRefGetAtt,
   description?: IStrRefGetAtt,
   userPoolId: IStrRefGetAtt,
   precedence?: number,
   roleArn?: IStrRefGetAtt
}
      
      interface ICognitoUserPoolGroup_props
        {
   GroupName?: IStrRefGetAtt,
   Description?: IStrRefGetAtt,
   UserPoolId: IStrRefGetAtt,
   Precedence?: number,
   RoleArn?: IStrRefGetAtt
}
      
      interface ICognitoUserPoolGroup_json {
      [n:string]:{
          Type: 'AWS::Cognito::UserPoolGroup'
          Properties: ICognitoUserPoolGroup_props
        }
      }
      //# endregion interfaces

      