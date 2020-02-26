---
title: 타입스크립트 데코레이터
date: '2019-12-08T21:46:37.121Z'
template: 'post'
draft: true
slug: '/category/typescript/typescript-decorators'
category: 'typescript'
tags:
  - 'typescript'
description: ''
socialImage: '/media/image-2.jpg'
---

> **[유데미 TYPESCRIPT](https://www.udemy.com/course/understanding-typescript/learn/lecture/)** 수업을 듣고 정리한 내용입니다.

## 데코레이터 설정

타입스크립트에서 데코레이터를 사용하기 위해서는 `tsconfig.js`에서 다음 설정을 해줘야 한다.

```json
"experimentalDecorators": true
```

## 데코레이터

데코레이터는 다음과 같이 사용할 수 있다.

```typescript
function Logger(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}

@Logger
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();
console.log(pers);
```

## 데코레이터 팩토리

```typescript
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@Logger('LOGGING -PERSON')
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}
```

## 데코레이터 실전 예시

```html
<body>
  <div id="app"></div>
</body>
```

```typescript
function WithTemplate(template: string, hookId: string) {
  return function(constructor: any) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  };
}

@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}
```

## 데코레이터 여러개 사용하기

```typescript
@Logger('LOGGING -PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}
```

## 프로퍼티 데코레이터

프로퍼티 데코레이터는 언제 실행이 될까? 여기서는 Product 클래스의 인스턴스를 만들지도 않았다. 프로퍼티 데코레이터는 클래스가 정의될 때 실행이 된다.

```typescript
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target, propertyName);
}

class Product {
  @Log
  title: string;
  private _price: number;

  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive!");
    }
  }
  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }
  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
```

## 접근자(getter & setter) & 파라미터 데코레이터

```typescript
function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator!');
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator!');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}
```
