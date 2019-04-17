/**
 * Title.
 *
 * @describe description
 * @param shouldAccelate
 * @example
 *  var a = accelerate(true)
 *  console.log(a) // { AccelerateConfiguration: { AccelerationStatus: 'Enabled' }}
 *
 */
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
