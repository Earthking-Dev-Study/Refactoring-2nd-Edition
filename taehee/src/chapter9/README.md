## [9-1] 변수 쪼개기

### Before

```javascript
let temp = 2 * (height + width);
console.log(tmp);
temp = height * width;
console.log(tmp);
```

### After

```javascript
const perimeter = 2 * (height + width);
console.log(perimeter);
const area = height * width;
console.log(area);
```

변수에는 한번 대입하면 그 다음에는 대입하면 안된다 어디서 대입할지도 모르는건데 그걸 대입하면 처음 선언한 부분의 값으로 모든 로직을 생각하면 최종적으로는 내가 예상한 결과와 다를수 있기때문이다.

## [9-2] 필드 이름 바꾸기

### Before

```javascript
class Organization {
  get name() { ... }
}
```

```javascript
class Organization {
  get title() { ... }
}
```

Getter와 Setter는 클래스 사용자 입장에서는 필드와 다를 바 없다.

```javascript
this._title = (data.title !== undefined) ? data.title : data.name
```

불변 데이터 구조가 널리 쓰이게 된 이유가 이러한 리팩토링을 할때 만약 리팩토링할게 많다면 그만큼 변경해야하는것도 많아진다 이 과정중에 실수가 일어날수 있으므로 이러한 이유도 한몫한다.

## [9-3] 파생 변수를 질의 함수로 바꾸기

### Before
```javascript
get discountedTotal() { return this._discountedTotal; }
set discount(aNumber) {
  const old = this._discount;
  this._discount = aNumber;
  this._discountedTotal += old - aNumber;
}
```

### After

```javascript
get discountedTotal() { return this._baseTotal - this._discount; }

set discount(aNumber) { this._discount = aNumber; }
```

## [9-4] 참조를 값으로 바꾸기

### Before

```javascript
class Product { 
  applyDiscount(arg) { this._price.amount -= arg; }
}
```

```javascript
class Product {
  applyDiscount(arg) {
    this._price = new Money(this._price.amount - arg, this._price.currency);
  }
}
```

#### equals 함수
```javascript
equals(other) {
  if (!(other instanceof TelephoneNumber)) return false;
  return this.areaCode === other.areaCode && this.number === other.number;
}
```

#### 테스팅
```javascript
it('telephone equals', () => {
  assert(new TelephoneNumber("123", "123-123").equals(TelephoneNumber("123", "123-123")))
}); 
```

## [9-5] 값을 참조로 바꾸기

### Before
```javascript
let customer = new Customer(customerData);
```

### After
```javascript
let customer = customerRepository.get(customerData.id);
```

항상 물리적으로 똑같은 고객 객체를 사용하고 싶다면 먼저 이 유일한 객체를 저장해둘 곳이 있어야 한다. 객체를 어디에 저장해야 할지는 애플리케이션에 따라 다르겠지만, 간단한 상황이라면 나는 저장소 객체(Repository Object)를 사용하는 편이다.

```javascript
let _repositoryData;

export function initialize() {
  _repositoryData = {};
  _repositoryData.customers = new Map();
}

export function registerCustomer(id) {
  if (! _repositoryData.customers.has(id)) _repositoryData.customers.set(id, new Customer(id));
  return findCustomer(id);
}

export function findCustomer(id) {
  return _repositoryData.customers.get(id);
}
```

## [9-6] 매직 리터럴 바꾸기

### Before
```javascript
function potentialEnergy(maxx, height) {
  return mass * 9.81 * height;
}
```

### After
```javascript
const STANDARD_GRAVITY = 9.81;
function potentialEnergy(mass, height) {
  return mass * STANDARD_GRAVITY * height;
}
```


