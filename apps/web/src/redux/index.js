import { configureStore } from '@reduxjs/toolkit';
import accountSliceReducer from './slice/accountSlice';
import orderSlice from './slice/orderSlice';
import statusSlice from './slice/statusSlice';
import cancelOrderSlice from './slice/cancelOrderAdmin';

const globalState = configureStore({
  reducer: {
    accountSliceReducer,
    orderSlice,
    statusSlice,
    cancelOrderSlice
  },
});
export default globalState;
