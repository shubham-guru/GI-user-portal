import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../domain/interfaces/UserData';

const initialState: UserData = {
  email: '',
  firstName: '',
  lastName: '',
  image: '',
  phone: '',
  verifiedEmail: false,
  id: '',
  address: '',
  isAgreement: false,
  token: '',
  products: []
}

const userSlice = createSlice({
  name: 'userDetails',
  initialState: {
    currentUser: initialState
  },
  reducers: {
    saveUserData: (state, action:PayloadAction<UserData>) => {      
      state.currentUser = action.payload;
    },
    clearUserInfo: (state) => {
      state.currentUser = initialState;
    },
    updateAddress: (state, action: PayloadAction<string>) => {
      state.currentUser.address = action.payload;
    },
    updateProducts: (state, action: PayloadAction<[{}]>) => {
      state.currentUser.products = action.payload;
    },
  },
});

export const { saveUserData, updateAddress, clearUserInfo, updateProducts } = userSlice.actions;

export default userSlice.reducer;