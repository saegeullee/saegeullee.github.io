---
title: Asyncronous Javascript
date: "2019-10-27T21:16:37.121Z"
template: "post"
draft: false
slug: "/category/javascript/ayncronous-javascript/"
category: "javascript"
tags:
    - "javascript"
description: "비동기 자바스크립트 정리"
socialImage: "/media/image-2.jpg"
---

> **[유데미 자바스크립트](https://www.udemy.com/course/the-complete-javascript-course/)** 수업을 듣고 정리한 내용입니다.

#Promise
- Object that keeps track about whether a certain event has happened already or not.
- Determines what happens after the event has happened.
- Implements the concept of a future value that we're expecting.

프로미스란 미래에 어떤 값을 가져다 줄 것을 약속하는 객체이다. 프로미스를 사용하면 비동기 프로그래밍을 할 때 동기 프로그래밍 방식으로 코드를 작성할 수 있다. 먼저 아래의 예시에서 프로미스 객체가 리턴해주기로 약속한 `[523, 883, 432, 974]` 데이터를 성공적으로 리턴해주는 예시를 보자.
```javascript
const getIDs = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve 함수 호출시 이 프로미스는 fulfilled 상태가 된다.
        //그리고 resolve 함수의 매개변수 데이터를 리턴한다.
        resolve([523, 883, 432, 974]);
    }, 1500);
});

/*
consume promise
then 메서드를 통해 fulfilled 상태의 프로미스를 처리하기 
위한 이벤트 핸들러를 추가할 수 있다. 
then 메서드 내부 콜백 함수의 인자로 전달한 IDs는 
이 프로미스의 결과 데이터이다. 
*/
getIDs
    .then(IDs => {
        console.log(IDs); // output -> [523, 883, 432, 974]
    })
    .catch(error => {
        console.log(error);
    })
```

다음은 프로미스가 리턴해주기로 약속한 데이터를 성공적으로 리턴해주지 못할 경우이다.

```javascript
const getIDs = new Promise((resolve, reject) => {
    setTimeout(() => {
        // reject 함수 호출시 이 프로미스는 rejected 상태가 된다.
        reject([523, 883, 432, 974]);
    }, 1500);
});

getIDs
    .then(IDs => {
        console.log(IDs);
    })
    //위의 프로미스에서 reject 함수가 호출되었기 때문에
    //자바스크립트는 에러가 발생했음을 감지하고 catch 메서드가 호출된다.
    .catch(error => {
        console.log(error);
    })
```

##연속적으로 then 사용하기

아래의 예시와 같이 then을 chaining 하여 사용할 수 있다. 첫번째 promise인 getIDs 에서 리턴해주는 데이터를 바탕으로 getRecipes 프로미스를 사용하여 새로운 요청을 보내고 필요한 데이터를 받을 수 있다. 

```javascript

const getIDs = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([523, 883, 432, 974]);
    }, 1500);
});

const getRecipes = recID => {
    return new Promise((resolve, reject) => {
        setTimeout(ID => {
            const recipe = { title: 'Fresh tomato pasta', publisher: 'Jonas' };
            resolve(`${ID} : ${recipe.title}, publisher : ${recipe.publisher}`);
        }, 1500, recID);
    })
}

const getRelated = publisher => {
    return new Promise((resolve, reject) => {
    setTimeout(pub => {
        const recipe = { title: 'another recipe from the publisher', publisher: 'Jonas' };
        resolve(`${pub} : ${recipe.title}`);
    }, 1500, publisher)
    })
}


getIDs
    .then(IDs => {
        console.log(IDs);
        return getRecipes(IDs[2]);
    })
    .then(recipe => {
        console.log(recipe); //output -> 432: Fresh tomato pasta
        return getRelated('Jonas');
    })
    .then(recipe => {
        console.log(recipe); 
        //output -> Jonas : another recipe from the publisher
    })
    .catch(error => console.log(error));

```

