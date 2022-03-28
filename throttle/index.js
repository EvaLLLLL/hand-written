// 节流
const throttle = (fn, time) => {
  let flag = false

  return (...args) => {
    if (flag) return
    fn.call(undefined, ...args)
    flag = true

    setTimeout(() => {
      flag = false
    }, time)
  }
}
