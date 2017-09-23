import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './modules/root-reducer';
import { toastMiddleware } from './middleware'

const middleware = [thunk, toastMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export default store;
