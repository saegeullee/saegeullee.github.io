---
title: Building and Deploying
date: '2020-04-18T12:02:37.121Z'
template: 'post'
draft: true
slug: '/aws/building-and-deploying'
category: 'aws'
tags:
  - 'aws'
description: '유다시티 Cloud developer 수업을 듣고 정리한다'
socialImage: '/media/image-2.jpg'
---

> **[유다시티 Cloud developer 과정](https://www.udacity.com/course/cloud-developer-nanodegree--nd9990)** 수업을 듣고 정리한 내용입니다.

# 1. Organizing our code & working with larger systems

## Desigining the application to be extensible

### Features and Modularity

In this concept, we dive into splitting our code into logical "features". This is a way of describing modular programming where the code which relates to one task is grouped together. In this example, the `/feed` and `/auth` endpoints are our features. All routing, models, business logic, and helper functions for these modules should be separated as much as possible. This way, we have an understanding of where code responsibilities just by looking at the general structure.

Often one feature may depend on another feature - for example, user authentication will be needed within the feed. But these dependencies should be kept loose and consistent with only a few methods being consumed. The goal as the system continues to grow, is to minimize refactoring outside of specific features. As you continue to learn cloud and explore microservices, often entire features might be ported to their own servers infrastructure making this loose coupling even more critical.
