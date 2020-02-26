---
title: Nodejs & Mongoose 필터링, 정렬, 페이징 구현하기
date: '2019-12-14T16:00:37.121Z'
template: 'post'
draft: false
slug: '/nodejs/nodejs-querystring'
category: 'nodejs'
tags:
  - 'nodejs'
description: '쿼리스트링은 클라이언트에서 엔드포인트를 호출하여 서버에 요청할 때 엔드포인트의 끝에 붙여서 부가적으로 보내는 정보이다. 다음의 예시에서 `물음표?` 뒤의 `duration=5&difficulty=easy`가 쿼리스트링이다...'
socialImage: '/media/image-2.jpg'
---

> **[유데미 NODE.JS](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)** 수업을 듣고 정리한 내용입니다.

# 목차

- [쿼리스트링이란](#쿼리스트링이란)
- [필터링 구현하기](#필터링-구현하기)
- [고급 필터링 구현하기](#고급-필터링-구현하기)
- [정렬 구현하기](#정렬-구현하기)
- [특정필드 쿼리 구현하기](#특정필드-쿼리-구현하기)
- [페이징 구현하기](#페이징-구현하기)

## 쿼리스트링이란

쿼리스트링은 클라이언트에서 엔드포인트를 호출하여 서버에 요청할 때 엔드포인트의 끝에 붙여서 부가적으로 보내는 정보이다. 다음의 예시에서 `물음표?` 뒤의 `duration=5&difficulty=easy`가 쿼리스트링이다. 아래의 요청을 유추해보면 모든 tours 중에 duration이 5이고 difficulty가 easy인 tours만 보내달라는 뜻임을 알 수 있다.

```
http://localhost:3000/api/v1/tours?duration=5&difficulty=easy
```

## 필터링 구현하기

nodejs 서버에서 클라이언트의 요청을 받아 어떤 쿼리스트링을 보내왔는지를 분석해야 한다. 다음과 같이 컨트롤러 해당 메서드의 첫번째 인자로 들어오는 req 객체의 query 프로퍼티에 쿼리스트링이 담긴다. 그리고 쿼리스트링에 따라 Tour을 쿼리하여 해당 조건에 부합하는 Tour 도큐먼트만 클라이언트에게 응답으로 보내줄 수 있다. 쿼리스트링을 통해 필터링 기능을 구현한 것이다.

```javascript
//controllers/tourController.js
exports.getAllTours = async (req, res) => {
  console.log(req.query); // { duration: '5', difficulty: 'easy' }
  const tours = await Tour.find(req.query)
  res.status(200).json({
    status: 'success',
    data: {
      tours
    }
});
```

**[Tour스키마](https://saegeullee.github.io/nodejs/mongoose-basic)** 참고

## 고급 필터링 구현하기

위에서 쿼리스트링을 통해 필터링을 구현하는 방법을 알아보았다. 다음은 고급 필터링을 구현하는 방법을 알아보자. 만약 duration이 5 이상인 모든 Tour을 가져오려면 클라이언트에서 어떻게 요청을 보내야 할까? 이때도 쿼리스트링으로 해당 정보를 엔드포인트에 담아 서버에 요청을 보낼 수 있다. 다음과 같이 쿼리스트링을 구성한다. `duration`뒤에 `[gte]`를 붙여서 서버에 요청을 보내면 된다. gte은 greater than or equal 의 이니셜이다.

```
http://localhost:3000/api/v1/tours?duration[gte]=5&difficulty=easy
```

위와 같이 요청을 보내면 서버에서는 `req.query`객체가 다음과 같이 구성된다.

```javascript
{ duration: { gte: '5' }, difficulty: 'easy' }
```

몽구스에서 해당 요청대로 쿼리를 하기 위해서는 다음과 같이 현재의 `req.query`객체의 `gte`앞에 \$가 붙어야 한다.

```javascript
{ duration: { $gte: '5' }, difficulty: 'easy' }
```

이를 위해 데이터베이스에 쿼리하기 전에 해당 객체를 조작하여 원하는 형태로 만든 뒤 쿼리해야 한다. 이를 위해 다음과 같이 정규식을 사용하여 `gte`, `gt`, `lte`, `lt`가 객체에 포함된다면 그 앞에 \$를 붙여주는 로직을 짜야한다. `/\b(gte|gt|lte|lt)\b/g` 정규식의 `\b`를 앞뒤에 붙임으로서 `gte`, `gt`, `lte`, `lt`가 반드시 정확히 일치하는 단어들만 고른다. (ltl은 lt가 아니기 때문에 일치하지 않는다) `/g`는 이 string에서 일치하는 모든 `gte`, `gt`, `lte`, `lt` 앞에 \$를 붙여서 바꿔준다.

```javascript
exports.getAllTours = async (req, res) => {
  console.log(req.query);

  //객체를 string으로 바꿈
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  //string을 다시 객체로 바꿔 쿼리한다.
  const tours = await Tour.find(JSON.parse(queryStr));

  res.status(200).json({
    status: 'success',
    data: {
      tours
    }
});
```

이제 아래와 같이 쿼리를 하면 duration이 5 이상이고 price는 1500 이하이고 difficulty는 easy인 tour만 쿼리되어 응답으로 온다.

```
http://localhost:3000/api/v1/tours?duration[gte]=5&difficulty=easy&price[lte]=1500
```

정규식을 통과되어 나온 객체를 console.log를 찍어보면 다음과 같이 구성된다.

```javascript
{ duration: { '$gte': '5' },
  difficulty: 'easy',
  price: { '$lte': '1500' } }
```

## 정렬 구현하기

쿼리스트링을 통해 정렬 기준을 클라이언트에서 받아 해당 기준으로 정렬된 객체들을 응답으로 보내줄 수 있다. 가격이 낮은 순으로 특정 객체를 쿼리하고 싶다면 클라이언트에서는 다음과 같이 쿼리스트링으로 요청을 보내면 된다. 가격이 높은 순으로 쿼리하고 싶다면 price 앞에 -를 붙여 `?sort=-price`로 요청을 보내면 된다.

```
http://localhost:3000/api/v1/tours?sort=price
```

서버에서는 다음과 같이 처리하여 정렬 기준으로 쿼리하여 응답을 보내준다.

```javascript
exports.getAllTours = async (req, res) => {
  // Tour.find(req.query) 는 몽구스 쿼리 객체를 리턴한다.
  let query = Tour.find(req.query);

  if (req.query.sort) {
    const sortBy = req.query.sort;
    // 쿼리 객체에 정렬기준을 추가한다.
    query = query.sort(sortBy);
  }

  // 쿼리 객체를 consume하여 결과를 가져온다.
  const tours = await query;

  res.status(200).json({
    status: 'success',
    data: {
      tours
    }
  });
};
```

만약 price와 함께 두번째 정렬기준도 적용하여 쿼리하고 싶으면 클라이언트에서는 다음과 같이 두번째 정렬기준을 쿼리스트링에 포함하여 요청을 보내야 한다.

```
http://localhost:3000/api/v1/tours?sort=price,ratingsAverage
```

서버에서는 쿼리스트링을 파싱하여 sort() 함수에 다음과 같이 인자를 넘겨야 한다.

```javascript
query = query.sort('price ratingsAverage');
```

이를 위한 서버의 쿼리스트링 파싱 로직을 다음과 같이 구성하면 된다. 그리고 만약 디폴트 정렬기준을 주고 싶다면 else문에 넣으면 된다.

```javascript
  let query = Tour.find(req.query);

  if (req.query.sort) {
    const sortBy = req.query.sort.split(','),join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }
```

## 특정필드 쿼리 구현하기

클라이언트에서 객체의 특정 필드만 쿼리를 하고 싶다면 쿼리스트링에 쿼리를 원하는 필드만 담아서 엔드포인트를 호출할 수 있다. tours 객체의 name과 duration만 응답으로 받기를 원한다면 다음과 같이 서버에 요청을 보내면 된다.

```
http://localhost:3000/api/v1/tours?fields=name,duration
```

서버에서는 쿼리객체의 select 메서드에 쿼리를 원하는 필드명을 `query.select('name duration')` 과 같이 줘야한다. 특정 필드를 쿼리하고 싶지않다면 `query.select('-not_need_this_field')`와 같이 필드 앞에 -를 붙여서 쿼리하면 된다.

```javascript
exports.getAllTours = async (req, res) => {
  let query = Tour.find(req.query);
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  const tours = await query;

  res.status(200).json({
    status: 'success',
    data: {
      tours
    }
  });
};
```

만약 디폴트로 무조건 항상 쿼리하고 싶지 않은 필드가 있다면 모델 스키마를 정의할 때 해당 필드에 `select:false`를 지정해주면 된다. 아래의 예시에서는 `createdAt`필드를 항상 쿼리에서 제외한다.

```javascript
//models/tourSchema.js

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    }
);

```

## 페이징 구현하기

페이징을 구현하기 위해서는 우선 몽구스 쿼리 객체에 페이징을 수행할 수 있는 메서드를 알아야 한다. 몽구스에는 `skip`과 `limit`이라는 메서드가 있다. `skip`은 의미 그대로 특정 개수만큼을 건너뛰고 결과를 가져오겠다는 의미이고 `limit`은 쿼리할 도큐먼트의 개수를 의미한다. 아래의 예시에서는 처음 10개의 도큐먼트는 건너뛰고 11번째부터 20번째 도큐먼트 10개를 쿼리하겠다는 의미가 된다.

```javascript
query = query.skip(10).limit(10);
```

클라이언트에서는 페이징을 위해 다음과 같이 쿼리스트링을 추가하여 서버에 요청을 보낸다. 한 페이지에 10개의 결과물을 보여주고 싶다는 의미이다.

```
http://localhost:3000/api/v1/tours?page=1&limit=10
```

서버에서는 다음과 같이 클라이언트에서 전달받은 page 값을 적절하게 변경하여 skip 메서드의 인자로 전달할 수 있게끔 해야 한다.

```javascript
exports.getAllTours = async (req, res) => {
  let query = Tour.find(req.query);

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
  const tours = await query;

  res.status(200).json({
    status: 'success',
    data: {
      tours
    }
  });
};
```
