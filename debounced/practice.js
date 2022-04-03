// 防抖
const debounced = (fn, time) => {
  let timer = null

  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, time)
  }
}
