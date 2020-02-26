---
title: BST Construction
date: "2019-11-26T18:46:37.121Z"
template: "post"
draft: true
slug: "/category/algorithm/bst-construction"
category: "algorithm"
tags:
    - "algorithm"
description: "Write a Binary Search Tree(BST) class. The class should have a “value” property set to be an integer. as well as “left” and “right” properties, both of which should point to either the None(null) value or to another BST..."
socialImage: "/media/image-2.jpg"
---

> **[문제출처 : algoexpert](https://www.algoexpert.io)**

# BST Construction

Write a Binary Search Tree(BST) class. The class should have a "value" property set to be an integer. as well as "left" and "right" properties, both of which should point to either the None(null) value or to another BST. A node is said to be a BST node if and only if it satisfies the BST property. its value is strictly greater than the values of every node to its left: its value is less than or equal to the values of every node to its right; and both of its children nodes are either BST nodes themselves or None(null) values. The BST class should support insertion, searching, and removal of values. The removal method should only remove the first instance of the target value.

```
Sample input:
      10
     /  \
    5   15
   / \  / \
  2  5 13 22
 /      \
1       14

Sample output(after inserting 12):
      10
     /  \
    5   15
   / \  / \
  2  5 13 22
 /    / \
1   12   14

Sample output(after removing 10):
      12
     /  \
    5   15
   / \  / \
  2  5 13 22
 /      \
1        14

Sample output(after searching for 15): True
```

### Time Complexity

Average : O(logN)<br>
Worst : O(N) -> 10 - 11 - 12 - 13 -17 - 30 - 31 ...

### Space Complexity

Average: O(logN) (if it's implemented recursively) (27:55) <br>
Worst: O(N) (if it's implemented recursively)<br>

Average: O(1) (if it's implemented iterative)<br>
Worst: O(1) (if it's implemented iterative)
