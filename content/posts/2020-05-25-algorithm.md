---
title: 알고리즘 문제 정리 (백준 온라인)
date: '2020-05-25T12:50:37.121Z'
template: 'post'
draft: false
slug: '/algorithm/backjoon-online'
category: 'algorithm'
tags:
  - 'algorithm'
description: '새로 풀어보는 알고리즘 문제를 정리한다.'
socialImage: '/media/image-2.jpg'
---

- [10539 행복](#10539-행복)
- [17269 이름 궁합 테스트](#17269-이름-궁합-테스트)
- [1920 수 찾기](#1920-수-찾기)
- [16165 걸그룹 마스터 준석이](#16165-걸그룹-마스터-준석이)
- [17224 APC는 왜 서브태스크 대회가 되었을까?](#17224-apc는-왜-서브태스크-대회가-되었을까)
- [16769 mixing milk](#16769-mixing-milk)
- [2480 주사위 세개](#2480-주사위-세개)
- [2484 주사위 네개](#2484-주사위-네개)
- [16675 두 개의 손](#16675-두-개의-손)
- [17413 단어 뒤집기 2](#17413-단어-뒤집기-2)
- [16956 늑대와 양](#16956-늑대와-양)
- [1932 정수 삼각형](#1932-정수-삼각형)
- [1904 01 타일](#1904-01-타일)

16165 걸그룹 마스터 준석이

## 10539 행복

[문제 링크](https://www.acmicpc.net/problem/10539)

```python
n, lst = input(), list(map(int, input().split()))

ans = [lst[0]]

total = ans[0]
for i in range(1, int(n)):
    current = lst[i] * (i+1) - total
    ans.append(current)
    total += ans[i]

for i in ans:
    print(i, end=' ')
```

### feedback

1. ans 배열 엘리먼트의 합을 구하는 total 위와 같이 하는 대신에 sum 메서드를 사용하면 더 간결한 코드가 나온다.

```python
for i in range(1, int(n)):
    ans.append(lst[i] * (i+1) - sum(ans))
```

2. print 함수의 두번째 인자로 `end=' '`을 추가함으로서 스페이스 한 칸을 띄우면서 i 를 print 찍을 수 있다.
3. n이 커지면 배열에 append를 하는 것 보다는 먼저 배열을 선언하는 것이 좋다.

```python
n, lst = input(), list(map(int, input().split()))

ans = [0 for i in range(int(n))]
ans[0] = lst[0]

total = ans[0]
for i in range(1, int(n)):
    ans[i] = lst[i] * (i+1) - sum(ans)

for i in ans:
    print(i, end=' ')

```

## 17269 이름 궁합 테스트

[문제 링크](https://www.acmicpc.net/problem/17269)

```python
n, name = list(map(int, input().split())), list(map(str, input().split()))

mapper = {
    'A' : 3, 'B' : 2, 'C' : 1, 'D' : 2,
    'E' : 4, 'F' : 3, 'G' : 1, 'H' : 3,
    'I' : 1, 'J' : 1, 'K' : 3, 'L' : 1,
    'M' : 3, 'N' : 2, 'O' : 1, 'P' : 2,
    'Q' : 2, 'R' : 2, 'S' : 1, 'T' : 2,
    'U' : 1, 'V' : 1, "W" : 1, "X" : 2,
    "Y" : 2, "Z" : 1
}

combination = ""
for a, b in zip(name[0], name[1]):
    combination += (a + b)
combination += name[0][n[1] : n[0]] if len(name[0]) > len(name[1]) else name[1][n[0] : n[1]]

point = []
for letter in combination:
    point.append(mapper[letter]);

while len(point) != 2:
    for idx, p in enumerate(point):
        if idx != len(point) - 1:
            res = point[idx] + point[idx + 1]
            point[idx] = res if res < 10 else res - 10
    point.pop()

ans = str(point[0]) + str(point[1]) + '%' if point[0] != 0 else str(point[1]) + '%'
print(ans)
```

### feedback

1. 변수명을 더 직관적으로 사용할 것 그리고 최초 input 값을 굳이 list로 받을 필요가 없다.

```python
N, M = map(int, input().split())
A, B = input().split()

combination = ""
for a, b in zip(A, B):
    combination += (a + b)
combination += A[M : N] if len(A) > len(B) else B[N : M]
...
```

2. 다른 풀이 방법. ord를 사용하여 일일이 알파벳마다의 딕셔너리를 작성할 필요 없어짐

```python
N, M = map(int, input().split())
A, B = input().split()

alp = [3, 2, 1, 2, 4, 3, 1, 3, 1, 1, 3, 1, 3, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 2, 2, 1]

AB = ""
min_len = min(N,M)
for i in range(min_len):
    AB += A[i] + B[i]

AB += A[min_len:] + B[min_len:]

lst = [alp[ord(i) - ord('A')] for i in AB]

for i in range(N+M-2):
  for j in range(N+M-1-i):
    lst[j] += lst[j+1]

print("{}%".format(lst[0] % 10 * 10 + lst[1] % 10))

```

## 1920 수 찾기

[문제 링크](https://www.acmicpc.net/problem/1920)

```python
N, A = input(), {i : 1 for i in list(map(int, input().split()))}
M, lst = input(), list(map(int, input().split()))

for i in lst:
    print(A.get(i, 0))
#     print(1 if i in A else 0)
```

### feedback

파이썬의 딕셔너리는 없는 키를 `A[i]`와 같이 접근하면 에러가 난다. get 함수로 해당 키의 값을 가져오고 해당 키가 없을 경우 리턴받고 싶은 값을 2번째 인자로 준다.

## 16165 걸그룹 마스터 준석이

[문제 링크](https://www.acmicpc.net/problem/16165)

```python
N,M = map(int, input().split())

groups = {}
for i in range(N):
    group = input()
    for j in range(int(input())):
        if groups.get(group, False) == False:
            groups[group] = []
        groups[group].append(input())

for i in range(M):
    name = input()
    quiz_type = int(input())
    if quiz_type == 0:
        groups[name].sort()
        for j in groups[name]:
            print(j)
    elif quiz_type == 1:
        for k in groups:
            if name in groups[k]:
                print(k)
```

### feedback

1. 정렬 메서드 sort()는 원본 리스트를 정렬하고 해당 리스트를 리턴하지 않기 때문에 자바스크립트와 같이 다음과 같은 코드를 작성하면 런타임 에러가 난다. sort()를 먼저 해주고 그 다음줄에서 해당 리스트에 접근하여 정렬된 리스트를 얻는다.

```python
for i in range(M):
    name = input()
    quiz_type = int(input())
    if quiz_type == 0:
        for j in groups[name].sort():
            print(j)
```

2. sorted() 메서드를 사용하여 정렬된 리스트를 리턴받을 수 있다. 따라서 다음과 같은 코드를 작성할 수 있다.

```python
for i in range(M):
    name = input()
    quiz_type = int(input())
    if quiz_type == 0:
        for j in sorted(groups[name]):
            print(j)
```

3. 내가 작성한 코드에서 quiz_type의 값은 0 또는 1이기 때문에 if문 안에서 이 값을 0 또는 1과 비교하는 코드를 생략할 수 있다.

```python

for i in range(M):
    name = input()
    quiz_type = int(input())
    if quiz_type:
        for k in groups:
          if name in groups[k]:
              print(k)
    else:
        groups[name].sort()
        for j in groups[name]:
            print(j)
```

## 17224 APC는 왜 서브태스크 대회가 되었을까?

[문제 링크](https://www.acmicpc.net/problem/17224)

```python
N, L, K = map(int, input().split())

total = 0
question = []
for i in range(N):
    sub1, sub2 = map(int, input().split())
    question.append([sub1, sub2, False])

for i in range(len(question)):
    if question[i][1] <= L and K > 0:
        total += 140
        K -= 1
        question[i][2] = True

for i in range(len(question)):
    if question[i][0] <= L and question[i][2] == False and K > 0:
        total += 100
        K -= 1

print(total)

```

## 9037 the candy war

[문제 링크](https://www.acmicpc.net/problem/9037)

```python

T = int(input())

for i in range(T):
    N = int(input())
    C = list(map(int, input().split()))
    count = 0

    while True:
        for i in range(len(C)):
            if C[i] % 2 == 1:
                C[i] += 1

        isEqual = True
        for i in range(len(C)):
            if i < len(C) - 1:
                if C[i] != C[i+1]:
                    isEqual = False

        if isEqual:
            print(count)
            break

        half = []
        for i in range(len(C)):
            half.append(C[i] / 2)
            C[i] = C[i] / 2

        for i in range(len(C)):
            if i == 0:
                C[i] += half[len(half) - 1]
            else:
                C[i] += half[i-1]

        count += 1
```

### feedback

배열의 원소가 모두 같은 것을 검사하는 로직을 위의 코드 해당 부분과 달리 set을 사용하여 다음과 같이 작성하면 효율적이다.

```python
# 위의 코드에서 배열의 원소가 모두 같은지를 검사하는 로직
isEqual = True
for i in range(len(C)):
    if i < len(C) - 1:
        if C[i] != C[i+1]:
            isEqual = False

if isEqual:
    print(count)
    break

#set을 사용하여 간결하게 표현
if len(set(C)) == 1:
    print(count)
    break
```

## 16769 mixing milk

[문제 링크](https://www.acmicpc.net/problem/16769)

```python
C, M = [0, 0, 0], [0, 0, 0]

for i in range(3):
    C[i], M[i] = map(int, input().split())

for i in range(100):
    idx, nxt = i % 3, (i + 1) % 3
    M[idx], M[nxt] = max(M[idx] - (C[nxt] - M[nxt]), 0), min(C[nxt], M[nxt] + M[idx])

for i in range(3):
    print(M[i])
```

### feedback

1. 처음에 나는 다음과 같이 코드를 짜다가 헤맸다. 내가 막힌 부분은 배열의 맨 끝 인덱스에서 배열의 첫번째 인덱스로 milk를 부어주어야 하는 로직을 짜는 부분이었다. 이 부분을 for 루프 안에서 분기처리하자니 로직이 중복되는 것이 많았다. 이부분은 위의 코드에서 `idx, nxt = i % 3, (i + 1) % 3`와 같이 매우 간결하게 표현하였다. if문으로 분기처리할 필요없이 내가 원하는 인덱스를 간단하게 얻을 수 있다.

```python
pairs = []
pair1 = list(map(int, input().split()))
pair2 = list(map(int, input().split()))
pair3 = list(map(int, input().split()))
pairs.append(pair1)
pairs.append(pair2)
pairs.append(pair3)

count = 100
while count > 0:
    for i in range(len(pairs)):
        if pairs[i+1][0] - pairs[i+1][1] - pairs[i][1] > 0:
            pairs[i+1][1] += pairs[i][1]
            pairs[i][1] = 0
        else:
        ...
```

2. 위의 정답코드에서 다음의 코드를 아래의 주석부분과 같이 다른 줄에 작성하면 로직에 에러가 발생한다. M[idx]가 변경된 값이 그 다음줄 로직에서 사용되기 때문이다. 따라서 다음과 같이 튜플을 사용하여 M[idx], M[nxt] 각 값이 동시에 처리된 값이 할당 될 수 있도록 한다.

```python
 M[idx], M[nxt] = max(M[idx] - (C[nxt] - M[nxt]), 0), min(C[nxt], M[nxt] + M[idx])
#     M[idx] = max(M[idx] - (C[nxt] - M[nxt]), 0)
#     M[nxt] = min(C[nxt], M[nxt] + M[idx])
```

3. 이 문제를 풀 때 max와 min을 활용한 방법에 주목해야 한다. max와 min을 활용하지 않았다면 많이 if else 문을 활용해야 했을 텐데 min, max를 사용하여 매우 간결하게 코드를 작성했다.

## 2480 주사위 세개

[문제 링크](https://www.acmicpc.net/problem/2480)

```python
dices = list(map(int, input().split()))

if len(set(dices)) == 1:
    print(10000 + 1000 * dices[0])
elif len(set(dices)) == 2:
    count = {}
    for i in range(3):
        if count.get(dices[i], 0) == 0:
            count[dices[i]] = 1
        else:
            count[dices[i]] += 1

    for key, val in count.items():
        if val == 2:
            print(1000 + key * 100)
elif len(set(dices)) == 3:
    print(max(dices[0], dices[1], dices[2]) * 100)
```

### 피드백

처음에 dices 리스트를 정렬하고 시작했으면 코드가 훨씬 간결해졌을 것이다..

```python
dices = sorted(list(map(int, input().split())))

if len(set(dices)) == 1:
    print(10000 + 1000 * dices[0])
elif len(set(dices)) == 2:
    print(1000 + dices[1] * 100)
elif len(set(dices)) == 3:
    print(dices[0] * 100)
```

## 2484 주사위 네개

[문제 링크](https://www.acmicpc.net/problem/2484)

```python
N = int(input())
prizes = []

for i in range(N):
    dices = sorted(list(map(int, input().split())))
    current_prize = 0
    if len(set(dices)) == 1:
        current_prize = 50000 + dices[0] * 5000
    elif len(set(dices)) == 2:
        if dices[1] == dices[2]:
            current_prize = 10000 + dices[1] * 1000
        else:
            current_prize = 2000 + dices[0] * 500 + dices[3] * 500
    elif len(set(dices)) == 3:
        if dices[0] == dices[1]:
            current_prize = 1000 + dices[0] * 100
        elif dices[1] == dices[2]:
            current_prize = 1000 + dices[1] * 100
        elif dices[2] == dices[3]:
            current_prize = 1000 + dices[2] * 100
    elif len(set(dices)) == 4:
        current_prize = dices[3] * 100

    prizes.append(current_prize)

print(sorted(prizes)[len(prizes) - 1])
```

## 16675 두 개의 손

[문제 링크](https://www.acmicpc.net/problem/16675)

```python
ML, MR, TL, TR = ('SPR'.index(i) for i in input().split())

# 0 2
# 1 0
# 2 1

if ML == MR and (ML+2) % 3 in [TL, TR]:
    print("TK")
elif TL == TR and (TL+2) % 3 in [ML, MR]:
    print("MS")
else:
    print("?")

```

### feedback

1. index 또는 find 메서드를 사용하여 문자열의 특정 문자가 몇번째 인덱스에 있는지를 얻어올 수 있다.

## 17413 단어 뒤집기 2

[문제 링크](https://www.acmicpc.net/problem/17413)

```python
# 첫번째로 내가 작성한 코드
# 코드가 조잡하고 복잡하고 가독성이 떨어지고
# 문제에서 예시 입력 7개에 대한 출력은 모두 정답이지만 제출했을때 틀린 답이다.

S = input()

if '<' in S:
    ans = ""
    while len(S) > 0:
        ans += S[S.find("<"):S.find(">") + 1]
        S = S[S.find(">") + 1:]
        if S.find("<") != 0:
            if S.find("<") == -1:
                ans += S[0:][::-1]
            else:
                tempS = S[0:S.find("<")].split(" ")
                revS = []
                if len(tempS) > 1:
                    for i in range(len(tempS)):
                        revS.append(tempS[i][::-1])
                    ans += ' '.join(revS)
                else:
                    ans += S[0:S.find("<")][::-1]
            S = S[S.find("<"):]
        if S.find("<") == -1:
            break;
    print(ans)

else:
    S = S.split(" ")
    revS = []
    for i in range(len(S)):
        revS.append(S[i][::-1])
    print(' '.join(revS))
```

### feedback

1. for문을 돌면서 문자열 하나가 들어왔을 때에 대한 조건을 분기처리하여 더 가독성이 쉽고 깔끔한 정답 코드를 다음과 같이 작성할 수 있다.

```python
S = input()

ans, tmp, ck = '', '', False

for i in S:
    if i == ' ':
        if ck:
            ans += ' '
        else:
            ans += tmp[::-1] + ' '
            tmp = ''

    elif i == '<':
        ck = True
        ans += tmp[::-1] + '<'
        tmp = ''

    elif i == '>':
        ck = False
        ans += '>'

    else:
        if ck: ans += i
        else:  tmp += i

ans += tmp[::-1]
print(ans)
```

# 방향벡터 문제

## 16956 늑대와 양

[문제 링크](https://www.acmicpc.net/problem/16956)

```python
R, C = map(int, input().split())
M = [list(input()) for i in range(R)]

dx, dy = [0, 1, 0, -1], [1, 0, -1, 0]

ck = False

for i in range(R):
    for j in range(C):
        if M[i][j] == "W":
            for w in range(4):
                ii, jj = i + dx[w], j + dy[w]
                if ii < 0 or ii >= C or jj < 0 or jj >= R:
                    continue
                if M[ii][jj] == "S":
                    ck = True

if ck:
    print(0)
else:
    print(1)
    for i in range(R):
        for j in range(C):
            if M[i][j] not in "SW":
                M[i][j] = "D"

for i in M:
    print("".join(i))
```

# 동적계획법

## 1932 정수 삼각형

[문제 링크](https://www.acmicpc.net/problem/1932)

```python
N = int(input())
# DP[i][j] : i, j에 도착했을 때의 최대값
# DP[i][j] = max(DP[i-1][j-1], DP[i-1][j] + A[i][j])
A = [[0 for _ in range(N+1)] for _ in range(N+1)]
DP = [[0 for _ in range(N+1)] for _ in range(N+1)]

for i in range(1, N+1):
    tmp = list(map(int, input().split()))
    for j in range(1, i+1):
        A[i][j] = tmp[j-1]

for i in range(1, N+1):
    for j in range(1, i+1):
        DP[i][j] = max(DP[i-1][j-1], DP[i-1][j]) + A[i][j]


print(max(DP[-1]))
# for i in DP:
#     print(i)
```

## 1904 01 타일

[문제 링크](https://www.acmicpc.net/problem/1904)

## 정답 코드

```python

n = int(input())

answer = [0] * 1000001

answer[1], answer[2] = 1, 2

for i in range(3, n + 1):
    answer[i] = (answer[i - 1] + answer[i - 2]) % 15746

print(answer[n])
```

## 피드백

이 문제 못풀었다.. 아래와 같이 경우의 수를 나열해보다 N = 5인 경우의 수를 그려보고 6까지 그려봐야하나 싶었다. 심지어 N = 5일때 10가지의 경우가 나왔다..

```
# N = 1 -> 1 (1)
# N = 2 -> 00, 11 (2)
# N = 3 -> 001, 100, 111 (3)
# N = 4 -> 0011, 0000, 1001, 1100, 1111 (5)
```

이 문제는 전형적인 DP 문제이다. DP문제를 해결하는 방법은 n이 작은 수일때의 답을 구하고 점화식을 세우는 것이다.

이 문제를 푸는 힌트는 각 N에서 가능한 모든 경우의 수를 구한 것이기 때문에 N번째 타일의 개수는 N-1번째의 모든 경우에 1을 붙인 것과 N-2번째의 모든경우에 00을 붙인 것을 합한 것이라고 볼 수 있다.

## 복잡도

시간복잡도 : O(N)

백준온라인에서 이 문제를 정답처리하는 로직이 이상한것 같다.
공간복잡도를 보면 알 수 있다. input으로 들어오는 N에 상관없이 무조건 answer 배열을 `answer = [0] * 1000001`와 같이 처리해줘야 런타임에러가 나지 않는다.
