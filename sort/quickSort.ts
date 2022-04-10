function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr

  const len = arr.length

  const mid = Math.floor(len / 2)

  const pivot = arr.splice(mid, 1)[0]

  let leftArr: number[] = []
  let rightArr: number[] = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      leftArr.push(arr[i])
    } else {
      rightArr.push(arr[i])
    }
  }

  return [...quickSort(leftArr), pivot, ...quickSort(rightArr)]
}

console.log(quickSort([3, 5, 2, 4, 6, 7]))
