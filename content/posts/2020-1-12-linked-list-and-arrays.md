---
title: 링크드 리스트
date: '2020-01-12T11:16:37.121Z'
template: 'post'
draft: true
slug: '/data-structures/leetcode'
category: 'data-structures'
tags:
  - 'data-structures'
description: ''
socialImage: '/media/image-2.jpg'
---

> **[educative.io data structures](https://www.educative.io/courses/data-structures-in-javascript-an-interview-refresher)** 에서 공부한 내용을 바탕으로 정리했습니다.

## 링크드 리스트 vs 배열

배열과 링크드 리스트의 중요한 차이점은 엘리먼트가 삽입되고 삭제되는 방식에 있다. 링크드 리스트의 경우에는 엘리먼트의 삽입과 삭제가 `상수 시간(constant time)` 안에 이루어지지만 배열의 경우에는 `O(n)`이 걸린다. 배열에서 엘리먼트를 삭제 또는 삽입 후에는 나머지 엘리먼트들을 이동시켜야 하기 때문이다.

한편, 배열에서는 엘리먼트를 탐색하는데 상수 시간이 걸리지만 링크드 리스트에서는 리스트의 처음부터 해당 노드를 찾을때까지 링크드 리스트를 순회하며 탐색해야 한다. 이를 표로 정리해보면 다음과 같다.

|     Operation      | **LinkedList** | **Array** |
| :----------------: | :------------: | :-------: |
|       access       |      O(n)      |   O(1)    |
| insert ( at head)  |      O(1)      |   O(n)    |
| delete ( at head ) |      O(1)      |   O(n)    |

## isEmpty()

```js
class Node {
  constructor(data) {
    this.data = data;
    this.nextElement = null;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node(-1);
    this.length = 0;
  }

  isEmpty() {
    return this.length === 0;
  }

  insertAtHead(data) {
    const tempNode = new Node(data);
    tempNode.nextElement = this.head.nextElement;
    this.head.nextElement = tempNode;
    this.length++;
    return this;
  }
}

let list = new LinkedList();
console.log(list.isEmpty()); // true
```

## Insertion at Head
