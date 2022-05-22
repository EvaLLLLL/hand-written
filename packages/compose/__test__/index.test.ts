// import { myCompose } from '../myCompose-1'
import { myCompose } from '../myCompose-2'

const f1 = (a: number) => 1 + a
const f2 = (a: number) => 2 + a
const f3 = (a: number) => 3 + a
const f4 = (a: number) => 4 + a

describe('compose', () => {
  test('myCompose 0 arg', () => {
    const fn = myCompose()
    expect(fn(1)).toBe(1)
  })

  test('myCompose 1 arg', () => {
    const fn = myCompose(f1)
    expect(fn(1)).toBe(2)
  })

  test('myCompose 4 args', () => {
    const fn = myCompose(f1, f2, f3, f4)
    expect(fn(1)).toBe(11)
  })
})
