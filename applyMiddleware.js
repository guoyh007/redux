// function applyMiddleware(logger) {
//   return function(createStore) {
//     return function(reducer) {
//       let store = createStore(reducer);
//       let { dispatch, getState }  = store;
//       store.dispatch = logger({ getState, dispatch })(dispatch);
//       return store;
//     };
//   };
// }

function compose(...funcs) {
  return function (args) {
    for (let i = funcs.length - 1; i >= 0; i--) {
      args = funcs[i](args);
    }
    return args;
  };
}

// v 2.0 
function applyMiddleware(...middleWares) {
  return function(createStore) {
    return function(reducer) {
      let store = createStore(reducer);
      let dispatch;
      let middleApi = {
        getState: store.getState,
        // dispatch: store.dispatch,
        dispatch: action => dispatch(action), // 为什么不用上边的方法呢，这个 dispatch 是改造后的 dispatch
      };
      let chains = middleWares.map((middleWare) => middleWare(middleApi));
      let composed = compose(...chains);
      dispatch = composed(store.dispatch);
      return {
        ...store,
        dispatch,
      };
    };
  };
}

export default applyMiddleware;