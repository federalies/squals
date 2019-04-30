import { Route53Record } from '../../../src/components/route53/recordSet'
import { Route53HostedZone } from '../../../src/components/route53'

describe('Route53 RecordSet', () => {
  test('simple policy object', () => {
    const dnsRec = new Route53Record({ cname: ['www.', 'otherdomain.com'] })
    expect(dnsRec.Type).toEqual('AWS::Route53::RecordSet')
    expect(dnsRec).toHaveProperty('name')
    expect(dnsRec.Properties).toEqual({
      Name: 'www.',
      Type: 'CNAME',
      TTL: '300',
      ResourceRecords: ['otherdomain.com']
    })
  })

  test('simple policy object', () => {
    const dnsRec = new Route53Record({ cname: ['www.', 'otherdomain.com', 300] })
    expect(dnsRec.Type).toEqual('AWS::Route53::RecordSet')
    expect(dnsRec).toHaveProperty('name')
    expect(dnsRec.Properties).toEqual({
      Name: 'www.',
      Type: 'CNAME',
      TTL: '300',
      ResourceRecords: ['otherdomain.com']
    })
  })

  test('simple policy object', () => {
    const dnsRec = new Route53Record({
      cname: {
        sub: 'www.',
        loc: 'otherdomain.com',
        ttl: 300
      }
    })
    expect(dnsRec).toHaveProperty('name')
    expect(dnsRec.Type).toEqual('AWS::Route53::RecordSet')
    expect(dnsRec.Properties).toEqual({
      Name: 'www.',
      Type: 'CNAME',
      TTL: '300',
      ResourceRecords: ['otherdomain.com']
    })
  })

  test.skip('simple policy Array', () => {
    // const dnsRec = new Route53Record(['a', '', 'otherdomain.com'])
    expect([]).toEqual({})
  })

  test.skip('simple records', () => {
    expect([]).toEqual([])
  })

  test.skip('failover records', () => {
    expect([]).toEqual([])
  })

  test.skip('geolcoation records', () => {
    expect([]).toEqual([])
  })

  test.skip('latency records', () => {
    expect([]).toEqual([])
  })

  test.skip('multianswer records', () => {
    expect([]).toEqual([])
  })

  test.skip('weighted records', () => {
    expect([]).toEqual([])
  })
})
