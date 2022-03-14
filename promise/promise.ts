class Promise2 {
  succeed = null;
  fail = null;

  resolve = () => {
    setTimeout(() => {
      // @ts-ignore
      this.succeed();
    }, 0);
  };

  reject = () => {
    setTimeout(() => {
      // @ts-ignore
      this.fail();
    }, 0);
  };

  constructor(fn: any) {
    if (typeof fn !== "function") {
      throw new Error("只接收函数");
    }

    fn(this.resolve, this.reject);
  }

  then(succeed: any, fail: any) {
    this.succeed = succeed;
    this.fail = fail;
  }
}

export default Promise2;
