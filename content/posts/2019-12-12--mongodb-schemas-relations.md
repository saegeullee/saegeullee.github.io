---
title: MongoDB 스키마 유효성 검사
date: '2019-12-12T23:10:37.121Z'
template: 'post'
draft: false
slug: '/nodejs/mongodb-schema-and-relations'
category: 'mongodb'
tags:
  - 'mongodb'
description: '몽고DB는 특정 컬렉션에 도큐먼트를 넣을 때 유효성 검사를 거쳐 검사를 통과했을 때만 도큐먼트가 컬렉션에 입력되도록 할 수 있다. 컬렉션 유효성 검사 추가는 아래의 예시와 같이 데이터베이스에 컬렉션을 추가 할 때 할 수 있다...'
socialImage: '/media/image-2.jpg'
---

> **[유데미 몽고DB](https://www.udemy.com/course/mongodb-the-complete-developers-guide/)** 수업을 듣고 정리한 내용입니다.

## 스키마 유효성 검사

몽고DB는 특정 컬렉션에 도큐먼트를 넣을 때 유효성 검사를 거쳐 검사를 통과했을 때만 도큐먼트가 컬렉션에 입력되도록 할 수 있다. 컬렉션 유효성 검사 추가는 아래의 예시와 같이 데이터베이스에 컬렉션을 추가 할 때 할 수 있다.
아래의 예시 코드에서 `$jsonSchema`는 이 컬렉션의 유효성 검사를 하는 validator는 jsonSchema 라는 의미이다.<br>
몽고DB의 역사를 보면 다양한 validator들이 있었지만 현재는 jsonSchema를 validator로 사용할 것이 권장되고 있다.
required 에는 이 컬렉션에 추가되는 도큐먼트가 반드시 가지고 있어야 되는 프로퍼티들을 정의할 수 있다. 만약 추가되는 도큐먼트에 프로퍼티가 하나라도 없다면 컬렉션의 셋팅에 따라 에러 또는 경고(warning)을 발생시킬 수 있다.

```
> db.createCollection('posts', {
...   validator: {
...     $jsonSchema: {
...       bsonType: 'object',
...       required: ['title', 'text', 'creator', 'comments'],
...       properties: {
...         title: {
...           bsonType: 'string',
...           description: 'must be a string and is required'
...         },
...         text: {
...           bsonType: 'string',
...           description: 'must be a string and is required'
...         },
...         creator: {
...           bsonType: 'objectId',
...           description: 'must be an objectid and is required'
...         },
...         comments: {
...           bsonType: 'array',
...           description: 'must be an array and is required',
...           items: {
...             bsonType: 'object',
...             required: ['text', 'author'],
...             properties: {
...               text: {
...                 bsonType: 'string',
...                 description: 'must be a string and is required'
...               },
...               author: {
...                 bsonType: 'objectId',
...                 description: 'must be an objectid and is required'
...               }
...             }
...           }
...         }
...       }
...     }
...   }
... });
{ "ok" : 1 }

```

이제 posts 컬렉션의 유효성 검사를 하는 validator가 추가되었다. 이 컬렉션에 도큐먼트를 입력해보자. 위의 validator에서 정의한대로 도큐먼트를 입력하면 입력이 잘 된다.

```
db.posts.insertOne({
  title: 'my first blog post',
  text: 'excited to write this blog',
  tags: ['tech', 'js'],
  creator: ObjectId('5df26261c610a199922072f9'),
  comments: [{ text: 'very nice blog post', author: ObjectId('5df26261c610a199922072f9') }]
});
{
	"acknowledged" : true,
	"insertedId" : ObjectId("5df262dac610a199922072fa")
}

```

하지만 validator에서 정의한대로 도큐먼트를 입력하지 않으면 다음과 같이 에러가 발생한다. 아래의 예시에서는 validator에서 정의한대로 comments의 author에 ObjectId 타입의 데이터를 넣지 않고 임의의 숫자를 넣었다.

```
db.posts.insertOne({
  title: 'my first blog post',
  text: 'excited to write this blog',
  tags: ['tech', 'js'],
  creator: ObjectId('5df26261c610a199922072f9'),
  comments: [{ text: 'very nice blog post', author: 123123}]
});

2019-12-13T00:55:15.835+0900 E QUERY    [thread1] WriteError: Document failed validation :
WriteError({
	"index" : 0,
	"code" : 121,
	"errmsg" : "Document failed validation",
	"op" : {
		"_id" : ObjectId("5df262e3c610a199922072fb"),
		"title" : "my first blog post",
		"text" : "excited to write this blog",
		"tags" : [
			"tech",
			"js"
		],
		"creator" : ObjectId("5df26261c610a199922072f9"),
		"comments" : [
			{
				"text" : "very nice blog post",
				"author" : 123123
			}
		]
	}
})
WriteError@src/mongo/shell/bulk_api.js:466:48
Bulk/mergeBatchResults@src/mongo/shell/bulk_api.js:846:49
Bulk/executeBatch@src/mongo/shell/bulk_api.js:910:13
Bulk/this.execute@src/mongo/shell/bulk_api.js:1154:21
DBCollection.prototype.insertOne@src/mongo/shell/crud_api.js:252:9
@(shell):1:1
```

## validate 액션 변경하기

위의 스키마 유효성 검사를 통해 validator에서 정의한대로 도큐먼트가 컬렉션에 입력되지 않으면 에러가 발생했고 해당 도큐먼트는 데이터베이스에 입력이 되지 않았다. 하지만 에러를 발생시키는 대신에 경고만 할 수도 있다. 즉, 유효성 검사 레벨을 에러에서 경고로 낮출 수 있다. 이를 위해 다음과 같이 validator의 설정을 바꿔야 한다. `collMod` 는 `Collection Modifier`을 뜻한다. 이 코드에서는 디폴트 유효성 검사 레벨인 `validationAction: 'error'` 을 `validationAction: 'warn'`로 바꿨다.

```
db.runCommand({
  collMod: 'posts',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'text', 'creator', 'comments'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        text: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        creator: {
          bsonType: 'objectId',
          description: 'must be an objectid and is required'
        },
        comments: {
          bsonType: 'array',
          description: 'must be an array and is required',
          items: {
            bsonType: 'object',
            required: ['text', 'author'],
            properties: {
              text: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              author: {
                bsonType: 'objectId',
                description: 'must be an objectid and is required'
              }
            }
          }
        }
      }
    }
  },
  validationAction: 'warn'
});
{ "ok" : 1 }

```

이제 validator의 정의와 다른 도큐먼트를 입력해보면 위에서 에러가 발생한 것과는 다르게 입력이 성공했다. 그리고 시스템의 로그 기록에 warning 을 남긴다.

```
db.posts.insertOne({
  title: 'my first blog post',
  text: 'excited to write this blog',
  tags: ['tech', 'js'],
  creator: ObjectId('5df26261c610a199922072f9'),
  comments: [{ text: 'very nice blog post', author: 123123}]
});
{
	"acknowledged" : true,
	"insertedId" : ObjectId("5df26967c610a199922072fc")
}
```
