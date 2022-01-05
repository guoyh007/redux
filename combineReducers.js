function combineReducers(reducers) {
  return function combination(state = {}, action) {
    let nextState = {};
    for (let key in reducers) {
      //key=x
      nextState[key] = reducers[key](state[key], action);
    }
    return nextState;
  };
}
export default combineReducers;
