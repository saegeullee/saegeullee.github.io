---
title: Nodejs 모듈이 구현되는 방법
date: '2020-01-04T17:10:37.121Z'
template: 'post'
draft: false
slug: '/nodejs/module-implementation'
category: 'nodejs'
tags:
  - 'nodejs'
description: 'Nodejs 서버를 만들 때 crypto nodejs 라이브러리의 pbkdf2 함수를 실행시키면 nodejs 내부적으로 어떤 일이 일어나는지를 정리해본다. '
socialImage: '/media/image-2.jpg'
---

> **[NodeJS: Advanced Concepts](https://www.udemy.com/course/advanced-node-for-developers/)** 수업을 듣고 정리한 내용입니다.

Nodejs 서버를 만들 때 `crypto` nodejs 라이브러리의 `pbkdf2` 함수를 실행시키면 nodejs 내부적으로 어떤 일이 일어나는지를 정리해본다. 참고로 `pbkdf2` 함수는 비밀번호를 암호화하여 해시값을 리턴하는 해시 함수이다.

- **[NodeJS가 작동하는 방법](https://saegeullee.github.io/nodejs/how-nodejs-works)** 참고

**[nodejs 프로젝트 깃헙](https://github.com/nodejs/node)**에서 nodejs 프로젝트의 폴더구조를 보면 `lib` 폴더와 `src` 폴더가 있다. `lib` 폴더에는 nodejs 어플리케이션을 만들 때 `require`하는 자바스크립트 코드로 정의된 모든 모듈과 함수가 포함된다. 즉 nodejs 프로젝트에서 자바스크립트로 작성된 모든 파일들이 `lib` 폴더에 있다.

`src`폴더에는 위의 자바스크립트 코드로 정의된 모든 모듈과 함수들이 C++로 구현되어 있다. Nodejs 어플리케이션에서 `pbkdf2` 함수가 실행되면 궁극적으로는 이에 해당하는 C++ 코드가 실행된다.

nodejs 프로젝트에 정의된 **[pbkdf2 함수](https://github.com/nodejs/node/blob/master/lib/internal/crypto/pbkdf2.js)**를 보면 다음과 같다. 이 함수의 맨 끝부분에서 호출되는 함수를 보면 `_pbkdf2` 함수가 있다. `_pbkdf2` 함수는 이 자바스크립트 파일의 상단에서 `internalBinding`되어 이 자바스크립트 파일에서 호출할 수 있다.

```js
const { Buffer } = require('buffer');
const { pbkdf2: _pbkdf2 } = internalBinding('crypto');
// MORE REQUIREs...

function pbkdf2(password, salt, iterations, keylen, digest, callback) {
  if (typeof digest === 'function') {
    callback = digest;
    digest = undefined;
  }

  ({ password, salt, iterations, keylen, digest } = check(
    password,
    salt,
    iterations,
    keylen,
    digest
  ));

  //ERROR CHECKING AND DO MORE STUFF...

  handleError(_pbkdf2(keybuf, password, salt, iterations, digest, wrap), digest);
}
```

<br>

최종적으로 실행이 되는 이 함수 **[\_pbkdf2 함수](https://github.com/nodejs/node/blob/master/src/node_crypto.cc#L6339)** 는 C++ 함수이다. 바인딩을 통해 자바스크립트 코드와 C++ 코드가 연결된 것이다. 즉 nodejs 서버를 만들 때 프로그래머가 nodejs 모듈 함수(자바스크립트)를 사용하면 내부적으로는 이에 해당하는 C++ 코드가 실행된다.

```C
inline void PBKDF2(const FunctionCallbackInfo<Value>& args) {
  auto rv = args.GetReturnValue();
  Environment* env = Environment::GetCurrent(args);
  CHECK(args[0]->IsArrayBufferView());  // keybuf; wrap object retains ref.
  CHECK(args[1]->IsArrayBufferView());  // pass
  CHECK(args[2]->IsArrayBufferView());  // salt
  CHECK(args[3]->IsUint32());  // iteration_count
  CHECK(args[4]->IsString());  // digest_name
  CHECK(args[5]->IsObject() || args[5]->IsUndefined());  // wrap object
  std::unique_ptr<PBKDF2Job> job(new PBKDF2Job(env));

  //SOME MORE C++ CODE...
}

// C++ 함수를 자바스크립트에서 사용할 수 있도록 export
env->SetMethod(target, "pbkdf2", PBKDF2);
```

그리고 이 C++파일에서는 V8 엔진의 코드와 libuv의 코드도 실행되고 있는 것을 확인해 볼 수 있다. uv로 시작되는 변수 또는 함수가 libuv 코드이다.(`uv_once`)

```C
using v8::Array;
using v8::ArrayBufferView;
using v8::Boolean;
using v8::ConstructorBehavior;
using v8::Context;

//...

void Initialize(Local<Object> target,
                Local<Value> unused,
                Local<Context> context,
                void* priv) {
  static uv_once_t init_once = UV_ONCE_INIT;
  uv_once(&init_once, InitCryptoOnce);

//...
```

<br>

이 과정을 그림으로 정리해보면 다음과 같다. 아래의 그림 자료가 최신의 자료는 아니라서 바인딩 함수가 약간 다르다. 위의 코드에서는 `internalBinding` 함수를 통해 바인딩 하지만 아래의 자료에서는 `process.binding()`으로 바인딩을 한다. nodejs가 업데이트되면서 바인딩 함수도 새로 작성된 것이다.

![nodejs module implementation](/media/nodejs_module_implementations.png)
