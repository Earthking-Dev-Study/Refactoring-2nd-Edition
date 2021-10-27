// 기존 코드
function plumages(birds) {
  return new Map(birds.map(birds.map((b) => [b.name, b.plumage(b)])));
}

function speeds(birds) {
  return new Map(birds.map((b) => [b.name, b.airSpeedVelocity(b)]));
}

// 깃털 상태
function plumage(bird) {
  switch (bird.name) {
    case "유럽 제비":
      return "보통이다";
    case "아메리카 제비":
      return bird.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
    case "노르웨이 파랑 앵무":
      return bird.voltage > 100 ? "그을렸다" : "예쁘다";
    default:
      return "알 수 없다";
  }
}

// 비행 속도
function airSpeedVelocity(bird) {
  switch (bird.type) {
    case "유럽 제비":
      return 35;
    case "아메리카 제비":
      return 40 - 2 * bird.numberOfCoconuts;
    case "노르웨이 파랑 앵무":
      return bird.isNailed ? 0 : 10 + bird.voltage / 10;
    default:
      return null;
  }
}

// 리팩토링

function plumages(birds) {
  return new Map(
    birds.map((b) => createBird(b)).map((bird) => [bird.name, bird.plumage])
  );
}

function speeds(birds) {
  return new Map(
    birds
      .map((b) => createBird(b))
      .map((bird) => [bird.name, bird.airSpeedVelocity])
  );
}

// 깃털 상태
function plumage(bird) {
  return createBird(bird).plumage;
}

// 비행 속도
function airSpeedVelocity(bird) {
  return createBird(bird).airSpeedVelocity;
}

function createBird(bird) {
  switch (bird.type) {
    case "유럽 제비":
      return new EuropeanSwallow(bird);
    case "아메리카 제비":
      return new AfricanSwallow(bird);
    case "노르웨이 파랑 앵무":
      return new NorwegianBlueParrot(bird);
    default:
      return new Bird(bird);
  }
}

class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }

  get plumage() {
    return "알 수 없다.";
  }

  get airSpeedVelocity() {
    return null;
  }
}

class EuropeanSwallow extends Bird {
  constructor(birdObject) {
    super(birdObject);
  }
  get plumage() {
    return "보통이다";
  }

  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallow extends Bird {
  constructor(birdObject) {
    super(birdObject);
  }
  get plumage() {
    return this.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
  }

  get airSpeedVelocity() {
    return 40 - 2 * this.numberOfCoconuts;
  }
}

class NorwegianBlueParrot extends Bird {
  constructor(birdObject) {
    super(birdObject);
  }
  get plumage() {
    return this.voltage > 100 ? "그을렸다" : "예쁘다";
  }

  get airSpeedVelocity() {
    return this.isNailed ? 0 : 10 + this.voltage / 10;
  }
}

/**
 * 느낀점:
 * 내가 아직 객체지향의 다형성에 대해서 크게 잘 모르고 있었다.
 * 이번 리팩토링을 통해서 조금 감은 ? 잠은 느낌이다
 */
