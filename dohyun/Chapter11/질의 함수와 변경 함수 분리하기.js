// 기존 코드
function alertForMiscreant(people) {
  for (const p of people) {
    if (p === "조커") {
      setOffAlarms();
      return "조커";
    }

    if (p === "사루만") {
      setOffAlarms();
      return "사루만";
    }
  }
  return "";
}

const found = alertForMiscreant(people);

// 리팩토링
function alertForMiscreant(people) {
  if (findMiscreant(people) !== "") setOffAlarms();
}

function findMiscreant(people) {
  for (const p of people) {
    if (p === "조커") return "조커";
    if (p === "사루만") return "사루만";
  }
  return "";
}

alertForMiscreant(people);

/**
 * 느낀점: 질의 함수와 변경 함수를 분리하는 것은 코드의 재사용성을 높이고,
 * 코드의 유지보수성을 높이는 것이다.
 */
