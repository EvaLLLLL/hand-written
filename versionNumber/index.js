function sortVersionNumber(arr) {
  arr.sort((a, b) => {
    let i = 0
    const arr1 = a.split('.')
    const arr2 = b.split('.')

    while (i < Math.max(arr1.length, arr2.length)) {
      let s1 = arr1[i],
        s2 = arr2[i]
      i++

      if (s1 === undefined || s2 === undefined) {
        return arr2.length - arr1.length
      }

      if (s1 === s2) {
        continue
      }

      return s2 - s1
    }
  })

  return arr
}

// function sortVersionNumber(arr) {
//   arr.sort((a, b) => {
//     let i = 0
//     const arr1 = a.split('.')
//     const arr2 = b.split('.')

//     while (true) {
//       const s1 = arr1[i]
//       const s2 = arr2[i]
//       i++
//       if (s1 === undefined || s2 === undefined) {
//         return arr2.length - arr1.length
//       }

//       if (s1 === s2) continue

//       return s2 - s1
//     }
//   })

//   return arr
// }

const res = sortVersionNumber([
  '0.1.1',
  '2.3.3',
  '0.302.1',
  '4.2',
  '4.3.5',
  '4.3.4.5',
])
// ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']
console.log(res)
