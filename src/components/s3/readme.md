# AWS S3 - the hard drive of the internet

## Squals(S3)

```javascript
const a = new S3Bucket(BuketName:'')
const a = new S3Bucket()
```

## Code Quality Checklist

- [] Storied
- [] Symetric
- [] Simplified
- [] Shaped

## Buckets

## BucketPolicy

## Checklist

### Storied

- corresponding AWS documentaiton
- discussion of funny constraints - correlated inputs, outputs
- [x] Analytics

### Shaped Types

- [x] analyticsConfiguration
- [x] bucketEncryption
- [x] corsConfiguration
- [x] destination

### Symetric

- [] Analytics

### Simplified

- [] Analytics

### Conventions

- any property named `<X> list` intelligently handles you giving an 'item' or a 'list'

  - what if it was ends in `s` for brevity?

- JSdoc for even private functions - for contributor affordance

- the JSDoc Example should correspond to the first test in the corresponding **test** file

- interface names all start with `I` and then followed by a submodule name

- interface for outbound types start with `I<toUpperCase>`

- interface for inbound types start with `I<toLowerCase>`

- look through the codebase and promote `@todo`| `@idea` to 'real tracked issues'
