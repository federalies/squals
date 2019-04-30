import { Route53RecordSetGroup } from '../../../src/components/route53/recordSetGroup'
import { Route53HostedZone } from '../../../src/components/route53'

describe('RecordSet Group', () => {
  test('defaults', () => {
    const domain1 = 'example.com'
    const dnsRecordGrp = new Route53RecordSetGroup(new Route53HostedZone(domain1))
    dnsRecordGrp.CNAME(['www.', 'otherdomain.com'])

    expect(dnsRecordGrp).toHaveProperty('name')
    expect(dnsRecordGrp.Type).toEqual('AWS::Route53::RecordSetGroup')
    expect(dnsRecordGrp.Properties).toHaveProperty('HostedZoneId.Ref')

    expect(
      dnsRecordGrp.Properties.RecordSets.map(v => {
        expect(v).toHaveProperty('name')
        expect(v.Type).toEqual('AWS::Route53::RecordSet')
        return v.Properties
      })
    ).toEqual([{ Type: 'CNAME', Name: 'www.', ResourceRecords: ['otherdomain.com'], TTL: '300' }])
  })

  test('more realistic example', () => {
    const domain1 = 'example.com'
    const dnsRecordGrp = new Route53RecordSetGroup(new Route53HostedZone(domain1))
    dnsRecordGrp
      .CNAME({ sub: 'test', loc: 'testingsite.com', ttl: 100 })
      .CNAME(['www.', 'otherdomain.com'])
      .MX(['mail', 'smtp1.mailprovider.com', 10])
      .MX(['mail', 'smtp2.mailprovider.com', 20, 60 * 2])

    expect(dnsRecordGrp).toHaveProperty('name')
    expect(dnsRecordGrp.Type).toEqual('AWS::Route53::RecordSetGroup')
    expect(dnsRecordGrp.Properties).toHaveProperty('HostedZoneId.Ref')

    const expected = [
      { Type: 'CNAME', Name: 'test', ResourceRecords: ['testingsite.com'], TTL: '100' },
      { Type: 'CNAME', Name: 'www.', ResourceRecords: ['otherdomain.com'], TTL: '300' },
      { Type: 'MX', Name: 'mail', ResourceRecords: ['smtp1.mailprovider.com'], TTL: '300' },
      { Type: 'MX', Name: 'mail', ResourceRecords: ['smtp2.mailprovider.com'], TTL: '120' }
    ]

    expect(
      dnsRecordGrp.Properties.RecordSets.map(v => {
        expect(v.Type).toEqual('AWS::Route53::RecordSet')
        expect(v).toHaveProperty('name')
        return v.Properties
      })
    ).toEqual(expected)
  })
})
