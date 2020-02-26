---
title: NODEJS & 타입스크립트 개발환경 셋팅
date: '2019-12-09T11:46:37.121Z'
template: 'post'
draft: false
slug: '/category/nodejs/nodejs-typescript-setup'
category: 'nodejs'
tags:
  - 'typescript'
  - 'nodejs'
description: '타입스크립트로 nodejs 서버를 개발하기 위한 환경 셋팅하는 방법을 알아보자'
socialImage: '/media/image-2.jpg'
---

> **[유데미 TYPESCRIPT](https://www.udemy.com/course/understanding-typescript/learn/lecture/)** 수업을 듣고 정리한 내용입니다.

1. 프로젝트 폴더로 이동

2. `npm init`

3. `tsc --init`

4. `tsconfig.json` 파일 셋팅

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "moduleResolution": "Node",
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

**[타입스크립트 컴파일러](https://saegeullee.github.io/category/typescript/typescript-compiler)** 참고

5. src, dist 폴더 생성

6. 패키지 설치

```
npm i express body-parser
npm i --save-dev nodemon
```

nodejs express types 패키지 설치

```
 npm install --save-dev @types/node
 npm install --save-dev @types/express
```

7. app.ts 파일 생성<br>
   다음은 nodejs가 디폴트로 사용하는 commonjs 의 모듈 임포트 방법이다. 하지만 모듈을 이렇게 임포트하면 타입스크립트의 타입지원이 안된다. express에 마우스를 올려보면 `const express : any` 라고 뜬다.

```typescript
const express = require('express');
const app = express();
app.listen(3000);
```

타입스크립트의 타입지원을 받기 위해 웹브라우저 환경의 자바스크립트에서 모듈(es 모듈)을 임포트하듯이 하면 된다.

```typescript
import express from 'express';
const app = express();
app.listen(3000);
```

8. 커맨드라인에 다음 명령어를 입력하여 타입스크립트 워치모드 컴파일 실행

```
tsc -w
```

9. package.json start 스크립트 작성

```json
"scripts": {
  "start": "nodemon dist/app.js"
},
```

10. `npm start`로 서버 실행
