---
title: POSTGRESQL 서버 CLI 접속
date: '2020-07-16T19:00:37.121Z'
template: 'post'
draft: false
slug: '/database/accessing-postgresql-server-from-cli'
category: 'database'
tags:
  - 'database'
description: ''
socialImage: '/media/image-2.jpg'
---

다음 명령어를 통해 리모트 `POSTGRESQL` 서버에 접속할 수 있다.

```
psql -h <host_url> -U <username> <databasename>
```

접속이 되었다면 다음 명령어로 데이터베이스 목록을 볼 수 있다.

```
\list
```

다음 명령어로 postgres 데이터베이스에 접속한다.

```
\c postgres
```

다음 명령어로 해당 데이터베이스에 있는 테이블 목록 확인할 수 있다.

```
\dt
```
