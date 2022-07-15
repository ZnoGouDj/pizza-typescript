import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchPizzasParams, Pizza } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasParams>(
  'pizza/fetchPizzaStatus',
  async params => {
    const { sortBy, order, category, search } = params;

    const { data } = await axios.get(
      `https://62a0f78a7b9345bcbe4358a7.mockapi.io/items?limit=100&${
        'category=' + category
      }&sortBy=${sortBy}&order=${order ? 'asc' : 'desc'}${search}`,
    );

    return data;
  },
);
