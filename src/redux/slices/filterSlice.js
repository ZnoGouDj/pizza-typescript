import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 'All',
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
    setSortBy(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      console.log(action);
      state.currentPage = action.payload.currentPage;
      state.sort = action.payload.sort;
      state.activeCategory = action.payload.activeCategory;
    },
  },
});

export const { setActiveCategory, setSortBy, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
