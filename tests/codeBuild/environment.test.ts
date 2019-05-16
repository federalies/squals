import {
  envItem,
  envVar,
  ICodeBuildEnvironmentData
} from '../../src/components/codeBuild/environment'

describe('CodeBuild::BuildSpec', () => {
  test('defaults', () => {
    const a = envItem({ 'small:linux': { image: 'someImage/@latest' } })
    const e = {
      Type: 'LINUX_CONTAINER',
      ComputeType: 'BUILD_GENERAL1_SMALL',
      Image: 'someImage/@latest',
      ImagePullCredentialsType: 'SERVICE_ROLE',
      PrivilegedMode: false
    }
    expect(a).toEqual(e)
  })

  test('Versbose Option', () => {
    const a = envItem({
      'small:linux': {
        cert: 'someCert',
        image: '@latest',
        privleged: false,
        registryCreds: 'myCerdentials',
        useServiceRole: false,
        paramStore: { PARAM1: 'SomeValue1' },
        envVars: { VAR1: 'VALUE1' }
      }
    })
    const e: ICodeBuildEnvironmentData = {
      Type: 'LINUX_CONTAINER',
      ComputeType: 'BUILD_GENERAL1_SMALL',
      Image: '@latest',
      Certificate: 'someCert',
      ImagePullCredentialsType: 'CODEBUILD',
      PrivilegedMode: false,
      EnvironmentVariables: [
        { Type: 'PLAINTEXT', Name: 'VAR1', Value: 'VALUE1' },
        { Type: 'PARAMETER_STORE', Name: 'PARAM1', Value: 'SomeValue1' }
      ],
      RegistryCredential: {
        Credential: 'myCerdentials',
        CredentialProvider: 'SECRETS_MANAGER'
      }
    }
    expect(a).toEqual(e)
  })

  test('Odd Input Keys are OK if you have size and os', () => {
    const configObj1: any = {
      junk: { os: 'linux', size: 'small', image: '@latest', useServiceRole: true }
    }
    const a1 = envItem(configObj1)
    const e = {
      Type: 'LINUX_CONTAINER',
      ComputeType: 'BUILD_GENERAL1_SMALL',
      ImagePullCredentialsType: 'SERVICE_ROLE',
      Image: '@latest',
      PrivilegedMode: false
    }
    expect(a1).toEqual(e)

    const configObj2: any = { junk: { image: '@latest' } }
    const a2 = () => envItem(configObj2)
    expect(a2).toThrow()
  })

  test('Other Configs', () => {
    expect(envItem({ 'small:windows': { image: '@latest' } })).toEqual({
      Type: 'WINDOWS_CONTAINER',
      ComputeType: 'BUILD_GENERAL1_SMALL',
      ImagePullCredentialsType: 'SERVICE_ROLE',
      Image: '@latest',
      PrivilegedMode: false
    })

    expect(envItem({ 'medium:windows': { image: '@latest' } })).toEqual({
      Type: 'WINDOWS_CONTAINER',
      ComputeType: 'BUILD_GENERAL1_MEDIUM',
      ImagePullCredentialsType: 'SERVICE_ROLE',
      Image: '@latest',
      PrivilegedMode: false
    })

    expect(envItem({ 'large:windows': { image: '@latest' } })).toEqual({
      Type: 'WINDOWS_CONTAINER',
      ComputeType: 'BUILD_GENERAL1_LARGE',
      ImagePullCredentialsType: 'SERVICE_ROLE',
      Image: '@latest',
      PrivilegedMode: false
    })

    expect(envItem({ 'small:linux': { image: '@latest' } })).toEqual({
      Type: 'LINUX_CONTAINER',
      ComputeType: 'BUILD_GENERAL1_SMALL',
      ImagePullCredentialsType: 'SERVICE_ROLE',
      Image: '@latest',
      PrivilegedMode: false
    })

    expect(envItem({ 'medium:linux': { image: '@latest' } })).toEqual({
      Type: 'LINUX_CONTAINER',
      ComputeType: 'BUILD_GENERAL1_MEDIUM',
      ImagePullCredentialsType: 'SERVICE_ROLE',
      Image: '@latest',
      PrivilegedMode: false
    })

    expect(envItem({ 'large:linux': { image: '@latest' } })).toEqual({
      Type: 'LINUX_CONTAINER',
      ComputeType: 'BUILD_GENERAL1_LARGE',
      ImagePullCredentialsType: 'SERVICE_ROLE',
      Image: '@latest',
      PrivilegedMode: false
    })
  })

  test('envVar helper.ƒ with PLAINTEXT', () => {
    const a = envVar({ HOME: '/', DB_USER_EXAMPLE: 'root', DB_PASS_EXAMPLE: '12345678900zxcvbnm' })
    const e = [
      { Type: 'PLAINTEXT', Name: 'HOME', Value: '/' },
      { Type: 'PLAINTEXT', Name: 'DB_USER_EXAMPLE', Value: 'root' },
      { Type: 'PLAINTEXT', Name: 'DB_PASS_EXAMPLE', Value: '12345678900zxcvbnm' }
    ]
    expect(a).toEqual(e)
  })

  test('envVar helper.ƒ with PARAMSTORE', () => {
    const a = envVar({
      paramStore: { HOME: '/', DB_USER_EXAMPLE: 'root', DB_PASS_EXAMPLE: '12345678900zxcvbnm' }
    })
    const e = [
      { Type: 'PARAMETER_STORE', Name: 'HOME', Value: '/' },
      { Type: 'PARAMETER_STORE', Name: 'DB_USER_EXAMPLE', Value: 'root' },
      { Type: 'PARAMETER_STORE', Name: 'DB_PASS_EXAMPLE', Value: '12345678900zxcvbnm' }
    ]
    expect(a).toEqual(e)
  })

  test('Mixed Mode Params', () => {
    const a = envVar({ someKey: 'someValue' })
      .concat(envVar({ paramStore: { someParam: 'someParamVal' } }))
      .concat(envVar())
    const e = [
      { Type: 'PLAINTEXT', Name: 'someKey', Value: 'someValue' },
      { Type: 'PARAMETER_STORE', Name: 'someParam', Value: 'someParamVal' }
    ]

    expect(a).toEqual(e)
  })
})
