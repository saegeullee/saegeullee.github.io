---
title: css flexbox
date: '2020-01-02T12:16:37.121Z'
template: 'post'
draft: true
slug: '/category/css/flexbox'
category: 'css'
tags:
  - 'css'
description: ''
socialImage: '/media/image-2.jpg'
---

이번에 **[포트폴리오](https://saegeullee.github.io/portfolio/)** 를 만들면서 반응형을 전혀 고려하지 않고 일단 만들었다는 것을 깨달았다. 그동안 백엔드를 메인으로 공부하다보니 css 및 반응형에 대해 공부할 시간이 없었고 이번에 포트폴리오를 만들면서 css flexbox에 대한 지식도 많이 부족하다는 것을 느꼈다. 이 포스팅에서는 flexbox에 대해 정리해본다.

## Container

```css
flex-direction: row | row-reverse | column | column-reverse;
```

```css
flex-wrap: nowrap | wrap | wrap-reverse;
```

```css
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
```

```css
align-items: stretch | flex-start | flex-end | center | baseline;
```

```css
align-content: stretch | flex-start | flex-end | center | space-between | space-around;
```

## item

```css
align-self: auto | stretch | flex-start | flex-end | center | baseline;
```

```css
order: 0 | <integer>;
```

```css
flex-grow: 0 | <integer>;
```

```css
flex-shrink: 0 | <integer>;
```

```css
flex-basis: auto | <integer>;
```

```css
flex: 0 1 auto | <int> <int> <len>;
```
