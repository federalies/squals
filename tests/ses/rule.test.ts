import { ISESReceiptRule_Actions, SESReceiptRule } from '../../src/components/ses/index'
import { cloneDeep } from 'lodash'

describe('Recipet Rule Test', () => {
  const min = new SESReceiptRule()
  const big = new SESReceiptRule({
    name: 'ruleComp',
    rulename: 'ruleName',
    ruleSetName: 'arn::setName',
    enabled: true,
    scan: true,
    useTls: true,
    recipients: ['acme1@example1.com', 'acme2@example.com']
  })

  test('Defaults', () => {
    const a = cloneDeep(min)

    expect(a.Type).toEqual('AWS::SES::ReceiptRule')
    expect(a.Properties).toEqual({
      RuleSetName: '< PLACEHOLDER:: LINK TO RULESET >',
      Rule: {
        ScanEnabled: true,
        Enabled: true,
        TlsPolicy: 'Optional'
      }
    })
  })

  test('Advanced Builder', () => {
    const a = cloneDeep(big).actions(
      {
        s3: {
          bucket: 'bucket',
          prefix: 'prefix/',
          topicArn: 'arn::AWS::topic',
          kmsKeyArn: 'arn::KMS'
        }
      },
      { lambda: { functionArn: 'arn::AWS', type: 'Event' } },
      { sns: { topicArn: 'topicARN' } },
      { stop: { topicArn: 'topicARN' } },
      { bounce: { msg: 'msg', smtpcode: [4, 1, 2], sender: 'goaway@example.com' } },
      { workmail: { orgArn: 'orgARN' } },
      { header: { name: 'name', value: 'value' } }
    )
    const Actions = [
      {
        S3Action: {
          BucketName: 'bucket',
          ObjectKeyPrefix: 'prefix/',
          KmsKeyArn: 'arn::KMS',
          TopicArn: 'arn::AWS::topic'
        }
      },
      {
        LambdaAction: {
          FunctionArn: 'arn::AWS',
          InvocationType: 'Event'
        }
      },
      {
        SNSAction: {
          Encoding: 'UTF-8',
          TopicArn: 'topicARN'
        }
      },
      {
        StopAction: {
          Scope: 'RuleSet',
          TopicArn: 'topicARN'
        }
      },
      {
        BounceAction: {
          Message: 'msg',
          Sender: 'goaway@example.com',
          SmtpReplyCode: '412'
        }
      },
      {
        WorkmailAction: {
          OrganizationArn: 'orgARN'
        }
      },
      {
        AddHeaderAction: {
          HeaderName: 'name',
          HeaderValue: 'value'
        }
      }
    ] as ISESReceiptRule_Actions[]

    const e = {
      RuleSetName: 'arn::setName',
      Rule: {
        Name: 'ruleName',
        ScanEnabled: true,
        Enabled: true,
        TlsPolicy: 'Require',
        Recipients: ['acme1@example1.com', 'acme2@example.com'],
        Actions
      }
    }
    expect(a.Properties).toEqual(e)
  })

  test('Recipet Rule ValidateJS', () => {
    const a = SESReceiptRule.validate({
      name: 'ruleComp',
      rulename: 'ruleName',
      ruleSetName: 'arn::setName',
      enabled: true,
      scan: true,
      useTls: true,
      recipients: ['acme1@example1.com', 'acme2@example.com']
    })
    expect(a).toEqual(big)
  })

  test('Three Equivalent Function Chains', () => {
    const a = new SESReceiptRule({ rulename: 'ruleName', useTls: true, enabled: true, scan: true })
      ._name('ruleComp')
      .scan()
      .enabled()
      .useTLS(false)
      .ruleName('ruleName')
      .linktoRuleSet('arn::setName')
      .recipients('acme1@example1.com', 'acme2@example.com')

    const b = new SESReceiptRule({ enabled: false, scan: false, useTls: false })
      ._name('ruleComp')
      .scan()
      .enabled()
      .useTLS(false)
      .ruleName('ruleName')
      .linktoRuleSet('arn::setName')
      .recipients('acme1@example1.com', 'acme2@example.com')

    const c = new SESReceiptRule({})
      ._name('ruleComp')
      .scan()
      .enabled()
      .useTLS(false)
      .ruleName('ruleName')
      .linktoRuleSet('arn::setName')
      .recipients('acme1@example1.com', 'acme2@example.com')

    expect(a).toEqual(b)
    expect(b).toEqual(c)
    expect(a).toEqual(cloneDeep(big).useTLS(false))
  })

  test('Link a Rule After Another', () => {
    const first = new SESReceiptRule({
      name: 'ruleComp1'
    })

    const second = new SESReceiptRule({
      name: 'ruleComp2'
    }).after(first)

    expect(second.Properties.After).toEqual({ Ref: 'ruleComp1' })
  })
})
