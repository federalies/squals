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
    const e = {
      version: 0.2,
      phases: {
        install: { commands: ['npm i'] },
        pre_build: { commands: ['npm test'] },
        build: { commands: ['tsc'] },
        post_build: { commands: ['npm run cleanUp'] }
      }
    }

    console.log(JSON.stringify(a, null, 2))

    expect(a.toJSON()).toEqual(e)
  })
})
