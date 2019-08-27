# SES

## Outbound

- `ConfigurationSet` = RuleGroup for sending
- `____`EventDesination = Pulishes event to somewhere CloudWatch, Kinesis Firehose, or SNS.

  - Refs a ConfigSet

- `Template` is a `Handlebars` tempalte

## Inbound

- `ReceiptFilter` = an IP Address whitelist/blacklist
- `ReceiptRuleSet` = the master group of ordered rules
- `ReceiptRule` = intended to be assosciated to a group

  - Actions = AddHeader | Bounce | Lambda | S3 | SNS | Stop | WorkMail
  - EventTypes= Send | Reject | Bounce | Complaint | Deliveries | Open | Clicks | RenderFailure

### Diagram

```
RuleSet--------------------------------------------------------------------------
|
| Rule1--------------------------------------------------------------------
| |
| | < Condition > --Y--> [ Action1 ]--> [ Action2 ] --> [ Action3 ]
| | N
| | ⬇ ︎
| `________________________________________________________________________`
|
| Rule2--------------------------------------------------------------------
| |
| | < Condition > --Y--> [ Action1 ]--> [ Action2 ] --> [ Action3 ]
| | N
| | ⬇ ︎
| `________________________________________________________________________`
|
|`_______________________________________________________________________________`
```

Federa Mail

User Contacts

- Prospects (money paid )
- Cutomers
- Vendors

- Support Tickets

- Recent Orders
- Last Contact

Application Emails + Newsletter Emails + Team Member Emails

Send via Federa MailRoom ?

Email List Preferences
