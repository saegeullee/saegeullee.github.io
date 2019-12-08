---
title: 타입스크립트 컴파일러
date: "2019-12-07T12:46:37.121Z"
template: "post"
draft: false
slug: "/category/typescript/typescript-compiler"
category: "typescript"
tags:
  - "typescript"
description: "타입스크립트로 개발을 할 때 결과물을 확인하기 위해 타입스크립트를 자바스크립트로 컴파일하여 결과를 확인해야 한다. 아래의 명령어는 app.ts 타입스크립트 파일을 자바스크립트로 컴파일 하는 명령어이다. 이 명령어를 실행하면 app.ts 타입스크립트 파일이 컴파일된 app.js라는 자바스크립트 파일이 생성된다..."
socialImage: "/media/image-2.jpg"
---

> **[유데미 TYPESCRIPT](https://www.udemy.com/course/understanding-typescript/learn/lecture/)** 수업을 듣고 정리한 내용입니다.

# 타입스크립트 watch mode

타입스크립트로 개발을 할 때 결과물을 확인하기 위해 타입스크립트를 자바스크립트로 컴파일하여 결과를 확인해야 한다. 아래의 명령어는 `app.ts` 타입스크립트 파일을 자바스크립트로 컴파일 하는 명령어이다. 이 명령어를 실행하면 `app.ts` 타입스크립트 파일이 컴파일된 `app.js`라는 자바스크립트 파일이 생성된다.

```
tsc app.ts
```

타입스크립트로 개발을 하면서 코드를 추가할 때마다 일일이 위의 명령어를 통해 타입스크립트 파일을 자바스크립트로 컴파일해서 결과를 확인해야하는 불편함이 있다. 타입스크립트 `watch mode`를 사용하면 일일이 명령어로 컴파일하지 않아도 타입스크립트 파일을 변경 후 저장할때마다 자동으로 컴파일되게 할 수 있다.

```
tsc app.ts --watch
or
tsc app.ts -w
```

# 여러개의 파일 watch

위의 watch mode는 타입스크립트 파일 하나에 대해서만 적용이 가능하다. 하지만 프로젝트를 개발하면 여러 개의 타입스크립트 파일을 개발할 것이고 개발중인 모든 파일을 watch mode로 적용해야 한다. 먼저 타입스크립트 프로젝트 루트 경로에서 아래의 명령어를 통해 타입스크립트에게 이 프로젝트는 타입스크립트로 개발할 것임을 알려준다.

```
tsc --init
```

그럼 타입스크립트는 `tsconfig.json` 파일을 자동으로 생성한다. 이제는 특정 파일을 지정하지 않고 커맨드라인에 `tsc`만 입력하면 타입스크립트는 `.ts` 확장자를 가진 모든 파일을 자바스크립트로 컴파일해준다. 그리고 아래의 명령어를 통해 모든 타입스크립트 파일에 watch mode를 사용할 수 있다.

```
tsc -w
or
tsc --watch
```

그럼 타입스크립트는 아래와 같이 `watch mode`로 컴파일을 실행하고 있음을 커맨드라인에 표시해준다.

```
[4:33:19 PM] Starting compilation in watch mode...

[4:33:20 PM] Found 0 errors. Watching for file changes.

```

# 특정 파일 포함 또는 제외시키기

## 특정 파일 제외하기

개발을 하다보면 특정 타입스크립트 파일은 컴파일 할 필요가 없을 수 있다. 이때 타입스크립트에게 특정 타입스크립트 파일은 컴파일하지 않아도 된다고 알려줄 수 있다. `tsconfig.json` 파일에서 이를 설정할 수 있다. `exclude`를 키로 하는 배열에 타입스크립트 파일 이름을 지정해주면 해당 타입스크립트 파일은 `tsc` 로 컴파일을 해도 해당하는 자바스크립트 파일이 생성되지 않는다.

```json
//tsconfig.json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'.
    ...*/
    "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or
    ...
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of
    "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */
  },
  "exclude": ["analytics.ts"]
}
```

특정 확장자를 가진 모든 타입스크립트 파일을 제외하고 싶다면 아래와 같이 적어준다.

```json
"exclude": ["*.dev.ts"]
```

어떤 폴더안의 특정 확장자를 가진 모든 타입스크립트 파일을 제외하고 싶다면 아래와 같이 적어준다.

```json
"exclude": ["**/*.dev.ts"]
```

제외할 파일이 하나라도 있다면 `node_modules`도 같이 지정해줘야 타입스크립트는 `node_modules`안의 타입스크립트 파일을 컴파일 대상에서 제외한다. 제외할 파일이 없다면 `tsconfig.json`파일에 exclude를 지정해줄 필요도 없을 것이고 타입스크립트는 알아서 디폴트로 `node_modules`를 제외한다.

```json
"exclude": ["node_modules","**/*.dev.ts"]
```

## 특정 파일 포함시키기

특정 파일을 타입스크립트 컴파일 대상에서 포함하고 싶다면 `include`에 넣어줘야 한다. 다만 include를 사용하면 지정된 파일들만 컴파일 대상이 된다. 모든 타입스크립트 파일을 컴파일 하고 싶다면 include를 지정해줄 필요도 없다.

```json
"include": ["app.js"]
```

# 컴파일 target 셋팅하기

`tsconfig.json` 파일의 target에서 타입스크립트 파일을 컴파일하고 싶은 자바스크립트 버전을 지정해줄 수 있다. target이 es5로 설정되어 있다면 타입스크립트 파일에서는 es6문법인 let과 const를 사용해도 컴파일된 자바스크립트 파일에서는 var로 변수를 선언한다.

# Source Maps

`tsconfig.json`파일에서 "sourceMap"은 디폴트로 주석처리가 되어있다. 주석을 풀고 true로 설정후 컴파일하면 `app.js.map`파일이 생성된다. 이 파일은 웹 브라우저 개발자 도구의 source 탭에 자바스크립트 파일과 함께 타입스크립트 파일도 나타나게 해준다. 이를 통해 타입스크립트 파일도 디버깅을 할 수 있다.

# outDir & rootDir

## outDir

타입스크립트 프로젝트에서 폴더 구조를 잡을 때 보통 타입스크립트 파일은 src 폴더 하위에 들어가고 타입스크립트 파일이 컴파일된 자바스크립트 파일은 dist폴더 하위에 들어가게 잡는다. `tsconfig.json`파일의 `outDir`에 폴더를 지정함으로써 컴파일된 자바스크립트 파일이 들어갈 폴더를 지정해줄 수 있다.

```json
"outDir": "./dist"
```

만약 src 폴더 하위에 다른 폴더가 있고 그 폴더 하위에 타입스크립트 파일이 있다면 타입스크립트는 자동으로 dist폴더 하위에 같은 폴더이름 하위에 컴파일된 자바스크립트 파일을 생성해준다.

![typescript-outdir](/media/typescript-outdir.png)

## rootDir

`rootDir`에 타입스크립트 파일들이 들어있는 폴더를 지정해주면 타입스크립트는 이 폴더 안의 타입스크립트 파일들만 컴파일을 한다. 이를 지정해주면 타입스크립트는 src 폴더 밑의 타입스크립트 파일 뿐만 아니라 src폴더 밖에있는 모든 타입스크립트 파일을 컴파일한다.

```json
"rootDir": "./src"
```

# ETC

## removeComments

컴파일된 자바스크립트 파일에 주석부분을 표시하지 않는다.

```json
"removeComments": true,
```

## noEmit

타입스크립트 파일을 컴파일하지 않는다.

```json
"noEmit": true,
```

## noEmitOnError

`noEmitOnError`옵션은 `tsconfig.json`파일에 디폴트로 주석처리 되어 있지도 않다. `noEmitOnError` 디폴트 값은 false이다. 즉 타입스크립트 파일에 에러가 있더라도 이를 컴파일하여 자바스크립트 파일을 만든다. 하지만 이를 true로 셋팅해놓으면 타입스크립트 파일에 에러가 하나라도 있으면 모든 파일을 컴파일 하지 않는다.

```json
"noEmitOnError": true,
```

# Strict Compilation

strict compilation은 `tsconfig.json` 파일에서 `_ Strict Type-Checking Options _` 아래의 옵션에서 설정할 수 있다.
