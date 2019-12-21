---
title: Nodejs 서버 개발용 임시 DB 구축하기(MongoDB)
date: '2019-12-17T19:00:37.121Z'
template: 'post'
draft: false
slug: '/nodejs/nodejs-import-dev-data'
category: 'nodejs'
tags:
  - 'nodejs'
description: '이번에 진행한 프로젝트는 여건상 실제 DB 구축이 어려운 상황이었다. 개발 시작 초반에는 비품종류, 비품모델 몇개 정도만 DB에 넣어놓고 개발을 할 수 있었기 때문에 딱히 불편한 점이 없었지만 프로젝트가 조금씩 진행됨에 따라 데이터 스키마도 조금씩 변하면서 데이터베이스를 밀고 데이터베이스에 다시 데이터를 넣어야 되는 상황이 자주 발생하였다. 이에 따라 데이터베이스에 개발용 임시 데이터를 구축하는 스크립트를 작성하였고 이 과정을 정리해본다...'
socialImage: '/media/image-2.jpg'
---

이번에 진행한 프로젝트는 여건상 실제 DB 구축이 어려운 상황이었다. 개발 시작 초반에는 비품종류, 비품모델 몇개 정도만 DB에 넣어놓고 개발을 할 수 있었기 때문에 딱히 불편한 점이 없었지만 프로젝트가 조금씩 진행됨에 따라 데이터 스키마도 조금씩 변하면서 데이터베이스를 밀고 데이터베이스에 다시 데이터를 넣어야 되는 상황이 자주 발생하였다. 이에 따라 데이터베이스에 개발용 임시 데이터를 구축하는 스크립트를 작성하였고 이 과정을 정리해본다.<br>
이 프로젝트를 개발하는데 필요한 데이터는 비품 종류, 비품 모델, 아이템 정보, 아이템 지급/대여 히스토리 총 4가지 종류가 있다. 샘플 데이터를 보면 다음과 같다.

```json
//비품 종류 -> itemtype-sample.json
[
  {
    "name": "아이맥"
  },
  {
    "name": "맥북프로"
  },
  ...
]
```

```json
//비품 모델 -> itemmodel-sample.json
[
  {
    "name": "iMac A2115"
  },
  {
    "name": "MacBook Pro A1990"
  }
  ...
]
```

```json
//아이템 -> item-sample.json
[
  {
    "itemType": "아이맥",
    "model": "iMac A2115",
    "price": 1900000,
    "tag": "개발자용",
    "memo": "this is memo",
    "uniqueNumber": 1
  }
  ...
]
```

```json
//지급 히스토리 -> provisionHistories-sample.json
[
  [
    {
      "member": "큐",
      "usageType": "대여",
      "givenDate": "2019, 10, 11",
      "returnDate": "2019, 10, 31"
    },
    ...
  ],
  ...
]

```

위의 샘플 데이터를 만든 후 자바스크립트 파일에서 곧바로 데이터베이스에 데이터를 넣을 수 있도록 데이터베이스를 연결하는 코드와 샘플 데이터를 읽어와 데이터베이스에 넣는 코드를 작성하였다.

```js
//dev-data/import-dev-data.js
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ItemType = require('../models/itemType');
const ItemModel = require('../models/itemModel');
const Item = require('../models/item');
const Provision = require('../models/provision');
const Member = require('../models/member');

//env 환경 변수를 읽어오기 위한 config
dotenv.config({ path: '../.env' });

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connection successful!');
  });

// 샘플 json 데이터를 읽어온다.
const itemTypes = JSON.parse(fs.readFileSync(`${__dirname}/itemtype-sample.json`, 'utf-8'));
const itemModels = JSON.parse(fs.readFileSync(`${__dirname}/itemmodel-sample.json`, 'utf-8'));
const items = JSON.parse(fs.readFileSync(`${__dirname}/item-sample.json`, 'utf-8'));
const provisionHistories = JSON.parse(
  fs.readFileSync(`${__dirname}/provisionHistories-sample.json`, 'utf-8')
);

const getRandomProvisonHistory = () => {
  const randIdx = Math.ceil(Math.random() * 3 - 1);
  return provisionHistories[randIdx];
};

//읽어온 샘플데이터를 데이터베이스에 넣는다.
const importItemTypes = async () => {
  try {
    await ItemType.create(itemTypes);
    console.log('itemTypes data successfully loaded');
  } catch (err) {
    console.log(err);
  }
};

const importItemModels = async () => {
  try {
    await ItemModel.create(itemModels);
    console.log('itemModels data successfully loaded');
  } catch (err) {
    console.log(err);
  }
};

//읽어온 샘플데이터를 데이터베이스에 넣는다.
const importItems = async () => {
  try {
    let modifiedItems = await Promise.all(
      items.map(async el => {
        const itemType = await ItemType.findOne({ name: el.itemType });
        const itemModel = await ItemModel.findOne({ name: el.model });
        const provisionHistory = getRandomProvisonHistory();

        const provisions = await Promise.all(
          provisionHistory.map(async el => {
            const provHistory = { ...el };
            const member = await Member.findOne({ nickName: provHistory.member });
            provHistory.memberId = member._id;
            const createdProvision = await Provision.create(provHistory);
            return createdProvision._id;
          })
        );

        const copiedEl = { ...el };
        copiedEl.provisionHistory = provisions;
        copiedEl.itemType = itemType._id;
        copiedEl.model = itemModel._id;

        return copiedEl;
      })
    );
    await Item.create(modifiedItems);
    console.log('items data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

importItemTypes();
importItemModels();
importItems();
```

위의 파일을 다음 명령으로 실행하면 샘플데이터가 데이터베이스에 잘 들어간다.

```
node import-dev-data.js
```
