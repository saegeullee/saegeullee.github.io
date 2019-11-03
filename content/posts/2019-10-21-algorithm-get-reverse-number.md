---
title: Get reverse number
date: "2019-10-21T13:44:37.121Z"
template: "post"
draft: false
slug: "/category/algorithm/get-reverse-number"
category: "algorithm"
tags:
    - "algorithm"
description: "algorithm question - get reverse number"
socialImage: "/media/image-2.jpg"
---

>**[문제출처](http://wecode.co.kr/)**

```
* 문제
reverse 함수에 정수인 숫자를 인자로 받습니다.
그 숫자를 뒤집어서 return해주세요.

x: 숫자
return: 뒤집어진 숫자를 반환!

예들 들어,
x: 1234
return: 4321

x: -1234
return: -4321

x: 1230
return: 321
```

##my solution

```javascript
const reverse = x => {
  array = x.toString().split("")
  
  let left = 0
  let right = array.length - 1
  
  while(array[right] === "0") {
    array.pop();
    right -= 1;
  }
  
  if(array[left] === "-") {
    array.shift()
    return Number("-" + array.reverse().join(""))
  } else {
    return Number(array.reverse().join(""))
  }
}

```

###given solution
```javascript
function reverse(x) {
  let minus = false;
  
  if (x < 0) {
      x *= -1;
      minus = true;
  }
  
  let numText = x.toString();
  let result = '';
  
  for (let i = numText.length-1; i >= 0; i--) {
      result += numText[i];
  }
  
  result = minus ? result * -1 : Number(result);
  
  return result;
}
```

##피드백
이 문제는 string을 가지고 풀 수 있는 문제인데 나는 굳이 array로 바꾼다음 다시 join해서 string으로 변환했다. 이럴 필요없이 given solution 처럼 string으로 처리하면 되는데 string을 다루는게 아직 익숙하지 않다. string도 배열처럼 string[i] 와 같이 인덱스로 접근할 수 있다는 것을 배웠다.