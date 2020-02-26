---
title: get largest consecutive 0s from binary
date: "2019-11-11T10:42:37.121Z"
template: "post"
draft: true
slug: "/category/algorithm/get-largest-consecutive-0s-from-binary"
category: "algorithm"
tags:
    - "algorithm"
description: "algorithm question - get largest consecutive 0s from binary"
socialImage: "/media/image-2.jpg"
---

> **문제출처 : [위코드](http://wecode.co.kr/)** 교육자료(not public)

## 문제

```
양수 N을 이진법으로 바꿨을 때, 연속으로 이어지는 0 중에서 가장 큰 값을 return해 주세요.

* 이어지는 0은 1과 1사이에 있는 것을 의미합니다.
* 1과 1사이에 있는 0을 binary gap 이라고 하겠습니다.
```

```
input: 9
output: 2
설명: 9의 이진수는 1001 입니다.
1과 1사이에 있는 0은 2 이므로, 2를 return
```

```
input: 529
output: 4
설명: 529의 이진수는 1000010001 입니다.
binary gap은 4와 3 두개가 있습니다.
이 중 큰 값은 4이므로 4를 return
```
