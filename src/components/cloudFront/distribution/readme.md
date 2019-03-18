# Cloudfront Distribution

## Understanding

orgins

add behaviors that use origins

```
Origins = [
    {   // its place in the array gives it an ID
        give URL - http(s)+domain + path

        "DomainName" : "example.com",
        "OriginCustomHeaders?" : [ OriginCustomHeader, ... ]
        "OriginPath?" : String,
        "CustomOriginConfig" : {
            "OriginProtocolPolicy?" : 'match-viewer' | 'https-only' | 'http-only'
            "HTTPPort?" : number | 80,
            "HTTPSPort?" : number | 443 ,
            "OriginKeepaliveTimeout?" : number | 30s ,
            "OriginReadTimeout?" : Integer,
            "OriginSSLProtocols?" : [ String, ... ]
        }
    },
    {

    }
]
```

# #

# #
