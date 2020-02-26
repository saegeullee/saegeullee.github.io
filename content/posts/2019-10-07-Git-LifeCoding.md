---
title: 생활코딩 git 01 수업소개
date: "2019-10-06T18:46:37.121Z"
template: "post"
draft: true
slug: "/category/git/git-course-introduction/"
category: "git"
tags:
  - "git"
description: "Gatsby 블로그는 어떻게 글을 쓰면 되는지, 어떻게 올릴 수 있는지 알아봅시다."
socialImage: "/media/image-2.jpg"
---

> **[생활코딩 git](https://opentutorials.org/module/2676)** 수업을 듣고 정리한 내용입니다.
#버전 만들기(init, config, add, commit)

버전관리를 원하는 폴더에서 `git init` 명령어를 치면 해당 폴더가 깃 저장소가 된다.
`$ls -al` 명령어를 치면 .git 이라는 디렉토리가 생성된 것을 확인 할 수 있다. 이 디렉토리에는 버전관리를 하면서 생성되는 여러가지 정보가 저장된다.

`git config`는 버전을 만든 사람에 대한 정보를 설정한다. 이 설정은 ~/.gitconfig 파일에 저장된다.

```git
$git config --global user.name "자신의 이름 또는 닉네임"
$git config --global user.email "자신의 이메일"
```

`$git add f1.txt` 명령어를 통해 git이 이 파일을 추적하기 시작합니다. 여러가지 파일이 있을 때 선택적으로 특정 파일만을 add하여 커밋할 수 있습니다. git add를 하게 되면 해당 파일은 커밋 대기 상태가 되고 stage area에 올라가게 됩니다. 여기서 커밋을 하게 되면 stage 위에 있는 파일들이 버전이 됩니다. 깃에는 stage 와 repository 라는 개념이 있습니다. stage는 커밋 대기 하고 있는 파일들이 가는 곳이고 커밋이 된 결과가 저장되는 곳이 repository 입니다.
#변경사항 확인하기(log, diff)

`$git log` 커밋 메시지를 확인할 수 있다.<br>
`$git log -p` 로그에 커밋간의 소스코드 차이를 출력해준다.
`dc69213ca13e8c1619a2e277e8c83baa0e247431` 커밋 id는 해당 커밋 메시지가 가리키는 버전의 고유한 주소이다.<br>
`$git diff commitID1..commitID2` 해당 커밋간의 차이를 출력해준다.
