---
title: 아마존 documentDB에 DB 구축하기
date: '2019-12-06T20:50:37.121Z'
template: 'post'
draft: false
slug: '/nodejs/amazon-documentdb'
category: 'nodejs'
tags:
  - 'nodejs'
  - 'aws'
description: '이번에 클래스101과 협업을 하면서 첫번째 프로젝트로 내부 인사팀 툴을 개발하였다. 배포환경을 서버는 아마존 ec2, 디비는 아마존 documentDB를 사용했다. 아마존 documentDB가 우리가 사용한 mongoDB와 호환이 되기 때문이다. 이때 아마존 documentDB를 구축한 과정을 정리해본다...'
socialImage: '/media/image-2.jpg'
---

이번에 클래스101과 협업을 하면서 첫번째 프로젝트로 내부 인사팀 툴을 개발하였다. 배포환경을 서버는 아마존 ec2, 디비는 아마존 documentDB를 사용했다. 아마존 documentDB가 우리가 사용한 mongoDB와 호환이 되기 때문이다. 이때 아마존 documentDB를 구축한 과정을 정리해본다.

참고 **[Nodejs 서버 아마존 ec2에 배포하기](https://saegeullee.github.io//nodejs/deploy-nodejs-server-to-aws-ec2)**

이 프로젝트를 개발할 때는 로컬에서 작업하였고 DB도 로컬에 mongoDB를 설치하여 사용했다. 리모트 DB를 구축하기 위해서는 로컬에서 작업하던 디비를 아마존 documentDB로 옮겨야 했다. 그러기 위해서는 먼저 로컬 DB를 카피해놓고 이를 리모트로 옮겨야 한다.

**[몽고DB 공식문서](https://docs.mongodb.com/manual/tutorial/backup-and-restore-tools/)** 에 이 과정이 잘 나와있다.

먼저 로컬 몽고DB를 카피를 떠야한다. 몽고디비에서는 이를 dump라고 한다. 터미널을 열고 아래의 명령어를 치면 로컬 몽고DB의 모든 데이터베이스가 카피 떠진다. 그리고 dump라는 폴더와 그 안에 각 데이터베이스별 폴더가 생성되고 그 안에 각 데이터베이스별 컬렉션의 데이터가 생성된다.

```
mongodump
```

특정 db의 데이터만 dump를 뜨고 싶으면 옵션을 준다.

```
mongodb --db=your_database_name
```

아래는 DB 컬렉션들의 데이터가 dump 떠진 모습이다. bson 확장자의 데이터와 이에 대한 metadata 파일이 생성되었다.

```
admins.bson           groups.bson              members.bson
admins.metadata.json  groups.metadata.json     members.metadata.json
cells.bson            histories.bson
cells.metadata.json   histories.metadata.json
```

---

이제 다음의 과정을 통해 카피한 데이터를 아마존 documentDB로 옮겨야 한다.

1. 아마존 ec2 접속
2. 카피한 로컬의 db 데이터를 아마존 ec2에 옮긴다.
3. ec2에서 `mongorestore`을 통해 아마존 documentDB에 카피한 데이터를 넣는다.
4. ec2에서 아마존 documentDB 접속하여 디비 확인.

위 과정을 보면 먼저 로컬에서 아마존 ec2 서버로 카피한 데이터를 옮기고 이 데이터를 다시 documentDB로 옮긴다. 데이터를 두 번의 과정에 걸쳐서 옮기고 있다. 그 이유는 aws documentDB에 접속하기 위해서는 보안키인 pem 키가 필요한데 보안상 이 보안키를 내 로컬에 둘 수는 없었고 ec2 서버에 있었기 때문에 어쩔수 없이 디비 데이터를 두 번 옮긴 것이다.

1번은 **[Nodejs 서버 아마존 ec2에 배포하기](https://saegeullee.github.io//nodejs/deploy-nodejs-server-to-aws-ec2)** 참고

2번은 다음의 명령어를 통해 로컬의 dump/database_name 디렉토리의 모든 파일을 aws ec2서버로 옮겼다.

```
scp -i folders/aws/saegeullee-key.pem -r dump/database_name ubuntu@ec2-54-180-92-87.ap-northeast-2.compute.amazonaws.com:~/
```

위의 명령을 실행하여 다음과 같이 파일들이 잘 옮겨진 것을 확인할 수 있다.

```
admins.metadata.json               100%  317    54.5KB/s   00:00
members.metadata.json              100%  231    31.0KB/s   00:00
cells.bson                         100%  900   154.3KB/s   00:00
groups.bson                        100%  115KB   4.7MB/s   00:00
admins.bson                        100%   75    13.7KB/s   00:00
histories.bson                     100%   14KB   2.2MB/s   00:00
histories.metadata.json            100%  130    22.6KB/s   00:00
groups.metadata.json               100%  127    23.6KB/s   00:00
members.bson                       100%   11KB   2.1MB/s   00:00
cells.metadata.json                100%  219    39.9KB/s   00:00
```

3번 ec2에서 `mongorestore`을 통해 아마존 documentDB에 카피한 데이터 넣기
mongorestore는 디폴트로 dump 디렉토리 안의 데이터를 restore하기 때문에 2번에서 카피한 로컬의 데이터를 dump 디렉토리 안에 넣어둬야한다. 공식문서를 보면 디렉토리를 지정해줄 수도 있다.

```
mongorestore --host=docdb-2019-12-04-08-28-37.cluster-dsjqabqgkaab.ap-northeast-2.docdb.amazonaws.com --port=27017 --username=your_username  --authenticationDatabase=admin
```

마지막으로 4번 ec2에서 documentDB에 접근하여 DB가 잘들어갔는지 확인해보면 된다. 아래의 명령어를 실행하면 documentDB에 접근할 수 있다.

```
mongo --ssl --host docdb-2019-12-04-08-28-37.cluster-dsjqabqgkaab.ap-northeast-2.docdb.amazonaws.com:27017 --sslCAFile rds-combined-ca-bundle.pem --username yourusername --password <암호삽입>
```

이 안에서 디비가 잘 들어갔는지 확인해보면 된다.

```
show databases;
use db_name;
show collections;
...
```
