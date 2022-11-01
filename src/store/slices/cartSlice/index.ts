import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CartInitialStateType = {
  totalPrice: 0,
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem(state, action: PayloadAction<ItemType>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id);
      if (findItem) {
        // @ts-ignore
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        // @ts-ignore
        return (obj.price * obj.count) + sum;
      }, 0);
    },
    removeItem(state, action: PayloadAction<{ id: number }>) {
      state.items = state.items.filter(obj => obj.id !== action.payload.id);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action: PayloadAction<{ id: number }>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id);
      if (findItem) {
        // @ts-ignore
        findItem.count--;
      }
    },
  }
});

export const { clearItems, removeItem, addItem,minusItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export type CartInitialStateType = {
  totalPrice: number,
  items: ItemType[]
}

export type ItemType = {
  id: number,
  title: string,
  price: number,
  imageUrl: string,
  type: string,
  size: number,
  count?: number
}