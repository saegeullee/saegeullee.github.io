---
title: 1차 그룹 프로젝트 후기
date: '2019-11-09T16:16:37.121Z'
template: 'post'
draft: false
slug: '/category/project/1st-group-project-review'
category: 'project'
tags:
  - 'project'
description: '2019년 10월 28일~ 2019년 11월 8일, 총 12일 동안 코딩부트캠프 위코드에서 1차 그룹 프로젝트를 진행하였다. 우리 팀은 프론트엔드 3명, 백엔드 2명 총 5명으로 구성되었고 음식배달 서비스인 요기요를 클론했다. 팀명은 요기용이다. 나는 프론트엔드 50%, 백엔드 50%의 역할을 맡았다...'
socialImage: '/media/image-2.jpg'
---

> **[위코드 코딩부트캠프](http://wecode.co.kr/)** 에서 진행한 1차 그룹프로젝트 후기입니다.

## 프로젝트 구성

2019년 10월 28일~ 2019년 11월 8일, 총 12일 동안 코딩부트캠프 위코드에서 1차 그룹 프로젝트를 진행하였다. 우리 팀은 프론트엔드 3명, 백엔드 2명 총 5명으로 구성되었고 음식배달 서비스인 요기요를 클론했다. 팀명은 요기용이다. 나는 프론트엔드 50%, 백엔드 50%의 역할을 맡았다. 2주차 화요일까지 백엔드를 개발했고 2주차 수~금 3일동안은 프론트엔드 개발을 도왔다. 백엔드는 django를 사용하여 restful api를 구현하였으며 프론트엔드는 react를 사용하여 구현했다.

**[요기용 백엔드 github repository](https://github.com/saegeullee/yogiyong-backend)**<br>
**[요기용 프론트엔드 github repository](https://github.com/saegeullee/yogiyong-frontend)**

## 프로젝트 목표

- 웹 시스템 개발
- git과 github을 활용한 팀으로서의 협업

## 내가 한것

우선 내가 이 프로젝트에 기여 한 부분을 목록으로 정리해보았다.

### 백엔드

- 모델 설계
- 레스토랑 관련 models 구현
- 레스토랑 view(HomeView) 구현(모든 식당 카테고리 정보(카테고리 이름, id) 보내주기)
- 레스토랑 view(CategoryView) 구현(식당 카테고리별 식당 목록 보여주기, 정렬 및 페이징 포함)
- 레스토랑 view(RestaurantView) 구현(하나의 식당에 대한 정보와 음식 메뉴 목록 보여주기)
- 레스토랑 view(RestaurantSearchView) 구현(식당 검색기능, 페이징 포함)
- 요기요 크롤링 구현 및 DB 구축

### 프론트엔드

- 구글 지도에 현재 가게 목록의 가게 위치 보여주기
- 주문 완료시 나오는 땡큐페이지
- 사용자의 주문 내역 페이지
- 음식 장바구니 추가 및 주문 로직 리덕스로 구현
- 장바구니 리셋 기능

![yogiyong models](/media/yogiyong_erd.png)

요기용의 모델 관계도

## 프로젝트 진행 방법

우리팀은 프로젝트 첫날 스크럼 회의를 통해 1주차 스프린트에서 구현해야할 내용들을 정리했고 매일 스크럼 회의에서 어제 한 일, 오늘 할 일, 어려웠던 점(blocker) 등을 공유했다. 아래의 이미지 처럼 trello 라는 툴을 활용하여 프로젝트 진행사항을 한 눈에 보기 쉽게 구성하였고 매일 개발해야 할 것들을 개발했다.<br><br>
git과 github을 활용하여 협업을 하였고 백엔드와 프론트엔드 각각 프로젝트 셋팅을 담당한 팀원이 `django-admin startproject`와 `CRA`를 통해 프로젝트를 생성 및 셋팅 후 우리 팀 github repo 마스터 브랜치에 푸쉬했다. 이후 해당 프로젝트를 clone 하여 로컬에서 받아온 후 각각의 기능별로 브랜치를 따서 개발 완료 후 git push 및 git pull request를 보냈다. 마스터 브랜치에 머지 권한을 가지고 있는 위코드의 멘토님들이 각 브랜치를 검토후 이상이 없다면 마스터 브랜치에 병합을 해주셨고 수정 사항이 필요하다면 리뷰를 남겨주셨다. 피드백에 따라 해당 기능을 수정후 다시 푸쉬하였고 병합이 될때까지 이를 반복하였다.

![trello](/media/trello.jpg)
진행과정 정리
