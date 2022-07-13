import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FilterSliceState,
  selectFilter,
  setActiveCategory,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, SearchPizzaParams, selectPizzaData } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Sort, { sortOptions } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import NotFound from './NotFound';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { activeCategory, sort, currentPage, searchValue } = useSelector(selectFilter);
  const sortBy = sort.sortProperty;

  const [order, setOrder] = React.useState(true);

  const onChangeCategory = (category: string) => {
    dispatch(setActiveCategory(category));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    let category = activeCategory === 'All' ? '' : activeCategory;

    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
      }),
    );

    window.scrollTo(0, 0);
  };

  // if we changed params and we had 1st render
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       activeCategory,
  //       currentPage,
  //     });

  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [activeCategory, sort.sortProperty, currentPage]);

  // // if we already had the 1st render => checking URL-params and save in Redux
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = sortOptions.find(obj => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         activeCategory: params.category,
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortOptions[0],
  //       }),
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [activeCategory, sort.sortProperty, order, searchValue, currentPage]);

  const pizzas = items
    .filter((el: any) => el.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
    .slice((currentPage - 1) * 4, (currentPage - 1) * 4 + 4);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="content">
      <div className="content__top">
        <Categories value={activeCategory} onChangeCategory={onChangeCategory} />
        <Sort order={order} setOrder={setOrder} />
      </div>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка, попробуйте обновить страницу</h2>
        </div>
      ) : (
        <>
          {!items.length && status !== 'loading' && <NotFound />}
          <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
          <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </>
      )}
    </div>
  );
};

export default Home;
