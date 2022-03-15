import ReactDOM from "react-dom";
import React from "react";

let prevDeps: any[] = [];
let effectedCount = 0;
function useEffect(callback: Function, depsArr: any[]) {
  const changed = depsArr.some((d, index) => d !== prevDeps[index]);
  if (changed) callback();
  prevDeps = depsArr;
}

function App() {
  const [count, setCount] = React.useState(0);

  useEffect(() => effectedCount++, [count]);

  return (
    <button
      type="button"
      onClick={() => {
        setCount(count + 1);
      }}
    >
      count1 is: {count}
    </button>
  );
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

export const testUseEffect = render;
