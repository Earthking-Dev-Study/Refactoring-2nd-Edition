## 6장

`함수 추출하기` <-> `함수 인라인하기`

`변수 추출하기` <-> `변수 인라인하기`

### 6-1 함수 추출하기

### 함수 추출하기 대표 코드

#### Before
```javascript
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();
  
  // 세부 사항 출력
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
}
```

#### After

```javascript
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();
  printDetails(outstanding);
  // 세부 사항 출력
  function printDetails(outstanding) {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);    
  }
}
```

이렇게 함수 추출하기를 진행하고나면 printDetails가 printOwing 밖에 있다는 가정하에printOwing의 indent가 1로 줄어들었다.

### 함수 추출하기 기준

정해져 있지는 않지만 내가 기준을 정하기에 도움이되는 책에서 나온 기준들을 나열했다.

- 함수 하나가 한 화면을 넘어가면 안된다.

- 재사용성을 기준으로 할수도 있다.

- 두번 이상 사용될 코드는 함수로 만들고, 한 번만 쓰이는 코드는 인라인 상태로 놔둔다.

저자가 추천하는 기준은 `목적과 구현을 분리`하는 방식을 추천한다.

#### 목적과 구현을 분리

코드를 보고 무슨 일을 하는지 파악하는 데 한참이 걸린다면 그 부분을 함수로 추출한 뒤 `무슨 일`에 걸맞는 이름을 짓는다. 이렇게 해두면 나중에 코드를 다시 읽을 때 함수의 목적이 눈에 확 들어오고, 본문 코드(그 함수가 목적을 이루기 위해 구체적으로 수행하는 일)에 대해서는 더 이상 신경 쓸 일이 거의 없어진다.

#### 함수를 아주 짧게, 대체로 단 몇 줄만 담기

함수 안에 들어갈 코드가 5~6줄이 넘어갈때부터 슬슬 리팩터링을 해야겠다라는 생각이 든다

단 한줄짜리 함수를 만드는 일도 적지 않다.

화면에서 텍스트나 그래픽을 강조하는 색상 반전 함수를 highlight()메서드 안에는 reverse()라는 아래와 같이 메서드만을 호출하고 있는데 메서드 이름이 구현 코드보다 길다. 하지만 이건 문제가 되지 않고, 코드의 목적(강조, hightlight)과 구현(반전, reverse) 사이의 차이가 그만큼 크기 때문에 이렇게 작성해주었다.

```javascript
function hightlight() {
  reverse()
}
```

옛날이야 함수 호출이 많아지면 성능이 느려질까 걱정했지만 요즘은 함수가 짧으면 캐싱하기가 더 쉽다.

### 함수 이름을 지을 때 참고사항

1. 함수를 새로 만들고 목적을 잘 드러내는 이름을 붙인다('어떻게'가 아닌 '무엇을' 하는지가 드러나야한다.)

> 대상 코드가 함수 호출문 하나처럼 매우 간단하더라도 함수로 뽑아서 목적이 더 잘 드러나는 이름을 붙일 수 있다면 추출하고, 이름이 안떠오른다면 함수로 추출하면 안된다는 신호이다. 근데 추출과정속에서 더 좋은 이름이 떠오를 수도 있는거니까 처음부터 최선의 이름부터 짓고 시작할 필요는 없다. 일단추출해서 사용하다가 별로면 다시 인라인시킨다. 이 과정중에 깨달음이 있다면 시간 낭비가 아니다. 중첩 함수를 지원하는 언어를 사용한다면 추출한 함수를 원래 함수 안에 중첩시킨다. 다시 바깥으로 꺼내야한다면 언제든 함수 옮기기(8.1)를 적용하면 된다.

1. 추출할 코드를 원본 함수에서 복사하여 새 함수에 붙여넣는다.

1. 추출한 코드 중 원본 함수의 지역 변수를 참조하거나 추출한 함수의 유효범위를 벗어나는 변수는 없는지 검사하며 있다면 매개변수로 전달한다.
    1. 원본 함수의 중첩 함수로 추출할 때는 이런 문제가 생기지 않는다.
    1. 추출한 코드에서만 사용하는 변수가 추출한 함수 밖에 선언되어 있다면 추출한 함수 안에서 선언하도록 수정한다.

매개변수로 들어온 변수에 직접 값 변경을 하는것은 매우 위험하다. 한개의 변수는 한개의 기능을해야한다.

만약 한개의 변수에 다른 값들을 많이 대입하게되면 코드를 보는사람에게 혼란을 줄수 있기때문이다.


## 6-2 함수 인라인하기

### Before
```javascript
function moreThanFiveLateDeliveries(driver) {
    return driver.numberOfLateDeliveries > 5;
}

function getRating(driver) {
    return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}
```


### After
```javascript
function getRating(driver) {
    return (driver.numberOfLateDeliveries > 5) ? 2 : 1;
}
```

> 목적이 분명히 드러나는 이름의 짤막한 함수를 이용하기를 권하지만 함수 본문이 이름만큼 명확한 경우도 있다. 이럴 때는 그 함수를 제거한다. 간접 호출은 유용할 수도 있지만 쓸데없는 간접 호출은 거슬린다.

여러개의 라인을 인라인 할때는 한라인씩 하는게 좋다 그래야 실수가 없다.

## 6-3

### Before

```javascript
return order.quantity * order.itemPrice -
      Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
      Math.min(order.quantity * order.itemPrice * 0.1, 100);
```

### After
```javascript
const basePrice = order.quantity * order.itemPrice;
const quantityDiscount = Math.max(0, order.quantity - 500)
                          * order.itemPrice * 0.05;
const shipping = Math.min(basePrice * 0.1, 100);
return basePrice - quantityDiscount + shipping;
```

표현식이 너무 복잡하여 이해하기 여러울때 지역 변수를 사용하여 표현식을 쪼개 관리하기 더 쉽게 만들 수 있다.

이 과정에서 추가한 변수는 디버깅에도 도움이 된다. 디버거에 중단점을 지정하거나 상태를 출력하는 문장을 추가할 수 있기 때문이다.

현재 함수 안에서만 변수의 이름이 의미가 있다면 변수로 추출하는것이 좋다. 그러나 함수를 벗어난 넓은 문맥에서까지의 의미가 있다면 그 넓은 범위에서 통용되는 이름을 생각해야하며 변수가 아닌 (주로) 함수로 추출해야 한다.

## 6-4 변수 인라인하기


### Before

```javascript
let basePrice = anOrder.basePrice;
return (basePrice > 100);
```

### After

```javascript
return anOrder.basePrice > 1000;
```

변수는 함수 안에서 표현식을 가리키는 이름으로 쓰이며, 대체로 긍정적인 효과를 준다. 하지만 그 이름이 원래 표현식과 다를 바 없을 때도 있다. 또 변수가 주변 코드를 리팩터링 하는데 방해가 되기도 한다.

## 6-5 함수 선언 바꾸기

### Before

```javascript
function circum(radius) { ... }
```

### After
```javascript
function circumference(radius) { ... }
```

주석을 이용해 함수의 목적을 설명해보면 좋은 이름을 떠올리는데 좋다

기존의 함수를 새로운 함수로 통으로 대체를 한후

새로운 함수의 이름으로 기존의 코드를 바꾼후 이러한 작업이 끝나면 원래 함수를 삭제한다.

## 6-6 변수 캡슐화하기

### Before
```javascript
let defaultOwner = { firstName: '태희', lastName: '김' };
```

```javascript
let defaultOwnerData=  {firstName: '태희', lastName: '김'}
export function defaultOwner() { return defaultOwnerData;}
export function setDefaultOwner(arg) { return defaultOwnerData = arg;}
```

데이터는 함수를 대체로 호출하는것처럼 할수 없고 전달함수로서 활용할수도 없기때문에 다루기가 까다롭다

데이터는 참조하는 모든 부분을 한 번에 바꿔야 코드가 제대로 작동한다. 짧은 함수 안의 임시 변수처럼 유효범위가 아주 좁은 데이터는 어려울 게 없지만, 유효범위가 넓어질수록 다루기 어려워진다. 전역 데이터가 골칫거리인 이유도 바로 여기에 있다.

접근할 수 있는 범위가 넓은 데이터를 옮길 때는 먼저 그 데이터로의 접근을 독점하는 함수를 만드는 식으로 캡슐화하는 것이 가장 좋은 방법일 때가 많다.

데이터 재구성이라는 어려운 작업을 함수 재구성이라는 더 단순한 작업으로 변환하는 것이다.

데이터 캡슐화는 데이터를 변경하고 사용하는 코드를 감시할 수 있는 확실한 통로가 되어주기 때문에 데이터 변경 전 검증이나 변경 후 추가 로직을 쉽게 끼워 넣을 수 있다.

불변 데이터는 옮길 필요 없이 그냥 복제 하면된다. 원본데이터를 참조하는 코드를 변경할 필요도 없고, 데이터를 변형시키는 코드를 걱정할 일도 없다.

> 나는 여기서 의문을 가졌다. 변수도 함수 선언 바꾸기처럼 우선 몇개만 바꿔놓고 차근차근 리팩토링을 할수있지않나? 라는 의문이 들었는데 어떠한 상황인지를 생각해보면 아래의 코드와 같다.

```javascript
let someValue = 3;

// Logic A
someValue += 1;

// Logic B
someValue += 3;

console.log('someValue', someValue); // 7
```

위와 같이 someValue를 2개의 어떠한 로직에 의해 사용하고 있었는데 이 변수의 명을 `replaceValue`로 바꾸고 싶은 상황이 주어졌다고 가정하겠다.

그런데 귀찮거나 어떠한 이유로 리팩토링을 `Logic A`만 했다고 했을때 과연 이것이 안전한 리팩토링인가? 에 대한 의문이 생긴다. 결과적으로는 **안전하지 않다**라는 결론이 나온다. 리팩토링 한 코드는 아래와 같다.

```javascript
let replaceValue = 3;
let someValue = replaceValue;


// Logic A
replaceValue += 1;

// Logic B
someValue += 3;

console.log('replaceValue', replaceValue); // 4
console.log('someValue', someValue); // 6
```

결과를 보면 알겠지만 리팩토링을 진행했더니 정말 엉망인결과가 나왔다.

근데 뭔가 어떻게든 될거같은 기분이 들었다. 그래서 C++의 포인터를 사용하면 됟지 않을까 싶어서 해보았는데



```C++
#include <iostream>

using namespace std;

int main()
{
    
    int someValue = 3;
    
    int *replaceValue = &someValue;
    
    // Logic A
    *replaceValue+=1;
    
    // Logic B
    someValue += 3;
    
    cout << "someValue " << someValue << '\n'; // 7
    cout << "replaceValue " << *replaceValue << '\n'; // 7
    
    return 0;
}
```

C++의 포인터를 사용하게되면 가능하게 된다. 자바스크립트에서도 이런게 있을지는 더 의논을 해봐야할거 같다.

## 6-7 변수 이름 바꾸기

### Before

```javascript
let a = height * width;
```

### After

```javascript
let area = height * width;
```

토론 해볼것에 정리해둠

## 6-8 매개변수 객체 만들기

### Before
```javascript
function amountInvoiced(startDate, endDate) { ... }
function amountReceived(startDate, endDate) { ... }
function amountOverDue(startDate, endDate) { ... }
```

```javascript
function amountInvoiced(aDateRange) { ... }
function amountReceived(aDateRange) { ... }
function amountOverDue(aDateRange) { ... }
```

데이터 뭉치를 데이터 구조로 묶으면 데이터 사이의 관계가 명확해진다는 이점을 얻는다.

매개변수 수가 줄어들고 같은 데이터 구조를 사용하는 모든 함수가 원소를 참조할 때 항상 똑같은 이름을 사용하기 때문에 일관성도 높여준다.

데이터 구조에 담길 데이터에 공통으로 적용되는 동작을 추출해서 함수로 만든다(공용 함수를 나열하는 식으로 작성할 수도 있고, 이 함수들과 데이터를 합쳐 클래스로 만들 수도 있다.)


## 6-9 여러 함수를 클래스로 묶기

### Before
```javascript
function base(aReading) { ... }
function taxableCharge(aReading) { ... }
function calculateBaseCharge(aReading) { ... }
```

### After
```javascript
class Reading {
  base() { ... }
  taxableCharge() { ... }
  calculateBaseCharge() { ... }
}
```

## 6-10 여러 함수를 변환 함수로 묶기

### Before
```javascript
function base(aReading) { ... }
function taxableCharge(aReading) { ... }
```

### After
```javascript
function enrichReading(argReading) {
  const aREading = _.cloneDeep(argReading);
  aREading.baseCharge = base(aREading);
  aREading.taxableCharge = taxableCharge(aReading);
  return aReading;
}
```

여러함수를 클래스로 묶기(6.9절)와 여러 함수를 변환 함수로 묶는것에는 중요한 차이가 있는데,

원본 데이터가 코드 안에서 갱신될 때는 클래스로 묶는 편이 훨씬 낫다. 변환 함수로 묶으면 가공한 데이터를 새로운 레코드에 저장하므로, 원본 데이터가 수정되면 일관성이 깨질 수 있기 때문이다.

여러 함수를 한데 묶는 이유중 하나는 도출 로직이 중복되는 것을 피하기 위해서다. 이 로직을 함수로 추출 하는것만으로도 같은 효과를 볼 수 있지만, 데이터 구조와 이를 사용하는 함수가 근처에 있지 않으면 함수를 발견하기 어려울 때가 많다. 변환 함수로 묶으면 이런 함수들을 쉽게 찾아 쓸 수 있다.


## 6-11 단계 쪼개기

### Before

```javascript
const orderData = orderString.split(/\s+/);
const productPrice = priceList[orderData[0].split("-")[1]];
const orderPrice = parseInt(orderData[1]) * productPrice;
```

### After

```javascript
const orderRecord = parseOrder(order);
const orderPrice = price(orderRecord, priceList);

function parseOrder(aString) {
  const values = aString.split(/\s+/);
  return ({
      productID: values[0].split("-")[1],
      quantity: parseInt(values[1]),
  });
}

function price(order, priceList) {
  return order.quantity * priceList[order.productID];
}
```

서로 다른 두 대상을 한꺼번에 다루는 코드를 발견하면 각각을 별개 모듈로 나누는 방법을 모색한다. 코드를 수정해야할때 두 대상을 동시에 생각핦 필요 없이 하나에만 집중하기 위해서이다.

### 6장토론

- 함수 안에 함수를 넣는 방식이 맞는것인지 ?

> 160쪽에 절차 1번에 보면 중첩 함수를 지원하는 언어를 사용한다면 추출한 함수를 원래 함수 안에 중첩시킨다. 그러면 다음 단계에서 수행할 유효범위를 벗어난 변수를 처리하는 작업을 줄일 수 있다. 라는 말이 있다. 또한 중첩 함수를 지원하지 않는 언어에서는 불가능하며 추출한 함수에서 원래의 함수의 변수에 모두 접근할수 있게된다. 추출된함수 입장에서는 원래함수의 변수는 전역변수같은 느낌인데 이렇게 사용을 해도 되는건지.. 168쪽에 중첩함수로 추출을 해도되지만 이렇게 하면 본함수의 변수를 매개변수의 전달 없이 그냥 사용할수 있기때문에 문제가 원래 생길거를 못발견할수도있다 따라서 원래 함수와 같은 계층의 함수로 추출을 해야한다라고 말해주고 있다.

- Closure를 사용하는 것들이 많으므로 꼭 중첩함수가 나쁘다고만은 할수 없다. 그러면 중첩함수의 테스트코드에대해서 알아볼 필요성이있다.

<hr />


- 6징 160쪽 절차3
    - 추출한 코드 안에서 값이 바뀌는 변수 중에서 값으로 전달되는 것들은 주의해서 처리한다. 이런 변수가 하나뿐이라면 추출한 코드를 질의 함수로 취급해서 그 결과(반환 값)를 해당 변수에 대입한다.

```javascript
function parent() {
  let willBeChangedValue = 3;
  function extractedFunction() {
    willBeChangedValue = 1;
  }
}
```

```javascript
function parent() {
  let willBeChangedValue = 3;
  function extractedFunction() {
    willBeChangedValue = 질의함수(willBeChangedValue);
      function 질의함수(value) {
          return value - 2;
      }
  }
}
```

```javascript
function parent() {
  let willBeChangedValue = 3;
  function extractedFunction() {
    let replaceParentValueInExtractedFunction = 질의함수(willBeChangedValue);
      function 질의함수(value) {
          return value - 2;
      }
  }
}
```

```javascript
function parent() {
  let willBeChangedValue = 3;
  function extractedFunction() {
    let replaceParentValueInExtractedFunction = willBeChangedValue -2;
    return replaceParentValueInExtractedFunction;
  }
}
```

질의함수를 따로 만들게되면 직접적인 변수의 값을 변경하는것을 막을수 있다.

또한 질의"함수"로 만들기때문에 값을 만드는데있어서 로직들을 추가할수있다.

테스트할때도 리팩토링할때도 더 낫다.



이 네 가지중에 어떤경우인지를 모르겠다 아마 이 네 가지중에서도 없을수도 있다.

<hr />

- 6장 160쪽 절차 3

때로는 추출한 코드에서 값을 수정하는 지역 변수가 너무 많을 수 있다. 이럴 때는 함수 추출을 멈추고, 변수 쪼개기나 임시 변수를 질의 함수로 바꾸기와 같은 다른 리팩터링을 적용해서 변수를 사용하는 코드를 단순하게 바꿔본다. 그런 다음 함수 추출을 다시 시도한다.

> 추출한 함수에서 부모함수에서의 변수를 많이 바꾼다는 말인지 헷갈린다.

부모함수 뿐만아니라 자기 자신도 포함해서 변수를 많이 바꾼다는 말이 맞다

<hr />


- 6-2 170쪽 철자 1

서브클래스에서 오버라이드하는 메서드는 인라인하면 안 된다.

> 이유를 추축해보면 좋을것같다. 오버라이드를 하여 사용할 함수를 인라인하고나서 없애버리면 오버라이드한 메서드를 사용하는곳에서 오류가 날것같다.

```javascript
class Person {

    test() {
        console.log('부모');
    }
}

class Taehee extends Person {

    test() {
        console.log('자식');
    }
    
    test2() {
        test();
    }
    
}
```

이렇게 관계가 되는데

```javascript


const taehee = new Taehee();

taehee.test();


```

이렇게 되어있는 상황에서

```javascript

class Person {

    test() {
        console.log('부모');
    }
}

class Taehee extends Person {
    
    test2() {
        // test();
        console.log('자식');
    }
}
```

이때 원래 taehee.test()의 에러를 기대했는데 부모의 Person.test()가 있다보니 오류가 안나는게 오류다


<hr />

- 6-5 181쪽 맨 마지막 줄

다형성을 구현한 클래스, 즉 상속 구조 속에 있는 클래스의 메서드를 변경할 때는 다형 관계인 다른 클래스들에도 변경이 반영되어야 한다. 이때, 상황이 복잡하기 때문에 간접 호출 방식으로 우회(혹은 중간단계로 활용)하는 방법도 쓰인다. 먼저 원하는 형태의 메서드를 새로 만들어서 원래 함수를 호출하는 전달 메서드로 활용하는 것이다. 단일 상속 구조라면 전달 메서드를 슈퍼클래스에 정의하면 해결된다. (Duck Typing 처럼) 슈퍼클래스와의 연결을 제공하지 않은 언어라면 전달 메서드를 모든 구현 클래스 각각에 추가해야한다.

상속하는 클래스들이 많으면 그거를 다 하나하나 리팩토링해줘야한다.

슈퍼클래스와의 연결을 제공하지 않으면 그거 함수(메서드) 하나하나 리팩토링해줘야한다.

단일 상속이면 슈퍼클래스에 정의하면된다.

<hr />


- 6-6 리드미 정리해놓은거에 토론거리 있음


자바스크립트에서

배열과 객체는 참조(얕은)복사가 된다.

Primitive값들은 모두 깊은복사가된다.

결론: 자바스크립트에서는 안되고, C++이나 C는된다.


<hr />

- 6-6 191쪽 맨 마지막에

> 방금 본 기본 캡슐화 기법으로 데이터 구조로의 참조를 캡슐화 하면, 그 구조로의 접근이나 구조 자체를 다시 대입하는 행위는 제어할 수 있다. 하지만 필드 값을 변경하는 일은 제어할 수 없다. 기본 캡슐화 기법은 데이터 항목을 참조하는 부분만 캡슐화한다. 이게 밑에 테스트를 돌려보면 성공하는 테스트여서 그런것인가.. defaultOwner()로 값을 불러왔는데 둘이 동시에 값이 변해버린다. 이런면에서 각각을 개발자는 따로따로 생각하고싶은데 그러질 못하는 측면에서 제어할 수 없다고 하는것 같다.

위에는 참조하는애들만 변경이 됬던거고 원본은 변경할수 없게한것이다.


변수에 담긴 내용을 변경하는 행위까지 제어할 수 있게 캡슐화하고 싶을 때도 많다. => 원본데이터를 변경할수 있게끔 한다.

 <hr />

- 6-6 190쪽 4번 모든 참조를 수정했다면 변수의 가시 범위를 제한한다. 그러면 미처 발견하지 못한 참조가 없는지 확인할 수 있고~

getter든 setter든 이 두개를 통해서 참조를 모두 수정하고나면 defaultOwner.js파일에다가 데이터와 Getter, setter를 넣고 getter, setter만 export한다.

<hr />

- 6-7 195쪽 절차 2
  다른 코드베이스에서 참조하는 변수는 외부에 공개된 변수이므로 이 리팩터링을 적용할 수 없다.

같은 프로젝트에있다면 리팩터링적용이 가능하지만 이름바꾸기를 하려는 변수가 외부 프로젝트라면 그건 안된다.

<hr />

- 6-7 196쪽 처음부분

그런 다음 래핑 함수들을 인라인해서 모든 호출자가 변수에 직접 접근하게 하는 방법도 있지만 ~


> 무슨말인지 모르겠다


래핑함수들은 Getter, Setter들을말하고 바꾸려는 변수를 직접적으로 바꾸는방법도있지만 변수를 캡슐화해서 리턴하거나 호출하는 방식이 더 좋다고 생각한다.

<hr />

- 6-9 207쪽 처음

파생 데이터 모두를 필요한 시점에 계산되게 만들었으니 저장된 데이터를 갱신하더라도 문제가 생길 일이 없다.

> 파생 데이터가 rawReading을 말하는것이고 이것이 aReading.taxableCharge, aReading.baseCharge를 통해 계산되게 만들었다 이말인가? rawReading의 값이 변환되든 어차피 잘 계산되서?

파생데이터는 baseCharge, taxableCharge를 말하는데 변수의 값이 아무리 바뀌어도 aReading.baseCharge, aReading.taxableCharge 얘네들은 바뀐것에 맞춰 계산이 내부적으로 되어 값을 얻을수 있다.

<hr />

- 6-10 211쪽 마지막부분 모두

원본 데이터를 바꾸지 않는선에서 클라이언트가 제공해준 데이터를 enrich함수가 알아서 변환하여 반환해준다 그럼 클라이언트입장에서는 무조건 변환된 데이터만 사용할수밖에 없다.

lodash 라이브러리는 함수형 프로그래밍에서 사용하는 라이브러리다.

