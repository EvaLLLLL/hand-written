export function myCompose(...funcs: Function[]) {
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
