import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 'Все',
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
  },
});

export const { setActiveCategory, setSortBy } = filterSlice.actions;

export default filterSlice.reducer;
