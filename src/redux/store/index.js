import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers';
import promiseMiddleware from 'redux-promise-middleware'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
var userInfo = JSON.parse(sessionStorage.user);
const initialState = {user:{data:userInfo}};
const enhancers = [];
export const history = createHistory({basename: '/antibodypedia'});
const middleware = [thunk, promiseMiddleware(), routerMiddleware(history)];


if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const persistConfig = {
  key: 'antibodypedia',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, initialState, composedEnhancers);
export const persistor = persistStore(store);