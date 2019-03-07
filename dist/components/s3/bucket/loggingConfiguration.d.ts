/** @module S3Bucket */
/**
 * This is a Title.
 *
 * @description creates a valid CFM key
 * @param params - Asd.
 * @param params.saveLogsToBucket -Asd.
 * @param paramslogPrefix - Asd.
 * @example
 *  var lc = loggingConfg({saveLogsToBucket:'otherbucket', logPrefix:'logs/'})
 */
export declare const loggingConfg: (params: InLoggingConfig) => {
    LoggingConfiguration: OutLogging;
};
export interface InLoggingConfig {
    saveLogsToBucket?: string;
    logPrefix?: string;
}
export interface OutLogging {
    DestinationBucketName?: string;
    LogFilePrefix?: string;
}
export interface OutLoggingConfig {
    LoggingConfiguration: OutLogging;
}
//# sourceMappingURL=loggingConfiguration.d.ts.map