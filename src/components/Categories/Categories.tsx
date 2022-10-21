import React, { FC } from 'react';

interface ICategories {
  categoryID: number | string,
  onSetCategoriesClick: (ID: number) => void
}

export const Categories: FC<ICategories> = (props) => {
  const { categoryID, onSetCategoriesClick } = props;
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className='categories'>
      <ul>
        {
          categories.map((category, index) => {
            return <li
              key={index}
              className={categoryID === index ? 'active' : ''}
              onClick={() => onSetCategoriesClick(index)}
            >{category}
            </li>;
          })
        }
      </ul>
    </div>
  );
};