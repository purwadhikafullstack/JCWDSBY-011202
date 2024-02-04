import { configureStore } from '@reduxjs/toolkit';
import accountSliceReducer from './slice/accountSlice';

const globalState = configureStore({
  reducer: {
    accountSliceReducer,
  },
});
export default globalState;
