---
title: 자료구조 정리
date: '2020-06-10T12:50:37.121Z'
template: 'post'
draft: true
slug: '/data-structures/data-structures'
category: 'data-structures'
tags:
  - 'data-structures'
description: '자료구조에 대해 정리한다.'
socialImage: '/media/image-2.jpg'
---

# 큐(Queue)

- 줄을 서는 행위와 유사하다.
- 가장 먼저 넣은 데이터를 가장 먼저 꺼낼 수 있는 구조이다.
- Enqueue: 큐에 데이터를 넣는 기능
- Dequeue: 큐에서 데이터를 꺼내는 기능

## 파이썬 queue 라이브러리

파이썬 queue 라이브러리에는 Queue(), LifoQueue(), PriorityQueue() 를 제공한다.

- Queue() : 가장 일반적인 큐 자료구조
- LifoQueue() : 나중에 입력된 데이터가 먼저 출력되는 구조(스택 구조)
- PriorityQueue() : 데이터마다 우선순위를 넣어서, 우선순위가 높은 순으로 데이터 출력

### Queue()로 큐 만들기

```python
import queue
q = queue.Queue()

q.put("hithere")
q.put(2)

print(q.qsize()) #2
print(q.get()) #hithere
print(q.qsize()) #1
print(q.get()) #2
```

### PriorityQueue()로 큐 만들기

```python

q = queue.PriorityQueue()
q.put((10, "korea"))
q.put((5, 1))
q.put((15, "hithere"))

print(q.qsize()) #3
print(q.get()) #(5, 1)
print(q.get()) #(10, 'korea')
print(q.qsize()) #1
```

## 파이썬 리스트로 큐 구현하기

```python
queue = []

def enqueue(num):
    queue.append(num)

def dequeue():
    target = queue[0]
    del queue[0]
    return target
```

# 스택(stack)

- 가장 나중에 쌓은 데이터를 가장 먼저 빼낼 수 있는 자료구조
- push() : 데이터를 스택에 넣기
- pop() : 데이터를 스택에서 꺼내기

## 파이썬 리스트로 스택 구현

```python
stack = []

def push(num):
    stack.append(num)

def pop():
    target = stack[-1]
    del stack[-1]
    return target
```
