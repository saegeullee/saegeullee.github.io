---
title: 타입스크립트 타입 기본
date: '2019-12-07T10:46:37.121Z'
template: 'post'
draft: false
slug: '/category/typescript/typescript-basic'
category: 'typescript'
tags:
  - 'typescript'
description: '아래의 예시 코드와 같이 add 함수에 들어오는 매개변수의 타입을 정의할 수 있다. 만약 `const number1 = 5`와 같이 string 타입으로 주면 타입스크립트는 add 함수를 호출하는 부분의 number1 매개변수 부분에 빨간 밑줄이 나타나면서 할당 불가능하다는 메시지를 보여준다...'
socialImage: '/media/image-2.jpg'
---

> **[유데미 TYPESCRIPT](https://www.udemy.com/course/understanding-typescript/learn/lecture/)** 수업을 듣고 정리한 내용입니다.

# 목차

- [타입 사용하기](#타입-사용하기)
- [타입스크립트의 타입추론](#타입스크립트의-타입추론)
- [object](#object)
- [array](#array)
- [tuple](#tuple)
- [enum](#enum)
- [union](#union)
- [literal](#literal)
- [type aliases](#type-aliases)
- [function type](#function-type)
- [function type on callbacks](#function-type-on-callbacks)

## 타입 사용하기

아래의 예시 코드와 같이 add 함수에 들어오는 매개변수의 타입을 정의할 수 있다. 만약 `const number1 = "5"`와 같이 string 타입으로 주면 타입스크립트는 add 함수를 호출하는 부분의 number1 매개변수 부분에 빨간 밑줄이 나타나면서 할당 불가능하다는 메시지를 보여준다.

```typescript
function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  let result = n1 + n2;
  if (showResult) {
    console.log(phrase + result);
  } else {
    return result;
  }
}

const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Result is: ';

add(number1, number2, printResult, resultPhrase);
```

## 타입스크립트의 타입추론

타입스크립트는 타입을 추론할 수 있다. 변수를 선언 할 때 아래와 같이 number1 변수의 타입은 number라고 지정해 줄 수 있지만 이는 불필요하다. 타입스크립트는 number1 변수에 할당 된 값이 5라는 것을 인지하여 자동으로 number 타입임을 알 수 있기 때문이다.

```typescript
const number1: number = 5;
```

하지만 아래와 같이 변수를 선언과 초기화를 따로 한다면 타입을 지정해주는 것이 좋다.

```typescript
let number1: number;
number1 = 5;
```

## object

타입스크립트에서 object는 아래와 같이 object의 property와 property의 타입을 지정해줄 수 있지만 타입추론 기능이 있기 때문에 불필요하다.

```typescript
const person: {
  name: string;
  age: number;
} = {
  name: 'Louieslee',
  age: 30
};

console.log(person.name);
```

## Array

string의 배열은 아래와 같이 선언하고 초기화 할 수 있다.

```typescript
let favoriteActivities: string[];
favoriteActivities = ['Sports'];
```

```typescript
const person = {
  name: 'Louieslee',
  age: 30,
  hobbies: ['Sports', 'Cooking']
};

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  //console.log(hobby.map()); // 에러 발생
}
```

## Tuple

타입스크립트에서 튜플은 고정된 길이의 배열이다. 예를 들어 반드시 두 개의 엘리먼트만 필요한 배열이 필요하다면 이는 튜플로 관리 할 수 있다. 아래의 튜플 타입정의에서 role 은 첫번째 엘리먼트는 반드시 number 타입이어야 하고 두번째 엘리먼트는 string 타입이어야 한다. 그리고 튜플의 길이는 반드시 2여야 한다.

```typescript
const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: 'Louieslee',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: [2, 'author']
};

person.role[1] = 10; //에러발생
person.role = [2, 'author', 'player']; //에러발생, 튜플 길이 3
person.role.push('player'); //정상 작동
//타입스크립트 컴파일러가 push 는 잡아내지 못한다.
```

## Enum

enum은 개발자가 파악하기 쉽게 number에 라벨을 붙여준다. 타입스크립트는 아래의 예시에서 디폴트로 ADMIN, READ_ONLY, AUTHOR에 각각 0, 1, 2 값을 부여한다.

```typescript
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR
}

const person = {
  name: 'Louieslee',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN
};
```

아래와 같이 직접 값을 지정해줄 수도 있다. READ_ONLY,AUTHOR 은 자동으로 각각 1씩 증가한 6, 7 이 된다.

```typescript
enum Role {
  ADMIN = 5,
  READ_ONLY,
  AUTHOR
}
```

또는 아래와 같이 string과 number을 마음대로 지정해줄 수도 있다.

```typescript
enum Role {
  ADMIN = 'ADMIN',
  READ_ONLY = 100,
  AUTHOR = 200
}
```

## Union

타입스크립트의 Union 타입은 아래의 예시와 같이 하나의 프로퍼티에 두 개 이상의 타입을 허용할 때 사용할 수 있다.

```typescript
function add(n1: number | string, n2: number | string) {
  let result;
  if (typeof n1 === 'number' && typeof n2 === 'number') {
    result = n1 + n2;
  } else {
    result = n1.toString() + n2.toString();
  }
  return result;
}

const addNumbers = add(1, 2);
const addStrings = add('hi', 'there');
```

## Literal

리터럴 타입은 특정 string만을 타입으로 사용할 수 있게 해준다.

```typescript
function isAllowedStr(str: 'string1' | 'string2') {
  console.log(str);
}

isAllowedStr('string1'); // 허용
isAllowedStr('hello'); // 에러
```

## Type Aliases

타입 Alias는 아래와 같이 특정 Union 타입을 지칭하는 reference로 사용할 수 있다.

```typescript
type Combinable = number | string;
type StringAllowed = 'string1' | 'string2';

function add(n1: Combinable, n2: Combinable) {
  let result;
  if (typeof n1 === 'number' && typeof n2 === 'number') {
    result = n1 + n2;
  } else {
    result = n1.toString() + n2.toString();
  }
  return result;
}

function isAllowedStr(str: StringAllowed) {
  console.log(str);
}
```

Union 타입뿐만 아니라 object 타입에도 Alias를 줄 수 있다.

```typescript
function greet(user: { name: string; age: number }) {
  console.log('Hi, I am ' + user.name);
}
function isOlder(user: { name: string; age: number }, checkAge: number) {
  return checkAge > user.age;
}
```

위의 코드가 아래와 같이 짧아졌다.

```typescript
type User = { name: string; age: number };

function greet(user: User) {
  console.log('Hi, I am ' + user.name);
}
function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}
```

## Function type

타입스크립트에서는 함수도 타입으로 지정해줄 수 있다. 함수도 여러가지의 형태가 있을 수 있다. 예를 들어 아래의 `addNums` 함수와 같이 매개변수 number 2개를 인자로 받아 이를 더해 number을 결과값으로 리턴하는 함수가 있다. 이 경우의 함수를 타입으로 지정하려면 어떻게 해야 할까?

```typescript
function addNums(n1: number, n2: number) {
  return n1 + n2;
}
function printResult(num: number): void {
  console.log('Result: ' + num);
}
printResult(addNums(4, 9));
```

아래와 같이 `combinedValues` 변수에 담을 수 있는 함수 타입을 지정해줄 수 있다. `combinedValues`는 반드시 number 두 개를 인풋으로 받아 number을 리턴하는 함수의 주솟값만 담을 수 있다.

```typescript
let combineValues: (a: number, b: number) => number;
combineValues = addNums;
// combineValues = printResult; //에러 발생

console.log(combineValues(5, 5)); //output 10
```

## Function type on Callbacks

아래의 예시와 같이 콜백함수의 타입도 지정해줄 수 있다.

```typescript
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(3, 4, res => {
  console.log(res);
});
```
