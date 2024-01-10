import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginReducer'; // Import your loginReducer

const globalState = configureStore({
  reducer: {
    auth: loginReducer, 
  },
});

export default globalState;
