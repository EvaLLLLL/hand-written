export function myCompose(...funcs: Function[]) {
  if (funcs.length === 0) {
    return <T>(arg: T) => arg
  }

  return funcs.reduce((pre, curr) => {
    return (...args: any) => {
      return pre(curr(...args))
    }
  })
}
