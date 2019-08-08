import {
  LambdaAlias,
  ILambdaAlias_Props,
  ILambdaAlias_json,
  ILambdaAlias_min
} from '../../src/components/lambda'

describe('Lambda Alias', () => {
  const input = { name: 'myAlias', func: 'myFunc' }
  const example1 = new LambdaAlias({ name: 'BadPun1', func: 'YesYouCanSpellFunWithOutFunc' })
  const example2 = new LambdaAlias({ name: 'myAlias', func: 'myFunc' })
  const example3 = new LambdaAlias({ name: 'myAlias', func: 'myFunc' })
    .desc('SomeGreatDescription')
    .functionName('OverrideFuncName')
    .functionVersion('v9')
    .routeConfig({ v: 'v1', weight: 0.2 }, { v: 'v2', weight: 0.3 }, { v: 'v3', weight: 0.5 })
    ._name('myFuncAliasUsingWeighting')

  test('Default Alias', () => {
    const a = new LambdaAlias({ name: 'BadPun1', func: 'YesYouCanSpellFunWithOutFunc' })
    const e = {
      FunctionName: 'YesYouCanSpellFunWithOutFunc',
      Name: 'BadPun1',
      FunctionVersion: '$LATEST'
    } as ILambdaAlias_Props
    expect(a.name).toEqual('BadPun1')
    expect(a.Properties).toEqual(e)
  })

  test('Builder Method Kitchen Sink Exmaple', () => {
    const _aliasName = 'myAlias'
    const _funcName = 'myFunc'

    const a = (new LambdaAlias({ name: _aliasName, func: _funcName })
      .desc('SomeGreatDescription')
      .functionName('OverrideFuncName')
      .functionVersion('v9')
      .routeConfig({ v: 'v1', weight: 0.2 }, { v: 'v2', weight: 0.3 }, { v: 'v3', weight: 0.5 })
      ._name('myFuncAliasUsingWeighting')
      .toJSON()[0] as unknown) as ILambdaAlias_json
    const e = {
      Name: _aliasName,
      FunctionName: 'OverrideFuncName',
      FunctionVersion: 'v9',
      Description: 'SomeGreatDescription',
      RoutingConfig: {
        AdditionalVersionWeights: [
          { FunctionVersion: 'v1', FunctionWeight: 0.2 },
          { FunctionVersion: 'v2', FunctionWeight: 0.3 },
          { FunctionVersion: 'v3', FunctionWeight: 0.5 }
        ]
      }
    } as ILambdaAlias_Props
    const n = Object.keys(a)[0]
    expect(n).toEqual('myFuncAliasUsingWeighting')
    expect(a[n].Properties).toEqual(e)
  })

  test('Versbose Input', () => {
    const input: ILambdaAlias_min = {
      func: 'OverrideFuncName',
      name: 'myAlias',
      desc: 'SomeGreatDescription',
      v: 'v9',
      versionWts: [{ v: 'v1', weight: 0.2 }, { v: 'v2', weight: 0.3 }, { v: 'v3', weight: 0.5 }]
    }
    const a = new LambdaAlias(input)._name('myFuncAliasUsingWeighting')
    expect(a).toEqual(example3)
  })

  test('ValidateJS Example', () => {
    const input = { name: 'myAlias', func: 'myFunc' }
    const a = LambdaAlias.fromJS(input)
    expect(a).toEqual(example2)

    const validationErr = () => LambdaAlias.fromJS({ a: 1, b: 2 } as any)
    expect(validationErr).toThrow()
  })

  test('ValidateJSON Example', () => {
    const a = LambdaAlias.fromJSON(example3.toJSON()[0])
    expect(a).toEqual(example3)
    const valErr = () =>
      LambdaAlias.fromJSON({
        someComponent: { Type: 'NotAWS', Properties: { MissingMajorParts: 1 } }
      })
    expect(valErr).toThrow()
  })

  test('JS->Str->JS', () => {
    const s = JSON.stringify(example3.toJSON()[0], null, 2)
    const a = LambdaAlias.from(s)
    expect(a).toEqual(example3)
  })

  test('Ref Output', () => {
    expect(example3.Ref()).toEqual({ Ref: 'myFuncAliasUsingWeighting' })
  })

  test('Ref Init', () => {
    let _input: any = input
    _input.name = { Ref: 'SomeOtherThing' }
    const a = new LambdaAlias(_input)._name('_')
    expect(a).toEqual(example2.aliasName({ Ref: 'SomeOtherThing' })._name('_'))
  })
})
