import React from 'react';
import './scss/app.scss';
import { Categories, Header, PizzaBlock, Sort } from './components';

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
            <PizzaBlock title={'Мексиканская'} price={200}/>
            <PizzaBlock title={'Гавайская'} price={300}/>
          </div>
        </div>
      </div>
    </div>
  );
};