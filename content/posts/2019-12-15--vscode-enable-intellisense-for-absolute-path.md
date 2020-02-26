---
title: 절대경로 사용시 VSCODE Intellisense 동작하게 하기
date: '2019-12-15T19:00:37.121Z'
template: 'post'
draft: false
slug: '/vscode/vscode-enable-intellisense-for-absolute-path'
category: 'vscode'
tags:
  - 'vscode'
description: '나는 Nodejs 어플리케이션을 만들때 NODE_PATH로 절대 경로를 설정한다. 그동안 코드를 치며 불편했던 것이 vscode 에디터가 코드 completion을 안해주는 것이었다...'
socialImage: '/media/image-2.jpg'
---

##

나는 Nodejs 어플리케이션을 만들때 `NODE_PATH`로 절대 경로를 설정한다. 그동안 코드를 치며 불편했던 것이 vscode 에디터가 코드 completion을 안해주는 것이었다. 예를들어 몽구스 모델을 컨트롤러에 임포트해서 해당 모델을 CRUD하는 메서드를 짜고 있었는데 해당 모델에 사용할수 있는 쿼리메서드가 하나도 보이지 않았다. 그리고 라우터 파일에서 어떤 라우트에 새로 개발한 컨트롤러 메서드를 연결하고 싶은데 정확한 메서드명이 기억나지 않을때도 일일이 다시 컨트롤러 파일에 가서 메서드명을 복사해와서 라우터에 붙여놓고 하는 식으로 개발했어야 했다.. 이게 좀 불편했다... 그동안은 프로젝트 일정때문에 정신이 없어 그냥 넘어갔는데 이번에는 이걸 잡고 가야겠다고 마음먹은 후 이것저것 알아보니(~~eslint, prettier 때문인지알고 뻘짓 포함~~) VSCODE가 `NODE_PATH`를 지원하지 않기 때문에 절대경로로 임포트한 각 모듈들에 어떤 메서드를 사용할 수 있는지를 VSCODE가 몰랐던 것이다.. 어쩐지 상대경로를 사용한 프로젝트에서는 자동완성이 잘되었는데 절대경로를 사용한 프로젝트에서만 자동완성이 안된다는 것을 이제야 깨달았다..

**[스택오버플로우](https://stackoverflow.com/questions/51421545/is-it-possible-for-absolute-paths-to-autocomplete-in-visual-studio-code-vscode)** 에 어떤 형이 친절하게 안내해줘서 그대로 설정했더니 VSCODE가 이제 절대경로를 알아먹고 intellisense를 작동시킨다. 이제 몽구스 모델에 어떤 메서드를 사용할 수 있는지 한눈에 쫙 볼수 있다..

설정을 위해 다음과 같이 `jsconfig.json` 파일을 루트 디렉토리에 만든다.

```json
{
  "compilerOptions": {
    "target": "ES6",
    "baseUrl": "./"
  },
  "exclude": ["node_modules", "**/node_modules/*"]
}
```

중요한건 `baseUrl`인데 이게 VSCODE한테 상대경로가 아닌 경로들(절대경로)을 `baseUrl`을 기준으로 상대경로가 되도록 알려준다고 한다.
