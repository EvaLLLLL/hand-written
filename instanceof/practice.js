function myInstanceof(obj, target) {
  while (true) {
    if (obj['__proto__'] === null) return false

    if (obj['__proto__'] === target.prototype) {
      return true
    }

    obj = obj['__proto__']
  }
}

console.log(myInstanceof({}, Object))
console.log(myInstanceof(2, Number))
console.log(myInstanceof('', String))
console.log(myInstanceof('1', String))
