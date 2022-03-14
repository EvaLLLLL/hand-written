class Promise2 {
  succeed = null;
  fail = null;
  state = "pending";

  resolve = (result?: any) => {
    this.state = "fullfilled";
    setTimeout(() => {
      if (typeof this.succeed === "function") {
        // @ts-ignore
        this.succeed(result);
      }
    }, 0);
  };

  reject = (reason?: any) => {
    setTimeout(() => {
      this.state = "rejected";
      if (typeof this.fail === "function") {
        // @ts-ignore
        this.fail(reason);
      }
    }, 0);
  };

  constructor(fn: any) {
    if (typeof fn !== "function") {
      throw new Error("只接收函数");
    }

    fn(this.resolve, this.reject);
  }

  then(succeed?: any, fail?: any) {
    if (typeof succeed === "function") {
      this.succeed = succeed;
    }

    if (typeof fail === "function") {
      this.fail = fail;
    }
  }
}

export default Promise2;
