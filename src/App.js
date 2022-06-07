import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import './scss/app.scss';

function App() {
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
            <PizzaBlock title="Мексиканская" price={390} />
            <PizzaBlock title="С грибами" price={400} />
            <PizzaBlock title="Морская" price={590} />
            <PizzaBlock title="С говном" price={690} />
            <PizzaBlock title="Вегетарианская" price={890} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
