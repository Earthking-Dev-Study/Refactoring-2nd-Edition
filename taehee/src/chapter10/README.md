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

