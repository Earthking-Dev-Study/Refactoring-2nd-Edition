class Producer {
  constructor(aProvince, data) {
    this._province = aProvince;
    this._cost = data.cost;
    this._name = data.name;
    this._production = data.production || 0;
  }

  get cost() {
    return this._cost;
  }

  get name() {
    return this._name;
  }

  get production() {
    return this._production;
  }

  set cost(arg) {
    this._cost = parseInt(arg);
  }

  set production(amountStr) {
    const amount = parseInt(amountStr);
    const newProduction = Number.isNaN(amount) ? 0 : amount;
    this._province.totalProduction += newProduction - this._production;
    this._production = newProduction;
  }
}
