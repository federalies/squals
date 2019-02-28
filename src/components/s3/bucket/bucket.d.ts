/* ~ On this line, import the module which this module adds to */

import * as randomWord from 'random-word'
import * as Randoma from 'randoma'

/* ~ Here, declare the same module as the one you imported above */
declare module 'random-word' {
  /* ~ Inside, add new function, classes, or variables. You can use
   *~ unexported types from the original module if needed. */
  function theNewMethod(x: m.foo): other.bar
}

interface FnGetAtt {
  'Fn::GetAtt': [string, string]
}
interface Ref {
  Ref: string
}

// enum validProperties { A, B, C }

declare class S3Bucket {
  constructor(name?: string, props?: object)
  Type: string
  Properties?: object
  toJSON(): object
  Ref(): Ref
  Arn(): FnGetAtt
  DomainName(): FnGetAtt
  RegionalDomainName(): FnGetAtt
  WebsiteURL(): FnGetAtt
  validate(): FnGetAtt
}

export = S3Bucket
