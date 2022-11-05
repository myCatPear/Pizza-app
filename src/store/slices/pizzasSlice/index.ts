import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PizzaType } from 'common/types';
import axios from 'axios';

const initialState: InitialStateType = {
  items: [],
  status: 'loading'
};

export const fetchPizzas = createAsyncThunk<PizzaType[], { baseUrl: string }>('pizza/fetchPizzas', async (params: { baseUrl: string }, thunkAPI) => {
  const { baseUrl } = params;
  const res = await axios.get<PizzaType[]>(baseUrl);
  return res.data;
});


const slice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<{ items: PizzaType[] }>) {
      state.items = action.payload.items;
      console.log(action);
    }
  },
  extraReducers: {
    [fetchPizzas.pending.type]: (state) => {
      state.status = 'loading';
      state.items = [];
      console.log(fetchPizzas.pending.type);
    },
    [fetchPizzas.fulfilled.type]: (state, action) => {
      state.items = action.payload
      state.status = 'success';
    },
    [fetchPizzas.rejected.type]: (state, action) => {
      state.status = 'error';
      state.items = [];
    }
  }
});

export const { setItems } = slice.actions;
export const pizzasReducer = slice.reducer;

type InitialStateType = {
  items: PizzaType[],
  status: StatusType
}

export type StatusType = 'loading' | 'success' | 'error';