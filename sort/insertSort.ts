const insertSort = (arr: number[]) => {
  const len = arr.length

  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        ;[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      } else {
        break
      }
    }
  }

  return arr
}

console.log(insertSort([3, 5, 2, 4, 6, 7]))
