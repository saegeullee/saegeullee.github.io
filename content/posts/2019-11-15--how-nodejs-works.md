---
title: Nodejs가 작동하는 방법
date: '2019-11-15T13:10:37.121Z'
template: 'post'
draft: false
slug: '/nodejs/how-nodejs-works'
category: 'nodejs'
tags:
  - 'nodejs'
description: 'nodejs runtime 은 몇 가지 dependency 가 있는데 그 중 가장 중요한 것이 v8 engine과 libuv이다. v8 engine이 없다면 nodejs는 javascript를 이해할 수 없다. v8 engine이 javascript 코드를 컴퓨터가 이해할 수 있는 머신 코드로 변환해주기 때문이다...'
socialImage: '/media/image-2.jpg'
---

> **[유데미 NODE.JS](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)** 수업을 듣고 정리한 내용입니다.

## nodejs 아키텍처

![nodejs](/media/nodejs-architecture.png)

nodejs runtime 은 몇 가지 `dependency` 가 있는데 그 중 가장 중요한 것이 `v8 engine`과 `libuv`이다. `v8 engine`이 없다면 nodejs는 javascript를 이해할 수 없다. `v8 engine`이 javascript 코드를 컴퓨터가 이해할 수 있는 머신 코드로 변환해주기 때문이다.

`libuv`는 비동기 IO를 집중적으로 개발하는 오픈소스 라이브러리이다. `libuv`를 통해 노드는 파일시스템과 네트워킹 등의 컴퓨터 운영체제의 기능들에 접근할 수 있다. 또한 `libuv`에는 nodejs에서 굉장히 중요한 기능인 `이벤트루프`와 `쓰레드풀`이 구현되어 있다.

`이벤트루프`는 콜백 실행, network IO와 같은 가벼운 일을 처리해주고 `쓰레드풀`은 파일에 접근하거나 파일을 압축하는 등의 무거운 일을 처리한다.

`libuv`는 C++로 만들어졌고 `v8 engine`은 javascript 와 c++로 만들어졌다. nodejs의 역할은 순수 자바스크립트 코드를 통해 이 모든 기능들을 실행시킬 수 있도록 해주는 것이다.

nodejs는 v8 engine과 libuv 뿐만 아니라 `http-parser`, `c-ares`, `OpenSSL`, `zlib` 등의 라이브러리에도 의존성이 있다.

## 쓰레드와 쓰레드 풀

![nodejs](/media/nodejs_threads.png)

nodejs 서버를 실행시키면 nodejs 프로세스가 실행된다. 그리고 nodejs 서버는 프로세스 안에 있는 하나의 단일 쓰레드에서 실행된다. nodejs 서버를 10명의 사용자가 사용하든 100만명의 사용자가 동시에 사용하든 nodejs 서버는 하나의 단일 쓰레드에서 실행된다. 따라서 개발자는 이 단일 쓰레드를 blocking 하지 않도록 유의해서 nodejs 서버를 만들어야 한다.<br>

nodejs 서버를 실행시키면 먼저 `top-level` 코드들이 실행된다. `top-level` 코드란 콜백 함수 안에 있지 않은 모든 코드를 의미한다.
그 다음 서버 어플리케이션이 필요로 하는 모든 모듈들이 `require`되고 모든 콜백 이벤트가 등록된다. 마지막으로 `이벤트루프`가 실행된다. nodejs 어플리케이션의 대부분의 일이 이벤트루프에서 처리된다. 하지만 어떤 작업들은 이벤트루프가 처리하기에는 매우 무겁다. 만약 이러한 무거운 작업들이 이벤트루프에서 처리되면 nodejs가 실행되는 단일 쓰레드는 block 될 수 있다. 이렇게 이벤트루프가 block 되는 것을 방지하기 위해 nodejs의 프로세스에는 `쓰레드풀`이 있다.<br>

`쓰레드풀`은 `libuv` 라이브러리가 nodejs에 제공하는 기능이다. 쓰레드풀은 nodejs가 동작하는 단일 쓰레드와는 다른 네가지 쓰레드를 추가적으로 제공한다. 개발자는 이 추가적인 쓰레드를 최대 128개까지 설정할 수 있지만 보통은 네 개의 쓰레드로 충분하다. `이벤트루프`는 무거운 작업들을 `쓰레드풀`이 처리하게끔 하여 일을 분담한다. 이벤트루프가 쓰레드풀에게 작업물을 할당하는 것은 자동으로 처리되기 때문에 개발자가 신경쓰지 않아도 된다.<br>

쓰레드풀에게 할당되는 무거운 작업물은 예를들어 `파일 처리`, `파일 압축`, `비밀번호 해싱`, `DNS 룩업` 등이 있다. 이러한 작업들은 nodejs의 메인 단일 쓰레드를 손쉽게 block한다. 따라서 nodejs는 단일 쓰레드가 block되지 않도록 무거운 작업물들을 자동으로 쓰레드풀에게 넘긴다.

## 이벤트루프

![nodejs](/media/nodejs_eventloop.png)

어플리케이션 코드 중 콜백 함수 내부의 모든 코드가 실행되는 곳이 이벤트루프이다. 즉 `top-level`코드를 제외한 모든 코드가 이벤트루프에서 실행된다. 이 중 어떤 코드(무거운 작업)는 이벤트루프가 쓰레드풀에서 처리하도록 할 수 있다. nodejs는 `event-driven 아키텍처`를 사용한다. 예를들어 새로운 http 요청을 받거나, 타이머 만료, 파일 read가 완료되면 이벤트가 발생하고(emit) 이벤트루프는 이를 전달받아 각 이벤트의 콜백함수를 호출한다. 즉 이벤트루프는 nodejs 어플리케이션이 잘 동작하도록 총괄 지휘(orchestration)한다.
