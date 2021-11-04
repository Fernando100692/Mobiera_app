// Constants
import {
  GET_ALL_CREDENTIALS,
  GET_ALL_PROFILES,
  UPDATE_USER_INFO,
  SIGN_UP,
} from './constants';

/**
 * Call process to get all user credentials data
 * @param  { function } data - user credentials
 * @param  { function } callback - Response callback
 * @return { object } An action object with a type of GET_ALL_CREDENTIALS
 */
export const getUserCredentialsData = (data, callback) => ({
  type: GET_ALL_CREDENTIALS,
  payload: {data},
  callback,
});

/**
 * Call process to get all profiles data
 * @param  { function } callback - Response callback
 * @return { object } An action object with a type of GET_ALL_PROFILES
 */
export const getProfilesData = callback => ({
  type: GET_ALL_PROFILES,
  callback,
});

/**
 * Call process to update user info
 * @param  { function } data - user data
 * @param  { function } callback - Response callback
 * @return { object } An action object with a type of UPDATE_USER_INFO
 */
export const updateUserInfo = (data, callback) => ({
  type: UPDATE_USER_INFO,
  payload: {data},
  callback,
});

/**
 * Call process to sign up new user
 * @param  { function } data - user data
 * @param  { function } callback - Response callback
 * @return { object } An action object with a type of SIGN_UP
 */
export const userSignUp = (data, callback) => ({
  type: SIGN_UP,
  payload: {data},
  callback,
});
