function currying(fn, ...args) {
  let allArgs = [...args]
  const resultFn = (...args2) => {
    allArgs = [...allArgs, ...args2]
    if (allArgs.length === fn.length) {
      return fn(...allArgs)
    } else {
      return resultFn
    }
  }

  return resultFn
}

const addF = (a, b, c) => a + b + c
const a = currying(addF, 1)
console.log(a(2, 3))

function add(...args) {
  let allArgs = [...args]

  const resultFn = (...args2) => {
    allArgs = [...allArgs, ...args2]

    if ([...args2].length === 0) {
      return allArgs.reduce((pre, curr) => pre + curr)
    }

    return resultFn
  }

  return resultFn
}

console.log(add(1)(2)(3)())
console.log(add(1, 2, 3)(4)())
