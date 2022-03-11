const bind = require("./index");
Function.prototype.bind2 = bind;
console.assert(Function.prototype.bind2 !== undefined);

const fn1 = function () {
  return this;
};

const newFn1 = fn1.bind2({ name: "eva" });
console.assert(newFn1().name === "eva");

const fn2 = function (p1, p2) {
  return [this, p1, p2];
};

const newFn2 = fn2.bind({ name: "eva" }, 123, 456);
console.assert(newFn2()[0].name === "eva");
console.assert(newFn2()[1] === 123);
console.assert(newFn2()[2] === 456);

const anotherFn2 = fn2.bind({ name: "eva" });
console.assert(anotherFn2(123, 345)[0].name === "eva");
console.assert(anotherFn2(123, 345)[1] === 123);
console.assert(anotherFn2(123, 345)[2] === 345);

const anotherFn3 = fn2.bind({ name: "eva" }, 123);
console.assert(anotherFn3(345)[0].name === "eva");
console.assert(anotherFn3(345)[1] === 123);
console.assert(anotherFn3(345)[2] === 345);
