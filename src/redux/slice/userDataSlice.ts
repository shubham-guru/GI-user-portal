
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../domain/interfaces/UserData';

const initialInfo: UserData = {
  email: '',
  firstName: '',
  lastName: '',
  image: '',
  phone: '',
  verifiedEmail: false,
  id: '',
  address: '',
  isAgreement: false,
  token: ''
}

const userSlice = createSlice({
  name: 'userDetails',
  initialState: {
    currentUser: initialInfo
  },
  reducers: {
    saveUserData: (state, action:PayloadAction<UserData>) => {      
      state.currentUser = action.payload;
    },
    clearUserInfo: (state) => {
      state.currentUser = initialInfo;
    },
    updateAddress: (state, action: PayloadAction<string>) => {
      state.currentUser.address = action.payload;
    },
  },
});

export const { saveUserData, updateAddress } = userSlice.actions;

export default userSlice.reducer;