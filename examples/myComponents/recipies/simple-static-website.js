"use strict";
/**
 * This example gives you a static website that is editable via a browser
 * - use: $> `node -r esm examples/simple-static-website.js`
 * - or to save to tmp: $> `node -r esm examples/simple-static-website.js > simpleWebsite.cloudfm.json &&  aws cloudformation validate-template --template-body file://simpleWebsite.cloudfm.json`
 * - or `node -r esm validtor.js examples/simple-static-website.js`
 */
exports.__esModule = true;
// import simpleWebsite from '../../../src/higher-order-comps/staticWebsite'
// import {S3Bucket} from '../../../src/components/s3'
var components_1 = require("../../../src/components/");
var s3_1 = require("../../../src/components/s3"); //  why can I not add this above? @todo @researc
var certificateManager_1 = require("../../../src/components/certificateManager");
var mydomain = 'example.com';
var awsCert = new certificateManager_1.AWSCertificate(mydomain);
var webContent = new s3_1.S3Bucket();
var MyCDN = new components_1.CloudFrontCDN(webContent.WebsiteURL());
var DomainRecords = new components_1.Route53RecordSetGroup(new components_1.Route53HostedZone('example.com'));
// @workHere
DomainRecords.A(['', MyCDN.DomainName()]);
var printMe = new components_1.Template({
    Description: "A simple website template"
});
printMe.Resources = [webContent, MyCDN, DomainRecords, awsCert];
console.log(printMe);
exports["default"] = printMe;
