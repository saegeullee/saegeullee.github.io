---
title: Packages versioning and updating
date: "2019-11-10T22:20:37.121Z"
template: "post"
draft: true
slug: "/nodejs/packages-versioning-and-updating"
category: "nodejs"
tags:
    - "nodejs"
description: "nodejs packages version에 대한 정리"
socialImage: "/media/image-2.jpg"
---

> **[유데미 NODE.JS](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)** 수업을 듣고 정리한 내용입니다.

# Package version

`package.json` 파일에서 dependency가 아래와 같이 구성되었을 때 `1.3.4`는 slugify 패키지의 version을 의미한다. 맨 마지막 `.4`는 에러 업데이트를 의미한다.

```
  "dependencies": {
    "slugify": "^1.3.4"
  },
```
