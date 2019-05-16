import { CodeBuildProject, IcodeBuild } from '../../src/components/codeBuild/index'

describe('CodeBuild::BuildSpec', () => {
  test('defaults', () => {
    const a = new CodeBuildProject('serviceRoleARNstring')
    const e = {
      ServiceRole: 'serviceRoleARNstring',
      Source: {
        Type: 'NO_SOURCE'
      },
      Artifacts: {
        Type: 'NO_ARTIFACTS'
      },
      Environment: {
        ComputeType: 'BUILD_GENERAL1_SMALL',
        Image: 'aws/codebuild/standard:2.0',
        Type: 'LINUX_CONTAINER'
      }
    }
    expect(a.name).toBeDefined()
    expect(a.Type).toEqual('AWS::CodeBuild::Project')
    expect(a.Properties).toEqual(e)
    expect((a.toJSON() as any)[a.name]).toEqual({
      Type: 'AWS::CodeBuild::Project',
      Properties: e
    })
  })

  test('Use a GetAtt to make a CodeBuild Proj', () => {
    const a = new CodeBuildProject({ 'Fn::GetAtt': ['someNameOfAnotherThing', 'Arn'] })
    const e = {
      ServiceRole: { 'Fn::GetAtt': ['someNameOfAnotherThing', 'Arn'] },
      Source: {
        Type: 'NO_SOURCE'
      },
      Artifacts: {
        Type: 'NO_ARTIFACTS'
      },
      Environment: {
        ComputeType: 'BUILD_GENERAL1_SMALL',
        Image: 'aws/codebuild/standard:2.0',
        Type: 'LINUX_CONTAINER'
      }
    }
    expect(a.name).toBeDefined()
    expect(a.Type).toEqual('AWS::CodeBuild::Project')
    expect(a.Properties).toEqual(e)
    expect((a.toJSON() as any)[a.name]).toEqual({
      Type: 'AWS::CodeBuild::Project',
      Properties: e
    })
  })

  test('Use a Ref to make a CodeBuild Proj', () => {
    const a = new CodeBuildProject({ Ref: 'someNameOfAnotherRole' })
    const e = {
      ServiceRole: { Ref: 'someNameOfAnotherRole' },
      Source: {
        Type: 'NO_SOURCE'
      },
      Artifacts: {
        Type: 'NO_ARTIFACTS'
      },
      Environment: {
        ComputeType: 'BUILD_GENERAL1_SMALL',
        Image: 'aws/codebuild/standard:2.0',
        Type: 'LINUX_CONTAINER'
      }
    }
    expect(a.name).toBeDefined()
    expect(a.Type).toEqual('AWS::CodeBuild::Project')
    expect(a.Properties).toEqual(e)
    expect((a.toJSON() as any)[a.name]).toEqual({
      Type: 'AWS::CodeBuild::Project',
      Properties: e
    })
  })

  test('Use a concrete input param make a CodeBuild Proj', () => {
    const input: IcodeBuild = { serviceRoleArn: 'mySvcRoleArnString' }
    const a = new CodeBuildProject(input)
    const e = {
      ServiceRole: 'mySvcRoleArnString',
      Source: {
        Type: 'NO_SOURCE'
      },
      Artifacts: {
        Type: 'NO_ARTIFACTS'
      },
      Environment: {
        ComputeType: 'BUILD_GENERAL1_SMALL',
        Image: 'aws/codebuild/standard:2.0',
        Type: 'LINUX_CONTAINER'
      }
    }
    expect(a.name).toBeDefined()
    expect(a.Type).toEqual('AWS::CodeBuild::Project')
    expect(a.Properties).toEqual(e)
    expect((a.toJSON() as any)[a.name]).toEqual({
      Type: 'AWS::CodeBuild::Project',
      Properties: e
    })
    expect(a).toEqual(e)
  })

  test('Verbose option', () => {
    const input = {}
    const a = {}
    const e = {}
    expect(a).toEqual(e)
  })
})
