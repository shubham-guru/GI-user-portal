
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../domain/interfaces/UserData';

const info: UserData = {
  email: '',
  firstName: '',
  lastName: '',
  image: '',
  verifiedEmail: false,
  id: ''
}

const userSlice = createSlice({
  name: 'userDetails',
  initialState: {
    currentUser: info
  },
  reducers: {
    saveUserData: (state, action:PayloadAction<UserData>) => {      
      state.currentUser = action.payload;
    },
    clearUserInfo: (state) => {
      state.currentUser = {
        email: '',
        firstName: '',
        lastName: '',
        image: '',
        verifiedEmail: false,
        id: ''
      };
    },
  },
});

export const { saveUserData } = userSlice.actions;

export default userSlice.reducer;