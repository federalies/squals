import { CodeBuildProject, IcodeBuild } from '../../src/components/codeBuild/index'
import { IGetAtt } from '../../src/components/Template'

describe('CodeBuild::BuildSpec', () => {
  test('defaults', () => {
    const a = new CodeBuildProject('serviceRoleARNstring')
    const e = {
      ServiceRole: 'serviceRoleARNstring',
      Source: {
        Type: 'NO_SOURCE'
      },
      BadgeEnabled: true,
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
    const servRoleArn = { 'Fn::GetAtt': ['someNameOfAnotherRoleThing', 'Arn'] } as IGetAtt
    const a = new CodeBuildProject(servRoleArn)
    const e = {
      ServiceRole: servRoleArn,
      BadgeEnabled: true,
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
      BadgeEnabled: true,
      Environment: {
        ComputeType: 'BUILD_GENERAL1_SMALL',
        Image: 'aws/codebuild/standard:2.0',
        Type: 'LINUX_CONTAINER'
      }
    }

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
      BadgeEnabled: true,
      Cache: {
        Type: 'NO_CACHE'
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
    expect((a.toJSON() as any)[a.name]).toEqual({
      Type: 'AWS::CodeBuild::Project',
      Properties: e
    })
  })

  test('Verbose option', () => {
    const input: IcodeBuild = {
      artifacts: {
        s3: {
          bucket: 'myBucket',
          path: 'path/to/here',
          name: 'name',
          id: 'artifactID',
          useBuildId: true,
          zip: true,
          override: true,
          encOff: true
        }
      },
      serviceRoleArn: 'mySvcRoleArnString',
      cache: ['LOCAL_SOURCE_CACHE', 'LOCAL_DOCKER_LAYER_CACHE'],
      description: 'my long winded description of this codeBuild project',
      enabledBadge: true,
      preset: 'node',
      logs: { cw: 'Group.Thread', s3: { loc: 'some.location', encOff: true } },
      name: 'The Verbose CodeBuild Project',
      sources: {
        github: {
          location: 'http://github.com/federalies.squals.git',
          allowFetchGitSubModules: true,
          buildSpec: 'buildspec.yml',
          sourceId: 'github:federalies',
          reportBuild: true,
          gitCloneDepth: 2
        }
      },
      tags: [{ my: 'Tag' }, { other: 'Tag2' }],
      triggers: { type: 'EVENT', pattern: 'PUSH', isMatchingPattern: true },
      timeOutBuildAfter: 100,
      vpc: { id: 'VPCID', secGrpIds: 'someGrpID', subnets: 'subnetID' }
    }
    const a = new CodeBuildProject(input)
    const e = {
      'The Verbose CodeBuild Project': {
        Type: 'AWS::CodeBuild::Project',
        Properties: {
          Name: 'The Verbose CodeBuild Project',
          Description: 'my long winded description of this codeBuild project',
          BadgeEnabled: true,

          Artifacts: {
            Type: 'S3',
            ArtifactIdentifier: 'artifactID',
            Location: 'myBucket',
            Path: 'path/to/here',
            Name: 'name',
            Packaging: 'ZIP',
            NamespaceType: 'BUILD_ID',
            EncryptionDisabled: true,
            OverrideArtifactName: true
          },
          Cache: {
            Type: 'LOCAL',
            Modes: ['LOCAL_SOURCE_CACHE', 'LOCAL_DOCKER_LAYER_CACHE']
          },
          Environment: {
            ComputeType: 'BUILD_GENERAL1_SMALL',
            ImagePullCredentialsType: 'SERVICE_ROLE',
            Image: 'aws/codebuild/nodejs:10.14.1-1.7.0',
            Type: 'LINUX_CONTAINER'
          },
          LogsConfig: {
            CloudWatchLogs: {
              Status: 'ENABLED',
              GroupName: 'Group',
              StreamName: 'Thread'
            },
            S3Logs: {
              EncryptionDisabled: true,
              Status: 'ENABLED',
              Location: 'some.location'
            }
          },
          ServiceRole: 'mySvcRoleArnString',
          Source: {
            BuildSpec: 'buildspec.yml',
            GitCloneDepth: 2,
            GitSubmodulesConfig: {
              FetchSubmodules: true
            },
            Location: 'http://github.com/federalies.squals.git',
            ReportBuildStatus: true,
            SourceIdentifier: 'github:federalies',
            Type: 'GITHUB_ENTERPRISE'
          },
          Triggers: {
            FilterGroups: [
              {
                ExcludeMatchedPattern: true,
                Pattern: 'PUSH',
                Type: 'EVENT'
              }
            ],
            Webhook: true
          },
          TimeoutInMinutes: 100,
          Tags: [{ Key: 'my', Value: 'Tag' }, { Key: 'other', Value: 'Tag2' }],
          VpcConfig: {
            SecurityGroupIds: ['someGrpID'],
            Subnets: ['subnetID'],
            VpcId: 'VPCID'
          }
        }
      }
    }
    expect(a.toJSON()).toEqual(e)
  })
})
