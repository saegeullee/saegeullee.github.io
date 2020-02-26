---
title: Mongoose 에러 Schema hasn't been registered
date: '2019-12-18T12:10:37.121Z'
template: 'post'
draft: false
slug: '/nodejs/mongoose-error-schema-hasnt-been-registered'
category: 'nodejs'
tags:
  - 'nodejs'
  - 'mongoose'
description: "이 포스팅에서는 nodejs & mongoose 어플리케이션을 개발하다 발생한 Schema hasn't been registered for model 에러 원인과 해결방법에 대해 정리해본다."
socialImage: '/media/image-2.jpg'
---

이 포스팅에서는 nodejs & mongoose 어플리케이션을 개발하다 발생한 아래의 에러 원인과 해결방법에 대해 정리해본다.

```
Schema hasn't been registered for model \"Provision\".
\nUse mongoose.model(name, schema)
```

프로젝트를 진행하며 위의 에러때문에 시간을 꽤 잡아먹었다. 결론적으로 이 에러가 발생한 이유는 `Provision` 모델을 어플리케이션의 어디에서도 `require`하지 않았기 때문이다... `Provision` 모델은 이 프로젝트에서 직접적으로 쿼리하지 않고 `Item` 모델을 통해 간접적으로 쿼리된다. `Item` 모델의 필드에 `Provision` 의 reference가 있다. 따라서 아래와 같이 `Item`모델에서 `Provision`을 populate 하는 과정에서 위의 에러가 발생한 것이다.

```javascript
const item = await Item.findById(req.params.id)
  .populate({ path: 'itemType', select: 'name' })
  .populate({ path: 'model', select: 'name' })
  .populate({ path: 'owner', select: 'nickName' })
  .populate({ path: 'provisionHistory' });
```

`itemType`이나 `model`, `owner`는 populate가 잘 되는데 provision에서 계속 에러가 발생했다. Provision을 직접적으로 여기서 쿼리하지 않기때문에 require을 할 필요가 없다고 생각했지만 이것 때문에 에러가 발생했다. Provision을 여기서 require하지 않으면 어플리케이션의 다른곳에서라도 이를 require하여 Nodejs에게 Provison 모델 모듈에 대해 알려줘야했는데 이를 하지 않아서 에러가 발생한 것이다. 분명히 모델에서 `module.exports`를 했는데 왜 에러가 나지.. 라고 1차원적으로 생각했다...

```javascript
module.exports = mongoose.model('Provision', provisionSchema);
```

해당 서비스 파일에서 `Provision` 모델을 require하니 에러가 발생하지 않고 populate가 잘 되었다. 앞으로는 직접적으로 쿼리하지 않는 모델에 대한 require 하는 것도 잊지 말아야겠다.

```javascript
const Provision = require('models/provision');
```
