# Generating JSON Schemas

## Strategies

1. Pull down the AWS CFM.json file - and process it into segmented AWS service/resource files on disk

  1. How do deal with `enums`?
  2. Required fields are available in the giant JSON (1.2M) resource defintion file

2. use ajv to create JSON schemas from some full fledged object...

  1. How would this deal with `enums` and `required` fields?
  2. How do you update it?

    1. Seems like I'd be on the hook to watch the AWS CFM twitter account (or simiilar) and update my own "golden data" based on new feature roll outs

## Validating the Validator

Seems like either way I will be on the hook to make passing and failing cases....to validate the validator.

Obligatory quote:

> [Quis custodiet ipsos custodes?](https://en.wikipedia.org/wiki/Quis_custodiet_ipsos_custodes%3F) - Roman poet Juvenal

> _Translation:_ "Who watches the watchers?" - Roman poet Juvenal

## Generating Readable Schemas

How to ensure the genetated schemas are readable...

Splitting Rules...?

- Top Level keys that are arrrays of Objects
- setup a definition Definition depths?

How to know if we have too many definitions?

- analyze definition resuse
- defintions can be `inline`d

### Psuedo Code Ideas

```code
Schema := is the input JSON-Schema OBJ
Schema^ := is the output JSON-Schema OBJ - can be read as Schema-Next or SchemaPrime
-> denoted the change of types
```

- `inline = ƒ( [{objSelector}] , [{definitionSelector}], Schema ) -> { [{objSelector}], [{definitionSelector}], Schema^ }`
- or could a curreied ƒ to make `definitionInline` a version of a schemaChanger? maybe like this?

  - `inline = ƒ( [{objSelector}] , [{definitionSelector}] ) -> changer`

- or in reverse `makeDef`

  - `makeDef = ƒ( [{objSelector}], [{ObjectPattern}], {defName}, Schema ) -> changer`
  - `extract = makeDef`

- or optimize schema

  - `optimize = ƒ( [[changers] , {schema}] ) -> [ [nullable changers], Schema^ ]`
  - `changer = ƒ(?Stats, ?name, Schema ) -> {t: incremented | complete, Schema^ }`

- or analyze schema

  - `analyze = ƒ([analyzers]) -> [{Stats}]`
  - `analyzer = ƒ( {schema} ) -> [{Stats}]`

- and then a reporter

  - `report = ƒ( [{reporter}], console.log, [{Stats}]) -> {histogramData, TransformedDataInThePrint} + console.logs`
  - `reporter = ƒ(Stats)->{}`

### Developer Ergonomics

```javascript
const inlineChanger1 = inline('BucketEncryption', '#Destionation') 
const inlineChanger2 = inline('BucketEncryption', '#Destionation')()
const inlineChanger3 = inline('BucketEncryption', '#Destionation')('inline defintion: #Destionation for:[BucketEncryption]')
assert.deepEquals(inlineChanger3, inlineChanger2, inlineChanger1) // true
const {t, cs }= inlineChanger()
```

### Typical Goals

- any same/copied definitions
- constraints: limit deepest definition

### Typical Reports

- count reuse
- count/historgram

### Notes

The "compostable goals" approach seems like it might lend itself to the user composing a gordian knot over their head? life certainly has moments where there are opposing goals.

What if array ordinality was used to break-ties/ show importance?

So that life goals of: "I want to make $1,000,000" and "I want to always stay debt free" can be rectified as often opposing goals - and if the schema presnets them as a tradeoff. optimize will prefer
