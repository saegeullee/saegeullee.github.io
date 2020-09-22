---
title: 알고리즘 문제 정리 (프로그래머스)
date: '2020-06-08T12:50:37.121Z'
template: 'post'
draft: false
slug: '/algorithm/programmers-algorithm'
category: 'algorithm'
tags:
  - 'algorithm'
description: ''
socialImage: '/media/image-2.jpg'
---

# Level 1

## 1. **[시저암호](https://programmers.co.kr/learn/courses/30/lessons/12926)**

```python
def solution(s, n):
    answer = ''
    for i in s:
        if i == ' ':
            answer += ' '
        else:
            if ord(i) >= ord('A') and ord(i) <= ord('Z'):
                if ord(i) + n > ord('Z'):
                    answer += chr( ord('A') + ((ord(i) + n) % ord('Z')) - 1 )
                else:
                    answer += chr(ord(i) + n)
            else:
                if ord(i) + n > ord('z'):
                    answer += chr( ord('a') + ((ord(i) + n) % ord('z')) - 1 )
                else:
                    answer += chr(ord(i) + n)
    return answer
```

## 2. **[이상한 문자 만들기](https://programmers.co.kr/learn/courses/30/lessons/12930)**

```python
def solution(s):
    answer = ""
    idx = 0
    for i in s:
        if i != " ":
            answer += i.upper() if idx % 2 == 0 else i.lower()
            idx += 1
        else:
            idx = 0
            answer += " "
    return answer
```

### 피드백

문자열 대문자화 소문자화 하는 메서드는 `upper()`과 `lower()`이 있다.

## 2. **[문자열 내 마음대로 정렬하기](https://programmers.co.kr/learn/courses/30/lessons/12915)**

```python
def solution(strings, n):

    def func(s):
        return ord(s[n])
    strings.sort(key=func)

    M, ck = {}, False

    for i in strings:
        if not M.get(i[n], False):
            M[i[n]] = 1
        else:
            M[i[n]] += 1
            ck = True

    if not ck:
        return strings

    for key, val in M.items():
        if val > 1:
            temp, tempIdx = [], []

            for idx, s in enumerate(strings):
                if s[n] == key:
                    tempIdx.append(idx)
                    temp.append(s)

            temp.sort()
            for idx, s in enumerate(temp):
                if s in strings: strings.remove(s)
                strings.insert(tempIdx[idx], s)

    return strings
```

### 피드백

위의 정답 코드 부분에서 원래 이 코드를 `strings.remove(s)` 추가했었는데, 에러가 발생했다. for문 내부에서 strings가 변형되어 에러가 발생한것이다. 이부분 주의하자.

```python
  for idx, s in enumerate(strings):
      if s[n] == key:
          tempIdx.append(idx)
          temp.append(s)
          strings.remove(s)
```

# 프린터 (2020/7/25)

## 문제

일반적인 프린터는 인쇄 요청이 들어온 순서대로 인쇄합니다. 그렇기 때문에 중요한 문서가 나중에 인쇄될 수 있습니다. 이런 문제를 보완하기 위해 중요도가 높은 문서를 먼저 인쇄하는 프린터를 개발했습니다. 이 새롭게 개발한 프린터는 아래와 같은 방식으로 인쇄 작업을 수행합니다.

```
1. 인쇄 대기목록의 가장 앞에 있는 문서(J)를 대기목록에서 꺼냅니다.
2. 나머지 인쇄 대기목록에서 J보다 중요도가 높은 문서가 한 개라도 존재하면 J를 대기목록의 가장 마지막에 넣습니다.
3. 그렇지 않으면 J를 인쇄합니다.
```

예를 들어, 4개의 문서(A, B, C, D)가 순서대로 인쇄 대기목록에 있고 중요도가 2 1 3 2 라면 C D A B 순으로 인쇄하게 됩니다.

내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 알고 싶습니다. 위의 예에서 C는 1번째로, A는 3번째로 인쇄됩니다.

현재 대기목록에 있는 문서의 중요도가 순서대로 담긴 배열 priorities와 내가 인쇄를 요청한 문서가 현재 대기목록의 어떤 위치에 있는지를 알려주는 location이 매개변수로 주어질 때, 내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 return 하도록 solution 함수를 작성해주세요.

제한사항

- 현재 대기목록에는 1개 이상 100개 이하의 문서가 있습니다.
- 인쇄 작업의 중요도는 1~9로 표현하며 숫자가 클수록 중요하다는 뜻입니다.
- location은 0 이상 (현재 대기목록에 있는 작업 수 - 1) 이하의 값을 가지며 대기목록의 가장 앞에 있으면 0, 두 번째에 있으면 1로 표현합니다.

## 입출력 예

```
priorities	location	return
1. priorities = [2, 1, 3, 2]	location = 2	 return -> 1
2. priorities = [1, 1, 9, 1, 1, 1]	location = 0	 return -> 5
```

입출력 예 설명
예제 #1

문제에 나온 예와 같습니다.

예제 #2

6개의 문서(A, B, C, D, E, F)가 인쇄 대기목록에 있고 중요도가 1 1 9 1 1 1 이므로 C D E F A B 순으로 인쇄합니다.

## 제출 답안

```python
def solution(priorities, location):
    order = 0
    for i in range(len(priorities)):
        priorities[i] = {"name": i, "priority":priorities[i]}

    while len(priorities):
        target = priorities.pop(0)
        doesHigherPriorityExists = False
        for j in range(len(priorities)):
            if priorities[j]['priority'] > target['priority']:
                doesHigherPriorityExists = True
                break
        if doesHigherPriorityExists:
            priorities.append(target)
        else:
            order += 1
            if target['name'] == location:
                return order
```

## 피드백

처음에 계속 제출 답안이 틀렸었다. 이유를 몰라 계속 디버깅을 해보았는데 로직에 이상은 없어 보였다. 계속보니 최초 for문을 잘못 작성했다.. 다음과 같이 작성했다. 하지만 `priorities` 배열은 해당 for문 안에서 계속 변하므로 for문이 아니라 제출 답안 처럼 조건을 주고 while문으로 줬어야 한다.. 저번에도 한번 비슷한 문제를 겪었는데 인간은 같은 실수를 반복하는 것인가.. 다음에는 정말 이런 케이스에 유의하자

```python
def solution(priorities, location):
    order = 0
    for i in range(len(priorities)):
        priorities[i] = {"name": i, "priority":priorities[i]}

   for i in range(len(priorities)):
        target = priorities.pop(0)
        doesHigherPriorityExists = False
        for j in range(len(priorities)):
            if priorities[j]['priority'] > target['priority']:
                doesHigherPriorityExists = True
                break
        if doesHigherPriorityExists:
            priorities.append(target)
        else:
            order += 1
            if target['name'] == location:
                return order
```
