import React from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import pizzas from './components/pizzas.json';

import './scss/app.scss';

function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://62a0f78a7b9345bcbe4358a7.mockapi.io/items')
      .then(res => res.json())
      .then(arr => {
        setItems(arr);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map(({ ...props }) => (
              <PizzaBlock key={props.title} {...props} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
