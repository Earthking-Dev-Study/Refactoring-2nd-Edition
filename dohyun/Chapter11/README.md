# API 리팩터링

## 질의 함수와 변경 함수 분리하기

겉보기 부수효과가 있는 함수와 없는 함수는 명확히 구분하는 것이 좋다. 이를 위한 한 가지 방법은 `질의 함수(읽기 함수)는 모두 부수효과가 없어야 한다`는 규칙을 따르는 것이다. 이를 명령-질의 분리라 한다.

1. 대상 함수를 복제하고 질의 목적에 충실한 이름을 짓는다.
   - 함수 내부를 살펴 무엇을 반환하는지 찾는다. 어떤 변수의 값을 반환한다면 그 변수 이름이 훌륭한 단초가 될 것이다.
2. 새 질의 함수에서 부수효과를 모두 제거한다.
3. 정적 검사를 수행한다.
4. 원래 함수(변경 함수)를 호출하는 곳을 모두 찾아낸다. 호출하는 곳에서 반환 값을 사용한다면 질의 함수를 호출하도록 바꾸고, 원래 함수를 호출하는 코드를 바로 아래 줄에 새로 추가한다. 하나 수정할 때마다 테스트한다.
5. 원래 함수에서 질의 관련 코드를 제거한다.
6. 테스트한다.

<br />

## 함수 매개변수화하기

두 함수의 로직이 아주 비슷하고 단지 리터럴 값만 다르다면, 그 다른 값만 매개변수로 받아 처리하는 함수 하나로 합쳐서 중복을 없앨 수 있다. 이렇게 하면 매개변수 값만 바꿔서 여러 곳에서 쓸 수 있으니 함수의 유용성이 커진다.

1. 비슷한 함수 중 하나를 선택한다.
2. 함수 선언 바꾸기로 리터럴들을 매개변수로 추가한다.
3. 이 함수를 호출하는 곳 모두에 적절한 리터럴 값을 추가한다.
4. 테스트한다.
5. 매개변수로 받은 값을 사용하도록 함수 본문을 수정한다. 하나 수정할 때마다 테스트한다.
6. 비슷한 다른 함수를 호출하는 코드를 찾아 매개변수화된 함수를 호출하도록 하나씩 수정한다. 하나 수정할 때마다 테스트한다.
   - 매개변수화된 함수가 대체할 비슷한 함수와 다르게 동작한다면, 그 비슷한 함수의 동작도 처리할 수 있도록 본문 코드를 적절히 수정한 후 진행한다.

<br />

## 플래그 인수 제거하기

플래그 인수란 호출되는 함수가 실행할 로직을 호출하는 쪽에서 선택하기 위해 전달하는 인수다.

1. 매개변수로 주어질 수 있는 값 각각에 대응하는 명시적 함수들을 생성한다.
   - 주가 되는 함수에 깔끔한 분배 조건문이 포함되어 있다면 조건문 분해하기로 명시적 함수들을 생성하자. 그렇지 않다면 래핑 함수 형태로 만든다.
2. 원래 함수를 호출하는 코드들을 모두 찾아서 각 리터럴 값에 대응되는 명시적 함수를 호출하도록 수정한다.

<br />

## 객체 통째로 넘기기

객체를 통째로 넘기면 변화에 대응하기 쉽다. 예컨대 그 함수가 더 다양한 데이터를 사용하도록 바뀌어도 매개변수 목록은 수정할 필요가 없다. 그리고 매개변수 목록이 짧아져서 일반적으로는 함수 사용법을 이해하기 쉬워진다.

1. 매개변수들을 원하는 형태로 받는 빈 함수를 만든다
   - 마지막 단계에서 이 함수의 이름을 변경해야 하니 검색하기 쉬운 이름으로 지어준다.
2. 새 함수의 본문에서는 원래 함수를 호출하도록 하며, 새 매개변수와 원래 함수의 매개변수를 매핑한다.
3. 정적 검사를 수행한다.
4. 모든 호출자가 새 함수를 사용하게 수정한다. 하나씩 수정하며 테스트하자.
   - 수정 후에는 원래의 매개변수를 만들어내는 코드 일부가 필요 없어질 수 있다. 따라서 죽은 코드 제거하기로 없앨 수 있을 것이다.
5. 호출자를 모두 수정했다면 원래 함수를 인라인한다.
6. 새 함수의 이름을 적절히 수정하고 모든 호출자에 반영한다.

<br />

## 매개변수를 질의 함수로 바꾸기

1. 필요하다면 대상 매개변수의 값을 계산하는 코드를 별도 함수로 추출 해놓는다.
2. 함수 본문에서 대상 매개변수로의 참조를 모두 찾아서 그 매개변수의 값을 만들어주는 표현식을 참조 하도록 바꾼다. 하나 수정할 때마다 테스트한다.
3. 함수 선언 바꾸기로 대상 매개변수를 없앤다.

<br />

## 질의 함수를 매개변수로 바꾸기

코드를 읽다 보면 함수 안에 두기엔 거북한 참조를 발견할 때가 있다. 전역 변수를 참조한다거나(같은 모듈에 안에서라도) 제거하길 원하는 원소를 참조하는 경우가 여기 속한다. 이 문제는 해당 참조를 매개변수로 바꿔 해결할 수 있다. 참조를 풀어내는 책임을 호출자로 옮기는 것이다.

1. 변수 추출하기로 질의 코드를 함수 본문의 나머지 코드와 분리한다.
2. 함수 본문 중 해당 질의를 호출하지 않는 코드들을 별도 함수로 추출한다.
   - 이 함수의 이름은 나중에 수정해야 하니 검색하기 쉬운 이름으로 짓는다.
3. 방금 만든 변수를 인라인 하여 제거한다.
4. 원래 함수도 인라인 한다.
5. 새 함수의 이름을 원래 함수의 이름으로 고쳐준다.

<br />

## 세터 제거하기

세터 제거하기 리패개터링이 필요한 상황은 주로 두 가지다. 첫째, 사람들이 무조건 접근자 메서드를 통해서만 필드를 다루려 할때다.  
두 번째 상황은 클라이언트에서 `생성 스크립트`를 사용해 객체를 생성할 때다. 생성 스크립트란 생성자를 호출한 후 일련의 세터를 호출하여 객체를 완성하는 형태의 코드를 말한다.

1. 설정해야 할 값을 생성자에서 받지 않는다면 그 값을 받을 매개변수를 생성자에 추가한다(함수 선언 바꾸기). 그런 다음 생성자 안에서 적절한 세터를 호출한다.
   - 세터 여러 개를 제거하려면 해당 값 모두를 한꺼번에 생성자에 추가한다. 그러면 이후 과정이 간소해진다.
2. 새애성자 밖에서 세터를 호출하는 곳을 찾아 제거하고, 대신 새로운 생성자를 사용하도록 한다. 하나 수정할 때마다 테스트한다.
   - (갱신하려는 대상이 공유 참조 객체라서) 새로운 객체를 생성하는 방식으로는 세터 호출을 대체할 수 없다면 이 리팩터링을 취소한다.
3. 세터 메서드를 인라인한다. 가능하다면 해당 필드를 불변으로 만든다.
4. 테스트한다.

<br />

## 생성자를 팩터리 함수로 바꾸기

1. 팩터리 함수를 만든다. 팩터리 함수의 본문에서는 원래의 생성자를 호출한다.
2. 생성자를 호출하던 코드를 팩터리 함수 호출로 바꾼다.
3. 하나씩 수정할 때마다 테스트한다.
4. 생성자의 가시 범위가 최소가 되도록 제한한다.

<br />

## 함수를 명령으로 바꾸기

함수를 그 함수만을 위한 객체 안으로 캡슐화하면 더 유용해지는 상황이 있다. 이런 객체를 가리켜 '명령 객체'혹은 단순히 `명령`이라 한다. 명령 객체 대부분은 메서드 하나로 구성되며, 이 메서드를 요청해 실행하는 것이 이 객체의 목적이다.

1. 대상 함수의 기능을 옮길 빈 클래스를 만든다. 클래스 이름은 함수 이름에 기초해 짓는다.
2. 방금 생성한 빈 클래스로 함수를 옮긴다.
   - 리팩터링이 끝날 때까지는 원래 함수를 전달 함수 역할로 남겨두자.
   - 명령 관련 이름은 사용하는 프로그래밍 언어의 명명규칙을 따른다. 규칙이 딱히 없다면 "execite"나 "call" 같이 명령의 실행 함수에 흔히 쓰이는 이름을 택하자
3. 함수의 인수들 각각은 명령의 필드로 만들어 생성자를 통해 설정할지 고민해본다.

<br />

## 명령을 함수로 바꾸기

1. 명령을 생성하는 코드와 명령의 실행 메서드를 호출하는 코드를 함께 함수로 추출한다.
   - 이 함수가 바로 명령을 대체할 함수다.
2. 명령의 실행 함수가 호출하는 보조 메서드들 각각을 인라인 한다.
   - 보조 메서드가 값을 반환한다면 함수 인라인에 앞서 변수 추출하기를 적용한다.
3. 함수 선언 바꾸기를 적용하여 생성자의 매개변수 모두를 명령의 실행 메서드로 옮긴다.
4. 명령의 실행 메서드에서 참조하는 필드들 대신 대응하는 매개변수를 사용하게끔 바꾼다. 하나씩 수정할 때마다 테스트한다.
5. 생성자 호출과 명령의 실행 메서드 호출을 호출자(대체 함수) 안으로 인라인한다.
6. 테스트한다.
7. 죽은 코드 제거하기로 명령 클래스를 없앤다.

<br />

## 수정된 값 반환하기

1. 함수가 수정된 값을 반환하게 하여 호출자가 그 값을 자신의 변수에 저장하게 한다.
2. 테스트한다.
3. 피호출 함수 안에 반환할 값을 가리키는 새로운 변수를 선언한다.
   - 이 작업이 의도대로 이뤄졌는지 검사하고 싶다면 호출자에서 초기값을 수정해보자. 제대로 처리했다면 수정된 값이 무시된다.
4. 테스트한다.
5. 계산이 선언과 동시에 이뤄지도록 통합한다(즉, 선언 시점에 계산 로직을 바로 실행해 대입한다.)
6. 테스트한다.
7. 피호출 함수의 변수 이름을 새 역할에 어울리도록 바꿔준다.
8. 테스트한다.

<br />

## 오류 코드를 예외로 바꾸기

1. 콜스택 상위에 해당 예외를 처리할 예외 핸들러를 작성한다.
   - 이 핸들러는 처음에는 모든 예외를 다시 던지게 해둔다.
   - 적절한 처리를 해주는 핸들러가 이미 있다면 지금의 콜스택도 처리할 수 있도록 확장한다.
2. 테스트한다.
3. 해당 오류코드를 대체할 예외와 그 밖의 예외를 구분할 식별 방법을 찾는다.
   - 사용하는 프로그래밍 언어에 맞게 선택하면 된다. 대부분 언어에서는 서브클래스를 사용하면 될 것이다.
4. 정적 검사를 수행한다.
5. catch절을 수정하여 직접 처리할 수 있는 예외는 적절히 대처하고 그렇지 않은 예외는 다시 던진다.
6. 테스트한다.
7. 오류 코드를 반환하는 곳 모두에서 예외를 던지도록 수정한다. 하나씩 수정할 때마다 테스트한다.
8. 모두 수정했다면 그 오류 코드를 콜스택 위로 전달하는 코드를 모두 제거한다. 하나씩 수정할 때마다 테스트한다.

<br />

## 예외를 사전 확인으로 바꾸기

1. 예외를 유발하는 상황을 검사할 수 있는 조건문을 추가한다. catch 블록의 코드를 조건문의 조건절 중 하나로 옮기고, 남은 try 블록의 코드를 다른 조건절로 옮긴다.
2. catch 블록에 어서션을 추가하고 테스트한다.
3. try문과 catch 블록을 제거한다.
4. 테스트한다.