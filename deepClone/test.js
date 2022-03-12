const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;
const DeepCloner = require("./index");

describe("new DeepCloner().clone", () => {
  it("is a function", () => {
    assert.isFunction(new DeepCloner().clone);
  });

  it("能复制基本类型", () => {
    const n = 123;
    const n2 = new DeepCloner().clone(n);
    assert(n === n2);
    const s = "123";
    const s2 = new DeepCloner().clone(s);
    assert(s === s2);
    const b = true;
    const b2 = new DeepCloner().clone(b);
    assert(b === b2);
    const u = undefined;
    const u2 = new DeepCloner().clone(u);
    assert(u === u2);
    const empty = null;
    const empty2 = new DeepCloner().clone(empty);
    assert(empty === empty2);
    const sym = Symbol();
    const sym2 = new DeepCloner().clone(sym);
    assert(sym === sym2);
    const bigint = 1n;
    const bigint2 = new DeepCloner().clone(bigint);
    assert(bigint === bigint2);
  });

  describe("对象", () => {
    it("能够复制普通对象", () => {
      const a = {
        name: "a",
        child: {
          name: "eva",
        },
      };
      const a2 = new DeepCloner().clone(a);
      assert(a !== a2);
      assert(a.name === a2.name);
      assert(a.child !== a2.child);
      assert(a.child.name === a2.child.name);
    });

    it("能够复制数组对象", () => {
      const a = [[11, 22, 33], []];
      const a2 = new DeepCloner().clone(a);
      assert(a !== a2);
      assert(a[0] !== a2[0]);
      assert(a[1] !== a2[1]);
      assert.deepEqual(a, a2);
    });

    it("能够复制函数", () => {
      const a = function (x, y) {
        return x + y;
      };
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = new DeepCloner().clone(a);
      assert(a !== a2);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
      assert.deepEqual(a.xxx, a2.xxx);
      assert(a(1, 2) === a2(1, 2));
    });

    it("环也能复制", () => {
      const a = { name: "a" };
      a.self = a;
      const a2 = new DeepCloner().clone(a);
      assert(a !== a2);
      assert(a.name === a2.name);
      assert(a.self !== a2.self);
    });

    it("能复制正则表达式", () => {
      // const a = /hi\d+/gi
      const a = new RegExp("hi\\d+", "gi");
      const a2 = new DeepCloner().clone(a);
      assert(a !== a2);
      assert(a.source === a2.source);
      assert(a.flags === a2.flags);
    });

    it("能复制日期", () => {
      const a = new Date();
      const a2 = new DeepCloner().clone(a);
      assert(a !== a2);
      assert(a.getTime() === a2.getTime());
    });

    it("会跳过原型属性", () => {
      const a = Object.create({ name: "a" });
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = new DeepCloner().clone(a);
      assert(a !== a2);
      assert.isFalse("name" in a2);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
      assert.deepEqual(a.xxx, a2.xxx);
    });

    it("不会爆栈");
  });
});
