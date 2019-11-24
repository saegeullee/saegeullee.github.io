---
title: 2nd group project review
date: "2019-11-24T21:16:37.121Z"
template: "post"
draft: false
slug: "/category/project/2nd-group-project-review"
category: "project"
tags:
    - "project"
description: "위코드 2차 그룹 프로젝트 후기"
socialImage: "/media/image-2.jpg"
---

> **[위코드](http://wecode.co.kr/)** 에서 진행한 2차 그룹프로젝트 후기입니다.

## 프로젝트 구성

2019년 11월 11일 ~ 2019년 11월 22일, 총 12일 동안 위코드에서 2차 그룹 프로젝트를 진행하였다. 우리팀은 프론트엔드 4명(리액트네이티브 앱 2명, 리액트 웹 2명), 백엔드 2명 총 6명으로 구성되었고 온라인 클래스 플랫폼 클래스 101을 클론하였다. 나는 백엔드를 맡았고 nodejs를 사용하여 restful api를 구현하였다. 우리 팀은 프론트엔드가 웹, 앱 2팀이 있었기 때문에 프론트엔드에서 클론 할 파트를 나누었다. 앱에서는 일반 사용자의 관점에서 개설된 클래스 목록을 보고 클래스 상세 페이지 보는 부분을 맡았고 웹에서는 크리에이터의 관점에서 클래스를 개설하는 부분을 맡았다. 나는 후자의 엔드포인트 구현을 맡았다.

## 내가 한것

-   모델 설계
-   클래스 Create, Update, Read, Delete
-   개설완료 또는 개설중인 클래스 목록보기
-   크리에이터 프로필 Create, Read, Update
-   일반 사용자 로그인, 회원가입
-   사용자 인증, 인가

![class101 models](/media/class101_models.png)
클래스101 모델 설계도

클래스 101 모델 설계를 하는데 3일정도 걸렸다. 나는 1차 프로젝트에서 백엔드 프레임워크 Django와 데이터베이스는 RDBMS인 Mysql을 사용하였다. 그동안 관계형 데이터베이스만 하다가 이번에 처음으로 Nosql인 MongoDB를 써봐서 개념이 굉장히 헷갈렸고 원리를 이해하는데 시간이 걸렸다.

이번에 공부한 RDBMS와 NOSQL의 차이점중 하나는 NOSQL에서는 `One to Many`와 `One to Few`를 구분한다는 것이다. RDBMS에서는 이를 구분하지 않고 모두 `One to Many`인 Foreignkey를 사용하여 관계를 표현한다. 하지만 NOSQL에서는 모델(컬렉션) 설계를 할 때 이를 염두에 둬야한다. `One to Few`같은 경우는 `One to Few`의 `One`에 `Few`를 Embed 시키면 되기 때문이다. 예를 들어 위의 클래스101 모델 설계도에서 Product(Product이 클래스이다) 컬렉션에는 Qna, Skill, Interview가 모두 Embed 되어 있다. 하나의 Product에는 각각 몇개의 Qna, Skill, Interview만 존재하기 때문에 Embed 시키더라도 Product Collection 하나의 Document가 비대해질 가능성이 없다.

## 프로젝트 총평

이번 프로젝트는 시원하게 실패했다고 말할 수 있다. 프로젝트 마지막날인 금요일날 시연에 별 볼게 없었기 때문이다. 프론트엔드에서 준비가 덜 되었고 백엔드에서도 제대로 데이터를 넘겨주지 못했다. 프로젝트가 실패한 이유는 백엔드에서 다음 4가지의 어려움이 있었기 때문이다.

1: 깃 리베이스 2: 몽고디비 모델 3:사진 데이터 하나 못넘겨준것 4. 사진 여러개

1. 깃 리베이스 실패<br>
   깃 리베이스에 실패하여 내가 푸쉬한 `feature/login_required` 브랜치의 코드 일부분이 날라갔다. 이 브랜치에서는 사용자 인가를 위해 사용자의 토큰의 유효성을 검사하는 `loginRequired` 핸들러를 구현했다. 리베이스 당시에는 성공을 한 줄 알았는데 나중에 알고 보니 코드의 핵심 부분인 service 코드가 날라갔다.. 물론 코드양이 별로 안되어 다행이었다.

2. 몽고디비<br>
   몽고디비와 관련하여 이상한 경험을 했고 아직도 미해결이다. 우리 프로젝트의 User 스키마에는 nickname이라는 필드가 있고 unique속성을 true로 줬다.
