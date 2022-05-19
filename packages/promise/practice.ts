export enum Status {
  Pending = 'pending',
  Fullfilled = 'fullfilled',
  Rejected = 'rejected',
}

export class MyPromise {
  callbacks: Array<Function[]> = []
  state = Status.Pending

  resolve = (result?: any) => {
    if (this.state !== Status.Pending) return
    this.state = Status.Fullfilled

    setTimeout(() => {
      this.callbacks.forEach(handler => {
        if (handler[0] instanceof Function) {
          handler[0].call(undefined, result)
        }
      })
    })
  }

  reject = (reason?: any) => {
    if (this.state !== Status.Pending) return
    this.state = Status.Rejected

    setTimeout(() => {
      this.callbacks.forEach(handler => {
        if (handler[1] instanceof Function) {
          handler[1].call(undefined, reason)
        }
      })
    })
  }

  constructor(fn: (resolve?: Function, reject?: Function) => any) {
    fn(this.resolve.bind(this), this.reject.bind(this))
  }

  then(success?: any, fail?: any) {
    const handlers = []
    if (success instanceof Function) {
      handlers[0] = success
    }

    if (fail instanceof Function) {
      handlers[1] = fail
    }

    this.callbacks.push(handlers)
  }
}
