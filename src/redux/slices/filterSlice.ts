import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Sort = {
  name: string;
  sortProperty: 'rating' | 'title' | 'price';
};

interface FilterSliceState {
  activeCategory: string;
  searchValue: string;
  currentPage: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  activeCategory: 'All',
  searchValue: '',
  currentPage: 1,
  sort: { name: 'популярности', sortProperty: 'rating' },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<string>) {
      state.activeCategory = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortBy(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = action.payload.currentPage;
        state.sort = action.payload.sort;
        state.activeCategory = action.payload.activeCategory;
      } else {
        state.currentPage = 1;
        state.activeCategory = 'All';
        state.sort = {
          name: 'популярности',
          sortProperty: 'rating',
        };
      }
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const { setActiveCategory, setSortBy, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
