import React, { useState } from 'react';

export const Categories = () => {
  const DEFAULT_ACTIVE_INDEX = 0;

  const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE_INDEX);

  const categories = ['Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые'];

  const onCategoryClick = (index:number) => setActiveIndex(index)

  return (
    <div className='categories'>
      <ul>
        {
          categories.map((category,index) => {
            return <li
              key={index}
              className={activeIndex === index ?"active" : ""}
              onClick={() => onCategoryClick(index)}
            >{category}
            </li>
          })
        }
      </ul>
    </div>
  );
};