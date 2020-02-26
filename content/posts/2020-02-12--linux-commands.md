---
title: 리눅스 명령어 정리
date: '2020-02-12T11:12:37.121Z'
template: 'post'
draft: false
slug: '/linux/command'
category: 'linux'
tags:
  - 'linux'
description: '그때그때 필요하여 찾아본 리눅스 명령어를 정리한다.'
socialImage: '/media/image-2.jpg'
---

## cat을 통해 파일 내용 확인하기

```
cat /etc/nginx/mime.types

types {
    text/html                                        html htm shtml;
    text/css                                         css;
    text/xml                                         xml;
    image/gif                                        gif;
    image/jpeg                                       jpeg jpg;
    application/javascript                           js;
    application/atom+xml                             atom;
    application/rss+xml                              rss;

...
```

## 시스템 내 파일찾기

시스템의 모든 디렉토리에서(/) 찾아라(find). 이름을 기준으로(-name). 그 기준 이름은 nginx이다.

```
find / -name nginx
/etc/default/nginx
/etc/nginx
/etc/logrotate.d/nginx
/etc/ufw/applications.d/nginx
/etc/init.d/nginx
/var/log/nginx
/var/lib/nginx
/user/bin/nginx
/home/ubuntu/nginx-1.17.8/objs/nginx
/usr/local/nginx
/usr/share/nginx
/usr/share/doc/nginx
/usr/sbin/nginx
/usr/lib/nginx

```
