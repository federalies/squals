/** @module S3Bucket */

/**
 * AWS::S3:Bucket Tags.
 *
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param tagList - TagList  * asdasd.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
export const tags: (tagList: InTags | Array<InTags>) => Array<OutTags> = function (tagList) {
  const handleArray = (tagList: Array<InTags>) => {
    return tagList.map(v => ({
      Key: Object.keys(v)[0],
      Value: Object.keys(v)[0]
    }))
  }
  const handleItem = (tagList: InTags) => {
    return Object.entries(tagList).reduce((p: Array<OutTags>, [k, v]) => {
      return [...p, { Key: k, Value: v }]
    }, [])
  }

  return Array.isArray(tagList) ? handleArray(tagList) : handleItem(tagList)
}

/**
 * AWS::S3:Bucket Tags.
 *
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param {Array<{string:string}>} tagList - * asdasd.
 * @returns {{Tags:Array<{Key:string,Value:string}>}} - Asd.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
export const Tags: (tagList: InTags | Array<InTags>) => { Tags: Array<OutTags> } = function (
  tagList
) {
  return {
    Tags: tags(tagList)
  }
}

/**
 * AWS::S3:Bucket Tags.
 *
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param {Array<{string: string}>} tagList - Incoming tagList.
 * @returns {{TagFilters:Array<{Key: string, Value:string}>}} - Asd.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
export const TagFilters: (
  tagList: InTags | Array<InTags>
) => { TagFilters: Array<OutTags> } = function (tagList) {
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

// export { TagFilters, Tags, tags };
