import { BuildSpec } from '../../src/components/codeBuild/buildspec'

describe('CodeBuild::BuildSpec', () => {
  test('Starts Mostly Empty', () => {
    const a = new BuildSpec()
    const e = { version: 0.2 }
    expect(a).toEqual(e)
  })

  test('Setup an Install Step in the BuildSpec', () => {
    const a = new BuildSpec()
    expect(a).toEqual({ version: 0.2 })
    a.Install('npm i')
    expect(a.toJSON()).toEqual({ version: 0.2, phases: { install: { commands: ['npm i'] } } })
  })

  test('Setup Addon to an Install Step', () => {
    const a = new BuildSpec().Install('npm i')
    expect(a.toJSON()).toEqual({ version: 0.2, phases: { install: { commands: ['npm i'] } } })

    a.Install(['cd imageMagick', 'make', 'configure', 'make install'])
    expect(a.toJSON()).toEqual({
      version: 0.2,
      phases: {
        install: { commands: ['npm i', 'cd imageMagick', 'make', 'configure', 'make install'] }
      }
    })
  })

  test('Setup a BuildSpec', () => {
    const a = new BuildSpec()
      .Install('npm i')
      .PreBuild('npm test')
      .Build('tsc')
      .PostBuild('npm run cleanUp')
      .Artifacts({ name: 'artifactSet', files: '**/*' })
      .Env({ variables: { key1: 'variable1' } })
      .Env({ parameterStore: { key2: 'variable2' } })
    const e = {
      version: 0.2,
      phases: {
        install: { commands: ['npm i'] },
        pre_build: { commands: ['npm test'] },
        build: { commands: ['tsc'] },
        post_build: { commands: ['npm run cleanUp'] }
      },
      artifacts: {
        name: 'artifactSet',
        files: ['**/*']
      },
      env: {
        variables: {
          key1: 'variable1'
        },
        'parameter-store': {
          key2: 'variable2'
        }
      }
    }
    // console.log(JSON.stringify(a, null, 2))
    expect(a.toJSON()).toEqual(e)
  })

  test('Setup Full BuildSpec', () => {
    const a = new BuildSpec()
      .Install('npm i')
      .PreBuild('npm test')
      .Build('tsc')
      .PostBuild('npm run cleanUp')
      .Artifacts({ files: '**/*', name: 'artifactSet' })
      .Env({ variables: { key1: 'variable1' } })
      .Env({ parameterStore: { key2: 'variable2' } })
      .Cache('some/glob/path/**/*')
    const e = {
      version: 0.2,
      phases: {
        install: { commands: ['npm i'] },
        pre_build: { commands: ['npm test'] },
        build: { commands: ['tsc'] },
        post_build: { commands: ['npm run cleanUp'] }
      },
      artifacts: {
        name: 'artifactSet',
        files: ['**/*']
      },
      env: {
        variables: {
          key1: 'variable1'
        },
        'parameter-store': {
          key2: 'variable2'
        }
      },
      cache: { paths: ['some/glob/path/**/*'] }
    }
    expect(a.toJSON()).toEqual(e)
  })

  test('BuildSpec lotta Lists', () => {
    const a = new BuildSpec()
      .Install(['cd installer', 'make', 'configure', 'make install'])
      .PreBuild(['which tsc', 'npm test'])
      .Build('tsc')
      .PostBuild(['npm run cleanUp', 'rm -rf ./docs', 'aws s3 cp src/ bucketName/prefix'])
      .Artifacts({ files: '**/*', name: 'artifactSet' })
      .Env({ variables: { key1: 'variable1' } })
      .Env({ parameterStore: { key2: 'variable2' } })
      .Cache('some/glob/path/**/*')
    const e = {
      version: 0.2,
      phases: {
        install: { commands: ['cd installer', 'make', 'configure', 'make install'] },
        pre_build: { commands: ['which tsc', 'npm test'] },
        build: { commands: ['tsc'] },
        post_build: {
          commands: ['npm run cleanUp', 'rm -rf ./docs', 'aws s3 cp src/ bucketName/prefix']
        }
      },
      artifacts: {
        name: 'artifactSet',
        files: ['**/*']
      },
      env: {
        variables: {
          key1: 'variable1'
        },
        'parameter-store': {
          key2: 'variable2'
        }
      },
      cache: { paths: ['some/glob/path/**/*'] }
    }
    expect(a.toJSON()).toEqual(e)
  })
})
