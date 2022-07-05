import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 'All',
  searchValue: '',
  currentPage: 1,
  sort: { name: 'популярности', sortProperty: 'rating' },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSortBy(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
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

export const selectFilter = state => state.filter;
export const selectSort = state => state.filter.sort;

export const { setActiveCategory, setSortBy, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
