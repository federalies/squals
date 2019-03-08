(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./accelerateConfiguration", "./analyticsConfiguration", "./bucket", "./bucketEncryption", "./corsConfiguration", "./destination", "./inventoryConfiguration", "./lifecycleConfiguration", "./loggingConfiguration", "./metricsConfiguration", "./notificationConfiguration", "./publicAccessBlockConfiguration", "./redirectRule", "./replicationConfiguration", "./tags", "./versioningConfiguration", "./websiteConfiguration"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    // bucket
    __export(require("./accelerateConfiguration"));
    __export(require("./analyticsConfiguration"));
    __export(require("./bucket"));
    __export(require("./bucketEncryption"));
    __export(require("./corsConfiguration"));
    __export(require("./destination"));
    __export(require("./inventoryConfiguration"));
    __export(require("./lifecycleConfiguration"));
    __export(require("./loggingConfiguration"));
    __export(require("./metricsConfiguration"));
    __export(require("./notificationConfiguration"));
    __export(require("./publicAccessBlockConfiguration"));
    __export(require("./redirectRule"));
    __export(require("./replicationConfiguration"));
    __export(require("./tags"));
    __export(require("./versioningConfiguration"));
    __export(require("./websiteConfiguration"));
});
