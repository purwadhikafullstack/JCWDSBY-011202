import { configureStore } from '@reduxjs/toolkit';
import accountSliceReducer from './slice/accountSlice';
import orderSlice from './slice/orderSlice';
import statusSlice from './slice/statusSlice';

const globalState = configureStore({
  reducer: {
    accountSliceReducer,
    orderSlice,
    statusSlice
  },
});
export default globalState;
