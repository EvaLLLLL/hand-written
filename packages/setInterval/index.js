function myInterval(fn, time) {
  let timer
  const exec = () => {
    fn()
    timer = setTimeout(exec, time)
  }

  setTimeout(() => exec(), time)

  return {
    cancel: () => clearTimeout(timer),
  }
}

const { cancel } = myInterval(() => console.log('hi'), 1000)
