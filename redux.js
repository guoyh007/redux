function createStore(reducer) {
  let state;
  let listeners = [];

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((item) => item());
  }

  // 拿到最新的值
  function getState() {
    return state;
  };

  // 往里边追加监听事件
  function subscribe(func) {
    listeners.push(func);
  };

  dispatch({ type: 'init' }) // 这块需要你注意，因为这个是初始化给state赋值

  let store = {
    getState,
    subscribe,
    dispatch,
  }
  return store;
};

export { createStore };
