import {
  LambdaFunction,
  ILambdaFunc_min,
  ILambdaFunc_json,
  ILambdaFunc_Props
} from '../../src/components/lambda'

describe('Lambda Function', () => {
  // some resuable objects
  let input1: ILambdaFunc_min = {
    name: 'example1',
    role: 'Some_Role',
    handler: 'myHandler',
    runtime: 'nodejs10.x',
    code: 's3://bucket/path/keyName'
  }
  const example1 = new LambdaFunction(input1)

  test.skip('Defaults', () => {
    const e = {}
    expect(example1).toEqual(e)
  })
})
