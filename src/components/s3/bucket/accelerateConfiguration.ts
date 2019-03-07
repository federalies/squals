export const accelerate: (shouldAccelate: boolean) => OutAccelerateConfig = function (
  shouldAccelate
) {
  return {
    AccelerateConfiguration: {
      AccelerationStatus: shouldAccelate ? 'Enabled' : 'Suspended'
    }
  }
}

export interface OutAccelerateConfig {
  AccelerateConfiguration: { AccelerationStatus: 'Enabled' | 'Suspended' }
}
