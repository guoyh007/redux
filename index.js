import { createStore } from './redux';
let counterValue = document.getElementById('counter-value');
let incrementBtn = document.getElementById('add-btn');
let decrementBtn = document.getElementById('minus-btn');

const ADD = 'add';
const LESS = 'less';
function reducer(state = { number: 0 }, action) {
  switch (action.type) {
    case ADD:
      return { ...state, number: state.number + 1 };
    case LESS:
      return { ...state, number: state.number - 1 };
    default:
      return state;
  }
}
let store = createStore(reducer);
console.log('store: ', store);

function render(params) {
  const state = store.getState();
  counterValue.innerHTML = state.number;
}
store.subscribe(render); // 往里边追加方法
render();

incrementBtn.onclick = () => {
  store.dispatch({ type: ADD });
}
decrementBtn.onclick = () => {
  store.dispatch({ type: LESS });
}
