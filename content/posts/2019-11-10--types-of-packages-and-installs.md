---
title: Nodejs 패키지의 종류
date: "2019-11-10T00:20:37.121Z"
template: "post"
draft: false
slug: "/nodejs/types-of-packages-and-installs"
category: "nodejs"
tags:
  - "nodejs"
description: "패키지에는 simple dependencies 와 development dependencies 두 가지 종류가 있다. 전자는 프로젝트 코드에 포함이 된다. 즉, 우리의 프로젝트는 simple dependencies에 의존하기 때문에 프로젝트가 정상적으로 동작하기 위해서는 simple dependencies가 프로젝트에 포함되어야 한다..."
socialImage: "/media/image-2.jpg"
---

> **[유데미 NODE.JS](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)** 수업을 듣고 정리한 내용입니다.

# packages

## simple dependencies

패키지에는 `simple dependencies` 와 `development dependencies` 두 가지 종류가 있다. 전자는 프로젝트 코드에 포함이 된다. 즉, 우리의 프로젝트는 `simple dependencies`에 의존하기 때문에 프로젝트가 정상적으로 동작하기 위해서는 `simple dependencies`가 프로젝트에 포함되어야 한다.

```
npm install slugify
```

```
//package.json
  "dependencies": {
    "slugify": "~1.3.4"
  },
```

## development dependencies

`development dependencies`는 개발을 위한 도구이다. 예를들어, 웹팩과 같은 code bundler, debugging tool, testing library 가 있다. `development dependencies`는 production에서 필요하지 않다. 그리고 프로젝트 코드는 이에 의존하지 않는다. application을 개발하기 위해 필요할 뿐이다.

```
npm install nodemon --save-dev
```

```
//package.json
  "devDependencies": {
    "nodemon": "^1.18.11"
  }
```

## global installs

위의 두 과정을 통해 프로젝트 폴더 로컬에 dependency가 설치되었다. 하지만 `npm`으로 global install 도 가능하다. global install을 통해 프로젝트 폴더에서만 사용가능 한 것이 아니라 컴퓨터의 다른 모든 곳에서도 사용 가능하다. 예를들어 `nodemon`을 global하게 설치하면 매번 프로젝트를 새로 시작할때마다 `nodemon`을 따로 설치할 필요가 없게 된다. 이미 컴퓨터 전역에 설치되었기 때문에 모든 프로젝트에서 사용할 수 있기 때문이다.

```
컴퓨터 전역에 설치
npm i nodemon --global
```

```
nodemon 사용
nodemon index.js
```

위의 command로 nodemon을 실행시키면 전역에 설치한 nodemon이 실행된다. 만약 전역에 nodemon을 설치하지 않고 local에 설치한 nodemon을 사용하고 싶으면 어떻게 해야 할까? local 에 설치한 dev-dependency 는 commandline에서 실행시킬 수 없다. 이 경우에는 npm script 를 통해 실행시켜야 한다. `package.json` 파일에 아래와 같이 스크립트를 추가한다.

```
"scripts": {
    "start": "nodemon index.js"
},
```

그리고 command line에서 아래의 명령을 통해 스크립트를 실행시킨다.

```
npm run start
또는
npm start
```
