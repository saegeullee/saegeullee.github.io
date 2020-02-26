---
title: 미들웨어와 요청응답 싸이클
date: "2019-11-15T17:30:37.121Z"
template: "post"
draft: false
slug: "/nodejs/middleware-and-the-request-response-cycle"
category: "nodejs"
tags:
    - "nodejs"
description: "express app 이 클라이언트로부터 http request를 받으면 express app은 request와 response 객체를 만든다. 미들웨어는 주로 클라이언트에게 요청에 대한 유의미한 응답을 보내주기 위해 사용된다. 아래와같이 request object의 request body에 접근하기 위해서도 미들웨어를 사용한다..."
socialImage: "/media/image-2.jpg"
---

> **[유데미 NODE.JS](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)** 수업을 듣고 정리한 내용입니다.

# Middleware and the request response cycle

![nodejs](/media/request-response-cycle.png)

express app 이 클라이언트로부터 http request를 받으면 express app은 request와 response 객체를 만든다. 미들웨어는 주로 클라이언트에게 요청에 대한 유의미한 응답을 보내주기 위해 사용된다. 아래와같이 request object의 request body에 접근하기 위해서도 미들웨어를 사용한다.

```javascript
const app = express();
//MIDDLEWARE body-parser
app.use(express.json());
```

앱에서 사용하는 모든 미들웨어를 합해 미들웨어 스택이라고 부른다. 미들웨어 스택에서 사용되는 미들웨어의 순서는 실제 코드에서 미들웨어가 정의된 순서대로 진행된다. 따라서 Express에서 코드의 순서는 매우 중요하다.

최초에 생성된 request와 response 객체는 각 미들웨어를 통과하면서 필요한 코드들이 실행된다. 그리고 각 미들웨어의 끝 부분에서 `next()` 함수를 실행하면 미들웨어 스택의 다음 미들웨어가 실행된다. 이를 통해 request와 response 객체는 미들웨어 스택의 모든 미들웨어를 순서대로 거쳐간다.

마지막 미들웨어는 주로 라우트 핸들러가 되는데 여기서는 `next()`함수를 호출하지 않고 reponse 객체를 클라이언트에게 보내준다. 그러면 request response cycle이 종료된다.
