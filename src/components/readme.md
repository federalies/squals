# Squals Components

## Principles

1. Reduce Objects as much as reasonable - using sane defaults + removing all non-essential data fields
2. Consider where input fields should also accept - `IGetAtt` | `IRef`
3. Constuctors should accept their own kind as an input - which would be akin to a `duplicate` function
4. Balance input Flexibility with enough structure to so that intellisense can provide real help
5. my Squals file should pass `eslint defaults` (as a concept - not as an implementation)
6. "`Plays nice` with comfy language concepts" over users memorizing template keys/properties
7. Use Errors/Failures during Template Build Time to increase developer iteration speed
8. Methods should be able to set and unset various options

  ```
  obj.method('dataInput') => might `set` the proper data structure via the helper
  obj.method() => might `unset` the same data structure
  ```

9. other rules continued

# List of Sharable Components

- [x] Template.js

  - [] documented, tested, composable properties

- [] apiGateway.js

- [] appSync.js

- [] awsBatch.js

- [] awsCloud9.js

- [] certificateManager.js

- [] cloudFront.js

- [] cloudwatch.js

- [] codeBuild.js

- [] codeCommit.js

- [] codeDeploy.js

- [] codePipeline.js

- [] cognito.js

- [] comprehend.js

- [] dynamoDB.js

- [] ec2.js

- [] ecs.js

- [] eks.js

- [] elastiCache.js

- [] kinesis.js

- [] lambda.js

- [] lex.js

- [] macie.js

- [] polly.js

- [] readme.md

- [] rekognition.js

- [] route53.js

- [-] s3.js

  - [-] documented & tested class constructor
  - [-] documented & tested class methods
  - [ ] documented & tested composable properties

- [] secretsManager.js

- [] ses.js

- [] sns.js

- [] sqs.js

- [] transcribe.js

- [] translate.js
