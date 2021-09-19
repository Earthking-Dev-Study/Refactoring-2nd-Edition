const { Province } = require('../../src/chapter4/Province');
const { sampleProvinceData } = require('../../src/chapter4/Province');

describe('province', function () {
  let asia;
  beforeEach(function () {
    asia = new Province(sampleProvinceData());
  });

  it('shortfall', function () {
    expect(asia.shortfall).toEqual(5);
  });

  it('profit', function () {
    expect(asia.profit).toEqual(230);
  });

  it('change production', function () {
    asia.producers[0].production = 20;
    expect(asia.shortfall).toEqual(-6);
    expect(asia.profit).toEqual(292);
  });
});

describe('no producers', function () {
  let noProducers;
  beforeEach(function () {
    const data = {
      name: 'No Producers',
      producers: [],
      demand: 30,
      price: 20,
    };
    noProducers = new Province(data);
  });

  it('shortfall', function () {
    expect(noProducers.shortfall).toEqual(30);
  });

  it('profit', function () {
    expect(noProducers.profit).toEqual(0);
  });
});
