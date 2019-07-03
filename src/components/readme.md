# Squals Components

## Top Level Object (TLO) Requirements

1. Integrated and Parseable Documentation for a `DocGen` system (using TypeDoc right now)
2. Tests sufficient @ 90+% Code Coverage
3. implements `squals` functions [`fromJSON()`, `toJSON()`, `validate()`]

## Principles

1. Reduce Objects as much as reasonable - using sane defaults + removing all non-essential data fields

2. Consider where input fields should also accept - `IGetAtt` | `IRef` basicaly anywhere a string or number might exist `:/`

3. Balance input Flexibility with enough structure to so that intellisense can provide real help

4. a squals file should `pass eslint defaults` (as a concept - not as an implementation)

5. Prefer "`Plays nice` with comfy language concepts" over users memorizing template keys/properties

6. Use Errors/Failures during Template Build Time to increase developer iteration speed

7. Methods should be able to set and unset various options

  ```
  obj.method('dataInput') => might `set` the proper data structure via the helper
  obj.method() => should use the defaults
  obj.method(null) => might `unset`/`clear` the same data structure
  ```

8. Non reducible keys can have required inputs on helper

9. Methods ending in `s` **MUST** use variadic parms accepting `<T[]>`

10. Constuctors `MUST` accept their own kind as an input - which would be akin to a `duplicate` function

11. `Top Level Objects` are usually decomposed into

  ```
  _objName_Config funcs return 'Keyed' : < DataElements >
  _objName_Item funcs return unkeyed < DataElements >
  ```

12. Seems like the design principle is contructing a TLO one TLK (Top Level Key) at a time - for smaller TLKs - could use a static method on the class to trnasform the input shape to the Output shape and then use it in the constructor, and in the methods.

13. implements `squals` abstract class

14. toJSON() returns `object[]`

15. Template export will deal with reshaping components exports - since some componnets lend themselves to a parent child relationship. Thus 1 component might bring all the related components with it in a list

16. Why use a validataion framework?

```
- Framework Exmpales: Joi, Yup, Ajv, superstruct, forg.js??
- Because there are two modes of creation:
- Author templates using squals - but even Typescript sometimes lacks the ability to conjoint data dependencies.
- Import (aka `fromJSON`) will need to validate someone elses "crazy template" before it can create an object
```
