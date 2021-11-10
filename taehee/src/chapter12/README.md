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



