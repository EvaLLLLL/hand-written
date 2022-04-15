function myInstanceOf(target, asConstructor) {
  while (true) {
    if (target === null) {
      return false
    }

    if (target.__proto__ === asConstructor.prototype) {
      return true
    }

    target = target.__proto__
  }
}

console.log(myInstanceOf(() => {}, Function))
