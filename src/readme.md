# SQUALS

> Shareable Cloud Infrastructure

## Project Goals:

1. [ ] - Tidy readable shareable infrastructure
2. [ ] - Developer Iteration Cycles when modling infrastructure
3. [ ] - As Cloud Independent as is Reasonable

## The Dream:

I would like to run my overly simplistic JAMStack website,and then easily extend it when some cool thing comes out. So that when Microsoft, Amazon,Google, Baidu, etc annoucne some new wizzbang image recognition service - I can package up a subsystem for my personal website to analyze and to automatically tag my backlog of pictures and tag all new added media. Which benefits me the creator by giving me search-suggestions for picutures based on more than the file name. All of this new `itelligence` can also be made available to my content creation editor. While I'm typing, it can recommend my own related pictures.

Adding pictures to my own website is easy enough, and its dirt cheap (See S3 + Pricing) and I never run out of space. Once I realize this I rememeber than I can stop paying for Goober One Sky Drive. I have my own infinitely scalalable cloud forlders.

But then I realize that keeping my documents in folders in the cloud has a different set of use cases. But then I realize that someone else has made a beautiful skin to open preview - and even push content into my own cloud editor. I find the new catalog skin sub-system, I reivew it for what changes it makes to my cloud, review any estimated changes in my cloud bill, download, install, preview, activate, and post-activation check.

As much as possible of the above story should all happen in the browser. 

<!-- 1\. Infinite Scale platform. 2\. Saleable Trained AI Models 3\. Saleable System Subsystems -->

 I want cloud delegates that talk to all the things that want to track me or worse and - I talk to my cloud.

## Note:

I may need a different phrase other than "Shareable Infracture" because it is almost the antithesis of "Shared Cloud Infrastructure".

search code base for

`@todo` `@idea` `@help`

# Component Priority

- [x] S3Bucket
- [x] CloudFrontCDN
- [x] Route53
- [x] ACM Certificates
- [x] IAM
- [x] API Gateway
- [x] AppSync
- [] Lambda
- [] Code Deploy
- [] Code Pipeline
- [] Code Build
- [] Budget
- [] Fargate
- [] Cognito
- [] DynamoDB
- [] ElastiCache
- [] Beanstalk
- [] SQS
- [] SNS
- [] SES
- [] CloudSearch
- [] Athena
- [] Kinesis/Kinesis Firehose
- [] AI / ML :: SageMaker / Rekognition / Personalize / Comprehend / Lex/ Polly / Textract / Transcribe / Translate

## Open Design Qurestions

### Proposal: Create a Mode to inline/replace `GetAtt`s & `Ref`s

- Pros

  - JSON is sematic & complete
  - Lends itself to reverse mode (motor is a generator in reverse)

- Cons

  - Makes the JSON more verbose
  - harder to write by hand (but we dont do that anymore anyway)
  - Obscures some valid use cases

    - eg: `DNS Alias` are an explicit abstraction whereby AWS allows userland to create a semantic link between resources.
    - It will be interesting to see if #Ref and #Fn::GetAtt serves a similar purpose via different mechanics

- Strawman Idea

  - so far it seems like this is merely the first step in the process of `ingine mode`
  - generate: data moving in JS resources, create current AWS templates
  - motor: from current AWS templates, create data movement in JS resources

## Conclusion

Don't share lovers ; share love.

Dont share servers; share services

Federalies Are Free

Digital Freedom For Mankind - Join The Federalies
