import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";
import { AppDispatch } from './store';

// Define the shape of the auth state
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
  user: {
    username: string;
  } | null;
}

// Define initial state
const initialState: AuthState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  error: null,
  user: localStorage.getItem('token')
    ? { username: (jwtDecode(localStorage.getItem('token')!) as any).username }
    : null,
};

// Mock login details
const fakeUser = {
  username: 'user',
  password: 'password',
  token: 'fake-jwt-token',
};

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.user = { username: (jwtDecode(action.payload) as any).username };
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.user = null;
    },
  },
});

// Export actions
export const { loginSuccess, loginFailure, logout } = authSlice.actions;

// Asynchronous thunk for login
export const login = (username: string, password: string) => (dispatch: AppDispatch) => {
  if (username === fakeUser.username && password === fakeUser.password) {
    // Simulate token creation and storage
    const token = fakeUser.token;
    localStorage.setItem('token', token);
    dispatch(loginSuccess(token));
  } else {
    dispatch(loginFailure('Invalid username or password'));
  }
};

// Asynchronous thunk for logout
export const performLogout = () => (dispatch: AppDispatch) => {
  localStorage.removeItem('token');
  dispatch(logout());
};

// Asynchronous thunk for checking token expiry or silent refresh (optional)
export const refreshToken = () => (dispatch: AppDispatch) => {
  // This is where you'd refresh the token. For the mock, we just verify it's present.
  const token = localStorage.getItem('token');
  if (token) {
    dispatch(loginSuccess(token));
  } else {
    dispatch(logout());
  }
};

// Export reducer
export default authSlice.reducer;
