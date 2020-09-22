---
title: 알고리즘 문제 정리 (Leetcode contest)
date: '2020-08-10T11:00:37.121Z'
template: 'post'
draft: false
slug: '/algorithm/leetcode-contest'
category: 'algorithm'
tags:
  - 'algorithm'
description: ''
socialImage: '/media/image-2.jpg'
---

Leetcode의 weekly, biweekly contest를 참가하고 난 후 문제들을 정리한다.

## Weelky Contest 201 - 2020/08/09

[대회링크](https://leetcode.com/contest/weekly-contest-201)

결과 : 4 문제 중 1, 2 번 2문제 맞춤, 6664 / 15616

## 1. Make The String Great

### 제출 답안

```python
class Solution:
    def makeGood(self, s: str) -> str:

        prev = ''
        while not s.islower():
            s = self.doProcess(s)
            if prev == s:
                break
            if s == '':
                break
            prev = s
        return s

    def doProcess(self, s: str) -> str:
        for i in range(len(s) - 1):
            if (s[i].isupper() and s[i + 1].islower() and s[i].lower() == s[i+1]) \
                or (s[i].islower() and s[i+1].isupper() and s[i].upper() == s[i+1]):
                return s[:i] + s[i+2:]
        return s
```

### 피드백

`doProcess` 함수에서 작성한 if 문 조건 안의 두 조건을 or로 묶는 대신 다음과 같이 하나의 조건으로 줄일 수 있다.

```python
    def doProcess(self, s: str) -> str:
        for i in range(len(s) - 1):
            if (s[i].lower() == s[i+1].lower() and s[i].islower() != s[i + 1].islower()):
                return s[:i] + s[i+2:]
        return s
```

다음과 같이 스택을 사용하여 문제를 풀 수도 있다. 답안이 훨씬 간결해졌다.

```python
class Solution:
    def makeGood(self, s: str) -> str:
        stack = []

        for letter in s:
            if not stack or not (stack[-1].lower() == letter.lower() \
                 and stack[-1].islower() != letter.islower()) :
                stack.append(letter)
            else:
                stack.pop()
        return ''.join(stack)
```

## 2. Find Kth Bit in Nth Binary String

### 제출 답안

```python
class Solution:
    def findKthBit(self, n: int, k: int) -> str:
        array = ["0" for _ in range(n + 1)]
        for i in range(1, n + 1):
            array[i] = array[i - 1] + "1" + self.doProcess(array[i - 1])
        return array[-1][k-1]

    def doProcess(self, s: str):
        array = []
        reversedS = reversed(s)
        for e in reversedS:
            if e == "0":
                array.append("1")
            else:
                array.append("0")
        return ''.join(array)
```

### 피드백

다음과 같이 둘 중에 하나만 참일때 참이 되는 `xor 연산자`를 사용하여 `doProcess` 함수를 간소화 할 수 있다. (0^1 -> 1, 1^1 -> 0)

```python
def doProcess(self, s: str):
    array = []
    for e in reversed(s):
        array.append(str(int(e)^1))
    return ''.join(array)
```

다음과 같이 굳이 배열에 이전의 값을 배열에 저장 할 필요없이 문자열을 생성할 수 있다.

```python
class Solution:
    def findKthBit(self, n: int, k: int) -> str:
        s = "0"
        for _ in range(n - 1):
            s += "1" + "".join([str(int(e)^1) for e in reversed(s)])
        return s[k-1]
```

## Weelky Contest 202 - 2020/08/16

[대회링크](https://leetcode.com/contest/weekly-contest-202)

결과 : 4 문제 중 1, 2 번 2문제 맞춤, 6517 / 14374

## BiWeekly Contenst 33 - 2020/8/22

[대회링크](https://leetcode.com/contest/biweekly-contest-33)

결과 : 4 문제 중 1번 1문제 맞춤, 6114 / 11366
