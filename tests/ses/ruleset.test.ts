import { SESReceiptRule } from '../../src/components/ses/index'
import { cloneDeep } from 'lodash'

describe('RuleSet Tests', () => {
  const min = new SESReceiptRule()
  test('Defaults', () => {
    const a = cloneDeep(min)
    const e = {
      Type: 'AWS::SES::ReceiptRule',
      Properties: {
        RuleSetName: '< PLACEHOLDER:: LINK TO RULESET >',
        Rule: {
          ScanEnabled: true,
          Enabled: true,
          TlsPolicy: 'Optional'
        }
      }
    }
    const { Type, Properties, ...rest } = a
    expect({ Type, Properties }).toEqual(e)
  })
})
