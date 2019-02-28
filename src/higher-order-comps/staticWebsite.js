import { Template } from '../../src/components'

/**
 * Example:
 * Is this a Sensible Syntax:
 * --------------------------
 * non-obvious fucntion returns
 * recordSet.addCNAME looks like it just returns
 * --------------------------
 *   // wire it all up
 *   recordSet.addCNAME(                      // 3. Mutation - adds a Fn::GetAtt ref
 *     publicSiteURL,
 *     distribution.addOrign(                 // 2. Mutation - adds a Fn::GetAtt ref
 *        bucket.enableWebsite().websiteURL() // 1. Mutation - adds a Fn::GetAtt ref
 *     ).domain()
 *   )
 *
 * // the wiring mutates the objects
 * // add the wired objects back to the tempalte
 * template.addResources({bucket, distribution, recordSet})
 *
 */

//
// in::before template
// makes: a S3 Backed Website - with CDN - and Route53 Changes
// out::changed template
//
// eventually use the cloudFront IDs and make the s3 website non-public - only accessible via the CDN.
//

// makes no assumptions about what is already in the template
//  might already be in the template - but this composer add it again to make a new simpleWebsite

// console.log(bucket.website(true))
// console.log(bucket.website(true).WebsiteURL())
// console.log(
//   JSON.stringify(distribution.addOrigins(['www.mywebsite.com']), null, 2)
// )

const simpleWebsite = (
  template,
  publicSiteURL,
  { bucket, distribution, recordSet }
) => {
  if (!template || !bucket || !distribution || !recordSet) {
    throw new Error(
      'The `simpleWebsite` composer requires a (1)template, (2)bucket, (3)distribution, and (4)recordSet'
    )
  }
  recordSet.addCNAME(
    publicSiteURL,
    distribution.addOrigns([bucket.website(true).WebsiteURL()]).domain()
  )

  return new Template({
    Description: template.Description,
    Resources: { ...template.Resources, bucket, distribution, recordSet }
  })
}

export default simpleWebsite
