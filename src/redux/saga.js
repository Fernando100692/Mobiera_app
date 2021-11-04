// Dependencies
import {all, fork} from 'redux-saga/effects';

// Stores
import {watchAuthSaga} from './stores/auth/saga';

export default function* root() {
  yield all([fork(watchAuthSaga)]);
}
