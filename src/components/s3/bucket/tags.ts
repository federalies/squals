/**
 * AWS::S3:Bucket Tags.
 *
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param tagList - TagList  * asdasd.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
export const tags: (tagList: InTags | InTags[]) => OutTags[] = function (tagList) {
  const handleItem = (tagList: InTags) => {
    return Object.entries(tagList).reduce((p: OutTags[], [k, v]) => {
      return [...p, { Key: k, Value: v }]
    }, [])
  }
  const handleArray = (tagList: InTags[]) => {
    return tagList.reduce((p: OutTags[], c) => {
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
export const Tags = (tagList: InTags | InTags[]): IResourceTags => {
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
export const TagFilters = (tagList: InTags | InTags[]): ITagFilters => {
  return {
    TagFilters: tags(tagList)
  }
}

export interface InTags {
  [key: string]: string
}

export interface OutTags {
  Key: string
  Value: string
}
export interface IResourceTags {
  Tags: OutTags[]
}

export interface ITagFilters {
  TagFilters: OutTags[]
}
