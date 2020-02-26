---
title: 타입스크립트 인터페이스
date: '2019-12-07T21:46:37.121Z'
template: 'post'
draft: false
slug: '/category/typescript/typescript-interfaces'
category: 'typescript'
tags:
  - 'typescript'
description: '인터페이스를 사용하여 커스텀 타입의 객체를 만들 수 있다. 아래의 예시에서 Person 인터페이스는 특정 객체가 반드시 name, age 프로퍼티를 갖고 greet 메서드를 갖는 객체로 구현되어야 함을 나타낸다...'
socialImage: '/media/image-2.jpg'
---

> **[유데미 TYPESCRIPT](https://www.udemy.com/course/understanding-typescript/learn/lecture/)** 수업을 듣고 정리한 내용입니다.

# 목차

- [인터페이스](#인터페이스)
- [클래스에 인터페이스 사용하기](#클래스에-인터페이스-사용하기)
- [인터페이스와 상속](#인터페이스와-상속)
- [인터페이스로 함수 타입 지정하기](#인터페이스로-함수-타입-지정하기)
- [파라미터와 프로퍼티 옵션주기](#파라미터와-프로퍼티-옵션주기)

## 인터페이스

인터페이스를 사용하여 커스텀 타입의 객체를 만들 수 있다. 아래의 예시에서 Person 인터페이스는 특정 객체가 반드시 name, age 프로퍼티를 갖고 greet 메서드를 갖는 객체로 구현되어야 함을 나타낸다.

```typescript
interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: 'louies',
  age: 29,
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
};

user1.greet('hi there I am');
```

## 클래스에 인터페이스 사용하기

아래의 예시에서 Person 클래스는 Greetable 인터페이스를 구현했다. 인터페이스는 이를 구현하는 클래스에서 특정 프로퍼티와 메서드를 반드시 구현하게끔 하고 싶을 때 사용할 수 있다. 즉 Greetable 인터페이스의 name 프로퍼티와 greet 메서드는 Person 클래스에서 반드시 구현되어야 한다.

```typescript
interface Greetable {
  name: string;

  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 30;

  constructor(name: string) {
    this.name = name;
  }

  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}

let user1: Greetable;

user1 = new Person('Louies');
user1.greet('hi there I am');
```

인터페이스에도 프로퍼티에 `readonly` 를 붙일 수 있다. 인터페이스를 구현한 클래스에서 최초에 프로퍼티에 초기화 할 때만 write를 할 수 있다.

```typescript
interface Greetable {
  readonly name: string;

  greet(phrase: string): void;
}
```

## 인터페이스와 상속

클래스는 여러개의 인터페이스를 구현할 수 있다. 아래의 예시에서 Person 클래스는 Greetabe, Named 두 개의 인터페이스를 구현했다.

```typescript
interface Named {
  readonly name: string;
}

interface Greetable {
  greet(phrase: string): void;
}

class Person implements Greetable, Named {
  name: string;
  age = 30;

  constructor(name: string) {
    this.name = name;
  }

  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}
```

하나의 인터페이스는 다른 인터페이스를 상속 받을 수 있다. 다음 예시에서 Greetable 인터페이스는 Named, Aged 두개의 인터페이스를 상속 받았다. 인터페이스는 여러개의 인터페이스를 상속받을 수 있다. 하지만 클래스는 단 하나의 클래스만 상속 받을 수 있다.

```typescript
interface Aged {
  age: number;
}
interface Named {
  readonly name: string;
}
interface Greetable extends Named, Aged {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 30;

  constructor(name: string) {
    this.name = name;
  }

  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}
```

## 인터페이스로 함수 타입 지정하기

`type alias`로 다음과 같이 두개의 number 인풋을 받아 number 을 리턴하는 함수 타입을 지정할 수 있다.

```typescript
type AddFn = (a: number, b: number) => number;
```

다음과 같이 인터페이스로도 함수 타입을 지정할 수 있다.

```typescript
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};
```

## 파라미터와 프로퍼티 옵션주기

클래스와 인터페이스에는 프로퍼티와 파라미터를 옵션으로 줄 수 도 있다. 아래의 예시에서 Person 클래스는 Named 인터페이스의 outputName 프로퍼티를 구현하지 않았지만 에러가 발생하지 않는다. Named 인터페이스를 정의할 때 outputName 프로퍼티의 뒤에 물음표 ? 를 붙여줌으로써 이는 반드시 구현하지 않아도 되는 옵션임을 알려줬기 때문이다. 물론 구현을 해도 된다.

```typescript
interface Named {
  readonly name: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 30;

  constructor(name: string) {
    this.name = name;
  }

  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}
```

다음과 같이 Person 클래스의 constructor의 매개변수에 옵션을 줌으로서 Person 클래스의 인스턴스를 만들 때 인자를 주지 않아도 된다.

```typescript
interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(name?: string) {
    if (name) {
      this.name = name;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + ' ' + this.name);
    } else {
      console.log('Hi');
    }
  }
}

let user1: Greetable;

user1 = new Person();
user1.greet('hi there I am');
```

다음과 같이 Person 클래스의 constructor의 매개변수에 ? 대신 디폴트 값을 지정해줄 수도 있다.

```typescript
  constructor(name: string = "") {
    if (name) {
      this.name = name;
    }
  }
```
