# AWS Schemas

Great Scott - i think I Have found it :

<https://raw.githubusercontent.com/awslabs/goformation/master/schema/cloudformation.schema.json>

Not to figure out how to resolve smaller composed objected based on this behemoth of a potentially out of date spec.

## Master vs feature-branch

> "$id": "<https://raw.githack.com/federalies/squals/master/src/validations/json-schemas/schemas/AWS::S3::Bucket.schema.json>",...

the $id can be `raw.githack.com` in a feature branch - it should be `rawcdn.githack.com` in master... be sure to run `readyMaster.js` before mergign to master...
