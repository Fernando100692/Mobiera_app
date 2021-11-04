// Constants
import {SET_USER, SET_RESPONSE} from './constants';

/**
 * Set response state
 * @param  { String } type - Response type
 * @param  { String } response - Response data
 * @param  { callback } message - Callback to send response
 * @return { object } An action object with a type of SET_RESPONSE
 */
export const setResponse = (type, response, callback) => {
  if (callback) {
    callback(type, response);
  }
  return {type: SET_RESPONSE, payload: {type}};
};

/**
 * Set user state
 * @param  { object } user - User data
 * @return { object } An action object with a type of SET_USER
 */
export const setUser = user => ({type: SET_USER, payload: {user}});
