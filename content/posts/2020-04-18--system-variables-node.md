---
title: Nodejs에서 시스템 profile의 환경변수 사용하기
date: "2020-04-18T15:02:37.121Z"
template: "post"
draft: false
slug: "/nodejs/use-system-variables-in-profile"
category: "nodejs"
tags:
  - "nodejs"
description: "Nodejs에서 시스템 profile의 환경변수를 사용하는 방법을 정리해본다."
socialImage: "/media/image-2.jpg"
---

보통 Nodejs 어플리케이션을 만들때 코드 상에서 환경변수를 가져오기 위해 먼저 `.env`파일에 `DATABASE_NAME=my_db`와 같이 정의해놓고 `process.env.DATABASE_NAME` 과 같이 사용했다. 하지만 `.env`파일을 굳이 만들지 않고 내 컴퓨터(리눅스 운영체제) 시스템의 환경변수를 관리하는 profile 파일(`~/.profile 경로에 위치`)에서 해당 환경 변수들을 관리하고 Nodejs 어플리케이션이 이를 사용하도록 할 수 있다.

우선 터미널에서 \$변수명을 사용하여 .profile 파일에 정의된 시스템 환경변수를 확인해볼 수 있다. 먼저 터미널에 다음의 명령어를 쳐본다.

```
echo $TEST_VARIABLE
```

해당 변수명으로 아무것도 등록이 되어 있지 않다면 빈줄이 출력된다. 이제 다음명령어로 해당 환경 변수명을 등록해보자.

```
export TEST_VARIABLE=TESTING
```

그 후 다시 `echo $TEST_VARIABLE`을 찍어보면 TESTING이 찍히는 것을 확인해 볼 수 있다. 위 과정을 통해 `~/.profile`에 write가 되지는 않는 것을 보면 임시로 사용할 수 있는 것 같다.

본론으로 가서..

먼저 `~/.profile` 파일을 열고 사용하고 싶은 환경변수를 정의한다.

```
export POSTGRESS_USERNAME=lemix777;
export POSTGRESS_PASSWORD=12341234
export POSTGRESS_DATABASE=udagramdev;
export POSTGRESS_HOST=udagramdev.cj9k9scxnwx8.ap-northeast-2.rds.amazonaws.com;
export AWS_REGION=ap-northeast-2;
export AWS_PROFILE=default;
export AWS_MEDIA_BUCKET=udagram-lemix777-dev;
```

이 변수들을 Nodejs 프로젝트에서 사용하고 싶다면 (해당 프로젝트 루트 경로의 터미널에서 사용하고 싶다면) 다음 명령어를 쳐야 한다.

```
source ~/.profile
```

이제 echo를 찍어보면 해당 변수가 터미널에 잘 찍히는 것을 확인해볼 수 있다.

```
echo $POSTGRESS_USERNAME
lemix777
```
