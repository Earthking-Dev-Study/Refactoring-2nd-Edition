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
