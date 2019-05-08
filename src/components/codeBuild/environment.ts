import { IGetAtt } from '../Template/index'

export const envConfig = (input: IcodeBuildEnv): ICodeBuildEnvironmentData => {
  const sizeNOs: string = Object.keys(input)[0]
  const d: IcodeBuildEnv_data = Object.values(input)[0]

  let size: 'small' | 'medium' | 'large'
  let operatingSys: 'linux' | 'windows'

  switch (sizeNOs) {
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
      throw new Error('CodeBuild/environment :: id not get the correct object key for `size:os`:{}')
  }

  // required fields for initialization
  const ret: ICodeBuildEnvironmentData = {
    Type: operatingSys === 'linux' ? 'LINUX_CONTAINER' : 'WINDOWS_CONTAINER',
    ComputeType: _size(size) as ICodeBuildComputeSizes,
    Image: d.image
  }

  // layer in optional fields
  const vars: ICodeBuildEnvironmentVariable[] = []

  if (d.cert) ret['Certificate'] = d.cert
  if (d.privleged) ret['PrivilegedMode'] = d.privleged
  if (d.envVars) vars.concat(envVar(d.envVars))
  if (d.paramstore) vars.concat(envVar({ paramStore: { ...d.paramstore } }))
  if (d.registryCreds) {
    ret['RegistryCredential'] = {
      Credential: d.registryCreds,
      CredentialProvider: 'SECRETS_MANAGER'
    }
  }
  if ('useServiceRole' in d) {
    ret['ImagePullCredentialsType'] = d.useServiceRole ? 'SERVICE_ROLE' : 'CODEBUILD'
  }
  if (vars.length > 0) ret['EnvironmentVariables'] = vars

  return ret
}

export const _size = (input: 'small' | 'medium' | 'large'): string => {
  return `BUILD_GENERAL1_${input.toUpperCase()}`
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
  paramstore?: IcodeBuildEnvVar_plain
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
  'small:windows': IcodeBuildEnv_data
}
export interface IcodeBuildEnv_largeWindows {
  'small:windows': IcodeBuildEnv_data
}

export type IcodeBuildEnv =
  | IcodeBuildEnv_smallLinux
  | IcodeBuildEnv_mediumLinux
  | IcodeBuildEnv_largeLinux
  | IcodeBuildEnv_smallWindows
  | IcodeBuildEnv_mediumWindows
  | IcodeBuildEnv_largeWindows

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

export const envVar = (input: IcodeBuildEnvVar): ICodeBuildEnvironmentVariable[] => {
  if ('paramStore' in input) {
    return Object.entries(input.paramStore).map(([key, value]) => ({
      Type: 'PARAMETER_STORE',
      Name: key,
      Value: value
    }))
  } else {
    return Object.entries(input).map(([key, value]) => ({
      Type: 'PLAINTEXT',
      Name: key,
      Value: value
    }))
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
  paramStore: never
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
  Type?: 'PARAMETER_STORE' | 'PLAINTEXT'
}
