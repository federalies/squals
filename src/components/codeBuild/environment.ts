import { IGetAtt } from '../Template/index'

export const envConfig = (input?: IcodeBuildEnv): { Environment: ICodeBuildEnvironmentData } => ({
  Environment: envItem(input)
})

/**
 * Configure the CodeBuild Computing Environment.
 *
 * @description handle the environment key of the codeBuild cloudformation data object
 * @param input -
 * @example
 * const a = envConfig({ 'small:linux': { image: 'someImage/@latest' } })
 */
export const envItem = (input?: IcodeBuildEnv): ICodeBuildEnvironmentData => {
  // set defaults in the codebuild calling function
  if (!input) {
    const ret: ICodeBuildEnvironmentData = {
      Type: 'LINUX_CONTAINER',
      Image: 'aws/codebuild/standard:2.0',
      ComputeType: 'BUILD_GENERAL1_SMALL'
    }
    return ret
  } else {
    // mode: pure obj
    if (Object.keys(input).length > 1) {
      const _input = input as IcodeBuildEnv_dataFull
      const ret: ICodeBuildEnvironmentData = {
        Type: `${_input.os.toUpperCase()}_CONTAINER` as 'LINUX_CONTAINER' | 'WINDOWS_CONTAINER',
        ComputeType: _size(_input.size),
        Image: _input.image
      }
      if (_input.cert) ret['Certificate'] = _input.cert
      if ('privleged' in _input) ret['PrivilegedMode'] = _input.privleged

      ret['EnvironmentVariables'] = envVar(_input.envVars).concat(
        envVar({ paramStore: { ..._input.paramStore } })
      )
      if (_input.registryCreds) {
        ret['RegistryCredential'] = {
          Credential: _input.registryCreds,
          CredentialProvider: 'SECRETS_MANAGER'
        }
      }
      ret['ImagePullCredentialsType'] = !('useServiceRole' in _input)
        ? 'SERVICE_ROLE'
        : _input.useServiceRole
          ? 'SERVICE_ROLE'
          : 'CODEBUILD'

      return ret
    } else {
      // mode: "string prefix: obj"
      const sizeAndOs: string = Object.keys(input)[0]
      const d: IcodeBuildEnv_data = Object.values(input)[0]

      let size: 'small' | 'medium' | 'large'
      let operatingSys: 'linux' | 'windows'

      switch (sizeAndOs) {
        case 'small:linux':
          size = 'small'
          operatingSys = 'linux'
          break
        case 'medium:linux':
          size = 'medium'
          operatingSys = 'linux'
          break
        case 'large:linux':
          size = 'large'
          operatingSys = 'linux'
          break
        case 'small:windows':
          size = 'small'
          operatingSys = 'windows'
          break
        case 'medium:windows':
          size = 'medium'
          operatingSys = 'windows'
          break
        case 'large:windows':
          size = 'large'
          operatingSys = 'windows'
          break
        default:
          if (d.size && d.os) {
            size = d.size
            operatingSys = d.os
          } else {
            throw new Error(
              'CodeBuild/environment :: id not get the correct object key for `size:os`:{}'
            )
          }
      }

      // required fields for initialization
      const ret: ICodeBuildEnvironmentData = {
        Type: operatingSys === 'linux' ? 'LINUX_CONTAINER' : 'WINDOWS_CONTAINER',
        ComputeType: _size(size) as ICodeBuildComputeSizes,
        Image: d.image,
        PrivilegedMode: !('privleged' in d) ? false : d.privleged,
        ImagePullCredentialsType: !('useServiceRole' in d)
          ? 'SERVICE_ROLE'
          : d.useServiceRole
            ? 'SERVICE_ROLE'
            : 'CODEBUILD'
      }

      if (d.cert) ret['Certificate'] = d.cert
      if ('privleged' in d) ret['PrivilegedMode'] = d.privleged
      if (d.envVars) {
        ret['EnvironmentVariables'] = envVar(d.envVars).concat(
          envVar({ paramStore: { ...d.paramStore } })
        )
      }
      if (d.registryCreds) {
        ret['RegistryCredential'] = {
          Credential: d.registryCreds,
          CredentialProvider: 'SECRETS_MANAGER'
        }
      }
      ret['ImagePullCredentialsType'] = !('useServiceRole' in d)
        ? 'SERVICE_ROLE'
        : d.useServiceRole
          ? 'SERVICE_ROLE'
          : 'CODEBUILD'

      return ret
    }
  }
}

export const _size = (input: 'small' | 'medium' | 'large'): ICodeBuildComputeSizes => {
  return `BUILD_GENERAL1_${input.toUpperCase()}` as ICodeBuildComputeSizes
}

export type ICodeBuildComputeSizes =
  | 'BUILD_GENERAL1_SMALL'
  | 'BUILD_GENERAL1_MEDIUM'
  | 'BUILD_GENERAL1_LARGE'

export interface IcodeBuildEnv_data {
  image: string
  useServiceRole?: boolean
  privleged?: boolean
  cert?: string
  paramStore?: IcodeBuildEnvVar_plain
  envVars?: IcodeBuildEnvVar_plain
  registryCreds?: string
  os?: 'linux' | 'windows'
  size?: 'small' | 'medium' | 'large'
}

export interface IcodeBuildEnv_dataFull {
  image: string
  os: 'linux' | 'windows'
  size: 'small' | 'medium' | 'large'
  useServiceRole?: boolean
  privleged?: boolean
  cert?: string
  paramStore?: IcodeBuildEnvVar_plain
  envVars?: IcodeBuildEnvVar_plain
  registryCreds?: string
}

export interface IcodeBuildEnv_smallLinux {
  'small:linux': IcodeBuildEnv_data
}
export interface IcodeBuildEnv_mediumLinux {
  'medium:linux': IcodeBuildEnv_data
}
export interface IcodeBuildEnv_largeLinux {
  'large:linux': IcodeBuildEnv_data
}
export interface IcodeBuildEnv_smallWindows {
  'small:windows': IcodeBuildEnv_data
}
export interface IcodeBuildEnv_mediumWindows {
  'medium:windows': IcodeBuildEnv_data
}
export interface IcodeBuildEnv_largeWindows {
  'large:windows': IcodeBuildEnv_data
}

export type IcodeBuildEnv =
  | IcodeBuildEnv_smallLinux
  | IcodeBuildEnv_mediumLinux
  | IcodeBuildEnv_largeLinux
  | IcodeBuildEnv_smallWindows
  | IcodeBuildEnv_mediumWindows
  | IcodeBuildEnv_largeWindows
  | IcodeBuildEnv_dataFull

export interface ICodeBuildEnvironmentData {
  Type: 'LINUX_CONTAINER' | 'WINDOWS_CONTAINER'
  ComputeType: 'BUILD_GENERAL1_SMALL' | 'BUILD_GENERAL1_MEDIUM' | 'BUILD_GENERAL1_LARGE'
  Image: string

  ImagePullCredentialsType?: 'CODEBUILD' | 'SERVICE_ROLE'
  // When you use a cross-account or private registry image, you must use SERVICE_ROLE credentials.
  // When you use an AWS CodeBuild curated image, you must use CODEBUILD credentials.

  PrivilegedMode?: boolean
  EnvironmentVariables?: ICodeBuildEnvironmentVariable[]
  Certificate?: string
  RegistryCredential?: {
    // only use with SERVICE_ROLE - then using private docker registry
    Credential: string | IGetAtt
    CredentialProvider: 'SECRETS_MANAGER'
  }
}

export const envVar = (input?: IcodeBuildEnvVar): ICodeBuildEnvironmentVariable[] => {
  if (!input) {
    return []
  } else {
    if ('paramStore' in input) {
      return Object.entries(input.paramStore).map(
        ([key, value]) =>
          ({
            Type: 'PARAMETER_STORE',
            Name: key,
            Value: value
          } as ICodeBuildEnvironmentVariable)
      )
    } else {
      return Object.entries(input).map(
        ([key, value]) =>
          ({
            Type: 'PLAINTEXT',
            Name: key,
            Value: value
          } as ICodeBuildEnvironmentVariable)
      )
    }
  }
}

export type IcodeBuildEnvVar = IcodeBuildEnvVar_plain | IcodeBuildEnvVar_ParamStore

/**
 * @example
 * {
 *  HOME:'/',
 *  DB_USER_EXAMPLE:  'root'
 *  DB_PASS_EXAMPLE: '12345678900zxcvbnm'
 * }
 */
export interface IcodeBuildEnvVar_plain {
  [name: string]: string
}

/**
 * @example
 * { paramStore:
 *  {
 *   HOME:'/',
 *   DB_USER_EXAMPLE:  'root'
 *   DB_PASS_EXAMPLE: '12345678900zxcvbnm'
 *  }
 * }
 */
export interface IcodeBuildEnvVar_ParamStore {
  paramStore: {
    [name: string]: string
  }
}

export interface ICodeBuildEnvironmentVariable {
  Name: string
  Value: string
  Type: 'PARAMETER_STORE' | 'PLAINTEXT'
}

export type imagePresets =
  | 'node'
  | 'node8'
  | 'node10'
  | 'ruby'
  | 'ruby1.9'
  | 'ruby2.0'
  | 'ruby2.1'
  | 'ruby2.2'
  | 'ruby2.3'
  | 'ruby2.5'
  | 'python'
  | 'python2.7'
  | 'python3.4'
  | 'python3.6'
  | 'python3.7'
  | 'php'
  | 'php7'
  | 'java'
  | 'java8'
  | 'java9'
  | 'java11'
  | 'go'
  | 'go1.10'
  | 'go1.11'
  | 'docker'
  | 'docker17'
  | 'docker18'
  | 'ubuntu'
  | 'ubuntu14'
  | 'android'
  | 'android8'
  | 'dotnet'
  | 'dotnet2.1'

export const envPresets = (
  preset: imagePresets,
  opts: {
  size?: 'small' | 'medium' | 'large'
  os?: 'linux' | 'windows'
  image?: string
  } = {
    size: 'small',
    os: 'linux'
  }
): { os: 'linux' | 'windows'; size: 'small' | 'medium' | 'large'; image: string } => {
  const table = {
    node: 'aws/codebuild/nodejs:10.14.1-1.7.0', // latest
    node8: 'aws/codebuild/nodejs:8.11.0-1.6.0',
    node10: 'aws/codebuild/nodejs:10.14.1-1.7.0',
    ruby: 'aws/codebuild/ruby:2.5.3-1.7.0', // latest
    'ruby1.9': 'aws/codebuild/eb-ruby-1.9-amazonlinux-64:2.3.2-1.0.0',
    'ruby2.0': 'aws/codebuild/eb-ruby-2.0-amazonlinux-64:2.3.2-1.0.0',
    'ruby2.1': 'aws/codebuild/eb-ruby-2.1-amazonlinux-64:2.3.2-1.0.0',
    'ruby2.2': 'aws/codebuild/eb-ruby-2.2-amazonlinux-64:2.3.2-1.0.0',
    'ruby2.3': 'aws/codebuild/eb-ruby-2.3-amazonlinux-64:2.3.2-1.0.0',
    'ruby2.5': 'aws/codebuild/ruby:2.5.3-1.7.0',
    python: 'aws/codebuild/python:3.7.1-1.7.0', // latest
    'python2.7': 'aws/codebuild/eb-python-2.7-amazonlinux-64:2.3.2-1.0.0',
    'python3.4': 'aws/codebuild/eb-python-3.4-amazonlinux-64:2.3.2-1.0.0',
    'python3.6': 'aws/codebuild/python:3.6.5-1.6.0',
    'python3.7': 'aws/codebuild/python:3.7.1-1.7.0',
    php: 'aws/codebuild/php:7.1', // latest
    php7: 'aws/codebuild/php:7.1',
    java: 'aws/codebuild/java:openjdk-11-1.7.0', // latest
    java8: 'aws/codebuild/java:openjdk-8-1.6.0',
    java9: 'aws/codebuild/java:openjdk-9-1.6.0',
    java11: 'aws/codebuild/java:openjdk-11-1.7.0',
    go: 'aws/codebuild/golang:1.11-1.7.0', // latest
    'go1.10': 'aws/codebuild/golang:1.10-1.7.0',
    'go1.11': 'aws/codebuild/golang:1.11-1.7.0',
    android: 'aws/codebuild/android-java-8:26.1.1-1.6.0', // latest
    android8: 'aws/codebuild/android-java-8:26.1.1-1.6.0',
    dotnet: 'aws/codebuild/dot-net:core-2.1-1.6.0', // latest
    'dotnet2.1': 'aws/codebuild/dot-net:core-2.1-1.6.0',
    docker: 'aws/codebuild/docker:18.09.0-1.7.0', // latest
    docker17: 'aws/codebuild/docker:17.09.0-1.6.0',
    docker18: 'aws/codebuild/docker:18.09.0-1.7.0',
    ubuntu: 'aws/codebuild/ubuntu-base:14.04-1.6.0', // latest
    ubuntu14: 'aws/codebuild/ubuntu-base:14.04-1.6.0',
    windows: 'aws/codebuild/windows-base:1.0-1.1.0', // latest
    windows2016: 'aws/codebuild/windows-base:1.0-1.1.0'
  }

  const os = opts.os || 'linux'
  const size = opts.size || 'small'
  const _image = opts.image || table[preset]

  return { os, size, image: _image }
}
