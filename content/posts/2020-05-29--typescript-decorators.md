---
title: 타입스크립트 데코레이터
date: '2020-05-29T12:50:37.121Z'
template: 'post'
draft: false
slug: '/typescript/typescript-decorators'
category: 'typescript'
tags:
  - 'typescript'
description: '타입스크립트 데코레이터에 대해 정리한다.'
socialImage: '/media/image-2.jpg'
---

> **[Typescript: The Complete Developer's Guide [2020]](https://www.udemy.com/course/typescript-the-complete-developers-guide)** 수업을 듣고 정리한 내용입니다.

## 타입스크립트 데코레이터

- 클래스 안에서 프로퍼티와 함수를 꾸미는데 사용할 수 있다.
- 자바스크립트 데코레이터와는 다른 개념이다.
- 클래스 안에서만 사용이 가능하다.
- 데코레이터가 실행되는 순서를 이해하는 것이 핵심이다.

```typescript
class Boat {
  color: string = 'red';

  get formattedColor(): string {
    return `This boat color is ${this.color}`;
  }

  @testDecorator
  pilot(): void {
    console.log('swish');
  }
}

function testDecorator(target: any, key: string) {
  console.log('Target: ', target);
  console.log('Key: ', key);
}

/*
이 타입스크립트 파일 실행시 결과
Target: Boat { pilot: [Function] }
Key: pilot
*/
```

- 데코레이터 함수의 첫번째 인자는 데코레이터가 사용되는 프로퍼티, 함수 혹은 접근자 객체의 프로토타입이다.
- 두번째 인자는 데코레이터가 사용되는 프로퍼티, 함수 혹은 접근자 객체의 key 이다.
- 세번째 인자는 프로퍼티 descriptor이다.
- 데코레이터는 클래스가 실행될 때 적용된다. (인스턴스 생성시 적용 X)

### 데코레이터 함수

위의 타입스크립트 클래스 파일을 **[typescriptlang.org](https://www.typescriptlang.org/play)** 사이트에서 자바스크립트로 컴파일해보면 다음과 같은 결과가 나온다.

```js
'use strict';
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function(k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
let Boat = /** @class */ (() => {
  class Boat {
    constructor() {
      this.color = 'red';
    }
    get formattedColor() {
      return `This boat color is ${this.color}`;
    }
    pilot() {
      console.log('swish');
    }
  }
  __decorate(
    [
      testDecorator,
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', void 0)
    ],
    Boat.prototype,
    'pilot',
    null
  );
  return Boat;
})();
function testDecorator(target, key) {
  console.log('Target: ', target);
  console.log('Key: ', key);
}
```

위의 데코레이터 함수 `__decorate`를 보면 좀 복잡해보이지만 핵심 로직만 보면 다음과 같다. 다음의 코드를 확인해보면 결국 데코레이터 함수를 호출하는 로직이 전부이다.

```js
var __decorate = function(decorators, target, key, desc) {
  var desc = Object.getOwnPropertyDescriptor(target, key);

  for (var decorator of decorators) {
    decorator(target, key, desc);
  }
};
```

따라서 위의 예시와 같이 `testDecorator`데코레이터 함수를 `pilot()` 메서드 위에 사용하는 데코레이터 사용 문법이 아니라 다음과 같이 일반적인 메서드 호출을 하듯이 사용해도 결국은 같은 로직이 된다. 즉 타입스크립트는 데코레이터를 제공함으로서 다음의 로직을 개발자가 작성하기 쉽게 해준다.

```typescript
class Boat {
  color: string = 'red';

  get formattedColor(): string {
    return `This boat color is ${this.color}`;
  }

  pilot(): void {
    console.log('swish');
  }
}

function testDecorator(target: any, key: string) {
  console.log('Target: ', target);
  console.log('Key: ', key);
}

testDecorator(Boat.prototype, 'pilot');
```

### 프로퍼티 descriptor

함수의 property decriptor 옵션에는 writable, enumerable, value, configurable이 있다. 콘솔창에서 다음의 코드 실행결과를 살펴보면 다음과 같다.

```js
const car = { make: 'honda', year: 2000 };
Object.getOwnPropertyDescriptor(car, 'make');
//{value: "honda", writable: true, enumerable: true, configurable: true}

Object.defineProperty(car, 'make', { writable: false });
// {make: "honda", year: 2000}
car.make = 'chevy';
// "chevy"
car;
// {make: "honda", year: 2000}
// car 객체의 property descriptor에서 writable 옵션을
// false로 줬기 때문에 make 프로퍼티의 값이 chevy로 변하지 않음
```

다음 데코레이터 함수의 세번째 인자가 프로퍼티 descriptor가 된다.

```js
function testDecorator(target: any, key: string, desc: PropertyDescriptor) {
  console.log('Target: ', target);
  console.log('Key: ', key);
}
```

## 프로퍼티 descriptor로 메서드 wrapping하기

다음은 logError 라는 데코레이터를 사용하여 해당 메서드 내부에서 에러가 발생했을때 이를 catch하는 로직을 데코레이터 함수에서 구현한 예시이다.

```ts
class Boat {
  color: string = 'red';

  get formattedColor(): string {
    return `This boat color is ${this.color}`;
  }

  @logError
  pilot(): void {
    throw new Error();
    console.log('swish');
  }
}

function logError(target: any, key: string, desc: PropertyDescriptor): void {
  const method = desc.value;

  desc.value = function() {
    try {
      method();
    } catch (e) {
      console.log('Ooops, boat was sunk');
    }
  };
}

new Boat().pilot();
//Ooops, boat was sunk
```

## 데코레이터 팩토리

다음의 예시처럼 데코레이터를 사용할 때 커스텀 인자를 전달하여 데코레이터를 사용하는 프로퍼티 혹은 메서드에 따라 에러메시지를 다르게 보여줄 수 있다.

```ts
class Boat {
  color: string = 'red';

  get formattedColor(): string {
    return `This boat color is ${this.color}`;
  }

  @logError('Oops boat was sunk in ocean')
  pilot(): void {
    throw new Error();
    console.log('swish');
  }
}
function logError(errorMessage: string) {
  return function(target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value;

    desc.value = function() {
      try {
        method();
      } catch (e) {
        console.log(errorMessage);
      }
    };
  };
}

new Boat().pilot();
```

## 데코레이터를 사용한 클래스 프로퍼티 접근

다음 예시의 testDecorator 를 통해 Boat 클래스의 color 프로퍼티를 출력해보면 결과는 undefined가 나온다. 데코레이터 함수는 인스턴스를 생성하기 전에 호출되기 때문에 Boat 클래스의 color 프로퍼티에 접근이 불가능하다. 즉 데코레이터 함수의 첫번째 인자인 target 을 통해 접근 가능한 객체는 Boat 프로토타입이고 이를 통해 인스턴스의 프로퍼티 값에 접근하는 일은 불가능하다.

```ts
class Boat {
  @testDecorator
  color: string = 'red';

function testDecorator(target: any, key: string) {
  console.log(target.color); //undefined
}
```

## 메서드 파라미터에 데코레이터 사용하기

다음 예시와 같이 메서드의 파라미터에 데코레이터를 사용할 수 있다. 파라미터 데코레이터 함수의 세번째 인자에는 해당 데코레이터가 사용되는 메서드 매개변수의 인덱스가 전달된다.

```ts
class Boat {
  pilot(@parameterDecorator speed: string, @parameterDecorator generateWake: boolean): void {
    if (speed === 'fast') {
      console.log('swish');
    } else {
      console.log('nothing');
    }
  }
}

function parameterDecorator(target: any, key: string, index: number) {
  console.log(key, index);
}

// pilot 1
// pilot 0
```

## 클래스에 데코레이터 사용하기

```ts
@classDecorator
class Boat {
  color: string = 'red';
}

function classDecorator(constructor: typeof Boat) {
  console.log(constructor);
}

// [Function: Boat]
```
