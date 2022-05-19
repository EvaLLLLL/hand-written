const bind = require("./index");

test1("fn.bind 能用");
test2("this 绑定成功");
test3("this, p1, p2 绑定成功");
test4("this, p1 绑定成功，后传 p2, 绑定成功");
test5("new 的时候绑定了 p1, p2");
test6("new 的时候绑定了 p1, p2, 并且 fn 有 sayHi");
test7("不用 new , 但是用类似的对象");

function test1(message) {
  console.log(message);
  Function.prototype.bind2 = bind;
  console.assert(Function.prototype.bind2 !== undefined);
}

function test2(message) {
  console.log(message);
  Function.prototype.bind2 = bind;
  const fn1 = function () {
    return this;
  };

  const newFn1 = fn1.bind2({ name: "eva" });
  console.assert(newFn1().name === "eva");
}

function test3(message) {
  console.log(message);
  Function.prototype.bind2 = bind;
  const fn2 = function (p1, p2) {
    return [this, p1, p2];
  };

  const anotherFn2 = fn2.bind({ name: "eva" });
  console.assert(anotherFn2(123, 345)[0].name === "eva");
  console.assert(anotherFn2(123, 345)[1] === 123);
  console.assert(anotherFn2(123, 345)[2] === 345);
}

function test4(message) {
  console.log(message);
  Function.prototype.bind2 = bind;
  const fn2 = function (p1, p2) {
    return [this, p1, p2];
  };

  const anotherFn = fn2.bind({ name: "eva" }, 123);
  console.assert(anotherFn(345)[0].name === "eva");
  console.assert(anotherFn(345)[1] === 123);
  console.assert(anotherFn(345)[2] === 345);
}

function test5(message) {
  console.log(message);
  Function.prototype.bind2 = bind;
  const fn = function (p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };

  const fn2 = fn.bind2(undefined, "x", "y");
  const object = new fn2();
  console.assert(object.p1 === "x", "x");
  console.assert(object.p2 === "y", "y");
}

function test6(message) {
  console.log(message);
  Function.prototype.bind2 = bind;
  const fn = function (p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };

  fn.prototype.sayHi = function () {};
  const fn2 = fn.bind2(undefined, "x", "y");
  const object = new fn2();
  console.assert(object.p1 === "x", "x");
  console.assert(object.p2 === "y", "y");
  //   console.assert(object.__proto__ === fn.prototype);
  console.assert(fn.prototype.isPrototypeOf(object));
  console.assert(typeof object.sayHi === "function");
}

function test7(message) {
  console.log(message);
  Function.prototype.bind2 = bind;
  const fn = function (p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };

  fn.prototype.sayHi = function () {};
  const object1 = new fn("a", "b");
  const fn2 = fn.bind2(object1, "x", "y");
  const object = fn2();
  console.assert(object === undefined, "object 为空");
  console.assert(object1.p1 === "x", "x");
  console.assert(object1.p2 === "y", "y");
}
