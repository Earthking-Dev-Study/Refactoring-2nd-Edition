import plays from "../../data/plays.json";

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw new Error("서브클래스에서 처리하도록 설계되었습니다.");
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${this.play.type}`);
  }
  return new PerformanceCalculator(aPerformance, aPlay);
}

function playFor(perf) {
  return plays[perf.playID];
}

function amountFor(aPerformance) {
  return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
}

function volumeCreditsFor(aPerformance) {
  return new PerformanceCalculator(aPerformance, playFor(aPerformance))
    .volumeCredits;
}

function enrichPerformance(aPerformance) {
  const calculator = createPerformanceCalculator(
    aPerformance,
    playFor(aPerformance)
  );
  const result = Object.assign({}, aPerformance);
  result.play = calculator.play;
  result.amount = calculator.amount;
  result.volumeCredits = calculator.volumeCredits;
  return result;
}

function totalVolumeCredits(invoice) {
  // 포인트를 적립한다.
  const accumulateVolumeCredits = (acc, b) => acc + b.volumeCredits;
  return invoice.performances.reduce(accumulateVolumeCredits, 0);
}

function totalAmount(invoice) {
  const accumulateAmount = (total, b) => total + b.amount;
  return invoice.performances.reduce(accumulateAmount, 0);
}

export default function createStatementData(invoice) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;
}
