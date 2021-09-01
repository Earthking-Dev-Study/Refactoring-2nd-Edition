export default function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function totalAmount(data) {
    return data.performances.reduce((total, pref) => total + pref.amount, 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce(
      (total, perf) => total + perf.volumeCredits,
      0
    );
  }

  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );

    const result = Object.assign({}, aPerformance); // 얕은 복사 수행 코드
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch ((aPlay, type)) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);

    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performances = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    let result = 0;
    switch (this.play.type) {
      case "tragedy":
        result = 40000;
        if (this.performances.audience > 30) {
          result += 1000 * (this.performances.audience - 30);
        }
        break;

      case "comedy":
        result = 30000;
        if (this.performances.audience > 20) {
          result += 10000 + 500 * (this.performances.audience - 20);
        }
        result += 300 * this.performances.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${this.play.type}`);
    }
    return result;
  }

  get volumeCredits() {
    let result = 0;
    result += Math.max(this.performances.audience - 30, 0);
    if ("comedy" === this.play.type)
      result += Math.floor(this.performances.audience / 5);
    return result;
  }
}

class TragedyCalculator extends PerformanceCalculator {}

class ComedyCalculator extends PerformanceCalculator {}
