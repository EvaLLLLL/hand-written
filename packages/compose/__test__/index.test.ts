import { myCompose1 } from '../myCompose-1'

test('myCompose1', () => {
  const f1 = (a: number) => 1 + a
  const f2 = (a: number) => 2 + a
  const f3 = (a: number) => 3 + a
  const f4 = (a: number) => 4 + a
  const fn = myCompose1(f1, f2, f3, f4)

  expect(fn(1)).toBe(11)
})
