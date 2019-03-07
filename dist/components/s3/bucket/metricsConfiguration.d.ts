import { InTags, OutTags } from './tags';
/** @module S3Bucket */
export declare const metricsConfig: (meterThese: InMetricsRule | InMetricsRule[]) => {
    MetricsConfigurations: OutMetricsRule[];
} | {
    MetricsConfigurations: OutMetricsRule;
};
export declare const metricsRule: (params: InMetricsRule) => OutMetricsRule;
export interface InMetricsRule {
    id: string;
    prefix?: string;
    tagList?: InTags[];
}
export interface OutMetricsRule {
    Id: string;
    Prefix?: string;
    TagFilters?: OutTags[];
}
export interface OutMetricsConfig {
    MetricsConfigurations: OutMetricsRule[];
}
//# sourceMappingURL=metricsConfiguration.d.ts.map