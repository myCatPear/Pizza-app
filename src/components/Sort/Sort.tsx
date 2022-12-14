import React, { FC, LegacyRef, useEffect, useRef, useState } from 'react';
import { EMPTY_STRING } from 'common/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from 'store';
import { SortType } from 'common/types/sortType';
import { setSort } from 'store/slices/filterSlice';

export const sortValues: SortType[] = [
  { sortProperty: 'rating', name: 'популярности(DESC)', order: 'desc' },
  { sortProperty: 'rating', name: 'популярности(ASC)', order: 'asc' },
  { sortProperty: 'price', name: 'цене(DESC)', order: 'desc' },
  { sortProperty: 'price', name: 'цене(ASC)', order: 'asc' },
  { sortProperty: 'title', name: 'алфавиту(DESC)', order: 'desc' },
  { sortProperty: 'title', name: 'алфавиту(ASC)', order: 'asc' }
];


export const Sort: FC = () => {
  const sortType = useSelector<RootStateType, SortType>(state => state.filter.sort);
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement | null>(null);

  const [isVisiblePopup, setIsVisiblePopup] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // @ts-ignore
      if (!event.composedPath().includes(sortRef.current)) setIsVisiblePopup(false);
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, []);

  const onSetIsVisiblePopupSpanClick = () => setIsVisiblePopup(!isVisiblePopup);

  const onSetCurrentSortValueClick = (value: SortType) => {
    dispatch(setSort({ value }));
    setIsVisiblePopup(false);
  };

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span
          onClick={onSetIsVisiblePopupSpanClick}>{sortType.name}</span>
      </div>
      {
        isVisiblePopup && <div className='sort__popup'>
          <ul>
            {
              sortValues.map((value, index) => {

                return <li
                  key={index}
                  className={value.name === sortType.name ? 'active' : EMPTY_STRING}
                  onClick={() => onSetCurrentSortValueClick(value)}
                >
                  {value.name}
                </li>;
              })
            }
          </ul>
        </div>
      }

    </div>
  );
};