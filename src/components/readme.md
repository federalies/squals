# Squals Components

## Completed Cloud Components

1. [x] S3
2. [x] CloudFrontCDN
3. [x] Route53
4. [x] ACM Certificates
5. [x] IAM
6. [x] API Gateway
7. [x] Code Build
8. [x] AppSync
9. [x] Lambda
10. [] Code Commit
11. [] Code Deploy
12. [] Code Pipeline
13. [] Cloudformation
14. [] Cognito
15. [] AWS Glue
16. [] SQS
17. [] SNS
18. [] SES
19. [] Kinesis Firehose
20. [] SecretsManager
21. [] StepFunctions
22. [] CloudSearch
23. [] Athena
24. [] EventBridge
25. [] DynamoDB
26. [] RDS
27. [] Rekognition
28. [] Polly (voice->speech)
29. [] Macie
30. [] Textract (Text Extract)
31. [] Comprehend (NLP)
32. [] Forecast
33. [] Personalize
34. [] Lex (chat bot tools)
35. [] Translate (lang->lang)
36. [] Transcribe (speech->voice)
37. [] Sagemaker
38. [] ElastiCache_Redis
39. [] ElastiCache_Memcache
40. [] NeptuneDB
41. [] AuroraDB
42. [] TimeStreamDB
43. [] Cloudwatch
44. [] Cloudwatch Logs
45. [] Budget
46. [] Fargate
47. [] ECS
48. [] EKS
49. [] Elastic Beanstalk
50. [] Kinesis Streams
51. [] EMR

# Suggested Outputs

Seems like a CLI/squals.config.ts should

- Output the Gen'd Template(s)[aws|gcloud|azure|other]

  - `aws-cloudformation_20191129.json`
  - `gcloud-templatemanager_20191129.json|yml`

  - With optionality to save that to my own cloudlocale of choice

    - `s3://bucket/path/key.json`

- Output a `buildspec.yml` file if applicable

  `buildspec.yml`

## Top Level Object (TLO) Requirements

1. Integrated and Parseable Documentation for a `DocGen` system (using TypeDoc right now)
2. Tests sufficient @ 90+% Code Coverage
3. implements `squals` functions [`fromJSON()`, `toJSON()`, `validate()`]

## Principles

1. Reduce Objects as much as reasonable - using sane defaults + removing all non-essential data fields

2. Constructors take in:

  ```
  - the min "hand drawn" js object; which is a ergonmic but full representation of the cloudformation OUTPUT
  - the rest can be built via the chain builder funcs
  - its own kind ??? (this makes things much more complicated, is it really necessary)
  - implements the `squals` interface
  ```

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
