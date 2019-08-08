import {
  artifacts,
  artifactItem,
  ICodeBuildArtifactData,
  firstKey,
  artifactsConfig
} from '../../src/components/codeBuild/index'

describe('Mapped Typed Helpers', () => {
  test('firstKey', () => {
    const input = { a: { one: 1, two: 2, three: 3 }, b: { see: 'c', dee: 'd', kay: 'k' } }
    const a = firstKey(input)
    expect(a).toEqual('a')
  })
  test('firstKey', () => {
    const input = {
      a: { one: 1, two: 2, three: 3 },
      g: { bee: 'b', see: 'c', dee: 'd' },
      f: { eye: 'i', jay: 'j', el: 'l', sea: 'c', kay: 'k' }
    }
    const a = firstKey(input)
    expect(a).toEqual('a')
  })

  test.skip('firstVal', () => {
    const input = { a: { one: 1, two: 2, three: 3 }, b: { see: 'c', dee: 'd', kay: 'k' } }
    // expect(firstVal(input)).toEqual({ one: 1, two: 2, three: 3 })
  })

  test.skip('firstVal', () => {
    const input = [{ a: { one: 1, two: 2, three: 3 } }, { b: { one: 1, two: 2, three: 3 } }]
    // expect(firstVal(input)).toEqual({ one: 1, two: 2, three: 3 })
  })
})
describe('CodeBuild::ArtifactConfig', () => {
  test('empty input', () => {
    expect(artifactsConfig()).toEqual({ Artifacts: { Type: 'NO_ARTIFACTS' } })
  })

  test('verbose simple example', () => {
    const a = artifactsConfig({
      s3: {
        bucket: 'bucket',
        name: 'name',
        path: 'path/notTrimmedwith/slashes',
        encOff: true,
        override: true,
        useBuildId: true,
        zip: true,
        id: 'artifactID'
      }
    })
    const e = {
      Artifacts: {
        Type: 'S3',
        Location: 'bucket',
        Name: 'name',
        ArtifactIdentifier: 'artifactID',
        NamespaceType: 'BUILD_ID',
        EncryptionDisabled: true,
        OverrideArtifactName: true,
        Packaging: 'ZIP',
        Path: 'path/notTrimmedwith/slashes'
      }
    }
    expect(a).toEqual(e)
  })

  test('verbose simple example', () => {
    const a = artifactsConfig({
      's3://bucket/path/tokey.zip': { override: false, id: 'artifactID42', encOff: false }
    })
    const e = {
      Artifacts: {
        Type: 'S3',
        Location: 'bucket',
        Path: 'path',
        Name: 'tokey',
        Packaging: 'ZIP',
        NamespaceType: 'NONE',
        ArtifactIdentifier: 'artifactID42',
        EncryptionDisabled: false,
        OverrideArtifactName: false
      }
    }

    expect(a).toEqual(e)
  })

  test('pipeline verbose example', () => {
    const a = artifactsConfig({ pipeline: { id: 'artifactId', override: true, encOff: true } })
    const e = {
      Artifacts: {
        Type: 'CODEPIPELINE',
        ArtifactIdentifier: 'artifactId',
        OverrideArtifactName: true
      }
    }
    expect(a).toEqual(e)
  })

  test('no artifact verbose example', () => {
    const a = artifactsConfig({ none: { id: 'artifactId', encOff: true, override: true } })
    const e = {
      Artifacts: {
        ArtifactIdentifier: 'artifactId',
        Type: 'NO_ARTIFACTS'
      }
    }
    expect(a).toEqual(e)
  })

  test('verbose array of 1 example ', () => {
    const a = artifactsConfig([{ s3: { bucket: 'bucket', name: 'myKey' } }])
    const e = {
      Artifacts: {
        Type: 'S3',
        Location: 'bucket',
        Name: 'myKey'
      }
    }
    expect(a).toEqual(e)
  })

  test('verbose array example ', () => {
    const a = artifactsConfig([
      { s3: { bucket: 'bucket', name: 'myKey' } },
      { pipeline: { override: true, zip: true } }
    ])
    const e = {
      Artifacts: {
        Location: 'bucket',
        Name: 'myKey',
        Type: 'S3'
      },
      SecondaryArtifacts: [
        {
          OverrideArtifactName: true,
          Packaging: 'ZIP',
          Type: 'CODEPIPELINE'
        }
      ]
    }

    expect(a).toEqual(e)
  })
})
describe('Error Throwing Behaviors', () => {
  test('throws erorr if you call the lower level artifactItem with a list of objects', () => {
    const input: any = [
      { s3: { bucket: 'bucket', name: 'key' } },
      { pipeline: { id: 'artifactId' } }
    ]
    const a = () => {
      return artifactItem(input)
    }
    expect(a).toThrow()
  })

  test('throws erorr if there is a bad key', () => {
    const input: any = { someOtherKey: {} }
    const a = () => {
      return artifactItem(input)
    }
    expect(a).toThrow()
  })

  test('throws erorr if the s3uri is does not cover buycket and name', () => {
    const a = () => {
      return artifactItem({ 's3://bucket': {} })
    }
    expect(a).toThrow()
  })

  test('throws erorr if the s3uri is poorly formed', () => {
    const a = () => {
      return artifactItem({ 'S3::bucket': {} })
    }
    expect(a).toThrow()
  })
})
describe('CodeBuild::Artifacts ', () => {
  test('empty input', () => {
    const a = artifacts()
    expect(a).toEqual({ Type: 'NO_ARTIFACTS' })
  })
  test('s3 uri', () => {
    const a = artifacts('s3://bucket/key')
    expect(a).toEqual({
      Type: 'S3',
      Location: 'bucket',
      Name: 'key',
      Packaging: 'NONE',
      NamespaceType: 'NONE'
    })
  })
  test('s3uri list 1 item', () => {
    // artifacts is a transform that does not alter the shape of the inputs.
    const a = artifacts(['s3://bucket/key'])
    expect(a).toEqual([
      {
        Type: 'S3',
        Location: 'bucket',
        Name: 'key',
        NamespaceType: 'NONE',
        Packaging: 'NONE'
      }
    ])
  })
  test('s3uri list 2 items', () => {
    const a = artifacts(['s3://bucket/with/folder/path/key.zip', 's3://bucket2/key2'])
    expect(a).toEqual([
      {
        Type: 'S3',
        Location: 'bucket',
        Path: 'with/folder/path',
        Name: 'key',
        Packaging: 'ZIP',
        NamespaceType: 'NONE'
      },
      { Type: 'S3', Location: 'bucket2', Name: 'key2', Packaging: 'NONE', NamespaceType: 'NONE' }
    ])
  })
  test('s3uri obj', () => {
    const a = artifacts({ 's3://bucket/key': { id: 'artifacId', encOff: true, override: true } })
    const exp: ICodeBuildArtifactData = {
      Type: 'S3',
      Location: 'bucket',
      Name: 'key',
      NamespaceType: 'NONE',
      Packaging: 'NONE',
      EncryptionDisabled: true,
      OverrideArtifactName: true,
      ArtifactIdentifier: 'artifacId'
    }
    expect(a).toEqual(exp)
  })
})
describe('CodeBuild::ArtifactItem ', () => {
  test('defaults', () => {
    const a = artifactItem()
    expect(a).toEqual({ Type: 'NO_ARTIFACTS' })
  })

  test('from string', () => {
    const a = artifactItem('s3://bucket/name')
    const exp: ICodeBuildArtifactData = {
      Type: 'S3',
      Location: 'bucket',
      Name: 'name',
      Packaging: 'NONE',
      NamespaceType: 'NONE'
    }
    expect(a).toEqual(exp)
  })

  test('from string.zip', () => {
    const a = artifactItem('s3://bucket/path/to/dir/<BUILD_ID>/name.zip')
    const exp: ICodeBuildArtifactData = {
      Type: 'S3',
      Location: 'bucket',
      Name: 'name',
      Packaging: 'ZIP',
      NamespaceType: 'BUILD_ID',
      Path: 'path/to/dir'
    }
    expect(a).toEqual(exp)
  })

  test('from s3str:object', () => {
    const a = artifactItem({
      's3://bucket/path/to/dir/<BUILD_ID>/name.zip': {
        id: 'artifact0',
        override: true,
        encOff: true
      }
    })
    const exp: ICodeBuildArtifactData = {
      Type: 'S3',
      Location: 'bucket',
      Name: 'name',
      Packaging: 'ZIP',
      NamespaceType: 'BUILD_ID',
      Path: 'path/to/dir',
      OverrideArtifactName: true,
      EncryptionDisabled: true,
      ArtifactIdentifier: 'artifact0'
    }
    expect(a).toEqual(exp)
  })

  test('from s3 object', () => {
    const a = artifactItem({
      s3: {
        bucket: 'bucket',
        path: 'some/path',
        name: 'myFile',
        useBuildId: true,
        zip: true
      }
    })
    const exp: ICodeBuildArtifactData = {
      Type: 'S3',
      Location: 'bucket',
      Path: 'some/path',
      Name: 'myFile',
      NamespaceType: 'BUILD_ID',
      Packaging: 'ZIP'
    }
    expect(a).toEqual(exp)
  })

  test('from pipeline object', () => {
    const a = artifactItem({
      pipeline: { id: 'artifactId', zip: true, override: true }
    })

    const exp: ICodeBuildArtifactData = {
      Type: 'CODEPIPELINE',
      Packaging: 'ZIP',
      ArtifactIdentifier: 'artifactId',
      OverrideArtifactName: true
    }

    expect(a).toEqual(exp)
  })

  test('from empty string object - with artifactID ', () => {
    const a = artifactItem({ none: { id: 'myArtifactId' } })
    const exp: ICodeBuildArtifactData = {
      Type: 'NO_ARTIFACTS',
      ArtifactIdentifier: 'myArtifactId'
    }

    expect(a).toEqual(exp)
  })
})
