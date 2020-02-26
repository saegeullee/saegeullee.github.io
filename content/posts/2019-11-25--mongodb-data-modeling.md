---
title: MongoDB 데이터 모델링
date: "2019-11-25T13:10:37.121Z"
template: "post"
draft: false
slug: "/nodejs/mongodb-data-modeling"
category: "mongodb"
tags:
    - "mongodb"
description: "mongodb 데이터 모델링 정리 : mongodb에서 모델링을 할 때 referencing 과 embedding 의 차이는 무엇일까? 그리고 언제 이를 사용해야 할까? 모델링을 하는 방법에 대해 알아보자"
socialImage: "/media/image-2.jpg"
---

> **[유데미 NODE.JS](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)** 수업을 듣고 정리한 내용입니다.

# Referencing vs Embedding

## Referenced / Normalized

아래의 예시는 movie 도큐멘트에서 actor의 reference 를 가지고 있다. 이렇게 하나의 도큐먼트에서 다른 도큐먼트의 id를 가지고 있는 것을 `referencing` 이라고 한다.

-   장점 : 도큐먼트 각각을 쿼리하기 용이하다.
-   단점 : referenced된 도큐먼트(아래의 예시에서는 actor)에서 데이터를 가져오기 위해 2번의 쿼리가 필요하다.

```javascript
//movie
{
    "_id": ObjectID("222");
    "title": "Interstellar",
    "releaseYear" : 2014,
    "actors" : [
        ObjectID("555"),
        ObjectID("777")
    ]
}
```

```javascript
//actor
{
    "_id": ObjectID("555"),
    "name": "Lee louies",
    "age": 28,
    "born": "Seoul, Korea"
}
{
    "_id": ObjectID("777"),
    "name": "Lee Jina",
    "age": 27,
    "born": "Seoul, Korea"
}
```

## Embedded / denormalized

반면에 아래와 같이 하나의 도큐먼트에 다른 도큐먼트가 통째로 들어있는 것을 `Embedded`라고 한다.

-   장점 : 한번의 쿼리를 통해 필요한 모든 정보를 가져올 수 있다.
-   단점 : embedded된 도큐먼트만을 쿼리하는 것이 불가능하다.

```javascript
//movie
{
    "_id": ObjectID("222");
    "title": "Interstellar",
    "releaseYear" : 2014,
    "actors" : [
        {
            "_id": ObjectID("555"),
            "name": "Lee louies",
            "age": 28,
            "born": "Seoul, Korea"
        },
        {
            "_id": ObjectID("777"),
            "name": "Lee Jina",
            "age": 27,
            "born": "Seoul, Korea"
        }
    ]
}

```

## Embed, Reference 중 무엇을 사용해야 할까

데이터 모델링시 Embed를 할지, Reference 할지를 결정할 때는 다음 세가지를 모두 고려하여 결정해야 한다.

1. Relationship type(How two datasets are related to each other)<br>
   `Embedding` - 1:FEW, 1:MANY<br>
   `Referencing` - 1:MANY, 1:TON, MANY:MANY
2. Data access patterns(How often data is read and written. read/write ratio)
   `Embedding`

    - Data is mostly read
    - Data does not change quickly
    - High read/write ratio

    `Referencing`

    - Data is updated a lot
    - Low read/write ratio

3. Data closeness(How "much" the data is related, how we want to query)
   `Embedding`

    - Datasets really belong together

    `Referencing`

    - We frequently need to query both datasets on their own

## Referencing의 종류

### child referencing

-   부모 도큐먼트에서 자식의 reference 를 가지고 있다.
-   모델 관계가 1:FEW 일 때 사용

```javascript
//app
{
    "_id" : ObjectID("23),
    "app" : "My Movie Database",
    "logs" : [
        ObjectID("1"),
        ObjectID("2"),
        //... millions of ObjectID
        ObjectID("287823781")
    ]
}

//log
{
    "_id" : ObjectID("1"),
    "type" : "error",
    "timestamp" : 1412184926
}

{
    "_id" : ObjectID("287823781"),
    "type" : "error",
    "timestamp" : 1412184992
}
```

### parent referencing

-   자식의 도큐먼트에서 부모의 reference를 가지고 있음
-   모델 관계가 1:MANY, 1:TON 일때 사용

```javascript
//app
{
    "_id": ObjectID('23'),
    "app": "My Movie Database"
}

//log
{
    "_id": ObjectID("1"),
    "app": ObjectID("23),
    "type": "error",
    "timestamp" : 1412184926
}

{
    "_id": ObjectID("287823781"),
    "app": ObjectID("23),
    "type": "error",
    "timestamp" : 1412184992
}
```

### two way referencing

-   서로의 도큐먼트에서 서로의 reference를 가지고 있음
-   모델 관계가 MANY:MANY 일때 사용

```javascript
//movie
{
    "_id": ObjectID("23");
    "title": "Interstellar",
    "releaseYear" : 2014,
    "actors" : [
        ObjectID("67"),
        //... and many more
    ]
}

//actor
{
    "_id": ObjectID("67"),
    "name": "Lee louies",
    "age": 28,
    "movies": [
        ObjectID("23")
    ]
}
```

## Summary

-   The most important principle is: Structure your data to match the ways that your application queries and udpateds data.
-   In other words: Identify the questions that arise from your application's use cases first, and then model your data so that the questions can get answered in the most efficient way.
-   In general, always favor embedding, unless there is a good reason not to embeded. Especially on 1:FEW and 1:MANY relationships.
-   A 1:TON or a MANY:MANY relationship is usually a good reason to reference instead of embedding.
-   Also, favor referencing when data is updated a lot and if you need to frequently access a dataset on its own.
-   Use embedding when data is mostly read but rarely updated, and when two datasets belong intrinsically together.
-   Don't allow arrays to grow indefinitely. Therefore, if you need to normalize, use child referencing for 1:MANY relationships, and parent referencing for 1:TON relationships.
-   Use two-way referencing for MANY:MANY relationships.
