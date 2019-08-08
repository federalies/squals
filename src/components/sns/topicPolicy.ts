
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
      class SNSTopicPolicy implements squals {
         name :string 
Type = 'AWS::SNS::TopicPolicy' 
Properties :ISNSTopicPolicy_props 

         
       constructor (  ) { 
         
            this.name = genComponentName()
            this.Properties = {}
            // finish the constructor
 } 


      static fromString ( s: string ) { 
         
 return SNSTopicPolicy.validate(JSON.parse(s)) 
 } 


      static fromJSON ( i: object ) { 
         
 return SNSTopicPolicy.validateJSON(i as ISNSTopicPolicy_json ) 
 } 


      static fromJS ( i: object ) { 
         
 return  SNSTopicPolicy.validateJS(i as ISNSTopicPolicy_min ) 
 } 


      static from ( i: string | object ) { 
         
 return  SNSTopicPolicy.validate(i) 
 } 


      static validate ( i: string | object ) { 
         
 return  validatorGeneric<SNSTopicPolicy>(i) 
 } 


      static validateJS ( i: ISNSTopicPolicy_min ) { 
         throw new Error('not implemented yet')
 } 


      static validateJSON ( i: ISNSTopicPolicy_json ) { 
         throw new Error('not implemented yet')
 } 


       _name ( s: string ) { 
         this.name = s
 return this 
 } 


       toJSON (  ) { 
         
 return  {[this.name]:{
               Type:'AWS::SNS::TopicPolicy',
               Properties: this.Properties
           }} 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sns-policy.html#cfn-sns-topicpolicy-policydocument>
                           */
       policyDocument ( i: {[str:string]: object } ) { 
         this.Properties.PolicyDocument = i
 return this 
 } 

/**
                  * @param i - IStrRefGetAtt[]
                  * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sns-policy.html#cfn-sns-topicpolicy-topics>
                  */
       topics ( i: IStrRefGetAtt[] ) { 
         this.Properties.Topics = i
 return this 
 } 

      }
      //# region interfaces
      interface ISNSTopicPolicy_min 
        {
   policyDocument: {[str:string]: object },
   topics: IStrRefGetAtt[]
}
      
      interface ISNSTopicPolicy_props
        {
   PolicyDocument: {[str:string]: object },
   Topics: IStrRefGetAtt[]
}
      
      interface ISNSTopicPolicy_json {
      [n:string]:{
          Type: 'AWS::SNS::TopicPolicy'
          Properties: ISNSTopicPolicy_props
        }
      }
      //# endregion interfaces

      