import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const addLoggingToDispatch = (store) => (next) => (action) => {
  let returnValue;
  const actionDesc = `${action.type} ${action.fetchType || ''}`;
  if (console.group) {
    console.group(actionDesc);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(actionDesc);
  } else {
    console.log('---');
    console.log('prev state', store.getState());
    console.log('action', action);
    returnValue = next(action);
    console.log('new state', store.getState());
    console.log('---');
  }
  return returnValue;
};

const middlewares = [sagaMiddleware];

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  middlewares.push(addLoggingToDispatch);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;