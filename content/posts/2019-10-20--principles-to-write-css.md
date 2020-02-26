---
title: HTML&CSS를 작성하는 원칙
date: "2019-10-20T15:46:37.121Z"
template: "post"
draft: false
slug: "/category/css/printciples-to-write-html-css"
category: "html"
tags:
  - "css"
  - "html"
description: "나의 첫번째 html&css 프로젝트 인스타그램 clone을 진행하며 느낀 점은 효율적이고 빠르게 html과 css를 작성하기 위해서는 먼저 html 태그의 클래스 이름을 빠르게 결정할 수 있어야 한다는 것이다. BEM을 도입하기 전에는 html 태그의 클래스명을 정하고 그 클래스명을 css 파일에 옮기는데 상당한 시간이 소요되었고 html, css를 작성하는 것이 괴로웠다..."
socialImage: "/media/image-2.jpg"
---

#BEM(Block-Element-Modifier)에 대하여

**[나의 첫번째 html&css 프로젝트](https://github.com/saegeullee/InstagramClone_frontend)** 인스타그램 clone을 진행하며 느낀 점은 효율적이고 빠르게 html과 css를 작성하기 위해서는 먼저 html 태그의 클래스 이름을 빠르게 결정할 수 있어야 한다는 것이다. BEM을 도입하기 전에는 html 태그의 클래스명을 정하고 그 클래스명을 css 파일에 옮기는데 상당한 시간이 소요되었고 html, css를 작성하는 것이 괴로웠다.

클래스명을 생각나는대로 짓다보니 `.bottom-engage-low-comment-input` 이런식으로(~~요딴식으로~~) 클래스명이 한없이 길어지고 읽기도 어려운 클래스명을 작성하고 있었다. 클래스명을 정하는 어떤 원칙이 정말 필요해보였다.

그러다 BEM이라는 것을 알게되어 곧바로 프로젝트에 도입하였고 html&css 작성시간이 이전과 비교했을때 매우 빨라졌음을 깨닫게 되었다! 물론 BEM 도입과 함께 layout 정렬 방법을 float에서 flexbox로 변경하며 내가 원하는대로 화면에 그리기 훨씬 수월해졌고 html과 css를 작성하는 것이 재밌어지기 시작했다. 앞으로는 모든 프로젝트를 BEM과 flexbox로 작성하기로 결정하였고 우선 BEM에 대해 정리해보겠다.

구글에 BEM css로 검색하면 최상단에 나오는 **[getbem.com](http://getbem.com/introduction/)** 과 **[CSS-TRICKS](https://css-tricks.com/bem-101/)** 에 BEM에 대해 잘 정리가 되어있어 이를 참고하여 정리해보겠다.

##Block
독립적으로 스스로 의미를 갖는 요소<br>
ex) `header`, `container`, `menu`, `checkbox`, `input`

##Element
Block의 일부분으로 독립적인 의미가 없는 요소<br>
ex) `menu item`, `list item`, `checkbox caption`, `header`, `title`

##Modifier
Block-element의 행동이나 모양을 바꿀때 사용한다<br>
ex) `disabled`, `highlighted`, `checked`, `fixed`, `size big`, `color yellow`

```css
example

/* Block */
.btn {
}

/* Element - Block에 의존하는 요소 */
/* 두개의 __로 나타낼 수 있음 */
.btn__price {
}

/* Modifier - Block의 style을 변경*/
/* 두개의 --로 나타낼 수 있음 */
.btn--orange {
}
.btn--big {
}
```
