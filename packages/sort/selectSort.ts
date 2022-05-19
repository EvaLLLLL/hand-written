function selectSort(arr: number[]) {
  const len = arr.length

  let minIndex = 0

  for (let i = 0; i < len; i++) {
    minIndex = i
    for (let j = i; j < len - 1; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }

    if (minIndex !== i) {
      ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }

  return arr
}

console.log(selectSort([3, 5, 2, 4, 6, 7]))
