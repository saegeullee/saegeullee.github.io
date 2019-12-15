---
title: Mongoose 기본
date: '2019-12-13T16:00:37.121Z'
template: 'post'
draft: false
slug: '/nodejs/mongoose-basic'
category: 'nodejs'
tags:
  - 'nodejs'
  - 'mongoose'
description: '몽구스는 MongoDB를 Nodejs에서 사용하기 쉽게 추상화해놓은 ODM(Object Data Modeling) 라이브러리이다. 몽구스를 통해 MongoDB와 상호작용하는 어플리케이션을 쉽고 빠르게 개발할 수 있다...'
socialImage: '/media/image-2.jpg'
---

> **[유데미 NODE.JS](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)** 수업을 듣고 정리한 내용입니다.

## 몽구스란

- 몽구스는 MongoDB를 Nodejs에서 사용하기 쉽게 추상화해놓은 ODM(Object Data Modeling) 라이브러리이다.
- 몽구스를 통해 MongoDB와 상호작용하는 어플리케이션을 쉽고 빠르게 개발할 수 있다.
- 몽구스는 스키마 정의, 데이터 모델링 및 관계 설정, 쉬운 데이터 유효성 검증, 간단한 쿼리 API와 미들웨어 등의 기능을 제공한다.

* 몽구스 스키마를 정의할 때 데이터 모델링을 한다. 데이터의 구조를 정할 수 있으며 각 데이터의 디폴트값과 유효성 체크 여부 등을 정할 수 있다.

* 몽구스 모델은 몽구스 스키마를 감싸는 Wrapper 로써 MongoDB의 CRUD 를 위한 인터페이스를 제공한다.

**[몽고DB 기본 참고](https://saegeullee.github.io/nodejs/mongodb-basic)**

## 모델 스키마 정의하기

다음과 같이 `tourSchema`라는 몽구스 스키마와 `Tour`라는 몽구스 모델을 정의할 수 있다. 어플리케이션에서는 몽구스 모델이 MongoDB에 접근 할 수 있는 인터페이스를 제공하기 때문에 몽구스 모델을 모듈화하여 어플리케이션의 다른 파일에서 이를 사용할 수 있도록 한다.

```javascript
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
```

## 도큐먼트 생성하기

위에서 정의한 `Tour` 모델을 `Controller`파일에 가져와서 클라이언트의 해당 요청이 들어오면 Tour 도큐먼트를 생성한다.

```javascript
// controllers/tourController.js
const Tour = require('models/tourModel');

exports.createTour = async (req, res) => {
  const newTour = await Tour.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      tour: newTour
    }
  });
};
```

## 도큐먼트 읽기

### 모든 도큐먼트 읽기

```javascript
const allTours = await Tour.find();
```

### 하나의 도큐먼트 읽기

`findById`에 마우스를 올려보면 다음과 같은 설명이 나온다. `findById`는 `findOne`과 거의 유사한 함수이고 `findById`를 호출하면 내부적으로는 `findOne` 함수를 사용한다. 즉 `findById`는 개발자가 쉽게 `findOne`을 사용할 수 있도록 `mongoose`가 만들어놓은 함수이다. 물론 [몽구스 공식홈페이지](https://mongoosejs.com/docs/api.html#model_Model.findById)에도 설명이 잘 나와있다.

```
Finds a single document by its _id field
findById(id) is almost* equivalent to findOne({ _id: id }).
findById() triggers findOne hooks.
```

```javascript
const tour = await Tour.findById(req.params.id);
//or
const tour = await Tour.findOne({ _id: req.params.id });
```

위의 `req.params.id`는 클라이언트에서 엔드포인트의 끝에 붙여준 id를 받아오는 것이다.

```javascript
router.route(`/:id`).get(tourController.getTour);
```

## 도큐먼트 업데이트하기

도큐먼트의 업데이트는 다음과 같이 한다. `findByIdAndUpdate`의 세번째 인자는 옵션으로 `{new: true}` 옵션을 주면 업데이트가 반영이 된 도큐먼트가 리턴이 된다. 이 옵션의 디폴트 값은 false 이고 업데이트 이전의 도큐먼트가 리턴된다. 그리고 `runValidators` 옵션을 활성화하여 스키마 정의와 다르게 도큐먼트가 입력되면 에러를 발생시키도록 할 수 있다. 음 뭔가 이상하다.. `runValidators`옵션을 false로 설정해도 만약 스키마와 다르게 하여 도큐먼트를 입력하면 에러가 난다.

```javascript
const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
  new: true,
  runValidators: true
});
```

## 도큐먼트 삭제하기

```javascript
await Tour.findByIdAndDelete(req.params.id);
```
