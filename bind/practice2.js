// bind
Function.prototype.myBind = function (asThis, ...args) {
  asThis = asThis || window
  const fn = this

  function resultFn(...args2) {
    fn.call(this instanceof resultFn ? this : asThis, ...args, ...args2)
  }

  return resultFn
}

// call
Function.prototype.myCall = function (asThis, ...args) {
  asThis = asThis || window

  let symbol = Symbol()
  asThis[symbol] = this

  return asThis[symbol](...args)
}

// apply
Function.prototype.myApply = function (asThis, args) {
  asThis = asThis || window

  let symbol = Symbol()
  asThis[symbol] = this

  return asThis[symbol](...args)
}
