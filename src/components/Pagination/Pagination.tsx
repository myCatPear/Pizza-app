import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss'

interface IPagination {
  onChangePage: (value:number) => void,
  currentPage:number
}

export const Pagination:FC<IPagination> = (props) => {
  const {onChangePage,currentPage} = props
  return (
    <>
      <ReactPaginate
        className={style.paginate}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={undefined}
      />
    </>
  );
};