/** @module S3Bucket */

/**
 * AWS:S3:: Setup Versioning Config.
 *
 * @description Setup the enum(status) of the versioning on the bucket [`Suspened` | `Enabled`]
 * @param {boolean} isEnabled - True maps to `Enabled`.
 * @returns {{VersioningConfiguration:{Status:string}}} Cloudfomration Object.
 * @example
 *  var version = versioning(true)
 */
const versioning = isEnabled => {
  return isEnabled
    ? { VersioningConfiguration: { Status: 'Suspended' } }
    : { VersioningConfiguration: { Status: 'Enabled' } }
}

export { versioning }
