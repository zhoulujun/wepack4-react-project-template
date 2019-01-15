import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/indexReducers';


const enhancer = compose(
  applyMiddleware(thunkMiddleware)
);

export default function configureStore (preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    enhancer
  );

  if (module.hot) {
    module.hot.accept('../reducers/indexReducers.js', () => {
      const nextRootReducer = require('../reducers/indexReducers.js').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
