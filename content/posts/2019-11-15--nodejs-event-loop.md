---
title: How requiring modules really works
date: "2019-11-15T16:00:37.121Z"
template: "post"
draft: true
slug: "/nodejs/how-requiring-modules-really-works"
category: "nodejs"
tags:
    - "nodejs"
description: "nodejs에 대한 정리"
socialImage: "/media/image-2.jpg"
---

> **[유데미 NODE.JS](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)** 수업을 듣고 정리한 내용입니다.

# nodejs module system

-   Each javascript file is treated as a separate modules
-   Node.js uses the CommonJS module system: require(), exports or module.exports
-   ES module system is used in browsers: import/export
-   There have been attempts to bring ES modules to node.js

## CommonJS

commonjs란 웹브라우저 밖에서 일관된 자바스크립트 모듈 생태계 구축을 위한 프로젝트이다.
