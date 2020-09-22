---
title: TDD로 만드는 Nodejs 서버
date: '2020-06-19T11:50:37.121Z'
template: 'post'
draft: true
slug: '/testing/tdd-nodejs'
category: 'tdd'
tags:
  - 'tdd'
description: 'nodejs 서버를 tdd로 만들어본다.'
socialImage: '/media/image-2.jpg'
---

> **[TDD로 만드는 Nodejs API 서버](https://www.inflearn.com/course/테스트주도개발-tdd-nodejs-api/)** 수업을 듣고 정리한 내용입니다.

## 사용 라이브러리

이 수업에서는 [Mocha](https://mochajs.org/), [Should](https://github.com/tj/should.js/), [Supertest](https://github.com/visionmedia/supertest) 라이브러리를 사용하여 TDD로 Nodejs API 서버를 만든다.

- Should는 검증(assertion) 라이브러리이다.
- Nodejs 공식 홈페이지에서도 테스트를 작성할때 노드의 내장 패키지인 assert 말고 Should와 같은 서드파트 라이브러리를 사용하라고 안내되어 있다.
- 유닛 테스트: 함수의 기능을 테스트
- 통합 테스트: API의 기능을 테스트
- Supertest는 익스프레스 통합 테스트용 라이브러리이다.
- 내부적으로 익스프레스 서버를 구동시켜 실제 요청을 보낸 뒤 결과를 검증한다.

## 유닛 테스트

아래의 샘플 코드는 문자열을 받아 첫번째 문자열을 대문자로 바꾼 문자열을 반환하는 capitalize 라는 함수의 유닛 테스트 코드이다.

```js
//utils.js
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  capitalize
};
```

```js
//utils.spec.js
const utils = require('./utils');
const should = require('should');

describe('capitalize function in utils.js module is', () => {
  it('Capitalize the first letter of the string', () => {
    const result = utils.capitalize('hello');
    result.should.be.equal('Hello');
  });
});
```

모카 테스트 실행하기
mocha utils.spec.js
