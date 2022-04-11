Function.prototype.myCall = (asThis, ...args) => {
  const asThis = asThis || window
  let symbol = Symbol()
  asThis[symbol] = this
  return asThis[symbol](...args)
}
