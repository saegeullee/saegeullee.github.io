---
title: Nodejs 에러 port address already in use
date: "2019-12-02T15:50:37.121Z"
template: "post"
draft: false
slug: "/nodejs/nodejs-port-already-in-use-error"
category: "nodejs"
tags:
  - "nodejs"
description: "Node 패키지 nodemon 덕분에 Nodejs 서버 개발을 하다가 서버를 실행시킨 상태에서 코드를 고친 뒤 저장을 하면 서버가 자동으로 다시 시작된다. 하지만 왜 그런지는 모르겠지만 가끔 아니 꽤 자주 서버가 자동으로 다시 시작될 때 `port already in use`에러가 발생한다..."
socialImage: "/media/image-2.jpg"
---

# Nodejs port in use error

Node 패키지 nodemon 덕분에 Nodejs 서버 개발을 하다가 서버를 실행시킨 상태에서 코드를 고친 뒤 저장을 하면 서버가 자동으로 다시 시작된다. 하지만 왜 그런지는 모르겠지만 가끔 아니 꽤 자주 서버가 자동으로 다시 시작될 때 `port already in use`에러가 발생한다.. 이럴때는 해당 포트의 Nodejs 프로세스를 찾아 이를 죽이고 다시 실행을 시키면 된다. 꽤 번거롭지만 우선 포트번호를 계속 바꿔가면서 개발을 하기 싫다면(더 번거롭다..) 이렇게 해야 한다.

아래의 명령어로 현재 3030 포트에서 돌아가고 있는 프로세스를 찾는다.

```
sudo netstat -lpn |grep :3030
```

그럼 아래와 같이 현재 3030 포트에서 돌아가고 있는 프로세스의 번호가 나타난다. 현재 node 서버 애플리케이션의 프로세스 번호는 29250이고 옆에 /node라고 node 서버 프로그램임을 알려준다.

```
    0      0 :::3030                 :::*                    LISTEN      29250/node
```

그리고 아래의 명령어를 통해 프로세스를 죽이면 된다.

```
kill 29250
```

그리고 다시 `npm start`로 서버를 실행시키면 된다.
