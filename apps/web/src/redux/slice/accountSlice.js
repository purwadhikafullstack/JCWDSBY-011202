import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  token: localStorage.getItem('token'),
  username: '',
  email: '',
  role: '',
  warehouse_id: 0,
  fullname: '',
  is_confirmed: null,
};
const accountSlice = createSlice({
  name: 'auths',
  initialState,
  reducers: {
    userLoaded: (state, action) => {
      state.token = localStorage.getItem('token');
      state.is_confirmed = true;
      state.role = action.payload.role;
      state.username = action.payload.username;
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.warehouse_id = action.payload.warehouse_id;
    },

    logout: (state, action) => {
      localStorage.removeItem('token');
      return initialState;
    },
  },
});

export const { userLoaded, logout } = accountSlice.actions;
export default accountSlice.reducer;

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:8000/api/accounts/keep-login`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      dispatch(
        userLoaded({
          username: response.data.result.username,
          fullname: response.data.result.fullname,
          email: response.data.result.email,
          role: response.data.result.role,
          warehouse_id: response.data.result.warehouse_id,
          token: localStorage.getItem('token'),
        }),
      );
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.log(error);
      if (
        error.response.data.message.toLowerCase().includes('invalid') ||
        error.response.data.message.toLowerCase().includes('empty')
      ) {
        dispatch(logout());
      }
    }
  };
};
