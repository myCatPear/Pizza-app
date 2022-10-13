import React, { FC, useContext, useEffect, useState } from 'react';
import { Categories, PizzaBlock, Sort, PizzaSkeleton, Pagination } from 'components';
import { PizzaType } from 'common/types';
import { SearchContext } from 'App';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../store';
import { setCategoryID } from '../../store/slices/filterSlice';
import { SortType } from '../../common/types/sortType';
import { pizzaAPI } from '../../api';

export const Home: FC = () => {
 const {searchValue} = useContext(SearchContext)
  const [items, setItems] = useState<PizzaType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const categoryID = useSelector<RootStateType, number >(state => state.filter.categoryID)
  const sortType = useSelector<RootStateType, SortType>(state => state.filter.sort)
  const dispatch = useDispatch()
  console.log(categoryID);
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
    // pizzaAPI.getPizzas(currentPage,4,sortType.sortProperty,sortType.order, ).then((res) => {
    //   setItems(res.data)
    //   setIsLoading(false);
    // })
    window.scrollTo(0, 0);
  }, [categoryID, baseUrl, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  const pizzas = items.map((pizza, index) => <PizzaBlock key={pizza.id} {...pizza} />);

  const handleSetCategoryID = (id:number) => {
    dispatch(setCategoryID({id}))
  }

  return (
    <>
      <div className='container'>
        <div className='content__top'>
          <Categories categoryID={categoryID} onSetCategoriesClick={handleSetCategoryID} />
          <Sort />
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
