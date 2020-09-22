---
title: Udacity Cloud Developer - Microservices
date: '2020-06-12T11:50:37.121Z'
template: 'post'
draft: false
slug: '/microservices/microservices'
category: 'microservices'
tags:
  - 'microservices'
description: '유다시티 Cloud Developer 과정에서 Microservices 파트를 듣고 정리한 부분이다.'
socialImage: '/media/image-2.jpg'
---

> **[유다시티 Cloud developer 과정](https://www.udacity.com/course/cloud-developer-nanodegree--nd9990)** 수업을 듣고 정리한 내용입니다.

# 목차

- [마이크로서비스에 대한 소개](#마이크로서비스에-대한-소개)
- [마이크로서비스 디자인 원칙과 Best Practice](#마이크로서비스-디자인-원칙과-best-practice-1)
- [도커를 활용한 컨테이너](#도커를-활용한-컨테이너)
- [어플리케이션 개발 라이프사이클 자동화하기](#어플리케이션-개발-라이프사이클-자동화하기)
- [쿠버네티스로 하는 Orchestration](#쿠버네티스로-하는-orchestration)
- [서비스 등록, 디스커버리 & 스케일링](#서비스-등록-디스커버리--스케일링)

### 이 수업을 듣기 위해 필요한 사전지식

- 자바스크립트와 HTML 을 활용한 프론트엔드 개발
- Nodejs를 활용한 백엔드 개발
- AWS RDS
- AWS S3
- Git

# 마이크로서비스에 대한 소개

### Microservice vs Monolith Architecture

![micro-and-mono](/media/micro-and-mono.jpg)

### Monolith

- 더 강력하고 값비싼 머신을 활용함
- 코드베이스가 중앙화되어있고 관리하기 쉬움
- 프로젝트 내에서 코드가 쉽게 공유됨
- 어플리케이션의 전체에 대해 worst-case 스코프로 사용됨(Scoped for worst-case usage across all parts of the application)

### Microservice

- 더 작고 비용 효율적인 머신을 활용함
- 팀과 비즈니스에게 더 알맞고 유연한 어플리케이션 로직을 구현할 수 있음
- 특정 비즈니스 목적을 린하게 달성하기 용이함
- 다른 어플리케이션을 개발하기 위한 인터페이스를 셋업해야함

### 배포의 중요성

코드에서 업데이트 된 부분을 배포하는 일은 중대한 일임. 어플리케이션의 잠재적 버그, 작동하지 않는 시간(downtime), 소비자에게 배포 된 이후의 일들에 대해 고려해야 함.

## 비즈니스 가치

### 비즈니스 요구사항이 팀을 이끈다

팀은 비즈니스 니즈에 의해 조직될 수 있고 고객 요구사항에 더 집중함. 누가 무엇을 담당하는지에 대한 분명한 오너십이 있음.

### 팀은 병렬적으로 일 할 수 있다.

프로젝트는 독립적으로 배포되기 때문에, 팀들은 서로 다른 팀에 종속되지 않게 개발과 배포를 할 수 있음.

### 기술적 유연성

팀은 특정 기술에 제한되지 않고 비즈니스 니즈와 팀에 적합한 기술을 선택할 수 있음.

## Microservice를 사용하지 않아야 할 때

Microservice 디자인은 또 다른 아키텍쳐 패턴임. Monolith 어플리케이션을 대체하기 위한 목적이 아님. 트레이드오프 비용을 생각하지 않고 Microservice 어플리케이션을 개발하면 오히려 생산성을 저하시키는 일이 될 수 있음.

### 시스템 복잡도

Microserivce를 사용하면, 단일 어플리케이션을 배포하기 보다는 여러 개의 모듈을 각각 배포하게 됨. 프로젝트를 셋팅하는데 더 많은 오버헤드가 듬.

### 네트워크 지연

모듈의 분리로 인해 어플리케이션의 성능에 레이턴시가 증가함 그리고 어플리케이션을 디버깅하기 어려워짐.

### 디버깅이 어려워짐

버그를 찾기 위해 더 이상 스택트레이스나 디버깅 툴에 의존하기 어려워짐. 버그의 원인을 찾기위해 로깅에 의존하게 될 수 있음.

## 이 수업에서 배울 것들

### 마이크로서비스 디자인 원칙과 Best Practice

- 여러가지 마이크로 서비스 디자인에 대한 설명
- 어플리케이션을 마이크로서비스로 분리함

### Docker를 활용한 컨테이너

- Docker를 활용한 컨테이너 이미지를 구축 및 운영
- 컨테이너 디버깅
- 컨테이너 레지스트리에 컨테이너 이미지 보관

### 독립적인 출시와 배포

- CI/CD 의 장점 이해하기
- Travis를 사용하여 CI/CD 파이프라인 구축
- 깃헙과 CI/CD 통합, CI를 사용하여 테스트 자동화
- Jenkins를 포함하여 Travis를 대체할 수 있는 툴 이해하기

### 쿠버네티스를 사용하여 서비스 Orchestration 하기

- 쿠버네티스의 핵심 이해하기
- auto-scaling, self-healing 되는 쿠버네티스 클러스터 설정 및 런칭
- 쿠버네티스 클러스터를 사용하여 마이크로서비스 어플리케이션 배포
- ECS and Fargate 를 포함한 배포 전략의 다른 방법들 이해하기

### 프로덕션을 위한 쿠버네티스 서비스 보안과 튜닝

- 리버스 프록시를 사용하여 적절한 백엔드로 요청 보내기
- 마이크로스비스 보안
- 각 서비스에 확장성과 self-healing 설정하기
- 내부, 외부 트래픽의 차이 이해하기

### 디버깅, 모니터링, 로깅

- 마이크로서비스에 log를 남기는 best practice 사용하기
- 로그를 사용하여 디버깅을 하기 위한 metrics 캡쳐하기
- 마이크로서비스를 배포하기 위한 모니터링과 로깅 구현하기
- 클라우드 어플리케이션에 회복성과 가용성 발전시키기

### 이 수업에서 사용되는 툴

- AWS
- Travis CI
- Github
- Dockerhub

### 소프트웨어 요구사항

- npm
- Docker
- git

# 마이크로서비스 디자인 원칙과 Best Practice

## 마이크로서비스의 특징

### Communication

- 네트워크를 통한 서비스들의 통신
- 최근 가장 흔히 사용하는 네트워크 인터페이스인 REST

### 독립적인 배포

- 한 서비스의 배포는 또 다른 서비스에 영향이 없음

### 고장 허용범위(fault tolerant)

- 다른 마이크로서비스가 working 하지 않을때도 대응할 수 있는 코드를 작성해야함

![arch-designs](/media/arch-designs.jpg) 각 마이크로서비스는 독립적이고 네트워크를 통해 통신한다.

**[마이크로서비스에 대한 추가 학습자료](https://martinfowler.com/articles/microservices.html)**

### Exercise. 다음의 monolith 아키텍쳐 어플리케이션을 microservice 아키텍처를 갖도록 다이어그램을 작성하시오

![monolith-diagram](/media/monolith-diagram.jpg)
monolith application
![microservice-diagram](/media/microservice-diagram.jpg)
microserivice application - 이 경우는 데이터베이스를 분리하여 각 API를 담당하게끔 설계함

## 마이크로서비스 어플리케이션으로 분리하기

모놀리스 어플리케이션을 마이크로서비스 어플리케이션으로 분리하기 위해서는 먼저 어플리케이션의 모듈과 디펜던시들을 맵핑해봐야 한다. 이는 디펜던시 그래프를 그려봄으로써 한 눈에 직관적으로 모듈과 디펜던시들의 관계를 살펴볼 수 있다.

![dependency-graph](/media/dependency-graph.png)

이를 통해 특정 모듈 또는 디펜던시의 변경이 어느곳에 영향을 미칠지를 이해할 수 있고 어플리케이션의 어느 부분을 먼저 리팩토링할지 결정할 수 있다. 디펜던시 그래프에서 가장 적은 디펜던시를 가지고 있는 모듈이 다른 모듈들에 잠재적으로 가장 적은 영향을 미칠 것이다.(least downstream effects) 아래의 그림에서 A 모듈이 어플리케이션 전체에 대해 가장 적은 downstream effect를 미칠 것이다. 따라서 A 또는 B가 먼저 리팩토링해야 할 모듈의 후보군이 될 수 있다. 반면에 아마 B와 D를 먼저 리팩토링하면 안될 것이다.

![dependency-graph 2](/media/dependency_graph_2.png)

위의 과정을 통해 어플리케이션에서 먼저 리팩토링해야 할 모듈을 찾았다면 그 다음에는 `Strangler Pattern`을 사용하여 진행할 수 있다. 이는 레거시 어플리케이션을 마이그레이트하는데 일반적이고 효율적인 방법이다. 이는 기존의 코드를 새로운 버전으로 대체하기 보다는 어플리케이션의 컴포넌트를 조금씩 점진적으로 교체 해나가는 것이다.

### strangler pattern 사용

![strangler-1-centered](/media/strangler-1-centered.jpeg)
monolith 어플리케이션
![strangler-2-centered](/media/strangler-2-centered.jpeg)
step1. 장바구니를 먼저 마이크로서비스로 분리한다(strangle)
![strangler-3-centered](/media/strangler-3-centered.jpeg)
step2. 카탈로그를 마이크로 서비스로 분리한다
![strangler-4-centered](/media/strangler-4-centered.jpeg)
step3. 프론트엔드를 마이크로 서비스로 분리한다

**[strangler 패턴 추가 학습자료](https://docs.microsoft.com/en-us/azure/architecture/patterns/strangler)**

<!-- ### Exercise. 다음의 이커머스 웹사이트의 아키텍쳐를 마이크로서비스로 나누시오

![e-commerce-website-diagram](/media/e-commerce-website-diagram.jpg)

Dependency graph
![e-commerce-dependency-graph](/media/e-commerce-dependency-graph.jpg)

- 디펜던시 그래프는 어떤 모듈을 먼저 리팩토링할지에 대한 결정을 하는데 도움을 주는 시각화 방법이다.
- 의사결정을 하는데 비즈니스의 기능들도 추가적으로 고려를 해야한다.
- 리팩토링을 하는데 데이터베이스 복잡도를 고려해야한다. 단순해보이는 서비스이더라도 데이터베이스를 함께 보면 리팩토링하는데 복잡해질 수 있다. -->

## 추가적으로 고려해야 할 것들

트레이드오프 - 소프트웨어를 디자인하는 일은 단순한 바이너리 프로세스가 아니다. 맞고 틀림은 거의 없으며 기술적인 것과 비즈니스 적인 것의 트레이드오프의 균형을 맞추는 일이다.

트레이드오프에 포함될 수 있는 것들(인프라 비용, 개발 시간, 기술부채 관리)

마이크로서비스로의 리팩토링은 단순히 코드를 리팩토링하는 것은 아니다. 데이터베이스와 인프라 전체에 대해 고려해야 한다.

# 도커를 활용한 컨테이너

- 컨테이너는 어플리케이션이 구동되는데 필요로 하는 모든 디펜던시를 포함하고 있는 독립적인 어플리케이션임
- 컨테이너는 배포의 한 유닛으로 생각할 수 있음.
- 컨테이너는 배포하는 과정을 하나의 work 유닛으로 만들어주어 배포 과정을 단순화시켜줌
- 컨테이너로 코드를 롤백하는 것은 단순히 예전의 스냅샷으로 다시 배포하는 것임

- 컨테이너는 배포를 쉽게 만들어주지만 마법처럼 배포 중에 생기는 문제들을 해결해주지 않음
- 코드가 하나의 환경에서는 문제없이 동작하더라도 다른 환경에서는 그렇지 않을 수 있음
- 컨테이너는 수명이 짧다. 컨테이너는 stateless 해야하며 곧 소멸될 것으로 기대함

- 각각의 컨테이너는 각각 버전의 소프트웨어로 구동된다.
- 컨테이너는 독립적이기 때문에(self-contained) 배포를 한다는 것은 단순히 현재의 컨테이너를 새로운 것으로 교체한다는 의미이다.

## 컨테이너

- 배포 프로세스를 단순화해줌
- 필요한 모든 것들이 코드에 번들되어 있음
- 배포가 쉬움
- 디버깅이 쉬움

## Docker

도커는 컨테이너의 생성과 라이프사이클을 관리하도록 도와주는 플랫폼이다. 어떤 어플리케이션을 배포할 때 도커 이미지로 패키징할 수 있다. 도커 이미지는 어플리케이션의 모든 코드와 디펜던시를 포함하고 있다. 도커 컨테이너는 도커 이미지를 실행하는 수명이 짧은(ephemeral) 인스턴스이다. (A Docker container is an ephemeral instance that's running a Docker image) 어플리케이션은 도커파일(Dockerfile)을 사용하여 도커 이미지를 생성한다. 그리고 도커 이미지는 도커 컨테이너에 배포된다.

![docker analogy](/media/docker.png)

도커의 생태계를 DVD 판매에 비유해보면 다음과 같다. 먼저 위 그림에서 Application은 DVD에 담길 콘텐츠, Dockerfile은 DVD, Docker Hub는 DVD 스토어, Docker Container는 DVD 플레이어가 된다. DVD에 담길 콘텐츠(어플리케이션)가 DVD에 담기는 생산 과정은 마치 Dockerfile을 작성하는 과정과 유사하다. 이후 DVD가 오프라인 또는 온라인 스토어에 분배되는 과정은 마치 도커 이미지를 생성하여 도커허브와 같은 컨테이너 레지스트리에 등록하는 과정과 유사하다. 최종 소비자 DVD를 구매하여 DVD 플레이어에 넣어 이를 재생하는 것은 마치 도커 컨테이너를 실행하는 것과 유사하다.

![dockerfile](/media/dockerfile.jpg)
어플리케이션 코드는 도커파일에 지정된 명령(instruction)을 사용하여 도커 컨테이너에 배포되는 도커 이미지를 생성한다.

### 샘플 도커파일

```docker
# Use NodeJS base image
FROM node:13

# Create app directory in Docker
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./

# Install dependencies in Docker
RUN npm install

# Copy app from local environment into the Docker image
COPY . .

# Set the API’s port number
EXPOSE 8080

# Define Docker’s behavior when the image is run
CMD ["node", "server.js"]
```

### 기본 도커 명령어

- `docker build .` 는 도커파일을 실행하여 도커 이미지를 생성한다.
- `docker images` 는 모든 가능한 이미지를 콘솔에 프린트한다.
- `docker run {IMAGE_ID}` 는 해당 도커 이미지를 도커 컨테이너에서 실행시킨다.
- `docker ps` 는 실행중인 모든 컨테이너를 콘솔에 프린트한다.
- `docker kill {CONTAINER_ID}`는 컨테이너를 종료시킨다.

### Docker 핵심 용어

<strong>Base Image</strong> - 도커 이미지가 생성되는데 걸리는 빌드 시간을 줄이기 위한 도커 이미지의 시작 지점. 이미 기본 디펜던시들이 Base Image에 설치되어 있음.<br>
<strong>Container</strong> - 소프트웨어 디펜던시와 패키지들이 그룹핑된 것으로 이를 통해 소프트웨어를 배포하기 쉬움<br>
<strong>Container Registry</strong> - 컨테이너 이미지들을 저장하기 위한 중앙 저장소<br>
<strong>Docker-compose</strong> - 여러 개의 도커 컨테이너를 한번에 실행시키기 위한 툴; 주로 컨테이너 사이의 의존 관계를 지정하기 위해 사용됨<br>
<strong>Dockerfile</strong> - 어플리케이션을 도커 이미지로 변환(translate)하기 위한 명령어들이 지정된 파일<br>
<strong>Ephemeral</strong> - 어플리케이션의 수명이 짧을 것으로 기대되는 소프트웨어의 특성<br>
<strong>Image</strong> - 도커 컨테이너가 어플리케이션을 실행시키기 위해 사용하는 어플리케이션 코드와 디펜던시의 스냅샷<br>

### Docker에 대한 심화 학습 자료

도커파일은 매우 open-ended 하고 매우 빠르게 지저분해질 수 있다. 따라서 다음의 아티클을 참고하여 도커파일을 best practice로 작성해야 한다.
**[Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)** 참고

## 도커 컨테이너 디버깅

다음 명령은 현재 실행중인 도커 컨테이너 뿐만 아니라 예전에 실행했던 모든 컨테이너 내역을 보여준다.

```
docker ps -a
CONTAINER ID        IMAGE                   COMMAND                  CREATED             STATUS                       PORTS               NAMES
77ab0a887ba0        9737b12c64f4            "docker-entrypoint.s…"   9 minutes ago       Exited (137) 8 minutes ago                       modest_antonelli
9d13c45039b6        lemix777/yogiyong:0.1   "gunicorn --bind 0.0…"   5 months ago        Exited (0) 5 months ago                          yogiyong
```

다음 명령은 특정 도커 컨테이너에 대한 메타데이터를 보여준다.

```
docker inspect {CONTAINER_ID}
[
    {
        "Id": "sha256:9737b12c64f481fefbed468869586216fc30f5542320ac50b0222863e4cf5889",
        "RepoTags": [],
        "RepoDigests": [],
        "Parent": "sha256:aa99a1d81a7c91e1710a8715b15c4b6e6e9364a8d9f542de2741172125769d1e",
        "Comment": "",
        "Created": "2020-05-15T06:04:54.932156238Z",
        "Container": "2ca7c78ed63f79c065ff13b9def622be1d017c971529383e1000e9a57eaa50cc",
        "ContainerConfig": {                                                       "Hostname": "2ca7c78ed63f",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,            "ExposedPorts": {
                "8080/tcp": {}
            },
            ...
```

다음 명령어는 특정 도커 컨테이너의 로그를 확인한다.

```
docker logs {CONTAINER_ID}
```

### Docker debugging excercise

다음 명령어로 도커 컨테이너를 로컬 환경에 다운받을 수 있다.

```
docker pull isjustintime/debug-me:latest
```

다음 명령어로 도커 컨테이너를 백그라운드에서 돌릴 수 있다.

```
docker run -d isjustintime/debug-me
```

다음 명령어를 통해 실행되고 있는 도커 컨테이너에서 새로운 커맨드를 띄울 수 있다. `ps aux` 명령어를 통해 현재 컨테이너에서 nodejs 프로세스가 구동중인 것을 확인 할 수 있다.

```
docker exec -it 7fa964f78b43 sh
# pwd
/usr/src/app
# ls
Dockerfile  README.md  package-lock.json  package.json  server.js
# ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.1  0.1 588024 29532 ?        Ssl  06:38   0:00 node server.js
root        19  0.7  0.0   4276   700 pts/0    Ss   06:44   0:00 sh
root        26  0.0  0.0  36632  2764 pts/0    R+   06:44   0:00 ps aux
```

## Docker Registries

![container-registry](/media/container-registry.jpg)

### 컨테이너 레지스트리

컨테이너 레지스트리는 도커 이미지를 저장하고 버전을 관리할 수 있는 중앙 저장소이다.

### 도커허브

도커허브는 도커를 개발한 기관에서 운영하는 유명한 컨테이너 레지스트리이다.

### 추가 학습자료

- [Docker Registry](https://docs.docker.com/registry/)
- [Best practices for speeding up builds](https://cloud.google.com/cloud-build/docs/speeding-up-builds)

### Dockerhub 계정 로컬 환경에서 로그인하기

```
docker login --username=your_username
```

### Docker repository 태깅

```
docker tag repository_name dockerhub_account/repository_name
```

### Exercise. Dockerhub 레포지토리에 도커이미지 푸쉬하기 및 풀받기

1. 다음 명령어로 도커허브에 푸쉬하려는 어플리케이션을 빌드한다.

```
docker build -t lemix777/simple-node .
```

2. 다음 명령어로 도커허브 레포에 푸쉬한다.

```
docker push lemix777/simple-node
```

3. 도커허브에 푸쉬가 된 것을 확인 후 tags 탭에서 다음 명령어를 복사하여 다시 로컬로 풀 받을 수 있다.

```
docker pull lemix777/simple-nodejs-project:latest
```

### Exercise. Base Images

빌드 및 배포 프로세스에서 Docker 이미지를 빌드하는 데 대부분의 시간이 걸린다. 빌드 시간을 줄이는 한 가지 전략은 기본 이미지를 활용하는 것이다. 이를 활용하면 여러 빌드에서 동일한 중복 작업이 줄어든다.

이번 exercise에서는 도커 Base image를 사용하여 도커 이미지를 빌드하는데 걸리는 시간을 줄이는 실습을 해본다. 먼저 다음은 기본적으로 실습 폴더에 포함된 도커파일이다.

```Docker
FROM buildpack-deps:stretch

# ~~Install NodeJS dependencies
RUN groupadd --gid 1000 node \
  && useradd --uid 1000 --gid node --shell /bin/bash --create-home node

ENV NODE_VERSION 13.12.0

RUN ARCH= && dpkgArch="$(dpkg --print-architecture)" \
  && case "${dpkgArch##*-}" in \
    amd64) ARCH='x64';; \
    ppc64el) ARCH='ppc64le';; \
    s390x) ARCH='s390x';; \
    arm64) ARCH='arm64';; \
    armhf) ARCH='armv7l';; \
    i386) ARCH='x86';; \
    *) echo "unsupported architecture"; exit 1 ;; \
  esac \
  # gpg keys listed at https://github.com/nodejs/node#release-keys
  && set -ex \
  && for key in \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    77984A986EBC2AA786BC0F66B01FBB92821C587A \
    8FCCA13FEF1D0C2E91008E09770F7A9A5AE15600 \
    4ED778F539E3634C779C87C6D7062848A1AB005C \
    A48C2BEE680E841632CD4E44F07496B3EB3C1762 \
    B9E2F5981AA6E0CD28160D9FF13993A75599653C \
  ; do \
    gpg --batch --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys "$key" || \
    gpg --batch --keyserver hkp://ipv4.pool.sks-keyservers.net --recv-keys "$key" || \
    gpg --batch --keyserver hkp://pgp.mit.edu:80 --recv-keys "$key" ; \
  done \
  && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-$ARCH.tar.xz" \
  && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-$ARCH.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-$ARCH.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
  && rm "node-v$NODE_VERSION-linux-$ARCH.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs \
  # smoke tests
  && node --version \
  && npm --version

ENV YARN_VERSION 1.22.4

RUN set -ex \
  && for key in \
    6A010C5166006599AA17F08146C2130DFD2497F5 \
  ; do \
    gpg --batch --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys "$key" || \
    gpg --batch --keyserver hkp://ipv4.pool.sks-keyservers.net --recv-keys "$key" || \
    gpg --batch --keyserver hkp://pgp.mit.edu:80 --recv-keys "$key" ; \
  done \
  && curl -fsSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
  && curl -fsSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz.asc" \
  && gpg --batch --verify yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz \
  && mkdir -p /opt \
  && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
  && ln -s /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn \
  && ln -s /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg \
  && rm yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz \
  # smoke test
  && yarn --version

# ~~Finish installing NodeJS dependencies

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Bind the port that the image will run on
EXPOSE 8080

# Define the Docker image's behavior at runtime
CMD ["node", "server.js"]

```

현재의 도커파일에는 실행되는데 오랜시간이 걸리는 NodeJS를 설치하는 부분의 코드가 많이 포함되어 있다. Nodejs를 설치하는 것은 중복되는 부분이다. 도커이미지를 빌드할 때마다 Nodejs가 계속 설치되면 안된다. Nodejs가 설치된 Base image를 사용함으로서 도커이미지가 Nodejs를 설치하는데 걸리는 시간을 줄일 수 있다.

1.  위의 도커파일 코드에서 `# ~~Install NodeJS dependencies` 부터 `# ~~Finish NodeJS dependencies` 부분까지의 도커파일 코드를 따로 분리하여 base image를 만든다. 이름은 slow-node-base로 지정한다.

2.  도커허브 레포지토리에 slow-node-base 레포를 만든다.

3.  다음과 같이 slow-node-base 를 태깅하여 도커허브 레지스트리에 추가한다.

```
docker tag slow-node-base <YOUR_DOCKER_HUB>/slow-node-base
docker push <YOUR_DOCKER_HUB>/slow-node-base
```

4. 위의 도커파일 코드에서 `# ~~Install NodeJS dependencies` 부터 `# ~~Finish NodeJS dependencies` 부분까지의 도커파일 코드를 제거하고 어플리케이션에 필요한 로직만 남겨둔다.

5. 도커파일의 맨 상단에 `FROM` 명령어를 사용하여 Nodejs가 설치된 base image를 linking한다. 그럼 도커파일이 다음과 같이 구성된다.

```Docker
FROM lemix777/slow-node-base:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Bind the port that the image will run on
EXPOSE 8080

# Define the Docker image's behavior at runtime
CMD ["node", "server.js"]
```

6. 새로운 이미지를 빌드한다. 이제 Nodejs를 설치하는 오버헤드를 줄였기 때문에 도커 이미지 빌드가 더 빨리진 것을 확인할 수 있다.

```
docker build -t slow-node .
```

## 도커 컨테이너 수정하기

도커 이미지는 단일 배포 단위로 고려되어야 한다. 도커 이미지는 `docker -exec -it sh` 명령을 사용하여 도커 컨테이너에서 직접 코드를 수정하면 안된다. 만약 어플리케이션에 문제가 생겼다면, 이를 수정하고 새로운 도커이미지를 빌드하여 새로운 컨테이너에 배포해야 한다.

## Docker Compose

sudo를 사용하여 docker-compose 명령어를 사용하려면 앞에 -E 옵션을 줘야한다.

```
sudo -E docker-compose up
```

# 어플리케이션 개발 라이프사이클 자동화하기

### 이번 섹션에서 배울 내용들

1. 배포 파이프라인을 사용해야 하는 이유
2. 코드 배포 Best Practice
3. CI/CD 이해하기
4. 깃헙과 도커허브가 통합된 CI 툴인 Travis 사용하기

## 배포 파이프라인

배포 파이프라인은 Commit, build, test, deploy 과정을 포함할 수 있다.
![pipeline](/media/pipeline.jpg)

- 현재 어떻게 코드를 배포해야하는지에 대한 IT 산업에서 표준화된 방법과 툴들이 있다.
- 도커 컨테이너는 우리가 무엇을 배포하는지를 단순화해준다.
- 배포 파이프라인은 우리가 도커 컨테이너를 배포하는 방법을 단순화한다.
- 코드는 버그를 최소화하고 기능을 검증하기 위해 주로 서로 다른 환경에 여러번 배포된다.
- 배포 파이프라인은 위 과정을 신뢰도 높은 자동화된 프로세스로 진행할 수 있게 제공한다.

## 코드 배포

전형적인 소프트웨어 개발 사이클에는 코드 작성, 필요한 모든 디펜던시 설치, 자동화된 테스트를 실행,메뉴얼 테스트 그리고 이를 각 개발 환경에 반복하는 과정들이 필요하다.

- 코드를 배포하는 일이 쉬울거라는 생각은 잘못된 생각이다.
- 엔터프라이즈급의 소프트웨어를 배포하는 팀은 주로 인프라의 변경, 보안 변경, 권한설정 등과 같은 내부, 외부적인 디펜던시가 포함된 것들을 다루게 된다.

## CI/CD 의 장점

![ci-cd](/media/ci-cd.jpg)

CI/CD는 코드가 작성되고 프로덕션으로 배포되기까지의 과정을 간결한 프로세스로 제공한다.

### Continuous Integration

코드가 테스트되고, 도커 이미지로 빌드되고 컨테이너 레지스트리에 배포되는 과정을 의미한다.

### Continuous Deployment

도커이미지가 도커 컨테이너에 배포되는 과정을 의미한다.

### 추가 장점

빌드와 배포과정을 자동화된 프로세스로 간결하게 구성하면 개발자들은 코드를 작성하는데 필요한 최소 권한(least privilege)만을 제공받을 수 있다.

### Exercise: CI/CD로 최적화하기

Q. 일반적으로 개발자들의 서버 작업 시나리오는 SSH를 사용하여 프로덕션 서버에 직접 연결하는 것이다. 여기서 기존 코드를 백업 한 다음 Git을 사용하여 마스터 브랜치에서 최신 코드를 가져온다. 이를 통하여 패키지 및 디펜던시는 최신 버전의 코드와 호환되도록 업데이트 할 수 있다. CI/CD 파이프라인이 이러한 기존의 작업 시나리오를 어떻게 개선 할 수 있을까?

A. CI/CD 파이프라인을 사용하면 개발자의 실수로 인한 배포 실패의 위험이 줄어든다. 이 모든 단계는 자동화 될 수 있다. 배포된 코드에 문제가 있는 경우 개발자는 이전 컨테이너의 변경 사항을 쉽게 되돌릴 수 있다.

- 배포 실패의 위험 감소
- 개발자가 ssh로 프로덕션 환경에 직접 연결하는 것은 보안상 위험이 있음
- 데이터베이스 백업과 같은 다른 디펜던시가 있을 수 있으므로 코드만 백업하는 것이 항상 기존 상태를 전체적으로 백업하는 것은 아님
- 패키지 및 디펜던시는 이전으로 되돌려야 하고 이때 서비스 다운 타임이 발생할 수 있음

## Travis CI

![travis](/media/travis.jpg)

- Travis는 CI 프로세스를 할 수 있도록 도와주는 툴이다.
- Travis는 YAML 파일을 사용하여 어플리케이션과 통합시킬 수 있다.
- YAML 파일은 주로 환경설정을 하기 위해 사용된다.
- Travis는 도커 이미지를 빌드하고 도커허브로 푸쉬하기 위해 사용된다.

### YAML

YAML 파일은 JSON 파일과 같이 어떤 데이터를 나타내기 위해 사용된다. 하지만 YAML은 더 가독성이 좋다.

- YAML은 일반적으로 환경설정 파일로 사용된다.
- YAML은 일반적으로 데이터를 표현하기 위해 적합하다.

### Travis 파일

Travis 파일은 항상 `.travis.yaml` 로 파일확장명을 가지고 어플리케이션의 최상위 경로에 저장된다. Travis CI 툴이 이 파일을 발견하고 이 어플리케이션을 빌드 파이프라인에 넣는다.

```YAML
language: node_js
node_js:
  - 13

services:
  - docker

# Pre-testing installs
install:
  - echo "nothing needs to be installed"

# Scripts to be run such as tests
before_script:
  - echo "no tests"

script:
  - docker --version # print the version for logging
  - docker build -t simple-node .
  - docker tag simple-node YOUR_DOCKER_HUB/simple-node:latest

# Tasks to perform after the process is successful. Formatting the Docker username and password as below enables you to programmatically log in without having the password exposed in logs.
after_success:
  - echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
  - docker push YOUR_DOCKER_HUB/simple-node
```

### Travis가 하는 일

Travis에 로그인을 하고 github 계정과 연동을 하면 github에 푸쉬해놓은 레포지토리의 프로젝트들을 Travis 대시보드에서 확인할 수 있다. Travis를 통해 CI 프로세스를 진행하고 싶은 레포지토리를 선택하여 빌드를 시작하면 된다. Travis 빌드는 깃헙의 병합 또는 푸시와 같은 일부 작업을 통해 트리거 될 수 있다. 또는 수동으로 해당 프로젝트에 들어와서 `build` 버튼을 클릭하여 빌드를 시작할 수 있다.

빌드가 시작되면 Travis는 `.travis.yaml` 파일에 지정된 명령을 실행한다. 궁극적으로 Travis는 깃헙에서 코드를 가져와
Docker 빌드 명령을 실행하여 도커 이미지를 만들어 Docker Hub로 푸시한다.

### 추가 학습자료

**[Travis CI Features](https://docs.travis-ci.com/user/for-beginners/)**

## Travis에서 환경변수 설정하기

Travis는 환경 변수들을 설정할 수 있는 방법을 제공한다. 이는 외부에 노출되지 않고 Travis 빌드 프로세스 중에 사용이 된다.

1. Travis 대시보드에 레포지토리로 이동
2. Settings 이동
3. 환경 변수 설정

Travis에서는 레포지토리 별로 환경변수를 설정할 수 있다.

### Quiz. Travis 저장소의 빌드 프로세스에서 깃헙 레포지토리의 브랜치 별로 환경 변수를 설정할 수 있는 장점은 무엇인가?

테스팅을 위해 각 도커허브 레포지토리에 브랜치 별로 나누어 도커 이미지를 푸쉬할 수 있다.

### Quiz. Travis와 같은 서비스는 처리된 빌드 수에 따라 서비스 사용 요금이 책정되는 비즈니스 모델이 있다. 깃헙으로의 모든 푸시가 Travis의 빌드를 트리거하지 않도록 Git에서 코드를 설정하는 방법은 무엇인가?

어떤 특정 깃 액션이 Travis 빌드를 트리거 할지 지정해주며 된다.

### Quiz. Git에 푸쉬를 할때마다 Travis가 빌드를 트리거 하지 않도록 하는 Git 셋팅 전략에는 어떤것이 있을까?

코드가 아직 개발중이고 도커 이미지에 빌드되기 전까지 마스터 브랜치 외에 다른 브랜치를 활용할 수 있다. 이는 우리가 빌드 프로세스를 설정하는데 유연함을 제공한다. 다른 브랜치를 사용함으로서 Travis가 자동으로 빌드하지 않도록 하고 서로 다른 브랜치마다 서로 다른 환경변수를 설정할 수 있다.

## 다른 CI 툴

Docker는 컨테이너의 사실상 표준이 되었지만 빌드툴들은 아직 표준화되지 않았다. Travis는 널리 사용되는 많은 CI/CD 도구 중 하나이다. 다른 것에는 `Jenkins`, ``CircleCI`,`AWS CodeBuild`가 있다. 이 중`Jenkins` 가 가장 유연하지만 이를 셋팅하기 위해 더 많은 오버헤드가 있다.

# 쿠버네티스로 하는 Orchestration

Kubernetes는 컨테이너를 배포하는데 자주 사용되는 강력한 도구이다.
이번 섹션에서는 Kubernetes를 사용하여 어플리케이션을 배포하는 이유를 알아본다. 또한, 서비스 오케스트레이션의 개념과 Kubernetes를
서비스 오케스트레이션 도구로 활용하는 방법을 알아본다.
Kubernetes는 지속적인 배포(Continuos deployment)를 지원하는 서비스 오케스트레이션 도구이다.

이번 섹션에서 다룰 주제는 다음과 같다.

- 왜 오케스트레이션인가?
- 쿠버네티스 핵심 개념
- AWS에서 쿠버네티스 사용하기
- 쿠버네티스 클러스터 사용하기
- 다른 배포 전략들

## 오케스트레이션

오케스트레이션이란 어플리케이션 라이프사이클의 자동화된 관리를 하는 것을 의미한다. 오케스트레이션은 복잡한 워크 플로우를 처리하는 데 도움이 된다.
어플리케이션 코드 배포, 배포의 과정에서 장애 발생시 이를 복구할 때 그리고 어플리케이션의 수평적 확장에도 도움이 된다.

오케스트레이션 도구의 많은 기능 중 하나는 어플리케이션의 상태를 모니터링하는 기능이다.
동일한 Docker 이미지가 두 개의 컨테이너에서 실행되고 있는 서비스가 있다고 가정해보면, 서비스 오케스트레이션 도구는 어플리케이션에서 발생하는 경고나 오류를 복구하는데 도움을 줄 수 있다.
따라서 두 개의 컨테이너 중 하나가 실패하면 정상적으로 동작하고 있는 컨테이너가 하나만 있음을 감지 할 수 있다.
그 다음 동일한 Docker 이미지를 가져와서 다른 컨테이너를 만들어 이를 대체한다.

- CI/CD에서 Travis가 CI 도구이면 Kubernetes가 CD 도구이다.
- 지속적인 배포(CD)를 위해 배포 프로세스를 자동화한다.

### 컨테이너 오케스트레이션

컨테이너 오케스트레이션은 여러 컨테이너를 단일 가상 엔터티로 그룹화하는 논리적 프로세승다. 이 논리적 그룹화는 비슷한 구성 요구 사항이 있는 컨테이너 그룹을 관리하는 데 용이하다. Kubernetes, Docker Swarm, Amazon ECS, Mesos 및 Nomad와 같은 다양한 컨테이너 오케스트레이션 도구가 있다.

## 쿠버네티스 핵심개념

### 쿠버네티스가 필요한 이유

![kubernetes_comparison](/media/kubernetes_comparison.png)

위 이미지는 컨테이너화 된 어플리케이션이 VM (Virtual Machine) 기반의 배포에 비해 가볍고 관리하기 편리하다는 이점을 보여준다. Kubernetes는 다음과 같은 방법으로 컨테이너화 된 어플리케이션을 관리할 수 있다.

- `컨테이너 관리` - 장애 발생시 백업 / 복제 컨테이너 자동 재시작과 같은 자체 복구, 롤아웃 및 롤백 자동화, 컨테이너 구성 관리
- `Autoscale 워크로드 및 로드 밸런싱` - 네트워크 트래픽로드를 적절한 컨테이너 / 노드로 분배
- `최적의 리소스 사용률` - 각 컨테이너마다 고유 한 리소스 (CPU 및 메모리) 요구 사항이 있다. Kubernetes는 컨테이너를 가장 적합한 노드에 맞추므로 노드의 리소스를 효과적으로 활용할 수 있다.
- `서비스 검색` - 서비스 검색을 위한 기본 방법 제공
- `스토리지 오케스트레이션` - 스토리지 볼륨을 컨테이너에 자동 마운트
- `기타` - 작업 및 예약 된 cronjob을 정지시키고 서드파티 앱을 빠르게 통합 및 지원하며 Stateless 및 Stateful 애플리케이션을 관리한다.

### 쿠버네티스가 동작하는 방법

Kubernetes 배포는 "마스터-워커" 모델을 따른다. 아키텍처 다이어그램을 살펴보기 전에 주요 구성 요소를 이해해야한다.

- `노드` - 어플리케이션에 속하는 여러 컨테이너를 실행하는 물리적 또는 가상 컴퓨터이다.
- `클러스터` - 마스터 및 워커 노드 세트. Kubernetes를 배포하면 각 클러스터에 최소 하나의 워커 노드가 있는 클러스터가 생성된다. 마스터 노드는 여러 워커 노드를 관리 할 수 있다.
- `마스터 노드`- 포드 스케줄링 및 포드 복제를 결정하는 노드이다. 마스터 노드의 주요 구성 요소는 "kube-api-server", "kube-scheduler", "kube-controller"이다.
- `워커 노드` - 포드가 스케줄링되고 실행하는 노드이다.
- `포드(pod)` - 공유 스토리지, 네트워크 및 컨테이너 실행 방법에 대한 사양(specification)이 있는 밀접하게 결합 된 컨테이너 그룹이다. 포드에서 실행되는 모든 컨테이너는 공동 배치(co-located) 및 공동 스케줄링(co-scheduled)된다. 워커 노드는 하나 이상의 포드를 호스트한다.

다음은 쿠버네티스 클러스터 아키텍쳐 다이어그램이다.
![kubernetes_cluster_diagram](/media/kubernetes_cluster_diagram.png)

위의 다이어그램에 포함된 컴포넌트 엘리먼트는 다음과 같다.

- `kubelet` - 워커 노드가 마스터 노드와 통신하는데 사용되는 "노드 에이전트" kubelet은 각 노드에서 실행된다.
- `kube-proxy` - 워커 노드가 외부와 통신하는데 사용하는 "노드 에이전트"이다. kube-proxy는 각 노드에서 실행된다.
- `kube-apiserver` - Kubernetes 컨트롤 플레인을 노출하는 프론트 엔드 API
- `etcd` - 클러스터 상태를 저장하는 키-값 저장소
- `kube-scheduler` - 포드가 가장 적합한 노드에서 실행되도록 스케줄링을 하는 컴포넌트이다.
- `kube-controller-manager` - 컨트롤러 프로세스를 번들하고 실행하는 컴포넌트이다. 이러한 프로세스에는 노드, 복제, 엔드포인트 및 액세스 관리와 관련이 있다.

### 추가 학습자료

- [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/)
- [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)

### 쿠버네티스

- 쿠버네티스는 애플리케이션 배포 자동화를 위한 기능이 포함된 컨테이너 오케스트레이션 시스템이다.
- 쿠버네티스를 사용하여 애플리케이션을 쉽게 확장하고 새로운 코드를 서비스하기 용이하다.

### 포드(Pods)

- 공유 스토리지, 네트워크 및 컨테이너 실행 방법에 대한 사양(specification)이 있는 밀접하게 결합 된 컨테이너 그룹이다. 포드에서 실행되는 모든 컨테이너는 공동 배치(co-located) 및 공동 스케줄링(co-scheduled)된다. 워커 노드는 하나 이상의 포드를 호스트한다.
- 컨테이너는 서로 통신을 해야 한다. 하나의 어플리케이션을 구성하는 배포할 컨테이너가 여러개 있는 것은 자주 있는 일이다.
- 쿠버네티스 `Pods`는 여러 컨테이너의 추상화이며 수명이 일시적이다.

하나의 포드에 속한 컨터이너들의 세트는 다음의 중요한 특징을 갖는다.

- 동일한 네임스페이스 (IP 주소 및 포트), 스토리지 및 네트워크를 공유한다.
- `localhost`를 사용하여 세트 내에서 통신 할 수 있다.
- 단일 엔티티처럼 동작한다.
- 포드가 실행되고 있는 서비스가 종료 될때까지 항상 단일 호스트 노드 (co-located)에서 실행된다. 서비스가 종료되면 해당 노드의 자원을 비운다(frees up).
- 호스트 노드에서 단일 엔티티로 실행되도록 항상 함께 스케줄링된다.(co-scheduled) 컨테이너가 종료 / 추가 / 제거되면 포드가 "다시 시작"되어야 한다. 여기서 "포드가 다시 시작된다"는 뜻은 컨테이너가 실행되는 환경을 다시 시작하는 것을 의미한다.
- 컨테이너 런타임으로 Docker를 사용한다.
- 컨테이너화 된 애플리케이션의 단일 인스턴스를 실행한다. 각 애플리케이션 인스턴스마다 하나씩 여러 개의 포드를 실행하여 애플리케이션의 여러 인스턴스(수평 스케일링 (horizontal scaling))가 생성될 수 있다.

`컨트롤러`는 단일 애플리케이션 인스턴스를 각각 실행하는 여러 포드를 관리한다.

### 컨트롤러의 역할

각각의 어플리케이션 인스턴스를 실행하는 여러 개의 포드가 있을때, 이러한 동일한 포드 세트를 `ReplicaSet`이라고 한다. Pod의 ReplicaSet은 그 안에 호스팅된 서비스의 높은 가용성을 보장한다. ReplicaSet은 `컨트롤러`에 의해 생성 및 관리된다.

컨트롤러는 `deployment.yaml` 설정파일에서 포드 및 ReplicaSet의 필수 속성과 상태를 지정한다. 이 설정 파일은 포드 및 ReplicaSet을 관리하기 위한 선언적(declarative) 업데이트를 제공한다. `컨트롤러`는 `deployment.yaml` 설정파일을 사용하여 `호스트(워커노드)`에 장애가 발생하거나 포드 스케줄링이 중단된 경우와 같은 상황을 관리 할 수 있다. 이러한 경우 `컨트롤러`는 다른 노드에 동일한 포드를 스케줄링하여 포드를 자동으로 교체한다.

### Pod 템플릿

`컨트롤러`는 "Pod 템플릿"이라는 다른 `.yaml` 설정파일을 사용한다. 여기에는 이름, 복제본 수, 실행할 컨테이너, 포트 등의 포드 사양이 포함된다. 다음은 샘플 `pod.yaml`파일이다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-example
spec:
  containers:
    - image: lemix777/reverseproxy
      name: reverseproxy
      imagePullPolicy: Always
      resources:
        requests:
          memory: '64Mi'
          cpu: '250m'
        limits:
          memory: '1024Mi'
          cpu: '500m'
      ports:
        - containerPort: 8080
  restartPolicy: Always
```

이 설정파일을 사용하여 포드 또는 ReplicaSet을 만든 후에는 나중에 구성 파일의 일부를 변경해도 이미 생성된 포드는 이에 영향을 받지 않는다. 필요한 경우 실행중인 포드를 수동으로 업데이트하거나 업데이트 된 파일을 사용하여 다시 배포해야한다.

### 서비스

- 어플리케이션은 종종 여러 레플리카와 함께 배포된다. 이는 로드밸런싱 및 수평 확장에 도움이 된다.
- 서비스는 네트워크를 통해 인터넷에 공개된 `Pods` 세트를 추상화 한 것이다.

![kubernetes_pods](/media/kubernetes_pods.jpg)

## AWS에서 쿠버네티스 사용하기

### 쿠버네티스 설정

- AWS EKS는 Kubernetes를 설정하는데 사용할 수있는 서비스이다.

- `deployment.yaml` 파일은 `pods` 생성 방법을 지정하는데 사용된다.

- `service.yaml` 파일은 `pods`가 공개되는 방식을 지정하는 데 사용된다.

- 아래의 두 yaml 파일에서 `kind: Deployment`와 `kind: Service`는 쿠버네티스가 각 파일을 어떻게 처리할지를 나타낸다.
- `replicas`는 원하는 레플리카 수를 지정한다. 이는 한번의 배포로 생성 될 `pods` 수에 해당한다.

- `deployment.yaml` 파일의 `containers`는 배포할 도커 이미지를 특정한다.

```yaml
//deployment.yaml 샘플파일
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: simple-node
          image: YOUR_DOCKER_HUB/simple-node
          ports:
            - containerPort: 80
```

```yaml
//service.yaml 샘플파일
apiVersion: v1
kind: Service
metadata:
  name: my-app
  labels:
    run: my-app
spec:
  ports:
  - port: 80
    protocol: TCP
  selector:
    run: my-app
```

### AWS에서 EKS 클러스터 생성

클러스터란 여러 대의 컴퓨터들이 연결되어 하나의 시스템처럼 동작하는 컴퓨터들의 집합을 말한다.

AWS EKS에서 클러스터를 생성할 수 있다. 클러스터 생성시 클러스터의 이름과 쿠버네티스 버전, 클러스터 서비스 역할 (IAM role) 등을 지정하여 클러스터를 생성한다.

### 노드 그룹 생성

클러스터가 생성되고 나면 해당 클러스터에서 노드 그룹을 추가해야 한다. 기본적으로 노드 그룹은 클러스터가 제공 할 `pods`를 실행하는 데 된다. 노드 그룹을 생성하지 않는다면 `pods`를 통해 실행될 도커 이미지를 배포할 수 없다.

### EKS 클러스터 생성

Docker 이미지는 컨테이너 레지스트리에서 Kubernetes `pods`로 로드된다.`pods`에 대한 액세스는 서비스를 통해 소비자에게 노출된다.

![kubernetes_aws_eks](/media/kubernetes_aws_eks.jpg)

### 추가 학습자료

[AWS EKS](https://aws.amazon.com/ko/eks/),
[AWS EKS Versioning](https://aws.amazon.com/ko/blogs/compute/updates-to-amazon-eks-version-lifecycle/),
[Why use EKS](https://itnext.io/kubernetes-is-hard-why-eks-makes-it-easier-for-network-and-security-architects-ea6d8b2ca965)

## 쿠버네티스 클러스터

이번 섹션에서는 `kubectl`이라는 `쿠버네티스 CLI`를 사용하여 클러스터와 상호작용하는 방법을 알아본다.

클러스터와 상호작용하기 위해서는 다음의 3가지가 필요하다.

1. `kubectl` [설치](https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html)
2. `aws-iam-authenticator` [셋업](https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html)
3. `kubeconfig` [셋업](https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html)

이 과정을 자세히 알아본다. 먼저, `kubectl`을 연결하기 위한 환경설정 방법을 알아본다.

1. 터미널에 다음 명령어를 친다. 이 명령어는 앞서 만든 쿠버네티스 클러스터를 `kubectl` 커맨드에 바인딩을 한다. 즉, 이 명령을 통해 `kubectl cli`로 쿠버네티스 클러스터를 제어할 수 있게 된다.

```
aws eks --region ap-northeast-2 update-kubeconfig --name Demo2
```

위 명령을 실행하면 다음과 같이 쿠버네티스 클러스터 리소스가 내 로컬 환경의 쿠버네티스 cli 설정에 반영된 것을 확인할 수 있다.

```
Added new context arn:aws:eks:ap-northeast-2:685808903701:cluster/Demo2 to /home/saegeullee/.kube/config
```

2. 다음 명령어를 통해 쿠버네티스 클러스터에서 `deployment.yaml` 파일과 `service.yaml`파일을 사용할 수 있게끔 적용한다.

```
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

나의 경우 이 명령을 치니 kubectl command not found 에러가 발생하여 kubectl cli를 설치하였다.

다음 명령어를 통해 kubectl이 잘 설치되었나 확인 해보았다.

```
kubectl get svc
```

하지만 다음과 같은 에러가 발생했다..

```

error: You must be logged in to the server (Unauthorized)
```

검색해보니 [aws 문서](https://docs.aws.amazon.com/eks/latest/userguide/troubleshooting.html#unauthorized)에서 다음의 힌트를 찾아볼 수 있었다.

If you assumed a role to create the Amazon EKS cluster, you must ensure that kubectl is configured to assume the same role. Use the following command to update your kubeconfig file to use an IAM role. For more information, see Create a kubeconfig for Amazon EKS.

```
aws --region region-code eks update-kubeconfig --name cluster_name --role-arn arn:aws:iam::aws_account_id:role/role_name
```

`kubectl cli`가 EKS 클러스터 생성시 지정한 `Cluster Service Role(클러스터 서비스 역할)`와 동일한 역할을 부여받아야 한다는 내용이다. 이는 쿠버네티스가 AWS의 다른 리소스들을 제어할 수 있도록 역할을 부여(권한 허용)하는 중요한 부분이다.

따라서 이를 적용하고 위에서 에러난 명령어를 다시 쳐보니 다음과 같은 전과는 다른 에러가 발생했다.

```
An error occurred (AccessDenied) when calling the AssumeRole operation: User: arn:aws:iam::685808903701:user/udagram_lemix777_dev is not authorized to perform: sts:AssumeRole on resource: arn:aws:iam::685808903701:role/eksClusterRole
```

위의 에러가 발생하여 유다시티 멘토님들에게 도움을 받고자 유다시티 Cloud Developer 과정에 대해 질문할 수 있는 공간에 먼저 해당 내용을 전에 누가 물어봤었는지 검색을 해보니 [이에 대한 내용](https://knowledge.udacity.com/questions/261276)이 있었다.

위의 에러가 발생한 이유는 AWS EKS에서 클러스터 생성시 나는 루트 사용자로 로그인이 되어 있었기 때문에 `udagram_lemix777_dev` 유저는 권한이 없다는 내용이다. 따라서 위에서 조언해준대로 해당 IAM 유저로 AWS 대시보드에 로그인을 하여 새로운 EKS 클러스터를 생성하였다.

이제 다시 다음의 명령어를 쳐보니..

```
kubectl get svc
```

현재 해당 클러스터에서 돌아가고 있는 쿠버네티스 어플리케이션을 확인해 볼 수 있다.

```
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.100.0.1   <none>        443/TCP   9m52s
```

이제 다시 원래 2번 Step에서 하고자 했던 다음 명령어를 친다.

```
kubectl apply -f deployment.yaml
```

kubectl은 다음과 같이 응답한다. 이는 EKS 클러스터가 해당 `deployment.yaml`파일을 인지하여 이에 대한 일을 처리할 수 있다는 의미이다.

```
deployment.apps/my-app created
```

다음 명령어도 마찬가지로 적용한다.

```
kubectl apply -f service.yaml
```

### kubectl 명령어

`kubectl`은 쿠버네티스와 상호작용하기 위한 넓은 범위의 명령어를 제공한다. 다음은 몇가지 기본적인 명령어이다.

- `kubectl get pods` : 클러스터에서 실행되고 있는 `pods`를 보여준다. 2개의 `my-app` 레플리카가 실행되고 있는것을 확인해볼 수 있다.

```
NAME                      READY   STATUS    RESTARTS   AGE
my-app-5cc56f49d5-hx8h5   1/1     Running   0          10m
my-app-5cc56f49d5-q7zfr   1/1     Running   0          10m

```

- `kubectl describe services` : 클러스터에서 실행되고 있는 서비스를 보여준다.

```
Name:              kubernetes
Namespace:         default
Labels:            component=apiserver
                   provider=kubernetes
Annotations:       <none>
Selector:          <none>
Type:              ClusterIP
IP:                10.100.0.1
Port:              https  443/TCP
TargetPort:        443/TCP
Endpoints:         172.31.0.6:443,172.31.39.142:443
Session Affinity:  None
Events:            <none>


Name:              my-app
Namespace:         default
Labels:            run=my-app
Annotations:       Selector:  run=my-app
Type:              ClusterIP
IP:                10.100.218.30
Port:              <unset>  80/TCP
TargetPort:        80/TCP
Endpoints:         <none>
Session Affinity:  None
Events:            <none>
```

- `kubectl cluster-info` : 클러스터에 대한 정보를 보여준다.

```
Kubernetes master is running at https://52774C7CBCF8DFD66EFB5BFC23E3CBAE.yl4.ap-northeast-2.eks.amazonaws.com
CoreDNS is running at https://52774C7CBCF8DFD66EFB5BFC23E3CBAE.yl4.ap-northeast-2.eks.amazonaws.com/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.

```

![kubernetes_kubectl](/media/kubernetes_kubectl.jpg)

쿠버네티스 cli인 `kubectl`가 쿠버네티스와의 인터페이스를 제공한다. 앞서 만든 `Yaml`파일은 `kubectl`을 통해 로드된다.

### 추가 학습자료

- [Kubernetes Cheatsheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- `kubectl` [overview](https://kubernetes.io/docs/reference/kubectl/overview/)
- [Kubernetes API](https://kubernetes.io/docs/concepts/overview/kubernetes-api/)
- `kubectl` [Documentation](https://kubectl.docs.kubernetes.io/)

## 다른 배포 전략들

### AWS ECS

AWS EKS 이전의 AWS 독점 솔루션. 다른 AWS 도구와 매우 잘 통합되며 Kubernetes만큼 기능이 풍부하지 않기 때문에 좀 더 간단하다.

### AWS Fargate

AWS Fargate는 컨테이너 배포를 쉽게 해준다. 컨테이너 워크 플로우를 관리하기 위해 EKS 또는 ECS에 의해 사용될 수 있다.
컨테이너 오케스트레이션 설정 관리와 관련된 복잡성을 제거하는 `wrapper` 역할을 한다.
Kubernetes의 복잡한 부분을 줄일 수있는 좋은 방법이다.

### Docker Swarm

Docker를 사용하여 컨테이너를 수동으로 실행하는 옵션이다.

## 디버깅

다음 명령어를 통해 `pod`에서 실행되고 있는 컨테이너에 접속할 수 있다.

```
kubectl exec -it {pod_name} sh
```

해당 컨테이너에 접속에 성공하면 다음과 같이 해당 컨테이너의 파일들과 실행되고 있는 프로세스들을 직접 확인 할 수 있다.

```
# ls
Dockerfile  README.md  package-lock.json  package.json	server.js
# ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  3.0 589336 29744 ?        Ssl  09:44   0:00 node server.js
root        24  0.0  0.0   4280   732 pts/0    Ss   10:42   0:00 sh
root        31  0.0  0.2  36636  2752 pts/0    R+   10:42   0:00 ps aux
```

이는 `pods` 컨텍스트 내에서 직접 명령을 실행하고 테스트할 수있는 강력한 도구이다.
하지만 이 명령어를 사용하여 포드 내부에서 실행되는 코드 또는 상태를 직접수정하면 안된다. 이 명령은 문제 해결에만 사용해야 한다. 포드는 일시적이므로 변경 사항을 처리하기 위해서는 새 이미지를 만들어 배포해야 한다.

## 쿠버네티스 어플리케이션 배포과정 정리

### 포드 디버깅

`kubectl`을 통해 배포한 포드들 중 일부가 다음과 같이 `ContainerCreating` 상태가 지속되었다.

```
NAME                            READY   STATUS              RESTARTS   AGE
backend-feed-665f44fd69-5nsdr   0/1     ContainerCreating   0          41h
backend-feed-665f44fd69-b96s2   0/1     ContainerCreating   0          41h
backend-user-699f6f9cdc-q97sp   0/1     Evicted             0          41h
backend-user-699f6f9cdc-sknfs   0/1     CrashLoopBackOff    226        41h
backend-user-699f6f9cdc-v78kv   0/1     CrashLoopBackOff    97         8h
```

다음 명령어를 통해 생성된 포드의 자세한 상태를 확인할 수 있다.

```
kubectl describe pods backend-feed-665f44fd69-5nsdr
```

이 포드의 경우 다음과 같은 에러메시지가 나왔다. 쿠버네티스 앱에 `aws-secret` 이 적용되지 않았기 때문에 발생한 에러이다.

```
  Warning  FailedMount  11m (x1237 over 41h)  kubelet, ip-172-31-24-45.ap-northeast-1.compute.internal  MountVolume.SetUp failed for volume "aws-secret" : secret "aws-secret" not found
  Warning  FailedMount  100s (x846 over 41h)  kubelet, ip-172-31-24-45.ap-northeast-1.compute.internal  Unable to attach or mount volumes: unmounted volumes=[aws-secret], unattached volumes=[aws-secret default-token-ff89l]: timed out waiting for the condition
```

또한 일부 포드는 `CrashLoopBackOff` 상태가 지속되었다. 이 포드같은 경우는 위의 명령어로는 다음과 같이 포드의 상태를 정확하게 진단하기 어려운 로그만을 출력했다.

```
  Warning  BackOff  8s (x5299 over 21h)  kubelet, ip-172-31-36-186.ap-northeast-1.compute.internal  Back-off restarting failed container
```

이때, 다음 명령어로 특정 포드에서 실행되고 있는 어플리케이션의 로그를 확인해볼 수 있다.

```
kubectl logs backend-feed-665f44fd69-5nsdr -p
```

나의 경우 다음과 같은 에러 메시지가 출력되었다. 데이터베이스 아이디 비밀번호가 맞지않아 PostgreSQL 서버에 접속할 수 없는 것이었다.

```
(node:25) UnhandledPromiseRejectionWarning: SequelizeConnectionError: password authentication failed for user "
saegeullee"
```

### 쿠버네티스 앱 외부 IP로 노출하기

[참고](https://kubernetes.io/docs/tutorials/stateless-application/expose-external-ip-address/)

# 서비스 등록, 디스커버리 & 스케일링

## ConfigMaps & Secrets

### 환경설정

쿠버네티스는 애플리케이션 또는 컨테이너에서 환경설정을 분리하기 위한 Integration 패턴을 가지고 있다. 이 패턴은 두 개의 쿠버네티스 컴포넌트인 `ConfigMaps`와 `Secrets`를 사용한다.

### ConfigMap

- 쿠버네티스 내에 저장된 외부화된 데이터.
- 여러 가지 다른 방법으로 참조 할 수 있다.
  - 환경 변수
  - 커맨드라인 argument (env var를 통해 사용)
  - 볼륨 마운트에 파일로 주입
- 매니페스트, 리터럴, 디렉토리 또는 파일에서 직접 만들 수 있다.

ConfigMap 예시

```yaml
apiVersion: v1
kind: ConfigMap
data:
  AWS_BUCKET: udagram-scheele-dev
  AWS_PROFILE: default
  AWS_REGION: us-east-2
  JWT_SECRET: hello
  POSTGRESS_DB: udagramscheeledev
  POSTGRESS_HOST: udagram-scheele-dev.xaytk2sgtsw.us-east-2.rds.amazonaws.com
  URL: http://localhost:8100
metadata:
  name: env-config
```

### Secret

- 기능적으로 ConfigMap과 동일하다.
- base64로 인코딩 된 데이터로 저장된다.
- `etcd` 내에서 암호화 됨 (설정한 경우).
- 컨테이너에 저장해서는 안되는 사용자 이름 / 암호, 인증서 또는 기타 민감한 정보에 사용하기 적당하다.
- 매니페스트, 리터럴, 디렉토리 또는 파일에서 직접 만들 수 있다.
- `pod`는 다음 두가지 방법으로 Secret을 사용할 수 있다.
  - 컨테이너에 마운트된 볼륨의 파일로 사용
  - `kubelet`은 `pod` 이미지를 가져 오면서 `secrets`로 사용

Secret 파일 예시

```yaml
apiVersion: v1
# 환경설정 파일의 종류
kind: Secret
metadata:
  #시크릿 이름
  name: env-secret
type: Opaque
data:
  POSTGRESS_USERNAME: c2alz2V2bGxlZQ==
  POSTGRESS_PASSWORD: cz20KU3ODk1
```

secret 파일을 정의하고 다음의 명령어로 쿠버네티스가 secret을 만든다.

```
kubectl apply -f ./secret.yaml
```

다음의 명령어로 생성된 secret을 확인한다

```
kubectl get secrets
```

## 서비스 타입

다음 4가지 종류의 서비스 타입이 있다.

- ClusterIp(default)
- NodePort
- LoadBalancer
- ExternalName(쿠버네티스 클러스터 외부의 서비스로 트래픽을 포워딩할 수 있음)

쿠버네티스에서 서비스는 파드의 논리적 집합과 그것들에 접근할 수 있는 정책을 정의하는 추상적 개념이다. 서비스가 대상으로 하는 파드 집합은 일반적으로 셀렉터가 결정한다.

### ClusterIP 서비스

![kubernetes_clusterip_service](/media/kubernetes_clusterip_service.png)


