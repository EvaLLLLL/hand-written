// import { Promise2 as MyPromise, Status } from "./promise";
import { MyPromise, Status } from '../practice2'
jest.spyOn(global, 'setTimeout')

jest.useFakeTimers()

describe('MyPromise', () => {
  test('MyPromise 是一个类', () => {
    expect(MyPromise).toBeInstanceOf(Function)
  })

  test('new MyPromise(fn) 会生成一个对象，对象有 then 方法', () => {
    const promise = new MyPromise(() => {})
    expect(promise.then).toBeInstanceOf(Function)
  })

  test('new MyPromise(fn) 中的 fn 立即执行', () => {
    let fn = jest.fn()
    const promise = new MyPromise(fn)
    expect(fn).toHaveBeenCalled()
  })

  test('new MyPromise(fn) 中的 fn 执行的时候必须接受一个 resolve 和 reject 两个函数', () => {
    new MyPromise((resolve, reject) => {
      expect(resolve).toBeInstanceOf(Function)
      expect(reject).toBeInstanceOf(Function)
    })
  })

  test('promise.then(success) 中的 success 会在 resolve 被调用的时候执行', () => {
    const success = jest.fn()
    const promise = new MyPromise((resolve, reject) => {
      expect(success).not.toHaveBeenCalled()

      resolve()

      setTimeout(() => {
        expect(success).toBeCalled()
      })
    })

    promise.then(success)
  })

  test('promise.then(success, fail) 中的 fail 会在 reject 被调用的时候执行', () => {
    const fail = jest.fn()
    const promise = new MyPromise((resolve: any, reject: any) => {
      expect(fail).not.toHaveBeenCalled()
      reject()

      setTimeout(() => {
        expect(fail).toHaveBeenCalled()
      })
    })

    promise.then(() => {}, fail)
  })

  test('2.2.1', () => {
    const promise = new MyPromise((resolve: any) => {
      resolve()
    })
    promise.then(false, null)
  })

  test('2.2.2', () => {
    const succeed = jest.fn()
    const promise = new MyPromise((resolve: any) => {
      expect(succeed).not.toHaveBeenCalled()
      resolve(233)
      resolve(23333)

      setTimeout(() => {
        expect(promise.status).toEqual(Status.Fullfilled)
        expect(succeed).toHaveBeenCalledTimes(1)
        expect(succeed).toHaveBeenCalledWith(233)
      })
    })

    promise.then(succeed)
  })

  test('2.2.3', () => {
    const failed = jest.fn()
    const promise = new MyPromise((resolve: any, reject: any) => {
      expect(failed).not.toHaveBeenCalled()
      reject(233)
      reject(23333)

      setTimeout(() => {
        expect(promise.status).toEqual(Status.Rejected)
        expect(failed).toHaveBeenCalledTimes(1)
        expect(failed).toHaveBeenCalledWith(233)
      })
    })

    promise.then(() => {}, failed)
  })

  test('2.2.4 在我的代码执行完之前，不得调用 then 后面的俩函数', () => {
    const succeed = jest.fn()
    const promise = new MyPromise((resolve: any) => {
      resolve()
    })

    promise.then(succeed)
    expect(succeed).not.toHaveBeenCalled()

    setTimeout(() => {
      expect(succeed).toHaveBeenCalled()
    })
  })

  test('2.2.4 失败回调', () => {
    const failed = jest.fn()
    const promise = new MyPromise((resolve: any, reject: any) => {
      reject()
    })

    promise.then(null, failed)
    expect(failed).not.toHaveBeenCalled()

    setTimeout(() => {
      expect(failed).toHaveBeenCalled()
    })
  })

  test('2.2.5 ', () => {
    const promise = new MyPromise(resolve => {
      resolve()
    })

    promise.then(function () {
      'use strict'
      // @ts-ignore
      expect(this).toBeUndefined()
    })
  })

  test('2.2.6 then 可以在同一个 promise 里被多次调用', () => {
    const promise = new MyPromise(resolve => {
      resolve()
    })

    const callbacks = [jest.fn(), jest.fn(), jest.fn()]
    promise.then(callbacks[0])
    promise.then(callbacks[1])
    promise.then(callbacks[2])

    setTimeout(() => {
      expect(callbacks[0]).toHaveBeenCalled()
      expect(callbacks[1]).toHaveBeenCalled()
      expect(callbacks[2]).toHaveBeenCalled()
    })
  })
})
