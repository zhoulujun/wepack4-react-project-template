import { createStore, applyMiddleware ,compose  } from 'redux'
import { persistState } from 'redux-devtools';
import DevTools from '../vendors/DevTools';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/indexReducers'


const enhancer = compose(
    applyMiddleware(thunkMiddleware, createLogger()),
    DevTools.instrument(),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&#]+)\b/
        )
    )
);

export default function configureStore(preloadedState) {
    const store = createStore(
        rootReducer,
        preloadedState,
        enhancer
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/indexReducers.js', () => {
            const nextRootReducer = require('../reducers/indexReducers.js').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store;
}