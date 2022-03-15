import ReactDOM from "react-dom";

type Dispatch<T> = (val: T) => void;

let index = -1;
let _states: any[] = [];

const render = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

function useState<T>(initialState: T): [T, Dispatch<T>] {
  index++;
  const currentIndex = index;
  _states[currentIndex] =
    _states[currentIndex] === undefined ? initialState : _states[currentIndex];
  const setState: (val: T) => void = (newState: T) => {
    _states[currentIndex] = newState;
    render();
    index = -1;
  };

  return [_states[currentIndex], setState];
}

function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setCount1(count1 + 1);
        }}
      >
        count1 is: {count1}
      </button>
      <br />
      <br />
      <button
        type="button"
        onClick={() => {
          setCount2(count2 + 1);
        }}
      >
        count2 is: {count2}
      </button>
      <br />
      <br />
      <button
        type="button"
        onClick={() => {
          setCount3(count3 + 1);
        }}
      >
        count3 is: {count3}
      </button>
    </>
  );
}

export const testUseState = render;
