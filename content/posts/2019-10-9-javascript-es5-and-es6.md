---
title: Javascript ES5 vs ES6(variable, blocks, strings, arrow functions)
date: "2019-10-0T16:16:37.121Z"
template: "post"
draft: false
slug: "/category/javascript/javscript-es5-and-es6/"
category: "javascript"
tags:
  - "javascript"
description: "javascript ES5와 ES6 비교"
socialImage: "/media/image-2.jpg"
---


> **[유데미 자바스크립트](https://www.udemy.com/course/the-complete-javascript-course/)** 수업을 듣고 정리한 내용입니다.
#Variable declaration with let and const
ES6에서는 변수를 선언하는 키워드가 바뀌었다. ES5에서는 `var x`와 같이 변수를 선언하였다. ES6에서는 `let`,`const`가 추가되었다.

```javascript
var es5 = 1; #ES5
let es6_let = 1; #ES6
const es6_const = 1; #ES6

es5 = 2; #값을 바꿀 수 있다.
es6_let = 2; #값을 바꿀 수 있다.
es6_const = 2; #값을 바꿀 수 없다. Assigned to constant variable. 에러 발생

```
ES5의 `var`는 function scoped이고, ES6의 `const`와 `let`은 block scoped이다.

```javascript
#ES5
function driverLicense5(passedTest) {
  if(passedTest) {
    var firstName = 'John';
    var yearOfBirth = 1990;
  }

  console.log(firstName + ', born in ' + yearOfBirth + 
  ', is now officially allowed to drive a car.')
}

driverLicense5(true);
#output
#John, born in 1990, is now officially allowed to drive a car.
var는 function scoped이기 때문에 같은 function 안에 
있으면 해당 변수에 접근할 수 있다.

#ES6
function driverLicense6(passedTest) {
  if(passedTest) {
    let firstName = 'John';
    const yearOfBirth = 1990;
  }

  console.log(firstName + ', born in ' + yearOfBirth + 
  ', is now officially allowed to drive a car.')
}

driverLicense6(true);
#output
#Uncaught ReferenceError: Cannot access 'firstName' 
before initialization at driverLicense6
let과 const는 block scoped 이기 때문에 if문 block 안에서 
선언 및 초기화된 변수들을 if문 block 밖에서 접근할 수 없다.
```

위의 ES6 예시는 아래와 같이 작성해야 정상적으로 작동한다.
```javascript
function driverLicense6(passedTest) {
  let firstName;
  const yearOfBirth = 1990

  if(passedTest) {
    firstName = 'John';
    #const(상수)이기 때문에 값 변경 불가능
    #yearOfBirth = 1990;
  }

  console.log(firstName + ', born in ' + yearOfBirth + 
  ', is now officially allowed to drive a car.')
}

driverLicense6(true);
#output
#John, born in 1990, is now officially allowed to drive a car.
```

변수 선언 이전에 해당 변수를 사용하면서 발생하는 결과에 대한 차이점은 다음과 같다.
```javascript
#ES5
function driverLicense5(passedTest) {

    console.log(firstName);
    var firstName = 'John';
}
driverLicense5(true);
#output undefined. 
execution context에서 모든 변수들은 hoisted되고 undefined로 셋팅된다.
따라서 해당변수를 선언하고 초기화하기 전에 사용하면 undefined가 된다.

#ES6
function driverLicense6(passedTest) {
    
    console.log(firstName);
    let firstName = 'John';
}

driverLicense6(true);
#output
#Uncaught ReferenceError: firstName is not defined
변수가 선언되기 전에 사용하지 못한다.(에러방지
)
```

###memo -> execution context와 hoisting 포스팅 작성후 참조할 것

#Blocks and IFFEs

ES5에서는 IFFE(Immediately Invoked Function Expression)를 사용하여 data privacy를 구현하였다.
하지만 ES6에서는 let, const가 block scoped이기 때문에 훨씬 간단하게 block {}만 사용하면 된다.

```javascript
#ES5
(function() {
  var c = 3;
})();

console.log(c);
#output
Uncaught ReferenceError: c is not defined

```

```javascript
#ES6
{
  const a = 1;
  let b = 2;
}

console.log(a + b);
#output
Uncaught ReferenceError: Cannot access 'a' before initialization
block scoped이기 때문에 block 외부에서 접근 불가능
```

```javascript
#ES6
{
  var c = 3;
}

console.log(c);
#output
3
var로 선언하였기 때문에 function scoped가 되어 block 외부에서 접근가능
```

#Strings

```javascript
let firstName = "John";
let lastName = "Smith";
const yearOfBirth = 1990;

function calcAge(year) {
  return 2016 - year;
}

#ES5
console.log(
  "This is " +
    firstName +
    " " +
    lastName +
    ". He was born in " +
    yearOfBirth +
    ". Today, he is " +
    calcAge(yearOfBirth) +
    " years old."
);

#ES6 - template literals
console.log(
  `This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. 
  Today, he is ${calcAge(yearOfBirth)} years old.`
);
```

#Arrow functions
```javascript
const years = [1990, 1965, 1982, 1937];

#ES5
var age5 = years.map(function(el) {
  return 2016 - el;
});

#ES6
#ES6에서는 function, return, 중괄호{}를 생략하고 동일하게 표현 가능
let age6 = years.map((el) => 2016 - el);
#인자가 하나일 경우 아래와 같이 괄호()을 생략가능
let age6 = years.map(el => 2016 - el);

```

```javascript
#인자가 두 개 이상일 경우에는 반드시 괄호()를 붙여야 한다.
age6 = years.map((el, index) => `Age elements ${index + 1}: ${2019 - el}. `);
console.log(age6);

#리턴하기 전에 다른 코드를 실행시키고 싶으면 중괄호{}로 감싸고
#return을 써야한다.
age6 = years.map((el, index) => {
  const now = new Date().getFullYear();
  const age = now - el;
  return `Age elements ${index + 1}: ${age}. `;
});

```

###메서드와 일반 함수에서 this 키워드의 차이점
참고로 메서드란 객체 내부에 속한 함수를 지칭한다. 아래의 예시에서 box5 객체에 속한 clickMe라는 함수는 메서드이다.
```javascript
#ES5
var box5 = {
  color: "green",
  position: 1,
  clickMe: function() {
    #clickMe 함수는 box5 객체에 속한 메서드이다. 여기서 this 는 이 객체를 가리킨다. 
    #따라서 color:green 과 position:1을 this 키워드를 통해 접근 가능하다.
    console.log("color : " + this.color + " position : " + this.position);
    document.querySelector(".green").addEventListener("click", function() {
      var str =
      #이 콜백 함수는 box5 객체에 속한 메서드가 아니라 일반 함수이다.  
      #따라서 이 콜백 함수 내부에서 사용된 this는 box5 객체를 가리키는 것이 아니라 
      #window 객체를 가리킨다.따라서 this.position과 this.color는 undefined가 된다.
        "This is box number " + this.position + " and it is " + this.color;
      alert(str);
    });
  }
};

위의 예시에서 발생하는 문제를 ES5에서는 아래와 같이 해결할 수 있다.
box5 = {
  color: "green",
  position: 1,
  clickMe: function() {
    var self = this;
    document.querySelector(".green").addEventListener("click", function() {
      var str =
        #box5 객체의 color :green 과 position:1 에 접근 가능
        "This is box number " + self.position + " and it is " + self.color;
      alert(str);
    });
  }
};
```

###ES6 function arrow 에서의 this

```javascript
#ES6
const box6 = {
  color: "blue",
  position: 2,
  clickMe: function() {
    document.querySelector(".blue").addEventListener("click", () => {
      var str =
      #arrow function을 사용하면 this 키워드가 box6 객체를 가리킨다.
      #arrow function은 자신의 주변과 this 키워드를 공유하기 때문이다. 
      #따라서 this를 통해 box6 객체의 position:2 와 color: blue 에 접근가능하다.
        "This is box number " + this.position + " and it is " + this.color;
      alert(str);
    });
  }
};

```

아래의 예시에서는 다시 콜백 arrow function 내부의 this.position 과 this.color 은 undefined가 된다.
왜그럴까? 자세히 보면 아래의 예시와 바로 위의 예시의 차이점은 위의 예시에서는 clickMe 메서드를 ES5문법인 function 키워드를 사용하여 
선언하였고 아래의 예시는 ES6의 arrow function으로 선언하였다. 따라서 아래의 예시에서 clickMe 메서드 내부에서 this 는 global window 객체를 가리킨다. arrow function은 자신의 주변과 this키워드를 공유하고 그 주변은 global scope이기 때문에 window를 가리키게 된다.
```javascript
const box66 = {
  color: "blue",
  position: 2,
  clickMe: () => {
    #여기서 this는 window 객체를 가리킨다.
    document.querySelector(".blue").addEventListener("click", () => {
      var str =
        #따라서 여기서도 this는 window 객체를 가리킨다.
        "This is box number " + this.position + " and it is " + this.color;
      alert(str);
    });
  }
};

```