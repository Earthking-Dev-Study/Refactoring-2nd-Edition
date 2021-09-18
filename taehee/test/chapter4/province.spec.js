const { Province } = require('../../src/chapter4/Province');
const { sampleProvinceData } = require('../../src/chapter4/Province');

describe('province', function () {
  it('shortfall', function () {
    const asia = new Province(sampleProvinceData());
    expect(asia.shortfall).toEqual(5);
  });
});
