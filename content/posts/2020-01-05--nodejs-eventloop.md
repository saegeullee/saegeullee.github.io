---
title: Nodejs 이벤트루프
date: '2020-01-05T17:10:37.121Z'
template: 'post'
draft: true
slug: '/nodejs/nodejs-event-loop'
category: 'nodejs'
tags:
  - 'nodejs'
description: ' '
socialImage: '/media/image-2.jpg'
---

> **[NodeJS: Advanced Concepts](https://www.udemy.com/course/advanced-node-for-developers/)** 수업을 듣고 정리한 내용입니다.

## 이벤트루프 수도코드(pseudo code)

```js
// node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running
myFile.runContents();

function shouldContinue() {
  // Check one: Any pending setTimeout, setInterval, setImmediate?
  // Check two: Any pending OS tasks? (Like server listening to port)
  // Check three: Any pending long running operations? (Like fs module)

  return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

// Entire body executes in one 'tick'
while (shouldContinue()) {
  // 이벤트루프 while문 안의 코드가 실행되는 것을 tick이라고 부른다.
  // 1) Node looks at pendingTimers and sees if any functions(setTimeout, setInterval) are ready to be called
  // 2) Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks
  // 3) Pause execution. Continue when...
  // - a new pendingOSTask is done
  // - a new pendingOperation is done
  // - a timer is about to complete
  // 4) Look at pendingTimers. Call any setImmediate
  // 5) Handle any 'close' events
}

// exit back to terminal
```

`node myFile.js` 명령어를 통해 파일을 실행시키면 nodejs 이벤트루프가 즉시 실행된다. 이벤트루프 while문 안의 코드가 실행되는 것을 `tick`이라고 부른다. 즉 nodejs 어플리케이션에서 이벤트루프가 한번 실행되는 것을 한번의 `tick`이 실행되었다고 말한다.

위의 `shouldContinue`

## Common threadpool questions

1. Can we use the threadpool for javascript code or can only Nodejs functions use it?
   -> we can write custom JS that uses the thread pool

2. What functions in node std library use the threadpool?
   -> All 'fs' module functions. some crypto stuff. Depends on OS(windows vs unix based)

3. How does this threadpool stuff fit in eventloop?
   -> Tasks running in the threadpool are the 'pendingOperations' in our code.
