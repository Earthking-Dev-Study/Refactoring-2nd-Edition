// 기존 코드
class Party {}

class Employee extends Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department extends Party {
  get totalAnnualCost() {
    return this.monthlyCost * 12;
  }
}

// 리팩터링
class Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }

  get monthlyCost() {
    throw new SubclassResponsibilityError(); // annualCost에서 사용하는 monthlyCost를 구현해야 된다는 사실을 알려줘야함
  }
}

class Employee extends Party {}

class Department extends Party {}
