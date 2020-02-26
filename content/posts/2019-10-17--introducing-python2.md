---
title: Introducing Python(리스트, 튜플, 딕셔너리, 셋)
date: "2019-10-17T12:46:37.121Z"
template: "post"
draft: false
slug: "/category/python/introducing-python2/"
category: "python"
tags:
  - "python"
description: "처음 시작하는 파이썬 책 정리"
socialImage: "/media/image-2.jpg"
---

> **[처음시작하는 파이썬](http://www.hanbit.co.kr/store/books/look.php?p_code=B2827459900)** 책을 정리한 내용입니다.

#Chapter 3. 리스트, 튜플, 딕셔너리, 셋
파이썬에는 두가지 다른 시퀀스 구조가 있다. 튜플과 리스트이다. 이들의 항목은 다른 타입의 요소들로 구성될 수 있다.
즉, 각 요소는 어떤 객체도 될 수 있다.
튜플은 불변한다. 튜플에 항목을 할당하고 나서, 이를 바꿀 수 없다. 리스트는 변경 가능하다.

###다른 데이터 타입을 리스트로 변환하기 : list()
```python
>list('cat')
['c', 'a', 't']

>a_tuple=('a', 'b', 'c')
>list(a_tuple)
['a', 'b', 'c']
```

###리스트의 리스트
리스트는 리스트뿐만 아니라 다른 타입의 요소도 포함 가능하다.
```python
list_sample = ['a', 'b', ['c', 'd', 'e'], 1, 'f', 2, 3]
```

###리스트로 항목추출
```python
list_sample = ['a', 'b', 'c']

list_sample[::-1] #리스트 반전
['c', 'b', 'a']
```
###리스트의 끝에 항목 추가하기
```python
>list_sample.append('d')
```

###리스트 병합하기: extend() 또는 +=
```python
>list_a = ['a', 'b', 'c']
>list_b = ['d', 'e']
>list_a.extend(list_b)
>list_a
['a', 'b', 'c', 'd', 'e']
```

+=로 병합할 수도 있다. 
```python
>list_a = ['a', 'b', 'c']
>list_b = ['d', 'e']
>list_a += list_b
>list_a
['a', 'b', 'c', 'd', 'e']
```

append()를 사용하면 항목을 병합하지 않고, list_b가 하나의 리스트로 추가된다.
```python
>list_a = ['a', 'b', 'c']
>list_b = ['d', 'e']
>list_a.append(list_b)
>list_a
['a', 'b', 'c', ['d', 'e']]
```

###오프셋과 insert()로 항목 추가하기
insert() 함수는 원하는 위치에 항목을 추가 할 수 있다.
```python
>list_a = ['a', 'b', 'c']
>list_a.insert(1, 'd')
>list_a
['a', 'd', 'b', 'c']
```

###오프셋으로 항목 삭제하기: del
```python
>list_a = ['a', 'b', 'c']
>del list_a[-1]
>list_a
['a', 'b']
```
오프셋으로 리스트의 특정 항목을 삭제하면, 제거된 항목 이후의 항목들이 한 칸씩 앞으로 당겨진다.

###값으로 항목 삭제하기: remove()
```python
>list_a = ['a', 'b', 'c']
>list_a.remove('b')
>list_a
['a', 'c']
```

###오프셋으로 항목을 얻은 후 삭제하기: pop()
pop(0) 은 리스트의 헤드(시작) 을 삭제 후 그 값을 반환
```python
>list_a = ['a', 'b', 'c']
>list_a.pop()
'c'
>list_a
['a', 'b']
```

###값으로 항목 오프셋 찾기: index()
```python
>list_a = ['a', 'b', 'c']
>list_a.index('a')
0
```

###존재 여부 확인하기 :in
```python
>list_a = ['a', 'b', 'c']
>'a' in list_a
true
```

###값 세기 : count()
리스트에 특정 값이 얼마나 있는지 세기 위해 count() 사용한다.
```python
>list_a = ['a', 'b', 'c', 'a']
>list_a.count('a')
2
```

###문자열로 변환하기 : join()
```python
>list_a = ['a', 'b', 'c']
>', '.join(list_a)
'a, b, c'
```

###정렬하기 : sort()
sort() : 리스트 자체를 내부적으로 정렬한다.
sorted() : 리스트의 정렬된 복사본을 반환한다.
```python
>list_a = ['c', 'b', 'a']
>sorted_list_a = sorted(list_a)
>sorted_list_a 
['a', 'b', 'c']
#sorted_list_a 는 복사본
#원본 list_a는 변하지 않음
```
기본 정렬 방식은 오름차순이다. 내림차순으로 정렬하고 싶다면 인자에 reverse=True를 추가한다.
```python
>list_a = ['a', 'b', 'c']
>list_a.sort(reverse=True)
>list_a
['c', 'b', 'a']
```
###항목 개수 얻기 : len()
```python
>list_a = ['a', 'b', 'c']
>len(list_a)
3
```
###할당 : =, 복사: copy()
한 리스트를 변수 두 곳에 할당했을 경우, 한 리스트를 변경하면 다른 리스트도 따라서 변경된다.

다음과 같은 방법을 이용하여 한 리스트를 새로운 리스트로 복사할 수 있다.
```python
> a = [1, 2, 3]
> b = a.copy()
> c = list(a)
> d = a[:]
#b, c, d 는 a의 복사본이다.
```