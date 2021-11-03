// 기존 코드
function bottomBand(usage) {
  return Math.min(usage, 100);
}

function middleBand(usage) {
  return usage > 100 ? Math.min(usage, 200) - 100 : 0;
}

function topBand(usage) {
  return usage > 200 ? usage - 200 : 0;
}

function baseCharge(usage) {
  if (usage < 0) return usd(0);
  const amount =
    bottomBand(usage) * 0.03 + middleBand(usage) * 0.05 + topBand(usage) * 0.07;
  return usd(amount);
}

// 리팩토링
function withinBand(usage, bottom, top) {
  return usage > bottom ? Math.min(usage, top) - bottom : 0;
}

function baseCharge(usage) {
  if (usage < 0) return usd(0);
  const amount =
    withinBand(usage, 0, 100) * 0.03 +
    withinBand(usage, 100, 200) * 0.05 +
    withinBand(usage, 200, Infinity) * 0.07;
  return usd(amount);
}

/**
 * 느낀점: 리팩토링의 이름만 보고 함수 매개변수화하기? 쉽지 ㅋㅋ 했는데 
 * 예시를 보니깐 생각이 달라졌다. 기존코드를 보면 정말 함수 3개가 서로 완전 다른거 처럼 느껴졌었는데
 * top, bottom이라는 매개변수를 추가하니깐 말이 달라졌다. ..
 */