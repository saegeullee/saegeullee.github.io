---
title: 비동기 자바스크립트
date: '2019-11-03T18:16:37.121Z'
template: 'post'
draft: false
slug: '/category/javascript/ayncronous-javascript/'
category: 'javascript'
tags:
  - 'javascript'
description: '프로미스란 미래에 어떤 값을 가져다 줄 것을 약속하는 객체이다. 프로미스를 사용하면 비동기 프로그래밍을 할 때 동기 프로그래밍 방식으로 코드를 작성할 수 있다. 먼저 아래의 예시에서 프로미스 객체가 리턴해주기로 약속한 배열 `[1, 2, 3, 4]` 을 성공적으로 리턴해주는 예시를 보자...'
socialImage: '/media/image-2.jpg'
---

> **[유데미 자바스크립트](https://www.udemy.com/course/the-complete-javascript-course/)** 수업을 듣고 정리한 내용입니다.

# 프로미스

프로미스란 미래에 어떤 값을 가져다 줄 것을 약속하는 객체이다. 프로미스를 사용하면 비동기 프로그래밍을 할 때 동기 프로그래밍 방식으로 코드를 작성할 수 있다. 먼저 아래의 예시에서 프로미스 객체가 리턴해주기로 약속한 배열 `[1, 2, 3, 4]` 을 성공적으로 리턴해주는 예시를 보자.

```javascript
const getIDs = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve 함수 호출시 이 프로미스는 fulfilled 상태가 된다.
    //그리고 resolve 함수의 매개변수 데이터를 리턴한다.
    resolve([1, 2, 3, 4]);
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
    console.log(IDs); // output -> [1, 2, 3, 4]
  })
  .catch(error => {
    console.log(error);
  });
```

다음은 프로미스가 리턴해주기로 약속한 데이터를 성공적으로 리턴해주지 못할 경우이다.

```javascript
const getIDs = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject 함수 호출시 이 프로미스는 rejected 상태가 된다.
    reject('rejected, failed to get data');
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
    // output -> rejected, failed to get data
  });
```

##연속적으로 then 사용하기

아래의 예시와 같이 then을 chaining 하여 사용할 수 있다. 아래의 예시에서는 첫번째 프로미스인 getIDs 에서 리턴해주는 데이터를 바탕으로 getRecipes 프로미스를 사용하여 새로운 요청을 보내고 필요한 recipe 데이터를 받는다. 그리고 이 recipe 데이터를 바탕으로 세번째 프로미스 getRelated(recipe.publisher) 을 호출하여 같은 publisher 가 발행한 연관된 recipe를 받는다.

```javascript
const getIDs = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([1, 2, 3, 4]);
  }, 1500);
});

const getRecipes = recID => {
  return new Promise((resolve, reject) => {
    setTimeout(
      ID => {
        const recipe = {
          title: 'Fresh tomato pasta',
          publisher: 'Jonas'
        };
        resolve(`${ID} : ${recipe.title}, publisher : ${recipe.publisher}`);
      },
      1500,
      recID
    );
  });
};

const getRelated = publisher => {
  return new Promise((resolve, reject) => {
    setTimeout(
      pub => {
        const recipe = {
          title: 'another recipe from the publisher',
          publisher: 'Jonas'
        };
        resolve(`${pub} : ${recipe.title}`);
      },
      1500,
      publisher
    );
  });
};

getIDs
  .then(IDs => {
    console.log(IDs); //output -> [1, 2, 3, 4]
    return getRecipes(IDs[2]);
  })
  .then(recipe => {
    console.log(recipe); //output -> 3: Fresh tomato pasta
    return getRelated(recipe.publisher);
  })
  .then(recipe => {
    console.log(recipe);
    //output -> Jonas : another recipe from the publisher
  })
  .catch(error => console.log(error));
```

# ASYNC / AWAIT

async와 await는 프로미스를 소비(consume)하기 위해 만들어졌다. 위에서 `then`을 사용하여 프로미스를 consume하는 코드를 `async`, `await`를 사용해서 나타내보자. 프로미스 객체를 만드는 코드는 위의 코드를 그대로 사용하면 된다.

```javascript
//From Promises to Async/Await
async function getRecipesAW() {
  // await 키워드를 통해 getIDs 프로미스를 consume 한다.
  // await는 이 부분부터 프로미스가 fulfilled 될때까지
  // 코드가 실행되는 것을 멈춘다.
  // 그리고 프로미스에서 resolved 된 value가 IDs 변수에 할당된다.
  const IDs = await getIDs;
  console.log(IDs); // output -> [1, 2, 3, 4]
  const recipe = await getRecipes(IDs[2]);
  console.log(recipe); // output -> 3: Fresh tomato pasta
  const related = await getRelated(recipe.publisher);
  console.log(related);
  //output -> Jonas : another recipe from the publisher
  return recipe;
}

// getRecipesAW 함수는 resolved value와 함께 프로미스 객체를 리턴한다.
getRecipesAW().then(result => console.log(`${result} is the best ever!!`));
```

getRecipesAW 함수 앞에 `async` 키워드를 붙이면 이 함수는 백그라운드에서 동작하는 메서드라는 의미가 된다. 이 함수는 프로미스 객체를 리턴한다. 그리고 `async` 함수 안에서는 한 개 이상의 `await`를 사용할 수 있다. `async` 함수 안에서 일처리를 끝내고 얻은 값을 리턴하면 이 프로미스는 resolved 상태가 되고 리턴한 값이 resolved value가 된다.

# Making AJAX calls with fetch and promises

다음은 fetch와 프로미스를 사용하여 AJAX(Asyncronous Javascript And Xml) 호출을 해보자. 아래의 코드에서 fetch 함수를 통해 서버에서 오는 응답인 첫번째 then 함수의 result는 Response객체이다. 이 Response 객체의 body에는 `ReadableStream`이 들어있다. 우리의 코드에서 이 데이터를 사용하기 위해서는 먼저 json 객체를 자바스크립트 객체로 변환해야 한다. 이를 위해 `result.json()`을 호출하고 json() 함수는 또 프로미스 객체를 리턴하기 때문에 then() 메서드를 체이닝하여 자바스크립트 객체로 변환된 데이터를 응답으로 받을 수 있다.

```javascript
function getWeather(woeid) {
  fetch(
    `https://cors-anywhere.herokuapp.com/
        https://www.metaweather.com/api/location/${woeid}/`
  )
    .then(result => {
      //console.log(result);
      return result.json();
    })
    .then(data => {
      console.log(data);
      const today = data.consolidated_weather[0];
      console.log(
        `Temperature in ${data.title} stay between 
            ${today.min_temp} and ${today.max_temp}.`
      );
    })
    .catch(error => console.log(error));
}

getWeather(2487956);
```

# Making AJAX calls with fetch and async/await

`async`, `await`를 사용하면 try, catch를 사용해서 error를 잡을 수 있다.

```javascript
async function getWeatherAW(woeid) {
  try {
    const result = await fetch(
      `https://cors-anywhere.herokuapp.com/
            https://www.metaweather.com/api/location/${woeid}/`
    );
    const data = await result.json();
    const today = data.consolidated_weather[0];
    console.log(
      `Temperature in ${data.title} stay between 
            ${today.min_temp} and ${today.max_temp}.`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}
getWeatherAW(2487956);
let dataLondon;
getWeatherAW(44418).then(data => {
  dataLondon = data;
  console.log(dataLondon);
});
```
