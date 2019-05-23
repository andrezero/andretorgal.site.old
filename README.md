# andretorgal.com

## Deploy

dist folder

```
aws s3 sync . s3://site-andretorgal-com/site/ --acl public-read
```

statics

```
aws s3 sync . s3://statics-andretorgal-com/statics/ --acl public-read
```

## Develop

### Debug

Debug sources and routes:

```
export DEBUG_NODES=1
export DEBUG_ROUTES=1
```

Debug a particular source/route:

```
export DEBUG_NODES=/tags/music
export DEBUG_ROUTES=/tags/music
```
