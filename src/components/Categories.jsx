import React from 'react';

function Categories({ value, onChangeCategory }) {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];
  const categoriesRu = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categoriesRu.map((el, index) => (
          <li
            onClick={() => onChangeCategory(categories[index])}
            key={el}
            className={value === categories[index] ? 'active' : ''}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
