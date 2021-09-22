const { Province } = require("../Province");
const { sampleProvinceData } = require("../Province");
const assert = require("assert");
const { expect } = require("chai");

describe("province", function () {
  let asia;
  beforeEach(function () {
    asia = new Province(sampleProvinceData());
  });

  it("shortfall", function () {
    expect(asia.shortfall).equal(5);
  });

  it("profit", function () {
    expect(asia.profit).equal(230);
  });
});
