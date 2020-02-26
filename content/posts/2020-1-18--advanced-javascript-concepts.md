---
title: Advanced Javascript Concept
date: '2020-01-18T11:12:37.121Z'
template: 'post'
draft: true
slug: '/javascript/leetcode'
category: 'javascript'
tags:
  - 'javascript'
description: ''
socialImage: '/media/image-2.jpg'
---

> **[Advanced Javascript Concept](https://www.udemy.com/course/advanced-javascript-concepts/)** 강의를 정리한 내용입니다.

## 자바스크립트 엔진

![javascript engine](/media/advanced_javascript_concept_jsengine.png)

개발자가 작성한 자바스크립트 파일은 자바스크립트 엔진에 의해 실행이 된다. 자바스크립트 엔진은 먼저 자바스크립트 파일에 대해 `lexical analysis`라는 일을 수행한다. 이는 자바스크립트 파일에 작성된 자바스크립트 코드를 분석하기 위해 이를 쪼개어 토큰으로 만든다. 그리고 이 토큰은 `AST(Abstract Syntax Tree)`로 구성이 된다.

**[https://astexplorer.net/](https://astexplorer.net/)** 사이트에 가보면 AST가 어떻게 구성되었는지 확인해볼 수 있다.

그 후

## 인터프리터와 컴파일러

인터프리터는 코드를 한줄 한줄 읽어 나가면서 실행시킨다.

```js
function someCalculation(x, y) {
  return x + y;
}

for (let i = 0; i < 1000; i++) {
  someCalculation(5, 4);
}
```

반면, 컴파일러는 개발자가 작성한 코드를 컴파일시킨다. 코드가 실행되기 전에 컴파일이 수행되는데 개발자가 작성한 코드를 컴퓨터가 이해하기 쉬운 다른 형태의 코드로 미리 변환시켜 놓는다.

![javascript compiler](/media/advanced_javascript_concept_compiler.png)

자바스크립트 인터프리터는 개발자가 작성한 자바스크립트 코드를 한줄씩 읽어나가며 해당 코드에 대한 `Bytecode`를 만들어낸다.<br>

## jit(just in time) compiler

`인터프리터(ignition)`는 AST를 전달받아 `Bytecode`를 생성한다. 그 다음 프로파일러(모니터)는 자바스크립트 코드가 실행될 때 이를 살펴보고 코드가 어떻게 최적화될 수 있을지를 판단한다. 그리고 컴파일러는 이를 전달받아 기존에 비효율적으로 실행되고 있는 바이트코드를 최적화된 머신코드로 대체한다. 즉, 자바스크립트 코드의 실행 속도가 점점 개선된다. 프로파일러와 컴파일러는 인터프리터가 생성하고 실행시키고 있는 바이트코드를 지속적으로 개선해나가기 때문이다. v8 엔진의 컴파일러의 이름은 `TurboFan`이다.

## v8 engine

**[https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)**<br>
V8 was first designed to increase the performance of JavaScript execution inside web browsers. In order to obtain speed, V8 translates JavaScript code into more efficient machine code instead of using an interpreter. It compiles JavaScript code into machine code at execution by implementing a JIT (Just-In-Time) compiler like a lot of modern JavaScript engines do such as SpiderMonkey or Rhino (Mozilla). The main difference here is that V8 doesn’t produce bytecode or any intermediate code.

## Call Stack and Memory Heap

## Garbage collection

## Memory Leak

### global variable

```js
var a = 1;
var b = 2;
var c = 3;
```

### Event listeners

```js
var element = document.getElementById('button');
element.addEventListener('click', onClick);
```

### setInterval

```js
setInterval(() => {
  // referencing objects..
});
```

## Single Threaded

자바스크립트는 싱글 쓰레드 프로그래밍 언어이다. 싱글 쓰레드이기 때문에 한번에 하나의 intruction만 실행이 될 수 있다. 하나의 프로그래밍 언어가 싱글쓰레드인지를 확인하는 방법은 해당 언어가 하나의 콜스택만을 가지고 있는지를 확인하면 된다.
