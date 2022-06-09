import React from 'react';

function Categories({ activeCategory, setActiveCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => (
          <li
            onClick={() => setActiveCategory(categories[index])}
            key={el}
            className={activeCategory === categories[index] ? 'active' : ''}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
