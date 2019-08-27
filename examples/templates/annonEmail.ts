/**
 * # priva.email
 *
 * ## Overview
 *
 * priva.email helps users sign up for other online accounts with "ugly addresses"
 * priva.email is a like a bit.ly for yoru email. It hides your email.
 * priva.email is a system and a service. We love it when people run Priva.email on their domain.
 *
 *
 * ## Resources:
 *
 * - user
 * - mailbox
 * - mailboxRules
 *
 *
 * ## Quick Orientation
 *
 * A User has mailbox(es)
 * Mailboxes may represent people, groups, office rooms, or other resources
 * Users make/publish mailbox rules
 * Users connect rules to their mailboxes
 * Mailboxes use MailboxRules
 *
 * ## Normal Use Case
 *
 * User:Sarah care about being safe online, and uses a password manager,
 * and looks for https while browsing the internet. She is also aware that she
 * is tracked around the internet largely based on her re-used email address.
 *
 * Sarah: used to give out email addresses to services with her gmail address
 * using <sarah+netflix@gmail.com> and <sarah+hulu@gmail.com> which could help her
 * determine if netflix or other Co. sold her email elsewhere. The problem was
 * that netflix and others added filters to make `+` not a valid email character.
 *
 * But now that sarah has setup `priva.email` on her own domain <`unicorns.dev`>,
 * she can use `sarah@unicorns.dev` just like she might use her `gmail` address
 * `priva.email` also allows her to use countless other mailboxes. she can now
 * give  out `sarah_netflix@unicorns.dev` or <`srgNETFLIX@unicorns.dev`>
 * and sometimes a throwaway/ugly address is nice... so <`qwer12fghnm56yuikl89op@unicorn.dev`>
 * which also works.
 *
 *
 * ### Main Account
 *
 * `sarah@<example.com>` is her main account
 *
 * ### Prefix
 *
 * She also setup a prefix `srg` (her initials), but her brother setup `dr.` to be funny
 * Anything prefixed with `srg` or `dr.` is routed to the peson owning the prefix
 *
 * ### Ugly Box
 *
 * Anything sent to an `UglyBox` sits in the mailroom waiting for you to come claim
 * your own mail. But becareful, anyone with access to the mailroom can read/claim while
 * it sits in the lost and found
 *
 * Its absolutely reasonable that, most of the time in life you may not want to race your
 * sibling to the proverbial mailbox (or anyone else for that matter). So you can also
 * precreate an `UglyBox` that is built knowing how to route your mail to you.
 *
 * ### Shared Boxes
 *
 * you can claim/keep an ugly address (unprefixed) if you like,
 * you can even share the mailbox with someone else.
 *
 * For example Sarah and Jack jointly own `siblings@unicorn.dev`
 *
 *
 * ## Min Viable Deploy:
 *
 * Route53 HostedZone
 * Route53 MX records to recieve Mail on the hosted zone
 * SES - RecieptRules and ConfigSets
 * Firehose
 *
 *
 * ## How do I use this?
 *
 * $> npx ts-node examples/templates/annonEmail.ts > examples/dataOut/annonEmail.template.json
 *
 */
import { Template } from '../../src/components/Template'
import {
  SESReceiptRuleSet,
  SESReceiptRule,
  SESConfigurationSet,
  SESConfigurationSetEventDestination
  // SESTemplate
} from '../../src/components/ses'
import {
  Route53HostedZone,
  Route53Record,
  Route53RecordSetGroup
} from '../../src/components/route53'
import { KinesisFirehoseDeliveryStream } from '../../src/components/kinesisFirehose'
import { S3Bucket } from '../../src/components/s3'
import { IamRole, IamPolicy } from '../../src/components/iam'

const zone = new Route53HostedZone({ domain: 'getfedera.com' })
const sesRuleSet = new SESReceiptRuleSet({ name: 'sesRuleSet1', ruleSetName: 'inbound_all' })
const sesRule = new SESReceiptRule().linktoRuleSet(sesRuleSet)
const record1 = new Route53Record({ mx: { sub: 'mail', loc: 'abc', priority: 10 } })
const record2 = new Route53Record({ mx: { sub: 'mail', loc: 'abc', priority: 20 } })
const sesConfigSet = new SESConfigurationSet({ configName: 'basic' })
const fhDestination = new S3Bucket()
const fireHose = new KinesisFirehoseDeliveryStream({
  opt: 's3',
  bucketARN: fhDestination.Arn(),
  hints: { MBs: 500, s: 60 },
  compression: 'GZIP',
  roleARN: ''
})
const policy1 = new IamPolicy()
const role1 = new IamRole({})
const sesConfigwEvents = new SESConfigurationSetEventDestination({
  eventTypes: [
    'bounce',
    'click',
    'complaint',
    'delivery',
    'open',
    'reject',
    'renderingFailure',
    'send'
  ],
  fh: { DeliveryStreamARN: fireHose.Arn(), IAMRoleARN: '' }
}).linkConfigurationSet(sesConfigSet)

const t = new Template().addResources(
  zone,
  sesRuleSet,
  sesRule,
  record1,
  record2,
  sesConfigSet,
  fhDestination,
  fireHose,
  sesConfigwEvents,
  policy1,
  role1
)

console.log(JSON.stringify(t, null, 3))
