---
title: 자바스크립트 완벽가이드 정리(Array)
date: "2019-11-05T11:16:37.121Z"
template: "post"
draft: false
slug: "/category/javascript/-javascript-the-definitive-guide/"
category: "javascript"
tags:
    - "javascript"
description: "자바스크립트 완벽가이드 책 정리"
socialImage: "/media/image-2.jpg"
---

> **[자바스크립트 완벽가이드](http://www.yes24.com/Product/Goods/24769929)** 책의 내용을 정리했습니다.

# Array

## concat()

-   현재 배열에 주어진 요소들을 이어 붙인다.
-   전달인자를 array에 이어 붙인 새 배열이 반환된다. 원본 배열은 변경 X
-   concat()의 전달인자에 배열이 있을 경우, 인자로 주어진 배열 자체가 아니라 배열의 각 요소를 이어 붙인다.

```javascript
var a = [1, 2, 3];
a.concat([4, 5]); // [1, 2, 3, 4, 5] 반환
a.concat([4, 5], [6, 7]); // [1, 2, 3, 4, 5, 6, 7] 반환
```

## every()

-   모든 배열 요소에 대해 주어진 단언 함수가 참인지를 검사한다.
-   배열 요소를 순회하다 단언 함수의 반환 값이 false 이면 순회를 중지하고 즉시 false를 반환
-   빈 배열에 대해서는 항상 true를 반환

```javascript
[1, 2, 3].every(el => el < 5); // true 반환

//각 배열 인덱스 i에 대해, 단언 함수는 다음 세 인자로 호출한다.
predicate(array[i], i, array);
```

## some()

-   주어진 단언함수가 참이 되는 배열 요소가 최소 하나 이상이 있는지 검사한다.
-   오름차순으로 배열을 순회하고 각 배열 요소에 대해 지정된 단언 함수를 호출한다.
-   만약 단언함수가 true 를 반환하면, 순회를 중단하고 즉시 true를 반환한다.
-   만약 모든 단언 함수의 반환값이 false이면 some() 메서드는 false를 반환한다.
-   빈 배열에 대해 호출하면, false를 반환한다.

## filter()

-   단언 함수를 통과한 배열 요소들을 포함한 배열을 얻는다.

```javascript
[1, 2, 3].filter(x => x > 1); // [2, 3]
```

## forEach()

-   각 배열 요소에 대해 주어진 함수를 호출한다.
-   이 메서드는 값을 반환하지 않는다.

```javascript
var a = [1, 2, 3];
a.forEach((x, i, a) => {
    a[i]++;
}); // a는 [2, 3, 4]
```

## indexOf()

-   일치하는 요소를 검색한다.

```
array.indexOf(value)
array.indexOf(value, start)
value -> 검색할 값
start -> 검색을 시작할 인덱스 값으로 생략 가능, 생략시 0이 사용됨
```

-   start보다 크거나 같은 위치에 있는 배열 요소 중, value와 엄격하게 동등한(=== 연산자의 결과가 true) 가장 작은 엔덱스 값을 반환한다. 일치하는 요소가 없으면 -1을 반환한다.

```javascript
["a", "b", "c"]
    .indexOf("b") // => 1
    [("a", "b", "c")].indexOf("d") // => -1
    [("a", "b", "c")].indexOf("a", 1); // => -1
```

## lastIndexOf()

-   배열의 뒤쪽부터 요소를 검색한다.

## join()

-   모든 배열 요소를 문자열로 변환한 후, 하나의 문자열로 이어 붙인다.

```
array.join()
array.join(separator)
separator -> 각 배열 요소를 구분할 목적으로 사용
생략시 쉼표(,)를 써서 구분한다.
```

```javascript
a = new Array(1, 2, 3, "testing");
s = a.join("+"); // s는 문자열 "1+2+3+testing"
```

## map()

-   이 배열의 요소에서 새 배열 요소를 계산한다.
-   map()은 기존 배열과 같은 길이를 가진 새로운 배열을 생성하며, 기존 배열의 각 요소를 함수 f에 전달하고 f의 반환값을 새로운 배열의 요소로 사용한다.

```javascript
[1, 2, 3].map(x => x * x); // => [1, 4, 9]
```

## pop()

-   배열의 맨 끝에 있는 요소를 제거하고 그 값을 반환
-   만약 배열이 이미 비어 있다면 배열을 변경하지 않고 undefined를 반환

## push()

-   배열의 맨 뒤에 요소를 하나 추가한다.
-   새 배열 생성 X, 원래의 배열을 직접 변경한다.

## reduce()

-   배열 요소로부터 어떤 값을 계산한다.

```
array.reduce(f)
array.reduce(f, initial)
f -> 두 값(배열의 두 요소)를 결합하여 '리듀스'된 새 값을 반환하는 함수
initial -> 배열 리듀스를 시작할 초기값, 생략 가능, 만약 이 인자가 지정되면
reduce()는 이 인자 값이 배열의 가장 첫 번째 값인 것 처럼 작동한다.
```

-   처음 f 호출에는 배열의 첫 두 요소가 전달된다. 그 다음 f 호출에는 먼젓번 호출의 결과 값과 배열의 다음 요소(오름차순)가 전달된다. 마지막 f 호출의 결과 값이 reduce() 메서드 자체의 반환값이 된다.

```javascript
[1, 2, 3, 4].reduce((x, y) => x * y); // => 24 ((1*2)*3)*4
```

## reduceRight()

-   배열의 오른쪽부터 왼쪽으로 리듀스를 수행한다.

## reverse()

-   배열 요소들의 순서를 뒤집는다.
-   원본 배열 안에서 직접 수행된다. 새로운 배열 반환 X

## shift()

-   배열의 처음 요소를 제거한 후 이 값을 반환하다.
-   모든 배열 요소들을 앞쪽으로 한 칸씩 이동시킨다. 맨 앞에 있던 요소는 배열에서 제거된다.
-   만일 빈 배열이라면 shift() 메서드는 아무것도 하지 않고 undefined를 반환한다.
-   새 배열 생성 X, 원본 배열을 직접 변경한다.

```javascript
var a = [1, [2, 3], 4];
a.shift(); // 1을 반환, a = [[2,3], 4]
a.shift(); // [2,3]을 반환, a = [4]
```

## unshift()

-   배열의 맨 앞에 요소를 삽입

```
array.unshift(value, ...)
value -> array의 맨 앞에 삽입될 하나 또는 그 이상의 값들.
```

-   요소가 삽입된 후의 배열 길이를 반환한다.
-   새 배열 생성 X. 원본 배열을 직접 변경한다.
-   unshift()는 대개 shift()와 함께 사용된다.

```javascript
var a = [];
a.unshift(1); // a: [1]  반환값: 1
a.unshift(22); // a: [22, 1] 반환값: 2
a.shift(); // a: [1] 반환값: 22
a.unshift(33, [4, 5]); // a: [33, [4,5], 1] 반환값 : 3
```

## slice()

-   배열의 일부분을 반환한다.

```
array.slice(start, end)
start -> 잘라낼 부분의 시작 인덱스.
이 값이 음수라면 배열 끝에서부터의 위치를 나타낸다.
-1은 마지막 요소를, -2는 끝에서 두번째 요소를 나타낸다.
end -> 잘라낼 부분의 바로 뒤 인덱스.(end 자신은 포함X)
이 값이 지정되지 않으면 start부터 배열 끝까지 모든 요소를 잘라낸다.
이 값이 음수이면 배열 끝에서부터의 위치를 나타낸다.
```

-   slice()는 원본 배열을 변경하지 않는다.
-   원래 배열의 일부분을 직접 제거하고 싶다면 Array.splice() 이용하면 된다.

```javascript
var a = [1, 2, 3, 4, 5];
a.slice(0, 3); // [1, 2, 3]을 반환
a.slice(3): // [4, 5]를 반환
a.slice(1, -1); // [2, 3, 4]를 반환
a.slice(-3, -2); // [3]를 반환
```

## sort()

```
array.sort()
array.sort(orderfunc)
orderfunc -> 정렬 순서를 지정하는 함수. 생략 가능
```

-   배열 요소들을 정렬한다.
-   원본 배열 내에서 정렬되므로, 복사본을 만들지 않는다.
-   아무런 전달인자 없이 sort()를 호출하면 배열의 요소들이 알파벳 순서로 정렬된다.
-   만약 알파벳 순서가 아닌 다른 순서로 정렬하려면 비교함수를 제공해야 한다.
-   undefined 요소들은 항상 배열의 맨 끝으로 정렬된다.

```javascript
//숫자 순서로 정렬하기 위한 비교 함수.
function numberorder(a, b) {
    return a - b;
}
a = new Array(33, 4, 1111, 222);
a.sort(); // 알파벳 순서로 정렬한 결과 : 1111, 222, 33, 4
a.sort(numberorder); // 숫자 순서로 정렬한 결과: 4, 33, 222, 1111
```

## splice()

-   배열 요소를 삽입, 삭제 또는 교체한다.

```
array.splice(start, deleteCount, value, ...)
start -> 추가 또는 삭제할 배열 요소의 시작위치
deleteCount -> start부터 시작하여 배열에서 삭제할 배열 요소의
개수(start 포함) 이 전달인자는 선택 사항이다.
지정되지 않을 경우, start부터 끝까지 모든 요소를 삭제한다.
value -> 배열에 삽입할 0개 또는 그 이상의 값들
삽입 작업은 start로 지정한 인덱스에서 시작한다.
```

-   slice() 와는 달리, splice()는 배열을 직접 변경한다.
-   배열에서 삭제된 요소들의 배열을 반환한다.

```javascript
var a = [1, 2, 3, 4, 5, 6, 7, 8];
a.splice(1, 2); // [2, 3]을 반환, a는 [1, 4, 5, 6, 7, 8]
a.splice(1, 1); // [4]를 반환, a는 [1, 4, 5, 6, 7, 8]
a.splice(1, 0, 2, 3); // []을 반환, a는 [1, 2, 3, 4, 5, 6, 7, 8]
```

## toString()

-   배열을 문자열로 변환하여 반환
-   toString()은 배열을 문자열로 변환하기 위해, 먼저 배열에 속한 각 요소들을 문자열로 변환한다.
-   그 후, 각 요소들 사이에 쉼표를 삽입하여 출력한다.
-   이 반환값은 join() 메서드를 아무런 전달인자 없이 호출했을 때 얻는 반환값과 동일한 문자열이다.
