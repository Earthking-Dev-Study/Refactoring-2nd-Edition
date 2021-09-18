const { Province } = require('../../src/chapter4/Province');
const { sampleProvinceData } = require('../../src/chapter4/Province');

describe('province', function () {
  const asia = new Province(sampleProvinceData());

  it('shortfall', function () {
    expect(asia.shortfall).toEqual(5);
  });

  it('profit', function () {
    expect(asia.profit).toEqual(230);
  });
});
