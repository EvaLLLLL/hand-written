function flatObj(o) {
  if (typeof o !== 'object') {

    throw new Error(`TypeError: need a object type but get a ${typeof o}`)
  }

  const res = {}

  const flat = (obj, preKey = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      // preKey默认是'', 如果是递归入口 preKey有值 需要加 . 或者 [] 分割
      let newKey = key
      if (preKey) {
        newKey = `${preKey}${Array.isArray(obj) ? `[${newKey}]` : `.${newKey}`}`
      }

      // 引用类型继续递归拍平, 基本类型设置到结果对象上
      if (value && typeof value === 'object') {
        return flat(value, newKey)
      }

      res[newKey] = value
    })
  }

  flat(o)
  return res
}

const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 },
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3,
}

console.log(flatObj(obj))
/* 
  {   
      'a.b': 1,  
      'a.c': 2, 
      'a.d.e': 5, 
      'b[0]': 1, 
      'b[1]': 3,    
      'b[2].a': 2,   
      'b[2].b': 3  
       c: 3  
  }
*/
