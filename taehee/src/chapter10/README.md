## [10-1] 조건문 분해하기

```javascript
if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd))
  chdarge = quantity * plan.summerRate;
else
  charge = quantity * plan.regularRate + plan.regularServiceCharge;
```

```javascript
if (summer())
  charge = summerCharge();
else
  charge = regularCharge();
```
