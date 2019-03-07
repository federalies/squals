/** @module S3Bucket */
declare const metricsConfig: (meterThese: any) => {
    MetricsConfigurations: any;
};
declare const metricsRule: (params: any) => {
    TagFilters: import("./tags").OutTags[];
    Id: any;
    Prefix: any;
};
export { metricsConfig, metricsRule };
//# sourceMappingURL=metricsConfiguration.d.ts.map