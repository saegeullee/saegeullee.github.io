---
title: 타입스크립트 클래스
date: "2019-12-07T18:46:37.121Z"
template: "post"
draft: false
slug: "/category/typescript/typescript-classes"
category: "typescript"
tags:
  - "typescript"
description: "타입스크립트에서 클래스의 property는 public 또는 private 키워드를 지정할 수 있다. 아무 키워드도 지정하지 않는다면 디폴트로 public이다. public은 클래스의 외부에서 접근이 가능하다. 반면에 private은 클래스의 외부에서 접근이 불가능하고 클래스 내부에서만 접근 가능하다..."
socialImage: "/media/image-2.jpg"
---

> **[유데미 TYPESCRIPT](https://www.udemy.com/course/understanding-typescript/learn/lecture/)** 수업을 듣고 정리한 내용입니다.

## private & public

접근 제어자는 타입스크립트에서만 가능하다. 자바스크립트는 이에 대해 모른다. 타입스크립트에서 클래스의 property는 public 또는 private 키워드를 지정할 수 있다. 아무 키워드도 지정하지 않는다면 디폴트로 public이다. public은 클래스의 외부에서 접근이 가능하다. 반면에 private은 클래스의 외부에서 접근이 불가능하고 클래스 내부에서만 접근 가능하다. 예를 들어 아래의 `Department` 클래스에서 employees는 private이기 때문에 employee를 이 배열에 추가하려면 `addEmployee`메서드를 통해 추가해야 한다.

```typescript
class Department {
  private name: string;
  private employees: string[] = [];

  constructor(n: string, employees: string[]) {
    this.name = n;
    this.employees = employees;
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployee() {
    console.log(this.employees);
  }
}

const accounting = new Department("Accounting", ["person1", "person2"]);
accounting.addEmployee("Louies");
accounting.printEmployee();
```

즉 account라는 Department 인스턴스를 생성했으면 아래와 같이 클래스의 property에 직접 접근해서 employee를 추가할 수 없다.

```typescript
accounting.employees.push("member_name");
```

## 클래스 간편하게 초기화하기

```typescript
class Department {
  private name: string;
  private employees: string[] = [];

  constructor(n: string, employees: string[]) {
    this.name = n;
    this.employees = employees;
  }
}
```

Department 클래스는 constructor을 통해 초기화된다. 하지만 위의 코드는 중복되는 코드가 있다. 클래스의 프로퍼티를 선언하는 부분과 constructor 내부에서 프로퍼티를 초기화하는 부분이다. 위의 중복되는 코드를 아래와 같이 간단하게 줄여서 표현할 수 있다.

```typescript
class Department {
  constructor(private name: string, private employees: string[]) {}
}
```

## Readonly 프로퍼티

다음과 같이 readonly 프로퍼티를 추가할 수 있다.

```typescript
class Department {
  constructor(private readonly name: string, private employees: string[]) {}
}
```

## 상속(Inheritance)

자식은 부모를 상속 받을 수 있다. 부모의 프로퍼티를 자식에서 그대로 가져와 사용하는 것이다. 다음과 같이 상속을 할 수 있다. super은 부모의 constructor을 호출한다. 자식의 constructor 내부에서 this에 접근하려면 반드시 super() 이후에 접근해야 한다.

```typescript
class ItDepartment extends Department {
  admins: string[];
  constructor(name: string, admins: string[]) {
    super(name, "IT");
    this.admins = admins;
  }
}
```

## protected

protected는 private과 비슷한 접근 제어자이다. 이 둘의 다른점은 자식이 부모를 상속받으면 부모의 private 프로퍼티를 자식에서 접근이 불가능하다. 이를 허용하는 것이 `protected` 이다. 여전히 클래스의 외부에서는 접근이 불가능하다.

## getter & setter

게터와 셋터는 클래스 내부에서 메서드 앞에 `get`, `set` 키워드를 붙여서 만든다.

```typescript
class ItDepartment extends Department {
  admins: string[];
  reports: string[];
  constructor(name: string, admins: string[]) {
    super(name, "IT");
    this.admins = admins;
  }

  get reports() {
    return ths.reports;
  }

  set reports(reports: string[]) {
    this.reports = reports;
  }
}
```

## static 메서드 & 프로퍼티

static 키워드는 클래스의 메서드나 프로퍼티 앞에 붙일 수 있다. static 메서드 또는 프로퍼티는 클래스의 인스턴스를 생성하지 않고도 사용할 수 있다.

```typescript
class Department {
  static fiscalYear = 2020;
  constructor(private readonly name: string, private employees: string[]) {}
  static createEmployee(name: string) {
    return { name };
  }
}

console.log(Department.createEmployee("louies")); // output -> {name : "louies"}
console.log(Department.fiscalYear); // output -> 2020
```

static 프로퍼티는 클래스 내부에서 this 키워드로 접근할 수 없다. 클래스 내부에서 사용하려면 `Department.fiscalYear`와 같이 클래스 외부에서 사용하는 것처럼 사용하면 된다.

## abstract classes

추상 클래스는 스스로 인스턴스를 만들 수 없다. 반드시 다른 클래스에서 추상클래스를 상속받아야 한다. 추상 클래스는 이를 상속받는 클래스에서 특정 메서드나 프로퍼티를 반드시 구현하게끔 만들 때 사용한다. 추상 클래스를 상속받는 클래스가 추상 클래스에서 정의한 추상 메서드나 프로퍼티를 구현하지 않으면 에러가 발생한다. 아래의 예시에서는 `addEmployee` 메서드가 추상 메서드가 된다. 추상메서드는 매개변수와 리턴타입만 정의해주고 이를 상속받는 클래스에서 이를 구현한다.

```typescript
abstract class Department {
  constructor(private readonly name: string, protected employees: string[]) {}

  abstract addEmployee(employee: string): void;

  printEmployee() {
    console.log(this.employees);
  }
}

class ItDepartment extends Department {
  constructor(employees: string[]) {
    super("IT", employees);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }
}

const it = new ItDepartment(["louies", "gina"]);
it.printEmployee();
```

## singleton & private constructor

싱글톤은 어플리케이션에서 해당 클래스의 단 하나의 인스턴스만 만들 때 필요하다. 아래의 예시 코드를 보면 constructor 앞에 private 키워드를 붙여 클래스 내부에서만 인스턴스를 생성할 수 있게 만들었다.

```typescript
class ItDepartment extends Department {
  private static instance: ItDepartment;

  private constructor(employees: string[]) {
    super("IT", employees);
  }

  static getInstance() {
    if (ItDepartment.instance) {
      //static 메서드 내부에서는 this 키워드 접근가능
      return this.instance;
    }
    this.instance = new ItDepartment([]);
    return this.instance;
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }
}

const itDepartment = ItDepartment.getInstance();
itDepartment.addEmployee("louies");
itDepartment.addEmployee("gina");
itDepartment.printEmployee();
```
