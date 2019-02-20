// validate enums
// validate Object key covariance rules

import ow from 'ow'

export const validations = _this => {
  return [
    {
      msg: { AccessControl: 'input is not a valid selection' },
      test: ow.isValid('a', ow.string.oneOf(['a', 'b']))
    },
    {
      msg: { SomeOtherIssue: 'input is not a valid selection' },
      test: true
    }
  ]
}
