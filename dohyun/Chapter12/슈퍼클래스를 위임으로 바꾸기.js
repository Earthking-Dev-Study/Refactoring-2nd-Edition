// 기존 코드
class CatalogItem {
  constructor(id, title, tags) {
    this._id = id;
    this._title = title;
    this._tags = tags;
  }

  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  hasTag(arg) {
    return this._tags.includes(arg);
  }
}

class Scroll extends CatalogItem {
  constructor(id, title, tags, dateLastCleaned) {
    super(id, title, tags);
    this._lastCleaned = dateLastCleaned;
  }

  needsCleaning(targetDate) {
    const threshold = this.hasTag("revered") ? 700 : 1500;
    return this.daySinceLastCleaning(targetDate) > threshold;
  }

  daySinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}

// 리팩 터링
class CatalogItem {
  constructor(id, title, tags) {
    this._id = id;
    this._title = title;
    this._tags = tags;
  }

  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  hasTag(arg) {
    return this._tags.includes(arg);
  }
}

class Scroll {
  constructor(id, title, tags, dateLastCleaned) {
    this._catalogItem = new CatalogItem(id, title, tags);
    this._lastCleaned = dateLastCleaned;
  }

  get id() {
    return this._catalogItem.id;
  }

  get title() {
    return this._catalogItem.title;
  }

  hasTag(aString) {
    return this._catalogItem.hasTag(aString);
  }

  needsCleaning(targetDate) {
    const threshold = this.hasTag("revered") ? 700 : 1500;
    return this.daySinceLastCleaning(targetDate) > threshold;
  }

  daySinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}
