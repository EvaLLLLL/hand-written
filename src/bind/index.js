function bind(asThis) {
  var args = slice.call(arguments, 1);

  var fn = this;
  if (typeof fn !== "function") {
    throw new Error("what is trying to bind is not callable");
  }

  return function () {
    var args2 = slice.call(arguments, 1);
    return fn.apply(asThis, args.concat(args2));
  };
}

// es6 语法等价写法
function _bind(asThis, ...args) {
  const fn = this;
  return function (...aArgs2) {
    return fn.call(asThis, ...args, ...aArgs2);
  };
}

module.exports = bind;
