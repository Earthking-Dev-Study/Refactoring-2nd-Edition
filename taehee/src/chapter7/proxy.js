const person = new Proxy(
  {},
  {
    set: function (obj, prop, value) {
      console.log(obj, prop, value);
      return false;
    },
  }
);

person.name = 'taehee';
