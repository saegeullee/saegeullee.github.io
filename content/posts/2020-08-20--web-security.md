---
title: Web Security
date: '2020-08-15:00:37.121Z'
template: 'post'
draft: true
slug: '/security/web-security'
category: 'security'
tags:
  - 'security'
description: ''
socialImage: '/media/image-2.jpg'
---

## SQL 인젝션

```sql
' or 1=1 --
'; DROP TABLE users; --
```

```sql
INSERT INTO sqlinjection (email) VALUES (; DROP TABLE sqlinjections; --);
```
