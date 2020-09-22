---
title: Full Stack Apps on AWS
date: '2020-04-15T20:02:37.121Z'
template: 'post'
draft: true
slug: '/aws/fullstack-apps-on-aws'
category: 'aws'
tags:
  - 'aws'
description: '유다시티 Cloud developer 수업을 듣고 정리한다'
socialImage: '/media/image-2.jpg'
---

> **[유다시티 Cloud developer 과정](https://www.udacity.com/course/cloud-developer-nanodegree--nd9990)** 수업을 듣고 정리한 내용입니다.

# Cloud basics

## 1. Cloud Basics and Parts of a Cloud

### Data

We store digital data as bytes on physical media like hard drives, but in the cloud, we use systems to simplify this for us.

### Filestore or Filesystem

A system to save, archive, and recall specific documents and media. Usually, a file store offers low cost per unit space optimized for larger files.

### Database

A system to save and organize complex data models. They often use more advanced data structures to index and organize data for faster lookup time. Databases are compelling solutions for data models that have complicated relationships.

### Compute

Any computer operation requires some computation on a CPU (central processing unit).

### Server

A specialized computer for cloud and web services.

### Instance

A computational unit which may be a physical server or a virtual server that is abstracted by a cloud service.

### Cluster

A collection of instances which perform the same function. It may be used to distribute workloads.

### Autoscaling Group

A type of cluster that can increase or decrease the number of instances based on demand.

## 2. Monolithic vs. Loosely coupled Systems

Loosely coupled systems are recommended over monolithic systems, as they reduce technical debt.

### Technical Debt

The cost (in time and resources) of additional code rework caused by choosing an easy solution now instead of using a better approach that would take longer to implement.

### Microservices

Microservices are individual specialized systems (software deployed on specialized infrastructure) designed to accomplish a specific task. Specific tasks may include things like authentication, image processing, or data management.

# Storing data in the cloud

## 1. Understanding persistence

## RAM (Random Access Memory)

Data can be accessed quickly, but is erased once the server restarts. It may be okay to use RAM when prototyping, and later replace it with a database.

## Hard Drive Disk

Data remains after server restarts, but is specific to that server (not shared across servers).

## Race Condition

When an application’s behavior is dependent on other uncontrollable events. This is an issue with storing data on disks or RAM of multiple servers.

## Relational Database

can store at scale, improve search runtime, and maintain relationships between data fields. We recommend using a database for storing data.

## 2. Database Basics

### B-Tree

a generalization of a binary search tree, which stores sorted data, but can have more than 2 child nodes.

### Bloom Filters

a data structure that is useful for determining if an item is probably in a data set, or definitely not in the data set. Bloom filters don’t actually store the data themselves.

### primary key and foreign key

The primary consists of one or more column in a table that are unique to each record (each row). A foreign key in a table contains the primary key of another table.

## 4. Filestore basics

- File stores allow for archiving data. In AWS, the file store is called S3, and the archive resource is called “glacier”.
- Content Delivery Network (CDN): are a network of proxy servers that are placed closer to end users to deliver data and compute. CDNs reduce latency for end users.
- SignedURLs allow clients to send and receive data by directly communicating with the file store. This saves the server from using its bandwidth to serve as the intermediary that transmits data to and from the client. This is faster for clients as well.
- Buckets: a simple directory-like system in which to store data.

## 6. Understanding Secrets

### what are permissions?

- HIPPA: HIPAA (Health Insurance Portability and Accountability Act) is a law in the U.S that requires data privacy and security for medical information.
- Use environment variables to store your username and password, to avoid hard-coding username and password information in your code.
- Avoid committing your passwords to git. Use .gitignore to define files that you do not want to commit to git.
- IAM user role: an IAM role can give a user a set of permissions to access one or more services.
- IAM service role: an IAM role gives a service a set of permissions to access one or more services.

### User IAM Profiles on AWS

- It’s beneficial to create a role that contains a policy group (a set of permissions), rather than to assign individual permissions to a specific user. Imagine if a user leaves the company and a new hire takes their place. Instead of re-assigning all the permissions needed for their job, we can assign the existing IAM role to that new employee.
