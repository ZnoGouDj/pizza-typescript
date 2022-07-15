export type Pizza = {
  id: string;
  title: string;
  price: number;
  image: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

export type SearchPizzaParams = {
  sortBy: string;
  order: boolean;
  currentPage: string;
  category: string;
  search: string;
};

export type FetchPizzasParams = {
  sortBy: string;
  order: boolean;
  category: string;
  search: string;
};
