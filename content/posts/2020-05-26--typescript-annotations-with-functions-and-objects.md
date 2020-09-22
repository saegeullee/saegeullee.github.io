---
title: 타입스크립트 어노테이션 사용하기
date: '2020-05-26T12:50:37.121Z'
template: 'post'
draft: false
slug: '/typescript/typescript-annotations'
category: 'typescript'
tags:
  - 'typescript'
description: '타입스크립트 어노테이션을 사용하는 방법을 알아본다.'
socialImage: '/media/image-2.jpg'
---

> **[Typescript: The Complete Developer's Guide [2020]](https://www.udemy.com/course/typescript-the-complete-developers-guide)** 수업을 듣고 정리한 내용입니다.

## 타입스크립트 어노테이션 사용하기(변수)

```typescript
// Annotations with Variables
let apples: number = 5;
let speed: string = 'fast';
let hasName: boolean = false;
let nothtingMuch: null = null;
let nothing: undefined = undefined;

let now: Date = new Date();

//Array
let colors: string[] = ['blue', 'red', 'green'];
let myNumbers: number[] = [1, 2, 3];
let truths: boolean[] = [true, true, false];

//Classes
class Car {}
let car: Car = new Car();

//Object literal
let point: {
  x: number;
  y: number;
} = {
  x: 10,
  y: 20
};

//Function
const logNumber: (i: number) => void = (i: number) => {
  console.log(i);
};
```

위의 모든 경우는 타입스크립트의 타입 추론 기능이 있기 때문에 어노테이션을 명시적으로 지정해주지 않아도 된다. 하지만 다음의 3가지 경우에는 반드시 타입스크립트 어노테이션을 사용해야 한다.

```typescript
// When to use annotations
// 1) Function that returns the 'any' type
const json = '{"x": 10, "y": 20}';
const coordinates: { x: number; y: number } = JSON.parse(json);
console.log(coordinates);

// 2) When we declare a variable on one line and initialize it later
let words = ['red', 'green', 'blue'];
let foundWord: boolean;

for (let i = 0; i < words.length; i++) {
  if (words[i] === 'green') {
    foundWord = true;
  }
}

// 3) Variable whose type cannot be inferred correctly
let numbers = [-10, -1, -12];
let numberAboveZero: boolean | number = false;
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}
```

## 타입스크립트 어노테이션 사용하기(함수)

함수에서는 다음과 같이 타입스크립트 어노테이션을 사용할 수 있다. 매개변수의 타입은 반드시 지정해줘야 한다. 리턴 타입은 타입스크립트 추론 기능으로 명시적으로 지정해주지 않아도 되지만 개발자가 코드를 작성하다 return 문을 깜빡하고 함수 내부에서 작성하지 않는 실수를 방지하기 위해 리턴 타입도 명시적으로 작성해주는 것이 좋다.

```typescript
const add = (a: number, b: number): number => {
  return a + b;
};

const subtract = (a: number, b: number): number => {
  return a - b;
};

function divide(a: number, b: number): number {
  return a / b;
}

const multiply = function(a: number, b: number): number {
  return a * b;
};

const logger = (message: string): void => {
  console.log(message);
};

const throwError = (message: string): never => {
  throw new Error(message);
};
```

다음과 같이 어노테이션과 함께 destructuring 도 사용할 수 있다.

```typescript
//Destructuring with annotations
const todaysWeather = {
  date: new Date(),
  weather: 'sunny'
};

const logWeather = ({ date, weather }: { date: Date; weather: string }): void => {
  console.log(date);
  console.log(weather);
};

logWeather(todaysWeather);
```

## 타입스크립트 어노테이션 사용하기(객체)

객체에서 어노테이션 사용하기

```typescript
const profile = {
  name: 'alex',
  age: 20,
  coords: {
    lat: 0,
    lng: 15
  },
  setAge(age: number): void {
    this.age = age;
  }
};

const { age }: { age: number } = profile;
const {
  coords: { lat, lng }
}: { coords: { lat: number; lng: number } } = profile;
```

## Types Arrays

```typescript
const carMakers = ['ford', 'toyota', 'chevy'];

// 빈 배열을 할당할 때는 타입을 명시적으로 지정해줘야한다.
const emptyArray: string[] = [];
const emptyMultiDimensionArray: String[][] = [];

const carsByMake = [['f150'], ['corolla'], ['camaro']];
```

### Types Array를 사용하는 이유

```typescript
// Help with inference when extracting values
const car1 = carMakers[0];
const myCar = carMakers.pop();

// Prevent incompatible values
carMakers.push(100);

// Help with 'map'
carMakers.map((car: string): string => {
  return car.toUpperCase();
});

// Flexible types
const importantDates: (Date | string)[] = [new Date(), '2030-10-10'];
importantDates.push('2030-10-11');
importantDates.push(new Date());
```

## 튜플

```typescript
// 튜플에 타입의 순서를 명시적으로 지정해줌
type Drink = [string, boolean, number];

const pepsi: Drink = ['brown', true, 40];
pepsi[0] = 40; //error

const tea: Drink = ['white', false, 0];
```
