import { createSlice } from '@reduxjs/toolkit';
import {
  addUserData,
  getUserParams,
  logIn,
  logOut,
  refreshUser,
  register,
  updateAvatar,
  updateUserParams,
} from './operations';
import toast from 'react-hot-toast';
import axios from 'axios';
const initialState = {
  user: {
    name: null,
    email: null,
    height: 160,
    currentWeight: 60,
    desiredWeight: 55,
    birthday: '08.01.1987',
    blood: 1,
    sex: 'male',
    levelActivity: 1,
  },
  token: null,
  refreshToken: null,
  isLoggedIn: false,
  goToParams: false,
  isRefreshing: false,
  isLoading: false,
};
 const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const token = localStorage.getItem('token');
if (token) {
  setAuthHeader(token);
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  // reducers: {},
  extraReducers: builder =>
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.goToParams = true;
        state.isLoading = false;
        toast.success('Ви успішно зареєструвалися');
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        toast.error('Ця електронна адреса вже використовується. Будь ласка, виберіть іншу адресу електронної пошти, щоб продовжити.');
      })
      .addCase(logIn.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        toast.loading('Ви успішно увійшли в систему');
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        toast.error('Не вдається ввійти. Переконайтеся, що ваша електронна адреса та пароль правильні, і спробуйте ще раз.');
      })
      .addCase(logOut.fulfilled, state => {
        state.user = initialState.user;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logOut.rejected, state => {
        state.user = initialState.user;
        state.token = null;
        state.isLoggedIn = false;
      })

      .addCase(refreshUser.pending, (state, action) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
      })

      .addCase(updateUserParams.pending, (state, action) => {
        toast.loading("Завантаження даних")

      })
      .addCase(updateUserParams.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.goToParams = false;
        state.isRefreshing = false;
        console.log(action.payload);
        toast.success('Користувач успішно оновився');
      })
      .addCase(updateUserParams.rejected, (state, action) => {
        state.isLoggedIn = true;
        state.goToParams = false;
        toast.error('Помилка оновлення користувача');
      })

      .addCase(getUserParams.pending, (state, action) => state)
      .addCase(getUserParams.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(getUserParams.rejected, (state, action) => state)

      .addCase(addUserData.pending, (state, action) => {
        toast.loading("Завантаження даних")
      })
      .addCase(addUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.goToParams = false;
        toast.success('Дані користувача успішно додано');
      })
      .addCase(addUserData.rejected, (state, action) => {
        state.isLoggedIn = true;
        state.goToParams = false;
        toast.error('Помилка додавання даних');
      })
      .addCase(updateAvatar.pending, (state, action) => {
        toast.loading('Завантаження даних');
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.goToParams = false;
        toast.success('Аватар успішно додано');
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        toast.error('Помилка, не вдалося завантажити аватар');
      })
});

export const authReducer = authSlice.reducer;
