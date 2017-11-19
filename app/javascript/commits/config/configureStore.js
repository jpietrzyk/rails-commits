
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import { authStateReducer as auth } from 'redux-oauth';

import DevTools from '../components/DevTools';
import test from '../redux/reducers';

const configureStore = (initialState = {}) => {
  return createStore(
    combineReducers({
      auth: auth,
      test
    }),
    initialState,
    compose(
      applyMiddleware(thunk),
      DevTools.instrument()
    )
  );
}

export default configureStore
