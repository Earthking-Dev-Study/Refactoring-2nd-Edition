const plays = require("../../data/plays.json");
const invoices = require("../../data/invoices.json");
const invoice = invoices[0];

function playFor(perf) {
  return plays[perf.playID];
}

function amountFor(aPerformance) {
  let result = 0;
  switch (aPerformance.play.type) {
    case "tragedy":
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
  }
  return result;
}

function volumeCreditsFor(aPerformance) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  if ("comedy" === aPerformance.play.type)
    result += Math.floor(aPerformance.audience / 5);
  return result;
}

function usd(anumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(anumber / 100);
}

function totalVolumeCredits(invoice) {
  // 포인트를 적립한다.

  let result = 0;
  for (let perf of invoice.performances) {
    result += perf.volumeCredits;
  }
  return result;
}

function totalAmount(invoice) {
  let result = 0;
  for (let perf of invoice.performances) {
    result += perf.amount;
  }

  return result;
}

function renderPlainText(data) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    // 청구 내역을 출력한다.
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(totalAmount(data))}\n`;
  result += `적립 포인트: ${totalVolumeCredits(data)}점\n`;
  return result;
}

function enrichPerformance(aPerformance) {
  const result = Object.assign({}, aPerformance);
  result.play = playFor(result);
  result.amount = amountFor(result);
  result.volumeCredits = volumeCreditsFor(result);
  return result;
}

function statement(invoice) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  return renderPlainText(statementData);
}

module.exports = {
  statement,
};
