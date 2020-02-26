---
title: 함수형 프로그래밍과 자바스크립트 ES6+
date: '2020-01-27T21:12:37.121Z'
template: 'post'
draft: true
slug: '/javascript/functional-programming-and-javascript-es6'
category: 'javascript'
tags:
  - 'javascript'
description: '함수형 프로그래밍은 성공적인 프로그래밍을 위해 부수 효과를 미워하고 조합성을 강조하는 프로그래밍 패러다임이다. 부수효과를 미워한다는 것은 순수함수를 만든다는 뜻인데 순수함수란 들어온 인자가 같으면 항상 같은 결과를 리턴하는 함수이다...'
socialImage: '/media/image-2.jpg'
---

> **[함수형 프로그래밍과 Javascript ES6+](https://www.inflearn.com/course/functional-es6)** 수업을 듣고 정리한 내용입니다.

## 기존과 달라진 ES6에서의 리스트 순회

ES5과 비교하여 ES6에서의 리스트 순회방법은 다음과 같이 달라졌다. ES5에서는 어떻게 리스트를 순회할지를 명령적이고 구체적으로 기술하는 반면 ES6에서는 보다 선언적이고 간결하게 변경되었다. 이것은 단순하게 조금 복잡한 for문을 간결하게 만든것 이상의 의미가 있다. ES6가 개발자에게 어떤 규약을 열어주었고 어떻게 순회에 대해 추상화를 하여 사용하게 했는지에 대해 알아본다.

```js
//ES5
const list = [1, 2, 3];
for (var i = 0; i < list.length; i++) {
  log(list[i]);
}
const str = 'abc';
for (var i = 0; i < str.length; i++) {
  log(str[i]);
}

//ES6
for (const a of list) {
  log(a);
}
for (const a of str) {
  log(a);
}
```

```js
=
```
