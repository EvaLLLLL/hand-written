// @ts-nocheck
import '../index'

function foo() {
  return this.name
}

describe('call', () => {
  test('test real call', () => {
    expect(foo.call({ name: 'real call' })).toBe('real call')
  })

  test('my call is a function', () => {
    expect(foo.myCall).toBeInstanceOf(Function)
  })

  test('test my call', () => {
    expect(foo.myCall({ name: 'my call' })).toBe('my call')
  })
})
