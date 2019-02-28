/**
 * Title.
 *
 * @description descrip.
 * @param {boolean} shouldAccelate - Asd.
 * @returns {Object} - Asd.
 * @example
 *  var acc = accelerate(true)
 */
const accelerate = shouldAccelate => {
  return {
    AccelerateConfiguration: {
      AccelerationStatus: shouldAccelate ? 'Enabled' : 'Suspended'
    }
  }
}

export { accelerate }
