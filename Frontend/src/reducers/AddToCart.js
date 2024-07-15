import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], 
    shippingInfo: {},
  },
  reducers: {
    addItemToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find(cartItem => cartItem.productId === item.productId);

      if (!existingItem) {
        state.items.push(item);
      } 
      // else {
      //   state.items.push(item);
      // }
    },

    removeItem(state, action) {
      const itemIdToRemove = action.payload; // Assuming payload is the item's productId
      console.log('removeItem action:', action);
      state.items = state.items.filter(item => item.productId !== itemIdToRemove);
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
  },
});

export const { addItemToCart, removeItem, saveShippingInfo } = cartSlice.actions;
export default cartSlice.reducer;
