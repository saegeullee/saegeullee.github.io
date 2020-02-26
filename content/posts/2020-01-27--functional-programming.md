---
title: 함수형 프로그래밍
date: '2020-01-26T21:12:37.121Z'
template: 'post'
draft: false
slug: '/javascript/functional-programming'
category: 'javascript'
tags:
  - 'javascript'
description: '함수형 프로그래밍은 성공적인 프로그래밍을 위해 부수 효과를 미워하고 조합성을 강조하는 프로그래밍 패러다임이다. 부수효과를 미워한다는 것은 순수함수를 만든다는 뜻인데 순수함수란 들어온 인자가 같으면 항상 같은 결과를 리턴하는 함수이다...'
socialImage: '/media/image-2.jpg'
---

> **[함수형 프로그래밍](https://www.inflearn.com/course/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/)** 수업을 듣고 정리한 내용입니다.

# 함수형 프로그래밍 개요

## 함수형 프로그래밍이란

성공적인 프로그래밍이란 좋은 프로그램을 만드는 일이다. 좋은 프로그램은 사용성, 성능, 확장성, 기획 변경 등에 대한 대응력이 좋다. 이것들을 효율적이고 생산적으로 이루는 일이 성공적인 프로그래밍이다.

함수형 프로그래밍은 성공적인 프로그래밍을 위해 부수 효과를 미워하고 조합성을 강조하는 프로그래밍 패러다임이다.
부수효과를 미워한다는 것은 순수함수를 만든다는 뜻인데 순수함수란 들어온 인자가 같으면 항상 같은 결과를 리턴하는 함수이다. 또한, 함수가 받은 인자외에 다른 어떤 외부의 상태에 영향을 끼치지 않는 함수를 말한다. 그리고 리턴값 외에는 외부와 소통하는 것이 없는 함수를 의미한다.

함수형 프로그래밍은 조합성을 강조하는데 이러한 순수함수들의 조합으로 프로그래밍을 하는것을 의미한다. 조합성을 강조한다는 것은 모듈화 수준을 높인다는 것이고 순수함수로 모듈화 수준을 높이게 되면 오류를 줄이고 안정성을 높일 수 있다. 모듈화 수준을 높다는 것은 성공적인 프로그래밍을 했다고 볼 수 있는데 모듈화 수준을 높임으로서 결론적으로 생산성을 높일 수 있기 때문이다.

## 순수함수

다음의 `add` 함수는 순수함수이다. 동일한 인자를 주면 동일한 결과를 리턴하기 때문이다. 두번째로는 부수효과가 없기 때문이다. 함수가 리턴값으로 결과를 만드는 것 외에 외부의 상태에 영향을 미치는 것을 부수효과라고 하는데 순수함수는 부수효과가 없는 함수를 의미한다.

```js
function add(a, b) {
  return a + b;
}

console.log(add(10, 5));
console.log(add(10, 5));
console.log(add(10, 5));
```

다음의 `add2` 함수는 순수함수가 아니다. 동일한 인자에 대해 결과가 달라졌기 때문이다.

```js
var c = 10;
function add2(a, b) {
  return a + b + c;
}
console.log(add2(10, 2)); //22
c = 20;
console.log(add2(10, 2)); //32
```

다음의 `add3` 함수는 순수함수가 아니다. 함수 내부에서 외부의 상태를 변경하는 부수효과가 있기 때문이다.

```js
var c = 20;
function add3(a, b) {
  c = b;
  return a + b;
}
```

다음의 `add4` 함수는 순수함수가 아니다. 위와 마찬가지로 함수가 실행되면 함수 외부의 객체의 상태를 변경하기 때문이다. 그렇다면 함수형 프로그래밍에서는 객체를 다룰수 없을까? 아니다. 당연히 데이터의 기본 타입인 객체를 다룰 수 없다는 것은 말이 되지 않는다. 함수형 프로그래밍에서는 객체를 다루는 방법이 다르다. 원래 있던 값은 그대로 두고 새로운 값을 복사해서 이를 리턴하는 방식으로 함수를 만든다.

```js
var obj1 = { val: 10 };
function add4(obj, b) {
  obj.val += b;
}

console.log(obj1.val); // 10
add4(obj1, 20);
console.log(obj1.val); // 30
```

다음의 `add5` 함수는 순수함수이다.

```js
var obj1 = { val: 10 };
function add5(obj, b) {
  return { val: obj.val + b };
}

console.log(obj1.val); // 10
add5(obj1, 20);
console.log(obj1.val); // 10
```

<br>

순수함수의 또 한가지 중요한 특징은 순수함수는 평가 시점이 중요하지 않다. 이것이 함수형 프로그래밍이 가능한 중요한 이유이고 함수형 프로그래밍에서 중시하는 개념이다. 위의 예에서 `add2` 함수를 보면 c의 값이 변경되는 시점 이전과 이후로 함수 실행에 대한 결과가 달라진다. 즉 순수함수가 아니기 때문에 함수를 평가하는 시점(리턴값을 받는 시점)이 중요하고 평가 시점에 따라 로직이 정해지게 된다.<br>
반면에 위의 첫번째 예시인 `add`함수인 순수함수는 언제 실행하더라도 항상 같은 결과를 리턴하기 때문에 순수함수가 아닌 함수보다 조합성을 강조할 수 있다. `add`함수는 언제 평가되도 상관없기 때문에 평가시점을 개발자가 다룰 수 있게 된다. 즉 이 함수를 다른 함수의 인자로 넘긴다든지 서로 다른 쓰레드나 다른 공간에서 함수를 실행시켜도 항상 동일한 결과를 리턴하기 때문에 안전하고 다루기 쉬운 함수가 된다.

## 일급 함수

자바스크립트에서는 함수가 일급 함수이다. 일급 함수란 함수를 값으로 다룰 수 있는 것을 의미한다. 함수를 값으로 다룰 수 있으면 함수를 변수에 담을 수 있고 다른 함수의 인자로 함수를 넘길 수도 있다. 그리고 다른 함수에서는 인자로 받은 함수를 실행시킬 수도 있게 된다.<br>
즉, 일급 함수이기 때문에 런타임에서 함수를 정의할 수 있고 함수를 값으로 들고 다닐수 있고 이를 인자로 보낼 수 있고 함수를 들고 다니다가 원할 때 평가할 수 있다.

## 함수형 프로그래밍 정의

"함수형 프로그래밍은 애플리케이션, 함수의 구성요소, 더 나아가 언어 자체를 함수처럼 여기도록 만들고, 이러한 함수 개념을 가장 우선순위에 놓는다."<br>
"함수형 사고방식은 문제의 해결 방법을 동사(함수)들로 구성(조합)하는 것"<br>
by 마이클 포거스[클로저 프로그래밍의 즐거움]에서

## 함수를 우선순위로 하는 프로그래밍

아래의 예시와 같이 객체가 먼저 나오느냐 함수가 먼저 나오느냐에 따라 객체가 먼저나오면 객체 지향 프로그래밍이고 함수가 먼저 나오면 함수형 프로그래밍이다. 객체 지향 프로그래밍에서는 데이터를 먼저 디자인하고 그 데이터에 맞는 메서드를 만드는 순서로 프로그래밍을 하고 함수형 프로그래밍에서는 함수를 먼저 만들고 그 함수에 맞게 데이터를 구성하는 순서로 프로그래밍을 한다.

```js
// 데이터(객체) 기준
duck.moveLeft();
duck.moveRight();
dog.moveLeft();
dog.moveRight();

// 함수 기준
moveLeft(dog);
moveRight(duck);
moveLeft({ x: 5, y: 2 });
moveRight(dog);
```

# 함수형으로 전환하기

## 명령형 코드

```js
var users = [
  { id: 1, name: 'ID', age: 36 },
  { id: 2, name: 'BJ', age: 32 },
  { id: 3, name: 'JM', age: 32 },
  { id: 4, name: 'PJ', age: 27 },
  { id: 5, name: 'HA', age: 25 },
  { id: 6, name: 'JE', age: 26 },
  { id: 7, name: 'JI', age: 31 },
  { id: 8, name: 'MP', age: 23 }
];

// 1. 명령형 코드
// 1. 30세 이상인 users를 거른다.
var temp_users = [];
for (var i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    temp_users.push(users[i]);
  }
}
console.log(temp_users);

// 2. 30세 이상인 users의 names를 수집한다.
var names = [];
for (var i = 0; i < temp_users.length; i++) {
  names.push(temp_users[i].name);
}
console.log(names);

// 3. 30세 미만인 users를 거른다.
var temp_users = [];
for (var i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    temp_users.push(users[i]);
  }
}
console.log(temp_users);

// 4. 30세 미만인 users의 ages를 수집한다.
var ages = [];
for (var i = 0; i < temp_users.length; i++) {
  ages.push(temp_users[i].age);
}
console.log(ages);
```

## map, filter

위의 명령형 코드를 `_filter`, `_map`으로 리팩토링하면 다음과 같다. `_filter` 함수를 고차 함수라고도 부른다. 고차함수는 함수를 인자로 받거나 함수를 리턴하거나 함수 안에서 인자로 받은 함수를 실행하는 함수를 말한다.

```js
function _filter(users, predi) {
  var new_list = [];
  for(var = i; i < users.length; i++) {
    if(predi(users[i])) {
      new_list.push(users[i])
    }
  }
}

// 어떤 유저를 필터링 할지를 결정하는 로직을 _filter 외부의 함수에게 위임한다.
console.log(
  _filter(users, function(user) {
    return user.age >=30;
  })
)

console.log(
  _filter(users, function(user) {
    return user.age < 30;
  })
)
```

`_filter` 함수는 users만을 필터링 할 수 있는 함수가 아니다. 다음과 같이 어떤 배열이든 필터링할 수 있는 함수로 일반화할 수 있다. 그리고 해당 배열 데이터를 필터링하는 `predi` 함수를 개발자가 지정하여 인자로 넘겨줄 수 있다. 다형성이 높고 재활용성이 높은 함수가 되었다.

```js
function _filter(list, predi) {
  var new_list = [];
  for(var = i; i < list.length; i++) {
    if(predi(list[i])) {
      new_list.push(list[i])
    }
  }
  return new_list
}

console.log(
  _filter([1, 2, 3, 4], function(num) {
    return num % 2;
  })
)

console.log(
  _filter([1, 2, 3, 4], function(num) {
    return !(num % 2);
  })
)

```

다음의 `_map` 함수는 인자로 받은 list에서 각 객체의 어떤 데이터를 수집할 것인지를 결정하는 함수를 mapper 매개변수를 통해 전달받는다. 이 함수 내부를 보면 외부에서 전달받은 데이터 형이 어떻게 생겼는지를 확인할 수 없다. 이는 함수형 프로그래밍의 또다른 중요한 특징이다. 관심사가 분리되어 이 함수는 재활용성이 극대화된다.

```js
function _map(list, mapper) {
  var new_list = [];
  for (var i = 0; i < list.length; i++) {
    new_list.push(mapper(list[i]));
  }
  return new_list;
}

var over_30 = _filter(users, function(user) {
  return user.age >= 30;
});
console.log(over_30);

var names = _map(over_30, function(user) {
  return user.name;
});
console.log(names);

var under_30 = _filter(users, function(user) {
  return user.age < 30;
});
console.log(under_30);

var ages = _map(under_30, function(user) {
  return user.age;
});
console.log(ages);
```

다음은 위의 코드를 간결하게 표현하여 실행하는 코드이다.

```js
console.log(
  _map(
    _filter(users, function(user) {
      return user.age >= 30;
    }),
    function(user) {
      return user.name;
    }
  )
);

console.log(
  _map(
    _filter(users, function(user) {
      return user.age < 30;
    }),
    function(user) {
      return user.age;
    }
  )
);
```

## each

위의 `_filter`와 `_map` 함수에는 for 루프에서 리스트를 순회하는 부분이 중복되었다. 이부분을 `_each` 함수로 중복을 제거하여 처리하면 다음과 같다.

```js
function _filter(list, predi) {
  var new_list = [];
  _each(list, function(val) {
    if (predi(val)) new_list.push(val);
  });
  return new_list;
}

function _map(list, mapper) {
  var new_list = [];
  _each(list, function(val) {
    new_list.push(mapper(val));
  });
  return new_list;
}

function _each(list, iter) {
  for (var i = 0; i < list.length; i++) {
    iter(list[i]);
  }
}
```

## 외부 다형성

자바스크립트에는 이미 `map`과 `filter`함수가 정의되어 있다. 정확히 말하면 메서드인데 배열 타입의 객체에 사용할 수 있는 메서드이다. 즉, 특정 데이터 타입만 지원하는 것이다.<br>

한편, 자바스크립트에는 정확히 배열타입은 아니지만 `배열과 같은(array-like)` 객체 타입이 있다. 예를들어 `document.querySelectorAll('*')`를 통해 현재 웹 페이지의 모든 html 태그의 리스트를 얻어올 수 있는데 이것이 배열처럼 생기기는 했지만 배열은 아니다. 따라서 이 객체에는 자바스크립트의 내장 `map`, `filter` 등의 배열 메서드를 사용할 수 없다. 즉 다형성을 지원하기 어렵다. <br>

하지만 함수가 기준이되는 함수형 프로그래밍에서는 함수를 먼저 만들고 이 함수에 맞는 데이터를 구성해서 함수에 적용하는 방식으로 프로그래밍을 하게된다. 이를 통해 다양한 타입을 지원하는 실용적인 함수를 만들 수 있다.

```js
console.log(
  [1, 2, 3, 4].map(function(val) {
    return val * 2;
  })
);

console.log(
  [1, 2, 3, 4].filter(function(val) {
    return val % 2;
  })
);

console.log(document.querySelectorAll('*'));
//NodeList(341) [html, head, meta, meta, link, script...]

//TypeError .map is not a function
document.querySelectorAll('*').map(function(node) {
  return node.nodeName;
});
```

예를들어 array-like 타입인 `NodeList` 객체에도 위에서 만든 `_map` 함수를 사용할 수 있다.

```js
console.log(
  _map(document.querySelectorAll('*'), function(node) {
    return node.nodeName;
  })
);
```

## 내부 다형성

보통 자바스크립트에서는 다음의 예시처럼 두번째 인자로 넘기는 함수를 콜백 함수라고 부르지만 함수형 프로그래밍에서는 인자로 넘기는 함수(보조 함수)를 역할에 맞게끔 이름을 부르는 것이 좋다. 예를들어 위의 예시에서 사용한 `predi`, `iter`, `mapper`와 같이 말이다. <br>

`_map`과 같은 고차함수 또는 응용형 함수들은 개발자가 함수의 인자로 넘기는 배열과 해당 배열 엘리먼트의 데이터 타입에 따라 이를 조작할 보조 함수를 같이 넘길 수 있다. (동시에 정할 수 있다.) 그리고 해당 고차함수의 내부에서는 해당 데이터를 살펴보는 것 없이 데이터에 대한 조작 방법을 `mapper`, `predi`와 같은 보조함수에 위임하기 때문에 데이터 형에 있어 자유롭고 다형성을 높이는데 유리하다.

```js
_map([1, 2, 3, 4], function(v) {
  return v + 10;
});
```

## 커링

커링은 함수와 인자를 다루는 기법이다. 함수의 인자를 하나씩 적용해 나가다가 필요한 인자가 모두 채워지면 함수 본체를 실행하는 기법이다. 자바스크립트에서는 커링이 지원되지 않지만 일급 함수가 지원되고 평가 시점을 개발자가 마음대로 다룰 수 있기 때문에 커링과 같은 기법을 직접 구현할 수 있다.

```js
function _curry(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b);
    };
  };
}

// _curry 함수의 인자로 넘긴 본체함수를 값으로 원하는 시점까지 들고있다가
// 최종적으로 평가하는 기법이다.
var add = _curry(function(a, b) {
  return a + b;
});

var add10 = add(10);
var add5 = add(5);
console.log(add10(5)); //15
console.log(add(5)(3)); //15
console.log(add5(3)); // 8
```

위의 커리 함수로는 `add` 함수에 인자를 두 개 넘겼을 때는 본체함수가 실행되지 않는다. 커리 함수를 다음과 같이 구성하면 인자가 두 개가 들어온 경우 즉시 본체 함수를 실행시켜 결과를 리턴하도록 구성할 수 있다. 인자가 한 개가 들어온 경우에는 안쪽에 있는 함수를 리턴해서 본체 함수 실행을 한번더 미루는 방식으로 구성했다.

```js
function _curry(fn) {
  return function(a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function(b) {
          return fn(a, b);
        };
  };
}

var add = _curry(function(a, b) {
  return a + b;
});

console.log(add(1, 2));
```

커리를 통해 빼기를 하는 함수는 다음과 같다.

```js
var sub = _curry(function(a, b) {
  return a - b;
});

console.log(sub(10, 5)); // 5
var sub10 = sub(10);
// 아래의 결과는 5를 리턴하지만 문맥상 -5의 결과가 나와야 어울린다.
console.log(sub10(5)); // 5
```

위의 커리함수는 함수의 인자를 왼쪽 것부터 적용하고 오른쪽 것을 적용하지만 위의 빼기 함수를 문맥상 어울리게 구성하기 위해 함수의 인자로 넘긴 두 개의 인자중 오른쪽 것을 먼저 적용하고 그 다음 왼쪽것을 적용하는 `_curryr` 함수를 구성하면 다음과 같다.

```js
function _curryr(fn) {
  return function(a, b) {
    // 인자가 하나씩 들어온 경우 먼저 들어온 인자가 fn 함수의 두번째 인자로 들어간다.
    return arguments.length == 2
      ? fn(a, b)
      : function(b) {
          return fn(b, a);
        };
  };
}

var sub = _curryr(function(a, b) {
  return a - b;
});

console.log(sub(10, 5)); // 5
var sub10 = sub(10);
console.log(sub10(5)); // -5
```

## \_get

객체의 특정 키에 대한 값을 안전하게 가져오는 `_get`함수를 다음과 같이 구성할 수 있다.

```js
function _get(obj, key) {
  return obj == null ? undefined : obj[key]:
}

var user1 = users[0];
console.log(user1.name);
console.log(_get(user1, 'name'))

console.log(users[10].name); //에러 발생
console.log(_get(users[10], 'name')) // undefined
```

위의 `_get` 함수와 `_curryr` 함수를 사용하면 `_get` 함수를 객체의 특정 키의 값을 가져오는 함수로 만들 수 있다.

```js
var _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key];
});

var user1 = users[0];
console.log(_get('name')(user1));

var get_name = _get('name');
console.log(get_name(user1));
console.log(get_name(users[3]));
```

위에서 `_map`과 `_filter` 함수를 만들며 사용한 예시의 코드를 `_get` 함수를 사용하여 더 간결하게 만들 수 있다. `_get`함수를 사용하여 또 다른 함수를 만들어서 `_map`에서 사용할 `iter`함수로 사용할 수 있다.

```js
console.log(
  _map(
    _filter(users, function(user) {
      return user.age >= 30;
    }),
    _get('name')
  )
);

console.log(
  _map(
    _filter(users, function(user) {
      return user.age < 30;
    }),
    _get('age')
  )
);
```

## \_reduce

`_reduce` 함수를 다음과 같이 구성하여 배열의 모든 엘리먼트의 합을 리턴하는 함수를 만들 수 있다.

```js
function _reduce(list, iter, memo) {
  _each(list, function(val) {
    memo = iter(memo, val);
  });
  return memo;
}

console.log(_reduce([1, 2, 3], add, 0)); // 6
```

위의 `_reduce`함수에서는 세번째 인자로 맨 처음 덧셈을 할 값을 매개변수 memo로 넘겨받는다. 함수를 실행할 때 세번째 인자에 초기 메모값을 전달하지 않아도 실행되도록 구성할 수 있다.

```js
var slice = Array.prototype.slice;
// array-like 객체의 일부분을 잘라서 리턴하는 함수를 _rest로 구성한다.
function _rest(list, num) {
  return slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
  if (arguments.length == 2) {
    memo = list[0];
    //list = list.slice(1); // 반드시 배열 객체만 인자로 받을 수 있음
    list = _rest(list); // array-like 객체도 취급하기 위해 _rest 함수 사용
  }
  _each(list, function(val) {
    memo = iter(memo, val);
  });
  return memo;
}

console.log(_reduce([1, 2, 3], add)); // 6
```

다음과 같이 자바스크립트의 배열에 사용할 수 있는 `slice` 함수를 배열 객체가 아닌 `array-like` 객체에도 사용이 가능하게 구성할 수 있다.

```js
var a = document.querySelectorAll('*');
var slice = Array.prototype.slice;
slice.call(a, 0, 5);
//(5) [html, head, meta, meta, link]
```

## \_pipe : 파이프라인 만들기

`_pipe` 함수의 보다 추상화된 버전이 `_reduce` 함수이다. `_pipe` 함수는 `_reduce`로 축약을 하는데 함수들의 배열을 통해 인자를 연속적으로 적용한 최종 결과로 축약하는 함수이다.

```js
function _pipe() {
  var fns = arguments;
  return function(arg) {
    return _reduce(
      fns,
      function(arg, fn) {
        return fn(arg);
      },
      arg
    );
  };
}

var f1 = _pipe(
  function(a) {
    return a + 1;
  }, // 1 + 1
  function(a) {
    return a * 3;
  }, // 2 * 3
  function(a) {
    return a * a; // 6 * 6
  }
);

console.log(f1(1)); // 36
```

## \_go

`_pipe` 함수는 함수를 리턴하는 함수이지만 `_go`는 호출되면 즉시 실행되는 함수이다. `_go` 함수는 `_pipe` 함수의 즉시 실행 버전이다.

```js
function _go(arg) {
  var fns = _rest(arguments); // 첫번째 인자 1을 제외한 나머지 함수들을 get
  return _pipe.apply(null, fns)(arg);
}

_go(
  1,
  function(a) {
    return a + 1;
  }, // 1 + 1
  function(a) {
    return a * 3;
  }, // 2 * 3
  function(a) {
    return a * a; // 6 * 6
  },
  console.log
); // 36
```
