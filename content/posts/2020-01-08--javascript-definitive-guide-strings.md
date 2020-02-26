---
title: 자바스크립트 완벽가이드 정리(String)
date: '2019-11-07T11:16:37.121Z'
template: 'post'
draft: false
slug: '/javascript/javascript-the-definitive-guide-strings/'
category: 'javascript'
tags:
  - 'javascript'
description: '자바스크립트 완벽가이드 책 정리'
socialImage: '/media/image-2.jpg'
---

> **[자바스크립트 완벽가이드](http://www.yes24.com/Product/Goods/24769929)** 책의 내용을 정리했습니다.

# String

## String.charAt()

- 문자열의 n번째 문자를 얻는다.

## String.indexOf()

- 문자열을 검색한다.

```
string.indexOf(substring)
string.indexOf(substring, start)

substring -> string 내에서 검색할 부분 문자열
start -> 검색을 시작할 인덱스 값으로 생략 가능, 생략시 0이 사용됨

```

- string 내의 start보다 위치상 뒤에 나타난 문자열 중 가장 처음 찾은 substring의 위치를 반환한다. string에서 부분 문자열을 찾지 못하면 -1을 반환한다.

## String.lastIndexOf()

- 문자열을 역방향으로 검색한다.
- substring을 찾기 위해 문자열의 끝에서부터 시작까지 검색을 수행한다.

## String.length

- 문자열의 길이

## String.slice()

- 부분 문자열을 추출한다.

```
string.slice(start, end)

start -> 문자열 조각이 시작되는 위치를 가리키는 인덱스이다.
이 값이 음수이면 문자열의 끝부터 앞쪽으로 번호를 매겼을 때의 위치를 가리킨다.
-1 -> 문자열의 가장 마지막 문자를 가리킴
-2 -> 문자열의 끝에서 두 번째 문자를 가리킴

end -> 문자열 조각의 바로 다음 인덱스를 가리킨다.
```

- slice()는 원본 string을 변경하지 않는다.

## String.substring()

- 문자열의 부분 문자열을 반환한다.
- slice()와의 차이점은 이 메서드의 전달인자는 음수가 될 수 없다.

## String.substr()

- 부분 문자열을 추출
- ECMAScript 표준에 채택되지 않았다. 사용 권장되지 않음.

## String.split()

- 문자열을 문자열 배열로 쪼갠다.
