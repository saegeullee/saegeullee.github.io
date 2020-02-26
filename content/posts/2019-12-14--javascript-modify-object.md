---
title: 자바스크립트 데이터 가지고 놀기
date: '2019-12-14T11:16:37.121Z'
template: 'post'
draft: false
slug: '/category/javascript/javascript-modify-object/'
category: 'javascript'
tags:
  - 'javascript'
description: '이 포스팅에서는 앞으로 자바스크립트를 공부하면서 새로 알게 되거나 중요한 자바스크립트 데이터 조작 및 생성 방법에 대해 정리한다.'
socialImage: '/media/image-2.jpg'
---

이 포스팅에서는 앞으로 자바스크립트를 공부하면서 새로 알게 되거나 중요한 자바스크립트 데이터 조작방법 및 생성방법에 대해 정리한다.

## 객체에 특정 키가 존재하는지 검사하기

```js
const arr = [1, 2, 3, 4, 5, 1, 3, 5];
const obj = {};
for (let i = 0; i < arr.length; i++) {
  if (arr[i] in obj) {
    obj[arr[i]] += 1;
  } else {
    obj[arr[i]] = 1;
  }
}

console.log(obj); // {1: 2, 2: 1, 3: 2, 4: 1, 5: 2}
```

## 객체의 특정 키 삭제하기

```js
const obj = {
  name: 'louies',
  age: 29,
  city: 'seoul',
  phone: '01012341234'
};

const excludedFields = ['age', 'phone'];

excludedFields.forEach(el => delete obj[el]);
console.log(obj); // obj객체에는 city와 name 프로퍼티만 남음
```

## 배열의 특정 인덱스 엘리먼트 삭제하기

delete 로 배열의 특정 인덱스의 값을 삭제할 수 있다. 하지만 아래의 결과와 같이 값이 삭제되고 empty가 남는다.

```js
const arr = [1, 2, 3, 4, 5];
delete arr[1];
console.log(arr); // [1, empty, 3, 4, 5]
```

## 특정 범위의 숫자 중 임의의 수 랜덤하게 뽑아내기

아래의 예시는 20~111 사이의 수를 랜덤하게 뽑아낸다.

```js
const randomNumber = Math.ceil(Math.random() * (111 - 20) + 20);
```
