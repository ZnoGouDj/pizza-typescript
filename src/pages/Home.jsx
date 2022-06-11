import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import NotFound from './NotFound';

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState('Все');
  const [sortBy, setSortBy] = React.useState({ name: 'популярности', sortProperty: 'rating' });
  const [order, setOrder] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pagesAmount, setPagesAmount] = React.useState(0);

  React.useEffect(() => {
    let category = activeCategory === 'Все' ? '' : activeCategory;

    setIsLoading(true);

    const search = searchValue ? `search=${searchValue}` : '';

    fetch(
      `https://62a0f78a7b9345bcbe4358a7.mockapi.io/items?limit=100&${
        'category=' + category
      }&sortBy=${sortBy.sortProperty}&order=${order ? 'asc' : 'desc'}${search}`,
    )
      .then(res => res.json())
      .then(arr => {
        setItems(arr);
        setIsLoading(false);
        setPagesAmount(Math.ceil(arr.length / 4));
      });

    window.scrollTo(0, 0);
  }, [activeCategory, sortBy, order, searchValue, currentPage]);

  const pizzas = items
    .filter(el => el.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map(({ ...props }) => <PizzaBlock key={props.title} {...props} />)
    .slice((currentPage - 1) * 4, (currentPage - 1) * 4 + 4);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories value={activeCategory} onChangeCategory={setActiveCategory} />
        <Sort value={sortBy} order={order} onChangeSort={setSortBy} onChangeOrder={setOrder} />
      </div>
      {!items.length && <NotFound />}
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination pages={pagesAmount} onChangePage={num => setCurrentPage(num)} />
    </>
  );
};

export default Home;
