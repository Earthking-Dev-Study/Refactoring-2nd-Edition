// 기존 코드
if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) {
  charge = quantity * plan.summerRate;
} else {
  charge = quantity * plan.reqularRate + plan.reqularServiceCharge;
}

// 리팩토링

charge = summer() ? summerCharge() : regularCharge();

function summer() {
  return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

function summerCharge() {
  return quantity * plan.summerRate;
}

function regularCharge() {
  return quantity * plan.reqularRate + plan.reqularServiceCharge;
}

/**
 * 느낀점:
 * 와 가독성 대박이네.. 기존 코드는 조건문 봤을때 뭔소린지를 모르겠는데
 * 리팩토링된 코드를 보니 그냥 바로 가격 = 여름이면 ? 여름가격 아니면 ? 평균 가격 바로 알수 있네..
 * 조건 문을 보면 바로 무슨 의미인지 알 수 있고 로직을 자세히 보려면 함수 내용을 보면 되니깐 훨씬 낫다 ..
 */
