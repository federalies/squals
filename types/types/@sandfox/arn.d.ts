export as namespace arn
export = arn

declare namespace arn {
  function parse(arn: string): IARNobject
  function toString(arnO: IARNobject): string

  interface IARNobject {
    partition: string
    service: string
    region?: string
    accountID?: string
    resource: string
  }
}
