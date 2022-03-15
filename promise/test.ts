import "mocha";
import chai from "chai";
import { Promise2 as Promise, Status } from "./promise";
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

  it("new Promise(fn) 中的 fn 执行的时候必须接受一个 resolve 和 reject 两个函数", (done) => {
    new Promise((resolve: any, reject: any) => {
      assert.isFunction(resolve);
      assert.isFunction(reject);
      done();
    });
  });

  it("promise.then(success) 中的 success 会在 resolve 被调用的时候执行", (done) => {
    const success = sinon.fake();
    const promise = new Promise((resolve: any, reject: any) => {
      assert.isFalse(success.called);
      resolve();
      setTimeout(() => {
        assert.isTrue(success.called);
        done();
      });
    });

    // @ts-ignore
    promise.then(success);
  });

  it("promise.then(success, fail) 中的 fail 会在 reject 被调用的时候执行", (done) => {
    const fail = sinon.fake();
    const promise = new Promise((resolve: any, reject: any) => {
      assert.isFalse(fail.called);
      reject();
      setTimeout(() => {
        assert.isTrue(fail.called);
        done();
      });
    });

    // @ts-ignore
    promise.then(() => {}, fail);
  });

  it("2.2.1", () => {
    const promise = new Promise((resolve: any) => {
      resolve();
    });
    promise.then(false, null);
  });

  it("2.2.2", (done) => {
    const succeed = sinon.fake();
    const promise = new Promise((resolve: any) => {
      assert.isFalse(succeed.called);
      resolve(233);
      resolve(23333);
      setTimeout(() => {
        assert(promise.state === Status.Fullfilled);
        assert.isTrue(succeed.calledOnce);
        assert(succeed.calledWith(233));
        done();
      }, 0);
    });

    promise.then(succeed);
  });

  it("2.2.2", (done) => {
    const failed = sinon.fake();
    const promise = new Promise((resolve: any, reject: any) => {
      assert.isFalse(failed.called);
      reject(233);
      reject(23333);
      setTimeout(() => {
        assert(promise.state === Status.Rejected);
        assert.isTrue(failed.calledOnce);
        assert(failed.calledWith(233));
        done();
      }, 0);
    });

    promise.then(() => {}, failed);
  });
});
