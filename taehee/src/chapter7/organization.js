// 레코드 캡슐화 대상
const organization = { name: '김태희', country: 'KR' };

// result += `<h1>${organization.name}</h1>;` // 읽기 예
// organization.name = newName; // 쓰기 예

// 변수 캡슐화하기
function getRawDataOfOrganization() {
  return organization;
}

// 캡슐화 후 변한 읽기 예와 쓰기 예
// result += `<h1>${getRawDataOfOrganization().name}</h1>`;
// getRawDataOfOrganization().name = newName;

class Organization {
  constructor(data) {
    this._data = data;
  }

  set name(aString) {
    this._data.name = aString;
  }

  get name() {
    return this._data.name;
  }
}

// 클래스 만든후변화
const organization = new Organization({ name: '김태희', country: 'KR' });
function getRawDataOfOrganization() {
  // Deprecated After Organization class have getter and setter
  return organization._data;
}
function getOrganization() {
  return organization;
}

// name setter를 만든후 쓰기부분 변화
getOrganization().name = newName;

// name getter를 만든후 읽기부분 변화
result += `<h1>${getOrganization().name}</h1>`;

// 이렇게 하고나면 getRawDataOfOrganization는 필요 없으므로 제거해도 된다

// 그러고 나서 _data의 필드들(name, country)를 객체 안에 바로 펼쳐놓으면 더 깔끔할것 같다.

class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() {
    return this._name;
  }
  set name(aString) {
    this._name = aString;
  }
  get country() {
    return this._country;
  }
  set country(aCountryCode) {
    this._country = aCountryCode;
  }
}
