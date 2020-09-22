---
title: Udacity Cloud Developer - Serverless 
date: '2020-06-16T11:50:37.121Z'
template: 'post'
draft: false
slug: '/serverless/serverless'
category: 'serverless'
tags:
  - 'serverless'
description: '유다시티 Cloud Developer 과정에서 Serverless 파트를 듣고 정리한 부분이다.'
socialImage: '/media/image-2.jpg'
---

> **[유다시티 Cloud developer 과정](https://www.udacity.com/course/cloud-developer-nanodegree--nd9990)** 수업을 듣고 정리한 내용입니다.

# 목차

- [Serverless란](#serverless란)
- [API 게이트웨이](#api-게이트웨이)
  - [API 게이트웨이 환경설정](#api-게이트웨이-환경설정)
  - [API 게이트웨이 스테이지](#api-게이트웨이-스테이지)
- [Serverless 프레임워크](#serverless-프레임워크)
  - [Serverless 프레임워크 소개](#serverless-프레임워크-소개)
  - [CloudFormation](#cloudformation)
  - [Serverless 프레임워크 사용하기](#serverless-프레임워크-사용하기)
  - [Serverless 프로젝트 만들기 데모](#serverless-프로젝트-만들기-데모)
  - [API 게이트웨이 요청 유효성 검증](#api-게이트웨이-요청-유효성-검증)
  - [DynamoDB 컴포짓 키](#dynamodb-컴포짓-키)
  - [DyanamoDB 인덱싱](#dyanamodb-인덱싱)
- [Event Processing](#event-processing)
  - [Presigned URL](#presigned-url)
  - [API 게이트웨이 : 웹소켓](#api-게이트웨이--웹소켓)
  - [Serverless 프레임워크에서 웹소켓 사용하기](#serverless-프레임워크에서-웹소켓-사용하기)
  - [Full-text 검색](#full-text-검색)
  - [DynamoDB 스트림](#dynamodb-스트림)
  - [엘라스틱서치](#엘라스틱서치)
  - [심플 노티피케이션 서비스(SNS)](#심플-노티피케이션-서비스sns)

- [인증](#인증)
  - [API 게이트웨이로 인증 구현하기](#api-게이트웨이로-인증-구현하기)
  - [Cors와 인증](#cors와-인증)
  - [Auth0 서비스](#auth0-서비스)
  - [시크릿 키 저장](#시크릿-키-저장)

- [Best Practices](#best-practices)
  - [serverless 어플리케이션 로컬에서 실행하기](#serverless-어플리케이션-로컬에서-실행하기)
  - [Serverless 모니터링](#serverless-모니터링)

# Serverless란

서비리스라는 용어는 유행어일 뿐이다. 어떤 아키텍처 패턴이나 기술을 의미하는 용어가 아니다. 서버리스는 어떤 솔루션을 의미한다. 서버리스라는 키워드를 가지고 있는 대부분의 솔루션들은 다음의 특징들을 가지고 있다.

- 서버는 더 이상의 고려할 부분이 아님(다른 사람에 의해 관리됨)
- 스케일업, 스케일다운이 쉬움
- 사용한 만큼 비용 지불(요청이 없을 때는 비용을 지불하지 않음)
- 데이터 저장소는 예외(요청이 없더라도 데이터 저장하는 만큼 비용을 지불해야함)
- 서버 관리자가 필요없음(서비스 운영에 신경쓰지 않아도됨. 어플리케이션의 비즈니스 로직에만 집중할 수 있음)

### 서버리스의 장점

- 낮은 진입 장벽
- 비용이 저렴함
- 높은 가용성과 확장성

### 앞으로 수업에서 배울 것들

- 서버리스란 무엇인가?
- Function as a Service(FaaS)
- 간단한 함수와 이를 이벤트에 연결하는 방법
- 함수가 실행되는 방법
- FaaS의 장점과 단점

## 서버리스 컴포넌트

서버리스는 하나의 기술 또는 서비스를 의미하는 것이 아니라 여러개의 컴포넌트를 통합하여 지칭하는 용어이다.

- Faas : 개별 함수에 코드를 작성하고 플랫폼에 배포하여 실행시키는 서비스이다. (AWS Lambda, Google Cloud Functions, Azure Functions)

- Datastores: 데이터 스토리지(Amazon S3, Amazon DynamoDB, Firebase etc)
- Messaging: 하나의 어플리케이션에서 다른 어플리케이션으로 메시지를 보내주는 서비스(Amazon Simple Queue Service(SQS), Amazon Kinesis, Google Pub/Sub)
- Services: 우리가 서버를 관리하지 않아도 되는 기능들을 제공하는 모든 서비스들(인증, 머신러닝, 비디오 프로세싱, 빅데이터, 오케스트레이션 등)

## Fuction as a Service(FaaS)

- 어플리케이션을 여러 개의 작은 함수로 쪼개는 것
- 이벤트 드리븐(함수들이 외부의 이벤트 발생으로 인해 실행이 됨)
- 함수 실행당 비용 지불
- 나머지 모든 것들이 클라우드 프로바이더에 의해 핸들링 됨(서버 제공, 스케일업, 스케일다운, 설치와 업데이트, 서버 관리 등)

### 람다 함수 VS AWS 람다

AWS 람다는 AWS에서 발생하는 이벤트에 대한 응답을 코드로 실행하는 컴퓨팅 서비스를 의미하고 람다 함수는 AWS 람다에서 실행되고 이벤트 소스에 연결된 단일 함수를 의미한다.

```js
//함수 예시(AWS Lambda)
exports.handler = event => {
  const number = event.number;
  const updateNum = number++;
  return {
    result: updateNum
  };
};
```

AWS 람다에 함수를 배포할 때 두가지 파라미터에 대해 생각해야 한다. 첫번째는 memory이다. 함수가 실행되며 사용할 수 있는 최대 램 용량을 의미한다. 더 많은 메모리를 지정하면 더 빠른 CPU를 사용할 수 있고 이에 따라 더 많은 비용을 지불해야 한다. 두번째는 timeout이다. 함수가 실행되는데 필요한 최대 시간을 의미한다. 파라미터로 제공한 시간이 지나면 함수는 자동 종료된다.

### AWS 람다의 제한사항

- 함수 실행당 최대 3GB의 메모리 사용가능
- 함수는 15분 이상 실행될 수 없음
- `/tmp` 폴더에만 파일을 쓸 수 있음(512MB 이내)
- 동시에 실행될 수 있는 함수의 개수 제한 (디폴트로 함수의 인스턴스 1000개까지 병렬적으로 실행 가능)
- 이벤트 사이즈는 6MB까지 가능(람다 함수를 동기(syncronously)로 호출할 경우 256KB까지 가능)

AWS 람다 제한사항 최신 버전은 [여기서](https://docs.aws.amazon.com/lambda/latest/dg/limits.html) 확인 가능

## AWS 람다 이벤트

람다 함수와 테스트 event 객체를 다음과 같이 구성해볼 수 있다. 테스트 event 객체는 AWS 콘솔에서 생성된 람다 함수 대시보드 안에서 Test 버튼 왼쪽의 드롭다운 메뉴에서 Configure test events를 클릭하여 테스트 이벤트 객체를 구성할 수 있다.

```js
//람다 함수
exports.handler = async (event) => {
    console.log('Event: ', event);

    return {
        result: `Hello ${event.name}`
    }
};

//테스트 이벤트
{
    "name": "Serverless"
}
```

## 함수가 실행되는 방법

![AWS Lambda Functions](/media/aws_lambda_functions.png)

람다 함수를 실행시키기 위해 요청을 보내면, AWS 람다는 해당 함수를 실행시키기 위한 환경을 만든다. 특정 환경을 위한 컨테이너를 만들고 해당 함수 코드를 로드한다. 그리고 이 함수에 이벤트를 보낸다. 이와 같은 과정이 모든 요청에 대해 동일하게 반복된다.

해당 요청에 대해 함수가 실행되어 응답을 보내주고 나면 이를 위해 만들어진 환경이 곧바로 제거되는 것은 아니다. 곧 이 함수에 대해 다른 요청이 들어올 수도 있기 때문이다. 그래서 만약 이 함수에 새로운 요청을 보내면 AWS 람다는 현재 존재하는 환경을 사용할 것이다.

그리고 만약 오랜 시간동안 새로운 요청이 오지 않는다면, AWS 람다는 해당 환경들을 하나씩 제거하기 시작한다. 긴 시간동안 요청이 없었다면 함수를 곧바로 실행할 수 있는 환경이 없을 것이다. 따라서 새로운 요청에 응답하기 위한 새로운 환경이 만들어져야 한다.

위와 같이 함수는 휘발성이다. 요청에 응답하기 위해 만들어진 환경은 10분~15분 정도 유지되고 더 이상 사용되지 않으면 이는 곧 제거된다. 만약 해당 환경이 4시간정도 계속해서 사용되더라도 해당 환경을 구성하는 컨테이너는 제거되고 함수를 실행하기 위한 다른 컨테이너가 만들어진다. 이렇게 동작하는 이유는 이렇게 함으로서 함수가 항상 최신의 OS 버전과 최신 업데이트가 적용된 환경에서 서비스를 할 수 있기 때문이다.

## Invocation types(구동 타입)

AWS 람다 함수를 구동(실행)시킬 때, 어떤 구동 타입으로 함수를 실행시킬지 결정할 수 있다.

- Request/Response (Syncronous call)
- Asyncronous invocation (Asyncronous call)
- Using AWS CLI

```
aws lambda invoke --function-name helloworld \
--invocation-type RequestResponse \
--log-type Tail --payload `{"name" : "AWS Lambda"}` \
result.txt
```

`invocation-type`을 Event로 줘서 비동기로 실행할 수도 있다.

```
aws lambda invoke --function-name helloworld \
--invocation-type Event \
--log-type Tail --payload `{"name" : "AWS Lambda"}` \
result.txt
```

### 에러 핸들링

![AWS_Lambda_Error_Handling](/media/AWS_Lambda_Error_Handling.png)

AWS 람다에서 에러가 발생하면 어떻게 함수를 실행시켰는지에 따라 에러가 핸들링 되는 방법이 다르다.

1. Request/Response(동기) 방법을 사용하여 함수를 실행시켰을 때 에러가 발생하면 함수를 호출한 클라이언트에게 즉시 에러를 반환한다.

2. Aync(비동기) 방법을 사용하여 함수를 실행시켰을 때 에러가 발생하면 AWS 람다는 HTTP 202(accepted) 응답을 클라이언트에게 보내주고 이 요청을 내부적으로 Queue에 저장해놓는다. 추가적으로 람다 함수를 3번 호출하고 만약 이 모든 호출에 대해 전부 에러가 발생하면 이 이벤트(요청)를 `dead-letter-queue`에 저장해놓는다.
   이 큐에는 람다 함수가 응답에 대해 처리를 못하고 실패한 모든 이벤트를 저장해놓는 공간이다.

## 플랫폼 이벤트

이제 조금 복잡한 AWS 람다 함수를 만들어본다. 이 함수를 실행시키기 위해 `CloudWatch`라는 서비스를 이용한다. 아래의 그림과 같이 클라우드워치 서비스를 통해 AWS 람다 함수를 주기적으로 호출하는 이벤트를 발생시킬 수 있다. 이 이벤트가 발생하면 람다 함수는 현재 실행되고있는 EC2 인스턴스의 목록을 얻고 이중 하나를 랜덤하게 종료시킨다.

![AWS_Lambda_complex_function](/media/AWS_Lambda_complex_function.png)

이 프로젝트는 이 [레포지토리](https://github.com/udacity/cloud-developer/tree/master/course-04/exercises/c4-demos-master/04-chaos-monkey)에 저장되어 있다. 이 프로젝트로 AWS 람다 함수를 만들기 위해 먼저 프로젝트 루트 디렉토리에서 `npm i`를 하여 디펜던시를 설치하고 zip으로 압축해야 한다. 여기서 제한사항은 압축된 zip 파일은 50MB를 넘으면 안되고 압축을 푼 폴더(AWS가 압축된 폴더를 unzipp 한다)는 250MB를 넘으면 안된다.

```
zip -r chaos-monkey.zip .
```

## 추가 파라미터

AWS 람다 함수는 event 외에 다른 파라미터를 받을 수 있다. 이 중에 2번째 파라미터는 아래의 예시와 같이 context이다. context는 람다 함수가 실행되고 있는 환경에 대한 정보를 제공한다.

```js
exports.handler = async(event, context) => {
  const number = event.number;
  ...
}

```

![AWS_Lambda_Context](/media/AWS_Lambda_Context.png)

# API 게이트웨이

## API 게이트웨이 개념

- API 사용자에게 진입점
- 다른 서비스에게 요청을 전달
- 요청을 처리

Api 게이트웨이는 사용자가 보낸 HTTP 요청을 받아 이벤트로 변환하여 람다 함수를 호출하는 역할을 한다. 그리고 호출된 람다 함수가 비즈니스 로직을 수행한다. 뿐만 아니라 중간에서 인증, 보안, 로깅 캐싱 등의 역할을 수행 할 수도 있다.  
![AWS_API_GATEWAY](/media/AWS_API_GATEWAY.png)

### API 게이트웨이 타입

아마존 API 게이트웨이에는 두가지 종류가 있다.

- REST API
- WebSocket API

### API 게이트웨이의 기능들

- Serverless
- 모니터링 기능을 제공
- 인증
- 쓰로틀링(throttling)
- Web Application Firewall(WAF)와 통합
- 커스텀 도메인 네임 사용 가능

## API 게이트웨이 환경설정

### 엔드포인트 타입

API 게이트웨이를 사용하여 REST API를 만들 때 각 리소스가 어떤 람다 함수를 호출해야 하는지에 대한 정의뿐만 아니라 엔드포인트 타입도 같이 정의해야 한다.

- 엔드포인트 타입은 API 당 설정을 해야 한다. (리소스나 메서드 당 설정 X)
- API 게이트웨이에는 3가지 엔드포인트 타입이 있다.
- 이 중 2가지가 public 인데 `Edge optimized`와 `Regional`이 있다.
- 이 중 다른 한가지는 private VPC인데 외부에서 접근이 불가능한 타입이다.
- 만약 `Edge optimized` 엔드포인트 타입을 선택하고 API를 특정 지역(region)에 배포하면, AWS는 자동으로 CloudFront를 생성해준다. 그럼 모든 요청은 먼저 이 CloudFront를 거쳤다가 API 게이트웨이로 간다.
- `Regional` 엔드포인트 타입은 사용자의 요청이 CloudFront를 거치지 않고 곧바로 API 게이트웨이로 간다.

### Lambda Integration Modes(람다 통합 모드)

람다 함수를 배포하기 전에 고려해야 할 사항은 어떤 데이터 포맷이 API 게이트로부터 람다 함수에 전달되는지에 대한 것이다. 이 데이터 포맷은 어떤 통합 모드를 선택하는지에 따라 달렸다.
![Lambda_Integration_Modes](/media/Lambda_Integration_Modes.png)
두가지 통합 모드가 있다.

- Proxy: 모든 요청 정보를 람다 함수로 전달한다. 사용하기 쉬움
- Non-proxy: 사용자로부터 들어오는 요청을 `Velocity Template Language`를 사용하여 변환하여 전달한다.

## API 게이트웨이 스테이지

API 게이트웨이 스테이지는 구현된 REST API의 라이프사이클 상태에 대한 논리적 참조이다.
(API Gateway Stage is a logical reference to a lifecycle state of the REST API implementation.)

예를들어, REST API에는 여러가지 스테이지가 있을 수 있는데 개발자들이 사용하는 dev 스테이지가 있을 수 있고, 배포 전에 테스트를 위한 staging 스테이지가 있을 수 있고, 실제 사용자들이 사용하는 prod 스테이지가 있을 수 있다.

각 스테이지들은 아래의 그림처럼 서로 다른 URL을 가진다. 중요한 점은 각 스테이지들은 서로 다른 람다 함수 버전을 사용한다는 것이다.
![API_GATEWAY_STAGES](/media/API_GATEWAY_STAGES.png)

## DynamoDB with Node.js

- AWS는 두 개의 DynamoDB 클라이언트를 제공한다.
- AWS.DynamoDB는 로우레벨 클라이언트이다.
- AWS.DynamoDB.DocumentClient는 하이레벨 클라이언트이다.

Nodejs에서 DynamoDB를 사용하기 위해서는 먼저 DynamoDB 인스턴스를 만들어야한다.

```js
const docClient = new AWS.DynamoDB.DocumentClient();
...
// 콜백 패턴
docClient.scan({
  TableName: "Users",
  Limit: 20
}, (err, data) => {
  //Process data or error
})

// 프로미스 패턴
const result = await docClient.scan({
  TableName: "Users",
  Limit: 20
}).promise();

```

# Serverless 프레임워크

서버리스 어플리케이션을 배포하기 위해 필요한 것들은 다음과 같다. 

- 람다 함수
- API 게이트웨이 설정
- 여러가지 다른 자원들 준비(DB, S3 버켓, IAM 정책 등)
- 위의 모든 것들 연결
- 코드 패키징
- 배포

`AWS Console`을 사용하여 모든것을 하나씩 일일이 하는 것은 큰 소요가 든다. 서버리스 프레임워크를 사용하면 이 모든것을 간단히 해결할 수 있다.

## Serverless 프레임워크 소개

- 어플리케이션을 배포하는 표준화된 방법
- 필요한 자원들을 생성해줌
- 어플리케이션을 관리해줌
  - 어플리케이션 제거, 함수 호출, 어플리케이션 로컬에서 실행 등

서버리스 프레임워크 종류는 여러가지가 있다.

- 서버리스 프레임워크
- Zappa (python only)
- Serverless Application Model(SAM)

이 중 이 수업에서는 첫번째인 서버리스 프레임워크를 사용한다. 서버리스 프레임워크는 이중 가장 유명하고 여러개의 플러그인을 사용할 수 있고 큰 커뮤니티가 있다.

서버리스 프레임워크는 다음의 클라우드 프로바이더들과 함께 사용할 수 있다.

- AWS
- Microsoft Azure
- Google Cloud Platform
- Kubeless
- IBM OpenWhisk
- ETC

## YAML

- 서버리스 프레임워크의 환경설정은 YAML 포맷으로 구성된다.
- YAML 포맷은 흔한 환경설정 파일 포맷이다.
- JSON의 수퍼셋이다.
  - 유효한 JSON 파일은 유효한 YAML 파일이다.
  - YAML은 추가적인 기능을 제공한다.
  - YAML은 JSON보다 더 간결한 포맷이다.
- 스페이스로 인덴테이션을 구분한다. (JSON에서는 컬리 브라켓으로 구분)

### YAML Format vs JSON Format

다음에서 YAML 포맷과 JSON 포맷의 비교한 것을 확인해볼 수 있다. 두 파일은 동일한 의미를 나타낸다.

YAML Format

```yaml
# YAML 파일에서는 주석을 달 수 있다.

# 키와 값에 string quotation 을 달지 않아도 된다.
key: value

# Yaml 에서는 배열을 다음과 같이도 표현할 수 있다.
array:
  - 1
  - 2

objects:
  - name: Jack
    suname: Brown
  - name: Joe
```

JSON Format

```JSON
{
  "key":"value",

  "array": [1, 2],

  "objects": [
    {
      "name": "Jack",
      "surname": "Brown"
    },
    {
      "name": "Joe"
    }
  ]
}
```

YAML Format

```Yaml
complex:
  nested:
    key1: value1
    key2: value2
  anotherNested:
    key: value
```

JSON Format

```JSON
{
  "complex": {
    "nested": {
      "key1": "value1",
      "key2": "value2"
    },
    "anotherNested": {
      "key": "value"
    }
  }
}
```

### Serverless 프레임워크 컨셉

서버리스 프레임워크를 사용하여 어플리케이션을 만들려면 다음의 컴포넌트들을 사용해야 한다. 이 모든 것들을 조합하여 하나의 서비리스 어플리케이션을 만들 수 있다.
![serverless_framework_concept](/media/serverless_framework_concept.png)

### Serverless 프로젝트 구조

/node_modules

- plugins, prod. and dev. dependencies
  /src
- function.js
  serverless.yml

package.json

package-lock.json

## Serverless 프레임워크 어플리케이션

### Serverless.yml 파일 구조

- Provider - 프로파이더 특정 설정
- Functions - 서비스에서 사용할 함수
- Plugins - 서버리스 프레임워크를 확장할 플러그인
- Resources - 추가적인 클라우드 리소스

### Serverless.yml - Provider 환경설정

```yaml
service:
  name: serverless-app

provider:
  name: aws
  runtime: nodejs8.10
  region: 'us-east-1'
  # 환경변수 적용, 모든 함수에서 여기에 정의하는 환경변수를 사용할 수 있음
  environment:
    GROUPS_TABLE: Groups
```

### Serverless.yml - 리소스와 플러그인

```yaml
plugins:
  - serverless-webpack

resources:
  Resources:
    # CloudFormation 정의 YAML 파일
```

서버리스 프레임워크는 여러개의 플러그인을 사용하여 기능을 확장할 수 있다. 이 수업에서는 몇가지 유명한 플러그인을 사용할 예정이다.

- 프로젝트를 위해 사용할 플러그인들은 [플러그인 카탈로그](https://www.serverless.com/plugins/) 에서 확인해볼 수 있다.

- 만약 필요한 플러그인을 찾지 못했다면, 나만의 플러그인을 직접 만들 수도 있다.

### Serverless.yml - 함수 환경설정

```yaml
functions:
  # 람다 함수 이름
  GetOrders:
    # src/orders까지는 파일 경로이다. handler는 자바스크립트 함수 이름이다.
    handler: src/orders.handler
    # 위의 함수를 실행시키는 이벤트를 정의한다.
    events:
      - http:
        method: get
        path: /shop/orders
```

### 지원되는 이벤트

서버리스 프레임워크에는 여러가지 이벤트가 지원된다.

- API 게이트웨이 - REST/WebSocket API
- SQS - Simple Queue Service
- Alexa
- CloudWatch Events - 스케줄링 이벤트
- CloudWatch Logs - 프로세스 로그 이벤트
- SNS - Simple Notification Service
- ETC

더 많은 이벤트들에 대해 알고 싶다면 [여기서](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/) 서버리스 프레임워크가 지원하는 모든 이벤트의 목록을 확인해볼 수 있다.

### 서버리스 프레임워크가 하는 일

서버리스 프레임워크는 개발자가 정의한 `Serverless.yml` 파일을 사용하여 `CloudFormation 템플릿`을 만든다. 이 템플릿은 AWS에서 CloudFormation 서비스를 사용하기 위한 템플릿이다. 이를 사용하여 CloudFormation 서비스에 배포하면 AWS ClodFormation 은 이 어플리케이션과 어플리케이션이 구동하기 위한 인프라스트럭쳐를 만들고 업데이트 한다. 따라서 서버리스 프레임워크를 사용하는 방법을 이해하기 위해서는 먼저 CloudFormation 을 사용하는 방법과 CloudFormation 템플릿을 작성하는 방법을 알아야 한다.

![Serverless_Framwork_nutshell](/media/Serverless_Framwork_nutshell.png)

## CloudFormation

- AWS 리소스들을 만들고 관리할 수 있는 서비스이다.
- 선언적이다.(Declarative) (인프라스트럭쳐를 어떻게 업데이트하고 싶은지에 대한 정의를 할 필요가 없다. 만들고 싶은 최종 상태(end state)만 정의해주면 된다. ??)

  - YAML/JSON 설정 파일을 작성한다.
  - CloudFormation 이 이 파일을 읽고 AWS 리소스들의 상태를 업데이트한다.
  - 인프라스트럭쳐를 Version Control 할 수 있다.

- 무료 서비스이다.
  - CloudFormation을 통해 생성되는 리소스들에 대한 비용만 지불하면 된다.

![CloudFormation_process](/media/CloudFormation_process.png)

### CloudFormation 템플릿을 사용하여 정의

CloudFormation 템플릿을 사용하여 다음이 것들을 정의할 수 있다. 이 수업에서는 이 중 `Resources`만 사용한다.

- Parameters - 어플리케이션의 실행에 대한 환경설정
- Resources - 만들고 싶은 리소스들의 목록
- Conditions - 특정 리소스를 언제 생성할지에 대한 정의
- Output - CloudFormation 템플릿 실행후 어떤 값들이 응답으로 반환되어야 하는지에 대한 정의

### CloudFormation 리소스 정의

다음은 CloudFormation을 활용하여 AWS DynamoDB 리소스를 정의하는 예시이다. 다음 그림처럼 AWS DynamoDB의 GUI를 활용하여 테이블을 정의할 수 있지만 CloudFormation 을 활용하면 다음의 Yaml 파일에서도 정의할 수 있다.
![CloudFormation_resources](/media/CloudFormation_resources.png)
CloudFormation Template

```yaml
Resources:
  GroupsDynamoDBTable:
    Type: 'AWS::DynamoDB::Table'
    Properties:
      TableName: Group
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH
      BillingMode: PAY_PER_REQUEST
```

DynamoDB 용어

- Partition key - 과거에는 이름이 Hash Key 였음
- Sort key - 과거에는 이름이 Range Key 였음
- 옛날 용어들이 아직 라이브러리와 CloudFormation에서 사용되고 있음

대부분은 AWS 리소스는 CloudFormation을 활용하여 생성될 수 있지만 가끔 흔하지는 않은 경우이지만 CloudFormation이 지원하지 않는 AWS 리소스가 있을 수 있다. 이때는 AWS API, AWS CLI, AWS 대시보드 등을 통해 생성해야 한다.

[CloudFormation 리소스 레퍼런스](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html) 참고

## Serverless 프레임워크 사용하기

설치

```
npm install -g serverless
```

프로젝트 만들기

```
serverless create --template aws-nodejs-typescript --path folder-name
```

플러그인 설치

```
npm install plugin-name --save-dev
```

프로젝트 배포

```
sls deploy -v
```

## Serverless 프로젝트 만들기 데모

1. Serverless 설치

```
npm install -g serverless
```

2. IAM에 새로운 사용자 이름을 `serverless`로 셋업 후 엑세스키와 시크릿키 저장

3. Serverless에서 2번에서 설정한 AWS 사용자를 사용할 수 있도록 환경설정하기

```
sls config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY --profile serverless
```

사용 가능한 serverless 템플릿 목록 확인

```
sls create --template
```

serverless 보일러플레이트 프로젝트 만들기

```
sls create --template aws-nodejs-typescript --path project-name
```

어플리케이션 배포하기

1. 디펜던시 설치

```
npm install
```

2. 배포하기

```
sls deploy -v
```

위의 배포하기 명령어를 실행시 나오는 로그는 다음과 같다. 로그를 읽어보면 먼저 zip 파일로 프로젝트를 패키징하고 CloudFormation을 통해 `serverless.yml` 파일에 정의한대로 AWS 리소스를 생성하는 과정들을 확인해볼 수 있다.

```cli
Serverless: Using configuration:
{
  "webpackConfig": "./webpack.config.js",
  "includeModules": true,
  "packager": "npm",
  "packagerOptions": {},
  "keepOutputDirectory": false
}
Serverless: Removing /home/saegeullee/folders/udacity/serverless/10-udagram-app/.webpack
Serverless: Bundling with Webpack...
Time: 460ms
Built at: 2020-06-26 20:57:44
         Asset      Size  Chunks                   Chunk Names
    handler.js  1.28 KiB       0  [emitted]        handler
handler.js.map  5.27 KiB       0  [emitted] [dev]  handler
Entrypoint handler = handler.js handler.js.map
[0] ./handler.ts 316 bytes {0} [built]
[1] external "source-map-support/register" 42 bytes {0} [built]
Serverless: Fetch dependency graph from /home/saegeullee/folders/udacity/serverless/10-udagram-app/package.json
Serverless: Package lock found - Using locked versions
Serverless: Packing external modules: source-map-support@^0.5.10
Serverless: Package took [2301 ms]
Serverless: Copy modules: /home/saegeullee/folders/udacity/serverless/10-udagram-app/.webpack/service [55 ms]
Serverless: Prune: /home/saegeullee/folders/udacity/serverless/10-udagram-app/.webpack/service [645 ms]
Serverless: Run scripts: /home/saegeullee/folders/udacity/serverless/10-udagram-app/.webpack/service [0 ms]
Serverless: Zip service: /home/saegeullee/folders/udacity/serverless/10-udagram-app/.webpack/service [114 ms]
Serverless: Packaging service...
Serverless: Remove /home/saegeullee/folders/udacity/serverless/10-udagram-app/.webpack
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
CloudFormation - CREATE_IN_PROGRESS - AWS::CloudFormation::Stack - serverless-udagram-app-dev
CloudFormation - CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_COMPLETE - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_IN_PROGRESS - AWS::S3::BucketPolicy - ServerlessDeploymentBucketPolicy
CloudFormation - CREATE_IN_PROGRESS - AWS::S3::BucketPolicy - ServerlessDeploymentBucketPolicy
CloudFormation - CREATE_COMPLETE - AWS::S3::BucketPolicy - ServerlessDeploymentBucketPolicy
CloudFormation - CREATE_COMPLETE - AWS::CloudFormation::Stack - serverless-udagram-app-dev
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service serverless-udagram-app.zip file to S3 (289.49 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
CloudFormation - UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - serverless-udagram-app-dev
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - HelloLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - HelloLogGroup
CloudFormation - CREATE_COMPLETE - AWS::Logs::LogGroup - HelloLogGroup
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Resource - ApiGatewayResourceHello
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Resource - ApiGatewayResourceHello
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Resource - ApiGatewayResourceHello
CloudFormation - CREATE_COMPLETE - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - HelloLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - HelloLambdaFunction
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Function - HelloLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Permission - HelloLambdaPermissionApiGateway
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodHelloGet
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - HelloLambdaVersionM6DbLxpdiG16YDJDg2ZSMu4TSoZ5fRB1obTCtaxOz4
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Permission - HelloLambdaPermissionApiGateway
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodHelloGet
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Method - ApiGatewayMethodHelloGet
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - HelloLambdaVersionM6DbLxpdiG16YDJDg2ZSMu4TSoZ5fRB1obTCtaxOz4
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - HelloLambdaVersionM6DbLxpdiG16YDJDg2ZSMu4TSoZ5fRB1obTCtaxOz4
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1593172663349
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1593172663349
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Deployment - ApiGatewayDeployment1593172663349
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Permission - HelloLambdaPermissionApiGateway
CloudFormation - UPDATE_COMPLETE_CLEANUP_IN_PROGRESS - AWS::CloudFormation::Stack - serverless-udagram-app-dev
CloudFormation - UPDATE_COMPLETE - AWS::CloudFormation::Stack - serverless-udagram-app-dev
Serverless: Stack update finished...
Service Information
service: serverless-udagram-app
stage: dev
region: us-east-1
stack: serverless-udagram-app-dev
resources: 11
api keys:
  None
endpoints:
  GET - https://flynaqxkge.execute-api.us-east-1.amazonaws.com/dev/hello
functions:
  hello: serverless-udagram-app-dev-hello
layers:
  None

Stack Outputs
HelloLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:685808903701:function:serverless-udagram-app-dev-hello:1
ServiceEndpoint: https://flynaqxkge.execute-api.us-east-1.amazonaws.com/dev
ServerlessDeploymentBucketName: serverless-udagram-app-d-serverlessdeploymentbuck-tdi6ddkua4zw

Serverless: Run the "serverless" command to setup monitoring, troubleshooting and testing.

```

위 로그의 끝 부분에서 생성된 엔드포인트 주소로 포스트맨을 활용하여 요청을 보내보면 다음과 같이 응답이 성공적으로 오는 것을 알 수 있다.

```JSON
{
    "message": "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
    "input": {
        "resource": "/hello",
        "path": "/hello",
        "httpMethod": "GET",
        "headers": {
          ...
```

AWS CloudFormation 대시보드에서 위의 명령어로 생성된 Stack을 확인해 볼 수 있고 CloudFormation이 이 Stack에 생성한 각 리소스를 API 게이트웨이, AWS 람다 함수 등의 대시보드에서 확인해볼 수 있다.

## Groups API 추가하기

여기서 진행할 내용은 다음과 같다.

- GET /groups 엔드포인트에 요청을 보내기 위한 함수 추가
- 환경설정

  - Event Handler 생성
  - IAM permission 설정
  - DynamoDB table 생성

- POST /groups 엔드포인트 추가

위의 진행 내용은 [깃헙 레포지토리](https://github.com/saegeullee/Serverless_Framework_App)에서 확인이 가능하다.

## API 게이트웨이 요청 유효성 검증

현재 위에서 구현한 POST `/groups` 엔드포인트에서는 사용자의 요청을 받으면 그 데이터를 DB에 어떤 유효성 검증이 없이 저장을 하고 있다. 클라이언트의 요청으로 받은 body 객체에 유효성 검증을 람다 함수에서 진행할 수 있지만 여기서는 `API 게이트웨이`에서 하는 방법을 알아본다. 이 방식으로 진행하면 람다 함수가 호출되기 전에 `API 게이트웨이`에서 먼저 요청의 유효성이 검증된다. 검증되지 않은 요청은 람다 함수 호출자체를 하지 않기 때문에 비용을 절감할 수 있다.

### JSON 스키마

API 게이트웨이에서 들어오는 요청을 검증하기 위해 [JSON 스키마](https://json-schema.org/)를 사용한다. JSON 스키마는 JSON 객체의 구조를 정의한다. 다음은 JSON 스키마 예시이다. 첫번째 프로퍼티인 `$schema`는 JSON 객체의 유효성 검증이 이루어질때 어떤 버전의 JSON 스키마가 사용되어야 하는지를 명시한다.

```JSON
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "my-type",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    }
  },
  "required": ["name"]
}
```

API 게이트웨이에서 요청을 검증하는 방법에 대한 공식 문서는 [여기서](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-method-request-validation.html) 확인할 수 있다.

서버리스 프레임워크를 사용하여 요청에 대한 유효성 검증을 하려면 `serverless.yml` 파일의 해당 핸들러에 다음과 같이 코드를 추가하면 된다.

```yaml
HttpHandler:
  handler: src/lambda/http/create.handler
  events:
    - http:
        method: post
        path: items
        request:
          # Schema that will be used to validate incoming requests
          schema:
            application/json: ${file(models/create-todo-model.json)}
```

## DynamoDB 컴포짓 키

### Images API 추가

여기서 구현할 내용은 다음과 같다.

- 이미지 생성
- 해당 group의 이미지 get
- 특정 id의 이미지 get
- 이미지 업로드
- 이미지 업로드 노티피케이션

여기서 사용하는 DynamoDB의 파티션 키만을 사용해서는 특정 id의 이미지를 get하는 쿼리만 구현이 가능하고 특정 group의 모든 이미지를 get하는 쿼리를 구현하기는 어렵다. 파티션 키만을 사용했을 때 DynamoDB가 지원하는 기능은 해당 이미지의 id로 이미지를 쿼리하는 것과 해당 테이블의 모든 아이템을 가져오는 `Scan` 만 지원하기 때문이다. 

따라서 특정 group의 모든 이미지를 쿼리하는 기능을 구현하기 위해 DynamoDB에서 제공하는 `Composite Key`(컴포짓 키)를 사용해야 한다. 컴포짓 키는 다음 두가지 키로 구성이 된다.

- 파티션 키 : 아이템을 어떤 파티션에 write 할지를 결정
- sort 키 : 같은 파티션 키의 아이템들을 sorting
- 이 둘을 함께 사용하면 하나의 아이템을 유니크하게 만들 수 있다.
- 이 구조는 주로 RDBMS의 `One to Many` 관계를 DynamoDB에서 구현하기 위해 사용한다.

컴포짓 키를 사용하면 DynamoDB에 `Query`라는 추가적인 오퍼레이션이 가능한데 이는 특정 파티션 키를 가지고 있는 모든 엘리먼트를 쿼리할 수 있다. 이는 큰 데이터베이스를 쿼리할 때 효율이 좋다. 데이터베이스의 모든 엘리먼트를 scan할 필요없이 특정 파티션 키만을 가지고 있는 아이템만 read 할 수 있기 때문이다. 또한 지정한 `sort key` 속성 뿐만 아니라 다른 속성으로도 아이템을 필터링 할 수 있다.

![dynamodb_composite_key](/media/dynamodb_composite_key.png)

### 컴포짓 키가 제공하는 오퍼레이터

- 아이템을 필터링할 때 사용할 수 있는 오퍼레이터는 다음과 같다.
  - sort key의 값으로 해당 오퍼레이터 사용가능
- <, >, <=, >=, =
- BETWEEN
- BEGINS_WITH

### 이미지 테이블

이 수업에서 Images API를 구현하기 위해 이미지 테이블 필드는 다음과 같이 구성한다.

- groupId (파티션 키)
- timestamp (sort 키)
- imageId
- title
- imageUrl

## Nodejs에서 쿼리 샘플 코드

DynamoDB의 도큐먼트 클라이언트가 Nodejs에서 DB를 쿼리하기 위한 샘플 코드이다.

```js
const docClient = new AWS.DynamoDB.DocumentClient();

const result = await docClient
  .query({
    TableName: 'GameScore',
    KeyConditionExpression: 'GameId = :gameId',
    ExpressionAttributeValues: {
      ':gameId': '10'
    }
  })
  .promise();

const items = result.Items;
```

### serverless 프레임워크 샘플 코드

특정 그룹의 모든 이미지를 가져오는 엔드포인트에 대한 명세를 `serverless.yml`에 다음과 같이 정의할 수 있다.

```yaml
functions:
  GetOrders:
    handler: src/images.handler
    events:
      - http:
          method: get
          path: /groups/{groupId}/images
```

그리고 핸들러 함수는 다음과 같이 작성할 수 있다.

```js
exports.handler = async(event) => {
  const groupId = event.pathParameters.groupId
  ...
}
```

## DyanamoDB 인덱싱

DynamoDB의 인덱싱 시스템은 다른 데이터베이스의 시스템과 다르다. DynamoDB는 두가지 타입의 인덱싱을 지원한다.

### Local Secondary Index(LSI)

- 추가적인 sort key와 같다.
- 다른 속성으로 아이템을 정렬할 수 있도록 해준다.

### Global Secondary Index(GSI)

- 같은 데이터에 대해 새로운 파티션 키와 sort 키를 정의할 수 있다.
- 새로운 파티션 키를 새로운 키로 하여 기존 테이블의 데이터를 새로운 테이블로 비동기로 복사한다.
- 내부적으로 GSI는 마치 새로운 테이블에서 데이터를 쿼리하는 것처럼 동작한다.

![dynamodb_global_indexes](/media/dynamodb_global_indexes.png)

이 수업 예시의 경우에는 `imageId`가 `GSI`가 될 수 있다. 따라서 imageID로 아이템을 효율적으로 쿼리해올 수 있게 된다. `GSI`로 설정했기 때문에 쿼리 속도가 빠르고 테이블의 모든 아이템을 lookup 할 필요가 없다.

다음은 위의 사항들을 적용한 DynamoDB 테이블 리소스를 `serverless.yaml`파일에 정의한 코드이다.

```yaml
    ImagesDynamoDBTable:
      Type: 'AWS::DynamoDB::Table'
      Properties:
        AttributeDefinitions:
          - AttributeName: groupId
            AttributeType: S
          - AttributeName: timestamp
            AttributeType: S
          - AttributeName: imageId
            AttributeType: S
        KeySchema:
          - AttributeName: groupId
            KeyType: HASH
          - AttributeName: timestamp
            KeyType: RANGE
        GlobalSecondaryIndexes:
          - IndexName: ${self:provider.environment.IMAGE_ID_INDEX}
            KeySchema:
              - AttributeName: imageId
                KeyType: HASH
            # 기존 테이블 데이터의 어떤 속성들을 GSI의 결과로 생성되는 테이블에 복사할지
            # 지정하는 부분. 여기서는 모든 속성들을 복사
            Projection:
              ProjectionType: ALL
        BillingMode: PAY_PER_REQUEST
        TableName: ${self:provider.environment.IMAGES_TABLE}
```

# Event Processing

지금까지의 과정까지 `serverless framework`를 사용하여 [SNS 어플리케이션](https://github.com/saegeullee/Serverless_Framework_App)을 만들었다. 이번 섹션에서는 다음의 고급 기능들을 이 어플리케이션에 추가하는 과정들을 정리한다.

- AWS S3에 이미지 업로드
- 이미지 파일이 업로드 될때 다른 사용자들에게 노티 보내주기
  - WebSockets
  - S3 노티피케이션 사용
- 텍스트 검색 (DynamoDB)
- 아마존 SNS(Simple Notification Service) 사용
  - 람다 함수와 이벤트 소스들 연결

## 파일 업로드

이 수업에서 이미지를 업로드 할 때 `presigned url`이라는 방식을 사용한다.

### Presigned URL

![presigned_url](/media/presigned_url.png)

- S3 버켓을 가리키는 특별한 URL이다
- 누구나 이를 사용하여 객체를 업로드 및 Read 할 수 있다
  - S3 버켓이 Private 이더라도 사용가능
- 람다 함수에 의해 `Presigned url`이 생성된다
  - 해당 람다 함수는 S3에 쓰기 권한이 있어야 한다
- serverless 방식이다.
  - 파일 업로드를 위한 인프라를 관리할 필요가 없다
  - 파일 업로드 프로세싱을 직접 관리할 필요가 없다

### Presigned URL 생성하기

`presigned url`을 생성하기 위해서는 다음과 같이 S3 버켓 클라이언트 인스턴스를 생성해야 한다.

```js
const s3 = new AWS.S3({
  signatureVersion: 'v4' // Use Sigv4 algorithm
});
const presignedUrl = s3.getSignedUrl('putObject', {
  // 이 URL은 S3 버켓에 PUT 작업을 할 수 있도록 허용한다.
  Bucket: 's3-bucket-name', // S3 버켓의 이름
  Key: 'object-id', // 이 URL이 접근 허용하는 객체의 id
  Expires: '300' // 이 URL은 5분동안 유효함
});
```

이 url을 생성하기 위해 사용되는 Sigv4 알고리즘이 어떻게 동작하는지에 대한 것은 [여기서](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html) 확인해보면 된다.

### CloudFormation 레퍼런스

현재 프로젝트에 어떤 사용자든지 S3 버켓에서 이미지를 읽어올 수 있도록 허용하는 것과 S3 버켓에 이미지를 업로드 할 수 있도록 허용하는 `IAM 정책`을 추가해야 한다. 그러기 위해서는 `IAM 정책`이 S3 버켓의 ID를 알 수 있어야 한다. 이때 `CloudFormation 레퍼런스`를 사용하여 다음과 같이 이를 제공할 수 있다.

```yaml
AttachmentBucket:
  Type: AWS::S3::Bucket

BucketPolicy:
  Type: AWS::S3::BucketPolicy
  Properties:
    PolicyDocument:
      - !Ref AttachmentsBucket
```

[Ref](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-ref.html)를 통해 특정 리소스의 id를 가져올 수 있다.

YAML 파일에 다음의 두가지 포맷으로 사용할 수 있다.

```yaml
Ref: logicalName
```

```yaml
!Ref logicalName
```

## S3 이벤트

이번 섹션에서는 S3 파일 업로드 이벤트(s3 노티피케이션)가 발생했을때 호출되는 람다 함수를 추가한다. 서버리스 프레임워크에는 다음과 같이 함수를 정의하여 이를 수행할 수 있다.

```yaml
functions:
  process:
    handler: file.handler
    events:
      - s3: bucket-name
        events: s3:ObjectCreated:*
        rules:
          - prefix: images/
          - suffix: .png
```

## API 게이트웨이 : 웹소켓

람다 함수는 특성상 휘발성이며 일정 시간 요청이 없다면 언제든지 제거될 수 있다. 그렇다면 어떻게 지속적인 연결을 유지할 수 있을까? 클라이언트는 `API 게이트웨이`와 연결되고 `API 게이트웨이`가 지속적인 연결을 유지한다.

`API 게이트웨이`는 사용자가 웹소켓을 통해 보낸 메시지를 전달받고 이 메시지를 여러개의 람다 함수에게 이를 전달할 수도 있다. 사용자가 요청 body에 보내는 특정키에 대한 값이 `라우팅키`가 되어 어떤 람다 함수를 호출할지 결정한다.

![Api_gateway_websocket_api](/media/Api_gateway_websocket_api.png)

### 특별한 라우팅

`API 게이트웨이`에는 몇가지 특별한 라우팅이 있어 웹소켓 이벤트를 라우팅 할 수 있다.

![Api_gateway_special_routes](/media/Api_gateway_special_routes.png)

- \$connect: 사용자가 웹소켓을 통해 연결되면 람다 함수에 전달되는 이벤트이다.
- \$disconnect: 사용자가 웹소켓 연결에서 끊어지면 람다 함수에 전달되는 이벤트이다.
- \$default: 클라이언트로부터 들어오는 메시지가 어떤 라우트 경로에도 매칭이 되지 않으면 보내지는 이벤트이다. 또는 사용자가 JSON이 아닌 데이터를 보내면 전달되는 이벤트이다.

### API 게이트웨이 웹소켓 URL

- `REST API`는 하나의 URL만 주어진다.
- 이와 달리 `Websocket API`는 배포되면 두개의 URL이 주어진다.
- `Websocket URL`
  - 클라이언트가 API에 연결하기 위해 사용된다.
  - 클라이언트가 메시지를 보내고 노티피케이션을 받을 수 있도록 해준다.
- `Connection URL`

  - 연결된 클라이언트에게 메시지를 다시 보낼 수 있도록 해준다.
  - 람다 함수가 클라이언트에게 메시지를 보낼 때 사용된다.
  - 특정 클라이언트에게 메시지를 보내는데 `Connection id`가 필요하다.

  ### API 게이트웨이 커넥션 ID

  사용자가 `API 게이트웨이`에 연결되거나 연결이 끊어지면 API 게이트웨이는 람다함수에게 `커넥션 ID`를 전달한다. 람다 함수는 전달받은 `커넥션 ID`를 데이터베이스에 저장하고 연결이 끊어지면 이를 제거한다.

  그리고 데이터베이스에 저장된 `커넥션 ID`를 읽어와 특정 클라이언트에게 메시지를 보낼 수 있다.

![Api_gateway_connection_id](/media/Api_gateway_connection_id.png)

### 커넥션 URL

커넥션 URL은 다음의 HTTP 메서드를 제공한다.

- POST : 클라이언트에게 메시지를 보낸다.
- GET : 최신의 연결 상태를 가져온다.
- DELETE: API로부터 클라이언트 연결을 끊는다.

## Serverless 프레임워크에서 웹소켓 사용하기

다음은 웹소켓 이벤트를 사용하기 위한 설정이다.

```yaml
 ConnectHandler:
    handler: src/websocket/connect.handler
    events:
      - websocket:
          route: $connect

  DisconnectHandler:
    handler: src/websocket/disconnect.handler
    events:
      - websocket:
          route: $disconnect
```

포스트맨은 웹소켓 연결을 지원하지 않기 때문에 여기서는 `wscat`이라는 웹소켓 CLI 클라이언트를 사용한다.

설치

```
npm install wscat -g
```

연결

```
wscat -c wss://
```

## Full-text 검색

이 섹션에서 구현할 내용은 다음과 같다.

- 이름으로 이미지 찾기
- 모든 필드로 검색 가능하도록 지원
- 타이핑을 잘못쳐도 검색이 가능하게 지원
- 하이라이트 지원(검색어와 일치하는 부분은 하이라이트 처리)
- 검색 결과에 랭킹 지원(더 일치하는 결과를 상위에 보여줌)

위의 기능들을 DynamoDB는 지원하지 않기때문에 다른 데이터베이스를 사용해야 한다.

### ElasticSearch

- 엘라스틱서치는 가장 유명한 full-text 검색 솔루션이다.
  - 오픈소스이며 `Elastic`에 의해 개발되었다.
  - AWS를 포함한 많은 클라우드 프로바이더들이 엘라스틱서치 클러스터를 지원한다.
- 위에서 구현할 내용들을 모두 지원한다.

### 두 개의 데이터베이스

- 엘라스틱서치를 사용하면 두 개의 데이터베이스를 갖게 된다.
- 두 개의 데이터베이스가 싱크가 맞아야 한다.
- 이렇게 두 개의 데이터베이스를 사용하는 패턴을 `CQRS(Command and Query Responsibility Segregation)` 이라고 한다.
  - 이는 서로 다른 데이터베이스들로부터 데이터를 읽고 쓰는 것을 의미한다.
- DynamoDB에 존재하는 데이터를 엘라스틱서치 데이터베이스에 복사해야 한다.

### DynamoDB와 엘라스틱서치 싱크맞추기

사용자가 이미지를 업로드하면 해당 람다 함수에서 먼저 DynamoDB에 저장하고 그 다음 엘라스틱 서치에도 저장하는 방법이 있을 수 있다.
하지만 이는 효율적인 방법이 아니다. 만약 둘 중에 하나의 데이터베이스가 고장난 상태라면 클라이언트는 계속 기다려야 할 수도 있고 두 개의 데이터베이스는 서로 다른 데이터를 갖게 될 것이다. 따라서 이와같은 방법이 아니라 더 좋은 방법이 필요하다.

## DynamoDB 스트림

각 데이터베이스 업데이트가 분리되는 것이 이상적이다. 사용자는 DB 업데이트로부터 분리되어 두 개의 데이터베이스가 모두 업데이트 될때까지 기다리거나 둘 중에 하나의 데이터베이스가 고장이 나더라도 사용자는 이에 영향을 받을 가능성이 적어진다. 엘라스틱서치 데이터베이스는 업데이트가 약간 늦어질 뿐이다.

`데이터 스트리밍` 서비스를 이용하여 이를 구현할 수 있다. 다음의 세가지 `데이터 스트리밍`서비스가 있다.

- 오픈소스인 `Kafka`
- AWS의 `Kinesis`
- `DynamoDB 업데이트 스트림`

### 데이터 스트림

![Data_stream](/media/Data_stream.png)

- 데이터 스트림이란 이진 데이터들의 스트림이다.
- Queue와 비슷하다.
  - Queue와 다른점은 각 레코드를 여러번 읽을 수 있다. (Queue는 한번 읽으면 Queue에서 제거됨)
- 두 가지 종류의 사용자가 있다.

  - Consumer : 레코드를 읽음
  - Producers : 레코드를 추가함

데이터 스트림은 레코드들의 배열에 불과하다. 각 레코드에는 배열의 인덱스와 같이 순서 번호가 있다. 그리고 각 레코드는 이진 데이터이다. 하지만 DynamoDB와 같이 어떤 서비스에서 제공하는 데이터 스트림이냐에 따라 특정 포맷을 가진다. 이러한 레코드들이 모여 하나의 스트림을 형성한다.

데이터 스트림은 마치 Queue와 비슷하지만 두 가지 중요한 차이점이 있다. 첫번째로 데이터 스트림의 레코드는 여러번 읽어질 수 있다. 특정 컨슈머가 데이터 스트림의 처음부터 끝가지 레코드들을 읽더라도 해당 레코드들은 데이터 스트림에서 제거되지 않는다. 따라서 또 다른 컨슈머도 해당 레코드들을 다시 데이터 스트림에서 읽어올 수 있다.

두번째는 데이터 스트림은 각 컨슈머들의 위치를 추적하지 않는다는 점이다.(The second difference is that a stream does not keep track of a position of each consumer.???)

데이터 스트림의 다른 사용자에는 프로듀서가 있다. 이들은 데이터 스트림에 레코드를 추가한다. 오직 데이터 스트림의 끝에만 레코드를 추가할 수 있다. 데이터 스트림의 중간이나 처음에 레코드를 추가할 수는 없다. 그리고 레코드들은 컨슈머 또는 프로듀서에 의해 제거될 수 없다. 각 레코드들은 만료 시간이 설정되어 있고 해당 만료 시간이 지나면 레코드는 데이터 스트림에서 자동으로 제거된다.

### 데이터 스트림 서비스

- Kinesis (AWS 서비스)
  - 어떤 종류의 데이터도 write 할 수 있다.
  - 아파치 Kafka와 비슷하다. 현재 AWS는 Kinesis, Kafka 둘다 서비스를 제공한다.
- DynamoDB
  - DynamoDB는 데이터베이스이다. 스트림 서비스가 아니다.
  - 하지만 해당 DB 테이블의 데이터들로 데이터 스트림을 읽을 수 있도록 지원한다.

### Kinesis로 full-text 검색 구현하기

![Kinesis_data_stream](/media/Kinesis_data_stream.png)

우리가 구현할 시스템의 중간에 `Kinesis 데이터 스트림`을 추가한다. 하나의 람다 함수는 이 데이터 스트림에 새로운 이미지를 추가한다. 그리고 다른 두개의 람다 함수를 추가한다. 이 중 하나는 이 데이터 스트림으로부터 데이터를 읽어와서 데이터 스트림에 추가된 각 아이템을 DynamoDB에 추가한다. 다른 람다 함수도 이 데이터 스트림에서 데이터를 읽어와서 `엘라스틱서치`에 데이터를 추가한다.

### DynamoDB로 full-text 검색 구현하기

![Dynamodb_data_stream](/media/Dynamodb_data_stream.png)

이 수업에서 구현할 내용은 이 방법이다. 먼저 DynamoDB 테이블에 데이터 스트림 기능을 사용할 수 있도록 한다. 현재 구현된대로 DynamoDB 테이블에 레코드들이 추가될 것이고 또다른 람다함수를 새로 구현하여 DynamoDB 테이블에 업데이트된 스트림을 읽어와서 엘라스틱서치에 복사한다.

## 데이터 스트림 스케일링

- 서비스가 확장됨에 따라 데이터 스트림도 확장해야 한다.
- 데이터 스트림 확장방법은 Nosql 데이터베이스를 스케일링 하는 방법과 비슷하다.
  - 하나의 데이터 스트림이 여러개로 분할된다.
  - 분할된 각 부분은 `shard`라고 부른다.
  - 각 `shard`는 데이터 스트림에 쓰여진 레코드들의 일부를 가지고 있다.

그렇다면 어떤 `shard`를 선택해야 할지 어떻게 알 수 있을까?
DynamoDB의 각 레코드의 `Key`를 사용하여 `shard`를 선택한다. 새로운 데이터가 데이터 스트림에 쓰여지면 이는 어떤 `shard`에도 쓰여질 수 있지만 같인 `Key`를 가지고 있는 데이터는 항상 같은 `shard`에 쓰여진다.

### DynamoDB 데이터 스트림

DynamoDB 테이블은 파티션으로 나뉘어져 있고 각 파티션은 각각 `Shard`를 가지고 있다. 따라서 우리는 각 `shard`의 모든 업데이트 사항을 엘라스틱서치에 복사해야 한다.

![dynamoDB_data_stream](/media/dynamoDB_data_stream.png)

### DynamoDB 테이블에 스트림 사용 설정

DynamoDB 테이블에서 스트림을 사용하기 위해서는 `serverless` 파일 설정에서 다음 `StreamSpecification` 항목을 추가해야 한다.
`StreamViewType`은 스트림의 레코드에 들어갈 타입을 지정한다.

```yaml
ImagesDynamoDBTable:
 Type: "AWS::DynamoDB::Table"
 Properties:
   ...
   StreamSpecification:
     StreamViewType: NEW_AND_OLD_IMAGES
```

`StreamViewType` 에는 다음의 4가지 타입이 있다.

- NEW_AND_IMAGES : 스트림이 업데이트되기 전과 이후의 2가지 버전이 있다.
- NEW_IMAGE : 스트림이 업데이트된 이후의 새로운 버전만 있다.
- OLD_IMAGE: 스트림이 업데이트되기 전의 버전만 있다.
- KEYS_ONLY: 스트림에 업데이트된 아이템들의 Key 속성만 가지고 있다.

### 스트림 업데이트 샘플 코드

```js
exports.handler = event => {
  // Process a batch of records
  for (const record of event.Records) {
    const newItem = record.dynamodb.newImage; //modified item
    const id = newItem.id.S; // String attribute
    const count = newItem.count.N; // Number attribute
    // Process a stream record
  }
};
```

위와 같이 DynamoDB의 아이템 속성을 접근하는 방법을 [DynamoDB JSON](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html#Programming.LowLevelAPI.ResponseFormat)이라고 한다.

## 엘라스틱서치

- 엘라스틱서치 데이터
  - Indexes - RDBMS 데이터베이스의 테이블과 같은것
  - Types
    - 하나의 Index에는 여러개의 타입을 포함할 수 있음
    - 엘라스틱서치 7.0에서는 `deprecated`되었지만 이 수업에 사용하는 버전에는 사용할 수 있음
  - 여러개의 `shard`에 분할될 수 있음

### 아마존 엘라스틱서치

- 아마존이 관리해주는 엘라스틱서치 서비스임
- AWS가 배포와 설정을 해준다.
  - CloudFormation을 통해 생성가능
- 두가지 서비스가 생성
  - 엘라스틱서치: 데이터 업로드와 쿼리
  - 키바나 : 엘라스틱서치를 위한 UI 인터페이스
- 엘라스틱서치는 다른 Provider가 제공하는 것을 사용할 수도 있음

### 엘라스틱 서치 연결

다음은 Nodejs에서 엘라스틱서치 클라이언트를 생성하는 샘플코드이다.

```js
import * as elasticsearch from 'elasticsearch';
import * as httpAwsEs from 'http-aws-es';

const esHost = process.env.ES_ENDPOINT;

const es = new elasticsearch.Client({
  hosts: [esHost],
  // 엘라스틱서치 클라이언트가 AWS가 제공하는 엘라스틱서치와 통신하는 방법을 설정한다.
  connectionClass: httpAwsEs
});
```

다음은 엘라스틱서치에 도큐먼트를 저장하는 방법이다.

```js
await es.index({
  index: 'images-index',
  type: 'images',
  id: 'id', // Document ID
  body: {
    // Document to store
    title: 'title',
    imageUrl: 'https://example.com/image.png'
  }
});
```

## 심플 노티피케이션 서비스(SNS)

### 여러개의 S3 이벤트 핸들러 함수 구현하기

만약 하나의 S3 버켓에 대해 두개의 이벤트 핸들러 함수를 구현하려면 어떻게 해야 할까?

- 웹소켓 노티피케이션 핸들러
- 이미지 리사이징 핸들러

즉, S3 버켓에 이미지가 업로드 되었을 때 위 2개 각각의 핸들러 함수가 작동해야 하는것이다. 하지만 S3는 오직 한개의 노티피케이션 타겟을 지원한다. 즉, S3 이벤트가 발생했을때 오직 한 개의 람다 함수만 호출할 수 있다.

심플 노티피케이션 서비스(SNS)라는 다른 서비스를 사용하여 이를 구현할 수 있다. S3 버켓에서 이벤트 발생시 SNS에게 이 이벤트를 보내고 SNS가 여러개의 다른 타겟 서비스에게 이벤트를 브로드 캐스팅하면 된다.

### SNS

![Simple_notification_service](/media/Simple_notification_service.png)

- 다른 서비스들에게 메시지를 보내주는 서비스이다.
  - 퍼블리셔: 메시지를 퍼블리싱
  - 구독자: 들어오는 메시지를 소비
- 퍼블리셔와 구독자는 토픽으로 연결됨
  - 하나의 토픽은 여러명의 구독자를 가질 수 있음
  - 구독자는 여러가지의 프로토콜을 사용할 수 있음(Lambda, http, email, sms, etc..)
- 토픽에 메시지가 보내지면 해당 토픽의 모든 구독자들에게 메시지가 전달됨
- Retry가 구현되어 있음(메시지 전달이 실패할 경우 구독자에게 메시지를 다시 보내는 것을 여러번 시도함)

### SNS 이벤트 샘플 코드

```js
exports.hander = async (event) => {

  // Get S3 event passed through SNS
  const s3EventStr = event.Records[0].Sns.Message;

  // Parse JSON string into an object
  const s3Event = JSON.parse(s3EventStr);
}
```

### SNS 토픽 생성

다음의 코드는 AWS `CloudFormation` 에서 제공하는 `Join` 함수를 사용하여 각 string 들을 붙여서 `arn`을 정의하고 있다. `Fn::Join:` 는 `Join`함수를 의미하고 첫번째 인자로 주어지는 `:`를 사용하여 그 다음의 모든 인자들을 붙여 하나의 string으로 만든다는 의미이다. 결과적으로 이 `resizeImage` 핸들러가 구독하는 SNS 토픽의 arn은 다음과 같이 정의된다. `arn:aws:sns:us-east-1:143036976037:myTopic`

```yaml
ResizeImage:
  handler: src/s3/resizeImage.hanlder
  events:
    - sns:
        arn:
          Fn::Join:
            - ":"
            - - "arn:aws:sns"
              - Ref: "AWS::Region"
              - Ref: "AWS::AccountId"
              - myTopic
        topicName: myTopic
```

# 인증

이번 인증 파트에서 공부할 내용은 다음과 같다. 

- 지금까지 구현한 API를 위한 인증 기능 구현하기
- 소셜 로그인과 연동하는 방법
  - OAuth 2.0, OpenID 프로토콜 사용
  - Auth0 라는 인증 서비스 사용
  - JWT 적용
- 시크릿키 안전하게 저장하기
- 람다 미들웨어 사용
  - 람다 함수의 보일러플레이트 부분 제거하고 복잡한 람다함수 단순화할 수 있음

  ## API 게이트웨이로 인증 구현하기
  - API 게이트웨이는 어플리케이션의 진입점이다.
  - API 게이트웨이로 인증을 구현하는 몇가지 방법이 있다.
    - IAM 인증 
    - 아마존 Cognito
    - 커스텀 인증

  ### 커스텀 인증

  이 수업에서는 커스텀 인증 방법을 이용하여 API 인증 기능을 구현한다. 인증이 구현되는 과정은 아래의 이미지와 같다. 사용자가 인증 서비스를 통해 로그인을 하며 해당 서비스에서는 우리의 어플리케이션에 토큰을 보내주고 해당 토큰이 API 게이트웨이에 전달되고 이는 다시 `authorizer`이라는 람다함수를 통해 해당 토큰의 유효성을 인증 서비스에 검증 받는 작업을 통해 사용자의 인증이 이루어진다. 인증이 정상적으로 이루어지면 `authorizer` 람다 함수는 `IAM 정책` 정보를 리턴하고  API 게이트웨이는 서비스를 구현한 람다 함수를 호출할 수 있게 된다. API 게이트웨이에는 캐싱 기능이 있어 인증 정보를 캐시해두어 불필요한 인증작업이 반복적으로 일어나는 것을 피할 수 있다.
  
![custom_authorizer](/media/custom_authorizer.png)

### 커스텀 인증 람다 함수 구현하기

커스텀 인증 람다 함수는 다음의 샘플코드처럼 이 요청이 호출할 수 있는 람다 함수를 정의하는 IAM 정책을 리턴한다.

```js
exports.handler = async (event) => {
   // Contains a token
   const token = event.authorizationToken

   // Check a token here

  return {
     principalId: 'user-id', // Unique user id
     policyDocument: {
       Version: '2012-10-17',
       Statement: [
         {
           Action: 'execute-api:Invoke',
           Effect: 'Allow',
           Resource: event.methodArn
         }
       ]
     }
   }

 }
```

한편, API 게이트웨이는 인증 람다 함수가 리턴한 결과를 캐싱할 수 있다. 이는 같은 토큰에 대해 인증 람다 함수를 반복해서 호출하지 않아도 되게끔 한다. 만약 리턴하는 IAM 정책이 현재 요청이 필요로 하는 함수만을 결과에 리턴한다면 이를 캐싱을 해두더라도 만약 사용자가 다른 함수 호출 요청을 보내면 인증이 실패하게 된다. 따라서 인증 람다함수는 현재 사용자가 접근할 수 있는 모든 함수를 정의하는 IAM 정책을 리턴하는 것이 좋다. 

리턴하는 IAM 정책을 다음과 같이 정의하면 이 사용자는 이 어플리케이션의 모든 람다 함수를 호출할 수 있다는 뜻이 된다. 

```js
{
     principalId: 'user-id', // Unique user id
     policyDocument: {
       Version: '2012-10-17',
       Statement: [
         {
           Action: 'execute-api:Invoke',
           Effect: 'Allow',
           Resource: '*'
         }
       ]
     }
   }
```

### Cors와 인증

- 응답 객체에 다음 헤더를 추가해야 한다. 
  - Access-Control-Allow-Credentials=true
- 먼저 인증 람다 함수에서 이 헤더를 리턴해야 하고 그 다음은 API 게이트웨이에서 클라이언트에게 이를 리턴해야 한다.
- 인증 람다 함수에서 인증이 실패하더라도 이 헤더는 셋팅이 되어야 한다. 
- 왜냐하면 인증 실패시 디폴트로 이 헤더 값이 셋팅되지 않기 때문에 클라언트의 웹브라우저는 인증 실패 코드가 아니라 잘못된 결과(Cors 에러)를 보여줄 것이기 때문이다.

이를 위한 API 게이트웨이 응답 리소스 설정은 다음과 같다.
```yaml
//serverless.yaml

resources:
  Resources:
    GatewayResponseDefault4XX:
      Type: 'AWS::ApiGateway::GatewayResponse'
      Properties:
        ResponseParameters:
          gatewayresponse.header.Access-Control-Allow-Origin: "'*'"
          gatewayresponse.header.Access-Control-Allow-Header: "'Content-Type, X-Amz-Date, Authorization'"
          gatewayresponse.header.Access-Control-Allow-Methods: "'GET,OPTIONS,POST'"
        ResponseType: DEFAULT_4XX
        RestApiId:
          Ref: 'ApiGatewayRestApi'
```

### Auth0 서비스

- 자체적으로 인증, 인가 서비스를 구현할 수 있지만 소요가 많이든다. 
- 이 수업에서는 Auth0 서비스를 사용한다. 
- 이는 인증, 인가를 위한 서비스이다.
- 다음의 항목들을 지원한다.
  - OAuth 2.0, OpenID
  - 소셜 로그인
  - Multi-factor 인증
- 무료 버전이 있다. 

### OAuth 과 OpenID

OAuth 프로토콜 탄생 배경

만약 채팅 어플리케이션을 만드는데 이 어플리케이션에서 특정 사용자의 Gmail에 등록된 연락처 목록을 가져오려면 어떻게 해야할까? 가장 직관적인 솔루션은 사용자가 이 채팅 어플리케이션에 지메일 아이디 비밀번호를 제공하여 채팅 어플리케이션에서 이 사용자의 gmail에 로그인하여 연락처 목록을 가져올 수 있을 것이다. 하지만 이 방법은 당연히 보안상으로 대단히 잘못되었다.

따라서 이 채팅 어플리케이션에서 Gmail에 접근하여 이 사용자의 연락처를 가져오는 것만 허용하도록 하는 방법이 필요했다. 이러한 방법을 제공하는 것이 `OAuth` 프로토콜이다. 

![OAuth_solution](/media/OAuth_solution.png)

### OAuth Flow

- 다음은 두 시스템간에 상호작용을 할 수 있도록 지원하는 프로토콜이다. 
  - OAuth 2.0 : 써드 파티 서비스가 다른 서비스의 리소스에 접근할 수 있도록 인가하는 프로토콜이다. 
  - OpenID: OAuth 프로토콜 위에서 인증을 제공하는 프로토콜이다. 

![OAuth_flow](/media/OAuth_flow.png)

### Auth0 인증 서비스 Flow

AuthO 인증 서비스를 이용하여 인증이 이루어지는 과정은 다음과 같다.

1. Auth0 서비스로 인증하려면 웹브라우저는 먼저 Auth0 페이지로 리디렉션하고 Auth0 서비스가 나중에 토큰을 반환하고 액세스하는 데 사용할 콜백 URL을 제공해야 한다.
2. 이제 Auth0와 상호 작용하는 방식에 따라 로그인 방식을 선택할 수 있다. Google, Facebook 또는 기타 서비스를 통해 로그인하면 된다.
3. 로그인이 완료되면 Auth0는 초기 리디렉션 동안 제공된 콜백 URL에 인증토큰이 추가된다. 
4. 이는 API Gateway로 전송하는 데 사용할 수있는 토큰이다. API Gateway로 이 토큰을 보내면 이를 다시 Lambda 함수로 보낼 수 있고 람다 함수는 이 토큰이 유효한 토큰인지 확인한다.

![Auth0_flow](/media/Auth0_flow.png)

### JWT 토큰 검증

- Auth0 서비스는 `JWT 토큰`을 리턴한다. 
- JWT 토큰은 Auth0에 의해 sign이 되었다. 

Auth0는 다음 두가지 방법중에 한가지로 JWT 토큰을 싸인할 수 있도록 지원한다. 

- Symemetric(HS256) : 하나의 키로 토큰을 싸인(Auth0)하고 검증(어플리케이션)한다.
  - 키를 안전하게 보관해야 한다. 
  - 키가 노출되면 해커가 불법적으로 JwT 토큰을 생성할 수 있다. 

![HS256](/media/HS256.png)

- Asymmetric(RS256) : JWT 토큰을 싸인하고 검증하는데 서로 다른 키가 사용된다. 
  - 하나의 키는 JWT 토큰 싸인에 필요하다 (Auth0 가 키 보관)
  - 토큰 검증에 certificate를 사용
![RS256](/media/RS256.png)

- 이 수업에서는 싸인 알고리즘으로 HS256을 채택한다. 시크릿키를 관리하는 방법을 적용할 수 있음.

### Nodejs에서 JWT 토큰 검증 샘플코드

```js
import { verify } from 'jsonwebtoken'

 const jwtToken = '...'
 const secret = '...'

 verify(jwt, secret)
 // If an exception is not thrown a JWT is valid
```

### 서버사이드 쿠키(세션)

세션은 HTTP 서버에서 설정한 쿠키이지만 웹브라우저에서 실행되는 JavaScript 코드에서는 이 값을 사용할 수 없다. 세션의 값은 웹브라우저에서만 사용할 수 있으며 웹브라우저에서 서버에 보내는 요청과 함께 일반 쿠키로 자동으로 서버에 전송된다. 웹브라우저에서 실행되는 JavaScript 코드에는 이 쿠키 값을 사용할 수 없으므로 악성 코드가 이 쿠키에 접근할 수 없다. JWT 토큰이 세션에 저장된 경우, 보다 안전한 방식으로 이를 인증에 사용할 수 있다.


## 시크릿 키 저장

현재 JWT 토큰의 유효성 검증을 위한 시크릿 키를 환경변수에 저장하고 있지만 이는 좋은 방법이 아니다. AWS 콘솔에 접근할 수 있는 누구나 시크릿 키에 접근할 수 있기 때문이다. 시크릿 키를 저장하기 위한 몇가지 특별한 서비스가 있다. 

- SSM 파라미터 스토어
- AWS 시크릿 매니저
- Non-AWS 서비스

### SSM 파라미터 스토어

[공식문서](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) 참고

- 중앙화된 환경설정 저장소이다.
- 값들은 암호화되어 보관된다
- 추가 비용이 들지 않는다.
- 암호화는 KMS에 의해 진행된다. 

### AWS 시크릿 매니저
[공식문서](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) 참고

- 시크릿을 저장하기 위한 서비스이다.
- 모든 값들은 암호화되어 보관된다
- 시크릿 로테이션을 지원한다. 
- 리퀘스트당 비용이 들고, 시크릿당 비용이 청구된다.
- 암호화는 KMS에 의해 진행된다.

### KMS(Key Management Service)

위의 시크릿 키를 저장하는 클라이언트들이 KMS에 시크릿 암호화를 진행하는 과정은 아래의 이미지와 같다. 추가적으로 KMS에는 각 키를 접근할 수 있는 권한에 대한 IAM 정책을 설정할 수 있다.
![Key_management_service](/media/Key_management_service.png)

### AWS 시크릿 매니저 샘플코드

```js
const client = new AWS.SecretManager();

const data = await client.getSecretValue({
  SecretId: 'secret-id'
}).promise()

const secret = data.SecretString
```

## 람다 미들웨어

serverless 어플리케이션에서도 Nodejs 서버와 같이 미들웨어를 사용할 수있다. `middy`라는 라이브러리를 사용하여 이를 구현할 수 있다. 다음은 `middy` 미들웨어 샘플 코드이다.

```js
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
     ...
  }
)

handler
  .use(cors())
```

# Best Practices

## serverless 어플리케이션 로컬에서 실행하기

serverless 어플리케이션을 로컬에서 실행하는 방법은 2가지 방법이 있다.

- `invoke` 명령어 사용
- `serverless-offline` 플러그인 사용

### serverless-offline 플러그인

- Api 게이트웨이와 람다를 에뮬레이트한다.
- 람다 함수를 호출할 수 있는 로컬 웹 서버를 실행한다.
- 기능이 많다.
  - Authorizers, 람다 integration, CORS, etc.
- 로컬 디버깅 허용
  - 로컬 프로세스에게 디버거를 달 수 있다.
- 다른 서비스를 에뮬레이트하는 플러그인과 호환된다.
  - DynamoDB, Kinesis, SNS, etc


Severless 앱을 로컬에서 실행하기 위해서는 다음의 코드가 `serverless.yaml`에 추가되어야 한다.

```yaml
plugins:
  - serverless-dynamodb-local
  - serverless-offline
custom:
  serverless-offline:
    port: 3003
```

또한 DynamoDB를 로컬에서 사용하기 위해서는 다음 명령어를 통해 dynamodb를 로컬에 설치해야 한다.

```
sls dynamodb install
sls dynamodb start
```

다음 명령어는 serverless 웹서버를 로컬에서 실행한다.

```
sls offline
```

### 로컬 환경에서의 이슈
- 람다와/ API 게이트웨이를 완
전하게 에뮬레이트하지는 못한다.
- 로컬 Nodejs 환경에서 실행되기 때문에 serverless 실서버 환경과 다를 수 있다.
- 다른 서비스들의 로컬 에뮬레이션에 의존성이 있다.
  - 로컬 에뮬레이션을 정확하지 않을 수 있고 모든 기능을 지원하지 않을 수 있다.
- 로컬 환경에서의 serverless 앱 실행이 유용할 수 있지만 완전한 테스트를 위해서는 AWS에 배포가 되어야 한다.

[Serverless Offline 플러그인](https://github.com/dherault/serverless-offline)에서 추가적으로 이와 관련된 정보를 확인 할 수 있다.

## Ports and Adpaters 아키텍쳐

`ports and adapters` 아키텍쳐는 어플리케이션을 두가지 메인 컴포넌트로 나누는 것이다.

- `비즈니스 로직` : 외부의 서비스와 독립적인 어플리케이션의 비즈니스 로직을 작성하는 부분이다.

- `ports and adapters` : 외부의 서비스와 상호작용 하는 부분이다.(데이터베이스, 메시지큐 등)

## Serverless 모니터링

서버리스 마이크로 서비스 어플리케이션을 모니터링하는 방법은 크게 3가지가 있다. 

- `metrics` : 애플리케이션이 어떻게 동작하는지에 대한 집계된 값(aggregated)을 보여준다. (ex. 클라이언트 요청의 개수)

- `logging`: 이벤트 하나하나를 기록한다.

- `Distributed Tracing`: 엔드투엔드 요청 실행에 대한 정보를 기록 할 수 있다. `Distributed Tracing`의 특징은 요청을 보내는 사용자의 관점에서 시스템과의 상호작용을 보여준다.

### CloudWatch 로그와 엘라스틱서치 

모든 Lambda 함수에서 발생하는 `standard ouput`은 AWS의 중앙 로깅 스토리지인 CloudWatch 로그에 쌓인다.


이번 수업에서는 로깅을 위해 간단히 `console.log()`를 사용했지만 프로덕션 애플리케이션에서는
적절한 로깅 라이브러리를 사용하는 것이 좋다. 또한 로그 메시지를 남길때 엄격한 형식을 사용하여 작성하는 것이 좋다. 그 이유는 로그에서 무언가를 검색하려는 경우
엄격한 형식을 사용하여 특정 클래스에서 생성 된 모든 로그 기록을 찾는 등의 검색을 할 수 있기 때문이다. Lambda 함수에서 남긴 로그를 사용하는 것 외에도 API Gateway에서 로깅을 활성화 할 수도 있다. 그러면 Api Gateway에서의 수신에 대한 정보를 기록 할 수 있다.

규모가 큰 어플리케이션에서는 클라우드워치만으로는 로깅 시스템을 구축하기 충분하지 않을 수 있다. 이때 우리는 Elasticsearch를 사용할 수 있다. 현재 Elasticsearch는 로깅 스토리지로 항상 선택되는 솔루션이다.

아래의 이미지와 같이 클라우드 워치 로그에 쌓인 로그 기록들을 엘라스틱 서치로 보내는 람다함수를 적용하여 엘라스틱 서치를 어플리케이션의 로깅 시스템으로 활용할 수 있다. 

![cloudWatch_logs_and_elasticsearch](/media/cloudWatch_logs_and_elasticsearch.png)

### Distributed Tracing

`AWS X-RAY`를 통해 `Distributed Tracing`을 구현할 수 있다.

- 애플리케이션이 특정 요청 실행에 대한 정보를 보낼 수 있도록 한다.
- 시스템의 중앙화된 뷰로 각 데이터를 집계하고 이러한 데이터들로 시스템의 맵을 생성한다.

`AWS X-Ray`가 생성 할 지도는 아래의 이미지와 같다.
예를들어 API Gateway가 호출하는 람다 함수를 보여주고 각 람다 함수가 상호작용하는 `DyanmoDB` 등의 모든 리소스를 보여준다. 그리고 각 리소스와의 성공한 요청 수, 실패한 작업 수에 대한 정보도 표시한다. 
DynamoDB의 경우 얼마나 많은 요청이 제한(throttled)되었는지도 보여준다.

![aws_x-ray_map](/media/aws_x-ray_map.png)


따라서 우리는 이를 통해 시스템이 전체적으로 어떻게 동작하는지 확인 할 수 있다. 시스템의 다른 구성 요소가 서로 상호 작용하는 방식을 볼 수 있고 얼마나 많은 오류가 있고 어디에서 오류가 발생하는지 확인할 수 있다. 

또한 이것들이 서비스를 사용하는 고객에게 미치는 영향도 확인할 수 있다. 사용자가 영향을 받은 요청 수와 요청 처리 단계를 확인할 수 있다.

`Distributed Tracing`을 사용하면 오류가 발생한 위치를 식별 할 수 있다. X-Ray가 특정 요청이 소요되는 시간을 기록하기 때문에 어플리케이션의 성능 문제도 파악할 수 있게 된다.

### AWS X-RAY 용어

![aws_x_ray_terminology](/media/aws_x_ray_terminology.png)

- `trace` : 다양한 X-Ray의 단일 요청이다.
- `segment` : 단일 요청의 각 실행 개별단계는 세그먼트이다.
- `sub-segment`: 세그먼트 하위에 있는 각 개별 오퍼레이션이다.

### X-RAY 추적 방법

`AWS X-ray`가 단일 `trace`를 구성하는 방법은 먼저 API Gateway는 HTTP 헤더에서 추적 ID `X-Amzn-Trace-Id`를 전달한다. `trace`를 생성하기 위해서는 이 추적 ID를 요청의 흐름대로 전달해야한다.
적절한 툴을 사용하면 이 헤더가 자동으로 전달 될 수 있다.

### X-RAY 대몬

![aws_x_ray_daemon](/media/aws_x_ray_daemon.png)

- X-ray 대몬은 서버에서 개별 어플리케이션으로 실행된다.
- 어플리케이션으부터 `tracing` 정보를 전달받는다.
  - 해당 `tracing` 정보들을 버퍼에 쌓아놓고 비동기로 데이터를 전달한다.
- 이미 AWS 람다와 통합된 서비스이기 때문에 `X-ray` 대몬을 사용하기 매우 쉽다.

### X-RAY 사용하기

`X-Ray`를 사용하여 람다함수의 `trace`를 추적하기 위해서는 `serverless.yaml`파일에 다음 설정을 해줘야 한다.

```yaml
# serverless.yaml

tracing:
  lambda: true
  # apiGateway 에서도 사용 가능
  # apiGateway: true
```

또한 코드 상에서는 다음과 같이 사용할 수 있다.

```js
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

const docClient = new XAWS.DynamoDB.DocumentClient()

// Perform request and record a sub-segment
const item = docClient.get(...).promise()
```