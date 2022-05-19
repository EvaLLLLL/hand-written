function myInstanceof(target, asConstructor) {
  while (true) {
    if (target['__proto__'] === null) {
      return false
    }

    if (target['__proto__'] === asConstructor.prototype) {
      return true
    }

    target = target['__proto__']
  }
}

console.log(myInstanceof(() => {}, Function))
console.log(myInstanceof({}, Object))
console.log(myInstanceof(2, Number))
console.log(myInstanceof('', String))
console.log(myInstanceof('1', String))
