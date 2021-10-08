## [8-1] 함수 옮기기

### Before

```javascript
class Account {
  get overdraftCharge() { ... }
}
```

### After

```javascript
class AccountType {
  get overdraftCharge() { ... }
}
```

좋은 소프트 웨어 설계의 핵심은 모듈화가 얼마나 잘 되어있느냐를 뜻하는 모듈성이다.

모듈성이란 프로그램의 어딘가를 수정하려 할 때 해당 기능과 깊이 관련된 작은 일부만 이해해도 가능하게 해주는 능력이다.

모듈성을 높이려면 서로 연관된 요소들을 함께 묶고, 요소 사이의 연결 관계를 쉽게 찾고 이해할 수 있도록 해야 한다. 

어떤 함수가 자신이 속한 모듈 A의 요소들보다 다른 모듈 B의 요소들을 더 많이 참조한다면 모듈 B로 옮겨줘야 마땅하다.

이와 비슷하게, 호출자들의 현재 위치(호출자가 속한 모듈)나 다음 업데이트 때 바뀌리라 예상되는 위치에 따라서도 함수를 옮겨야 할 수 있다.

예컨데 다른 함수 안에서 도우미 역할로 정의된 함수 중 독립적으로도 고유한 가치가 있는 것은 접근하기 더 쉬운 장소로 옮기는 게 낫다.

함수를 옮길지 말지를 결정하는건 쉽지 않다. 그럴 땐 대상 함수의 현재 컨텍스트와 후보 컨텍스트를 둘러보면 도움이 된다. 대상 함수를 호출하는 함수들은 무엇인지, 대상 함수가 호출하는 함수들은 또 무엇이 있는지, 대상 함수가 사용하는 데이터는 무엇인지를 살펴봐야 한다.

## [8-2] 필드 옮기기

### Before

```javascript
class Customer {
  get plan() { return this._discountRate; }
}
```

```javascript
class Customer {
  get plan() { return this._plan; }
  get discountRate() { return this._plan.discountRate; }
}
```

## [8-3] 문장을 함수로 옮기기

### Before
```javascript
result.push(`<p>제목: ${person.photo.title}</p>`);
result.concat(photoData(person.photo));

function photoData(aPhoto) {
  return [
    `<p>위치: ${aPhoto.location}</p>`,
    `<p>날짜: ${aPhoto.date.toDateStrint()}</p>`,
  ];
}
```

### After

```javascript
result.concat(photoData(person.photo));
function photoData(aPhoto) {
  return [
    `<p>제목 : ${aPhoto.title}</p>`,
    `<p>위치 : ${aPhoto.location}</p>`,
    `<p>날짜 : ${aPhoto.date.toDateString()}</p>`,
  ]
}
```

## [8-4] 문장을 호출한 곳으로 옮기기

### Before

```javascript
emitPhotoData(outStream, person.photo);
function emitPhotoData(outStream, photo) {
  outStream.write(`<p>제목: ${photo.title}</p>\n`);
  outStream.write(`<p>위치: ${photo.location}</p>\n`);
}
```

### After
```javascript
emitPhotoData(outStream, person.photo);
outStream.write(`<p>위치: ${person.photo.location}</p>\n`);

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>제목: ${photo.title}</p>\n`);
}
```

함수는 프로그래머가 쌓아 올리는 추상화의 기본 빌딩 블록이다.

함수가 초기에는 응집도 높고 한 가지 일만 수행하다가 갑자기 둘 이상의 다른 일을 수행 해버리면 문제가 될 여지가 많다.

이러한 일은 여러 곳에서 사용하던 기능이 일부 호출자에게는 다르게 동작하도록 바뀌어야 할때 발생한다.

## [8-5] 인라인 코드를 함수 호출로 바꾸기

### Before

```javascript
let appliesToMass = false;
for (const s of states) {
  if (s === 'MA') appliesToMass = true;
}
```

```javascript
appliesToMass = states.includes("MA");
```

## [8-6] 문장 슬라이드하기

### Before 
```javascript
const pricingPlan = retrievePricingPlan();
const order = retreiverOrder();
let charge;
const chargePerUnit = pricingPlan.unit;
```

### After

```javascript
const pricingPlan = retrievePricingPlan();
const chargePerUnit = pricingPlan.unit;
const order = retreiveOrder();
let charge;
```

관련된 코드들이 가까이 모여 있다면 이해하기가 더 쉽다. 예컨대 하나의 데이터 구조를 이용하는 문장들은 (다른 데이터를 이용하는 코드 사이에 흩어져 있기보다는 ) 한데 모여 있어야 좋다.

코드 조각을 슬라이드할 때는 무엇을 슬라이드할지와 슬라이드할수있는지 여부 이 두개를 고려해야한다.

## [8-7] 반복문 쪼개기

### Before

```javascript
let averageAge = 0;
let totalSalary = 0;
for (const p of people) {
  averageAge += p.age;
  totalSalary += p.salary;
}
averageAge = averageAge / people.length;
```

### After

```javascript
let totalSalary = 0;
for (const p of people) {
  totalSalary += p.salary;
}

let averageAge = 0;
for (const p of people) {
  averageAge += p.age;
}
averageAge = averageAge / people.length;
```

## [8-8] 반복문을 파이프라인으로 바꾸기

### Before
```javascript
const names = [];
for (const i of input) {
  if (i.job === 'programmer')
    name.push(i.name);
}
```

### After
```javascript
const names = input
                .filter(i => i.job === 'programmer')
                .map(i => i.name);
```

