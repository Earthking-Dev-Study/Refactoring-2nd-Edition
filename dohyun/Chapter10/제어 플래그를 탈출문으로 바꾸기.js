// 기존 코드
let found = false;
for (const p of people) {
  if (!found) {
    if (p === "조커") {
      sendAlert();
      found = true;
    }
    if (p === "사루만") {
      sendAlert();
      found = true;
    }
  }
}

// 리팩토링
function checkForMiscreants(people) {
  if (people.some((p) => ["조커", "사루만"].includes(p))) sendAlert();
}

/**
 * 느끼점: 평소에 알고리즘 문제를 풀때 result 같은 제어 플래그를 많이 사용했는데
 * return 문으로 대체하게 되면 굳이 없어도 되고 코드도 더 간결해지는거 같다.
 */
