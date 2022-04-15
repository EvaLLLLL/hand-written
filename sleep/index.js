const sleep = timeOut => {
  return new Promise(resolve => setTimeout(resolve, timeOut))
}

;(async () => {
  console.log('11111111, ' + new Date())
  await sleep(2000)
  console.log('22222222, ' + new Date())
  await sleep(2000)
  console.log('33333333, ' + new Date())
})()
