// 기존 코드
function adjustedCapital(anInstrument) {
  let result = 0;
  if (anInstrument.capital > 0) {
    if (anInstrument.interestRate > 0 && anInstrument.duration > 0) {
      result =
        (anInstrument.income / anInstrument.duration) *
        anInstrument.adjustmentFactor;
    }
  }
  return result;
}

// 리팩토링
function adjustedCapital(anInstrument) {
  if (
    anInstrument.capital <= 0 ||
    anInstrument.interestRate <= 0 ||
    anInstrument.duration <= 0
  )
    return 0;

  return (
    (anInstrument.income / anInstrument.duration) *
    anInstrument.adjustmentFactor
  );
}

/**
 * 느낀점:
 * 이번 리팩토링은 조건 반대로 만들기 리팩토링이다.
 * 살면서 이런 리팩토링은 처음 봤다.
 * 해보면서 계속 놀랐다 ... 우선 조건을 반대로 바꾸는대서 놀랐는데
 * 바꾸고 나니 공통된 반환값이 보이게 되고 그걸 하나로 묶어서 조건문이 해야할 일을 한곳에 모아뒀다.
 * 이런 리팩토링을 알게돼서 너무 좋다...
 */
