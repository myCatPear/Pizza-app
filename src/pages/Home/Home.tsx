import React, { FC, useContext, useEffect, useRef } from 'react';
import { Categories, Pagination, PizzaBlock, PizzaSkeleton, Sort } from 'components';
import { PizzaType } from 'common/types';
import { useSelector } from 'react-redux';
import { RootStateType, useAppDispatch } from 'store';
import { setCategoryID, setCurrentPage, setFilters } from 'store/slices/filterSlice';
import { SortType } from 'common/types/sortType';
import { useDebounce } from 'common/hooks';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { sortValues } from 'components/Sort/Sort';
import { fetchPizzas, StatusType } from '../../store/slices/pizzasSlice';
import { selectFilterCategoryID } from '../../common/selectors';

export const Home: FC = () => {
  const navigate = useNavigate();
  const searchValue = useSelector<RootStateType, string>(state => state.filter.searchValue)
  const categoryID = useSelector<RootStateType, number | string>(selectFilterCategoryID);
  const sortType = useSelector<RootStateType, SortType>(state => state.filter.sort);
  const currentPage = useSelector<RootStateType, number | string>(state => state.filter.currentPage);
  const items = useSelector<RootStateType, PizzaType[]>(state => state.pizzas.items);
  const status = useSelector<RootStateType, StatusType>(state => state.pizzas.status);
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const debounceSearch = useDebounce(searchValue, 500);
  let baseUrl = `https://63447feb242c1f347f8782db.mockapi.io/Items?page=${currentPage}&limit=4&sortBy=${sortType.sortProperty}&order=${sortType.order}`;


  const getPizzas = async () => {
    if (categoryID) baseUrl += `&category=${categoryID}`;
    if (debounceSearch) baseUrl += `&search=${debounceSearch}`;
    try {
      dispatch(fetchPizzas({baseUrl}));
      isSearch.current = true;
    } catch (error) {

    }

  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });
      const sort = sortValues.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({
        // @ts-ignore
        currentPage: params.currentPage,
        // @ts-ignore
        categoryID: params.categoryID,
        // @ts-ignore
        sort
      }));
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryID, baseUrl, currentPage, debounceSearch]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryID,
        currentPage
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryID, currentPage, sortType]);

  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  const pizzas = items.map((pizza) => <Link to={`/pizza/${pizza.id}`} key={pizza.id}><PizzaBlock {...pizza} /></Link>);

  const handleSetCategoryID = (id: number) => {
    dispatch(setCategoryID({ id }));
  };

  const onChangePage = (value: number) => {
    dispatch(setCurrentPage({ value }));
  };

  return (
    <>
      <div className='container'>
        <div className='content__top'>
          <Categories categoryID={categoryID}
                      onSetCategoriesClick={handleSetCategoryID} />
          <Sort />
        </div>
        <h2 className='content__title'>Все пиццы</h2>
        {status === 'error' ? (
          <div className="content__error-info">
            <h2>Произошла ошибка =(</h2>
            <p>Не удалось подключиться к серверу, попробуйте позже</p>
          </div>
        ) : (
          <div className='content__items'>
            {
              status === 'loading' ? skeletons : pizzas
            }
          </div>
        )
        }

        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};
