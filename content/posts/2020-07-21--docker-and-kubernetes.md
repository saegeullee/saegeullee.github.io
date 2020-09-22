---
title: 도커와 쿠버네티스 - The Complete Guide
date: '2020-07-21T11:50:37.121Z'
template: 'post'
draft: true
slug: '/microservices/docker-and-kubernetes'
category: 'microservices'
tags:
  - 'docker'
  - 'kubernetes'
description: ''
socialImage: '/media/image-2.jpg'
---

## DOCKER 포트 맵핑하여 컨테이너 실행

다음은 도커 컨테이너를 실행할때 내 컴퓨터의 로컬호스트의 특정 포트로 들어오는 http 요청을 도커 컨테이너의 포트로 맵핑해주는 명령어이다.

아래의 명령어 중 `8080:8080` 부분의 앞 `8080`은 로컬호스트의 8080 포트로 들어오는 요청을 이 도커 컨테이너의 `8080`포트로 포트 포워딩을 하라는 의미이다.

```
docker run -p 8080:8080 <image name>
```

## 컨테이너 실행과 동시에 해당 컨테이너의 인터페이스 접속하기

```
docker run -it lemix777/simpleweb sh
```

## Docker compose

### docker compose 명령어

다음의 명령어는 도커 이미지를 실행한다.

```
docker-compose up
```

백그라운드에서 실행은 `-d` 옵션을 주면된다.

```
docker-compose up -d
```

다음의 명령어는 최신 도커 이미지를 빌드하고 실행한다.

```
docker-compose up --build
```

실행중인 모든 컨테이너 Stop

```
docker-compose down
```

실행중인 컨테이너 확인

```
docker-compose ps
```

## Docker-compose로 하는 컨테이너 유지보수

먼저 Nodejs 프로세스 `exit code` 대해 알아야 한다. Nodejs에서 `process.exit()` 의 인자로 주는 `exit code`는 다음과 같다.

```
exit code

0 - we exited and everything is OK
1, 2, 3, etc - We exited because something went wrong!
```

`docker-compose`에는 `Restart Policy(재시작 정책)`이 있다.

- `"no"` : 컨테이너가 멈추거나 crash되더라도 절대 재시작 하지 말 것
- `always` : 컨테이너가 어떤 이유에서든지 멈춘다면 항상 재시작할 것
- `on-failure`: 컨테이너가 에러코드와 함께 멈춘다면 재시작할 것
- `unless-stopped`: 개발자가 강제로 멈춘게 아니라면 항상 재시작할 것

어떤 exit 코드로 Nodejs 서버가 종료되었는지에 따라 그리고 `docker-compose.yaml` 파일에 지정한 특정 서비스의 `restart policy` 에 따라 도커는 해당 어플리케이션을 재시작한다. `no` 같은 경우는 `restart: "no"`와 같이 quotation과 함께 지정해줘야 한다. `yaml` 파일에서 `no`는 `false`의 의미이기 때문이다.

=============section6============

## 커스텀 도커파일로 도커 이미지 빌드하기

다음 명령어를 통해 커스텀 도커파일로 도커 이미지를 빌드할 수 있다.

```
docker build -f Dockerfile.dev .
```

## CRA 리액트 앱을 도커컨테이너에서 실행

CRA의 업데이트로 인해 `-it` 옵션을 추가해야 실행이 된다.

```
docker run -it -p 3000:3000 IMAGE_ID
```

## 도커 볼륨

![docker-volumn](/media/Docker_volumn.png)

만약 이미 도커 이미지로 빌드된 특정 어플리케이션의 일부분을 수정하고 이를 반영하려면 도커 이미지를 다시 빌드해야 한다. 하지만 도커 볼륨을 사용하면 도커 이미지를 빌드할 때 복사한 로컬의 폴더 및 파일들의 레퍼런스를 로컬 폴더로 설정하게 되어 어플리케이션 코드를 업데이트 할 때마다 이를 다시 빌드 하지 않아도 컨테이너에 반영되도록 할 수 있다.

다음의 명령어를 통해 이를 수행할 수 있다. 흠 그런데 현재 나의 환경에서는 도커 볼륨이 적용되지 않는다..

```
docker run -p 3000:3000 -v /app/nodemodules -v ${pwd}:/app image_id
```

## 테스트 실행하기

```
docker run -it <image_id> npm run test
```
