# AWS S3Bucket Module

## Includes

- Class Constructor
- Many Helper funcitons to create various parameters using defaults and guarenteeing enough info to properly create a template

## Conventions

### Conventions

- every class method needs a sane default

- any property named `<X> list` **always** intelligently handle inputs of an 'item' or a 'list'

  - what if it was "ends in `s`" for brevity -vs- 'ends in `list`'

- JSdoc for even private functions - as a future contributor affordance

- the JSDoc Example should correspond to the first test in the corresponding **test** file

- interface names all start with `I` and then followed by a submodule name

- interface for outbound types start with `I<toUpperCase>`

- interface for inbound types start with `I<toLowerCase>`

- look through the codebase and promote `@todo`| `@idea` to 'real tracked issues'

## Checklist

- interfaces starts with `I`< logical name >
- tests
- jsdoc w/ @description @example< short && simple >

## Docs

[WIP](https://raw.githack.com/federalies/squals/master/docs/index.html)
