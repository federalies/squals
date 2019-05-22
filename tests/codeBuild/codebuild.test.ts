import { CodeBuildProject, IcodeBuild, envPresets } from '../../src/components/codeBuild/index'
import { IGetAtt } from '../../src/components/Template'

test.todo('remove the env image requirement since its defaulted to `aws/ubuntu14`')

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
  test('Use minimum input making CodeBuild Proj', () => {
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
  test('Verbose Contructor', () => {
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
      logs: { cw: 'Group:Thread', s3: { loc: 'some.location', encOff: true } },
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
      triggers: [
        { event: { pattern: 'push' } },
        { head: { pattern: 'branch/name' } },
        { path: { pattern: 'src/components' } },
        { base: { pattern: 'someString', isExclusion: true } },
        { actor: { pattern: 'buildSystemID', isExclusion: false } }
      ],
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
            Type: 'GITHUB',
            Location: 'http://github.com/federalies.squals.git',
            BuildSpec: 'buildspec.yml',
            SourceIdentifier: 'github:federalies',
            GitCloneDepth: 2,
            ReportBuildStatus: true,
            GitSubmodulesConfig: {
              FetchSubmodules: true
            }
          },
          Triggers: {
            Webhook: true,
            FilterGroups: [
              { Type: 'EVENT', ExcludeMatchedPattern: true, Pattern: 'PUSH' },
              { Type: 'HEAD_REF', ExcludeMatchedPattern: true, Pattern: 'branch/name' },
              { Type: 'FILE_PATH', ExcludeMatchedPattern: true, Pattern: 'src/components' },
              { Type: 'BASE_REF', ExcludeMatchedPattern: true, Pattern: 'someString' },
              { Type: 'ACTOR_ACCOUNT_ID', ExcludeMatchedPattern: false, Pattern: 'buildSystemID' }
            ]
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
  test('build up via methods, assert - tear down reassert', () => {
    const a = new CodeBuildProject('serviceRoleArnString')
      .artifacts()
      .sources()
      .env() // use defaults
      .enableBadge()
      .cache('s3://bucekt/myPath')
      .encryptionKey('myEncrKeyString')
      .logs({ cw: 'groupID.ThreadID', s3: { loc: 's3://bucketName.path' } })
      .vpc({ id: 'vpcId', secGrpIds: 'secGrpId', subnets: 'subnets' })
      .triggers([
        { event: { pattern: 'push', isExclusion: false } },
        { path: { pattern: 'src/my/path', isExclusion: false } }
      ])

    const full = {
      ServiceRole: 'serviceRoleArnString',
      BadgeEnabled: true,
      EncryptionKey: 'myEncrKeyString',
      Artifacts: { Type: 'NO_ARTIFACTS' },
      Source: { Type: 'NO_SOURCE' },
      VpcConfig: {
        VpcId: 'vpcId',
        Subnets: ['subnets'],
        SecurityGroupIds: ['secGrpId']
      },
      Cache: {
        Type: 'S3',
        Location: 'bucekt/myPath'
      },
      LogsConfig: {
        CloudWatchLogs: {
          Status: 'ENABLED',
          GroupName: 'groupID',
          StreamName: 'ThreadID'
        },
        S3Logs: {
          Status: 'ENABLED',
          EncryptionDisabled: false,
          Location: 'bucketname.path/undefined'
        }
      },
      Triggers: {
        Webhook: true,
        FilterGroups: [
          {
            Type: 'EVENT',
            Pattern: 'PUSH',
            ExcludeMatchedPattern: false
          },
          {
            Type: 'FILE_PATH',
            Pattern: 'src/my/path',
            ExcludeMatchedPattern: false
          }
        ]
      },
      Environment: {
        ComputeType: 'BUILD_GENERAL1_SMALL',
        Image: 'aws/codebuild/standard:2.0',
        Type: 'LINUX_CONTAINER'
      }
    }

    expect((a.toJSON() as any)[a.name]).toEqual({
      Type: 'AWS::CodeBuild::Project',
      Properties: full
    })

    a.enableBadge(false)
      .sources()
      .artifacts()
      .cache()
      .env(null)
      .logs(null)
      .triggers(null)
      .encryptionKey(null)
      .vpc(null)
      .cache(null)

    let sparse: any = {
      ServiceRole: 'serviceRoleArnString',
      BadgeEnabled: false,
      Artifacts: { Type: 'NO_ARTIFACTS' },
      Source: { Type: 'NO_SOURCE' },
      Cache: { Type: 'NO_CACHE' },
      Environment: {
        ComputeType: 'BUILD_GENERAL1_SMALL',
        Image: 'aws/codebuild/standard:2.0',
        Type: 'LINUX_CONTAINER'
      }
    }
    expect((a.toJSON() as any)[a.name]).toEqual({
      Type: 'AWS::CodeBuild::Project',
      Properties: sparse
    })

    a.logs({ cw: 'groupID.ThreadID' })
    sparse.LogsConfig = {
      CloudWatchLogs: {
        Status: 'ENABLED',
        GroupName: 'groupID',
        StreamName: 'ThreadID'
      }
    }

    expect((a.toJSON() as any)[a.name]).toEqual({
      Type: 'AWS::CodeBuild::Project',
      Properties: sparse
    })

    a.logs({ s3: { loc: 's3://bucket/name' } })
    sparse.LogsConfig = {
      S3Logs: {
        Status: 'ENABLED',
        Location: 'bucket/name',
        EncryptionDisabled: false
      }
    }

    // console.log(JSON.stringify((a.toJSON() as any)[a.name], null, 2))
    // console.log(JSON.stringify(sparse, null, 2))

    expect((a.toJSON() as any)[a.name]).toEqual({
      Type: 'AWS::CodeBuild::Project',
      Properties: sparse
    })
  })
  test('static filter Group fucntion ', () => {
    const a = CodeBuildProject.triggerFilterGroupConfig({ event: { pattern: 'push' } })
    const e = { FilterGroups: [{ Type: 'EVENT', Pattern: 'PUSH', ExcludeMatchedPattern: true }] }
    expect(a).toEqual(e)
  })
  test('CodeBuild Project Throws Errors', () => {
    const a1 = () => new CodeBuildProject('svcRole').logs({ s3: { loc: 'bad input' } })
    const a2 = () =>
      new CodeBuildProject('svcRole').logs({
        cw: 'string that is missing a delimiteter of `dot` or `colon` '
      })
    const a3 = () =>
      new CodeBuildProject('svcRole').cache('should be an s3uri staring with s3 : // ')

    expect(a1).toThrow()
    expect(a2).toThrow()
    expect(a3).toThrow()
  })
  test('Cache Types', () => {
    const a = new CodeBuildProject('serviceRoleArn').cache(['LOCAL_SOURCE_CACHE'])
    const sparse = {
      ServiceRole: 'serviceRoleArn',
      BadgeEnabled: true,
      Artifacts: { Type: 'NO_ARTIFACTS' },
      Source: { Type: 'NO_SOURCE' },
      Cache: {
        Type: 'LOCAL',
        Modes: ['LOCAL_SOURCE_CACHE']
      },
      Environment: {
        ComputeType: 'BUILD_GENERAL1_SMALL',
        Image: 'aws/codebuild/standard:2.0',
        Type: 'LINUX_CONTAINER'
      }
    }
    expect((a.toJSON() as any)[a.name]).toEqual({
      Type: 'AWS::CodeBuild::Project',
      Properties: sparse
    })
  })
  test('CW Logs', () => {
    const a1 = new CodeBuildProject('svcRoleArn').logs({ cw: 'grpID.threadId' })
    const a2 = new CodeBuildProject('svcRoleArn').logs({ cw: 'grpID:threadId' })
    const sparse = {
      BadgeEnabled: true,
      Source: { Type: 'NO_SOURCE' },
      Artifacts: { Type: 'NO_ARTIFACTS' },
      ServiceRole: 'svcRoleArn',
      Environment: {
        ComputeType: 'BUILD_GENERAL1_SMALL',
        Image: 'aws/codebuild/standard:2.0',
        Type: 'LINUX_CONTAINER'
      },
      LogsConfig: {
        CloudWatchLogs: {
          Status: 'ENABLED',
          GroupName: 'grpID',
          StreamName: 'threadId'
        }
      }
    }
    expect((a1.toJSON() as any)[a1.name]).toEqual({
      Type: 'AWS::CodeBuild::Project',
      Properties: sparse
    })
    expect((a2.toJSON() as any)[a2.name]).toEqual({
      Type: 'AWS::CodeBuild::Project',
      Properties: sparse
    })
    expect((a1.toJSON() as any)[a1.name]).toEqual((a2.toJSON() as any)[a2.name])
  })

  test('envPrest', () => {
    const a = new CodeBuildProject('svcRole').envPreset('node')
    const e = {
      BadgeEnabled: true,
      ServiceRole: 'svcRole',
      Source: { Type: 'NO_SOURCE' },
      Artifacts: { Type: 'NO_ARTIFACTS' },
      Environment: {
        Type: 'LINUX_CONTAINER',
        ComputeType: 'BUILD_GENERAL1_SMALL',
        Image: 'aws/codebuild/nodejs:10.14.1-1.7.0',
        ImagePullCredentialsType: 'SERVICE_ROLE'
      }
    }
    expect((a.toJSON() as any)[a.name]).toEqual({
      Type: 'AWS::CodeBuild::Project',
      Properties: e
    })
  })
  // 45,358,370,382
  // 83,297,319,345
  // 67,292,325,351
  // 61,267,325,351
})
