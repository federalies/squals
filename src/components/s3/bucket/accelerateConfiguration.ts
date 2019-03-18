export const accelerate = (shouldAccelate: boolean = true): IBucketAccelerateConfig => {
  return {
    AccelerateConfiguration: {
      AccelerationStatus: shouldAccelate ? 'Enabled' : 'Suspended'
    }
  }
}

export interface IBucketAccelerateConfig {
  AccelerateConfiguration: { AccelerationStatus: 'Enabled' | 'Suspended' }
}
