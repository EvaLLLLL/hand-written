// 防抖
const debounced = (fn, time) => {
  let timer = null

  return (...args) => {
    if (timer !== null) {
      clearTimeout()
    }

    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, time)
  }
}
