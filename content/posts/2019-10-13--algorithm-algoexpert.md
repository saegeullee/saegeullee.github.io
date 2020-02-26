---
title: Two Number Sum
date: "2019-10-13T18:46:37.121Z"
template: "post"
draft: false
slug: "/category/algorithm/two-number-sum"
category: "algorithm"
tags:
    - "algorithm"
description: "algorithm two number sum"
socialImage: "/media/image-2.jpg"
---

> **[문제출처](https://www.algoexpert.io)**

#문제

Two Number Sum

Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. If any two numbers in the input array sum up to the target sum, the function should return them in an array, in sorted order. If no two numbers sum up to the target sum, the function should return an empty array. Assume that there will be at most one pair of numbers summing up to the target sum.

Sample input: [3, 5, -4, 8, 11, 1, -1, 6], 10<br>
Sample output:[-1, 11]

##My answer

```python
def twoNumberSum(array, targetSum):
	dict = {}
	for el in array:
		if (targetSum - el) in dict:
			if(targetSum - el) > el:
				return [el, targetSum - el]
			else:
				return [targetSum - el, el]
		else:
			dict[el] = True
	return []
```

##algoexpert solutions

```python
#answer 1
#O(n^2) time | O(1) space
def twoNumberSum(array, targetSum):
    for i in range(len(array) - 1):
        firstNum = array[i]
        for j in range(len(array) - 1):
            secondNum = array[j]
            if firstNum + secondNum == targetSum:
                return sorted([firstNum, secondNum])
    return []

```

```python
#answer 2
# O(n) time | O(n) space
def twoNumberSum(array, targetSum)
    nums = {}
    for num in array:
        potentialMatch = targetSum - num
        if potentialMatch in nums:
            return sorted([potentialMatch, num])
        else:
            nums[num] = True
    return []

```

```python
#answer3
#O(nlog(n)) | O(1) space
def twoNumberSum(array, targetSum):
    # Write your code here.
	array.sort()
	left = 0
	right = len(array) - 1
	while left < right:
		currentSum = array[left] + array[right]
		if currentSum == targetSum:
			return [array[left], array[right]]
		elif currentSum < targetSum:
			left += 1
		else:
			right -= 1
	return []

```
