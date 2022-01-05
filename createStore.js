const createStore = (reducer, initState) => {
  let state = initState;
  let listeners = [];

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((l) => l());
    return action;
  };
  const getState = () => {
    return state;
  };
  const replaceReducer = () => {};
  const subscribe = (listener) => {
    listeners.push(listener);
    // subscribe 会返回一个取消订阅的函数
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };
  dispatch({ type: '@@REDUX/INIT' });
  return {
    dispatch,
    getState,
    replaceReducer,
    subscribe,
    // Symbol(observable)
  };
};

export default createStore;