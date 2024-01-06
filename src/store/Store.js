import { configureStore } from '@reduxjs/toolkit';
import CurrentUserReducer from './CurrentUserSlice.js';
import DifferentUserReducer from './DifferentUserSlice.js'

const store = configureStore({
  reducer: {
    currentUser: CurrentUserReducer,
    differentUser: DifferentUserReducer,
  },
});

export default store;
