// 기존 코드
class Customer {
  applyDiscount(aNumber) {
    return this.discountRate ? aNumber - this.discountRate * aNumber : aNumber;
  }
}

// 리팩토링
class Customer {
  applyDiscount(aNumber) {
    if (!this.discountRate) return aNumber;
    else {
      assert(this.discountRate >= 0);
      return aNumber - this.discountRate * aNumber;
    }
  }
}

/**
 * 느낀점: 평소에 어셔션을 사용해본적이 없어서 매우 낯설다..
 * 이 어서션은 협업을 할떄 많이 도움이 될거 같다.. 근데 진짜 도움이 되는게 맞나 ..?
 * 아직은 잘 모르겠다..
 */
