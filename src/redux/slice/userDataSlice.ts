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
  products: [],
  companyKyc: false,
  individualKyc: false,
  createdAt: "",
  userId: "",
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
    updateUserInfo: (state, action: PayloadAction<any>) => {
      state.currentUser.companyKyc = action.payload.COMPANY_KYC;
      state.currentUser.individualKyc = action.payload.INDIVIDUAL_KYC;
      state.currentUser.createdAt = action.payload.CREATED_AT;
      state.currentUser.userId = action.payload.USER_ID;
      state.currentUser.email = action.payload.EMAIL_ID;
      if(action.payload.REGISTERED_FROM === "manual"){
        state.currentUser.verifiedEmail = false;
      }
    },
  },
});

export const { saveUserData, updateAddress, clearUserInfo, updateProducts, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;