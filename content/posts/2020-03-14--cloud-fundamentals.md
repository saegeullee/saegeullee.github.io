---
title: AWS Cloud Fundamentals
date: '2020-03-14T20:02:37.121Z'
template: 'post'
draft: true
slug: '/aws/foundational-and-compute-service'
category: 'aws'
tags:
  - 'aws'
description: '유다시티 Cloud developer 수업을 듣고 정리한다'
socialImage: '/media/image-2.jpg'
---

> **[유다시티 Cloud developer 과정](https://www.udacity.com/course/cloud-developer-nanodegree--nd9990)** 수업을 듣고 정리한 내용입니다.

# 목차

- [AWS CLOUND FUNDAMENTALS](#aws-clound-fundamentals)
- [STORAGE & CONTENT DELIVERY](#storage--content-delivery)
- [SECURITY](#security)
- [NETWORKING & ELASTICITY](#networking--elasticity)
- [MESSAGING & CONTAINERS](#messaging--containers)
- [AWS MANAGEMENT](#aws-management)

# AWS CLOUND FUNDAMENTALS

## Elastic Cloud Compute(Ec2)

EC2는 AWS의 클라우드 컴퓨팅 플랫폼의 핵심적인 일부분이고 클라우드 상에서 서버의 렌트(임대)를 제공한다.

## Elastic Block Store

EBS는 EC2 인스턴스를 위한 저장소(storage) 솔루션이다. 그리고 저장소를 늘리기 위한 EC2 인스턴스에 붙어있는 물리적인 하드 드라이브이다.

- EBS는 EC2 대시보드에서 찾을 수 있다.
- EBS 볼륨 타입에는 SSD와 HDD 카테고리 하위에 있는 몇가지 종류가 있다.

## Virtual Priavate Cloud(VPC)

Virtual Private Cloud or VPC allows you to create your own private network in the cloud. You can launch services, like EC2,inside of that private network. A VPC spans all the Availability Zones in the region.

VPC allows you to control your virtual networking environment, which includes:

- IP address ranges
- subnets
- route tables
- network gateways

### tips

- VPC is found under Networking & Content Delivery section of the AWS Management Console.
- The default limit is 5 VPCs per Region. You can request an increase for these limits.
- Your AWS resources are automatically provisioned in a default VPC.
- There are no additional charges for creating and using the VPC.
- You can store data in Amazon S3 and restrict access so that it’s only accessible from instances in your VPC.

## Lambda

AWS Lambda provides you with computing power in the cloud by allowing you to execute code without standing up or managing servers.

- Compute power in the cloud
- Chunk of code
- One specific task
- 15 minutes time limitn

## Serverless

An application developed using Lambdas is considered to be serverless because you're not concerned with the server your code in running on.

- No concern for servers
- Pay only when your code runs
- Author locally or directly via console
- event-driven code
- Environmet manages code

### tips

- Lambda is found under the Compute section on the AWS Management Console.
- Lambdas have a time limit of 15 minutes.
- The code you run on AWS Lambda is called a “Lambda function.”
- Lambda code can be triggered by other AWS services.
- AWS Lambda supports Java, Go, PowerShell, Node.js, C#/.NET, Python, and Ruby. There is a Runtime API that allows you to use other programming languages to author your functions.
- Lambda code can be authored via the console.

## Elastic Beanstalk

Elastic Beanstalks is an orchestration service that allows you to deploy a web application at the touch of a button by spinning up (or provisioning) all of the services that you need to run your application.

At the click of the button, Elastic Beanstalk can create an

- EC2
- set up Auto-scaling
- Elastic load balancer
- administer them seperately

Elastic beanstalk can even spin up Database, VPCs, Security groups all while deploying your code.

## tips

- Elastic Beanstalk is found under the Compute section of the AWS Management Console.
- Elastic Beanstalk can be used to deployed web applications developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker.
- You can run your applications in a VPC.

## Elastic beanstalk exercises

1. Access Elastic Beanstalk service from AWS Management Console

   - On the AWS Management Console page, type elastic beanstalk in the Find Services box and then select Elastic Beanstalk.
   - If this is your first time accessing Elastic Beanstalk, click the Get started button.
     Enter an Application name.
   - Under Platform, click the dropdown for Choose a platform. Select Tomcat.
   - Under Application code, select Upload your code. Click the Upload button.
   - Under Upload your code, make sure Local file is selected for Source code origin.
   - Click Choose File and upload the downloaded WAR file (link above in pre-requisites), udacity.war.
     Click the Upload button.
   - Click the Create application button. Important: It will take about 10 minutes for your application to be created. There are several resources that need to be spun up to support your application. Your application is created once you see a green check mark and the Health of your application is Ok.
   - After the application is created, copy the application’s URL. Important: The URL can be found on the top of the page, to the right of your application’s name.

2. Test the deployed web application in a browser
   - Navigate to a web browser like Chrome or Safari.
   - Paste the application URL and append /message on the end of the URL.
   - Upon successfully accessing that URL, you will see the text Hello World in your browser window.
3. Inspect the EC2 instance created for you
   - Navigate to the EC2 console and inspect the instance that was created for you. The instance has the same name as your application. You can administer and manage this EC2 as if you created it yourself.
4. Cleanup and delete resources
   - To clean up the resources to avoid recurring charges, navigate back to the Elastic Beankstalk console.
   - Select your application.
   - Select the Actions button in the upper-right hand corner.
   - Select Terminate environment.
   - Enter the name of the environment to be deleted.
   - Click the Terminate button.
   - After the application is terminated, you will be brought to the main page for the application.
   - Click on the Actions button in the upper right-hand corner.
   - Select Delete application.
   - Enter the name of your application.
   - Click the Delete button.

# STORAGE & CONTENT DELIVERY

## Storage in the Cloud

Storage and database services in the cloud provide a place for companies to collect, store, and analyze the data they've collected over the years at a massive scale.

## Storage & Database Services

- Amazon Simple Storage Service (Amazon S3)
- Amazon Simple Storage Service (Amazon S3) Glacier
- DynamoDB
- Relational Database Service (RDS)
- Redshift
- ElastiCache
- Neptune
- Amazon DocumentDB

## S3 & S3 Glacier

Amazon Simple Storage Service (or S3) is an object storage system in the cloud.

## Storage Classes

S3 offers several storage classes, which are different data access levels for your data at certain price points.

- S3 Standard
- S3 Glacier (more for data archiving purpose, cheaper than S3, infrequently access)
- S3 Glacier Deep Archive
- S3 Intelligent-Tiering
- S3 Standard Infrequent Access
- S3 One Zone-Infrequent Access

### Tips

- S3 is found under the Storage section on the AWS Management Console.
- A single object can be up to 5 terabytes in size.
- You can enable Multi-Factor Authentication (MFA) Delete on an S3 bucket to prevent accidental deletions.
- S3 Acceleration can be used to enable fast, easy, and secure transfers of files over long distances between your data source and your S3 bucket.

## DynamoDB

DynamoDB is a NoSQL document database service that is fully managed. Unlike traditional databases, NoSQL databases, are schema-less. Schema-less simply means that the database doesn't contain a fixed (or rigid) data structure.

### Tips

- DynamoDB is found under the Database section on the AWS Management Console.
- DynamoDB can handle more than 10 trillion requests per day.
- DynamoDB is serverless as there are no servers to provision, patch, or manage.
- DynamoDB supports key-value and document data models.
- DynamoDB synchronously replicates data across three AZs in an AWS Region.
- DynamoDB supports GET/PUT operations using a primary key.

## Relational Database Service (RDS)

RDS (or Relational Database Service) is a service that aids in the administration and management of databases. RDS assists with database administrative tasks that include upgrades, patching, installs, backups, monitoring, performance checks, security, etc.

### Database Engine Support

- Oracle
- PostgreSQL
- MySQL
- MariaDB
- SQL Server

### Features

- failover
- backups
- restore
- encryption
- security
- monitoring
- data replication
- scalability

## Redshift

Redshift is a cloud data warehousing service to help companies manage big data. Redshift allows you to run fast queries against your data using SQL, ETL, and BI tools. Redshift stores data in a column format to aid in fast querying. Redshift stores data in a column format as opposed to a row store like a relational database. This aids in fast query and analysis.

### Tips

- Redshift can be found under the Database section on the AWS Management Console.
- Redshift delivers great performance by using machine learning.
- Redshift Spectrum is a feature that enables you to run queries against data in Amazon S3.
- Redshift encrypts and keeps your data secure in transit and at rest.
- Redshift clusters can be isolated using Amazon Virtual Private Cloud (VPC).

## Content Delivery in the Cloud

A Content Delivery Network or CDN, speeds up delivery of your static and dynamic web content such as web-pages, cascading style sheets, JavaScript logic, and images.
Typically, content is cached or stored for a certain period of time, and when a user requests your website or other web content, content is pulled from the cache speeding up the delivery of the content to your end users.
A CDN reduces latency and decreases the load on your servers, which provides a good end user experience to your customers and users of your applications.

Latency simply means the time it takes to respond to a request. So from the time a user attempts to access your website to the time it takes for your website to load. High latency causes your website to take a long time to load while low latency causes your website to load quickly. Low latency is a good thing and CDNs assist with this.

## Cloud Front

CloudFront is Amazon service for content delivery. CloudFront speeds up the delivery of your content through Amazon's worldwide network of many data centers called edge locations. As in a typical content delivery network, your content is cached or stored for a certain period of time at an edge location that is close to the user. When a user requests your website or other web content, the edge location is consulted first. If the content is not there, then your content is pulled from the origin or the original source, which may be far away from the user's location, then it's stored at the edge location and then delivered to your users. All subsequent requests should now be faster because the content is now stored at the edge location. You can configure how long an item remains cached before a refresh, or you can manually expire or remove content from the cache, should it need to be changed.

CloudFront works with other AWS services, as shown below, as an origin source for your application:

- Amazon S3
- Elastic Load Balancing
- Amazon EC2
- Lambda@Edge
- A- WS Shield

### Tips

- CloudFront is found under the Networking & Content Delivery section on the AWS Management Console.
- Amazon countinously adds new Edge Locations.
- CloudFront ensures that end-user requests are served from the closest edge location.
- CloudFront works with non-AWS origin sources.
- You can use GeoIP blocking to serve content (or not serve content) to specific countries.
- Cache control headers determine how frequently CloudFront needs to check the origin for an updated version your file.
- The maximum size of a single file that can be delivered through Amazon CloudFront is 20 GB.

# SECURITY

## AWS Shield

AWS Shield is a managed DDoS (or Distributed Denial of Service) protection service that safeguards web applications running on AWS.

AWS Shield is a service that you get "out of the box", it is always running (automatically) and is a part of the free standard tier. If you want to use some of the more advanced features, you'll have to utilize the paid tier.

### Tips

- sAWS Shield can be found under the Security, Identity, & Compliance section on the AWS Management Console.
- sAWS Shield Standard is always-on, using techniques to detect malicious traffic.
- sAWS Shield Advanced provides enhanced detection.

## AWS WAF

AWS WAF or AWS Web Application Firewall provides a firewall that protects your web applications. A firewall is a network security mechanism that monitors and controls incoming and outgoing network traffic based on preset security rules. A firewall stands in front of your application as a way to guard who can access it. The rules that you set up inside of your firewall allows certain traffic or block it. Firewalls are largely used to protect your web applications from unintended access. WAF can stop common web attacks such as SQL injection, cross-site scripting, etc by reviewing the data being sent to your application and stopping well-known attacks.

### Tips

- WAF is found under the Security, Identity, & Compliance section on the AWS Management Console.
- WAF can protect web sites not hosted in AWS through Cloud Front.
- You can configure CloudFront to present a custom error page when requests are blocked.

## Identity & Access Management

Identity & Access Management (IAM) is an AWS service that allows us to configure who can access our AWS account, services, or even applications running in our account. IAM is a global service and is automatically available across ALL regions.

### Security Concepts

- User
- IAM Group
- IAM Role
- Policy

# NETWORKING & ELASTICITY

## Networking

Networks reliably carry loads of data around the globe allowing for the delivery of content and applications with high availability. The network is the foundation of your infrastructure.

Cloud networking includes:

- network architecture
- network connectivity
- application delivery
- global performance
- delivery

## Route 53

Route 53 is a cloud domain name system (DNS) service that has servers distributed around the globe used to translates human-readable names like www.google.com into the numeric IP addresses like 74.125.21.147.

### Features

- scales automatically to manage spikes in DNS queries
- allows you to register a domain name (or manage an existing)
- routes internet traffic to the resources for your domain
- checks the health of your resources

### Tips

- Route 53 is found under the Networking & Content Delivery section on the AWS Management Console.
- Route 53 allows you to route users based on the user’s geographic location.

## Elasticity in the Cloud

One of the main benefits of the cloud is that it allows you to stop guessing about capacity when you need to run your applications. When applications run in a traditional on-premises data center, you have to buy your servers upfront. Sometimes you buy too much, or you don't buy enough to support the running of your applications. With elasticity, your servers, databases, and application resources can automatically scale up or scale down based on the load, or how many users are using your applications at a given time. Resources can scale up or vertically and Amazon EC2, this can easily be achieved by stopping an instance and resizing it to an instance type that has more RAM, CPU, IO, etc., or you can scale out or horizontally which increases the number of resources. An example would be adding more servers.

## EC2 Auto Scaling

EC2 Auto Scaling is a service that monitors your EC2 instances and automatically adjusts by adding or removing EC2 instances based on conditions you define in order to maintain application availability and provide peak performance to your users.

### Features

- Automatically scale in and out based on needs.
- Included automatically with Amazon EC2.
- Automate how your Amazon EC2 instances are managed.

### Tips

- EC2 Auto Scaling is found on the EC2 Dashboard.
- EC2 Auto Scaling adds instances only when needed, optimizing cost savings.
- EC2 predictive scaling removes the need for manual adjustment of auto scaling parameters over time.

##Elastic Load Balancing
Elastic Load Balancing automatically distributes incoming application traffic across multiple servers.

Elastic Load Balancer is a service that:

- Balances load between two or more servers
- Stands in front of a web server
- Provides redundancy and performance

Redundancy simply means that if you lose a server, the load balancer will send requests to other working servers. Good performance simply means that if a server starts having issues or bottlenecks, the load balancer will add more servers to the pool of available servers.

### Tips

- Elastic Load Balancing can be found on the EC2 Dashbaoard.
- Elastic Load Balancing works with EC2 Instances, containers, IP addresses, and Lambda functions.
- You can configure Amazon EC2 instances to only accept traffic from a load balancer.

# MESSAGING & CONTAINERS

## Messaging in the Cloud

There are often times that users of your applications need to be notified when certain events happen. Notifications, such as text messages or emails can be sent through services in the cloud. The use of the cloud offers benefits like lowered costs, increased storage, and flexibility.

## Simple Notification Service

Amazon Simple Notification Service (or SNS) is a cloud service that allows you to send notifications to the users of your applications. SNS allows you to decouple the notification logic from being embedded in your applications and allows notifications to be published to a large number of subscribers.

### Features

- SNS uses a publish/subscribe model.
- SNS can publish messages to Amazon SQS queues, AWS Lambda functions, and HTTP/S webhooks.

### Tips

- SNS is found under the Application Integration section on the AWS Management Console.
- SNS Topic names are limited to 256 characters.
- A notification can contain only one message.

## Simple Queue Service

Amazon Simple Queue Service (SQS) is a fully managed message queuing service that allows you to integrate queuing functionality in your application. SQS offers two types of message queues: standard and FIFO.

### Features

- send messages
- store messages
- receive messages

### Tips

- The Simple Queue Service (SQS) is found under the Application Integration on the AWS Management Console.
- FIFO queues support up to 300 messages per second.
- FIFO queues guarantee the ordering of messages.
- Standard queues offer best-effort ordering but no guarantees.
- Standard queues deliver a message at least once, but occasionally more than one copy of a message is delivered.

## Containers in the Cloud

Enterprises are adopting container technology at an explosive rate. Docker is the leading container technology. There are several container orchestration services that help you manage your Docker clusters. Kubernetes is a container orchestration system for Docker containers similar to Docker Swarm. Why are containers so popular? A container consists of everything an application needs to run. The application itself and its dependencies like libraries, utilities, configuration files, etc. all bundled into one package. Instead of having to rebuild your application and its environment from scratch as it moves from environment to environment, say from development to production, you can easily move the entire container from environment to environment without any issues.

Each container is an independent component that can run on its own. Let's say you have a huge monolith application, that you're migrating to a micro-services architecture. The micro-services architecture decomposes large complex monoliths systems into discrete, individual stand-alone components that can communicate among themselves, working together, or with external systems. A Docker container works well with the micro-services use case because each micro service is its own independent component with no interdependencies.

## Elastic Container Service (ECS)

ECS is an orchestration service used for automating deployment, scaling, and managing of your containerized applications. ECS works well with Docker containers by:

- launching and stopping Docker containers
- scaling your applications
- querying the state of your applications

### Tips

- ECS is under the Compute section on the AWS Management Console.
- You can schedule long-running applications, services, and batch processeses using ECS.
- Docker is the only container platform supported by Amazon ECS.

# AWS MANAGEMENT

## Cloud Trail

Cloud Trail allows you to audit (or review) everything that occurs in your AWS account. Cloud Trail does this by recording all the AWS API calls occurring in your account and delivering a log file to you.

### Features

CloudTrail provides event history of your AWS account activity, including:

- who has logged in
- services that were accessed
- actions performed
- parameters for the actions
- responses returned
- This includes actions taken through the AWS Management Console, AWS SDKs, command line tools, and other AWS services.

### Tips

- Cloud Trail is found under the Management & Governance section on the AWS Management Console.
- CloudTrail shows results for the last 90 days.
- You can create up to five trails in an AWS region.

## Cloud Watch

CloudWatch is a service that monitors resources and applications that run on AWS. There are several useful features like collecting and tracking metrics, collecting and monitoring log files, setting alarms and creating triggers to run your AWS resources, and reacting to changes in your AWS resources. The ability to review log files is crucial during the development and support of applications. I routinely use CloudWatch logs written from my lambda functions, to diagnose issues and monitor application flow. I've also use CloudWatch as a trigger for my lambda functions, causing a lambda to run on a given schedule. CloudWatch is a flexible and powerful tool that provides several options.

### Features

There are several useful features:

- Collect and track metrics
- Collect and monitor log files
- Set alarms and create triggers to run your AWS resources
- React to changes in your AWS resources

### Tips

- CloudWatch is found under the Management & Governance section on the AWS Management Console.
- Metrics are provided automatically for a number of AWS products and services.

## Infrastructure as Code

Infrastructure as Code allows you to describe and provision all the infrastructure resources in your cloud environment. This is where you stand up servers, databases, runtime parameters, resources, etc, based on scripts that you write. Essentially, you are scripting out infrastructure which turns infrastructure into code. This is a time-saving feature because it allows you to provision or stand up resources in a reproducible way. You are able to manage a collection of related resources and treat them as one logical unit. Let's say, in order to set up a development environment, you have to do these steps; configure a VPC security group, launch an EC2 instance, create load balancers, create an RDS instance, and create auto-scaling. Instead of manually having to set up each of these resources individually, you can write a script to create the resources for you in a repeatable way. Infrastructure as Code is a great time saving feature.

## Cloud Formation

AWS Cloud Formation is AWS's infrastructure as code service. It allows you to model your entire infrastructure in a text file template allowing you to provision AWS resources based on the scripts you write.

### Tips

- Cloud Formation is found under the Management & Governance section on the AWS Management Console.
- Cloud Formation templates are written using JSON or YAML.
- You can still individually manage AWS resources that are part of a CloudFormation stack.
