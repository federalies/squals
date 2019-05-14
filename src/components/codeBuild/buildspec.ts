import * as yaml from 'js-yaml'

export type stringish = string | string[]

export class BuildSpec {
  version = 0.2
  phases?: IbuildSpecPhases
  cache?: {
    paths: string[]
  }
  env?: {
    variables: { [prefix: string]: string }
    'parameter-store': { [prefix: string]: string }
  }
  artifacts?: {
    files: string[] // glob pattern
    name?: string
    'discard-paths'?: boolean
    'base-directory'?: string

    'secondary-artifacts'?: IbuildSpecArtifactSecondaryMap
  }

  constructor () {}

  /**
   *
   * @description Setup the Install Phase of the Build Spec
   * @param commands - Installation commands : string or string[].
   * @param opts - Optional params: andfinally | runAs | runTimes | clearState.
   * @example
   * const bspec = new BuildSpec().Install('npm i')
   */
  Install (
    commands: stringish,
    opts: {
    andfinally?: stringish
    runAs?: string
    runTimes?: { [lang: string]: number }
    clearState?: boolean
    } = {
      clearState: false
    }
  ): BuildSpec {
    const inputPhase: IbuildSpecPhases_Step_Install = {
      install: {
        commands: Array.isArray(commands) ? commands : new Array(commands)
      }
    }
    if (opts.andfinally) {
      inputPhase.install.finally = Array.isArray(opts.andfinally)
        ? opts.andfinally
        : new Array(opts.andfinally)
    }

    if (opts.runTimes) {
      if (
        Object.keys(opts.runTimes).every(v => {
          // for list @see https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref-example f
          return [
            'android',
            'docker',
            'dotnet',
            'golang',
            'nodejs',
            'java',
            'php',
            'python',
            'ruby'
          ].includes(v)
        })
      ) {
        inputPhase.install['runtime-versions'] = opts.runTimes
      }
    }

    if (opts.runAs) inputPhase.install['run-as'] = opts.runAs

    // keeping state - AND there is some state to keep AND there is the right state to keep
    if (!opts.clearState && this.phases && 'install' in this.phases) {
      this.phases.install = {
        commands: [...this.phases.install.commands, ...inputPhase.install.commands],
        ...makeOptKey('finally', stringishMerge(this.phases.install.finally, opts.andfinally))
      }
    } else {
      this.phases = { ...this.phases, ...inputPhase }
    }

    return this
  }
  /**
   * @description Setup the PreBuild Phase of the BuildSpec
   * @param commands - Add the PreBuild commands : string or string[].
   * @param opts - Optional params: andfinally | runAs  | clearState=false.
   * @example
   * const bspec = new BuildSpec().PreBuild('npm test')
   */
  PreBuild (
    commands: stringish,
    opts: {
    andfinally?: stringish
    runAs?: string
    clearState?: boolean
    } = {
      clearState: false
    }
  ): BuildSpec {
    const inputPhase: IbuildSpecPhases_Step_PreBuild = {
      pre_build: {
        commands: Array.isArray(commands) ? commands : new Array(commands)
      }
    }
    if (opts.andfinally) {
      inputPhase.pre_build.finally = Array.isArray(opts.andfinally)
        ? opts.andfinally
        : new Array(opts.andfinally)
    }
    if (opts.runAs) inputPhase.pre_build['run-as'] = opts.runAs

    if (!opts.clearState && this.phases && 'pre_build' in this.phases) {
      this.phases.pre_build = {
        commands: [...this.phases.pre_build.commands, ...inputPhase.pre_build.commands],
        ...makeOptKey('finally', stringishMerge(this.phases.pre_build.finally, opts.andfinally))
      }
    } else {
      this.phases = { ...this.phases, ...inputPhase }
    }

    return this
  }
  /**
   * @description Setup the Build Phase of the BuildSpec
   * @param commands - Add the Build commands : string or string[].
   * @param opts - Optional params: andfinally | runAs  | clearState=false.
   * @example
   * const bspec = new BuildSpec().Build('npm test')
   */
  Build (
    commands: stringish,
    opts: {
    andfinally?: stringish
    runAs?: string
    clearState?: boolean
    } = {
      clearState: false
    }
  ): BuildSpec {
    const inputPhase: IbuildSpecPhases_Step_Build = {
      build: {
        commands: Array.isArray(commands) ? commands : new Array(commands)
      }
    }
    if (opts.andfinally) {
      inputPhase.build.finally = Array.isArray(opts.andfinally)
        ? opts.andfinally
        : new Array(opts.andfinally)
    }
    if (opts.runAs) inputPhase.build['run-as'] = opts.runAs

    // keeping state - AND there is some state to keep AND there is the right state to keep
    if (!opts.clearState && this.phases && 'build' in this.phases) {
      this.phases.build = {
        commands: [...this.phases.build.commands, ...inputPhase.build.commands],
        ...makeOptKey('finally', stringishMerge(this.phases.build.finally, opts.andfinally))
      }
    } else {
      this.phases = { ...this.phases, ...inputPhase }
    }

    return this
  }
  /**
   * @description Setup the PostBuild Phase of the BuildSpec
   * @param commands - Add the PostBuild commands : string or string[].
   * @param opts - Optional params: andfinally | runAs | clearState=false.
   * @example
   * const bspec = new BuildSpec().PostBuild('npm test')
   */
  PostBuild (
    commands: stringish,
    opts: {
    andfinally?: stringish
    runAs?: string
    clearState?: boolean
    } = {
      clearState: false
    }
  ): BuildSpec {
    const inputPhase: IbuildSpecPhases_Step_PostBuild = {
      post_build: {
        commands: Array.isArray(commands) ? commands : new Array(commands)
      }
    }
    if (opts.andfinally) {
      inputPhase.post_build.finally = Array.isArray(opts.andfinally)
        ? opts.andfinally
        : new Array(opts.andfinally)
    }
    if (opts.runAs) inputPhase.post_build['run-as'] = opts.runAs

    // keeping state - AND there is some state to keep AND there is the right state to keep
    if (!opts.clearState && this.phases && 'post_build' in this.phases) {
      this.phases.post_build = {
        commands: [...this.phases.post_build.commands, ...inputPhase.post_build.commands],
        ...makeOptKey('finally', stringishMerge(this.phases.post_build.finally, opts.andfinally))
      }
    } else {
      this.phases = { ...this.phases, ...inputPhase }
    }

    return this
  }
  /**
   * @description Add Artifacts
   * @param input - Accepts a string file set of or annoted object included files.
   */
  Artifacts (
    input: string | IbuildSpecArtifactDatastringish | IbuildSpecArtifactDatastringish[]
  ): BuildSpec {
    //
    // @todo what do about state retention, seems like if we call Artifacts repeatedly
    // the latest should be in the artifact slot and everything else should be demoted down to secondary--artifacts
    //

    if (typeof input === 'string') {
      // ''
      this.artifacts = { files: [input] }
    } else if (Array.isArray(input)) {
      // [{}, {}]
      if (input.length > 1) {
        // [{}, {}]
        // deal with [0]
        this.artifacts = stringish2Arr(input[0]) as IbuildSpecArtifactData
        this.artifacts['secondary-artifacts'] = secondaryArtifacts(input.slice(1))
      } else {
        this.artifacts = stringish2Arr(input[0]) as IbuildSpecArtifactData
      }
    } else if (Array.isArray(input.files)) {
      // {'':[]}
      this.artifacts = input as IbuildSpecArtifactData
    } else {
      // {'':''}
      this.artifacts = { ...input, files: [input.files] }
    }
    return this
  }
  Env (_env?: {
  variables?: { [prefix: string]: string }
  parameterStore?: { [prefix: string]: string }
  }): BuildSpec {
    if (
      // if we have state AND you pass in state - then lets fold it in. else reseth the internet state
      this.env &&
      _env &&
      (_env.variables || _env.parameterStore) &&
      !(
        Object.keys(_env.variables || {}).length === 0 &&
        Object.keys(_env.parameterStore || {}).length === 0
      )
    ) {
      this.env = {
        variables: { ...this.env.variables, ..._env.variables },
        'parameter-store': { ...this.env['parameter-store'], ..._env.parameterStore }
      }
    } else {
      if (_env) {
        // can this happen?
        this.env = {
          variables: { ..._env.variables },
          'parameter-store': { ..._env.parameterStore }
        }
      } else {
        // empty input var
        delete this.env
      }
    }

    return this
  }
  Cache (input: string | string[]): BuildSpec {
    if (this.cache && this.cache.paths) {
      this.cache = {
        paths: Array.isArray(input)
          ? this.cache.paths.concat(input)
          : this.cache.paths.concat([input])
      }
    } else {
      this.cache = { paths: Array.isArray(input) ? input : new Array(input) }
    }
    return this
  }
  toJSON (): object {
    return { ...this }
  }
  toYAML (): string {
    return yaml.dump(this.toJSON())
  }
  fromYAML (input: string): BuildSpec {
    const _buildspec = yaml.safeLoad(input)
    if (!('version' in _buildspec) || !('phases' in _buildspec)) {
      throw new Error(
        `'version' + 'phases' are required in the yaml input @see : <https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref-example>`
      )
    } else {
      const ret = new BuildSpec()
      const _ph = _buildspec.phases
      if ('install' in _ph) {
        ret.Install(_ph.install.commands, {
          andfinally: _ph.install.finally,
          runTimes: _ph.install['runtime-versions'],
          runAs: _ph.install['run-as']
        })
      }
      if ('pre_build' in _ph) {
        ret.PreBuild(_ph.pre_build.commands, {
          andfinally: _ph.pre_build.finally,
          runAs: _ph.pre_build['run-as']
        })
      }
      if ('build' in _ph) {
        ret.Build(_ph.build.commands, {
          andfinally: _ph.build.finally,
          runAs: _ph.build['run-as']
        })
      }
      if ('post_build' in _ph) {
        ret.PostBuild(_ph.post_build.commands, {
          andfinally: _ph.post_build.finally,
          runAs: _ph.post_build['run-as']
        })
      }
      if ('artifacts' in _buildspec) {
        let acc: IbuildSpecArtifactDatastringish[] = []
        const { artifacts } = _buildspec

        if ('secondary-artifacts' in _buildspec.artifacts) {
          acc = acc.concat(Object.values(artifacts['secondary-artifacts']))
        }
        delete artifacts['secondary-artifacts']
        const b = acc.concat([{ ...artifacts }])

        ret.Artifacts(b.reverse())
      }
      if ('env' in _buildspec) {
        if ('variables' in _buildspec.env) {
          ret.Env({ variables: { ..._buildspec.env.variables } })
        }
        if ('parameter-store' in _buildspec.env) {
          ret.Env({ parameterStore: { ..._buildspec.env['parameter-store'] } })
        }
        if (
          !Object.keys(_buildspec.env).every(v => {
            return ['paremeter-store', 'variables'].includes(v)
          })
        ) {
          console.warn(
            `the yaml contents used to configure the BuildSpec does not include env.variables && env.parameter-store which are required to both be avilable`
          )
        }
      }

      if ('cache' in _buildspec && 'paths' in _buildspec.cache) {
        ret.Cache(_buildspec.cache.paths)
      }

      return ret
    }
  }
}

type verboseOptions =
  | object
  | number
  | string
  | boolean
  | object[]
  | number[]
  | string[]
  | boolean[]

export const stringish2Arr = (input: IbuildSpecArtifactDatastringish): IbuildSpecArtifactData => {
  if (Array.isArray(input.files)) {
    return input as IbuildSpecArtifactData
  } else {
    return { ...input, files: [input.files] }
  }
}

export const secondaryArtifacts = (
  _in: IbuildSpecArtifactDatastringish[]
): IbuildSpecArtifactSecondaryMap_IdxStr => {
  return _in.reduce((p, c, i) => {
    return { ...p, [i.toString()]: stringish2Arr(c as IbuildSpecArtifactDatastringish) }
  }, {})
}

export const makeOptKey = (optKey: string, data?: verboseOptions) => {
  if (!data) {
    return {}
  } else {
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return {}
      } else {
        return { [optKey]: data }
      }
    } else if (
      data instanceof String ||
      data instanceof Number ||
      ['number', 'string', 'boolean'].includes(typeof data)
    ) {
      return { [optKey]: data }
    } else {
      return { [optKey]: { ...(data as object) } }
    }
  }
}

export const stringishMerge = (in1?: stringish, in2?: stringish): string[] => {
  let in1A: string[]
  let in2A: string[]

  if (in1 && in2) {
    in1A = Array.isArray(in1) ? in1 : [in1]
    in2A = Array.isArray(in2) ? in2 : [in2]
    // both present
    return in1A.concat(in2A)
  } else if (!in1 && !in2) {
    // both absent
    return []
  } else {
    // xor combo
    let ret: string[] = []
    if (in1) {
      in1A = Array.isArray(in1) ? in1 : [in1]
      ret = ret.concat(in1A)
    }
    if (in2) {
      in2A = Array.isArray(in2) ? in2 : [in2]
      ret = ret.concat(in2A)
    }
    return ret
  }
}

export interface IbuildSpecPhases_Step_InstallOnly {
  commands: string[]
  finally?: string[]
  'run-as'?: string
  'runtime-versions'?: { [lang: string]: number }
}

export interface IbuildSpecPhases_Step {
  'run-as'?: string
  commands: string[]
  finally?: string[]
}

export type IbuildSpecPhases =
  | IbuildSpecPhases_Step_Install
  | IbuildSpecPhases_Step_PreBuild
  | IbuildSpecPhases_Step_Build
  | IbuildSpecPhases_Step_PostBuild

export interface IbuildSpecPhases_Step_Install {
  install: IbuildSpecPhases_Step_InstallOnly
}

export interface IbuildSpecPhases_Step_PreBuild {
  pre_build: IbuildSpecPhases_Step
}

export interface IbuildSpecPhases_Step_Build {
  build: IbuildSpecPhases_Step
}

export interface IbuildSpecPhases_Step_PostBuild {
  post_build: IbuildSpecPhases_Step
}

export interface IbuildSpecArtifactData {
  files: string[]
  name?: string
  'discard-paths'?: boolean
  'base-directory'?: string
}

export interface IbuildSpecArtifactDatastringish {
  files: stringish // glob pattern
  name?: string
  'discard-paths'?: boolean
  'base-directory'?: string
}

type IbuildSpecArtifactSecondaryMap =
  | IbuildSpecArtifactSecondaryMap_IdxStr
  | IbuildSpecArtifactSecondaryMap_IdxInt

export interface IbuildSpecArtifactSecondaryMap_IdxStr {
  [artifactId: string]: IbuildSpecArtifactData
}

export interface IbuildSpecArtifactSecondaryMap_IdxInt {
  [artifactId: number]: IbuildSpecArtifactData
}
