#! /bin/bash
npm install -g serverless
npm install
printenv |  grep -v '[^[:lower:]=.]' >> .env
serverless deploy --stage $stage --package $CODEBUILD_SRC_DIR/target/$stage -v -r us-east-1
