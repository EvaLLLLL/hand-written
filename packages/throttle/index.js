// 节流
const throttle = (fn, time) => {
  let flag = false

  return (...args) => {
    if (flag) return
    fn(...args)
    flag = true

    setTimeout(() => {
      flag = false
    }, time)
  }
}


const throttle = (fn, time) => {
  let flag = false
  
  return (...args) => {
    if (flag) return
    
    fn(...args)
    flag = true
    
    setTimeout(() => flag = false, time)
  }
}
