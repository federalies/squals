// Type definitions for: components
// Project: squals
// Definitions by: Eric D Moore <https://ericdmoore.com>

/* ~ Here, declare the same module as the one you imported above */
declare module 'components' {
  /* ~ Inside, add new function, classes, or variables. You can use
   *~ unexported types from the original module if needed. */
  interface Ref {
    Ref: string
  }

  interface GetAt {
    'Fn::GetAtt': [string, string]
  }

  export function theNewMethod(x: m.foo): other.bar

  /* ~ You can also add new properties to existing interfaces from
   *~ the original module by writing interface augmentations */
  export interface SomeModuleOptions {
    someModuleSetting?: string
  }

  /* ~ New types can also be declared and will appear as if they
   *~ are in the original module */
  export interface MyModulePluginOptions {
    size: number
  }
}
