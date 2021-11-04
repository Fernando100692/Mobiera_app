// Dependencies
import {put, call, takeLatest} from 'redux-saga/effects';

// Global actions
import {setResponse} from '../global/actions';

// Services
import authService from '../../../services/auth-service';

// Constants
import {
  GET_ALL_CREDENTIALS,
  GET_ALL_PROFILES,
  SIGN_UP,
  UPDATE_USER_INFO,
} from './constants';

/**
 * Call service to get user credentials data
 * @param { object } action - Action with callback
 */
export function* getAllUserCredentials(action) {
  const {
    callback,
    payload: {data},
  } = action;

  try {
    const response = yield call(authService.getUserCredentialsData, data);
    yield put(setResponse('success', {...response}, callback));
  } catch (err) {
    yield put(setResponse('error', err, callback));
  }
}

/**
 * Call service to get profiles data
 * @param { object } action - Action with callback
 */
export function* getAllProfiles(action) {
  const {callback} = action;

  try {
    const response = yield call(authService.getProfilesData);
    yield put(setResponse('success', {...response}, callback));
  } catch (err) {
    yield put(setResponse('error', err, callback));
  }
}

/**
 * Call service to sign up user data
 * @param { object } action - Action with callback
 */
export function* signUpUserData(action) {
  const {
    callback,
    payload: {data},
  } = action;

  try {
    const response = yield call(authService.signUpData, data);
    yield put(setResponse('success', {...response}, callback));
  } catch (err) {
    yield put(setResponse('error', err, callback));
  }
}

/**
 * Call service to update user data
 * @param { object } action - Action with callback
 */
export function* updateUserData(action) {
  const {
    callback,
    payload: {data},
  } = action;

  console.log('eaaaa', data);
  try {
    const response = yield call(authService.updateUserData, data);
    yield put(setResponse('success', {...response}, callback));
  } catch (err) {
    yield put(setResponse('error', err, callback));
  }
}

/**
 * Declare all component sagas
 */
export function* watchAuthSaga() {
  yield takeLatest(GET_ALL_CREDENTIALS, getAllUserCredentials);
  yield takeLatest(GET_ALL_PROFILES, getAllProfiles);
  yield takeLatest(SIGN_UP, signUpUserData);
  yield takeLatest(UPDATE_USER_INFO, updateUserData);
}
