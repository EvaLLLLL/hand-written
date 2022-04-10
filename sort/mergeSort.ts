const mergeSort = (arr: number[]) => {
  const len = arr.length

  if (len <= 1) return arr

  const mid = Math.floor(len / 2)

  const leftArr = mergeSort(arr.slice(0, mid))
  const rightArr = mergeSort(arr.slice(mid, len))

  arr = mergeArr(leftArr, rightArr)
  return arr
}

const mergeArr = (arr1: number[], arr2: number[]): number[] => {
  let i = 0,
    j = 0
  let result: number[] = []
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i])
      i++
    } else {
      result.push(arr2[j])
      j++
    }
  }

  if (i < arr1.length) {
    result = result.concat(arr1.slice(i))
  }

  if (j < arr2.length) {
    result = result.concat(arr2.slice(j))
  }

  return result
}

console.log(mergeSort([3, 5, 2, 4, 6, 7]))
