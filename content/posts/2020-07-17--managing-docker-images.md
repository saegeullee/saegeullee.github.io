---
title: 도커 이미지 삭제하기
date: '2020-07-17T12:00:37.121Z'
template: 'post'
draft: false
slug: '/docker/managing-docker-images'
category: 'docker'
tags:
  - 'docker'
description: ''
socialImage: '/media/image-2.jpg'
---

어느덧 나의 리눅스 디스크 용량이 거의 꽉 차고 있다.. 도커 이미지를 빌드하는데 아이오닉 프론트엔드 프로젝트가 디스크 용량이 꽉차서 빌드에 실패했다. 다음의 명령어로 나의 리눅스 시스템에 디스크 용량 정보를 확인해보니 Use 100%가 뜬다.

```
df
```

2년전에 처음에 하드 512G 그램을 사서 리눅스를 듀얼부팅으로 설치할때 200G 정도는 할당한것 같은데 정확히 기억이..

지금 확인해보니 총 100G 이상은 할당되어 보이는데 tmpfs라고 임시 파일 시스템을 리눅스가 5개나 할당해놓은 것 같은데 다 합하면 이것만 30G는 되는것 같다 흠..

암튼 이번에 아이오닉 프론트엔드 프로젝트를 도커 빌드하면서 아이오닉 프레임워크 자체 이미지도 같이 빌드가 되었는데 이것만 8G정도나 된다.

그래서 현재까지 안쓰는 도커 이미지들을 다 제거하고 디스크 용량을 13G 정도 겨우 확보했다..

도커 이미지를 삭제하고 디스크용량을 확보하는 과정을 정리해본다.

### 이미지 삭제

```
$docker rmi [image id]
```

### 컨테이너 삭제 전 이미지 삭제할 경우

-f 옵션을 붙이면 컨테이너까지 강제 삭제된다고 한다

```
$docker rmi -f [image id]
```

이미지 몇개를 삭제해서 대략 5G 정도 디스크용량 확보가 되었겠거니 싶어서 `df` 로 확인해보니 디스크용량은 그대로이다. 도커는 이미지를 삭제한다고 해당 이미지를 곧바로 디스크에서 제거하지는 않는 것 같다. 검색해보니 다음 명령어를 통해 도커 이미지, 컨테이너, 볼륨 등의 `dangling`상태의 리소스들을 제거해준다.

```
docker system prune
```

### 참고

[참고자료 digital ocean blog](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes)
