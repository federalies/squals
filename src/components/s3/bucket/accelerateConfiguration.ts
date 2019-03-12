export const accelerate = (shouldAccelate: boolean = true): OutAccelerateConfig => {
  return {
    AccelerateConfiguration: {
      AccelerationStatus: shouldAccelate ? 'Enabled' : 'Suspended'
    }
  }
}

export interface OutAccelerateConfig {
  AccelerateConfiguration: { AccelerationStatus: 'Enabled' | 'Suspended' }
}
