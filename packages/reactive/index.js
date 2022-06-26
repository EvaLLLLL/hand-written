const watch = (obj, setBind, getLogger) => {
  return new Proxy(obj, {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    },
  })
}

let obj = { a: 1 }
let watchedObj = watch(
  obj,
  (v, property) => {
    console.log(`监听到属性 '${property}' 改变为 ${v}`)
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  },
)

watchedObj.a = 2
watchedObj.a
