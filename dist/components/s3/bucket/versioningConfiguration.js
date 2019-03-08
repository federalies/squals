/** @module S3Bucket */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
