const obj = {
  prop: {
    test: 'go',
  },
};

Object.freeze(obj);

// obj.prop = 33;
obj.prop.test = 'gosss';
// Throws an error in strict mode

console.log(obj.prop);
// expected output: 42
