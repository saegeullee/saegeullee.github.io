---
title: Nodejs 서버 아마존 ec2에 배포하기
date: '2019-12-06T11:50:37.121Z'
template: 'post'
draft: false
slug: '/nodejs/deploy-nodejs-server-to-aws-ec2'
category: 'nodejs'
tags:
  - 'nodejs'
  - 'aws'
description: '이번에 클래스101과 협업을 하면서 내부 인사팀 툴을 개발 후 서버 배포까지 했다. 원래는 클래스101 개발자의 가이드를 받아 아마존 람다에 배포를 하려 했지만.. 처음해보는 것이라 배포 진행이 잘 안되었고 일정상 시간을 더이상 지체하면 안되기 때문에 아마존 ec2에 배포하는 것으로 선회했다. 데이터베이스는 아마존의 documentDB를 사용했다. 배포 과정을 정리해보겠다. 아마존 ec2는 이미 설치가 되어있다고 가정한다....'
socialImage: '/media/image-2.jpg'
---

이번에 클래스101과 협업을 하면서 내부 인사팀 툴을 개발 후 서버 배포까지 했다. 원래는 클래스101 개발자의 가이드를 받아 아마존 람다에 배포를 하려 했지만.. 처음해보는 것이라 배포 진행이 잘 안되었고 일정상 시간을 더이상 지체하면 안되기 때문에 아마존 ec2에 배포하는 것으로 선회했다. 데이터베이스는 아마존의 documentDB를 사용했다. 아마존 ec2는 이미 설치가 되어있다고 가정하고 그 이후의 배포 과정을 정리해보겠다.

## 아마존 ec2에 접속

아래의 명령어를 통해 ec2에 접속한다. pem키가 현재 디렉토리에 있다면 아래의 명령어로 접속이 가능하고 특정 폴더안에 있다면 pem키 앞에 디렉토리 경로까지 넣어줘야 한다. @ 뒷 부분은 ec2 인스턴스에 할당받은 IPv4 퍼블릭 IP이다.

```
ssh -i your_pem_key.pem ubuntu@13.180.55.29
```

## 아마존 ec2 보안그룹 설정

이 프로젝트를 배포한 아마존 ec2 인스턴스는 https 프로토콜을 사용하기 때문에 ec2 인스턴스의 보안그룹을 다음과 같이 구성한다.

![aws security group](/media/aws_security_group.png)

## node 설치

ec2 서버에 접속이 되었다면 아래의 명령어를 통해 서버컴퓨터에 nodejs를 설치한다.

```
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get update
sudo apt-get install nodejs
```

설치가 완료되면 버전을 확인해본다.

```
$npm -v
6.11.3
$node -v
v10.17.0
```

## 프로젝트 클론받기

```
git clone 깃헙 프로젝트 주소
```

프로젝트 폴더로 들어간 뒤 `npm install`

## env 파일 셋팅

env 파일에는 디비 주소와 jwt 시크릿키, 포트번호 등등 애플리케이션 구동에 필요한 중요한 정보들을 넣어준다. 당연히 이 파일은 깃헙에 푸쉬하지 않았기 때문에 따로 .env 파일 생성 후 정보를 넣는다. 이 셋팅은 `.dotenv` 패키지를 사용해서 `process.env`를 활용하여 코드에서 필요한 정보를 임포트할 때 필요하다.

```
.env
PORT = 3030
MONGO_URI = "mongodb://username:password@docdb-2019-12-04-08-28-37.cluster-anjqshbqacab.ap-northeast-2.docdb.amazonaws.com:27017/jumsul?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0"
JWT_SECRET = "your_jwt_secret_key"
```

## DB 구축

DB구축은 ec2 배포 전에 해두는 것이 좋다. 지금 단계에서 해도 상관은 없다. 위의 env파일 셋팅을 보면 몽고 db와 연결해주는 부분이 있다. URI에서 유추해볼 수 있듯이 나는 아마존 documentDB를 사용하였다.<br>
**[아마존 documentDB에 DB 구축하기](https://saegeullee.github.io/nodejs/amazon-documentdb)** 참고

## 서버를 백그라운드 프로세스로 돌리기 위한 셋팅

서버는 반드시 백그라운드에서 돌려야 한다. 그렇지 않으면 ec2를 접속한 터미널을 종료하면 동시에 서버가 꺼지기 때문이다. 개발자가 ec2 접속을 종료해도 서버는 계속 서버 컴퓨터에서 돌아가서 서비스를 해야 한다. 이를 위해 `pm2`로 서버를 백그라운드에서 돌린다. 먼저 pm2를 글로벌로 설치한다.

```
npm install pm2 -g
```

pm2로 서버를 구동시킨다.

```
pm2 start app.js
```

아래 명령어를 통해 pm2로 실행되고 있는 어플리케이션 목록을 확인할 수 있다.

```
pm2 list
```

실행 중인 서버 멈추기

```
pm2 stop app
```

> **[npmjs pm2 참고](https://www.npmjs.com/package/pm2)**

## 절대경로 설정

위와 같은 방법으로 서버를 실행하면 경로 에러가 발생한다. 나는 이번 프로젝트 코드에서 각 모듈들을 임포트할 때 상대경로가 아닌 절대경로로 잡았는데 pm2로 서버를 백그라운드에서 구동하면 pm2가 절대경로에 대해 모르기 때문이다. 개발 할 때는 아래의 package.json 에 start 스크립트를 통해 프로젝트에서 절대경로를 사용할 수 있도록 셋팅했다. `NODE_PATH=./` 이 부분을 적어주면 프로젝트 파일에서 필요한 모듈을 절대경로로 임포트할 수 있다. 모듈 임포트를 할때 `./../../models/member` 와 같이 상대경로가 아니라 `models/member`와 같이 절대경로로 임포트를 할 수 있게 된다. 프로젝트 파일의 어떤 위치에서든 동일한 절대경로로 필요한 모듈을 임포트할 수 있다. 아래와 같은 스크립트를 짰으니 서버를 돌릴 때 `npm start`만 해주면 서버가 스크립트대로 실행이 된다.

```
//package.json
  "scripts": {
    "start": "NODE_PATH=./ nodemon server.js"
  },
```

하지만 pm2를 통해 서버를 실행시키면 어떻게 될까? pm2는 package.json 의 start script에 대해 모르기 때문에 절대 경로를 설정하는 `NODE_PATH=./`에 대해 모른다. 원래대로 `pm2 start server.js` 명령어로 실행하면 모듈 임포트 에러가 발생한다. 그래서 pm2에게 이 프로젝트는 상대경로가 아닌 절대경로로 실행을 해야만 한다는 것을 알려줘야 한다.

이를 위해 process.json 파일을 만든다. 이 파일은 pm2에게 절대경로를 사용할 것과 서버를 실행시키기 위한 파일을 알려주는 코드이다.

```javascript
//process.json
{
"apps": [{
    "env": {
        "NODE_PATH": "./"
    },
    "script": "./server.js",
}]
}
```

이제 서버를 백그라운드에서 돌릴 준비가 다 되었다. 아래의 커맨드를 통해 서버를 실행하면 된다.

```
sudo pm2 start process.json
```

아래의 명령어를 통해 pm2로 구동중인 어플리케이션의 목록을 확인해 볼 수 있다.

```
sudo pm2 list
```

![aws deploy](/media/aws-deploy.png)

## reference

**[AWS EC2 보안그룹 설정](https://zamezzz.tistory.com/301)**
