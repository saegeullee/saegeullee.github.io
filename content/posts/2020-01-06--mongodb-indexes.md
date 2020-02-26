---
title: MongoDB 인덱싱
date: '2020-01-05T22:50:37.121Z'
template: 'post'
draft: false
slug: '/mongodb/mongodb-indexes'
category: 'mongodb'
tags:
  - 'mongodb'
description: 'mongoDB explain 메서드 : 몽고쉘에서 다음 명령을 통해 몽고DB가 특정 쿼리를 어떻게 수행할 것인지에 대한 계획을 살펴볼 수 있다...'
socialImage: '/media/image-2.jpg'
---

> **[유데미 몽고DB](https://www.udemy.com/course/mongodb-the-complete-developers-guide/)** 수업을 듣고 정리한 내용입니다.

# 목차

- [mongoDB explain 메서드](#mongodb-explain-메서드)
- [인덱스-추가하기](#인덱스-추가하기)

## mongoDB explain 메서드

몽고쉘에서 다음 명령을 통해 몽고DB가 특정 쿼리를 어떻게 수행할 것인지에 대한 계획을 살펴볼 수 있다. `winningPlan`을 보면 stage 프로퍼티가 `COLLSCAN`으로 몽고DB가 해당 쿼리를 수행할 때 contacts 컬렉션의 모든 데이터를 한번씩 다 보고 `dob.age`가 60 초과인 도큐먼트만 쿼리했음을 알 수 있다.

```mongo
> db.contacts.explain().find({"dob.age": {$gt:60}})
{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "contactsData.contacts",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"dob.age" : {
				"$gt" : 60
			}
		},
		"winningPlan" : {
			"stage" : "COLLSCAN",
			"filter" : {
				"dob.age" : {
					"$gt" : 60
				}
			},
			"direction" : "forward"
		},
		"rejectedPlans" : [ ]
	},
	"serverInfo" : {
		"host" : "saegeullee-notebook",
		"port" : 27017,
		"version" : "3.6.3",
		"gitVersion" : "9586e557d54ef70f9ca4b43c26892cd55257e1a5"
	},
	"ok" : 1
}
```

다음 명령을 통해 더 상세한 정보를 확인할 수 있다. `executionStats`를 보면 이 쿼리를 수행하는데 11밀리초가 걸렸고 해당 조건에 부합하는 1222개의 도큐먼트를 쿼리하기 위해 총 5000개의 도큐먼트를 살펴본 것을(examined) 확인할 수 있다.

```
>db.contacts.explain("executionStats").find({"dob.age": {$gt:60}})
{
  생략...
	"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 1222,
		"executionTimeMillis" : 11,
		"totalKeysExamined" : 0,
		"totalDocsExamined" : 5000,
		"executionStages" : {
			"stage" : "COLLSCAN",
			"filter" : {
				"dob.age" : {
					"$gt" : 60
				}
			},
			"nReturned" : 1222,
			"executionTimeMillisEstimate" : 10,
			"works" : 5002,
			"advanced" : 1222,
			"needTime" : 3779,
			"needYield" : 0,
			"saveState" : 39,
			"restoreState" : 39,
			"isEOF" : 1,
			"invalidates" : 0,
			"direction" : "forward",
			"docsExamined" : 5000
		}
	},
	"serverInfo" : {
		"host" : "saegeullee-notebook",
		"port" : 27017,
		"version" : "3.6.3",
		"gitVersion" : "9586e557d54ef70f9ca4b43c26892cd55257e1a5"
	},
	"ok" : 1
}
```

## 인덱스 추가하기

다음 명령을 통해 mongoDB가 사용할 수 있는 인덱스를 추가할 수 있다. 컬렉션 스키마의 최상위 프로퍼티 뿐만 아니라 특정 프로퍼티에 embeded된 프로퍼티를 인덱스로 지정할 수도 있다. `dob.age` 프로퍼티의 값을 1로 지정함으로써 오름차순으로 인덱스를 생성할 수 있다. -1을 값으로 주면 내림차순으로 생성된다. 몽고DB는 양방향으로 lookup을 할 수 있기 때문에 인덱스를 오름차순, 내림차순을 지정하는 것은 쿼리 퍼포먼스에 영향을 주지 않는다.

```
> db.contacts.createIndex({"dob.age": 1})
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}
```

이제 다시 `executionStats`를 확인해보면 다음과 같다. 쿼리 시간이 2 밀리초로 단축된 것을 확인 할 수 있다. 그리고 execution stage가 두 개가 수행된 것을 확인 할 수 있다. 첫번째인 inputStage는 `IXSCAN`으로 인덱스 스캔이다. 이 stage를 통해 1222개의 인덱스 키와 각 인덱스 키의 도큐먼트를 가리키고 있는 포인터(주소)를 리턴했다. 1222개의 실제 도큐먼트를 리턴하는 것은 그 다음 stage인 `FETCH`에서 수행된다. 또한, `totalDocsExamined` 를 확인해보면 1222개의 도큐먼트를 리턴하기 위해 정확히 이에 해당하는 1222개의 도큐먼트만을 살펴본 것을 알 수 있다.

```
> db.contacts.explain("executionStats").find({"dob.age": {$gt:60}})
{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "contactsData.contacts",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"dob.age" : {
				"$gt" : 60
			}
		},
		"winningPlan" : {
			"stage" : "FETCH",
			"inputStage" : {
				"stage" : "IXSCAN",
				"keyPattern" : {
					"dob.age" : 1
				},
				//...
				}
			}
		},
		"rejectedPlans" : [ ]
	},
	"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 1222,
		"executionTimeMillis" : 2,
		"totalKeysExamined" : 1222,
		"totalDocsExamined" : 1222,
		"executionStages" : {
			"stage" : "FETCH",
			"nReturned" : 1222,
			"executionTimeMillisEstimate" : 0,
			"works" : 1223,
			"advanced" : 1222,
			"needTime" : 0,
			"needYield" : 0,
			"saveState" : 9,
			"restoreState" : 9,
			"isEOF" : 1,
			"invalidates" : 0,
			"docsExamined" : 1222,
			"alreadyHasObj" : 0,
			"inputStage" : {
				"stage" : "IXSCAN",
				"nReturned" : 1222,
				"executionTimeMillisEstimate" : 0,
				"works" : 1223,
				"advanced" : 1222,
				"needTime" : 0,
				"needYield" : 0,
				"saveState" : 9,
				"restoreState" : 9,
				"isEOF" : 1,
				"invalidates" : 0,
				"keyPattern" : {
					"dob.age" : 1
				//...
	"ok" : 1
}

```
