---
title: Binary Search
date: "2019-12-02T18:46:37.121Z"
template: "post"
draft: false
slug: "/category/algorithm/binary-search"
category: "algorithm"
tags:
  - "algorithm"
description: "Write a function that takes in a sorted array of integers as well as a target integer. The function should use the Binary Search algorithm to find if the target number is contained in the array and should return its index if it is, otherwise -1..."
socialImage: "/media/image-2.jpg"
---

> **[문제출처 : algoexpert](https://www.algoexpert.io)**

Write a function that takes in a sorted array of integers as well as a target integer. The function should use the Binary Search algorithm to find if the target number is contained in the array and should return its index if it is, otherwise -1.

```
Sample input: [0, 1, 21, 33, 45, 45, 61, 71, 72, 73], 33
Sample output: 3
```

## solution

```javascript
// O(log(n)) time | O(1) space
function binarySearch(array, target) {
  // Write your code here.

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    let medium = Math.floor((left + right) / 2);

    if (array[medium] > target) {
      right = medium - 1;
    } else if (array[medium] < target) {
      left = medium + 1;
    } else {
      return medium;
    }
  }

  return -1;
}

// Do not edit the line below.
exports.binarySearch = binarySearch;
```

## 피드백

`Math.floor`없이 `(left+right)/2`만 적었다.. 왜그랬는지는 모르겠지만 `Math.floor`없이 당연히 상수가 될거라고 생각했다. 그리고 while 문 안의 각 조건문 안에서도 `right = medium`, `left = medium` 까지만 적었다. 어차피 medium 이 target이 아니기 때문에 각각 `right = medium - 1`, `left = medium + 1` 조건으로 줘야 한다. 알고리즘 문제 많이 풀어봐야겠다.
