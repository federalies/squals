import {
  ISESConfigurationSet_min,
  SESConfigurationSet,
  SESConfigurationSetEventDestination,
  ISESConfigurationSetEventDestination_min
  // ISESConfigurationSetEventDestination_json
} from '../../src/components/ses'

describe('SES Plain ConfgSets ', () => {
  test('Config Set', () => {
    const name = 'myName'
    const a = new SESConfigurationSet({ configName: 'configName' })._name(name).toJSON()
    expect(a).toEqual({
      [name]: {
        Type: 'AWS::SES::ConfigurationSet',
        Properties: {
          Name: 'configName'
        }
      }
    })
  })

  test('ConfigSet Ref', () => {
    const a = new SESConfigurationSet({ configName: 'configName' })._name('override').Ref()
    expect(a).toEqual({ Ref: 'override' })
  })

  test('All Validations', () => {
    const i: ISESConfigurationSet_min = { name: 'compName', configName: 'myName' }
    const a1 = SESConfigurationSet.validate(i)
    const a2 = new SESConfigurationSet(i)
    const j1 = SESConfigurationSet.validateJSON(a1.toJSON())
    const j2 = SESConfigurationSet.validateJSON(a2.toJSON())
    expect(a1).toEqual(a2)
    expect(j1).toEqual(j2)
    expect(a1).toEqual(j1)
  })
})

describe('ConfigSet with Events', () => {
  test('Validate JS', () => {
    const i: ISESConfigurationSetEventDestination_min = {
      name: 'stableName',
      fh: { IAMRoleARN: '__', DeliveryStreamARN: '__' },
      eventTypes: ['send', 'delivery', 'bounce', 'open', 'complaint', 'reject']
    }
    const a = new SESConfigurationSetEventDestination(i)
    const v = SESConfigurationSetEventDestination.validateJS(i)
    expect(a).toEqual(v)
  })

  test('Validation JSON', () => {
    const i: ISESConfigurationSetEventDestination_min = {
      eventTypes: ['bounce'],
      fh: { IAMRoleARN: '__', DeliveryStreamARN: '__' }
    }
    const a = new SESConfigurationSetEventDestination(i).linkConfigurationSet({
      Ref: 'someotherthing'
    })
    const v = SESConfigurationSetEventDestination.validateJSON(a.toJSON())
    expect(a).toEqual(v)
  })
})
