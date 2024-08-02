import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrdersState {
    orders: string[];
  }

const initialState: OrdersState = {
    orders: []
}

const userOrders = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    saveUserOrders: (state, action:PayloadAction<string[]>) => {      
      state.orders = action.payload;
    },
    clearUserOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { saveUserOrders, clearUserOrders } = userOrders.actions;

export default userOrders.reducer;