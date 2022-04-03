function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype)
  const result = fn.apply(obj, args)
  return result && (typeof result === 'object' || typeof result === 'function')
    ? result
    : obj
}

function Person(name, age) {
  this.name = name
  this.age = age
}

const p = myNew(Person, 'lll', 18)
console.log(p.name)
console.log(p.age)
console.log(p)
