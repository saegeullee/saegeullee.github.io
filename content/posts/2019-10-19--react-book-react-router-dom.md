---
title: react-router-dom 사용하기
date: "2019-10-19T15:46:37.121Z"
template: "post"
draft: false
slug: "/category/react/react-router-dom/"
category: "react"
tags:
  - "react"
description: "실전 리액트 프로그래밍 책 react-router-dom 정리"
socialImage: "/media/image-2.jpg"
---

> **[실전 리액트 프로그래밍](http://www.yes24.com/Product/Goods/74223605)** 책을 정리한 내용입니다.

#react-router-dom 사용하기

react-router-dom 패키지는 내부적으로 브라우저 히스토리 API를 사용한다.

```javascript
import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Rooms from './Rooms';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ padding: 20, border: '5px solid gray' }}>
          <Link to="/">홈</Link>
          <br />
          <Link to="/photo">사진</Link>
          <br />
          <Link to="/rooms">방 소개</Link>
          <br />
          <Route exact path="/" component={Home} />
          <Route path="/photo" component={Photo} />
          <Route path="/rooms" component={Rooms} />
        </div>
      </BrowserRouter>
    );
  }
}

function Home({ match }) {
  return <h2>이 곳은 홈페이지입니다.</h2>;
}
function Photo({ match }) {
  return <h2>여기서 사진을 감상하세요.</h2>;
}

export default App;
```

- react-router-dom을 사용하기 위해서는 전체를 BrowserRouter 컴포넌트로 감싸야한다.
- 버튼을 통해서 페이지를 전환할 때는 react-router-dom에서 제공하는 Link 컴포넌트를 사용한다. to 속성값은 이동할 주소를 나타낸다.
- react-router-dom의 Route 컴포넌트를 이용해서 각 페이지를 정의한다. 현재 주소가 path 속성값으로 시작하면 component 속성값이 가리키는 컴포넌트를 렌더링한다.
- exact 속성값을 입력하면 그 값이 완전히 일치해야 해당 컴포넌트가 렌더링된다.
- 만약 Home 컴포넌트 부분에서 exact 속상값을 입력하지 않았다면 Home 컴포넌트는 항상 렌더링된다.
- 같은 path 속성값을 갖는 Route 컴포넌트를 여러번 작성해도 된다. 해당 컴포넌트가 모두 렌더링된다.

```javascript
import React from 'react';
import { Route, Link } from 'react-router-dom';

function Rooms({ match }) {
  return (
    <div>
      <h2>여기는 방을 소개하는 페이지입니다.</h2>
      <Link to={`${match.url}/bludRoom`}>파란 방입니다</Link>
      <br />
      <Link to={`${match.url}/greenRoom`}>초록 방입니다</Link>
      <br />
      <Route path={`${match.url}/:roomId`} component={Room} />
      <Route
        exact
        path={match.url}
        render={() => <h3>방을 선택해 주세요.</h3>}
      />
    </div>
  );
}
export default Rooms;

function Room({ match }) {
  return <h2>{`${match.params.roomId} 방을 선택하셨습니다.`}</h2>;
}
```
- Rooms 컴포넌트 내부에는 또다시 라우팅을 처리하는 코드가 들어있다.
- Route 를 통해서 렌더링되는 컴포넌트는 match라는 속성값을 사용할 수 있다.
- match.url은 Route 컴포넌트의 path 속성값과 같다. 따라서 Rooms 컴포넌트의 match.url 은 /rooms와 같다.
- Route 컴포넌트의 path 속성값에서 콜론을 사용하면 파라미터를 나타낼 수 있다.
- 추출된 파라미터는 match.params.{파라미터 이름} 형식으로 사용될 수 있다.