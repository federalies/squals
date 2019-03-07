/** @module S3Bucket */
/**
 * AWS:S3:: Setup Versioning Config.
 *
 * @description Setup the enum(status) of the versioning on the bucket [`Suspened` | `Enabled`]
 * @param isEnabled - True maps to `Enabled`.
 * @example
 *  var version = versioning(true)
 */
declare const versioning: (isEnabled: boolean) => OutVersioning;
export interface OutVersioning {
    VersioningConfiguration: {
        Status: 'Suspended' | 'Enabled';
    };
}
export { versioning };
//# sourceMappingURL=versioningConfiguration.d.ts.map