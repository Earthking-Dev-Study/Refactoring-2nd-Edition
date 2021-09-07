// const invoices = require("../../data/invoices.json");
// const f = require("../../src/chapter1/statement.js");
import invoices from "../../data/invoices.json";
import statement from "../../src/chapter1/statement.js";
describe("play test", () => {
  test("statement method must have return value with string", () => {
    const result = statement(invoices[0]);
    const expected = `청구 내역 (고객명: BigCo)\n Hamlet: $650.00 (55석)\n As You Like It: $580.00 (35석)\n Othello: $500.00 (40석)\n총액: $1,730.00\n적립 포인트: 47점\n`;

    expect(result).toEqual(expected);
  });
});
