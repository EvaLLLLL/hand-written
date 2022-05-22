Function.prototype.myCall = function (asThis, ...args) {
  asThis = asThis || window

  let symbol = Symbol()
  asThis[symbol] = this

  return asThis[symbol](...args)
}
