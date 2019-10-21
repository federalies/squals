import * as c from '../../src/components/certificateManager'

describe('certificate mgr intenral ƒ.helpers', () => {
  describe('type guards', () => {
    test('isObjArr', () => {
      expect(c.isObjArr([{}, {}])).toBe(true)
      expect(c.isObjArr([''])).toBe(false)
      const garbage: any = [1, 2, 3]
      expect(c.isObjArr(garbage)).toBe(false)
      expect(c.isObjArr([])).toBe(false)
    })
    test('isStringArr', () => {
      expect(c.isStringArr([''])).toBe(true)
      expect(c.isStringArr([])).toBe(false)
      expect(c.isStringArr([{}, {}])).toBe(false)
      const garbage: any = [1, 2, 3]
      expect(c.isStringArr(garbage)).toBe(false)
    })
  })

  test('simplest string: exmaple.com', () => {
    const a = c._transformInputDomainData('example.com')
    expect(a).toEqual({
      DomainName: 'example.com'
    })
  })

  test('simplest obj: exmaple.com', () => {
    const a = c._transformInputDomainData({
      domain: 'mydomain.com',
      proofingDomain: 'otherdomain.net'
    })
    expect(a).toEqual({
      DomainName: 'mydomain.com',
      DomainValidationOptions: [
        {
          DomainName: 'mydomain.com',
          ValidationDomain: 'otherdomain.net'
        }
      ]
    })
  })

  test('simplest obj: exmaple.com', () => {
    const a = c._domainObjOpts([{ domain: 'mydomain.com', proofingDomain: 'otherdomain.net' }])
    expect(a).toEqual({
      DomainValidationOptions: [
        {
          DomainName: 'mydomain.com',
          ValidationDomain: 'otherdomain.net'
        }
      ]
    })
  })
  test('string based domain validation options', () => {
    const a = c._domainStringOpts(['mydomain.com'])
    expect(a).toEqual({
      DomainValidationOptions: [{ DomainName: 'mydomain.com', ValidationDomain: 'mydomain.com' }]
    })
  })
  test('handle first domain', () => {
    const a = c._handleFirstDomain(['domain1.com', 'domain2.com'])
    expect(a).toEqual({ DomainName: 'domain1.com' })
  })

  test('constructor1 test', () => {
    const domain = 'example.com'
    const a = new c.AWSCertificate(domain)
    const e = {
      DomainName: domain,
      ValidationMethod: 'EMAIL'
    }

    expect(a).toHaveProperty('name')
    expect(a).toHaveProperty('Type', 'AWS::CertificateManager::Certificate')
    expect(a.Properties).toEqual(e)
  })

  test('constructor2 test', () => {
    const domain = ['example.com', 'example.net']
    const a = new c.AWSCertificate(domain)
    const e = {
      DomainName: domain[0],
      SubjectAlternativeNames: [domain[1]],
      ValidationMethod: 'EMAIL'
    }

    expect(a).toHaveProperty('name')
    expect(a).toHaveProperty('Type', 'AWS::CertificateManager::Certificate')
    expect(a.Properties).toEqual(e)
  })

  test('constructor3 test', () => {
    const domain = ['example.com', 'example.net', 'example.org']
    const a = new c.AWSCertificate(domain)
    const e = {
      DomainName: domain[0],
      ValidationMethod: 'EMAIL',
      SubjectAlternativeNames: [domain[1], domain[2]]
    }

    expect(a).toHaveProperty('name')
    expect(a).toHaveProperty('Type', 'AWS::CertificateManager::Certificate')
    expect(a.Properties).toEqual(e)
  })

  test.skip('deep copy test', () => {})

  test.skip('mixed mode array', () => {
    let input: any = [
      'domain1.com',
      'domain2.com',
      { domain: 'domain3.com', proofingDomain: 'domain4.com' }
    ]
    const a = c._transformInputDomainData(input)
    const e = {}
    expect(a).toEqual(e)
  })

  test.skip('', () => {
    // const a = c._domains()
    // const e = {}
    // expect(a).toEqual(e)
  })

  test.skip('', () => {
    // const a = c._domains()
    // const e = {}
    // expect(a).toEqual(e)
  })

  test.skip('', () => {
    // const a = c._domains()
    // const e = {}
    // expect(a).toEqual(e)
  })

  test.skip('', () => {
    // const a = c._domains()
    // const e = {}
    // expect(a).toEqual(e)
  })

  test.skip('', () => {
    // const a = c._domains()
    // const e = {}
    // expect(a).toEqual(e)
  })

  test.skip('', () => {
    // const a = c._domains()
    // const e = {}
    // expect(a).toEqual(e)
  })
})
