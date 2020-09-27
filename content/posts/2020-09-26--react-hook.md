---
title: 리액트 훅
date: '2020-09-26T18:50:37.121Z'
template: 'post'
draft: false
slug: '/react/react-hook'
category: 'react'
tags:
  - 'react'
description: ''
socialImage: '/media/image-2.jpg'
---

실전 리액트 프로그래밍 책을 보고 정리하였습니다.

## 리액트 훅이란?

훅은 함수형 컴포넌트에서도 클래스형 컴포넌트의 기능을 사용할 수 있게 하는 기능이다. 훅을 통해서 함수형 컴포넌트에서도 컴포넌트의 상탯값을 관리할 수 있고, 컴포넌트의 생명주기 함수를 이용할 수 있다.

## 함수형 컴포넌트에 상탯값 추가하기 : useState

useState 훅을 사용하여 함수형 컴포넌트에서도 상탯값을 관리할 수 있다.

```js
import React, { useState } from 'react';

function Profile() {
  const [name, setName] = useState('');
  return (
    <div>
      <p>{`name is ${name}`}</p>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
    </div>
  );
}
```

사용자가 키보드를 누를 때마다 setName 함수를 호출한다. onChange 속성값으로 입력되는 함수는 렌더링이 될 때마다 생성되므로 성능이 걱정될 수 있다. 리액트에서는 이 문제를 해결하기 위해 `useCallback`훅을 제공한다.

## 하나의 useState 훅으로 여러 상탯값 관리하기

```js
import React, { useState } from 'react';

function Profile() {
  const [state, setState] = useState({ name: '', age: 0 });
  return (
    <div>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>
      <input
        type="text"
        value={state.name}
        onChange={e => setState({ ...state, name: e.target.value })}
      />
      <input
        type="number"
        value={state.age}
        onChange={e => setState({ ...state, age: e.target.value })}
      />
    </div>
  );
}
```

두 상탯값을 하나의 객체로 관리한다. 클래스형 컴포넌트의 setState 메서드는 기존 상탯값과 입력된 값을 병합하지만 useState 훅은 이전 상탯값을 지운다. 따라서 ...state와 같은 코드가 필요하다. 이렇게 상탯값을 하나의 객체로 관리하는 경우를 위해 `useReducer` 훅이 제공된다.

## 함수형 컴포넌트에서 생명 주기 함수 이용하기: useEffect

useEffect 훅을 통해 함수형 컴포넌트에서도 생명 주기 함수를 이용할 수 있다.

```js
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `업데이트 횟수: ${count}`;
  });
  return <button onClick={() => setCount(count + 1)}>increase</button>;
}
```

`useEffect` 훅에 입력된 함수는 렌더링 결과가 실제 돔에 반영된 후 호출된다. 버튼을 클릭할 때마다 다시 렌더링되고, 렌더링이 끝나면 `useEffect` 훅에 입력된 함수가 호출된다.

## useEffect 훅에서 API 호출하기

```js
import React, { useState, useEffect } from 'react';

function Profile({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUserApi(userId).then(data => setUser(data));
  }, [userId]);
  return (
  <div>
    {!user && <p>사용자 정보를 가져오는 중...</p>}
    {user && (
      <>
        <p> {`name is ${user.name}`}</p>
        <p> {`age is ${user.age}`}</p>
      </>
    )}
  </div>;
  )
}
```

`useEffect` 훅에 입력된 함수는 렌더링할 때마다 호출되기 때문에 API 통신을 불필요하게 많이 하게 된다. 이를 방지하기 위해 useEffect 훅의 두 번째 매개변수로 배열을 입력하면, 배열의 값이 변경되는 경우에만 함수가 호출된다. 여기서는 userId 값이 변경되는 경우에만 API 통신을 하도록 설정한다.

## useEffect 훅을 이용해서 이벤트 처리 함수를 등록하고 해제하기

```js
import React, { useState, useEffect } from 'react';

function WidthPrinter() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return <div>{`width is ${width}`}</div>;
}
```

창의 크기가 변경될 때마다 onResize 함수가 호출되도록 등록한다. useEffect 훅의 첫 번째 매개변수에 등록된 함수가 또 다른 함수를 반환할 수 있다. 반환된 함수는 컴포넌트가 언마운트되거나 첫 번째 매개변수로 입력된 함수가 호출되기 직전에 호출된다. 따라서 첫 번째 매개변수로 입력된 함수가 반환한 함수는 프로그램이 비정상적으로 종료되지 않는다면 반드시 호출될 것이 보장된다.

useEffect 훅의 두번째 매개변수에 빈 배열을 넣으면 컴포넌트가 마운트 될 때만 첫 번째 매개변수로 입력된 함수가 호출되고, 컴포넌트가 언마운트 될 때만 반환된 함수가 호출된다.

## 두 가지 기능을 합치기

위에서 작성한 API를 호출하는 기능과 이벤트 처리 함수를 등록하고 해제하는 기능을 하나로 합쳐서 함수형 컴포넌트로 작성해 본다. 훅을 사용하면 다음과 같이 로직별로 코드를 모을 수 있다.

```js
import React, { useState, useEffect } from 'react';

function Profile({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUserApi(userId).then(data => setUser(data));
  }, [userId]);

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    //...
  )
}
```

## 메모이제이션 훅: useMemo, useCallback

useMemo와 useCallback은 이전 값을 기억해서 성능을 최적화하는 용도로 사용된다.

### useMemo
