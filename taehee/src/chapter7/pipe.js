const dohyun = function(){
  this._do = 0;
  this._su = 0;
  this._tt = [];
}
dohyun.prototype.setDo = function(_d){
  this._do = _d;
  return this;
}

dohyun.prototype.setSu = function(_s){
  this._su = _s;
  return this
}

dohyun.prototype.setTt = function(…tt){
  this._tt.push(…tt)
  return this
}

const temp = new dohyun();

temp.setDo(2).setSu(3)

