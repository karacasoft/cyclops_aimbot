import { delay } from 'redux-saga';
import { call, put, takeEvery, all, select, take, fork, cancel } from 'redux-saga/effects';

import { fetchData } from './fetch';
import {ACTIONS, FETCHES} from './constants';
import {getToken} from './reducers';

function *fetchRequest(action) {
  const oldData = action.data || {};
  try {
    // todo remove teh token
    const token = yield select(getToken);
    const data = yield call(fetchData, action.fetchType, action.data, token);
    yield put({ type: ACTIONS.FETCH_SUCCESS, fetchType: action.fetchType, data, oldData });
  } catch (error) {
    yield put({ type: ACTIONS.FETCH_ERROR, fetchType: action.fetchType, error: error.message, data: action.data });
  }
}

function *watchFetches() {
  /*
  const tasks = {};
  while (true) {
    const action = yield take(ACTIONS.FETCH_REQUEST);
    if (tasks[action.fetchType]) {
      yield cancel(tasks[action.fetchType]);
    }
    tasks[action.fetchType] = yield fork(fetchRequest, action);
  }
  */
  yield takeEvery(ACTIONS.FETCH_REQUEST, fetchRequest);
}

export default function *rootSaga() {
  try {
    yield all([watchFetches()]);
  } catch (error) {
    console.log('error at root saga', error.toString());
  }
}
