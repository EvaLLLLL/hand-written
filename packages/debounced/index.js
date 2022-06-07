// 防抖
const debounced = function (fn, time) {
  let timer = null

  return function (...args) {
    if (timer !== null) {
      clearTimeout()
    }

    timer = setTimeout(() => {
      fn.call(this, ...args)
      timer = null
    }, time)
  }
}
