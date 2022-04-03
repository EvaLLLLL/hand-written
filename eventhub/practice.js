class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(type, callback) {
    if (!this.events[type]) {
      this.events[type] = [callback]
    } else {
      this.events[type].push(callback)
    }
  }

  emit(type, ...args) {
    if (!this.events[type] || !this.events[type].length) return

    this.events[type].forEach(f => {
      f.call(this, ...args)
    })

    this.events[type] = []
  }

  off(type, fn) {
    if (!this.events[type] || !this.events.length) return
    this.events[type].filter(f => f !== fn)
  }

  once(type, callback) {
    function fn() {
      callback()
      this.off(type, fn)
    }

    this.on(type, fn)
  }
}

const e = new EventEmitter()
console.log(e)

const handle = (...rest) => {
  console.log(rest)
}

e.on('click', handle)

e.emit('click', 1, 2, 3, 4)

e.off('click', handle)

e.emit('click', 1, 2)

e.once('dbClick', () => {
  console.log(123456)
})
e.emit('dbClick')
e.emit('dbClick')
