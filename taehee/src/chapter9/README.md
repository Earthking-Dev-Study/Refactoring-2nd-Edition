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


