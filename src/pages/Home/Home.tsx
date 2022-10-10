import React, { useEffect, useState } from 'react';
import { Categories, PizzaBlock, Sort } from 'components';
import { PizzaSkeleton } from 'components/Skeleton';
import { PizzaType } from 'common/types';

export const Home = () => {
  const [items,setItems] = useState<PizzaType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://63447feb242c1f347f8782db.mockapi.io/Items').then((res) => {
      return res.json();
    }).then((json) => {
      setItems(json)
      setIsLoading(false)
    });
  },[])
  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {
          isLoading ?  [...new Array(6)].map((_, index) => <PizzaSkeleton key={index}/>)
            : items.map((pizza, index) => {
              return <PizzaBlock
                key={pizza.id}
                {...pizza}
              />;
            })
        }
      </div>
    </>
  );
};
