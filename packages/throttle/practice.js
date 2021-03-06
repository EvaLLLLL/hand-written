// 节流
const throttle = (fn, time) => {
  let flag = false

  return (...args) => {
    if (flag) return

    flag = true
    fn.call(...args)

    setTimeout(() => {
      flag = false
    }, time)
  }
}
