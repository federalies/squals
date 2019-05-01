import { Template } from './template'
import * as AWS from 'aws-sdk'
import { CloudFormation } from 'aws-sdk'

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html
export class Uploader {
  name: string
  cfm: CloudFormation
  template: Template
  body: string
  cache_locs: cacheUris[]
  constructor (input: inUploader) {
    AWS.config.region = 'us-west-2'
    AWS.config.apiVersions = {
      cloudformation: '2010-05-15'
    }

    const hashedCache = (str: string): string => {
      return `~/.squals-cache/${new Date().getTime()}.json`
    }

    if ('template' in input) {
      this.template = input.template
      this.body = JSON.stringify(input.template)
      this.cache_locs = input.cacheLocs
        ? input.cacheLocs
        : [{ 'file://': '.squals-cache.json' }, { 'file://': hashedCache }]
      this.name = input.name ? input.name : `AutoGen ${new Date().getTime}`
    } else {
      this.template = input
      this.body = JSON.stringify(input)
      this.cache_locs = [{ 'file://': '.squals-cache.json' }, { 'file://': hashedCache }]
      this.name = `AutoGen ${new Date().getTime}`
    }

    this.cfm = new AWS.CloudFormation()
  }
  configCache () {
    // setup fs location
    //
  }
  async cache () {}
  async validate () {
    const p = await this.cfm.validateTemplate({ TemplateBody: this.body }).promise()
    console.log(p)
    return p
  }
  async deploy () {
    // figure out strategy
    // stack create
    // create chagnge set -> execute change set
  }
  async dryRun () {
    return this.cfm.getTemplateSummary({ TemplateBody: this.body }).promise()
  }
  async list () {
    return this.cfm.describeStacks().promise()
  }
}

export type inUploader = Template | inUploaderData

export interface inUploaderData {
  template: Template
  name?: string
  cacheLocs?: cacheUris[]
}
type cacheUris = { 'file://': funcOrStr } | { 's3://': funcOrStr } | { 'http://': funcOrStr }
type StringTransform = (s: string) => string
type funcOrStr = string | StringTransform
