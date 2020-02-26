---
title: Mongoose 주요쿼리 정리
date: '2019-12-16T23:10:37.121Z'
template: 'post'
draft: false
slug: '/nodejs/mongoose-queries'
category: 'nodejs'
tags:
  - 'nodejs'
  - 'mongoose'
description: '이 포스팅에서는 nodejs 어플리케이션을 개발하면서 새로 배웠거나 중요한 몽구스 쿼리에 대해 정리한다. populate한 도큐먼트의 특정필드를 다시 populate하기, aggregate 메서드로 도큐먼트 그룹짓기 etc...
'
socialImage: '/media/image-2.jpg'
---

이 포스팅에서는 nodejs 어플리케이션을 개발하면서 새로 배웠거나 중요한 몽구스 쿼리에 대해 정리한다.

# 목차

- [populate한 도큐먼트의 특정필드를 다시 populate하기](#populate한-도큐먼트의-특정필드를-다시-populate하기)

- [aggregate 메서드로 도큐먼트 그룹짓기](#aggregate-메서드로-도큐먼트-그룹짓기)

- [도큐먼트 업데이트시 runvalidator 옵션주기](#도큐먼트-업데이트시-runvalidator-옵션주기)

## populate한 도큐먼트의 특정필드를 다시 populate하기

`Item` 모델의 스키마를 보면 다음과 같이 4개의 필드가 다른 모델의 reference를 가지고 있다.

```javascript
const itemSchema = new Schema({
  provisionHistory: [{ type: Schema.Types.ObjectId, ref: 'Provision' }],
  owner: { type: Schema.Types.ObjectId, ref: 'Member', default: null },
  itemType: { type: Schema.Types.ObjectId, ref: 'ItemType', required: true },
  model: { type: Schema.Types.ObjectId, ref: 'ItemModel', required: true }
});
module.exports = mongoose.model('Item', itemSchema);
```

Item 을 쿼리할 때 reference를 가지고 있는 모델의 데이터를 가지고 오고 싶으면 다음과 같이 populate를 하면 된다.

```javascript
const item = await Item.findById(req.params.id)
  .populate({ path: 'itemType', select: 'name' })
  .populate({ path: 'model', select: 'name' })
  .populate({ path: 'owner', select: 'nickName' })
  .populate({ path: 'provisionHistory' });
```

위와 같이 populate를 했을때의 응답을 보면 다음과 같이 구성되어 있다. reference로 가지고 있는 모델의 도큐먼트들이 populate 된 것을 확인해볼 수 있다. 그런데 populate 한 `provisionHistory`를 보면 이 도큐먼트에는 `memberId`가 또 다른 모델의 reference를 가지고 있다. 이때 이 reference도 populate하여 도큐먼트를 가지고 오고 싶으면 어떻게 해야 할까?

```json
{
  "status": "success",
  "message": {
    "provisionHistory": [
      {
        "_id": "5df99a321cdd5a1efe0f19e0",
        "usageType": "지급",
        "givenDate": "2019-11-10T15:00:00.000Z",
        "memberId": "5df99a04c26dcf1e3efaf866",
        "__v": 0
      }
    ],
    "owner": null,
    "_id": "5df99a321cdd5a1efe0f1a02",
    "itemType": {
      "_id": "5df99a321cdd5a1efe0f19d1",
      "name": "아이맥"
    },
    "model": {
      "_id": "5df99a321cdd5a1efe0f19d5",
      "name": "iMac A2115"
    },
    "id": "5df99a321cdd5a1efe0f1a02"
  }
}
```

다음과 같이 populate 쿼리를 보내면 된다. populate를 한 `provisionHistory` 도큐먼트에서 또 다시 populate 할 대상을 지정해주면 된다. 아래의 경우에서는 `memberId`를 populate 후 또다시 cell을 populate하여 가져온다.

```javascript
const item = await Item.findById(req.params.id)
  .populate({ path: 'itemType', select: 'name' })
  .populate({ path: 'model', select: 'name' })
  .populate({ path: 'owner', select: 'nickName' })
  .populate({
    path: 'provisionHistory',
    populate: {
      path: 'memberId',
      select: 'nickName cell',
      populate: {
        path: 'cell',
        select: 'name'
      }
    }
  });
```

위와같이 쿼리를 보냈을 때의 응답을 살펴보면 다음과 같이 구성된다. `memberId`와 `cell` 도큐먼트가 모두 populate 된 것을 확인할 수 있다.

```json
{
  "status": "success",
  "message": {
    "provisionHistory": [
      {
        "_id": "5df99a321cdd5a1efe0f19e0",
        "usageType": "지급",
        "givenDate": "2019-11-10T15:00:00.000Z",
        "memberId": {
          "_id": "5df99a04c26dcf1e3efaf866",
          "nickName": "큐",
          "cell": {
            "_id": "5df999ff48730c1df8376d98",
            "name": "EX 셀"
          }
        },
        "__v": 0
      }
    ],
    "owner": null,
    "_id": "5df99a321cdd5a1efe0f1a02",
    "itemType": {
      "_id": "5df99a321cdd5a1efe0f19d1",
      "name": "아이맥"
    },
    "model": {
      "_id": "5df99a321cdd5a1efe0f19d5",
      "name": "iMac A2115"
    },
    "id": "5df99a321cdd5a1efe0f1a02"
  }
}
```

## aggregate 메서드로 도큐먼트 그룹짓기

몽고DB aggregate 메서드를 활용하여 특정 컬렉션의 모든 도큐먼트들을 어떤 기준을 바탕으로 그룹으로 묶을 수 있다. 예를들어 각 비품 종류의 고유번호 최댓값을 구하는 경우는 다음과 같다. `$group` 객체의 `_id` 프로퍼티는 모든 도큐먼트를 그룹짓는 기준이 된다. 여기서는 `itemType` (비품 종류)를 기준으로 그룹을 나누고 각 그룹의 최대 고유값을 찾는다.

```js
let uniqueNumberOfEachItemType = await Item.aggregate([
  {
    $group: {
      _id: '$itemType',
      uniqueNumber: { $max: '$uniqueNumber' }
    }
  }
]);
```

다음과 같이 위의 쿼리 결과를 보면 각 비품종류의 최대 고유값이 나왔다. 하지만 여기서의 문제점은 그룹을 묶는 기준인 `itemType`이 reference라는 점이다. 일반 쿼리였다면 populate하여 손쉽게 reference 도큐먼트의 정보를 가져왔겠지만 aggregate 메서드에서 그룹을 짓는 것과 함께 reference를 populate까지 해서 결과를 가져오는 방법은 잘 모르겠다. 이 기능은 aggregate 메서드에 대해 더 공부해서 가능한지 알아봐야겠다.

```json
{
  "status": "success",
  "results": [
    {
      "_id": "5df99a321cdd5a1efe0f19d4",
      "uniqueNumber": 4
    },
    {
      "_id": "5df99a321cdd5a1efe0f19d3",
      "uniqueNumber": 3
    },
    {
      "_id": "5df99a321cdd5a1efe0f19d2",
      "uniqueNumber": 4
    },
    {
      "_id": "5df99a321cdd5a1efe0f19d1",
      "uniqueNumber": 7
    }
  ]
}
```

우선은 어쩔 수 없이 다음과 같이 여기서 나온 결과를 가지고 한번더 쿼리하여 itemType 이름을 가져오는 코드를 작성하였다.

```js
uniqueNumberOfEachItemType = await Promise.all(
  uniqueNumberOfEachItemType.map(async el => {
    const itemType = await ItemType.findById(el._id);
    const uniqueNumber = el.uniqueNumber + 1;
    return { name: itemType.name, uniqueNumber };
  })
);
```

이제 확실히 내가 원하는 결과가 나온것을 확인해볼 수 있다.

```json
{
  "status": "success",
  "results": [
    {
      "name": "모니터",
      "uniqueNumber": 5
    },
    {
      "name": "노트북(윈도우)",
      "uniqueNumber": 4
    },
    {
      "name": "맥북프로",
      "uniqueNumber": 5
    },
    {
      "name": "아이맥",
      "uniqueNumber": 8
    }
  ]
}
```

## 도큐먼트 업데이트시 runvalidator 옵션주기

몽구스는 `enum` validator라는 데이터의 유효성을 검증하는 기능을 제공한다. `enum`은 몽구스 스키마를 정의할 때 해당 필드가 반드시 어떤 값만을 값으로 가져야 할 때 유용하게 사용할 수 있다. 예를들어 아래의 itemSchema를 보면 `usageType` 필드는 반드시 `['대여', '지급', '재고']` 중 하나를 값으로 가져야 한다. enum을 키로 하여 values를 정의했기 때문이다. `message` 프로퍼티를 통해 에러가 발생했을 때 보여줄 메시지를 내가 원하는 대로 정할 수 있다. 따로 정하지 않는다면 에러 발생시 디폴트 에러 메시지가 보여진다.

```js
const itemSchema = new Schema({
  model: { type: Schema.Types.ObjectId, ref: 'ItemModel', required: true },
  price: { type: Number, required: true },
  usageType: {
    type: String,
    default: '재고',
    enum: {
      values: ['대여', '지급', '재고'],
      message: 'usageType은 반드시 대여, 지급, 재고 중 하나여야 합니다.'
    }
  }
});
```

이제 이 컬렉션의 도큐먼트를 업데이트하는 코드를 보자. 몽구스에서 제공하는 빌트인 enum validator을 사용하기 위해서는 아래와 같이 `findByIdAndUpdate` 메서드의 세번째 인자에 `{runValidators: true}`옵션을 줘야 한다. 참고로 `{new: true}`는 유효성 검증과는 상관없으며 업데이트 된 후의 도큐먼트를 리턴하라는 옵션이다.

```js
const updatedItem = await Item.findByIdAndUpdate(
  req.params.id,
  { ...item },
  { new: true, runValidators: true }
);
```

위와 같이 코드를 작성하고 `usageType`을 다른 값으로 하여 업데이트를 요청하면 다음과 같은 에러 메시지가 응답으로 온다.

```json
{
  "status": "error",
  "message": "Validation failed: usageType: usageType은 반드시 대여, 지급, 재고 중 하나여야 합니다."
}
```
