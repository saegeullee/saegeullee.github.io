```js
service: group-meal

provider:
  name: aws
  runtime: nodejs10.x
  region: ap-northeast-2
  profile: Serverless-Deploy

functions:
  hello:
    handler: handler.handler
    environment:
      PORT: 3030
      MONGO_URI: mongodb://class101:class101!@docdb-2019-12-04-08-28-37.cluster-cnjqhbbgkaab.ap-northeast-2.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0
      JWT_SECRET: jum_sul_pan_secret_key
      NODE_PATH: ./


```
