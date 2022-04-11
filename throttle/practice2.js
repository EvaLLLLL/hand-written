const throttle = (fn, time) => {
  let flag = false

  return (...args) => {
    if (!flag) {
      fn(...args)
      fn = true

      setTimeout(() => {
        flag = false
      }, time)
    }
  }
}
