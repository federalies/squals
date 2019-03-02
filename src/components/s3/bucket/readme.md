# AWS S3Bucket Module

## Includes

- Class Constructor
- Many Helper funcitons to create various parameters using defaults and guarenteeing enough info to properly create a template

## Convention

- List type properties also accept a single config object - which is trnaslated into a List of 1

## Checklist

- JSDoc shows ? or ! for every property
- JSDoc uses the typedefs for params but shows some embeded property values
- When embedding propery values, omit the description allowing the verbose description to exist in the typeDef
- @see an AWS documentation deeplink
- @typedefs should use

  - `module:< modName >.< typeName >`
