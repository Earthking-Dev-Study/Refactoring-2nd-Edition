## [11-1] 질의 함수와 변경 함수 분리하기

### Before

```javascript
function getTotalOutstandingAndSendBill() {
  const result = customer.invoices.reduce((total, each) => each.amount + total, 0);
  sendBill();
  return result;
}
```

### After

```shell
function totalOutstanding() {
    return customer.invoices.reduce((total, each) => each.amount + total, 0);
}

function sendBill() {
    emailGateway.send(formatBill(customer));
}
```

## [11-2] 함수 매개변수화하기

### Before

```javascript
function tenPercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.1);
}

function fivePercentRaise(aPerson) {
    aPerson.salary = aPerson.multiply(1.05);
}
```

### After

```javascript
function raise(aPerson, factor) {
    aPerson.salary = aPerson.salary.multiply(1 + factor);
}
```

## [11-3] 플래그 인수 제거하기

### Before

```javascript
function setDimension(name, value) {
  if (name === 'height') {
    this._height = value;
    return;
  }
  if (name === 'width') {
    this._width = value;
    return;
  }
}
```

### After

```javascript
function setHeight(value) { this._height = value; }

function setWidth (value) { this._width = value; }
```

> 플래그 인수(flag argument)란 호출되는 함수가 실행할 로직을 호출하는 쪽에서 선택하기 위해 전달 하는 인수다.

## [11-4] 객체 통째로 넘기기

### Before

```javascript
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (aPlan.withinRange(low, hight))
```

### After

```javascript
if (aPlan.withinRange(aRoom.daysTempRange))
```

## [11-5] 매개변수를 질의 함수로 바꾸기

### Before

```javascript
availableVacation(anEmployee, anEmployee.grade);

function availableVacation(anEmployee, grade) {
  // 연휴 계산 ...
}
```

### After

```javascript
availableVacation(anEmployee)

function availableVacation(anEmployee) {
  const grade = anEmployee.grade;
  // 연휴 계산...
}
```

## [11-6] 질의 함수를 매개변수로 바꾸기

### Before

```javascript
targetTemperature(aPlan)

function targetTemperature(aPlan) {
  currentTemperature = thermostat.currentTemperature;
  // 생략
}
```

### After

```javascript
targetTemperature(aPlan, thermostat.currentTemperature)

function targetTemperature(aPlan, currentTemperature) {
  // 생략
}
```

## [11-7] 세터 제거하기

### Before

```javascript
class Person {
  get name() { ... }
  set name(aString) { ... }
}
```

### After

```javascript
class Person {
  get name() { ... }
}
```

## [11-8] 생성자를 팩터리 함수로 바꾸기

### Before
```javascript
leadEngineer = new Employee(document.leadEngineer, 'E');
```

### After

```javascript
leadEngineer = createEngineer(document.leadeEngineer);
```

## [11-9] 함수를 명령으로 바꾸기

### Before

```javascript
function score(candidate, medicalExam, scoringGuide) {
  let result = 0;
  let healthLevel = 0;
}
```

### After

```javascript
class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }
  
  execute() {
    this._result = 0;
    this._helathLevel = 0;
    // 긴 코드 생략
  }
}
```
