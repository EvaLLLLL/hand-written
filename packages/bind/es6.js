Function.prototype.myBind = function (asThis, ...args) {
  const fn = this
  function resultFn(...aArgs2) {
    return fn.call(this instanceof resultFn ? this : asThis, ...args, ...aArgs2)
  }

  resultFn.prototype = fn.prototype
  return resultFn
}
