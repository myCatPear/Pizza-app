import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Categories, PizzaBlock, Sort, PizzaSkeleton, Pagination } from 'components';
import { PizzaType } from 'common/types';
import { SearchContext } from 'App';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from 'store';
import { setCategoryID, setCurrentPage, setFilters } from 'store/slices/filterSlice';
import { SortType } from 'common/types/sortType';
import axios from 'axios';
import { useDebounce } from 'common/hooks';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { sortValues } from 'components/Sort/Sort';

export const Home: FC = () => {
  const navigate = useNavigate();
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState<PizzaType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const categoryID = useSelector<RootStateType, number | string>(state => state.filter.categoryID);
  const sortType = useSelector<RootStateType, SortType>(state => state.filter.sort);
  const currentPage = useSelector<RootStateType, number | string>(state => state.filter.currentPage);
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const debounceSearch = useDebounce(searchValue, 500);
  // const [currentPage, setCurrentPage] = useState(1);
  let baseUrl = `https://63447feb242c1f347f8782db.mockapi.io/Items?page=${currentPage}&limit=4&sortBy=${sortType.sortProperty}&order=${sortType.order}`;
  if (categoryID) baseUrl += `&category=${categoryID}`;

  const fetchPizzas = () => {
    //setIsLoading(true);
    // fetch(baseUrl).then((res) => {
    //   return res.json();
    // }).then((json) => {
    //   setItems(json);
    //   setIsLoading(false);
    // });
    // pizzaAPI.getPizzas(currentPage,4,sortType.sortProperty,sortType.order, ).then((res) => {
    //   setItems(res.data)
    //   setIsLoading(false);
    // })
    if (debounceSearch) baseUrl += `&search=${debounceSearch}`;
    axios.get(baseUrl)
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    isSearch.current = true;
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
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
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

  const pizzas = items.map((pizza, index) => <PizzaBlock key={pizza.id} {...pizza} />);

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
        <div className='content__items'>
          {
            isLoading ? skeletons : pizzas
          }
        </div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};
