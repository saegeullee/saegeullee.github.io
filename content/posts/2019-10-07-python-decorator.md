---
title: python decorator
date: "2019-10-08T20:41:37.121Z"
template: "post"
draft: true
slug: "/category/python/python-decorator/"
category: "python"
tags:
    - "python"
description: "python decorator"
socialImage: "/media/image-2.jpg"
---

#python decorator

```python
def decorator_function(original_function):
    def wrapper_function():
        return original_function()
    return wrapper_function

def display():
    print('display function ran')

decorated_function = decorator_function()

```
