---
title: 시스템 디자인 핵심 개념
date: '2020-06-28T12:50:37.121Z'
template: 'post'
draft: true
slug: '/system-design/system-design-fundamental'
category: 'system-design'
tags:
  - 'system-design'
description: '시스템 디자인 핵심 개념에 대해 공부한 내용을 정리한다.'
socialImage: '/media/image-2.jpg'
---

## Latency(지연시간)와 Throughput(처리량)

레이턴시와 스루풋은 시스템의 성능을 측정하는데 가장 중요한 2가지 개념이다.

### 레이턴시

레이턴시는 데이터가 한 지점의 시스템에서 한 지점의 시스템으로 이동하는데 걸리는 시간을 의미한다. 예를 들어, 네트워크 요청을 생각해보면 클라이언트의 요청이 클라이언트에서 서버로 가는데 걸리는 시간이 레이턴시이다. 이와 비슷하게, 서버에서 특정 데이터를 메모리 또는 하드디스크에서 읽어오는데 걸리는 시간도 레이턴시이다.
