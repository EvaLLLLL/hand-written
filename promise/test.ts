import "mocha";
import chai from "chai";
import Promise from "./promise";
import sinon from "sinon";
import sinonChai from "sinon-chai";
chai.use(sinonChai);

const { assert } = chai;

describe("Promise", () => {
  it("是一个类", () => {
    assert.isFunction(Promise);
    assert.isObject(Promise.prototype);
  });

  it("new Promise 必须接受一个函数", () => {
    assert.throw(() => {
      // @ts-ignore
      new Promise();
    });
  });

  it("new Promise(fn) 会生成一个对象，对象有 then 方法", () => {
    const promise = new Promise(() => {});
    // @ts-ignore
    assert.isFunction(promise.then);
  });

  it("new Promise(fn) 中的 fn 立即执行", () => {
    let fn = sinon.fake();
    let called = false;
    const promise = new Promise(fn);
    assert(fn.called);
  });

  it("new Promise(fn) 中的 fn 执行的时候必须接受一个 resolve 和 reject 两个函数", () => {
    let called = false;
    const promise = new Promise((resolve: any, reject: any) => {
      called = true;
      assert.isFunction(resolve);
      assert.isFunction(reject);
    });

    // @ts-ignore
    assert(called === true);
  });

  it("promise.then(success) 中的 success 会在 resolve 被调用的时候执行", (done) => {
    let called = false;
    const promise = new Promise((resolve: any, reject: any) => {
      // 该函数没有执行
      assert(called === false);
      resolve();
      // 该函数执行了

      setTimeout(() => {
        // @ts-ignore
        assert(called === true);
        done();
      });
    });

    // @ts-ignore
    promise.then(() => {
      called = true;
    });
  });
});
