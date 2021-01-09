#! /bin/bash
npm install -g serverless
npm install
printenv | grep '^[a-z]' >> .env
serverless deploy --stage $stage --package $CODEBUILD_SRC_DIR/target/$stage -v -r $region
