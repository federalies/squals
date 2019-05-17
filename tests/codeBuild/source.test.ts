import {
  sourceConfig,
  sources,
  sourceItem,
  typeTransform,
  ICodeBuildSource
} from '../../src/components/codeBuild/source'
import { BuildSpec } from '../../src/components/codeBuild/buildspec'

test.todo('Sources should accept an array of input objects')

describe('CodeBuild::Source ', () => {
  test('default', () => {
    expect(sourceItem()).toEqual({ Type: 'NO_SOURCE' })
  })

  test('string input', () => {
    const a = sourceItem('https://github.com/federalies/squals')
    const e = {
      Type: 'GITHUB',
      Location: 'https://github.com/federalies/squals',
      BuildSpec: 'buildspec.yml'
    }
    expect(a).toEqual(e)
  })

  test('string input', () => {
    const a = sourceItem('https://git-codecommit.us-west-2.amazonaws.com/v1/repos/repo-name')
    const e: ICodeBuildSource = {
      Type: 'CODECOMMIT',
      Location: 'https://git-codecommit.us-west-2.amazonaws.com/v1/repos/repo-name',
      BuildSpec: 'buildspec.yml'
    }
    expect(a).toEqual(e)
  })

  test('string input', () => {
    const a = sourceItem('https://ericdmoore@bitbucket.org/ericdmoore/federalies/squals.git')
    const e: ICodeBuildSource = {
      Type: 'BITBUCKET',
      Location: 'https://ericdmoore@bitbucket.org/ericdmoore/federalies/squals.git',
      BuildSpec: 'buildspec.yml'
    }
    expect(a).toEqual(e)
  })

  test('Github Enterprise', () => {
    const a = sourceItem({
      'https://somedomain.com/federatedEnterprises/someProject.git': {
        allowInsureSsl: true
      }
    })
    const e: ICodeBuildSource = {
      Type: 'GITHUB_ENTERPRISE',
      Location: 'https://somedomain.com/federatedEnterprises/someProject.git',
      InsecureSsl: true
    }
    expect(a).toEqual(e)
  })

  test('Str Input to validated GITHUB_ENTERPRISE', () => {
    const a = sourceItem('https://somedomain.com/federatedEnterprises/someProject.git')
    const e: ICodeBuildSource = {
      Type: 'GITHUB_ENTERPRISE',
      Location: 'https://somedomain.com/federatedEnterprises/someProject.git',
      BuildSpec: 'buildspec.yml' // @todo @research inconsistent defaulting???
    }
    expect(a).toEqual(e)
  })

  test('s3 obj input', () => {
    const a = sourceItem({
      s3: {
        buildSpec: 'buildspec.yml',
        sourceId: 'sourceID',
        location: 'bucket/path/key.zip', // @research stmt hits line 54! why does it not show up correct on istanbul?
        reportBuild: true
        // gitCloneDepth: 1, // throw an error since not supported w/ s3
        // allowFetchGitSubModules: true, // ONLY GIT_ENABLED
        // allowInsureSsl: true, // only GITHUB_ENTERPRISE
      }
    })
    const e: ICodeBuildSource = {
      Type: 'S3',
      Location: 'bucket/path/key.zip',
      BuildSpec: 'buildspec.yml',
      ReportBuildStatus: true,
      SourceIdentifier: 'sourceID'
    }
    expect(a).toEqual(e)
  })

  test('codeCommit obj input', () => {
    const a1 = sourceItem({
      codeCommit: {
        buildSpec: 'buildspec.yml',
        sourceId: 'sourceID',
        location: 'https://git-codecommit.us-west-2.amazonaws.com/v1/repos/repo-name',
        reportBuild: true,
        allowFetchGitSubModules: true
      }
    })
    const a2 = sourceItem({
      'https://git-codecommit.us-west-2.amazonaws.com/v1/repos/repo-name': {
        buildSpec: 'buildspec.yml',
        sourceId: 'sourceID',
        reportBuild: true,
        allowFetchGitSubModules: true
      }
    })

    const e: ICodeBuildSource = {
      Type: 'CODECOMMIT',
      BuildSpec: 'buildspec.yml',
      SourceIdentifier: 'sourceID',
      Location: 'https://git-codecommit.us-west-2.amazonaws.com/v1/repos/repo-name',
      ReportBuildStatus: true,
      GitSubmodulesConfig: {
        FetchSubmodules: true
      }
    }
    expect(a1).toEqual(e)
    expect(a2).toEqual(e)
  })

  test('codeCommit obj input', () => {
    const a1 = sourceItem({
      bitbucket: {
        buildSpec: 'buildspec.yml',
        sourceId: 'sourceID',
        location: 'https://ericdmoore@bitbucket.org/ericdmoore/federalies/squals.git',
        reportBuild: true,
        allowFetchGitSubModules: false
      }
    })
    const a2 = sourceItem({
      'https://ericdmoore@bitbucket.org/ericdmoore/federalies/squals.git': {
        buildSpec: 'buildspec.yml',
        sourceId: 'sourceID',
        reportBuild: true,
        allowFetchGitSubModules: false
      }
    })

    const e: ICodeBuildSource = {
      Type: 'BITBUCKET',
      BuildSpec: 'buildspec.yml',
      SourceIdentifier: 'sourceID',
      Location: 'https://ericdmoore@bitbucket.org/ericdmoore/federalies/squals.git',
      ReportBuildStatus: true,
      GitSubmodulesConfig: {
        FetchSubmodules: false
      }
    }
    expect(a1).toEqual(e)
    expect(a2).toEqual(e)
  })

  test('Source with a BuildSpec', () => {
    const bs = new BuildSpec().Install('npm i').Build('tsc')
    const buildSpecStr: string = bs.toYAML()

    const a = sourceItem({
      'https://github.com/federalies/squals.git': {
        buildSpec: new BuildSpec().Install('npm i').Build('tsc'),
        gitCloneDepth: 1
      }
    })
    const e: ICodeBuildSource = {
      Type: 'GITHUB',
      Location: 'https://github.com/federalies/squals.git',
      BuildSpec: buildSpecStr,
      GitCloneDepth: 1
    }
    expect(a).toEqual(e)
  })

  test('TypeTransform Tests', () => {
    expect(typeTransform()).toEqual('NO_SOURCE')
    expect(typeTransform('')).toEqual('NO_SOURCE')
    expect(typeTransform('githubEnterprise')).toEqual('GITHUB_ENTERPRISE')
    expect(typeTransform('s3')).toEqual('S3')
    expect(typeTransform('codeCommit')).toEqual('CODECOMMIT')
    expect(typeTransform('bitbucket')).toEqual('BITBUCKET')
    expect(typeTransform('https://github.com/federalies/squals.git')).toEqual('GITHUB')
    expect(typeTransform('https://bitbucket.org/federalies/squals.git')).toEqual('BITBUCKET')
    expect(
      typeTransform('https://git-codecommit.us-west-2.amazonaws.com/v1/repos/repo-name')
    ).toEqual('CODECOMMIT')
    expect(typeTransform('https://somevaliddomain.com/withRepo/path')).toEqual('GITHUB_ENTERPRISE')
  })

  test('Pipeline example', () => {
    const a = sourceItem({ pipeline: { buildSpec: './buildUtills/buildspec.yml' } })
    const e: ICodeBuildSource = {
      Type: 'CODEPIPELINE',
      BuildSpec: './buildUtills/buildspec.yml'
    }
    expect(a).toEqual(e)
  })

  test('Throw Error with invalid URI', () => {
    const a = () => sourceItem('not a valid URI')
    expect(a).toThrow()
  })

  test('Throw Error with invalid URI', () => {
    const a = () =>
      sourceItem({
        'some bogus URI key': {
          buildSpec: '/buidl_utils/buildspec.yml'
        }
      })
    expect(a).toThrow()
  })

  test('Sources', () => {
    const a = sourceConfig()
    const e = { Source: { Type: 'NO_SOURCE' } }
    expect(a).toEqual(e)
  })
})
