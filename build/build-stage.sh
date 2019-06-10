#!/bin/bash

set -e
set -o pipefail

# echo "----- sync statics"
# aws s3 sync s3://prod-statics-andretorgal-com/ statics/

export DEBUG_NODES=1
export DEBUG_ROUTES=1

echo "----- build"
yarn build:stage
cp build/assets/stage/robots.txt dist/

echo "----- sync dist"
aws s3 sync dist/ s3://staging-site-andretorgal-com/ \
  --exclude "*.json" \
  --exclude "*.xml" \
  --exclude "*.DS_Store*" \
  --acl public-read \
  --cache-control max-age=86400

echo "----- disable sitemap"
rm dist/sitemap.staging.xml

echo "----- sync dist (data)"
aws s3 sync dist/ s3://staging-site-andretorgal-com/ \
  --exclude "*" \
  --include "*.json" \
  --include "*.xml" \
  --acl public-read \
  --cache-control max-age=0,no-cache,no-store,must-revalidate

echo "----- sync statics"
aws s3 sync statics/ s3://staging-statics-andretorgal-com/ \
  --exclude "*.DS_Store*" \
  --acl public-read \
  --cache-control max-age=2592000
