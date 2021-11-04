// Dependencies
import {applyMiddleware, createStore, compose} from 'redux';
import * as reduxLoop from 'redux-loop-symbol-ponyfill';

// Middleware
import middleware from './middleware';
import sagaMiddleware from './middleware/sagaMiddleware';

// Reducer
import reducer from './reducer';

// Saga
import rootSagas from './saga';

const enhancers = [
  applyMiddleware(...middleware, sagaMiddleware),
  reduxLoop.install(),
];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
const composeEnhancers =
  __DEV__ &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false,
      })
    : compose;

const enhancer = composeEnhancers(...enhancers);

// Create Global App Store
const store = createStore(reducer, null, enhancer);

sagaMiddleware.run(rootSagas);

export default store;
