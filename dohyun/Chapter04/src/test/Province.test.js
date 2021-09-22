const { Province } = require("../Province");
const { sampleProvinceData } = require("../Province");
const assert = require("assert");

describe("province", function () {
  it("shortfall", function () {
    const asia = new Province(sampleProvinceData()); // 첫 번째 단계에서는 테스트에 필요한 데이터와 객체를 뜻하는 픽스처를 설정
    assert.equal(asia.shortfall, 5); // 두 번째 단계에서는 이 픽스처의 속성들을 검증하는데, 여기서는 주어진 초기값에 기초하여 생산 부족분을 정확히 계산했는지 확인한다.
  });
});
