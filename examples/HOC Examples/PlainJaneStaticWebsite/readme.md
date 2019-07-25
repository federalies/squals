# StaticWebsite

## Intro

The easiest way to have your own corder of the web - in the most hassle-free way ever is to put files on S3.

## Uses:

### Required

- S3 (for files)

### Optional

- Using your own domain?

  - Route53

- Want to speed things up?

  - CloudfrontCDN -

    - if so - ACM - creates HTTPs option for CDN

### Assumptions

if you are integrating dynamic contnet then hopefully you are doing that through a content API

### Maybe like this?

```typescript
const staticSite = new StaticSite(
    domain?:string, 
    cdn='auto' // auto | none | existing
    existing?:{
        bucket:object, 
        route53?:object, 
        acm?:object
        cdn?:object
    }
    ):object[]
```

### Inputs Matrix

1. where `(< entity >)` is new and returned
2. `->` represents a preconfigured connection
3. where `_<entity>` is an existing thing - that is mutated - but not returned - assumed to be already incorporated

Inputs                      | New Objects Returned
--------------------------- | ---------------------------------------------
empty                       | (CDN)->(S3)
`domain`+`cdn=false`        | R53(`www`)->(S3)
`domain` + `cdn=false` + S3 | (R53[`www,*`])->CDN, (CDN)->_S3, ACM-> domain
