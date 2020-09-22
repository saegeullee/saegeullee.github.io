---
title: javascript this
date: '2020-06-25T11:50:37.121Z'
template: 'post'
draft: true
slug: '/javascript/javascript-this'
category: 'javascript'
tags:
  - 'javascript'
description: 'javascript'
socialImage: '/media/image-2.jpg'
---

# 6. 'this' keyword

## 6-1. Find out where and how the function is called

많은 자바스크립트 개발자 혹은 예비 개발자들은 `this`의 값을 정확히 판별하지 못합니다. 현직 개발자들 또한 매우 어려워 하는 부분입니다. 하지만 많은 개발자들의 인식과는 다르게 this 값을 판별하는 것은 결코 어렵지 않을 뿐 아니라, 매우 직관적이고 쉽습니다.
⭐️ 자바스크립트의 this 키워드는 항상 함수 내부에서 사용됩니다. this 값은 this가 사용된 함수가 "어떻게 실행되었느냐"에 따라 결정됩니다. ⭐️

```js
var age = 30;

var ken = {
  age: 20,
  logAge: function() {
    // 대부분의 상황에서 `this`는 객체입니다.
    console.log(this.age);
  }
};

var func = ken.logAge;

ken.logAge();
func();
```

13, 14번 줄의 두 가지 함수 실행문은 결국 같은 함수를 실행합니다. 하지만 콘솔의 출력 결과는 다릅니다.
즉, 함수 실행문에 따라 this의 값이 다릅니다.

함수의 선언문만을 보고 this 값을 판별할 수는 없습니다. 왜냐면 this 값은 함수가 실행되는 순간에 결정되기 때문입니다. 그래서 this 값을 판별하기 위해서는 반드시 함수의 실행문을 찾아야 합니다. 함수의 실행문을 찾고, 그 함수가 어떻게 실행되었는지만 판별한다면 this 값은 쉽게 판별할 수 있습니다.

함수가 실행될 수 있는 방식에는 아래와 같이 크게 4가지가 있습니다. 즉, this의 값 또한 4가지 경우의 수가 있다는 의미입니다.

- Regular Function Call
- Dot Notation (Object Method Call)
- Call, Apply, Bind
- "new" Keyword

위 네 가지 함수 실행 방식에 따라 this가 어떻게 달라지는지 알아보도록 하겠습니다.

## 6-2. Regular function call

this는 함수가 "어떻게" 실행되느냐에 따라 바뀌는 값이기 때문에, 함수 실행 방식이 중요해집니다. 첫 번째로 이야기 할 함수 실행 방식은 "일반 함수 실행" 방식입니다.

```js
var age = 30;

function log() {
  console.log(this.age);
}

log();
```

위의 예제에서 log 함수 선언문에는 this를 사용하고 있습니다. 이 this 값은 함수가 실행될때 결정됩니다. 해당 함수는 현재 87번 줄에 실행되고 있습니다.
특별한 특징없이 함수이름 만을 이용하여 실행하고 있습니다. 우리는 이것을 일반 함수 실행 방식이라고 부릅니다.

⭐️⭐️⭐️
일반 함수 실행 방식일 경우, 해당 함수의 this 값은 Global Object입니다. (브라우저에서는 window 객체)
⭐️⭐️⭐️

```js
var age = 30;

var ken = {
  age: 20,
  logAge: function() {
    console.log(this.age);
  }
};

var func = ken.logAge;

func();
```

앞서 봤던 위 예제를 다시 살펴보도록 하겠습니다.
this가 사용되는 함수는 ken이라는 객체의 logAge라는 속성으로 할당되어 있습니다. 하지만 명심하세요. 함수의 선언이나 할당은 this 값과 전혀 무관합니다.

해당 함수를 실행하는 부분은 12번 줄에 있습니다. 그리고 "일반 함수 호출 방식"으로 실행되었습니다. 그렇기에 `this` 값은 Global Object입니다.

```js
var age = 100;

function foo() {
  var age = 99;
  bar();
}

function bar() {
  console.log(this.age);
}

foo();
```

위 예제에서 this가 사용된 함수는 bar 함수입니다. bar 함수의 this를 결정하는 것은 이 함수의 실행문입니다. 실행문은 어디에 위치해있으며 어떻게 실행되었을까요?

```js
var age = 30;

var person = {
  age: 20,
  printAge: function() {
    bar();
  }
};

function bar() {
  console.log(this.age);
}

person.printAge();
```

콘솔에 출력되는 값은 무엇일까요?

### strict mode

Strict Mode에 대해서 알고 계시나요?

Strict Mode에서 함수가 일반 함수 실행 방식으로 실행되었을 경우, this 값은 Global Object가 아닌 undefined 입니다.

```js
'use strict';

var name = 'ken';

function foo() {
  console.log(this.name);
}

foo();
```

위 예제는 Strict Mode에서 실행되었기 때문에, this는 undefined가 되고 6번 줄에서는 오류가 발생하게 됩니다.

### summary

일반 함수 실행 방식일 경우, this의 값은 아래와 같습니다.

- Non Strict Mode: Global Object
- Strict Mode: undefined

## 6-3. Dot Notation

```js
var age = 100;

var ken = {
  age: 35,
  foo: function() {
    console.log(this.age);
  }
};

var func = ken.foo;

// Dot Notation
ken.foo();

// Regular Function Call
func();
```

위의 예제를 보면, `ken.foo()` 실행문과 `func()` 실행문은 결국 같은 함수를 실행한다는 것을 알 수 있습니다. 그리고 두 가지 실행 방식의 차이에 따라 `this` 값은 달라집니다.

**Dot Notation을 이용하여 함수를 실행할 경우, 해당 함수 내부의 this는 Dot 앞에 있는 객체를 가리키게 됩니다.** 즉, 현재 `ken.foo()` 실행문의 경우, 함수 내부의 this는 ken 객체를 가리키게 됩니다.

```js
var age = 100;

function logAge() {
  console.log(this.age);
}

var ken = {
  age: 36,
  logAge: logAge
};

var wan = {
  age: 32,
  logAge: ken.logAge
};

ken.logAge();
wan.logAge();
```

17번줄의 실행문과 18번줄의 실행문은 어떤 결과를 콘솔에 출력하게 될까요?

```js
var age = 100;

function verifyAge () {
  return this.age > 21;
}

var ken = {
  age: 20
  verifyAge: verifyAge
};

var sevenEleven = {
  sellBeer: function (customer) {
    if (!verifyAge()) {
      return "No Beer";
    }

    return "Beer";
  }
};

sevenEleven.sellBeer(ken);
```

위의 예제를 실행했을 경우, 어떤 결과가 나올지 예측해보세요.

```js
var age = 100;

function verifyAge() {
  return this.age > 21;
}

var ken = {
  age: 20,
  verifyAge: verifyAge
};

var sevenEleven = {
  sellBeer: customer => {
    if (!customer.verifyAge()) {
      return 'No Beer';
    }

    return 'Beer';
  }
};

sevenEleven.sellBeer(ken);
```

위의 예제를 실행했을 경우, 어떤 결과가 나올지 예측해보세요.

```js
var age = 30;

const person1 = {
  age: 20,
  logAge: function() {
    console.log(this.age);
  }
};

const people = [person1];

const employees = {
  list: people
};

employees.list[0].logAge();
```

함수 실행문의 Dot 앞에 위치한 값이 this 값으로 사용됩니다. 위의 예제에서 Dot 앞에 위치한 값은 무엇입니까?

```js
function makePerson(name, age) {
  return {
    name,
    age,
    verifyAge: () => {
      return this.age > 21;
    }
  };
}

const ken = makePerson('ken', 30);

if (ken.verifyAge()) {
  alert('Yes, Beer!');
} else {
  alert('No, Beer!');
}
```

위의 예제를 실행했을 경우, 어떤 결과가 나올지 예측해보세요. (고민해보신 후, 힌트를 보시기 바랍니다.)

## 6-4. Call, Apply, Bind

지금까지 두 가지 함수 실행 방식을 살펴보았습니다.

### 1️⃣ Regular Function Call

- [strict mode]: this refers to undefined
- [non strict mode]: this refers to the Global Object

### 2️⃣ Dot Notation

this refers to the object with the dot

🚨 Function is also an object, have its own methods

세 번째 함수 실행 방식을 알아보기 전에 자바스크립트 객체에 대해 다시 한번 살펴보도록 하겠습니다.

```js
const list = [1, 2];

list.push(3);
```

위의 예제에서 보듯, 모든 자바스크립트 배열은 내장되어 있는 push 메소드를 사용할 수 있습니다. push 메소드는 배열에 요소를 추가할 수 있는 기능을 합니다.

```js
const person = {
  age: 30,
  name: 'ken'
};

const stringified = person.toString();
console.log(stringified);
```

이와 같이 모든 자바스크립트 객체(배열, 함수 포함)은 내장된 메소드들을 갖고 있습니다. 함수 또한 함수만의 메소드가 있고, 우리가 살펴보게 될 세 번째 함수 실행 방식은 함수의 특정 메소드를 이용한 방식입니다.

## ⭐️ Explicit Binding ⭐️

우리가 살펴볼 세 번째 방식은 Explicit Binding이라고 부르는 방식입니다. 함수의 .call, .apply, .bind 라는 메소드를 사용하는 방식입니다.

### 1️⃣ Function.prototype.call

모든 함수는 .call 메소드를 사용할 수 있습니다.

```js
function foo() {
  console.log('hello!');
}

// foo 함수 실행
foo();

// foo 함수 실행
foo.call();
```

위의 예제에서 foo 함수는 총 2번 실행됩니다. 6번줄에서 1회, 9번줄에서 1회가 실행됩니다.

위의 예제는 여러분께 .call 메소드가 함수를 실행한다는 사실을 상기시켜 드리기 위한 목적입니다. 일반적인 상황이라면, 6번줄과 같이 실행시켜야 합니다.

```
.call 메소드를 실행한다는 것은 .call이 사용된 함수를 실행한다는 것과 동일한 의미입니다.
```

그렇다면 어떤 경우에 .call 메소드를 이용하여 함수를 실행시켜야 할까요?

```js
function logAge() {
  console.log(this.age);
}

const person = {
  age: 20
};

// call 메소드를 이용한 함수 실행
logAge.call(person);
```

위의 예제에서 `logAge.call(person)` 구문은 두 가지 기능을 합니다.

1. logAge 함수의 this를 첫 번째 인자로 받은 person으로 설정합니다.
2. logAge 함수를 실행합니다. (함수 내부 구문들이 실행됩니다.)

```
.call 메소드는 첫 번째 인자로 받은 값을 this로 설정하여 함수를 실행합니다.
```

```js
function foo(a, b, c) {
  console.log(this.age);
  console.log(a + b + c);
}

var ken = {
  age: 35
};

foo.call(ken, 1, 2, 3);
```

.call 메소드의 첫 번째 인자는 해당 함수의 this 값으로 사용되며, 두 번째 인자를 시작으로 나머지 인자들은 해당 함수의 인자로 전달됩니다.

```
결론적으로 .call 메소드는 받을 수 있는 인자의 갯수 제한이 없습니다.
```

### 2️⃣ Function.prototype.apply

```js
function foo(a, b, c) {
  console.log(this.age);
  console.log(a + b + c);
}

var ken = {
  age: 35
};

foo.apply(ken, [1, 2, 3]);
```

위 예제를 보시면 .call 메소드와 유사하다는 것을 알 수 있습니다. 단지 차이점은 인자의 갯수입니다. .apply 메소드는 두 개의 인자만을 받고, 첫 번째 인자는 this 값으로 사용되며, 두 번째 인자는 반드시 배열이여야만 하고 해당 배열의 요소들이 함수의 인자로 전달됩니다.

```
.apply 메소드는 2개의 인자 만을 받고, 첫 번째 인자는 this 값으로 사용되며, 두 번째 인자는 반드시 배열이여야만 하고 해당 배열의 요소들이 함수의 인자로 전달됩니다. 메소드가 사용된 함수를 실행한다는 사실은 변함이 없습니다.
```

### .call과 .apply 요약

공통점

- 첫 번째 인자를 this 값으로 설정한다.
- [중요] 메소드가 사용된 함수를 실행시킨다.

차이점

- call 메소드: 첫 번째 인자를 제외한 나머지를 모두 `.call` 이 사용된 함수의 인자로 전달한다.
- apply 메소드: 두 번째 인자로 배열을 받을 수 있으며, 해당 배열의 모든 요소들을 함수의 인자로 전달한다.

즉, `.call` 메소드는 받는 인자의 갯수 제한이 없는 반면에 `.apply` 메소드는 단 2개의 인자 만을 받을 수 있고 두 번째 인자는 반드시 배열이어야 합니다.

### 3️⃣ Function.prototype.bind

`.bind` 메소드는 `.call`, `.apply`와 약간의 차이가 있습니다.

```
처음 보시는 분들이 매우 혼돈스러워 하는 부분이니 반드시 예제에 대한 탐구를 신중히 해보시기 바랍니다.
```

```js
function foo() {
  console.log('hello!');
}

// bind 메소드는 "새로운 함수"를 반환합니다.
const bar = foo.bind();

bar();
```

위 예제에서 `.bind` 메소드는 foo 함수를 실행하지 않습니다. 즉, 6번 줄에서 foo 함수가 실행되는 것은 아닙니다.

bind 메소드는 새로운 함수를 반환합니다. 즉, bar 변수에 담기는 값이 함수입니다.

bind 메소드가 반환한 함수를 실행할때, 메소드가 사용된 함수가 실행됩니다. 즉, 8번 줄이 실행될때 foo 함수가 실행됩니다.

위에서 언급한 반환값에 대한 차이점을 제외한다면 bind 메소드는 call 메소드와 유사합니다. 첫 번째 인자로 주어진 값을 this로 설정합니다.

```js
function foo() {
  console.log(this.age);
}

const ken = {
  age: 35
};

const bar = foo.bind(ken);

bar(); // 35 출력
```

위 예제 코드를 실행할 경우, 11번 줄의 실행문은 foo 함수를 실행하며 this 값은 ken입니다. 그 이유는 9번 줄에서 bind 함수의 첫 번째 인자로 들어간 값이 this로 설정되었기 때문입니다.

```
다시 한번 말씀드리지만, bind 메소드는 "새로운 함수"를 반환합니다. 반환된 이 함수를 실행해야 원본 함수가 실행됩니다.

```

```js
function foo(a, b, c) {
  console.log(this.age);
  console.log(a + b + c);
}

const ken = {
  age: 35
};

const bar = foo.bind(ken, 1, 2, 3);

bar(); // 35 출력, 6 출력
```

bind 메소드는 call 메소드와 유사하게 받을 수 있는 인자의 갯수에 대한 제한이 없습니다. 첫 번째 인자는 this 값으로 설정되며, 나머지 인자는 모두 메소드가 사용된 함수에 인자로 전달됩니다. 위의 경우에는 1, 2, 3이 각각 a, b, c로 foo 함수에 대한 인자로 전달됩니다.

foo 함수가 실행되는 것은 12번 줄입니다. 10번 줄의 실행문은 foo 함수를 실행시키지는 않고, this 값과 나머지 인자 값들을 저장한 후, 새로운 함수를 반환합니다.

```js
function foo(a, b, c) {
  console.log(this.age);
  console.log(a + b + c);
}

const ken = {
  age: 35
};

// 1은 `a` 매개변수에 할당됩니다.
const bar = foo.bind(ken, 1);

// 2와 3이 각각 `b`, `c` 매개변수에 할당됩니다.
bar(2, 3); // 35 출력, 6 출력
```

bind 메소드는 위 예제처럼 사용할 수도 있습니다. bind 메소드의 두 번째 인자를 포함한 나머지 인자는 foo 함수에 전달됩니다. 즉, 현재 1이라는 값이 a 매개변수의 값으로 사용됩니다.

현재 위 예제에서 bind 메소드가 반환한 새로운 함수는 bar 변수에 할당되어 있습니다. 이 함수 또한 인자를 받을 수 있고, 인자가 주어질 경우 bind가 사용된 함수의 인자로 전달됩니다. 만약 앞서 bind 메소드가 호출될 당시 주어진 인자가 있다면, 그 뒤에 이어서 전달됩니다.

즉, 현재 1은 a, 2와 3은 b와 c 매개변수의 값으로 이용됩니다.

```js
function foo(a, b, c, d, e, f) {
  console.log(this.age);
  console.log(a + b + c + d + e + f);
}

const ken = {
  age: 35
};

// 1 -> a
// 2 -> b
// 3 -> c
const bar = foo.bind(ken, 1, 2, 3);

// 4 -> d
// 5 -> e
// 6 -> f
bar(4, 5, 6); // 35 출력, 21 출력
```

bind 메소드는 받을 수 있는 인자 갯수에 대한 제한이 없습니다. bind가 반환한 함수 또한 마찬가지입니다.

```
다시 한번 말씀드리지만, bind 메소드는 "새로운 함수"를 반환합니다. 반환된 이 함수를 실행해야 원본 함수가 실행됩니다.
```

## 6-5. "new" keyword

지금까지 총 3가지의 함수 실행 방식에 대해 알아보았습니다. 이번에 알아볼 마지막 함수 실행 방식은 new 키워드를 사용한 함수 실행입니다.

```
키워드라 하면, 자바스크립트에 내장된 명령어입니다.
```

자바스크립트에서 우리는 아래와 같이 new 키워드와 함께 함수를 실행할 수 있습니다. 앞에 new가 있다는 점만 제외한다면, 일반 함수 실행문과 동일합니다.

```js
function foo() {
  console.log('I am just a function..');
}

new foo();
```

new 키워드를 사용한 함수 내부에서 this 를 사용할 경우, this의 값은 새로운 빈 객체가 됩니다.

```js
function foo() {
  console.log(this);
}

new foo();
```

위의 예제를 실행할 경우, 콘솔에는 아무런 속성도 갖고 있지 않은 빈 객체가 출력됩니다.
(콘솔에 출력된 객체 앞에 붙은 이름은 아직 중요하지 않습니다.)

```js
function person(name) {
  this.name = name;
  console.log(this);
}

new person('ken');
```

위에서 보시듯, this는 새로운 빈 객체로 시작하지만, 우리가 원한다면 새로운 속성을 추가할 수도 있습니다.
new 키워드와 함께 사용될 경우, 우리는 해당 함수를 "생성자 함수"라고 부릅니다.

```js
function person(name) {
  this.name = name;
  console.log(this);
}

// 일반 함수로 사용되었습니다.
person('ken');

// 생성자 함수로 사용되었습니다.
new person('ken');
```

같은 함수라 하더라도 new 키워드와 함께 사용했는지에 따라, 생성자 함수가 될 수도 있고 아닐 수도 있습니다.

```
일반적인 경우, 생성자 함수 용도로 만든 함수는 생성자 함수로만 사용되고, 일반 함수 용도로 만든 함수는 일반 함수로만 사용됩니다. 생성자 함수의 용도로 만든 함수를 일반 함수처럼 사용하거나, 일반 함수의 용도로 만든 함수를 생성자 함수로 사용하는 경우는 거의 없습니다.
```

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

new Person('ken', 30);
```

생성자 함수의 경우에는 함수명을 대문자로 시작하는 통상적인 표기법이 있습니다.

```
보통 함수를 만드는 단계에서 이미 생성자 함수 용도의 함수를 만들 것인지 혹은 일반적인 용도로 만들 것인지는 정해져 있기 마련입니다.
생성자 함수의 용도에 대해서는 조만간 다루게 될 테니, 조금 혼란스럽더라도 크게 걱정하지 마세요.
```

### Summary

new 키워드를 이용하여 함수를 실행했을 경우, 해당 함수의 this는 새로운 빈 객체가 됩니다.

## Quiz

```js
const something = {
  age: 10,
  speak: function() {
    console.log(this.age);
  }
};

const butler = {
  age: 20,
  serve: function(cb) {
    cb();
  }
};

butler.serve(something.speak);
```

콘솔에 출력되는 값은 무엇입니까?

```js
function programmer() {
  this.isSmart = false;

  this.upgrade = function(version) {
    this.isSmart = !!version;
    work();
  };

  return this;
}

function work() {
  if (this.isSmart) {
    window.alert('I can do my work! I am smart!');
  }
}

const programmer = new programmer();

programmer.upgrade(1);
```

위 예제는 14번 줄의 alert 를 발생시킬까요?
