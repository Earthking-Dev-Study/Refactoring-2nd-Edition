// 기존 코드
class Person {
  get name() {
    return this._name;
  }
  set name(arg) {
    return (this._name = arg);
  }

  get id() {
    return this._id;
  }
  set id(arg) {
    return (this._id = arg);
  }
}

const martin = new Person();
martin.name = "마틴";
martin.id = "1234";

// 리팩터링
/**
 * 사람의 속성 중 이름은 객체를 생성한 뒤라도 변경될 수 있겠지만 id는 그러면 안된다.
 * 이 의도를 명확히 알리기 위해 ID 세터를 없애보자
 */

class Person {
  constructor(id) {
    this.id = id;
  }

  get name() {
    return this._name;
  }
  set name(arg) {
    return (this._name = arg);
  }
  get id() {
    return this._id;
  }
}

const martin = new Person("1234");
martin.name = "마틴";
