import { FC } from 'react';
import * as React from 'react';
import style from './Pagination.module.css';
import classnames from 'classnames';

type PropsType = {
  totalCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber : number) => void
}

const Pagination: FC<PropsType> = ({ totalCount, pageSize, currentPage, onPageChanged }) => {

  const pagesCount = Math.ceil(totalCount / pageSize)
  let pages = Array.from({ length: pagesCount }, (_, index) => index + 1);

  const curP = currentPage;
  let slicedPages: Array<number> = []
  if (curP >= 1 && curP <=5) {
    slicedPages = pages.slice(0, 9)
  } else if (curP > 5) {
    if (pagesCount > 9) {
      slicedPages = pages.slice(curP - 5, curP + 4)
    } else {
      slicedPages = pages
    }
  } else if (pagesCount - curP <= 4) {
    slicedPages = pages.slice(pagesCount - 9, pagesCount)
  }

  const paginationElements = slicedPages.map(item => {
    return (
      <li key={item} className={style.pagination__item + (currentPage === item ? ` ${style.pagination__item_current}` : '')}
          onClick={ () => onPageChanged(item) }>
            {item}
      </li>
    )
  })

  return (
    <div className={style.paginationWrapper}>
      <span onClick={ () => onPageChanged(1) } className={classnames(style.pagination__item, style.pagination__item__first)}>First</span>
      <ul className={style.pagination}>
        { paginationElements }
      </ul>
      <span onClick={ () => onPageChanged(pagesCount) } className={classnames(style.pagination__item, style.pagination__item__last)}>Last</span>
    </div>
  )
}

export default Pagination;