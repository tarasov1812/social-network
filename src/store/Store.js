import { configureStore } from '@reduxjs/toolkit';
import postReducer from './PostSlice.js';

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

export default store;
