
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
      class SNSTopic implements squals {
         name :string 
Type = 'AWS::SNS::Topic' 
Properties :ISNSTopic_props 

         
       constructor (  ) { 
         
            this.name = genComponentName()
            this.Properties = {}
            // finish the constructor
 } 


      static fromString ( s: string ) { 
         
 return SNSTopic.validate(JSON.parse(s)) 
 } 


      static fromJSON ( i: object ) { 
         
 return SNSTopic.validateJSON(i as ISNSTopic_json ) 
 } 


      static fromJS ( i: object ) { 
         
 return  SNSTopic.validateJS(i as ISNSTopic_min ) 
 } 


      static from ( i: string | object ) { 
         
 return  SNSTopic.validate(i) 
 } 


      static validate ( i: string | object ) { 
         
 return  validatorGeneric<SNSTopic>(i) 
 } 


      static validateJS ( i: ISNSTopic_min ) { 
         throw new Error('not implemented yet')
 } 


      static validateJSON ( i: ISNSTopic_json ) { 
         throw new Error('not implemented yet')
 } 


       _name ( s: string ) { 
         this.name = s
 return this 
 } 


       toJSON (  ) { 
         
 return  {[this.name]:{
               Type:'AWS::SNS::Topic',
               Properties: this.Properties
           }} 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sns-topic.html#cfn-sns-topic-displayname>
                           */
       displayName ( i: IStrRefGetAtt ) { 
         this.Properties.DisplayName = i
 return this 
 } 

/**
                           * @param i 
                           * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sns-topic.html#cfn-sns-topic-kmsmasterkeyid>
                           */
       kmsMasterKeyId ( i: IStrRefGetAtt ) { 
         this.Properties.KmsMasterKeyId = i
 return this 
 } 

/**
                  * @param i object[]
                  * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sns-topic.html#cfn-sns-topic-subscription>
                  */
       subscription ( i: object[] ) { 
         this.Properties.Subscription = i
 return this 
 } 


       TopicName (  ) { 
         
 return {'Fn::GetAtt':[this.name, 'TopicName']}  
 } 

      }
      //# region interfaces
      interface ISNSTopic_min 
        {
   displayName?: IStrRefGetAtt,
   kmsMasterKeyId?: IStrRefGetAtt,
   subscription?: [
      {
         Endpoint: IStrRefGetAtt,
         Protocol: IStrRefGetAtt
      }
   ],
   topicName?: IStrRefGetAtt
}
      
      interface ISNSTopic_props
        {
   DisplayName?: IStrRefGetAtt,
   KmsMasterKeyId?: IStrRefGetAtt,
   Subscription?: [
      {
         Endpoint: IStrRefGetAtt,
         Protocol: IStrRefGetAtt
      }
   ],
   TopicName?: IStrRefGetAtt
}
      
      interface ISNSTopic_json {
      [n:string]:{
          Type: 'AWS::SNS::Topic'
          Properties: ISNSTopic_props
        }
      }
      //# endregion interfaces

      