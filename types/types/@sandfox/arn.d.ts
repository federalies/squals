export as namespace arn
export = arn

declare namespace arn {
  function parse(arn: string): IARNreturn
  function toString(arn: string): string

  interface IARNreturn {
    partition: string
    service: string
    region: string
    accountID: string
    resource: string
  }
}
