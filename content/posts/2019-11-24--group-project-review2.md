---
title: 2차 그룹 프로젝트 후기
date: "2019-11-24T21:16:37.121Z"
template: "post"
draft: false
slug: "/category/project/2nd-group-project-review"
category: "project"
tags:
    - "project"
description: "2019년 11월 11일 ~ 2019년 11월 22일, 총 12일 동안 위코드에서 2차 그룹 프로젝트를 진행하였다. 우리팀은 프론트엔드 4명(리액트네이티브 2명, 리액트 2명), 백엔드 2명 총 6명으로 구성되었고 온라인 클래스 플랫폼 클래스 101을 클론하였다..."
socialImage: "/media/image-2.jpg"
---

> **[위코드](http://wecode.co.kr/)** 에서 진행한 2차 그룹프로젝트 후기입니다.

## 프로젝트 구성

2019년 11월 11일 ~ 2019년 11월 22일, 총 12일 동안 위코드에서 2차 그룹 프로젝트를 진행하였다. 우리팀은 프론트엔드 4명(리액트네이티브 2명, 리액트 2명), 백엔드 2명 총 6명으로 구성되었고 온라인 클래스 플랫폼 클래스 101을 클론하였다. 나는 백엔드를 맡았고 nodejs를 사용하여 restful api를 구현하였다. 우리 팀은 프론트엔드가 웹, 앱 2팀이 있었기 때문에 프론트엔드에서 클론 할 파트를 나누었다. 앱에서는 일반 사용자의 관점에서 개설된 클래스 목록을 보고 클래스 상세 페이지 보는 부분을 맡았고 웹에서는 크리에이터의 관점에서 클래스를 개설하는 부분을 맡았다. 나는 후자의 엔드포인트 구현을 맡았다.

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

`parent referencing` - 자식이 부모의 reference를 가지고 있는 것
`child referencing` - 부모가 자식의 reference를 가지고 있는 것

## 프로젝트 총평

이번 프로젝트는 시원하게 실패했다고 말할 수 있다. 프로젝트 마지막날인 금요일날 시연에 별 볼게 없었기 때문이다. 프론트엔드에서 준비가 덜 되었고 백엔드에서도 제대로 데이터를 넘겨주지 못했다. 프로젝트가 실패한 이유는 다음 5가지의 어려움이 있었기 때문이다.

1. 깃 리베이스 실패<br>
   깃 리베이스에 실패하여 내가 푸쉬한 `feature/login_required` 브랜치의 코드 일부분이 날라갔다. 이 브랜치에서는 사용자 인가를 위해 사용자의 토큰의 유효성을 검사하는 `loginRequired` 핸들러를 구현했다. 리베이스 당시에는 성공을 한 줄 알았는데 나중에 알고 보니 코드의 핵심 부분인 service 코드가 날라갔다.. 물론 코드양이 별로 안되어 다행이었다.
   <br>실패 경위는 다음과 같다. 최초에 이 브랜치를 push 하고 pr을 했는데 멘토님에게 충돌을 해결하라고 답변이 왔다. 충돌을 해결하기 위해 이 브랜치에서 `git pull origin master`를 한 것이 문제였다. 처음에는 충돌되는 부분을 확인하기 위해 origin 마스터의 코드를 이 브랜치로 가져왔다. 충돌을 해결하고 보니 나의 커밋들이 다른 팀원의 커밋들과 섞여있어 리베이스를 어떻게 진행해야 할지 감이 안왔다. 위코드 멘토님에게 이 문제를 말씀드렸고 local master에서 다시 `git pull origin master`를 하여 최신화를 하고 그 뒤에 `feature/login_required`브랜치 리베이스를 진행하였다. 리베이스 당시에는 성공을 한 줄 알았는데 나중에 보니 service 코드가 사라져있었다. 애초에 feature 브랜치에서 `git pull origin master`를 하면 안되는 것이었다. 충돌 부분을 해결하기 위해서는 먼저 마스터 브랜치로 체크아웃을하고 마스터를 최신화 한 뒤 해당 브랜치 리베이스를 진행했으면 자연스럽게 충돌나는 부분을 해결할 수 있었을 것이다.

2. 몽고디비 필드 중복 에러<br>
   몽고디비와 관련하여 이상한 경험을 했고 아직 미해결이다. 우리 프로젝트의 User 스키마에는 nickname이라는 필드가 있고 unique속성을 true로 줬다. 사용자가 회원가입을 할때는 nickname필드를 채우지 않기 때문에 이 필드는 당연히 null로 저장이 된다. 두번째 사용자가 회원가입을 할때도 nickname필드는 null 이 되고 이 필드의 unique속성이 true이기 때문에 nickname필드가 null 로 중복되어 몽고디비가 에러를 발생시킨다. 에러를 해결하기 위해 User 스키마에서 unique속성을 true로 준 부분을 지우고 다시 서버 실행을 시켰지만 다음 사용자 회원가입을 시킬때 nickname필드 중복 에러는 계속 발생하였다.

3. 클래스 커버 이미지를 클라이언트에 보내주지 못했다.<br>
   클래스 101의 클래스 개설과정의 2번째 단계에서 클래스의 커버 이미지를 저장한다. 서버에서는 클라이언트의 File 저장 Post 요청을받아 해당 이미지 파일을 서버의 하드웨어에 저장한다. 저장까지는 잘 되었지만 나중에 클라이언트가 Get 요청을 보냈을때 사진 데이터를 잘 보내주지 못했다. 나는 백엔드 개발 과정에서 Postman을 사용하여 Integration 테스트를 진행하였다. Postman을 사용했을 때는 커버 이미지 데이터도 응답으로 잘 보내주었지만 실제 클라이언트가 기능 개발을 완료하고 맞춰보았을 때는 커버 이미지 데이터가 null이었다. 프로젝트 시연에 임박해서 클라이언트와 서버를 붙여보아서 시연전에 에러를 해결할 수 없었다.

4. 클래스 개설의 마지막 단계인 사진 여러개 저장을 구현해보지 못했다.<br>
   클래스 101의 클래스 개설 마지막 단계에서는 크리에이터 인터뷰란을 채우는 과정이 있다. 질문, 답변, 이미지를 하나의 세트로 여러개의 인터뷰 시나리오를 작성할 수 있다. 이때 클라이언트에서 해당 데이터를 `state`에 다음과 같이 담아 둘 것이다.

```javascript
state = {
    interviews : [
        {
            question: "question 1",
            answer: "answer 1",
            imageFile : imageFile1
        },
            {
            question: "question 2",
            answer: "answer 2",
            imageFile : imageFile2
        }
        ...
    ]
}
```

Postman을 통해 이미지 파일만 여러개가 한번의 요청에 들어오는 경우에는 저장에 성공했지만 위와 같이 하나의 인터뷰 객체에 question, answer와 함께 이미지 파일이 들어있는 정석적?인 방법으로 요청이 들어왔을 때를 Postman으로 미리 테스트해 볼 수 없었다.

5. 잘못된 모델 설계<br>
   위의 클래스 101모델 설계도 부분에서 나는 Product 도큐먼트에 Qna, Skill, Interview를 Embed 시켰지만 이건 잘못되었다. 클래스 101의 특성상 클래스 개설과 한번 개설한 클래스를 업데이트 할 일이 자주 있을 것이다. 업데이트가 자주 필요한 도큐먼트를 Embed시키면 실제로 업데이트를 하기가 굉장히 까다롭다. 이건 내가 클래스 개설 부분 엔드포인트를 맡아 실제 코드를 짜면서 보니 설계가 잘못되었다는 생각이 들었다. Product 도큐먼트에 Embed시킨 Interview 도큐먼트를 업데이트하기 위해 Product 도큐먼트를 한번 접근한 뒤 Interview를 찾아 업데이트 해야 한다. 더욱이 Interview는 3개 이상의 도큐먼트가 배열로 관리 되기 때문에 만약 2번째 Interview만 업데이트 되었다면 다시 해당 배열에서 2번째 Interview를 찾아 업데이트 해야한다. 이렇게 되면 코드가 굉장히 복잡해지게 되고 어려워진다. 애초에 모델 설계시 Interview를 Product 도큐먼트에서 reference로 가지고 있었다면 코드를 짜기 더 쉬웠을 것이다.