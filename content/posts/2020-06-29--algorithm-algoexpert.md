---
title: 알고리즘 문제 정리 (Algoexpert)
date: '2020-06-29T18:00:37.121Z'
template: 'post'
draft: false
slug: '/algorithm/algoexpert'
category: 'algorithm'
tags:
  - 'algorithm'
description: ''
socialImage: '/media/image-2.jpg'
---

### Strings

- [Caesar cipher encriptor - 2020/7/1](#caesar-cipher-encriptor)
- [Palindrome check - 2020/7/1](#palindrome-check)
- [Group Anagrams - 2020/7/2](#group-anagrams)
- [Longest Palindromic substring - 2020/7/15](#longest-palindromic-substring)

### Array

- [Validate Subsequence - 2020/6/29](#validate-subsequence)
- [Three number sum - 2020/7/6](#three-number-sum)
- [Monotonic Array - 2020/7/9](#monotonic-array)
- [Spiral Traverse - 2020/7/13](#spiral-traverse)

### Binary Search Trees

- [Binary Search Tree Construction - 2020/7/7](#binary-search-tree-construction)
- [Find closest value in BST - 2020/7/8](#find-closest-value-in-bst)
- [Validate BST - 2020/9/1](#validate-bst)

### Binary Trees

- [Branch sums - 2020/7/9](#branch-sums)

### Recursion

- [Product sum - 2020/7/9](#product-sum)

### Graph

- [Breadth First Search - 2020/7/10](#breadth-first-search)
- [Depth First Search - 2020/7/10](#depth-first-search)
- [River sizes - 2020/7/13](#river-sizes)

### Searching

- [Binary Search - 2020/7/12](#binary-search)

### Dynamic Programming

- [Max Subset Sum No Adjacent - 2020/7/14](#max-subset-sum-no-adjacent)

### Stacks

- [Balanced Brackets - 2020/07/21](#balanced-brackets)

<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
  <center><h1>Strings</h1></center>

---

# Caesar cipher encriptor

![algoexpert_caesar_cipher_encriptor](/media/algoexpert_caesar_cipher_encriptor.png)

어떤 문자열과 숫자 key 값이 주어지면 해당 key 값만큼 알파벳 상에서 이동한 문자열을 리턴하는 문제이다.

### sample input

```
string="xyz"
key = 2
```

### sample output

```
"zab"
```

## 제출답변

```python
def caesarCipherEncryptor(string, key):
	return ''.join([ transform(letter, key) for letter in string])

def transform(letter, key):
	total = ord('z') - ord('a') + 1
	key %= total
	res = ord(letter) + key
	if res > ord('z'):
		res %= ord('z')
		res += (ord('a') - 1)
	return chr(res)
```

알파벳은 a부터 z까지 총 26개이다. key 값이 26을 초과한다면 key 값을 26으로 나눈 나머지를 다시 key에 할당한다. 만약 문자열 'z'에 transform을 적용하여 key값만큼 이동시키면, key값이 1 이상이라면 'z'의 유니코드 값에 key 값을 더한 결과는 다시 'a'의 유니코드 값부터 key만큼 이동한 결과의 유니코드 값을 가지고 있는 알파벳이 된다.

# Palindrome check

![algoexpert_palindrome_check](/media/algoexpert_palindrome_check.png)

input으로 들어오는 문자열이 팰린드롬인지 여부를 리턴하는 문제이다.

### sample input

```
string = "abcdcba"
```

### sample output

```
true
```

이 문제는 여러가지 풀이 방법이 있다. 각 풀이 방법의 시간 복잡도를 유심히 볼 필요가 있다.

### 풀이1

```python
def isPalindrome(string):
  reversedString = ''
  for i in reversed(range(len(string))):
    reversedString += string[i]
  return reversedString == string
```

이 풀이 방법의 시간 복잡도는 `O(n)`인 것 같지만 `O(n2)`이 맞다. 그 이유는 `reversedString += string[i]` 코드에서 새로운 문자열을 계산하는 시간 복잡도가 `O(n)`이기 때문이다. 파이썬은 새로운 `reversedString`을 만들기 위해 그 전의 `reversedString`을 순회하며 하나씩 더하고 마지막에 `string[i]`를 더한다.

[Python에서 효율적인 String Concatenation 방법](https://blog.leekchan.com/post/19062594439/python%EC%97%90%EC%84%9C-%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-string-concatenation-%EB%B0%A9%EB%B2%95) 에서도 지적하듯이 이와 같은 방법으로 string concatenation을 수행하는 작업은 좋지 않다.

### 풀이2

```python
def isPalindrome(string):
  reversedChars = []
  for i in reversed(range(len(string))):
    reversedChars.append(string[i])
  return ''.join(reversedChars) == string
```

이 풀이 방법의 시간 복잡도는 `O(n)` 이다.

# Group Anagrams

![algoexpert_group_anagrams](/media/algoexpert_group_anagrams.png)

인풋으로 주어지는 words 리스트에서 같은 문자들로 이루어진 문자열들을 하나의 리스트에 묶어서 반환하는 문제이다.

### sample input

```
words = ["yo", "act", "flop", "tac", "cat", "oy", "olfp"]
```

### sample output

```
[["yo", "oy"], ["flop", "olfp"], ["act", "tac", "cat"]]
```

## 제출 답변

```python
def groupAnagrams(words):

	dictionary = {}
	for word in words:
		current = transform(word)
		if not dictionary.get(current, False):
			dictionary[current] = 1
		else: dictionary[current] += 1

	answer = []
	for key in dictionary:
		cur_arr = []
		for word in words:
			if transform(word) == key:
				cur_arr.append(word)
		answer.append(cur_arr)
	return answer

def transform(string):
	return ''.join(sorted(string))
```

위에 첫번째로 제출한 답변은 로직이 비효율적이다. 먼저 for문을 돌면서 딕셔너리에 정렬된 문자열을 키로하여 값으로 해당 정렬된 문자열의 개수를 센 후에 그 다음 for문에서 정렬된 문자열이 딕셔너리의 키 값과 동일한 문자열을 배열에 넣고 있다. 하지만 아래와 같이 이러한 로직을 한번의 for문에서 처리할 수 있다.

```python
def groupAnagrams(words):
	dictionary = {}
	for word in words:
		result = ''.join(sorted(word))
		if result in dictionary:
      		dictionary[result].append(word)
		else:
			dictionary[result] = [word]
	return list(dictionary.values())
```

### 복잡도

시간 복잡도 : `O(w * n * log(n))`, w: words 의 갯수, n: 제일 긴 문자열의 길이. `n*log(n)`은 정렬 알고리즘의 시간 복잡도

공간 복잡도 : `O(wn)`

# Longest Palindromic Substring

![algoexpert_longest_palindromic_substring](/media/algoexpert_longest_palindromic_substring.png)

### sample input

```
string = 'abaxyzzyxf
```

### sample output

```
xyzzyx
```

## 제출 답안

```python
def longestPalindromicSubstring(string):

	if len(string) == 1:
		return string

	answer = ''
	combinations = []
	for i in range(0, len(string) - 1):
		level = 0
		combination = ''
		if string[i] == string[i + 1]:
			level += 1
			combination += string[i:i+2]
			while True:
				left = i - level
				right = i + 1 + level
				if left >= 0 and right < len(string) and string[left] == string[right]:
					combination = string[left] + combination
					combination = combination + string[right]
					level += 1
				else:
					break
			if combination:
				if len(combination) > len(answer):
					answer = combination

		level = 0
		combination = ''
		if i > 0 and string[i - 1] == string[i + 1]:
			level += 1
			combination += string[i]
			while True:
				left = i - level
				right = i + level
				if left >= 0 and right < len(string) and string[left] == string[right]:
					combination = string[left] + combination
					combination = combination + string[right]
					level += 1
				else:
					break
			if combination:
				if len(combination) > len(answer):
					answer = combination

	return answer

```

위 답안을 제출하여 통과는 했지만 정답과 비교하여 코드가 난잡하고 비효율적이다.
추후 정리 예정..

<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<center><h1>Array</h1></center>

---

# Validate Subsequence

![algoexpert_validate_subsequence](/media/algoexpert_validate_subsequence.png)

두 개의 배열이 input으로 들어온다. 이 중 한 배열이 다른 배열의 서브 시퀀스인지를 판별하는 문제. 서브시퀀스의 기준은 한 배열이 다른 배열의 모든 원소를 가지고 있어야 하며 바로 인접하지 않더라도 순서가 맞다면 서브시퀀스이다.

### sample input

```
array = [5, 1, 22, 25, 6, -1, 8, 10]
sequence = [1, 6, -1, 10]
```

### sample output

```
true
```

## 제출 답변

```python
def isValidSubsequence(array, sequence):
	dictionary = {}
	for idx, el in enumerate(array):
		dictionary[el] = idx +1
	for el in sequence:
		if not dictionary.get(el, False):
			return False

	prev = dictionary[sequence[0]]
	for i in range(1, len(sequence)):
		current = sequence[i]
		if dictionary[current] <= prev:
			return False
		prev = dictionary[current]
	return True
```

첫번째 예상치 못한 에러가 발생했다. 딕셔너리에 해당 배열의 엘리먼트를 키로 하고 그 엘리먼트의 인덱스를 값으로 넣는 4번째 줄 `dictionary[el] = idx +1` 부분이다.

원래는 해당 부분을 `dictionary[el] = idx` 라고 작성하였고 이렇게 되면 0번째 인덱스가 값으로 들어가는 부분은 그 아랫줄 `if not dictionary.get(el, False):`에서 딕셔너리에 해당 키가 있더라도 인덱스가 0이기 때문에 `False`가 되는 로직상 오류가 있었다. 물론 이게 맞는 답은 아니지만 다음에 이런 부분이 있다면 주의하자..

위의 코드도 대부분의 테스트케이스에서 동작하지만 다음의 두 배열이 인풋으로 들어오는 경우는 테스트 케이스를 통과하지 못했다. 같은 원소 여러개가 배열의 원소가 되는 경우를 생각하지 못하고 코드를 작성했다.

```
[1, 1, 1, 1, 1]
[1, 1, 1]
```

## 솔루션

```python
def isValidSubsequence(array, sequence):
	index = 0
	for el in array:
		if index == len(sequence):
			break
		if el == sequence[index]:
			index += 1
	return len(sequence) == index
```

### 복잡도

시간 복잡도: O(N)
공간 복잡도: O(1)

# Three number sum

![algoexpert_threenumber_sum](/media/algoexpert_threenumber_sum.png)

input 으로 주어지는 배열에서 3가지 엘리먼트의 합이 input 으로 주어지는 targetSum과 일치하는 조합을 찾는 문제이다.

### sample input

```python
array = [12, 3, 1, 2, -6, 5, -8, 6]
targetSum = 0
```

### sample output

```python
[[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]
```

## 제출답변

```python
def threeNumberSum(array, targetSum):
	#  targetSum = 0
	# -8, -6, 1, 2, 3, 5, 6, 12
	#     ㅇ                 ㅇ
	# -8 -6 12  -> sum -2 since its negative, move left pointer to right
	# -8  1 12 -> sum 5 since its positive, move right pointer to left
	# -8  1 6  -> sum -1 since its negative, move left pointer to right
	# -8  2 6  -> sum 0 since its equal to 0, this is one pair of the solution

	# -6  1 12 -> sum 7 since its positive, move right pointer to left
	# -6  1 6 -> sum 1 "
	# -6  1 5 ->
	array.sort()
	answer = []
	for i in range(0, len(array) - 2):

		current_element = array[i]
		left = i + 1
		right = len(array) - 1

		current_sum = current_element + array[left] + array[right]

		if current_sum == targetSum:
			answer.append(sorted([current_element, array[left], array[right]]))
			continue

		while current_sum != targetSum and left < right:
			if current_sum < targetSum:
				left += 1
			elif current_sum > targetSum:
				right -= 1

			current_sum = current_element + array[left] + array[right]

			if current_sum == targetSum:
				answer.append(sorted([current_element, array[left], array[right]]))
				break

	return answer

```

내가 제출한 답변은 틀렸다. 로직을 보면 굳이 while문 안에서 통합해도 되는 로직을 while 문 위에 if문에서 한번 더 처리하고 있다.
while문의 조건도 잘못되었다. 이 문제는 총체적으로 잘못 풀었다. 이 답을 풀기 위한 로직을 알았지만 이를 코드로 구현하는데 실패했다. 합이 targetSum과 일치하는 조합을 찾았을 때도 이를 answer 리스트에 추가하고 끝낼 것이 아니라 `left +=1, right -=1`을 해줘서 해당 반복문 안에서 더 조합이 없는지를 찾았어야 했다. 문제의 답은 다음과 같다.

## 솔루션

```python

def threeNumberSum(array, targetSum):
	array.sort()
	answer = []
	for i in range(len(array) - 2):
		left = i + 1
		right = len(array) - 1

		while left < right:
			current_sum = array[i] + array[left] + array[right]

			if current_sum < targetSum:
				left += 1
			elif current_sum > targetSum:
				right -= 1
			elif current_sum == targetSum:
				answer.append(sorted([array[i], array[left], array[right]]))
				left += 1
				right -= 1

	return answer

```

# Monotonic Array

![algoexpert_monotonic_array](/media/algoexpert_monotonic_array.png)

input으로 주어지는 배열의 원소들이 인덱스가 증가할수록 전부 일관된 증감세를 보이는지를 판별하는 문제이다. 인접한 인덱스의 원소가 동일한 값일 경우 일관성이 깨지지 않는다고 본다.

### smaple input

```
array = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001]
```

### sample output

```
true
```

## 제출 답안

```python
def isMonotonic(array):
    # Write your code here.

	if len(array) < 2:
		return True
	decrement, decided = False, False

	if array[0] > array[1]:
		decrement, decided = True, True

	for i in range(len(array) - 1):
		if decided:
			if decrement and array[i] < array[i + 1]:
				return False
			elif not decrement and array[i] > array[i + 1]:
				return False
		else:
			if array[i] < array[i + 1]:
				decrement, decided = False, True
			elif array[i] > array[i + 1]:
				decrement, decided = True, True
	return True

```

input으로 들어오는 배열의 첫 두 엘리먼트를 기준으로 증감세를 판별한다. `decided`는 증감세가 판별되었는지를 나타내는 불리언이다. 증감세가 판별되지 않았다면 for문을 돌면서 증감세를 판별하고 증감세가 판별되면 그 이후의 엘리먼트들이 판별된 증감세와 일치하는 경향을 보이는지 검사한다.

## 복잡도

시간복잡도 : O(n)
공간복잡도 : O(1)

# Spiral Traverse

![algoexpert_spiral_traverse](/media/algoexpert_spiral_traverse.png)

input으로 주어지는 배열의 `[0][0]`엘리먼트를 시작으로 2차원 배열을 시계방향으로 테두리의 엘리먼트들을 순차적으로 담은 배열을 리턴하는 문제이다.

### sample input

```
array = [
  [1, 2, 3, 4],
  [12, 13, 14, 5],
  [11, 16, 15, 6],
  [10, 9, 8, 7]
]
```

### sample output

```
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
```

## 답안

```python
def spiralTraverse(array):

	result = []
	startRow, endRow = 0, len(array) - 1
	startCol, endCol = 0, len(array[0]) - 1

	while startRow <= endRow and startCol <= endCol:
		for col in range(startCol, endCol + 1):
			result.append(array[startRow][col])
		for row in range(startRow + 1, endRow + 1):
			result.append(array[row][endCol])
		for col in reversed(range(startCol, endCol)):
			if startRow == endRow:
				break
			result.append(array[endRow][col])
		for row in reversed(range(startRow + 1, endRow)):
			if startCol == endCol:
				break
			result.append(array[row][startCol])

		startRow += 1
		endRow -= 1
		startCol += 1
		endCol -= 1

	return result

```

이 문제는 못풀었다. 어떻게 풀지 감이 오질 않았다.

### 배운점

`for i in range(n)` 에서 뒤의 숫자부터 점점 작아지는 숫자를 순차적으로 받아오고 싶다면 `reversed`를 사용하면된다.

```python
for i in reversed(range(1, 10)):
  print(i)

# 9, 8, 7, 6 ... 1
```

3번째와 4번째 for문 안의 if조건은 다음과 같이 홀수개의 row 또는 column의 배열이 input으로 들어올 경우에 중복 카운팅을 하지 않기 위한 조건이다.

```
[
[1, 2, 3, 4],
[10, 11, 12, 5]
[9, 8, 7, 6]
]
```

## 복잡도

시간복잡도 : O(n), 공간복잡도 : O(n)

<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<center><h1>Binary Search Trees</h1></center>

---

# Binary Search Tree Construction

![algoexpert_bst_construction](/media/algoexpert_bst_construction.png)

바이너리 서치 트리 클래스를 만드는 문제이다.

### sample usage

![algoexpert_bst_construction_usage](/media/algoexpert_bst_construction_usage.png)

이걸 어떻게 풀어야 할지 감도 오지 않아 해설 강의를 보며 BST에 대해 공부했다. `insert`와 `contains`메서드는 그나마 이해가 잘되었지만 `remove`메서드가 까다로웠다. 특정 노드를 지우는 경우의 수를 직접 그림을 그려가며 해보니 이해하기 수월했다.

## 솔루션

```python
class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    def insert(self, value):
		currentNode = self
		while True:
			if value < currentNode.value:
				if currentNode.left is None:
					currentNode.left = BST(value)
					break
				else:
					currentNode = currentNode.left
			else:
				if currentNode.right is None:
					currentNode.right = BST(value)
					break
				else:
					currentNode = currentNode.right
		return self

    def contains(self, value):
        currentNode = self
		while currentNode is not None:
			if value < currentNode.value:
				currentNode = currentNode.left
			elif value > currentNode.value:
				currentNode = currentNode.right
			else:
				return True
		return False

    def remove(self, value, parentNode = None):
		currentNode = self
		while currentNode is not None:
			if value < currentNode.value:
				parentNode = currentNode
				currentNode = currentNode.left
			elif value > currentNode.value:
				parentNode = currentNode
				currentNode = currentNode.right
			else:
				if currentNode.left is not None and currentNode.right is not None:
					currentNode.value = currentNode.right.getMinValue()
					currentNode.right.remove(currentNode.value, currentNode)
				# we're going to come back to the root node case
				elif parentNode is None:
					if currentNode.left is not None:
						currentNode.value = currentNode.left.value
						currentNode.right = currentNode.left.right
						currentNode.left = currentNode.left.left

					elif currentNode.right is not None:
						currentNode.value = currentNode.right.value
						currentNode.left = currentNode.right.left
						currentNode.right = currentNode.right.right

					else:
						# this is a single node tree. do nothing
						pass

				elif parentNode.left == currentNode:
					parentNode.left = currentNode.left if currentNode.left is not None else currentNode.right
				elif parentNode.right == currentNode:
					parentNode.right = currentNode.left if currentNode.left is not None else currentNode.right
				break
        return self

	def getMinValue(self):
		currentNode = self
		while currentNode.left is not None:
			currentNode = currentNode.left
		return currentNode.value

```

# Find closest value in BST

![algoexpert_find_closest_value](/media/algoexpert_find_closest_value.png)

### sample input

![algoexpert_find_closest_value_input](/media/algoexpert_find_closest_value_input.png)

### sample output

```
13
```

## 제출답변

```python
def findClosestValueInBst(tree, target):

	currentNode = tree
	closest = tree.value
	while currentNode is not None:

		if abs(currentNode.value - target) < abs(closest - target):
			closest = currentNode.value

		if target < currentNode.value:
			currentNode = currentNode.left
		elif target > currentNode.value:
			currentNode = currentNode.right
		else:
			break

	return closest

```

`abs` 함수를 사용하여 target과의 절대값 차이가 가장 작은 노드의 value를 찾아 리턴하면 된다.

# Validate BST

![algoexpert_validateBst](/media/algoexpert_validateBst.png)

## sample input

![algoexpert_validateBst_sampleInput](/media/algoexpert_validateBst_sampleInput.png)

## sample output

```
true
```

## 제출답변

```python
# This is an input class. Do not edit.
class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def validateBst(tree):
    # Write your code here.
	if tree.left is None and tree.right is None:
		return True
	elif tree.left is None:
		if tree.value <= tree.right.value:
			return validateBst(tree.right)
		else:
			return False
	elif tree.right is None:
		if tree.value > tree.left.value:
			return validateBst(tree.left)
		else:
			return False
	else:
		if tree.left.value < tree.value and tree.right.value >= tree.value:
			return validateBst(tree.left) and validateBst(tree.right)
		else:
			return False
```

## 피드백

최초 작성한 답안은 bst의 각 노드에서 왼쪽 자식의 값은 현재 노드의 값보다 작고 오른쪽 자식의 값은 현재 노드의 값보다 같거나 큰 경우만을 고려했다. 하지만 BST의 정의에서 루트 노드의 모든 왼쪽 자식들은 루트 노드의 값보다 작아야 하고 오른쪽 자식들은 커야 한다. 이 조건을 추가 하기 위해 아래의 답안과 같이 `minValue`, `maxValue`를 인자로 넘겨주어 위 조건을 만족할 수 있도록 한다.

## 답안

```python
# This is an input class. Do not edit.
class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def validateBst(tree):
	return validateBstHelper(tree, float('-inf'), float('inf'))

def validateBstHelper(tree, minVal, maxVal):
	if tree is None:
		return True
	elif tree.value < minVal or tree.value >= maxVal:
		return False
	return validateBstHelper(tree.left, minVal, tree.value) \
	and validateBstHelper(tree.right, tree.value, maxVal)

```

## 복잡도

시간복잡도 : O(n) -> n = 노드의 개수<br>
공간복잡도: O(d) -> 콜 스택의 메모리를 사용한다. d = bst의 depth(height)

<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<center><h1>Binary Trees</h1></center>

---

# Branch sums

![algoexpert_branch_sums](/media/algoexpert_branch_sums.png)

input으로 들어오는 트리의 모든 각 branch의 모든 노드의 합을 리스트로 리턴하는 문제이다.

### sample input

![algoexpert_branch_sums_input](/media/algoexpert_branch_sums_input.png)

## 제출 답변

```python
# This is the class of the input root. Do not edit it.
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def branchSums(root):
	sums = []
	traverse(root, 0, sums)
	return sums

def traverse(currentNode, currentSum, sums):

	currentSum += currentNode.value

	if currentNode.left is None and currentNode.right is None:
		sums.append(currentSum)
	if currentNode.left is not None:
		traverse(currentNode.left, currentSum, sums)
	if currentNode.right is not None:
		traverse(currentNode.right, currentSum, sums)
```

## 복잡도

시간복잡도: O(n)
공간복잡도: O(n)

<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
  <center><h1>Recursion</h1></center>

---

# Product sum

![algoexpert_product_sums](/media/algoexpert_product_sums.png)

### sample input

```
array = [5, 2, [7, -1], 3, [6, [-13, 8], 4]]
```

### sample output

```
12
// calcuated as 5 + 2 + 2 * (7 - 1) + 3 + 2 * (6 + 3 * (-13 + 8) +4)
```

## 제출 답변

```python
# Tip: You can use the type(element) function to check whether an item
# is a list or an integer.
def productSum(array):
    # Write your code here.

	return calculateProductSum(array)


def calculateProductSum(array, level = 0):

	level += 1
	currentLevelSum = 0
	for el in array:
		if isinstance(el, list):
			currentLevelSum += calculateProductSum(el, level)
		else:
			currentLevelSum += el
	return level * currentLevelSum

```

## 복잡도

시간 복잡도: O(n)
공간 복잡도: O(d) (d는 special 배열의 최대 깊이)

<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
  <center><h1>Graph</h1></center>

---

# Breadth First Search

![algoexpert_bfs](/media/algoexpert_bfs.png)

### sample input

![algoexpert_bfs_input](/media/algoexpert_bfs_input.png)

### sample output

```
['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
```

## 제출 답안

```python
class Node:
    def __init__(self, name):
        self.children = []
        self.name = name

    def addChild(self, name):
        self.children.append(Node(name))
        return self

    def breadthFirstSearch(self, array):
		queue = [self]
		while len(queue) != 0:
			current = queue.pop(0)
			array.append(current.name)
			for node in current.children:
				queue.append(node)
		return array

```

너비 우선탐색은 큐를 사용하여 구현해야 한다.

## 복잡도

시간복잡도 : O(V + E), 공간복잡도 : O(N)

# Depth First Search

![algoexpert_dfs](/media/algoexpert_dfs.png)

### sample input

![algoexpert_dfs_input](/media/algoexpert_dfs_input.png)

### sample output

```
['A', 'B', 'E', 'F', 'I', 'J', 'C', 'D', 'G', 'K', 'H']
```

## 제출 답안

```python
# Do not edit the class below except
# for the depthFirstSearch method.
# Feel free to add new properties
# and methods to the class.
class Node:
    def __init__(self, name):
        self.children = []
        self.name = name

    def addChild(self, name):
        self.children.append(Node(name))
        return self

    def depthFirstSearch(self, array):
        array.append(self.name)
        if len(self.children) == 0:
          return
        for node in self.children:
          node.depthFirstSearch(array)
        return array
```

처음에 각 노드의 name을 어디에 담아야 할지 헷갈렸다. 문제에서 dfs함수의 인자로 들어오는 array에 담으라는 명확한 지침이 없었다. 그리고 이 문제는 클래스로 구현이 되었기 때문에 `depthFirstSearch`함수를 재귀적으로 호출하려면 `node.depthFirstSearch`와 같이 특정 노드에서 이 메서드를 각각 호출해주면 된다.

## 복잡도

시간복잡도: O(V + E), 공간복잡도: O(V)

V: 노드의 개수, E: edge의 개수

# River sizes

![algoexpert_river_sizes](/media/algoexpert_river_sizes.png)

### sample input

```
matrix = [

  [1, 0, 0, 1, 0],
  [1, 0, 1, 0, 0],
  [0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 0]
  ]
```

### sample output

```
[1, 2, 2, 2, 5]
```

## 제출 답변

```python
def riverSizes(matrix):
    # Write your code here.
	for i in range(len(matrix)):
		matrix[i].insert(0, 0)
		matrix[i].insert(len(matrix[i]), 0)
	matrix.insert(0, [0 for _ in range(len(matrix[0]))])
	matrix.insert(len(matrix), [0 for _ in range(len(matrix[0]))])

	land = []
	for i in range(1, len(matrix) - 1):
		for j in range(1, len(matrix[0]) - 1):
			if matrix[i][j] == 1 and matrix[i-1][j] != 1 and matrix[i][j-1] != 1:
				current_x, current_y, width = i, j, 1
				while matrix[current_x + 1][current_y] == 1 or matrix[current_x][current_y + 1] == 1:
					width += 1
					if matrix[current_x + 1][current_y] == 1:
						current_x += 1
					elif matrix[current_x][current_y + 1] == 1:
						current_y += 1
				land.append(width)
	return land

```

이 문제를 보고 첫번째 제출답변은 위와 같았다. 단순히 문제에서 주어진 Input 만을 보고 1이 해당 노드의 오른쪽 또는 아래 방향으로 이어지는 경우만을 고려했다. 하지만 아래의 경우와 같이 하나의 1인 노드에 대해 상하좌우 4방향 모두를 살펴보아야 한다.

```
{
  "matrix": [
    [1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0],
    [1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0],
    [1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1]
  ]
}
```

위와 같은 인풋이 주어지는 경우를 고려하여 알고리즘을 짜보려니 막히는 것이 한두가지가 아니었다. 가장 중요한 의문점은 방문했었던 노드는 어떻게 기억하지..? 였다. 도저히 떠오르지 않아 문제 해설 강의를 보고 이 알고리즘을 어떻게 풀어야 하는지 감이 왔다.

이 문제를 푸는 중요한 힌트는 다음과 같다.

각 노드를 방문했는지 여부를 관리하는 불리언 값을 저장하는 리스트를 선언한다. 각 노드를 방문할 때마다 해당 노드를 True로 변경한다.

이를 적용하여 제출한 답변은 다음과 같다.

```python
def riverSizes(matrix):
	for i in range(len(matrix)):
		matrix[i].insert(0, 0)
		matrix[i].insert(len(matrix[i]), 0)
	matrix.insert(0, [0 for _ in range(len(matrix[0]))])
	matrix.insert(len(matrix), [0 for _ in range(len(matrix[0]))])

	visited = [[False for value in row] for row in matrix]
	rivers = []

	for i in range(1, len(matrix) - 1):
		for j in range(1, len(matrix[0]) - 1):
			if visited[i][j]:
				continue
			traverseNode(i, j, matrix, visited, rivers)
	return rivers

def traverseNode(i, j, matrix, visited, rivers):
	currentRiverSize = 0
	nodesToVisit = [[i, j]]

	while len(nodesToVisit):
		currentNode = nodesToVisit.pop()
		i, j = currentNode
		if visited[i][j]:
			continue
		visited[i][j] = True
		if matrix[i][j] == 1:
			currentRiverSize += 1
			neighbors = getNeighborNodes(i, j, matrix, visited)
			nodesToVisit += neighbors
	if currentRiverSize > 0:
		rivers.append(currentRiverSize)

def getNeighborNodes(i, j, matrix, visited):
	unvisitedNodes = []
	dx, dy = [1, 0, -1, 0], [0, 1, 0, -1]
	for n in range(4):
		current_i, current_j = i + dx[n], j + dy[n]
		if current_i != 0 and current_i != len(matrix) and \
		current_j != 0 and current_j != len(matrix[0]) and \
		not visited[current_i][current_j]:
			unvisitedNodes.append([current_i, current_j])
	return unvisitedNodes

```

## 복잡도

시간복잡도 : O(wh), 공간복잡도: O(wh)

w는 input matrix의 width, h는 height

<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->

  <center><h1>Searching</h1></center>

---

# Binary Search

![algoexpert_binary_search](/media/algoexpert_binary_search.png)

### sample input

```
array = [0, 1, 21, 33, 45, 45, 61, 71, 72, 73]
target = 33
```

### sample output

```
3
```

## 제출 답안

```python
def binarySearch(array, target):
	start, end = 0, len(array) - 1
	while start <= end:
		half = (start + end) // 2
		if target == array[half]:
			return half
		elif target < array[half]:
			end = half - 1
		else:
			start = half + 1
    return -1

```

## 복잡도

시간복잡도: O(log(n)), 공간복잡도: O(1)

<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
  <center><h1>Dynamic Programming</h1></center>

---

# Max Subset Sum No Adjacent

![algoexpert_maxSubSetSum_noAdjacent](/media/algoexpert_maxSubSetSum_noAdjacent.png)

input으로 주어지는 배열에서 인접하지 않은 엘리먼트들의 합이 최대가 되는 경우를 구하는 문제이다.

### sample input

```
array = [75, 105, 120, 75, 90, 135]
```

### sample output

```
330
```

### 답안

```python
def maxSubsetSumNoAdjacent(array):

	# array = [75, 105, 120, 75, 90, 135]
	# maxSum = [75, 105, 195, 195, 285, 330]

	if len(array) == 0:
		return 0
	if len(array) == 1:
		return array[0]

	maxSum = [0 for i in array]

	maxSum[0] = array[0]
	maxSum[1] = max(array[0], array[1])

	for i in range(2, len(array)):
		maxSum[i] = max(maxSum[i - 1], maxSum[i - 2] + array[i])
	return maxSum[-1]
```

다이나믹 프로그래밍으로 푸는 DP 문제이다. 다이나믹 프로그래밍이란 동적 계획법이라고도 불리는데 '어떤 문제를 풀기 위해 그 문제를 더 작은 문제의 연장선으로 생각하고 과거에 구한 해를 활용하여' 답을 구하는 방식이다.

이 문제에서는 `maxSum` 배열에서 i번째 인덱스까지의 최댓값을 구하면서 마지막 엘리먼트까지 고려했을때의 최댓값을 구한다.

## 복잡도

시간복잡도 : O(n), 공간복잡도: O(n)

각 i 시점에서 프로그램에서 기억해야 하는 것은 i - 1, i - 2번째 maxSum이기 때문에 공간복잡도는 O(1)로 개선될 수 있다.

<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
  <center><h1>Stacks</h1></center>

---

# Balanced Brackets

![algoexpert_balanced_brackets](/media/algoexpert_balanced_brackets.png)

input으로 주어진 string의 브라켓들이 쌍으로 맞게 되는지 `balanced`가 되는지를 판단하는 문제이다.

### sample input

```
string = "([])(){}(())()()"
```

### sample output

```
true
```

## 제출답안

```python
def balancedBrackets(string):
	bracketsMapper = {
		')' : '(',
		']' : '[',
		'}' : '{'
	}

	openings ='([{'

	stack = []
	for letter in string:
		if letter not in bracketsMapper and letter not in openings:
			continue

		target = bracketsMapper.get(letter, False)
		if not target:
			stack.append(letter)
		else:
			if len(stack) > 0 and target == stack.pop():
				continue
			else:
				return False

	return len(stack) == 0
```

## 피드백

처음에 문제를 잘못 읽어 `other optional characters`가 string에 포함되는지를 고려하지 못했다. 그리고 stack에서 pop을 하기 전에 stack의 길이가 0보다 긴지를 확인하지 못하여 틀린 테스트 케이스가 있었다.

그리고 최초에 `openings`를 다음과 같이 딕셔너리로 정의했지만 파이썬의 특성상 일반 문자열로 주어도 무방하다.

```python
openings = {
  '(': True,
  '[': True,
  '{': True
}
```

## 복잡도

시간복잡도: O(n), 공간 복잡도: O(n)
