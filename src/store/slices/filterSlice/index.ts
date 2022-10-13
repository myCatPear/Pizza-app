import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortType } from 'common/types/sortType';

const DEFAULT_CATEGORY_ID = 0;

const initialState:InitialStateType = {
  categoryID: DEFAULT_CATEGORY_ID,
  sort: {
    name:'популярности',
    sortProperty: 'rating',
    order:'desc'
  }
}

export const slice = createSlice({
  name:'filter',
  initialState:initialState,
  reducers:{
    setCategoryID(state, action:PayloadAction<{id:number}>) {
      state.categoryID = action.payload.id
    },
    setSort(state,action:PayloadAction<{value:SortType}>) {
      state.sort = action.payload.value
    }
  }
})

export const filterReducer = slice.reducer;
export const {setCategoryID,setSort} = slice.actions;

type InitialStateType = {
  categoryID:number,
  sort: SortType
}