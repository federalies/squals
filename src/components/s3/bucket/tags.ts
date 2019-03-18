import { Itags, ITags } from '../../Template'
/**
 * AWS::S3:Bucket Tags.
 *
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param tagList - TagList  * asdasd.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
export const tags: (tagList: Itags | Itags[]) => ITags[] = function (tagList) {
  const handleItem = (tagList: Itags) => {
    return Object.entries(tagList).reduce((p: ITags[], [k, v]) => {
      return [...p, { Key: k, Value: v }]
    }, [])
  }
  const handleArray = (tagList: Itags[]) => {
    return tagList.reduce((p: ITags[], c) => {
      return [...p, ...handleItem(c)]
    }, [])
  }

  return Array.isArray(tagList) ? handleArray(tagList) : handleItem(tagList)
}

/**
 * AWS::S3:Bucket Tags.
 *
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param tagList - Asd.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
export const Tags = (tagList: Itags | Itags[]): IResourceTags => {
  return {
    Tags: tags(tagList)
  }
}

/**
 * AWS::S3:Bucket Tags.
 *
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param tagList - Incoming tagList.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
export const TagFilters = (tagList: Itags | Itags[]): ITagFilters => {
  return {
    TagFilters: tags(tagList)
  }
}

// export interface Itags {
//   [key: string]: string
// }

// export interface ITags {
//   Key: string
//   Value: string
// }
export interface IResourceTags {
  Tags: ITags[]
}

export interface ITagFilters {
  TagFilters: ITags[]
}
