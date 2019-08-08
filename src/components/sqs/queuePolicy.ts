
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
      class SQSQueuePolicy implements squals {
         name :string 
Type = 'AWS::SQS::QueuePolicy' 
Properties :ISQSQueuePolicy_props 

         
       constructor (  ) { 
         
            this.name = genComponentName()
            this.Properties = {}
            // finish the constructor
 } 


      static fromString ( s: string ) { 
         
 return SQSQueuePolicy.validate(JSON.parse(s)) 
 } 


      static fromJSON ( i: object ) { 
         
 return SQSQueuePolicy.validateJSON(i as ISQSQueuePolicy_json ) 
 } 


      static fromJS ( i: object ) { 
         
 return  SQSQueuePolicy.validateJS(i as ISQSQueuePolicy_min ) 
 } 


      static from ( i: string | object ) { 
         
 return  SQSQueuePolicy.validate(i) 
 } 


      static validate ( i: string | object ) { 
         
 return  validatorGeneric<SQSQueuePolicy>(i) 
 } 


      static validateJS ( i: ISQSQueuePolicy_min ) { 
         throw new Error('not implemented yet')
 } 


      static validateJSON ( i: ISQSQueuePolicy_json ) { 
         throw new Error('not implemented yet')
 } 


       _name ( s: string ) { 
         this.name = s
 return this 
 } 


       toJSON (  ) { 
         
 return  {[this.name]:{
               Type:'AWS::SQS::QueuePolicy',
               Properties: this.Properties
           }} 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-policy.html#cfn-sqs-queuepolicy-policydoc>
                           */
       policyDocument ( i: {[str:string]: object } ) { 
         this.Properties.PolicyDocument = i
 return this 
 } 

/**
                  * @param i - IStrRefGetAtt[]
                  * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-policy.html#cfn-sqs-queuepolicy-queues>
                  */
       queues ( i: IStrRefGetAtt[] ) { 
         this.Properties.Queues = i
 return this 
 } 

      }
      //# region interfaces
      interface ISQSQueuePolicy_min 
        {
   policyDocument: {[str:string]: object },
   queues: IStrRefGetAtt[]
}
      
      interface ISQSQueuePolicy_props
        {
   PolicyDocument: {[str:string]: object },
   Queues: IStrRefGetAtt[]
}
      
      interface ISQSQueuePolicy_json {
      [n:string]:{
          Type: 'AWS::SQS::QueuePolicy'
          Properties: ISQSQueuePolicy_props
        }
      }
      //# endregion interfaces

      