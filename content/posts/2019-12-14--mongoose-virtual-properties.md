---
title: Mongoose 가상 프로퍼티
date: '2019-12-14T23:10:37.121Z'
template: 'post'
draft: false
slug: '/nodejs/mongoose-virtual-property'
category: 'nodejs'
tags:
  - 'nodejs'
  - 'mongoose'
description: '가상 프로퍼티는 말 그대로 실제로 데이터베이스에 저장되지 않고 가상으로 띄우는 프로퍼티라는 의미로 몽구스 스키마에 다음과 같이 정의할 수 있다. 실제로 데이터베이스에 저장되지 않는 데이터가 왜 필요할까?'
socialImage: '/media/image-2.jpg'
---

> **[유데미 NODE.JS](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)** 수업을 듣고 정리한 내용입니다.

## 가상 프로퍼티

가상 프로퍼티는 말 그대로 실제로 데이터베이스에 저장되지 않고 가상으로 띄우는 프로퍼티라는 의미로 몽구스 스키마에 다음과 같이 정의할 수 있다. 실제로 데이터베이스에 저장되지 않는 데이터가 왜 필요할까?<br> 예를들어 스키마에 거리에 대한 프로퍼티 distance가 필요하다고 생각해보자. 서비스가 글로벌하게 성장하여 외국에 진출을 해야 하는데 어떤 나라는 거리를 킬로미터가 아니라 마일을 사용할 수도 있다. 이때는 같은 데이터를 나타내는 킬로미터와 마일을 모두 데이터베이스에 저장하면 자원이 낭비된다고 볼 수 있다. 이와 같은 경우에 실제 거리에 대한 데이터는 킬로미터로 저장하고 특정 클라이언트에는 가상으로 마일 데이터를 생성하여 보여줄 수 있다. 물론 어플리케이션 로직에서 이를 처리할 수 있지만 몽구스 가상 프로퍼티 기능을 사용하여 구현할 수도 있다.

```javascript
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.virtual('durationWeeks').get(function() {
  //this는 각 개별 도큐먼트를 의미한다.
  return this.duration / 7;
});
```

위에서 몽구스 스키마 인스턴스를 생성하는 생성자의 두번째 인자로 전달된 객체는 데이터베이스를 쿼리한 결과물인 데이터가 JSON과 객체 형태로 내보내질 때 가상 프로퍼티도 함께 내보내라는 의미이다. 따라서 이 옵션을 설정하지 않으면 가상 프로퍼티는 쿼리 결과물에 포함되지 않는다.

```javascript
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
```

위와같이 가상 프로퍼티를 설정 후 쿼리요청을 보내면 `durationWeeks`가 가상으로 계산되어 결과물에 포함되었다.

```json
{
  "status": "success",
  "data": {
    "tours": [
      {
        "_id": "5df4dcbfe5ad9f25e2b4aace",
        "name": "The Sports Lover",
        "duration": 14,
        "price": 2997,
        "durationWeeks": 2
      }
    ]
  }
}
```
