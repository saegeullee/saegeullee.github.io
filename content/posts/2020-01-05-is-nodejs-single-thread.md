---
title: Nodejs 싱글스레드와 스레드풀
date: '2020-01-05T17:10:37.121Z'
template: 'post'
draft: false
slug: '/nodejs/is-nodejs-single-threaded'
category: 'nodejs'
tags:
  - 'nodejs'
description: 'Nodejs의 이벤트루프는 싱글 스레드이다. Nodejs 어플리케이션이 실행되면 이벤트루프 인스턴스는 하나의 스레드에서 생성된다. 하지만 Nodejs의 `standard library`에 포함된 어떤 함수들은 싱글 스레드에서 실행되지 않는다. 이 함수들은 이벤트 루프가 실행되는 싱글 스레드 밖에서 실행이 된다...'
socialImage: '/media/image-2.jpg'
---

> **[NodeJS: Advanced Concepts](https://www.udemy.com/course/advanced-node-for-developers/)** 수업을 듣고 정리한 내용입니다.

# 목차

- [Nodejs는 싱글스레드인가?](#nodejs는-싱글스레드인가)
- [libuv 스레드풀](#libuv-스레드풀)
- [스레드풀 사이즈 변경하기](#스레드풀-사이즈-변경하기)

## Nodejs는 싱글스레드인가?

Nodejs의 이벤트루프는 싱글 스레드이다. Nodejs 어플리케이션이 실행되면 이벤트루프 인스턴스는 하나의 스레드에서 생성된다. 하지만 Nodejs의 `standard library`에 포함된 어떤 함수들은 싱글 스레드에서 실행되지 않는다. 이 함수들은 이벤트 루프가 실행되는 싱글 스레드 밖에서 실행이 된다. 즉, 이벤트루프가 싱글스레드인 것은 맞지만 프로그래머가 작성하는 모든 코드가 그 싱글스레드에서 실행되는 것은 아니다.

실제 코드의 동작을 통해 이를 증명해보면 다음과 같다.
아래의 코드는 Nodejs standard library 중 하나인 `crypto` 모듈의 `pbkdf2` 함수를 두 번 실행시킨다.

```js
const crypto = require('crypto');

const start = Date.now();

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('1:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('2:', Date.now() - start);
});
```

이 코드의 실행결과는 다음과 같다. `pbkdf2` 함수가 두번 실행되는데 대략 700 밀리초 정도 걸렸다.

```
1: 715
2: 732
```

만약 Nodejs가 싱글스레드라면 코드의 실행결과는 다음과 같이 나올 것이다. 첫번째 `pbkdf2` 함수가 끝나면 두번째 함수가 실행되었을 것이기 때문이다.

```
1: 715
2: 1437
```

## libuv 스레드풀

Nodejs는 `pbkdf2`와 같이 무거운(computationally intensive) standard library의 함수는 이벤트루프 밖에서 처리한다. Nodejs는 이러한 작업을 `스레드풀`을 사용하여 처리한다. `스레드풀`은 아래의 이미지에서 볼 수 있듯이 네 개의 스레드의 집합을 일컫는다. `libuv`는 디폴트로 스레드풀에 네 개의 스레드를 생성한다.

Nodejs는 Nodejs 어플리케이션이 실행되는 싱글스레드 외에 네 개의 추가적인 스레드를 사용하여 무거운 작업을 처리한다. Nodejs는 자동으로 이 스레드풀을 사용하여 standard library의 많은 함수들을 처리한다. Nodejs의 이벤트루프가 싱글스레드에서 실행되다가 무거운 작업들이 들어오면 해당 작업은 직접 처리하지 않고 스레드풀에 작업을 분담한다.

![nodejs threadpool](/media/nodejs_threadpool.png)

<br>

이제 `pbkdf2` 함수를 5번 실행시켜보자

```js
const crypto = require('crypto');

const start = Date.now();

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('1:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('2:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('3:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('4:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('5:', Date.now() - start);
});
```

결과는 다음과 같이 나온다. 1~4까지의 각 함수(작업)는 스레드풀에 있는 네 개의 스레드가 먼저 처리하고 5번째 작업만 시간이 더 많이 걸리는 것을 확인해 볼 수 있다.

```
3: 856
4: 860
1: 899
2: 908
5: 1473
```

## 스레드풀 사이즈 변경하기

스레드풀은 개발자가 임의로 지정해줄 수도 있다. 파일의 맨 위에 다음의 코드를 추가한다.

```js
process.env.UV_THREADPOOL_SIZE = 2;
```

이제 스레드풀에는 2개의 스레드만 생성된다. 다시 파일을 실행시켜보면 결과는 다음과 같이 나온다. 각 작업은 스레드풀의 스레드의 수에 맞게 2개씩 처리되어 결과가 나오는 것을 확인할 수 있다.

```
2: 1014
1: 1034
4: 1991
3: 1993
5: 2887
```

## libuv의 OS로의 작업 위임
