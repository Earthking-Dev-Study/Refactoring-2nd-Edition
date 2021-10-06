## [7-1] 레코드 캡슐화하기 (Encapsulate Record)

### Before

```javascript
organization = {name: '김태희', country: 'GB'};
```

### After

```javascript
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  } 
  
  get name() { return this._name; }
  set name(arg) { this._name = arg; }
  get country() { return this._country; }
  set country(arg) { this._country = arg; }
}
```

## [7-2] 컬렉션 캡슐화하기

### Before
```javascript
class Person {
  get course() { return this._courses; }
  set courses(aList) { this._courses = aList; }
}
```

### After
```javascript
class Person {
  get course() { return this._courses.slice(); }
  addCourse(aCourse) { ... }
  removeCourse(aCourse) { ... }
}
```

컬렉션 변수로의 접근을 캡슐화하면서 게터가 컬렉션 자체를 반환하도록 한다면, 그 컬렉션을 감싼 클래스가 눈치채지 못하는 상태에서 컬렉션의 원소들이 바뀌어버릴 수 있다. 이러한 문제를 방지하기 위해 컬렉션을 감싼 클래스에 흔히 `add()`와 `remove()`라는 컬렉션 변경자 메서드를 만들고 `getter`에는 컬렉션을 `slice()`하여 반환해준다.

이렇게 항상 컬렉션을 소유한 클래스를 통해서만 원소를 변경하도록 하면 프로그램을 개선하면서 컬렉션 변경 방식도 원하는 대로 수정할 수 있다.

## [7-3] 컬렉션 캡슐화하기

### Before
```javascript
orders.filter(o => "high" === o.priority
                || "rush" === o.priority)
```

### After

```javascript
orders.filter(o => o.priority.higherThan(new Priority("normal")));
```

## [7-4] 임시 변수를 질의 함수로 바꾸기

### Before
```javascript
const basePrice = this._quantity * this._itemPrice;
if(basePrice > 1000) {
  return basePrice * 0.95;
else
  return basePrice * 0.98;
}
```

### After
```javascript
get basePrice() { this._quantity * this._itemPrice; }
...
if (this.basePrice > 1000)
  return this.basePrice * 0.95;
else
  return this.basePrice * 0.98;
```

함수 안에서 어떤 코드의 결괏값을 뒤에서 다시 참조할 목적으로 임시 변수를 쓰기도 한다. 임시 변수를 사용하면 값을 계산하는 코드가 반복되는 걸 줄이고 (변수 이름을 통해) 값의 의미를 설명할 수도 있어서 유용하다. 그런데 한 걸은 더 나아가 아예 함수로 만들어 사용하는 편이 나을때가 많다.

긴 함수의 한 부분을 별도 함수로 추출하고자 할 때 먼저 변수들을 각각의 함수로 만들면 일이 수월해진다. 추출한 함수에 변수를 따로 전달할 필요가 없어지기 때문이다. 또한 이 덕분에 추출한 함수와 원래 함수의 경계가 더 분명해지기도 하는데, 그러면 부자연스러운 의존 관계나 부수효과를 찾고 제거하는 데 도움이 된다.

변수 대신 함수로 만들어두면 비슷한 계산을 수행하는 다른 함수에서도 사용할 수 있어 코드 중복이 줄어든다.

이번 리팩토링은 클래스 안에서 적용할 때 효과가 가장 크다. 클래스는 추출할 메서드들에 공유 컨텍스트를 제공하기 때문이다.

## [7-5] 클래스 추출하기

### Before

```javascript
class Person {
  get officeAreaCode() { return this._officeAreaCode; }
  get officeNumber() { return this._officeNumber; }
}
```

### After

```javascript
class Person {
  get officeAreaCode() { return this._telephoneNumber.areaCode; }
  get officeNumber() { return this._telephoneNumber.number; }
}

class TelephoneNumber {
  get areaCode() { return this._areaCode; }
  get number() { return this._number; }
}
```

일부 데이터와 메서드를 따로 묶을 수 있다면 어서 분리하라는 신호이다.

함께 변경되는 일이 많거나 서로 의존하는 데이터들도 분리한다.

특정 데이터나 메서드 일부를 제거하면 어떤 일이 일어나는지 자문해보면 판단에 도움이 된다.

제거해도 다른 필드나 메서드 들이 논리적으로 문제가 없다면 분리할 수 있다는 뜻이다.

## [7-6] 클래스 인라인하기

### Before

```javascript
class Person {
  get officeAreaCode() { return this._telephoneNumber.areaCode; }
  get officeNumber() { return this._telephoneNumber.number; }
}

class TelephoneNumber {
  get areaCode() { return this._areaCode; }
  get number() { return this._number; }
}
```

### After
```javascript
class Person {
  get officeAreaCode() { return this._officeAreaCode; }
  get officeNumber() { return this._officeNumber; }
}
```

1. 쿨랴수 츄츌허가룰 거꾸로 돌리는 리팩터링이다.

더 이상 제 역할을 못해서 그대로 두면 안되는 클래스는 인라인 해버린다.

역할을 옮기는 리팩터링을 하고나니 특정 클래스에 남은 역할이 거의 없을 때 이런 현상이 자주 생긴다.

이럴 땐 이 불쌍한 클래스를 가장 많이 사용하는 클래스로 흡수시키자.

1. 두 클래스의 기능을 지금과 다르게 배분하고 싶을 때도 클래스를 인라인한다.

클래스를 인라인해서 하나로 합친 다음 새로운 클래스를 추출하는게 쉬울 수도 있기 때문이다.

## 7장 토론

### 236쪽 아래부분 [7-1] 레코드 캡슐화하기

> 계산해서 얻을수 있는 값과 그렇지 않은 값을 명확히 구분해 저장해야 하는 점이 번거롭다.
 
```javascript
// 1
{ start: 1, end: 5},

// 2
{ start:1, length: 5 },

// 3
{ end: 5, length: 5 }
```

이렇게 정보를 저장하게되면 1번같은경우에는 `계산해서 얻을수 있는 값`은 length(길이)가 되고

2번같은경우는 end, 3번같은경우는 start가 된다. 이렇게 계산해서 얻을수 있는 값(레코드의 필드에 나와있지 않은 값, 가령 1번의 길이와 같음)과 계산하지 않아도 되는 값, 레코드의 필드로서 실제로 존재하는 값들(1번같은 경우 start,end가 해당)을 명확히 우리가 `알고, 구분해야` 한다.

그럼 이것을 사용하는 클라이언트의 경우 계산해야하는 값, 계산하지않아도 되는 값을 신경써서 개발을 진행해야한다.

여기까지 이러한 데이터를 `레코드로 저장`할때 이고, 객체를 사용하면 이러한 점을 극복 할수 있다.

객체를 사용하게되면 가변 데이터를 저장해도 이러한 데이터를 어떻게 저장했는지 숨긴 채 세 가지 값을 각각의 메서드로 제공할 수 있으므로 사용하는 클라이언트 입장에서도 미리 준비된 메서드를 사용 하기만 하면된다.

이는 제공자 입장에서도 만들어 놓기만 하면되고, 사용자 입장에서는 가져다 쓰기만하면되므로 상당히 편하고 레코드의 약점을 극복할수 있다. 아래의 실제 예를 통해 이 말을 더 잘 이해해보자.

```javascript
// 제공자
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  } 
  
  get start() {
    return start;
  }
  
  get end() {
    return end;
  }
  
  // 제공자가 length getter를 만들어 놓기만 하면 제공자와 사용자가 둘다 편해진다.
  get length() {
    return end - start;
  }
}
```

이렇게 start와 end만 알면 length또한 자동적으로 알수있다.

### 237 윗 부분 [7-1] 레코드 캡슐화하기

> 캡슐화하면 이름을 바꿀때도 좋다. 필드 이름을 바꿔도 기존 이름과 새 이름 모두를 각각의 메서드로 제공할 수 있다.
 
```javascript
class Range {
  // 위의 내용과 동일
  
  get length() {
    return end - start;
  }
  
  get renameLength() {
    return end - start;
  }
}
``` 

이렇게 length를 renameLength로 이름을 변경할때도 한번에 모두 바꾸지 않고 점진적으로 renameLength로 이름을 바꿀수 있다.


### 243 프록시 [7-1] 연습문제 중간 ~ 끝

> 데이터 구조의 읽기전용 프락시를 반환하는 방법도 있다. 클라이언트에서 내부 객체를 수정하려면 프락시가 예외를 던지도록 하는 것이다. ...(중략) 그래서 독자에게 연습문제로 남겨 두겠다. 또한 복제본을 만들고 이를 재귀적으로 동결([freeze](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze))해서 쓰기 동작을 감지하는 방법도 있다.

### 244 [7-1] 처음부분

> 이 방법의 가장 큰 장점은 customerData의 모든 쓰임을 명시적인 API로 제공한다는 것이다. 이 클래스만 보면 데이터 사용 방법을 모두 파악할 수 있다. 하지만 읽는 패턴이 다양하면 그만큼 작성할 코드가 늘어난다.

최근에 GraphQL 개념만 알아봤는데 REST API의 단점이 비슷비슷한 API가 많아지면 오히려 클라이언트가 API를 이용하기에 어렵다라는 단점때문에 GraphQL이 탄생했다는 글을 봤는데 이것도 좀 비슷한 맥락인것 같아서 토론 내용에 넣게되었다.

저렇게 제공하는 getter가 많아지면 좋기야좋은데 나중에 엄청많아지면 그건 또 그거대로 문제다.

### 244 [7-1] 마지막부분

> 바로 눈에 띄는 문제는 데이터 구조가 클수록 복제 비용이 커져서 성능이 느려질 수 있다는 것이다.

복제하려는 데이터의 Deep이 높을수록 비용은 더 많이 들수밖에없는데 무조건 `get rawData`는 무조건 cloneDeep한 객체를 반환해주고있다.

### 245 [7-1] 처음부분

> 클라이언트가 원본을 수정한다고 착각할 수 있는데 이럴때는 읽기전용 프락시를 제공하거나 복제본을 동결시켜서 데이터를 수정하려 할 때 에러를 던지도록 만들 수 있다.

이런경우도 있구나..

### 247 [7-2] 처음~중간

> 내부 컬렉션을 직접 수정하지 못하게 하는 방법중 하나로, 절대로 컬렉션 값을 반환하지 않게 할 수 있다. 컬렉션에 접근하려면 컬렉션이 소속된 클래스의 적절한 메서드를 반드시 거치게 하는것이다. 예컨대 aCustomer.orders.size()처럼 접근하는 코드를 aCustomer.numberOfOrders()로 바꾸는 것이다. 나는 이 방식에 동의하지 않는다. 최신 언어는 다양한 컬렉션 클래스들을 표준화된 인터페이스로 제공하며, 컬렉션 파이프라인(Collection Pipeline)과 같은 패턴을 적용하여 다채롭게 조합할 수 있다. 표준 인터페이스 대신 전용 메서들을 사용하게 하면 부가적인 코드가 상당히 늘어나며 컬렉션 연산들을 조합해 쓰기도 어려워진다.

- [Martin Fowler Collection Pipe](https://martinfowler.com/articles/collection-pipeline/)

- [About Collection Pipe](https://greedy0110.tistory.com/55)

우리는 컬렉션 파이프 `filter`, `reduce`, `map`들을 이용하여 컬렉션을 다양하게 조작할수 있다.

하지만 저렇게 우리가 정의한 메서드(aCustomer.numberOfOrders())를 사용하면 Pipe를 사용할수 없다.

### 247 [7-2] 끝부분

> 한편, 프락시 방식에서는 원본 데이터를 수정하는 과정이 겉으로 드러나지만 복제 방식에서는 그렇지 않다는 차이도 있다.
 
내가만든 `chapter7/proxy.js`를 보면 데이터를 수정하는 Set부분의 내용이 겉으로 다 드러나는데

`cloneDeep`함수는 어떻게 클론하는지가 겉으로 보이지는 않는다 이걸말하는건가 ?


### 255 [7-3] 더 가다듬기 토론




## 용어

### Collection Pipes

> Collection pipelines are a programming pattern where you organize some computation as a sequence of operations which compose by taking a collection as output of one operation and feeding it into the next. (Common operations are filter, map, and reduce.) This pattern is common in functional programming, and also in object-oriented languages which have lambdas. This article describes the pattern with several examples of how to form pipelines, both to introduce the pattern to those unfamiliar with it, and to help people understand the core concepts so they can more easily take ideas from one language to another.
