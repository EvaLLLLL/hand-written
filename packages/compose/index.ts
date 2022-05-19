function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    return <T>(arg: T) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce(
    (pre, curr) =>
      (...args: any) =>
        pre(curr(...args)),
  )
}

const f1 = (a: number) => 1 + a
const f2 = (a: number) => 2 + a
const f3 = (a: number) => 3 + a
const fn = compose(f1, f2, f3)

function myCompose(...funcs: Function[]) {
  if (!funcs.length) return (v: any) => v
  if (funcs.length === 1) return funcs[0]

  return funcs.reduce(
    (pre, curr) =>
      (...args: any) =>
        pre(curr(...args)),
  )
}
