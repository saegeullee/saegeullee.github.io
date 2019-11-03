---
title: Identify reverse number
date: "2019-10-21T14:03:37.121Z"
template: "post"
draft: false
slug: "/category/algorithm/identify-reverse-number"
category: "algorithm"
tags:
    - "algorithm"
description: "algorithm question - identify reverse number"
socialImage: "/media/image-2.jpg"
---

>**문제출처 : [위코드](http://wecode.co.kr/)** 교육자료(not public)

```
숫자인 num을 인자로 넘겨주면, 뒤집은 모양이 num과 똑같은지 여부를 반환해주세요.

num: 숫자
return: true or false (뒤집은 모양이 num와 똑같은지 여부)

예를 들어,
num = 123
return false 
=> 뒤집은 모양이 321 이기 때문

num = 1221
return true 
=> 뒤집은 모양이 1221 이기 때문

num = -121
return false 
=> 뒤집은 모양이 121- 이기 때문

num = 10
return false 
=> 뒤집은 모양이 01 이기 때문
```

##my solution

```javascript

const sameReverse = num => {
  if(num < 0) {
    return false
  }
  
  num = num.toString()
  
  const numArr = num.split("")
  let result = []
  
  arr_length = numArr.length
  // 0, 1, 2, 3, 4
  for(let i = 0; i < arr_length ; i++) {
    result[i] = numArr.pop()
  }
  
  result = result.join("")
  if(result == num) {
    return true;
  } else {
    return false;
  }
}

sameReverse(1221)
```

##given solution
```javascript
function sameReverse(num) {
  let xStrArr = (num + '').split('');
  let strLength = xStrArr.length;
  let arr = [];
  
  for (let i = 0; i < strLength; i++) {
      arr.push(xStrArr.pop());
  } 
  console.log(Number(arr.join('')))
  return num === Number(arr.join(''));
}
```