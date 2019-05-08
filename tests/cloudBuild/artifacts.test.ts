import {
  artifacts,
  artifactItem,
  ICodeBuildArtifactData,
  firstKey,
  firstVal
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

  test('firstVal', () => {
    const input = { a: { one: 1, two: 2, three: 3 }, b: { see: 'c', dee: 'd', kay: 'k' } }
    expect(firstVal(input)).toEqual({ one: 1, two: 2, three: 3 })
  })

  test('firstVal', () => {
    const input = [{ a: { one: 1, two: 2, three: 3 } }, { b: { one: 1, two: 2, three: 3 } }]
    expect(firstVal(input)).toEqual({ one: 1, two: 2, three: 3 })
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
    const a = artifactItem({ '': { id: 'myArtifactId' } })

    const exp: ICodeBuildArtifactData = {
      Type: 'NO_ARTIFACTS',
      ArtifactIdentifier: 'myArtifactId'
    }

    expect(a).toEqual(exp)
  })
})
