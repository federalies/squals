# Squals Components

## Top Level Object (TLO) Requirements

1. Integrated and Parseable Documentation for a `DocGen` system (using TypeDoc right now)
2. Tests sufficient @ 90+% Code Coverage
3. implements `squals` functions [`fromJSON()`, `toJSON()`, `validate()`]

## Principles

1. Reduce Objects as much as reasonable - using sane defaults + removing all non-essential data fields

2. Constructors take in:

  1. the min "hand drawn" js object; the rest can be built via the chain builder funcs
  2. its own kind
  3. < className >.fromJSONs(string)
  4. < className >.fromJSON(json object)
  5. < className >.fromJS(verbose "hand drawn")
  6. < className >.from( picks the right sub function)
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
