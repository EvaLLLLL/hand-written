import EventHub from "./index";

type TestCase = (message?: string) => void;

const test1: TestCase = (message) => {
  const eventHub = new EventHub();
  console.assert(eventHub instanceof Object === true, "eventHub 是个对象");
  console.log(message);
};

// test on&emit
const test2: TestCase = (message) => {
  const eventHub = new EventHub();
  let called = false;
  eventHub.on("testOnAndEmit", (data) => {
    called = true;
    console.log("data: ", data);
  });
  eventHub.emit("testOnAndEmit", "这是 data");
  setTimeout(() => {
    console.assert(called === true), 1000;
    console.log(message);
  });
};

// test off
const test3: TestCase = (message) => {
  let called = false;
  const fn1 = () => {
    called = true;
  };
  const eventHub = new EventHub();
  eventHub.on("testOff", fn1);
  eventHub.off("testOff", fn1);
  eventHub.emit("testOff");
  setTimeout(() => {
    console.assert(called === false), 1000;
    console.log(message);
  });
};

test1("EventHub 可以创建对象");
test2(".on 了之后 .emit, 会触发 on 的函数");
test3(".off 了之后 .emit, 不会触发 on 的函数");
