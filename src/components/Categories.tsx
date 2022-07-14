import React from 'react';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

type CategoriesProps = {
  value: string;
  onChangeCategory: (i: string) => void;
};

const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];
const categoriesRu = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
  useWhyDidYouUpdate('Categories', { value, onChangeCategory });

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
});

export default Categories;
