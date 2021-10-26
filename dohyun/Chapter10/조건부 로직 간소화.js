// 기존 코드
function disabilityAmount(anEmployee) {
  if (anEmployee.seniority < 2) return 0;
  if (anEmployee.monthsDisabled > 12) return 0;
  if (anEmployee.isPartTime) return 0;
}

// 리팩토링
function disabilityAmount(anEmployee) {
  if (isNotEligibleForDisability(anEmployee)) return 0;
}

function isNotEligibleForDisability(anEmployee) {
  return (
    anEmployee.seniority < 2 ||
    anEmployee.monthsDisabled > 12 ||
    anEmployee.isPartTime
  );
}

/**
 * 느낀점:
 * 이번 리팩토링은 엄청 크게 변화는 없었다. 코드가 너무 단순해서 그런가 ??
 * 조건문에서 같은 반환 값을 가지고 있으면 묶어주고 '함수 추출하기'로 따로 빼주게 되면
 * 조건문의 하는일이 더 명확해 지는거 같다.
 */
