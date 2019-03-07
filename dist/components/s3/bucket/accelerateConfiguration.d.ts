declare const accelerate: (shouldAccelate: boolean) => OutAccelerateConfig;
interface OutAccelerateConfig {
    AccelerateConfiguration: {
        AccelerationStatus: 'Enabled' | 'Suspended';
    };
}
export { accelerate };
//# sourceMappingURL=accelerateConfiguration.d.ts.map