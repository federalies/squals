/** @module S3Bucket */

/**
 * AWS::S3:Bucket Tags.
 *
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param {Array<{string: string}>} tagList - TagList  * asdasd.
 * @returns {Array<{Key:string,Value:string}>} - Asd.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
const tags = (tagList = []) => {
  return tagList.reduce((p, c) => {
    p.push({
      Key: Object.keys(c)[0].toString(),
      // @ts-ignore
      Value: Object.values(c)[0].toString()
    })
    return p
  }, [])
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
const Tags = tagList => {
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
const TagFilters = tagList => {
  return {
    TagFilters: tags(tagList)
  }
}

export { TagFilters, Tags, tags }
