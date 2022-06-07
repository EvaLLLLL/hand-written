Function.prototype.myBind = function (asThis, ...args) {
  const fn = this
  function resultFn(...args2) {
    return fn.call(this instanceof resultFn ? this : asThis, ...args, ...args2)
  }

  resultFn.prototype = fn.prototype
  return resultFn
}
