import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddressState {
  addresses: string[];
}

const initialState: AddressState = {
  addresses: [],
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setUserAddresses: (state, action: PayloadAction<string[]>) => {
      state.addresses = action.payload;
    },
    clearAddresses: (state) => {
        state.addresses = [];
    },  
    addAddress: (state, action: PayloadAction<string>) => {
      state.addresses.push(action.payload);
    },
  },
});

export const { setUserAddresses, addAddress, clearAddresses } = addressSlice.actions;
export default addressSlice.reducer;
