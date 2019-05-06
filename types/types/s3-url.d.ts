import { UrlWithStringQuery } from 'url'

export as namespace s3Url
export = s3Url

declare namespace s3Url {
  function optionsToUrl(opt: s3Obj): string
  function urlToOptions(s3uri: string | UrlWithStringQuery): s3Obj

  interface s3Obj extends StrIndexable {
    Bucket?: string
    Key?: string
  }

  interface StrIndexable {
    [key: string]: string | undefined
  }
}
