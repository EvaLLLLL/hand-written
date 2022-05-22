var slice = Array.prototype.slice

Function.prototype.myBind = function (asThis) {
  var args = slice.call(arguments, 1)

  var fn = this
  if (typeof fn !== 'function') {
    throw new Error('what is trying to bind is not callable')
  }

  function resultFn() {
    var args2 = slice.call(arguments, 1)
    return fn.apply(
      resultFn.prototype.isPrototypeOf(this) ? this : asThis,
      args.concat(args2),
    )
  }

  resultFn.prototype = fn.prototype
  return resultFn
}
