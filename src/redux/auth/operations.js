import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://powerpulse-backend.onrender.com';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post('/users/register', formData);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post('/users/login', formData);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logut', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const refreshToken = state.auth.refreshToken;
    if (refreshToken === null) {
      return thunkAPI.rejectWithValue('Unable to get user');
    }
    try {
      const res = await axios.post('/users/refresh', refreshToken);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserParams = createAsyncThunk(
  'auth/params',
  async (params, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token || state.auth.refreshToken;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to get user');
    }
    try {
      setAuthHeader(persistedToken);
      const res = await axios.patch('/users/update', params);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addUserData = createAsyncThunk(
  'auth/data',
  async (params, thunkAPI) => {
    const state = thunkAPI.getState();
    const storedToken = state.auth.token || state.auth.refreshToken;
    if (storedToken === null) {
      return thunkAPI.rejectWithValue();
    }
    try {
      setAuthHeader(storedToken);
      const res = await axios.put('/users/update', params);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserParams = createAsyncThunk(
  'auth/getparams',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token || state.auth.refreshToken;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to get user');
    }
    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'auth/avatar',
  async (formData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token || state.auth.refreshToken;
      if (persistedToken === null) {
        return thunkAPI.rejectWithValue('Unable to get user');
      }
      setAuthHeader(persistedToken);
      const {data} = await axios.post('/users/avatar/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
