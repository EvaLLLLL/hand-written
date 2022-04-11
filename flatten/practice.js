const flat = arr => {
  return arr.reduce((pre, curr) => {
    return pre.concat(Array.isArray(curr) ? flat(curr) : [curr])
  }, [])
}

console.log(flat([1, 2, [1, [2, 3, [4, 5, [6]]]]]))
