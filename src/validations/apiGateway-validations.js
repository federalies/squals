const properties = []

const validations = _this => {
  return [
    {
      msg: { AccessControl: 'input is not a valid selection' },
      test: true
    },
    {
      msg: { SomeOtherIssue: 'input is not a valid selection' },
      test: true
    }
  ]
}
export { validations, properties }
