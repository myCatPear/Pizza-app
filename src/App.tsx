import React from 'react';
import './scss/app.scss';
import { Categories, Header, PizzaBlock, Sort } from './components';
import pizzasList from './assets/pizzaz.json';
import { PizzaType } from './common/types';

export const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {
              pizzasList.map((pizza) => {
                return <PizzaBlock
                  //title,price,sizes,id,imageUrl,category, rating,types
                  // title={title}
                  // price={price}
                  // imageUrl={imageUrl}
                  // sizes={sizes}
                  // typesPizza={types}
                  {...pizza}
                />;
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};