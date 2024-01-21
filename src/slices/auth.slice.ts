import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuthState, IUserInfo } from 'types';

// get user info from local storage
const storedUserInfo = localStorage.getItem('userInfo');
const initialState: IAuthState = {
  userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // set user info to local storage
    setCredentials: (state, action: PayloadAction<IUserInfo>) => {
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    },
    // take user info out from local storage
    logout: (state, _action) => {
      localStorage.removeItem('userInfo');
      return { ...state, userInfo: null };
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
