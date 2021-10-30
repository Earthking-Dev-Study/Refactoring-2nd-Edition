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

