// Dependencies
import {Map} from 'immutable';

// Constants
import {SET_RESPONSE, SET_USER} from './constants';

// Initial state
export const initialState = Map({
  user: false,
  response: Map({
    type: false,
  }),
});

export default function appReducer(state = initialState, action = {}) {
  const {type, payload} = action;
  switch (type) {
    case SET_USER:
      return state.set('user', payload.user);
    case SET_RESPONSE:
      return state.setIn(['response', 'type'], payload.type);
    default:
      return state;
  }
}
