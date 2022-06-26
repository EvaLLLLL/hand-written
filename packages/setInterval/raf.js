function setInterval(callback, interval) {
  let timer,
    now = Date.now
  let startTime = now(),
    endTime = startTime

  const loop = () => {
    timer = window.requestAnimationFrame(loop)
    endTime = now()

    if (endTime - startTime >= interval) {
      startTime = endTime = now()
      callback(timer)
    }
  }

  timer = window.requestAnimationFrame(loop)
  return timer
}

let a = 0
setInterval(timer => {
  a++
  if (a === 3) {
    window.cancelAnimationFrame(timer)
    console.log('--------- stopped ----------')
  }
}, 1000)
