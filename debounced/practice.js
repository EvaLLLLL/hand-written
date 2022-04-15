// 防抖
const debounced = (fn, time) => {
  let timer = null

  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn(...args)
    }, time)
  }
}


const debounced = (fn, time) => {
  let timer = null
  
  return (...args) => {
    if (timer !== null ) {
      clearTimeout(timer)
    }
    
    timer = setTimeout(() => {
      fn(...args)
    }, time)
  }
}
