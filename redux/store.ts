import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import questionReducer from './reducers/question';

const store = configureStore({
  reducer: questionReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
