// 기존 코드
class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get genderCode() {
    return "X";
  }
}

class Male extends Person {
  get genderCode() {
    return "M";
  }
}

class Female extends Person {
  get genderCode() {
    return "F";
  }
}

function loadFromInput(data) {
  const result = [];
  data.forEach((aRecord) => {
    let p;
    switch (aRecord.gender) {
      case "M":
        p = new Male(aRecord.name);
        break;

      case "F":
        p = new Female(aRecord.name);
        break;

      default:
        p = new Person(aRecord.name);
    }
    result.push(p);
  });
  return result;
}

// 리팩터링

class Person {
  constructor(name, genderCode) {
    this._name = name;
    this._genderCode = genderCode;
  }

  get name() {
    return this._name;
  }

  get genderCode() {
    return this._genderCode;
  }

  get isMale() {
    return "M" === this._genderCode;
  }

  get isFemale() {
    return "F" === this._genderCode;
  }
}

function createPerson(aRecord) {
  switch (aRecord.gender) {
    case "M":
      return new Male(aRecord.name, "M");
    case "F":
      return new Female(aRecord.name, "F");
    default:
      return new Person(aRecord.name, "X");
  }
}

function createMale(name) {
  return new Male(name);
}

function createFemale(name) {
  return new Female(name);
}

function loadFromInput(data) {
  return data.map((aRecord) => createPerson(aRecord));
}
