function flatten(arr) {
  return arr.reduce((pre, curr) => {
    return pre.concat(Array.isArray(curr) ? flatten(curr) : curr)
  }, [])
}


console.log(flatten([1, 2, [1, [2, 3, [4, 5, [6]]]]]))
