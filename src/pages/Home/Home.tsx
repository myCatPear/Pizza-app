import React, { FC, useEffect, useState } from 'react';
import { Categories, PizzaBlock, Sort, PizzaSkeleton, Pagination } from 'components';
import { PizzaType } from 'common/types';

interface IHome {
  searchValue: string;
}

export const Home: FC<IHome> = (props) => {
  const { searchValue } = props;
  const DEFAULT_CATEGORY_ID = 0;
  const DEFAULT_SORT_TYPE = {
    sortProperty: 'rating',
    name: 'популярности(DESC)',
    order: 'desc'
  };
  const [items, setItems] = useState<PizzaType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryID, setCategoryID] = useState(DEFAULT_CATEGORY_ID);
  const [sortType, setSortType] = useState(DEFAULT_SORT_TYPE);
  const [currentPage, setCurrentPage] = useState(1);
  let baseUrl = `https://63447feb242c1f347f8782db.mockapi.io/Items?page=${currentPage}&limit=4&sortBy=${sortType.sortProperty}&order=${sortType.order}`;
  if (categoryID) baseUrl += `&category=${categoryID}`;
  if (searchValue) baseUrl += `&search=${searchValue}`;
  useEffect(() => {
    setIsLoading(true);
    fetch(baseUrl).then((res) => {
      return res.json();
    }).then((json) => {
      setItems(json);
      setIsLoading(false);
    });
    window.scrollTo(0, 0);
  }, [categoryID, sortType, baseUrl, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  const pizzas = items.map((pizza, index) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <>
      <div className='container'>
        <div className='content__top'>
          <Categories categoryID={categoryID} onSetCategoriesClick={setCategoryID} />
          <Sort sortType={sortType} onSetSortTypeClick={setSortType} />
        </div>
        <h2 className='content__title'>Все пиццы</h2>
        <div className='content__items'>
          {
            isLoading ? skeletons : pizzas
          }
        </div>
        <Pagination onChangePage={setCurrentPage}/>
      </div>
    </>
  );
};
