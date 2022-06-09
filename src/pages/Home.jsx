import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState('Все');
  const [sortBy, setSortBy] = React.useState({ name: 'популярности', sortProperty: 'rating' });
  const [order, setOrder] = React.useState(true);

  React.useEffect(() => {
    let category = activeCategory === 'Все' ? '' : activeCategory;

    setIsLoading(true);

    fetch(
      `https://62a0f78a7b9345bcbe4358a7.mockapi.io/items${'?category=' + category}&sortBy=${
        sortBy.sortProperty
      }&order=${order ? 'asc' : 'desc'}`,
    )
      .then(res => res.json())
      .then(arr => {
        setItems(arr);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [activeCategory, sortBy, order]);

  return (
    <>
      <div className="content__top">
        <Categories value={activeCategory} onChangeCategory={setActiveCategory} />
        <Sort value={sortBy} order={order} onChangeSort={setSortBy} onChangeOrder={setOrder} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map(({ ...props }) => <PizzaBlock key={props.title} {...props} />)}
      </div>
    </>
  );
};

export default Home;
