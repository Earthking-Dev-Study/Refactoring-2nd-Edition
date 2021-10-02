## 2장

### 2-1 리팩터링 정의

리팩터링 [명사]: 소프트웨어의 겉보기 동작은 그대로 유지한 채, 코드를 이해하고 수정하기 쉽도록 내부 구조를 변경하는 기법

리팩터링 [동사]: 소프트웨어의 겉보기 동작은 그대로 유지한 채, 코드를 이해하고 수정하기 쉽도록 내부 구조를 변경하는 기법

- 코드를 정리하는 작업을 모조리 '리팩터링'이라고 하지 않는다, 특정한 방식에 따라 코드를 정리하는 것만이 리팩터링이다.

- 동작을 보존하는 작은 단계들을 거쳐 코드를 수정하고, 이러한 단계들을 순차적으로 연결하여 큰 변화를 만들어 낸다.

- 리팩터링하는 동안에는 코드가 항상 정상 작동하기 때문에(test로 정상작동 체크를 항상 해준다.) 전체 작업이 끝나지 않았더라도 언제든 멈출 수 있다.

- 만약 리팩토링하다가 도저히 안되겠으면 이전커밋으로 쉽게 돌아가서 다시 작업하면된다.

> 코드베이스를 정리하거나 구조를 바꾸는 모든 작업을 **재구성**이라는 포괄적인 용어로 표현하고, 리팩터링은 재구성 중 특수한 한 형태로 본다.

리팩터링을 정의할 때 '겉보기 동작(observable behavior)'라는 표현을 사용하였는데, 리팩터링을 하기 전과 후가 똑같이 동작해야 한다는 뜻이다. 그런데 함수 추출하기를 거치게 되면 콜스택이 달라져서 성능이 변할 수 있다.

한편, 리팩터링 과정에서 발견된 버그는 리팩터링 후에도 그대로 남아 있어야 한다.(단, 아무도 발견하지 못한 숨은 버그는 수정해도 괜찮다.)

리팩터링은 성능 최적화와 비슷한데, 목적이 다르다. 리팩터링의 목적은 코드를 이해하고 수정하기 쉽게 만드는 것이며 프로그램 성능은 좋아질 수도, 나빠질 수도 있다. 반면 성능 최적화는 오로지 속도 개선에만 신경 쓴다. 따라서 목표 성능에 반드시 도달해야 한다면 코드는 다루기에 더 어렵게 바뀔 수도 있음을 각오 해야한다.

### 2-2 두개의 모자

기능을 추가할때의 모자, 리팩터링 할때의 모자, 이 두개를 쓴다는것은

기능을 추가할때는 오로지 기능추가에만 집중하고, 리팩터링 할때는 오로지 리팩터링에만 집중한다 라는 뜻을 표현하는 것이다.

- **기능을 추가 할때**는 기존 코드는 절대 건드리지 않고 새 기능을 추가하기만 한다.

진척도는 테스트를 추가해서 통과하는지 확인하는 방식으로 측정한다.

- 반면, **리팩터링 할때**는 기능 추가는 절대 하지않고 오로지 코드 재구성에만 전념한다. (앞 과정에서 놓친 테스트 케이스를 발견하지 않는 한) 테스트도 새로 만들지 않는다. 부득이 인터페이스를 변경해야 할 때만 기존 테스트를 수정한다.

### 2-3 리팩터링하는 이유

리팩터링은 코드를 건강한 상태로 유지하는 데 도와주는 약이다.

#### 리팩터링하면 소프트웨어 설계가 좋아진다.

- 리팩터링 하지 않으면 소프트웨어의 내부 설계(아키텍쳐)가 썩기 쉽다. 아키텍쳐를 충분히 이해하지 못한 채 단기 목표만을 위해 코드를 수정하다 보면 기반 구조가 무너지기 쉽다. 그러면 코드만 봐서는 설계를 파악하기 어려워진다.

- 코드량을 줄인다고 시스템이 빨라지는 것은 아니다. 프로그램의 용량이 속도에 영향을 주는 경우는 별로 없다.

- 중복 코드를 제거하면 모든 코드가 언제나 고유한 일을 수행함을 보장할 수 있으며, 이는 바람직한 설계의 핵심이다.

#### 리팩터링 하면 소프트웨어를 이해하기 쉬워진다.

- 프로그래밍은 여러 면에서 마치 컴퓨터와 대화하는 것과 같다. 컴퓨터에게 시킬 일을 표현하는 코드를 작성하면, 컴퓨터는 정확히 시키는 대로 반응한다. 그래서 **컴퓨터에게 시키려는 일**과 **이를 표현한 코드의 차이**를 최대한 줄여야 한다.

- 코드를 작성후 몇달후에 다른 사람이 내 코드를 수정하고자 읽게 될 수 있다. 그럴때 코드를 컴파일하는 시간이 더 올린다고 누가 뭐라고 하는것은 아닌데, 코드를 한눈에 파악하기 힘들다면 사정이 달라진다. 한시간만에 끝날것을 일주일이 넘게 걸릴수도 있기 때문이다.

- 이러한 현상은 프로그램을 동작시키는 데만 신경 쓸때 나타날수 있다.

- 결국 몇달 후에 보는 사람은 꼭 다른사람이 아닌 작성자 자신이 될 수 있다. 그래서 더더욱 리팩터링은 중요하다.

#### 리팩터링하면 버그를 쉽게 찾을 수 있다.

켄트 벡은 "난 뛰어난 프로그래머가 아니에요. 단지 뛰어난 습관을 지닌 괜찮은 프로그래머일 뿐이에요"라는 말을 했다.

리팩터링은 견고한 코드를 작성하는데 무척 효과적이다.

#### 리팩터링하면 프로그래밍 속도를 높일 수 있다.

- 리팩터링하면 코드 개발 속도를 높일 수 있다. 여기서 **개발 속도** 인것이지 전반적인 **프로그램의 속도**는 좋아질수도, 나빠질수도 있다.

- 초기에는 진척이 빨랐던 프로그램은 오히려 나중 갈수록 기능 하나 추가하는데도 오랜시간이 걸릴 수 있다. 그 이유는 기존 코드 베이스에 녹여낼 방법을 찾고, 기능을 추가하고 나면 버그가 발생하는 일이 잦기 때문이다. 이를 그림으로 표현하면 아래와 같다.

<img width="419" alt="Screen Shot 2021-09-08 at 8 11 27 AM" src="https://user-images.githubusercontent.com/44861205/132421750-9ca1c4ae-9f0f-4482-9dc7-bcec71f59b9c.png">

- 이렇게 차이 나는 원인은 소프트웨어의 내부 품질에 있다. 모듈화가 잘 되어 있으면 전체 코드베이스 중 작은 일부만 이해하면 된다.

- 내부 설계에 심혈을 기울이면 소프트웨어의 지구력이 높아져서 빠르게 개발할 수 있는 상태를 더 오래 지속할 수 있다. 그렇기때문에 처음에는 조금 느릴지 몰라도 나중에는 훨씬 더 개발속도가 빨라짐에 있어서 힘이 실린다. 이러한 것을 저자는 **Design Stamina Hypothesis**라고 부른다.

- 리팩터링을하면 설계를 완벽히 하고나서 개발에 들어가는 것 보다는 기존 코드의 설계를 얼마든지 개선할 수 있으므로, 어느정도 설계 후 바로 개발에 들어가도 얼마 든지 리팩토링을 통해 설계를 지속해서 개선할 수 있다.



