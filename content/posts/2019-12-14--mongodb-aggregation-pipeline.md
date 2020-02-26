---
title: 몽고DB aggregation 파이프라인
date: '2019-12-14T23:00:37.121Z'
template: 'post'
draft: false
slug: '/nodejs/mongodb-aggregation-pipeline'
category: 'nodejs'
tags:
  - 'nodejs'
  - 'mongodb'
description: '몽고DB aggregation 파이프라인은 강력한 MongoDB 프레임워크로 데이터를 aggregate(종합)할 때 유용하게 쓰인다. 특정 컬렉션의 모든 도큐먼트를 어떤 파이프라인을 통과하게 만들어 종합(aggregate)된 결과를 만들 때 사용할 수 있다...'
socialImage: '/media/image-2.jpg'
---

> **[유데미 NODE.JS](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)** 수업을 듣고 정리한 내용입니다.

# 목차

- [몽고DB aggregation 파이프라인](#몽고db-aggregation-파이프라인)
- [Matching and Grouping](#matching-and-grouping)
- [Unwinding and Projecting](#unwinding-and-projecting)

## 몽고db aggregation 파이프라인

몽고DB aggregation 파이프라인은 강력한 MongoDB 프레임워크로 데이터를 aggregate(종합)할 때 유용하게 쓰인다. 특정 컬렉션의 모든 도큐먼트를 어떤 파이프라인을 통과하게 만들어 aggregate(종합)된 결과를 만들 때 사용할 수 있다. 예를들어 특정 컬렉션 모든 도큐먼트의 특정 프로퍼티의 평균을 구하거나 최소값, 최대값 등을 구할 수 있다.

**[몽고DB documentation pipeline stages](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)** 참고

## matching and grouping

파이프라인은 다음과 같이 구성한다. `Tour.aggregate` 메서드의 인자에 파이프라인 stage 객체를 배열로 넣는다. 그럼 `Tour` 컬렉션의 모든 도큐먼트가 파이프라인 stage를 순서대로 통과한다. 아래의 예시에서 첫번째 stage는 `$match`이다. 이는 Tour 컬렉션의 모든 도큐먼트 중에서 `ratingsAverage`가 4.5 이상인 도큐먼트만을 필터링한다.

```js
//controllers/tourControllers.js

exports.getTourStats = async (req, res) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        //make spell uppercase
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
};
```

우선 위의 코드를 실행하는 엔드포인트로 요청을 보냈을때의 응답 결과를 보면 다음과 같다. 두번째 stage인 `$group`을 보자. 이 stage는 프로퍼티가 많기 때문에 하나씩 나눠서 설명을 해보면 다음과 같다.<br>

1. `_id: { $toUpper: '$difficulty' }`<br>
   `_id`는 도큐먼트를 묶는 기준이 된다. Tour 스키마에서 `difficulty` 필드는 하단에 첨부해놓았다. `difficulty`는 enum 필드로 정의되어 반드시 `['easy', 'medium', 'difficult']` 이 셋중의 하나의 값을 가져야 한다. 즉 Tour 컬렉션의 모든 도큐먼트의 `difficulty` 필드는 이 셋 중 하나의 값을 가진다. 여기서는 이 필드를 기준으로 도큐먼트들을 나눠 총 3개의 그룹으로 만든것이다. `$toUpper` 은 `diffculty` 필드의 값을 대문자로 바꿔서 나타낸다. 아래의 결과를 보면 `EASY`, `DIFFICULT`, `MEDIUM` 으로 대문자로 변환되었다.

2. `numTours: { $sum: 1 }`<br>
   `numTours`는 해당 그룹의 도큐먼트가 몇 개인지를 나타낸다. aggregate 메서드가 동작하면서 도큐먼트들을 그룹으로 나눌때 해당 그룹의 도큐먼트가 하나씩 추가될 때 마다 1을 더하여 최종적으로 해당 그룹에 총 몇개의 도큐먼트가 있는지를 세는 것이다.
3. 그 외 `numRatings` ~ `maxPrice` <br>
   그 외의 프로퍼티는 이름에서 알 수 있듯이 해당 그룹의 평균값과 최댓값, 최솟값을 뽑아준다.

마지막 stage인 `$sort`에서는 결과물을 정렬하는 기준을 정할 수 있다. 아래의 결과물을 보면 `avgPrice`가 낮은 순으로 정렬된 것을 확인해 볼 수 있다. `avgPrice`를 높은 순으로 정렬하고 싶다면 -1을 값으로 주면 된다.

```js
{
    "status": "success",
    "data": {
        "stats": [
            {
                "_id": "EASY",
                "numTours": 4,
                "numRatings": 159,
                "avgRating": 4.675,
                "avgPrice": 1272,
                "minPrice": 397,
                "maxPrice": 1997
            },
            {
                "_id": "DIFFICULT",
                "numTours": 2,
                "numRatings": 41,
                "avgRating": 4.6,
                "avgPrice": 1997,
                "minPrice": 997,
                "maxPrice": 2997
            },
            {
                "_id": "MEDIUM",
                "numTours": 5,
                "numRatings": 126,
                "avgRating": 4.76,
                "avgPrice": 2197,
                "minPrice": 497,
                "maxPrice": 2997
            }
        ]
    }
}
```

```js
//Tour 스키마 중 difficulty 필드
difficulty: {
  type: String,
  required: [true, 'A tour must have a difficulty'],
  enum: {
    values: ['easy', 'medium', 'difficult'],
    message: 'Difficulty is either: easy, medium, difficult'
  }
},
```

`stage`는 반복하여 사용할 수 있다. 위의 aggregate 파이프라인에 다음의 stage를 네번째 stage로 추가하면 `_id`가 'EASY`인 그룹은 응답에서 제외된다.

```js
{
  $match: {
    _id: {
      $ne: 'EASY';
    }
  }
}
```

```js
{
    "status": "success",
    "data": {
        "stats": [
            {
                "_id": "DIFFICULT",
                "numTours": 2,
                "numRatings": 41,
                "avgRating": 4.6,
                "avgPrice": 1997,
                "minPrice": 997,
                "maxPrice": 2997
            },
            {
                "_id": "MEDIUM",
                "numTours": 5,
                "numRatings": 126,
                "avgRating": 4.76,
                "avgPrice": 2197,
                "minPrice": 497,
                "maxPrice": 2997
            }
        ]
    }
}
```

## unwinding and projecting

`$unwind`는 도큐먼트에서 배열을 값으로 가지고 있는 필드를 풀어 배열의 각 엘리먼트를 하나씩 가지고 있는 여러개의 도큐먼트로 만들어준다. 이건 결과를 보면 이해하기 수월하다. 하나의 도큐먼트를 쿼리한 결과가 다음과 같은 경우를 보자. `hobbies` 필드의 값은 배열로 이루어져 있다.

```
{
  "name" : "louies",
  "age: : 29,
  "hobbies" : ["soccer", "tennis", "programming"]
}
```

이때 이 도큐먼트를 mongodb aggregate 메서드에서 `$unwind` stage를 통과시키면 다음과 같이 배열 3개의 엘리먼트 각각을 가지고 있는 3개의 도큐먼트로 풀어낸 결과값을 얻을 수 있다. 이런 기능이 왜 필요한가 싶을 수 있지만 어플리케이션에 따라 매우 유용하게 사용할 수 있다.

```
{
  "name" : "louies",
  "age: : 29,
  "hobbies" : "soccer"
},
{
  "name" : "louies",
  "age: : 29,
  "hobbies" : "tennis"
},
{
  "name" : "louies",
  "age: : 29,
  "hobbies" : "programming"
}
```

이 수업에서는 투어 프로그램을 판매하는 플랫폼 서비스를 예시로 든다. `$unwind` 기능으로 플랫폼에 있는 모든 투어 프로그램을 종합하여 특정 년도에 가장 바쁜 달이 언제인지를 알아낼 수 있다. 우선 투어 도큐먼트를 살펴보자. 지면 제약상 설명에 꼭 필요한 필드만 넣었다.
이 투어 도큐먼트의 `startDates` 필드는 투어 프로그램의 시작 날짜들을 배열로 가지고 있다.

```js
{
"status": "success",
"results": 11,
"data": {
    "tours": [
        {
            "ratingsAverage": 4.7,
            "startDates": [
                "2021-03-23T01:00:00.000Z",
                "2021-10-25T01:00:00.000Z",
                "2022-01-30T01:00:00.000Z"
            ],
            "_id": "5dd1531c7bfcc407cb54f2ed",
            "name": "The Star Gazer 2",
            "price": 2997,
            "description": "Ut enim ad minim veniam"
        },
        ...
    ]
}
```

만약 수많은 투어 도큐먼트를 종합하여 특정 년도에 가장 많은 투어가 시작되는 달을 구하려면 어떻게 해야 할까? 결론부터 보자면 다음과 같이 `aggregate stage`를 구성하여 결과를 얻을 수 있다.

```js
exports.getMonthlyPlan = async (req, res) => {
  try {
    //어떤 년도의 가장 바쁜달을 구하고 싶은지를 받는다. ex) 2021
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      //투어 도큐먼트의 startDates 필드를 unwind한다.
      {
        $unwind: '$startDates'
      },
      // 2021년도에 시작하는 투어만 필터링한다.
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      // 같은 달에 시작하는 투어들을 그룹으로 묶는다.
      {
        $group: {
          _id: { $month: '$startDates' },
          // 한 그룹에 총 몇개의 투어가 있는지를 얻어온다.
          numTourStarts: { $sum: 1 },
          // 각 투어의 이름을 가진 배열을 얻어온다.
          tours: { $push: '$name' }
        }
      },
      //결과 값에 month라는 필드를 추가하여 해당 달을 표시한다.
      {
        $addFields: { month: '$_id' }
      },
      //바로 위에서 해당 달을 표시하기 위한 필드 month를 추가했기 때문에 _id는 결과에서 제외한다.
      {
        $project: {
          _id: 0
        }
      },
      // numTourStarts가 높은 순서대로 정렬하여 결과를 가져온다.
      {
        $sort: { numTourStarts: -1 }
      },
      // 한 년도에 1월~12월까지 12개의 달이 있으므로 결과값의 수는 12개로 제한한다.
      {
        $limit: 12
      }
    ]);
```

위의 컨트롤러 메서드에 보낸 요청에 대한 응답은 다음과 같이 구성된다. 아래의 결과를 보면 2021년 1월~12월중에 투어 프로그램이 4개가 시작하는 달인 3월과 10월이 가장 바쁜 달임을 알 수 있다.

```json
{
  "status": "success",
  "data": {
    "plan": [
      {
        "numTourStarts": 4,
        "tours": ["The City Wanderer", "The Star Gazer", "The Star Gazer 2", "The Star Gazer 3"],
        "month": 3
      },
      {
        "numTourStarts": 4,
        "tours": ["The Forest Hiker", "The Star Gazer", "The Star Gazer 2", "The Star Gazer 3"],
        "month": 10
      },
      {
        "numTourStarts": 3,
        "tours": ["The Forest Hiker", "The Sea Explorer", "The Sports Lover"],
        "month": 7
      },
      {
        "numTourStarts": 2,
        "tours": ["The Wine Taster", "The Sports Lover"],
        "month": 9
      },
      {
        "numTourStarts": 2,
        "tours": ["The Sea Explorer", "The Park Camper"],
        "month": 8
      },
      {
        "numTourStarts": 2,
        "tours": ["The Forest Hiker", "The Wine Taster"],
        "month": 4
      },
      {
        "numTourStarts": 2,
        "tours": ["The Sea Explorer", "The City Wanderer"],
        "month": 6
      },
      {
        "numTourStarts": 1,
        "tours": ["The Wine Taster"],
        "month": 2
      },
      {
        "numTourStarts": 1,
        "tours": ["The Northern Lights"],
        "month": 12
      },
      {
        "numTourStarts": 1,
        "tours": ["The City Wanderer"],
        "month": 5
      }
    ]
  }
}
```
