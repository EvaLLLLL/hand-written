function mySetTimeout(fn, time) {
  const timer = setInterval(() => {
    clearInterval(timer)
    fn()
  }, time)
}

mySetTimeout(() => console.log('hi'), 3000)
