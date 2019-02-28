/**
 * AWS:S3:: Setup Versioning Config.
 *
 * @description Setup the enum(status) of the versioning on the bucket [`Suspened` | `Enabled`]
 * @param {boolean} isEnabled - True maps to `Enabled`.
 * @returns {Object} Cloudfomration Object.
 * @example
 *  var version = versioning(true)
 */
const versioning = isEnabled => {
  return isEnabled
    ? { VersioningConfiguration: { status: 'Suspended' } }
    : { VersioningConfiguration: { status: 'Enabled' } }
}

export { versioning }
