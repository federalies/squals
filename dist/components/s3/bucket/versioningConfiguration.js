"use strict";
/** @module S3Bucket */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * AWS:S3:: Setup Versioning Config.
 *
 * @description Setup the enum(status) of the versioning on the bucket [`Suspened` | `Enabled`]
 * @param isEnabled - True maps to `Enabled`.
 * @example
 *  var version = versioning(true)
 */
var versioning = function (isEnabled) {
    return isEnabled
        ? { VersioningConfiguration: { Status: 'Suspended' } }
        : { VersioningConfiguration: { Status: 'Enabled' } };
};
exports.versioning = versioning;
