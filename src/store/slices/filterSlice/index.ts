import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortType } from 'common/types/sortType';

const DEFAULT_CATEGORY_ID = 0;
export const DEFAULT_CURRENT_PAGE = 1;

const initialState: InitialStateType = {
  categoryID: DEFAULT_CATEGORY_ID,
  currentPage: DEFAULT_CURRENT_PAGE,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
    order: 'desc'
  }
};

export const slice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setCategoryID(state, action: PayloadAction<{ id: number }>) {
      state.categoryID = action.payload.id;
    },
    setSort(state, action: PayloadAction<{ value: SortType }>) {
      state.sort = action.payload.value;
    },
    setCurrentPage(state, action: PayloadAction<{ value: number }>) {
      state.currentPage = action.payload.value;
    },
    setFilters(state, action: PayloadAction<{ sort: SortType, currentPage: string, categoryID: number | string }>) {
      state.categoryID = action.payload.categoryID;
      state.sort = action.payload.sort;
      state.currentPage = action.payload.currentPage;
    }
  }
});

export const filterReducer = slice.reducer;
export const { setCategoryID, setSort, setCurrentPage, setFilters } = slice.actions;

type InitialStateType = {
  categoryID: number | string,
  sort: SortType,
  currentPage: number | string
}