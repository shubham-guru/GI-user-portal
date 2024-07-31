import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderDetails {
  details: {
    buyerDetails: { [key: string]: {} };
    productInfo: { [key: string]: {} };
    shippingDetails: { [key: string]: {} };
    fareDetails?: { [key: string]: {} };
  }[];
}


const initialState: OrderDetails = {
  details: [{ buyerDetails: {}, productInfo: {}, shippingDetails: {}, fareDetails: {} }],
};

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    saveBuyerDetails: (state, action: PayloadAction<{ [key: string]: string | number | boolean }>) => {
      state.details[0].buyerDetails = action.payload;
    },
    addProductInfo: (state, action: PayloadAction<{ [key: string]: string | number | boolean }>) => {
      state.details[0].productInfo = action.payload;
    },
    saveShippingDetails: (state, action: PayloadAction<{ [key: string]: string | number | boolean }>) => {
      state.details[0].shippingDetails = action.payload;
    },
    saveOrderFareInfo: (state, action: PayloadAction<{ [key: string]: string | number | boolean }>) => {
      state.details[0].fareDetails = action.payload;
    },
    clearOrderDetails: (state) => {
      state.details = [{ buyerDetails: {}, productInfo: {}, shippingDetails: {} }];
    },
  },
});

export const { saveBuyerDetails, addProductInfo, clearOrderDetails, saveShippingDetails, saveOrderFareInfo } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
