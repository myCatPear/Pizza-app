import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss'

interface IPagination {
  onChangePage: (value:number) => void
}

export const Pagination:FC<IPagination> = (props) => {
  const {onChangePage} = props
  return (
    <>
      <ReactPaginate
        className={style.paginate}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={undefined}
      />
    </>
  );
};