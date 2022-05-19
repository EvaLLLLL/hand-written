// @ts-nocheck

export enum Status {
  Pending = "pending",
  Fullfilled = "fullfilled",
  Rejected = "rejected",
}

export class Promise2 {
  callbacks = [];
  state: Status = Status.Pending;

  resolve = (result?: any) => {
    if (this.state !== Status.Pending) return;
    this.state = Status.Fullfilled;
    setTimeout(() => {
      this.callbacks.forEach((handle) => {
        if (typeof handle[0] === "function") {
          handle[0].call(undefined, result);
        }
      });
    }, 0);
  };

  reject = (reason?: any) => {
    if (this.state !== Status.Pending) return;
    this.state = Status.Rejected;
    setTimeout(() => {
      this.callbacks.forEach((handle) => {
        if (typeof handle[1] === "function") {
          handle[1].call(undefined, reason);
        }
      });
    }, 0);
  };

  constructor(fn: any) {
    if (typeof fn !== "function") {
      throw new Error("只接收函数");
    }

    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  then(succeed?: any, fail?: any) {
    const handle = [];

    if (typeof succeed === "function") {
      handle[0] = succeed;
    }

    if (typeof fail === "function") {
      handle[1] = fail;
    }

    this.callbacks.push(handle);
    return undefined;
  }
}
