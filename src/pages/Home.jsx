import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort, { sortOptions } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import NotFound from './NotFound';
import { SearchContext } from '../App';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { activeCategory, sort, currentPage } = useSelector(state => state.filter);

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [order, setOrder] = React.useState(true);

  const onChangeCategory = id => {
    dispatch(setActiveCategory(id));
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    let category = activeCategory === 'All' ? '' : activeCategory;

    setIsLoading(true);

    const search = searchValue ? `search=${searchValue}` : '';

    axios
      .get(
        `https://62a0f78a7b9345bcbe4358a7.mockapi.io/items?limit=100&${
          'category=' + category
        }&sortBy=${sort.sortProperty}&order=${order ? 'asc' : 'desc'}${search}`,
      )
      .then(res => {
        setItems(res.data);
        setIsLoading(false);
        // setPagesAmount(Math.ceil(res.data.length / 4));
      });

    window.scrollTo(0, 0);
  };

  // if we changed params and we had 1st render
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        activeCategory,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategory, sort.sortProperty, currentPage]);

  // if we already had the 1st render => checking URL-params and save in Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortOptions.find(obj => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [activeCategory, sort.sortProperty, order, searchValue, currentPage]);

  const pizzas = items
    .filter(el => el.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map(({ ...props }) => <PizzaBlock key={props.title} {...props} />)
    .slice((currentPage - 1) * 4, (currentPage - 1) * 4 + 4);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories value={activeCategory} onChangeCategory={onChangeCategory} />
        <Sort order={order} setOrder={setOrder} />
      </div>
      {!items.length && !isLoading && <NotFound />}
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
