import {
  join,
  base64,
  cidr,
  findInMap,
  importVal,
  select,
  split,
  sub,
  transform
} from '../../src/components/Template'

describe('Basic Intrinsic Types from Template', () => {
  test('Join Function', () => {
    expect(join('.')('192', '168', '0', '1')).toEqual({
      'Fn::Join': ['.', ['192', '168', '0', '1']]
    })
  })

  test('Base64 Function', () => {
    expect(base64(join('.')('192', '168', '0', '1'))).toEqual({
      'Fn::Base64': { 'Fn::Join': ['.', ['192', '168', '0', '1']] }
    })
  })

  test('Cidr Function', () => {
    expect(cidr('192.168.0.11/24', 5, 6)).toEqual({ 'Fn::Cidr': ['192.168.0.11/24', 5, 6] })
  })

  test('FindInMap Function', () => {
    expect(findInMap('RegionalDataLookup', 'Attribute')({ Ref: 'SomeOtherThing' })).toEqual({
      'Fn::FindInMap': ['RegionalDataLookup', { Ref: 'SomeOtherThing' }, 'Attribute']
    })
  })

  test('ImportVal Function', () => {
    expect(importVal({ Ref: 'someString' })).toEqual({
      'Fn::ImportValue': { Ref: 'someString' }
    })
  })

  test('Select Function', () => {
    const ret = select(['A', 'b', 'C', 'd'])(2)
    expect(ret).toEqual({ 'Fn::Select': [2, ['A', 'b', 'C', 'd']] })
  })

  test('Split Function ', () => {
    const ret = split('|')('Hello|World|Hope|You|Are|Doing|Fine')
    expect(ret).toEqual({ 'Fn::Split': ['|', 'Hello|World|Hope|You|Are|Doing|Fine'] })
  })

  test('Sub Function', () => {
    const ret = sub('www.${Domain}')({ Domain: { Ref: 'RootDomainName' } })
    expect(ret).toEqual({ 'Fn::Sub': ['www.${Domain}', { Domain: { Ref: 'RootDomainName' } }] })
  })

  test('Transform Function', () => {
    const ret = transform('AWS::Include')({ Location: { Ref: 'InputValue' } })
    expect(ret).toEqual({
      'Fn::Transform': { Name: 'AWS::Include', Parameters: { Location: { Ref: 'InputValue' } } }
    })
  })
})
