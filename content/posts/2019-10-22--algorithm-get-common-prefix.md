---
title: Get common begining prefix
date: "2019-10-22T17:03:37.121Z"
template: "post"
draft: false
slug: "/category/algorithm/get-common-begining-prefix"
category: "algorithm"
tags:
    - "algorithm"
description: "algorithm question - get common begining prefix"
socialImage: "/media/image-2.jpg"
---

>**문제출처 : [위코드](http://wecode.co.kr/)** 교육자료(not public)

##문제
```
strs은 단어가 담긴 배열입니다.
공통된 시작 단어(prefix)를 반환해주세요.

예를 들어
strs = ['start', 'stair', 'step']
return은 'st'

strs = ['start', 'wework', 'today']
return은 ''
```

##my solution
```javascript
const getPrefix = strs => {
  
  if(strs.length == 0) return ''
  
  const standard = strs[0];
  let checkString = ""
  let answer = ""
  for(let i = 0; i < standard.length; i++) {
    checkString += standard[i]
    
    let identifier = true;
    for(let j = 1; j < strs.length; j++) {

      if(strs[j].startsWith(checkString) && identifier) {
        identifier = true;
        
        if(j == strs.length - 1) {
          answer = checkString;
          console.log(answer)
          continue;
        }
      } else {
        identifier = false;
      }
    }
  }
  
  console.log(answer)
  return answer;
}
```

##give answer
```javascript
function getPrefix(strs) {
    if (strs.length === 0) return ''; 
    
    let prefix = strs[0];
    
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
        }
    }
    
    return prefix;
}
```