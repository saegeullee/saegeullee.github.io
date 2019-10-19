---
title: Introducing Python(숫자, 문자열, 변수)
date: "2019-10-16T18:46:37.121Z"
template: "post"
draft: false
slug: "/category/python/introducing-python/"
category: "python"
tags:
  - "python"
description: "처음 시작하는 파이썬 책 정리"
socialImage: "/media/image-2.jpg"
---

> **[처음시작하는 파이썬](http://www.hanbit.co.kr/store/books/look.php?p_code=B2827459900)** 책을 정리한 내용입니다.

#Chapter 2. 숫자, 문자열, 변수
파이썬에서는 모든 것(부울, 정수, 실수, 문자열, 데이터 구조, 함수, 프로그램)이 객체(object)로 구현되어 있다. 이러한 측면에서 파이썬은 다른 언어에는 결여된 언어 일관성과 유용한 기능을 제공한다.

파이썬에서 변수 혹은 리터럴값의 타입을 알고 싶다면 type()을 사용하면 된다.
```python
a = 7
type(a)
<class 'int'>
type(99.9)
<class 'float'>
type('abc')
class 'str'>
```

###형변환
다른 데이터 타입을 정수형으로 변환하려면 int() 함수를 사용한다. 이 함수는 소수점을 버리고 정수를 반환한다. 파이썬에서 가장 간단한 데이터 타입은 True와 False 값만을 가진 부울형이다. 이 타입을 정수로 변환하면 각각 1과 0을 반환한다.
```python
int(True)
1
int(False)
0
```
```python
int('99')
99
int('-23')
-23
int('+12')
12
```
int() 함수에서 숫자가 아닌 다른 뭔가를 변환하면 예외가 발생한다.

int() 는 부동소수점수, 혹으 숫자로 이루어진 문자열을 정수로 반환한다. 그러나 소수점 혹은 지수를 포함하는 문자열은 처리하지 않는다.
```python
int('98.6') #에러발생
```
만약 숫자의 타입을 섞어서 사용하면, 파이썬은 자동으로 형변환을 한다.
```python
4+7.0
->11.0
```
###int의 크기
파이썬 2에서 int의 크기는 32비트로 제한되었다. long은 64비트까지 허용한다.
파이썬 3에서는 long이 사라지고, int의 크기가 유연해졌다. 64비트보다 더 큰 공간을 가질 수 있다. 
대부분의 언어에서는 정수 오버플로가 발생하지만 파이썬은 문제없이 아주 큰 정수를 처리한다.

##문자열

파이썬에서는 단일/이중 인용부호를 똑같이 처리한다.
```python
>'Snap'
'Snap'd
>"Snap"
'Snap'
```

###데이터 타입 변환 : str()
```python
>str(98.6)
'98.6'
```

###결합: +
```python
'Release the kraken! ' + 'At once!'
'Release the kraken! At once!'
```

###문자 추출: []
```python
>letters = 'abcdefgh'
>letters[0]
'a'
>letters[1]
'b'
```

문자열은 불변하기 때문에 특정 인덱스에 문자를 삽입하거나 변경할 수 없다.
```python
>name = 'Henny'
>name[0] = 'P'
```

대신 replace()와 slice와 같은 문자열 함수를 사용할 수 있다.
```python
>name = 'Henny'
>name.replace('H', 'P')
'Penny'
>'P' + name[1:]
'Penny'
```
###슬라이스: [start:end:step]

###문자열 길이: len()
```python
>letters="abcdefg"
>len(letters)
7
```
###문자열 나누기: split()
```python
>todos = 'get gloves, get maks, give cat vitamins, call ambulance'
>todos.split(',')
['get gloves', 'get mask', 'give cat vitamins', 'call ambulance']

>todos.split() #공백문자(줄바꿈, 스페이스, 탭)를 사용
['get', 'gloves,get', 'mask,give', 'cat', ...]
```

###문자열 결합: join()
join() 함수는 split()과 반대다. 문자열 리스트를 하나의 문자열로 결합한다.
문자열 리스트를 ``string.join(list)`` 형태로 결합한다.
```python
>sample_list = ['Yeti', 'Bigfoot', 'Loch Ness Monster']
>sample_string = ', '.join(sample_list)
>print(sample_string)
Yeti, Bigfoot, Loch Ness Monster
```

###문자열 다루기
```python
poem = """All that doth flow we cannot
liquid name Or else would fire and water be the same.
"""

>poem.startsWith('All')
True
>poem.endsWith('folks!')
False

#첫번째로 that가 나오는 오프셋
>word='that'
>poem.find(word)
4

```
