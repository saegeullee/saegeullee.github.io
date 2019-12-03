---
title: 에러 핸들링 미들웨어
date: "2019-11-16T12:00:37.121Z"
template: "post"
draft: false
slug: "/nodejs/error-handling-middleware"
category: "nodejs"
tags:
    - "nodejs"
description: "어플리케이션에서 발생할 수 있는 에러의 종류를 2가지로 나눠 생각해볼 수 있다. operational errors 와 programming errors이다. 전자는 시스템 운영상에 발생하는 에러로 프로그래머가 미리 예측할 수 있고 이에 대비해야 한다. 반면에 후자는 프로그래머가 잘못된 코드를 작성해서 발생하는 에러이다..."
socialImage: "/media/image-2.jpg"
---

> **[유데미 NODE.JS](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)** 수업을 듣고 정리한 내용입니다.

# error handling middleware

어플리케이션에서 발생할 수 있는 에러의 종류를 2가지로 나눠 생각해볼 수 있다. `operational errors` 와 `programming errors`이다. 전자는 시스템 운영상에 발생하는 에러로 프로그래머가 미리 예측할 수 있고 이에 대비해야 한다. 반면에 후자는 프로그래머가 잘못된 코드를 작성해서 발생하는 에러이다.

## operational errors

-   Invalid path accessed
-   Invalid user input(validator error from mongoose)
-   Failed to connect to server
-   Failed to connect to database
-   Request timeout
-   etc..

## programming errors

-   reading properties on undefined
-   passing a number where an object is expected
-   using await without async
-   using req.query instead of req.body
-   etc..

다양한 `operational errors`에 대응하기 위해 `global error handling middleware`를 만드는 것이 좋다. 이를 통해 하나의 미들웨어에서 발생 가능한 모든 에러에 대응 할 수 있고 앱의 다른 부분인 비즈니스 로직이나 컨트롤러 코드에서는 에러에 대해 신경쓰지 않아도 된다.

# global error handling middleware

먼저 클라이언트에서 잘못된 엔드포인트를 호출했을 때를 대응하는 방법을 알아보자.

```javascript
//app.js

//정상적인 엔드포인트
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//잘못된 모든 엔드포인트 호출에 대한 대응
app.all("*", (req, res, next) => {
    //에러 메시지 생성
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status = "fail";
    err.statusCode = 404;
    next(err);
});
```

미들웨어에서 `next()`를 호출하면 미들웨어 스택의 다음 미들웨어가 실행된다. 하지만 해당 미들웨어에 next() 메서드의 인자로 에러 객체를 넣으면 Express 앱은 자동으로 에러가 발생하였음을 인지한다. 이는 미들웨어의 모든 next() 메서드에 동일하게 적용이 된다. Express가 에러가 발생했음을 인지하면 미들웨어 스택의 모든 미들웨어를 건너뛰고 `global error handling middleware`에게 에러를 전달한다.

```javascript
//global error handling middleware
app.use((err, req, res, next) => {
    //500 -> internal server error
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});
```

보통의 미들웨어에는 3개의 인자 `req, res, next`를 전달하지만 에러 핸들링 미들웨어에는 4개의 인자(`err, req, res, next)`를 전달한다. 이를 통해 Express 앱은 자동으로 이 미들웨어가 에러 핸들링 미들웨어임을 알아차린다. 그리고 이 미들웨어에서 해당 에러를 처리하여 클라이언트에게 어떤 에러가 발생하였음을 알려주는 response를 보내준다.
