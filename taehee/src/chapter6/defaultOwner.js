let defaultOwner = {
  fistName: '마틴',
  lastName: '파울러',
};

export function getDefaultOwner() {
  return defaultOwner;
}

export function setDefaultOwner(arg) {
  defaultOwner = arg;
}
