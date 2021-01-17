# Melian Backend

Backend repository for melain app. Melian is an online health care system. It include patients and professionals to communicate over a better channel and along with that patients careline and health history data is maintained.

### Technology Stack
- NestJs
- Serverless Framework
- AWS lambda
- API Gateway
- GraphQL
- MongoDB

## Getting Started

Clone up the repository and see deployment for notes on how to deploy the project on a live system.
For development instructions are given below.

### Prerequisites

All project pre-requisites are mentioned in package.json file. 

Make sure you have node installed on your system.

```
node -v
```

Also do install serverless

```
npm install -g serverless
```
### Installing
Follow the following steps

- Clone the project
- Install dependencies via 
    ```
    npm install
    ```
- Copy the environment file
    ```
    cp .env.sample .env
    ```
- Run project in DEV mode  (skip for production or offline serverless mode)
    ```
    npm run start:dev
    ```
- Run project in Serverless mode (please do run once in dev mode to generate graphql.schema file)
  ```
  npm run start:sls
  ```

## Running the tests

To perform unit test

```
npm test
```

###coding style fix

Fix all linting issues via

```
npm run lint
```

## Deployment

Deployment information is given below
#### Note
    A AWS codepipline is already attached to master branch with production .env files

However you can still deploy via serverless deploy command be careful and watch what you do

```
sls deploy --stage $stage
```
Where $stage can be default to dev (if not mentioned). Otherwise prod.
#### Note
    For prod deployment you need to have .env.prod file in repository

## Built With

* [Serverless](https://www.serverless.com/) - The framework used
* [NestJS](https://nestjs.com/) - The rest framework
* [GraphQL](https://graphql.org/) - Query language used with nestjs
