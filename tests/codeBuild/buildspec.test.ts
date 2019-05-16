import {
  BuildSpec,
  stringishMerge,
  makeOptKey,
  stringish2Arr,
  secondaryArtifacts
} from '../../src/components/codeBuild/buildspec'

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

  test('Clear Out Application Phases', () => {
    const a = new BuildSpec()
      .Install(['cd installer', 'make', 'configure', 'make install'])
      .PreBuild(['which tsc', 'npm test'])
      .Build('tsc')
      .PostBuild(['npm run cleanUp', 'rm -rf ./docs', 'aws s3 cp src/ bucketName/prefix'])
      .Artifacts({ files: '**/*', name: 'artifactSet' })
      .Env({ variables: { key1: 'variable1' } })
      .Env({ parameterStore: { key2: 'variable2' } })
      .Env()
      .Install('npm i', { clearState: true })
      .PreBuild('npm test', { clearState: true })
      .Build('tsc -m umd', { clearState: true })
      .PostBuild('cd ..', { clearState: true })
      .Cache('some/glob/path/**/*')
      .Cache('some/other/path/**/*')
    const e = {
      version: 0.2,
      phases: {
        install: { commands: ['npm i'] },
        pre_build: { commands: ['npm test'] },
        build: { commands: ['tsc -m umd'] },
        post_build: { commands: ['cd ..'] }
      },
      artifacts: {
        name: 'artifactSet',
        files: ['**/*']
      },
      cache: { paths: ['some/glob/path/**/*', 'some/other/path/**/*'] }
    }
    expect(a).toEqual(e)
  })

  test('Stringish Tests', () => {
    let a = stringishMerge('one', ['two'])
    let e = ['one', 'two']
    expect(a).toEqual(e)

    a = stringishMerge(undefined, ['two'])
    e = ['two']
    expect(a).toEqual(e)

    a = stringishMerge(undefined, 'two')
    e = ['two']
    expect(a).toEqual(e)

    a = stringishMerge(['one'], undefined)
    e = ['one']
    expect(a).toEqual(e)

    a = stringishMerge('one', undefined)
    e = ['one']
    expect(a).toEqual(e)

    let a2 = stringish2Arr({ files: 'string1' })
    let e2 = { files: ['string1'] }
    expect(a2).toEqual(e2)

    a2 = stringish2Arr({ files: ['string1', 'string2'] })
    e2 = { files: ['string1', 'string2'] }
    expect(a2).toEqual(e2)
  })

  test.skip('Secondary Artifacts ', () => {
    const a = ''
    const e = ''
    expect(a).toEqual(e)
  })

  test('ClearState Calls', () => {
    const a = new BuildSpec()
      .Install('npm rb')
      .Install('npm install')
      .Install('npm i', { clearState: true, runTimes: { nodejs: 10 }, andfinally: ['cd ..'] })
      .PreBuild('npm rb')
      .PreBuild('npm install')
      .PreBuild('npm i', { clearState: true, andfinally: ['cd ..'] })
      .Build('npm rb')
      .Build('npm install')
      .Build('npm i', { clearState: true, andfinally: ['cd ..'] })
      .PostBuild('npm rb')
      .PostBuild('npm install')
      .PostBuild('npm i', { clearState: true, andfinally: ['cd ..'] })
      .Artifacts([{ files: ['main_bundle.js'] }])
      .Artifacts({ files: 'main_bundle.js' })
      .Artifacts('main_bundle.js') // @todo fix this test so that its not an instanbul hack

    const e = {
      version: 0.2,
      phases: {
        install: {
          commands: ['npm i'],
          finally: ['cd ..'],
          'runtime-versions': {
            nodejs: 10
          }
        },
        pre_build: {
          commands: ['npm i'],
          finally: ['cd ..']
        },
        build: {
          commands: ['npm i'],
          finally: ['cd ..']
        },
        post_build: {
          commands: ['npm i'],
          finally: ['cd ..']
        }
      },
      artifacts: {
        files: ['main_bundle.js']
      }
    }
    expect(a.toJSON()).toEqual(e)
  })
  test('import from YAML', () => {
    const a = new BuildSpec().fromYAML(`
    version: 0.2
    phases:
      install:
        commands:
          - npm i
      pre_build:
        commands:
          - npm test
      build:
        commands:
          - tsc
      post_build:
        commands:
          - cd ..
    env:
      variables:
        SOMEVAR: otherValue
      parameter-store:
        OTHERVAR: additionalValue
    cache:
      paths:
        - some/path/**/*`)
    const e = {
      version: 0.2,
      phases: {
        install: {
          commands: ['npm i']
        },
        pre_build: {
          commands: ['npm test']
        },
        build: {
          commands: ['tsc']
        },
        post_build: {
          commands: ['cd ..']
        }
      },
      env: {
        variables: { SOMEVAR: 'otherValue' },
        'parameter-store': { OTHERVAR: 'additionalValue' }
      },
      cache: {
        paths: ['some/path/**/*']
      }
    }
    expect(a.toJSON()).toEqual(e)
  })

  test('In and Out of YAML', () => {
    const finish = new BuildSpec().fromYAML(
      new BuildSpec()
        .Install('npm i')
        .PreBuild('npm run setup')
        .Build('npm run build')
        .Artifacts([
          { files: ['firstSet/**/*.js'] },
          { files: ['secondSet/**/*.js', 'thirdSet/**/*.js'] }
        ])
        .toYAML()
    )
    const e = {
      version: 0.2,
      phases: {
        install: { commands: ['npm i'] },
        pre_build: { commands: ['npm run setup'] },
        build: { commands: ['npm run build'] }
      },
      artifacts: {
        files: ['firstSet/**/*.js'],
        'secondary-artifacts': {
          '0': {
            files: ['secondSet/**/*.js', 'thirdSet/**/*.js']
          }
        }
      }
    }

    // console.log(finish)
    // console.log(JSON.stringify(e, null, 2))

    expect(finish.toJSON()).toEqual(e)
  })

  test('Secondary Artifacts ƒ.Helper ', () => {
    const a = secondaryArtifacts([
      { files: './main_bundle.js' },
      { files: ['./otherPart.js', './additionalPart.js'] },
      { files: ['./**/*.js'] }
    ])
    const e = {
      '0': { files: ['./main_bundle.js'] },
      '1': { files: ['./otherPart.js', './additionalPart.js'] },
      '2': { files: ['./**/*.js'] }
    }
    expect(a).toEqual(e)
  })

  test('Secondary Artifacts ', () => {
    const a = new BuildSpec().Artifacts([
      { files: 'firstSet/**/*.js' },
      { files: ['secondSet/**/*.js', 'thirdSet/**/*.js'] },
      { files: ['fourthSet/**/*.js'] }
    ])
    const e = {
      version: 0.2,
      artifacts: {
        files: ['firstSet/**/*.js'],
        'secondary-artifacts': {
          '0': {
            files: ['secondSet/**/*.js', 'thirdSet/**/*.js']
          },
          '1': {
            files: ['fourthSet/**/*.js']
          }
        }
      }
    }
    expect(a.toJSON()).toEqual(e)
  })

  test('Invalid YAML', () => {
    const a1 = () =>
      new BuildSpec().fromYAML(`version: 0.2\nartifacts:\n  files:\n    - somefile.js`)
    const a2 = () =>
      new BuildSpec().fromYAML(
        `phases:\n  install:\n    commands:\n      files:       - somefile.js`
      )
    const a3 = () => new BuildSpec().fromYAML(`this:\n  isValid:true\n  butNotBasedOnTheSpec:true`)
    expect(a1).toThrow()
    expect(a2).toThrow()
    expect(a3).toThrow()
  })

  test('Make Optional Helper', () => {
    let a = makeOptKey('finally', stringishMerge(undefined, undefined))
    let e = {}
    expect(a).toEqual(e)

    a = makeOptKey('finally', stringishMerge('concat', ['these', 'and', 'flatten']))
    e = { finally: ['concat', 'these', 'and', 'flatten'] }
    expect(a).toEqual(e)

    a = makeOptKey('finally', 'ima string')
    e = { finally: 'ima string' }
    expect(a).toEqual(e)

    a = makeOptKey('finally', { universaleMeaning: 42 })
    e = { finally: { universaleMeaning: 42 } }
    expect(a).toEqual(e)

    a = makeOptKey('finally', undefined)
    e = {}
    expect(a).toEqual(e)
  })
})
