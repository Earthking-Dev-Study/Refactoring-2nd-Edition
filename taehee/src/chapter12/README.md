## [12-1] 메서드 올리기

### Before

```typescript
class Employee { ... }

class Salesperson extends Employee {
  get name() { ... }
}

class Engineer extends Employee {
  get name() { ... }
}
```

### After

```typescript
class Employee {
  get name() { ... }
}

class Salesperson extends Employee { ... }
class Engineer extends Employee { ... }
```

무언가 중복되었다는 것은 한쪽의 변경이 다른 쪽에는 반영되지 않을 수 있다는 위험을 항상 수반한다.


## [12-2] 필드 올리기

### Before

```java
class Employee { ... }

class Salesperson extends Employee {
    private String name;
}

class Engineer extends Employee {
    private String name;
}
```

### After

```typescript
class Employee {
  protected String name;
}

class Salesperson extends Employee { ... }
class Engineer extends Employee { ... }
```

해당 리팩토링으로 데이터 중복 선언을 없앨 수 있고, 해당 필드를 사용하는 동작을 서브클래스에서 슈퍼클래스로 옮길 수 있다.

## [12-3] 생성자 본문 올리기

### Before

```typescript
class Party {
...
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super();
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
}
```

### After

```typescript
class Party {
  constructor(name) {
    this._name = name;
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super();
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
}
```

## [12-4] 메서드 내리기

### Before
```typescript
class Employee {
  get quota { ... }
}

class Engineer extends Employee { ... }
class Salesperson extends Employee { ... }
```

### After

```typescript
class Employee { ... }

class Engineer extends Employee { ... }
class Salesperson extends Employee { 
  get quota { ... }
}
```

## [12-5] 필드 내리기

### Before

```typescript
class Employee {
  private String quota;
}

class Engineer extends Employee { ... }
class Salesperson extends Employee { ... }
```

### After

```typescript
class Employee { ... }

class Engineer extends Employee { ... }
class Salesperson extends Employee { 
  protected String quota;
}
```

## [12-6] 타입 코드를 서브클래스로 바꾸기

### Before

```typescript
function createEmployee(name, type) {
  return new Employee(name, type);
}
```

### After

```typescript
function createEmployee(name, type) {
  switch (type) {
    case "engineer": return new Engineer(name);
    case "salesperson": return new Salesperson(name);
    case "manager": return new Manager(name);
  }
}
```


## [12-7] 서브클래스 제거하기

### Before

```typescript
class Person {
  get genderCode() { return "X"; }
}

class Male extends Person {
  get genderCode() { return "M"; }
}

class Female extends Person {
  get genderCode() { return "F"; }
}
```

### After

```typescript
class Person {
  get genderCode() {
    return this._genderCode;
  }
}
```
