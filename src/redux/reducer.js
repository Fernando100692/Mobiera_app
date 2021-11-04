// Dependencies
import {Map, fromJS} from 'immutable';
import {loop, combineReducers} from 'redux-loop-symbol-ponyfill';

// Containers
import AppState from './stores/global/reducer';

// Define Reducers
const reducers = {
  AppState,
};

// Initial state, accessor and mutator for supporting root-level
// Immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => (child ? child.get(key) : undefined);
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable,
);

export default function reducer(state, action) {
  const [nextState, effects] = namespacedReducer(state || undefined, action);

  // Enforce the state is immutable
  return loop(fromJS(nextState), effects);
}
