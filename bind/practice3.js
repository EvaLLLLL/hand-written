Function.prototype.myBind = (asThis, ...args) => {
  asThis = asThis || window
  const fn = this

  function resultFn(...args2) {
    fn(this instanceof resultFn ? this : asThis, ...args, ...args2)
  }

  return resultFn
}
