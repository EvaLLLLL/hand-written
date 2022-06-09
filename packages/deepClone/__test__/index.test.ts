const DeepCloner = require('../index')

describe('deepClone', () => {
  test('能复制基本类型', () => {
    const n = 123,
      s = '123',
      b = true,
      u = undefined,
      w = null,
      sym = Symbol(),
      bigint = 1n,
      cloner = new DeepCloner()

    expect(cloner.clone(n)).toEqual(n)
    expect(cloner.clone(s)).toEqual(s)
    expect(cloner.clone(b)).toEqual(b)
    expect(cloner.clone(u)).toEqual(u)
    expect(cloner.clone(w)).toEqual(w)
    expect(cloner.clone(sym)).toEqual(sym)
    expect(cloner.clone(bigint)).toEqual(bigint)
  })

  test('能够复制普通对象', () => {
    const a = {
        name: 'a',
        child: {
          name: 'eva',
        },
      },
      cloner = new DeepCloner()

    const a2 = cloner.clone(a)
    expect(a).not.toBe(a2)
    expect(a.name).toEqual(a2.name)
    expect(a.child).not.toBe(a2.child)
    expect(a.child.name).toEqual(a2.child.name)
  })

  test('能够复制数组对象', () => {
    const a = [[11, 22, 33], []]
    const a2 = new DeepCloner().clone(a)
    expect(a).not.toBe(a2)
    expect(a[0]).not.toBe(a2[0])
    expect(a[1]).not.toBe(a2[1])
    expect(a).toEqual(a2)
  })

  test('能复制函数', () => {
    const a = function (x: number, y: number) {
      return x + y
    }
    a.xxx = { yyy: { zzz: 1 } }
    const a2 = new DeepCloner().clone(a)
    expect(a).not.toBe(a2)
    expect(a.xxx.yyy).not.toBe(a2.xxx.yyy)
    expect(a.xxx).not.toBe(a2.xxx)
    expect(a.xxx).toEqual(a2.xxx)
    expect(a(1, 2)).toEqual(a2(1, 2))
  })

  test('环也能复制', () => {
    const a = { name: 'a' }
    // @ts-ignore
    a.self = a
    const a2 = new DeepCloner().clone(a)
    expect(a).not.toBe(a2)
    expect(a.name).toEqual(a2.name)
    // @ts-ignore
    expect(a.self).not.toBe(a2.self)
  })

  test('能复制正则表达式', () => {
    // const a = /hi\d+/gi
    const a = new RegExp('hi\\d+', 'gi')
    const a2 = new DeepCloner().clone(a)
    expect(a).not.toBe(a2)
    expect(a.source).toBe(a2.source)
    expect(a.flags).toBe(a2.flags)
  })

  test('能复制日期', () => {
    const a = new Date()
    const a2 = new DeepCloner().clone(a)
    expect(a).not.toBe(a2)
    expect(a.getTime()).toBe(a2.getTime())
  })

  test('会跳过原型属性', () => {
    const a = Object.create({ name: 'a' })
    a.xxx = { yyy: { zzz: 1 } }
    const a2 = new DeepCloner().clone(a)
    expect(a).not.toBe(a2)
    expect(a2).not.toContain('name')
    expect(a.xxx.yyy).not.toBe(a2.xxx.yyy)
    expect(a.xxx).not.toBe(a2.xxx)
    expect(a.xxx).toEqual(a2.xxx)
  })
})
