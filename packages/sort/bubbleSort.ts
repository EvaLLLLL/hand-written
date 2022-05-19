// 冒泡排序的过程，就是从第一个元素开始，重复比较相邻的两个项，若第一项比第二项更大，则交换两者的位置；反之不动

function bubbleSort(arr: number[]) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }

  return arr
}

function betterBubbleSort(arr: number[]) {
  const len = arr.length

  for (let i = 0; i < len; i++) {
    let flag = false
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        flag = true
      }
    }

    // 若一次交换也没发生，说明数组有序，直接返回
    if (flag === false) return arr
  }

  return arr
}

const res2 = bubbleSort([3, 5, 2, 4, 6, 7])
console.log(res2)
