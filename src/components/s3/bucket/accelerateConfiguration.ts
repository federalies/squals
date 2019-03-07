const accelerate: (shouldAccelate: boolean) => OutAccelerateConfig = function (
  shouldAccelate
) {
  return {
    AccelerateConfiguration: {
      AccelerationStatus: shouldAccelate ? 'Enabled' : 'Suspended'
    }
  }
}

interface OutAccelerateConfig {
  AccelerateConfiguration: { AccelerationStatus: 'Enabled' | 'Suspended' }
}

export { accelerate }
