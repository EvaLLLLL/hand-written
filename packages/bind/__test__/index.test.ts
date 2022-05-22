// @ts-nocheck
// import '../es6.js'
import '../es3.js'

function foo(arg0, arg1, arg2) {
  return {
    name: this.name,
    arg0,
    arg1,
    arg2,
  }
}

describe('bind', () => {
  test('real bind', () => {
    expect(foo.bind({ name: 'curry' })().name).toBe('curry')
  })

  test('test real bind args', () => {
    expect(foo.bind({ name: 'bind name' }, 111, 222, 333)()['arg0']).toBe(111)
  })

  test('my bind is a function', () => {
    expect(foo.myBind).toBeInstanceOf(Function)
  })

  test('my bind can really bind', () => {
    expect(foo.myBind({ name: 'bind name' })().name).toBe('bind name')
  })

  test('test my bind args', () => {
    expect(foo.myBind({ name: 'bind name' }, 111)()['arg0']).toBe(111)
  })
})
