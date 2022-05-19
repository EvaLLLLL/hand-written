var slice = Array.prototype.slice;

function bind(asThis) {
  var args = slice.call(arguments, 1);

  var fn = this;
  if (typeof fn !== "function") {
    throw new Error("what is trying to bind is not callable");
  }

  function resultFn() {
    var args2 = slice.call(arguments, 1);
    return fn.apply(
      resultFn.prototype.isPrototypeOf(this) ? this : asThis,
      args.concat(args2)
    );
  }

  resultFn.prototype = fn.prototype;
  return resultFn;
}

// es6 语法等价写法
function _bind(asThis, ...args) {
  const fn = this;
  function resultFn(...aArgs2) {
    return fn.call(
      this instanceof resultFn ? this : asThis,
      ...args,
      ...aArgs2
    );
  }

  resultFn.prototype = fn.prototype;
  return resultFn;
}

module.exports = bind;
