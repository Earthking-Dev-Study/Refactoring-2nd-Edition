## [10-1] 조건문 분해하기

### Before
```javascript
if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd))
  chdarge = quantity * plan.summerRate;
else
  charge = quantity * plan.regularRate + plan.regularServiceCharge;
```

### After
```javascript
if (summer())
  charge = summerCharge();
else
  charge = regularCharge();
```

## [10-2] 조건식 통합하기

### Before

```javascript
if (anEmployee.seniority < 2) return 0;
if (anEmployee.monthsDisabled > 12) return 0;
if (anEmployee.isPartTime) return 0;
```

### After

```javascript
if (isNotEligibleForDisability()) return 0;

function isNotEligibleForDisability() {
  return ((anEmployee.seniority < 2)
|| (anEmployee.monthsDisabled > 12)
|| (anEmployee.isPartTime))
}
```

## [10-3] 중첩 조건문을 보호 구문으로 바꾸기

### Before

```javascript
function getPayAmount() {
  let result;
  if (isDead) {
    result = deadAmount();
  }else {
    if (iesSeparated)
      result = separatedAmount();
    else
      result = normalPayAmount();
  }
}
```

### After

```javascript
function getPayAmount() {
  if (isDead) return deadAmount();
  if (isSeparated) return separatedAmount();
  if (isRetired) return retiredAmount();
  return normalPayAmount();
}
```

## [10-4] 조건부 로직을 다형성으로 바꾸기

### Before
```javascript
switch (bird.type) {
  case '유럽 제비':
    return '보통이다.';
  case '아프리카 제비':
    return (bird.numberOfCoconuts > 2) ? '지쳤다' : '보통이다';
  case '노르웨이 파랑 앵무':
    return (bird.voltage > 100) ? '그을렸다' : '예쁘다';
  default:
    return '알 수 없다';
}
```

### After

```javascript
class EuropeanSwallow {
  get plumage() {
    return '보통이다';
  }
}

class AfricanSwallow {
  get plumage() {
    return (this.numberOfCoconuts > 2) ? '지쳤다' : '보통이다';
  }
}

class NorwegianBlueParror {
  get plumage() {
    return (this.voltage > 100) ? '그을렸다' : '예쁘다';
  }
}
```

## [10-5] 특이 케이스 추가하기

### Before

```javascript
if (aCustomer === '미확인 고객') customerName = '거주자';
```

### After

```javascript
class UnknownCustomer {
  get name() { return "거주자"; }
}
```

## [10-6] 어서션 추가하기

### Before

```javascript
if (this.discountRate)
  base = base - (this.discountRate * base);
```

### After

```javascript
assert(this.discountRate >= 0);
if (this.discountRate)
  base = base - (this.discountRate * base);
```
