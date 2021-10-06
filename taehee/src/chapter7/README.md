## 레코드 캡슐화하기 (Encapsulate Record)

### Before

```javascript
organization = {name: '김태희', country: 'GB'};
```

### After

```javascript
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  } 
  
  get name() { return this._name; }
  set name(arg) { this._name = arg; }
  get country() { return this._country; }
  set country(arg) { this._country = arg; }
}
```



## 7장 토론

### 236쪽 아래부분 [7-1] 레코드 캡슐화하기

> 계산해서 얻을수 있는 값과 그렇지 않은 값을 명확히 구분해 저장해야 하는 점이 번거롭다.
 
```javascript
// 1
{ start: 1, end: 5},

// 2
{ start:1, length: 5 },

// 3
{ end: 5, length: 5 }
```

이렇게 정보를 저장하게되면 1번같은경우에는 `계산해서 얻을수 있는 값`은 length(길이)가 되고

2번같은경우는 end, 3번같은경우는 start가 된다. 이렇게 계산해서 얻을수 있는 값(레코드의 필드에 나와있지 않은 값, 가령 1번의 길이와 같음)과 계산하지 않아도 되는 값, 레코드의 필드로서 실제로 존재하는 값들(1번같은 경우 start,end가 해당)을 명확히 우리가 `알고, 구분해야` 한다.

그럼 이것을 사용하는 클라이언트의 경우 계산해야하는 값, 계산하지않아도 되는 값을 신경써서 개발을 진행해야한다.

여기까지 이러한 데이터를 `레코드로 저장`할때 이고, 객체를 사용하면 이러한 점을 극복 할수 있다.

객체를 사용하게되면 가변 데이터를 저장해도 이러한 데이터를 어떻게 저장했는지 숨긴 채 세 가지 값을 각각의 메서드로 제공할 수 있으므로 사용하는 클라이언트 입장에서도 미리 준비된 메서드를 사용 하기만 하면된다.

이는 제공자 입장에서도 만들어 놓기만 하면되고, 사용자 입장에서는 가져다 쓰기만하면되므로 상당히 편하고 레코드의 약점을 극복할수 있다. 아래의 실제 예를 통해 이 말을 더 잘 이해해보자.

```javascript
// 제공자
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  } 
  
  get start() {
    return start;
  }
  
  get end() {
    return end;
  }
  
  // 제공자가 length getter를 만들어 놓기만 하면 제공자와 사용자가 둘다 편해진다.
  get length() {
    return end - start;
  }
}
```

이렇게 start와 end만 알면 length또한 자동적으로 알수있다.

### 237 윗 부분 [7-1] 레코드 캡슐화하기

> 캡슐화하면 이름을 바꿀때도 좋다. 필드 이름을 바꿔도 기존 이름과 새 이름 모두를 각각의 메서드로 제공할 수 있다.
 
```javascript
class Range {
  // 위의 내용과 동일
  
  get length() {
    return end - start;
  }
  
  get renameLength() {
    return end - start;
  }
}
``` 

이렇게 length를 renameLength로 이름을 변경할때도 한번에 모두 바꾸지 않고 점진적으로 renameLength로 이름을 바꿀수 있다.

