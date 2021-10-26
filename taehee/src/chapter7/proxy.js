import _ from 'lodash';

const person = new Proxy(
  { name: 'test' },
  {
    get: function (obj, prop) {
      return _.cloneDeep(obj[prop]);
    },
  }
);

const test = person;
test.name = 'gogo';
console.log(person);
console.log(test);

const nameTest = {
  name: 'test',
};

const clone = _.cloneDeep(nameTest);

clone.name = 'dohyun';
console.log(clone);
console.log(nameTest);
