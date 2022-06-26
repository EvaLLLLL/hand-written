const isObject = source => typeof source === 'object' && source !== null

function deepClone(obj, map = new Map()) {
  if (!isObject(obj) || map.has(obj)) return obj

  map.set(obj, 1)

  let target

  if (obj instanceof Array) {
    target = []
  } else if (obj instanceof Function) {
    target = new Function()
  } else if (obj instanceof Date) {
    target = new Date()
  } else {
    target = {}
  }

  map.set(target, 1)

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      target[key] = deepClone(obj[key], map)
    }
  }

  return target
}

const obj1 = {
  a: 1,
  b: { a: 2 },
}
const obj2 = deepClone(obj1)
console.log(obj1, obj2, obj1 === obj2, obj1.a === obj2.a, obj1.b === obj2.b)
