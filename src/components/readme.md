# Squals Components

## Principles

1. Reduce Objects as much as reasonable - using sane defaults + removing all non-essential data fields

2. Consider where input fields should also accept - `IGetAtt` | `IRef`

3. Balance input Flexibility with enough structure to so that intellisense can provide real help

4. a squals file should `pass eslint defaults` (as a concept - not as an implementation)

5. Prefer "`Plays nice` with comfy language concepts" over users memorizing template keys/properties

6. Use Errors/Failures during Template Build Time to increase developer iteration speed

7. Methods should be able to set and unset various options

  ```
  obj.method('dataInput') => might `set` the proper data structure via the helper
  obj.method() => should use the defaults
  obj.method(null) => might `unset` the same data structure
  ```

8. Non reducible keys can have required inputs on helper

9. Attributes ending in `s` **MUST** accept a `< T > | < T >[]`

10. Constuctors `MUST` accept their own kind as an input - which would be akin to a `duplicate` function

11. `Top Level Objects` are usually decomposed

  1. `__Config` funcs return 'Keyed' : < DataElements >
  2. `__Item` funcs return unkeyed < DataElements >

12. Seems like the design principle is contructing a TLO one TLK (Top Level Key) at a time - for smaller TLKs - could use a static method on the class to trnasform the input shape to the Output shape and then use it in the constructor, and in the methods.

## TLO Requirements

1. Integrated and Parseable Documentation for a DocGen system
2. Tests sufficient for +90% Code Coverage
3. toJSON() function to covert the class into the JSON friendly version for templates.
