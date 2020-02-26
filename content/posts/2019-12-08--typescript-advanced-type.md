---
title: 타입스크립트 타입 고급
date: '2019-12-08T18:46:37.121Z'
template: 'post'
draft: false
slug: '/category/typescript/typescript-advanced-type'
category: 'typescript'
tags:
  - 'typescript'
description: '인터페이스를 사용하여 커스텀 타입의 객체를 만들 수 있다. 아래의 예시에서 Person 인터페이스는 특정 객체가 반드시 name, age 프로퍼티를 갖고 greet 메서드를 갖는 객체로 구현되어야 함을 나타낸다...'
socialImage: '/media/image-2.jpg'
---

> **[유데미 TYPESCRIPT](https://www.udemy.com/course/understanding-typescript/learn/lecture/)** 수업을 듣고 정리한 내용입니다.

## Intersection types

타입스크립트 Intersection 타입은 객체를 다룰 때 특히 유용하다. 다음의 예시와 같이 Admin, Employee 객체 타입의 프로퍼티를 모두 갖는 ElevatedEmployee 타입을 Intersection을 사용하여 정의할 수 있다.

```typescript
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Louies',
  startDate: new Date(),
  privileges: ['create-server']
};
```

## Type guards

### 객체 타입 가드

다음과 같이 위 예시의 Admin과 Employee를 가져와 UnknownEmployee 라는 새로운 객체 타입을 정의했다.

```typescript
type UnknownEmployee = Employee | Admin;
```

UnknownEmployee 타입 객체의 정보를 출력하는 printEmployeeInformation 함수에서 다음과 같이 정보를 출력하면 에러가 발생한다. UnknownEmployee 타입의 객체는 Employee와 Admin 의 유니온 타입이기 때문에 UnknownEmployee 타입의 객체에 privileges 또는 startDate 프로퍼티가 확실하게 있는지를 보장할 수 없기 때문이다.

```typescript
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);
  console.log(emp.privileges); // 에러발생
  console.log('Start Date: ' + emp.startDate); // 에러발생
}
```

이때는 printEmployeeInformation 함수를 다음과 같이 구성하여 일종의 타입을 보호하는 역할을 할 수 있다. 해당 프로퍼티가 있을 때만 해당 프로퍼티의 정보를 출력하게끔 하는 것이다.

```typescript
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);
  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges);
  }

  if ('startDate' in emp) {
    console.log('Start Date: ' + emp.startDate);
  }
}

printEmployeeInformation(e1);
printEmployeeInformation({ name: 'Gina', startDate: new Date() });
```

### 클래스 타입 가드

아래의 예시에서 Vehicle 이라는 Car 클래스와 Truck 클래스의 유니온 타입 클래스를 정의했다. loadCargo 라는 메서드는 Truck 클래스의 인스턴스만 가지고 있기 때문에 useVehicle 함수에서 인자로 들어오는 객체가 인스턴스화 된 클래스가 어떤 클래스인지 조건을 검사하여 Truck의 인스턴스일 때만 해당 메서드를 사용할 수 있게끔 할 수 있다.

```typescript
class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo ... ' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);
```

위의 예시에서 useVehicle 함수를 다음과 같이 객체의 프로퍼티를 검사하는 것처럼 해도 정상적으로 동작한다.

```typescript
function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if ('loadCargo' in vehicle) {
    vehicle.loadCargo(1000);
  }
}
```

### 유니온 객체 타입 가드

```typescript
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving at speed: ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });
```

## 인덱스 프로퍼티

인덱스 프로퍼티는 해당 객체의 프로퍼티의 이름과 프로퍼티의 갯수가 확정되지 않을 때 사용하면 유용하다. 다음과 같이 프로퍼티 명의 타입과 프로퍼티 값의 타입만 지정해주면 된다. `[prop: string]` 의 prop은 개발자가 편한대로 지정해줘도 된다.

```typescript
interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email!',
  username: 'Must start with a capital character!'
};
```
