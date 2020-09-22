---
title: 타입스크립트 메타데이터
date: '2020-06-03T20:50:37.121Z'
template: 'post'
draft: false
slug: '/typescript/typescript-metadata'
category: 'typescript'
tags:
  - 'typescript'
description: '타입스크립트 메타데이터 대해 정리한다.'
socialImage: '/media/image-2.jpg'
---

> **[Typescript: The Complete Developer's Guide [2020]](https://www.udemy.com/course/typescript-the-complete-developers-guide)** 수업을 듣고 정리한 내용입니다.

## 메타데이터

- 자바스크립트에 제안된 새로운 기능이다.
- 함수와 프로퍼티 또는 클래스에 추가될 수 있는 작은 정보 조각이다.
- 필요에 따라 매우 커스텀하게 사용할 수 있다.
- 타입스크립트는 타입에 대한 정보를 메타데이터로 제공한다.(옵션)
- `reflect-metadata` 패키지를 사용하여 메타데이터를 쓰고 읽는다.
- 메타데이터를 사용하기 위해서는 tsconfig.json 파일에서 "emitDecoratorMetadata":true 옵션을 주석해제 해야 한다.

## 메타데이터 기본적인 사용방법

```ts
import 'reflect-metadata';

const plane = {
  color: 'red'
};

// 이 코드는 plane 객체에 note 프로퍼티와 값 hi there을
// 숨겨진 프로퍼티(메타데이터)로 정의한다.
Reflect.defineMetadata('note', 'hi there', plane);
const note = Reflect.getMetadata('note', plane);

console.log(note);

// 이 코드는 plane 객체의 color 프로퍼티에 note 프로퍼티와 값 hi there을
// 숨겨진 프로퍼티(메타데이터)로 정의한다.
Reflect.defineMetadata('note', 'hi there2', plane, 'color');
const note2 = Reflect.getMetadata('note', plane, 'color');
console.log(note2);
```

## 메타데이터 실용적인 사용방법

```ts
class Plane {
  color: string = 'red';

  @markFunction
  fly(): void {
    console.log('vrrrrrrrrrrrrr');
  }
}

function markFunction(target: Plane, key: string) {
  Reflect.defineMetadata('secret', 123, target, key);
}

const secret = Reflect.getMetadata('secret', Plane.prototype, 'fly');
console.log(secret); //123
```

### 팩토리 데코레이터 패턴과 함께 사용하기

```ts
class Plane {
  color: string = 'red';

  @markFunction('HI THERE')
  fly(): void {
    console.log('vrrrrrrrrrrrrr');
  }
}

function markFunction(secretInfo: string) {
  return function markFunction(target: Plane, key: string) {
    Reflect.defineMetadata('secret', secretInfo, target, key);
  };
}

const secret = Reflect.getMetadata('secret', Plane.prototype, 'fly');
console.log(secret); //HI THERE
```

```ts
@printMetadata
class Plane {
  color: string = 'red';

  @markFunction('HI THERE')
  fly(): void {
    console.log('vrrrrrrrrrrrrr');
  }
}

function markFunction(secretInfo: string) {
  return function markFunction(target: Plane, key: string) {
    Reflect.defineMetadata('secret', secretInfo, target, key);
  };
}

//typeof Plane -> reference to the constructor function of the Plane class
function printMetadata(target: typeof Plane) {
  for (let key in target.prototype) {
    const secret = Reflect.getMetadata('secret', target.prototype, key);
    console.log(secret); //HI THERE
  }
}
```

앞으로 nodejs에 타입스크립트를 적용하며 만들어 나갈 형태는 다음과 같다.

```ts
@controller
class Plane {
  color: string = 'red';

  @get('/login')
  fly(): void {
    console.log('vrrrrrrrrrrrrr');
  }
}

function get(path: string) {
  return function markFunction(target: Plane, key: string) {
    Reflect.defineMetadata('path', path, target, key);
  };
}

//typeof Plane -> reference to the constructor funciton of the Plane class
function controller(target: typeof Plane) {
  console.log(target.prototype);
  for (let key in target.prototype) {
    const path = Reflect.getMetadata('path', target.prototype, key);
    console.log(path); // /login

    const middleware = Reflect.getMetadata('middleware', target.prototype, key);
    router.get(path, middleware, target.prototype[type]);
  }
}

const secret = Reflect.getMetadata('path', Plane.prototype, 'fly');
console.log(secret); // /login
```
