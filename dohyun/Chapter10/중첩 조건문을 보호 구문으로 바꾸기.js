// 기존 코드
function payAmount(employee) {
  let result;
  // 퇴시한 직원인가 ?
  if (employee.isSeparated) {
    result = { amount: 0, reasonCode: "SEP" };
  } else {
    // 은퇴한 직원인가 ?
    if (employee.isRetired) {
      result = { amount: 0, reasonCode: "RET" };
    } else {
      // 급여 계산 로직
      lorem.ipsum(dolor.sitAmet);
      consectetur(adipiscing).elit();
      sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
      ut.enim.ad(minim.veniam);
      result = someFinalComputation();
    }
  }
  return result;
}

// 리팩토링
function payAmount(employee) {
  // 퇴시한 직원인가 ?
  if (employee.isSeparated) return { amount: 0, reasonCode: "SEP" };
  // 은퇴한 직원인가 ?
  if (employee.isRetired) return { amount: 0, reasonCode: "RET" };

  // 급여 계산 로직
  lorem.ipsum(dolor.sitAmet);
  consectetur(adipiscing).elit();
  sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
  ut.enim.ad(minim.veniam);
  return someFinalComputation();
}

/**
 * 느낀점:
 * 와 처음에 기존 코드를 봤을 때 과연 어떤식으로 리팩토링이 될까 궁금했었는데
 * 직접 따라해보니 이번거도 대박이다.
 * 결국 result의 값을 반환하면 되니 바로 return 하는 식으로 조건문을 간소화 시키고 위에 조건에 일치하면
 * return이 되니 밑으로 도착하면 자동으로 else 구문이 실행되는거나 마찬가지다
 */
