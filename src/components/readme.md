# Squals Components

## Completed Cloud Components

- [x] S3
- [x] CloudFrontCDN
- [x] Route53
- [x] ACM Certificates
- [x] IAM
- [x] API Gateway
- [x] AppSync
- [x] Lambda
- [] Code Commit
- [] Code Deploy
- [] Code Pipeline
- [] Code Build
- [] EventBridge
- [] Cloudformation
- [] Cloudwatch
- [] Cloudwatch Logs
- [] Budget
- [] Fargate
- [] Cognito
- [] DynamoDB
- [] ElastiCache
- [] Elastic Beanstalk
- [] SQS
- [] SNS
- [] SES
- [] CloudSearch
- [] Athena
- [] Kinesis Firehose
- [] Kinesis Streams
- [] Rekognition
- [] Polly
- [] Athena
- [] EC2
- [] EMR
- [] Secrets Manager
- [] Step Functions
- [] Sagemaker
- [] AWS Glue

## Top Level Object (TLO) Requirements

1. Integrated and Parseable Documentation for a `DocGen` system (using TypeDoc right now)
2. Tests sufficient @ 90+% Code Coverage
3. implements `squals` functions [`fromJSON()`, `toJSON()`, `validate()`]

## Principles

1. Reduce Objects as much as reasonable - using sane defaults + removing all non-essential data fields

2. Constructors take in:

  1. the min "hand drawn" js object; the rest can be built via the chain builder funcs
  2. its own kind
  3. < className >.fromJSON(json object)
  4. < className >.fromString(string)
  5. < className >.fromJS(verbose "hand drawn ") // perhaps this is merely the constructor
  6. < className >.from(picks the right sub function)
  7. < className >.withRelated(JSON)

3. Consider where input fields should also accept - `IGetAtt` | `IRef` basicaly anywhere a string or number might exist `:/`

4. Balance input Flexibility with enough structure to so that intellisense can provide real help

5. a squals file should `pass eslint defaults` (as a concept - not as an implementation)

6. Prefer "`Plays nice` with comfy language concepts" over users memorizing template keys/properties

7. Use Errors/Failures during Template Build Time to increase developer iteration speed

8. Methods should be able to set and unset various options

  ```
  obj.method('dataInput') => might `set` the proper data structure via the helper
  obj.method() => should use the defaults
  obj.method(null) => might `unset`/`clear` the same data structure
  ```

9. Non reducible keys can have required inputs on helper

10. Methods ending in `s` **MUST** use variadic parms accepting `<T[]>`

11. Constuctors `MUST` accept their own kind as an input - which would be akin to a `duplicate` function

12. `Top Level Objects` are usually decomposed into

  ```
  _objName_Config funcs return 'Keyed' : < DataElements >
  _objName_Item funcs return unkeyed < DataElements >
  ```

13. Seems like the design principle is contructing a TLO one TLK (Top Level Key) at a time - for smaller TLKs - could use a static method on the class to trnasform the input shape to the Output shape and then use it in the constructor, and in the methods.

14. implements `squals` abstract class

15. toJSON() returns `object[]`

16. Template export will deal with reshaping components exports - since some componnets lend themselves to a parent child relationship. Thus 1 component might bring all the related components with it in a list

17. Why use a validataion framework?

```
- Framework Exmpales: Joi, Yup, Ajv, superstruct, forg.js??
- Because there are two modes of creation:
- Author templates using squals - but even Typescript sometimes lacks the ability to conjoint data dependencies.
- Import (aka `fromJSON`) will need to validate someone elses "crazy template" before it can create an object
```

## What is a Federa Application Component?

1. It Declares its public/private cloud resources:

  1. cloudformation

  2. k8s/swarm?

    1. Docker files?

  3. k-native

  4. etc

2. It can opt-in to adding its data to the central graph or the REST API GATEWAY?

3. It can provide a UI (SPA is recommended)

4. It can perform evented computation;

5. Changing the system properties generates a changeRequest - which causese the system to be rebuilt/compiled/type checked etc - so that you can not harm the system.

## Pricing for Federa Applicaitons

Developers setup prices:

- to purchase
- to upgrade
- for higher service levels

or make bundles in order to ease the purhase process.
