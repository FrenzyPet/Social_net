import classes from './Pagination.module.css';

const Pagination = ({ totalCount, pageSize, currentPage, onPageChanged }) => {

  const pagesCount = Math.ceil(totalCount / pageSize)
  let pages = Array.from({ length: pagesCount }, (_, index) => index + 1);

  const curP = currentPage;
  let slicedPages = []
  if (curP >= 1 && curP <=6) {
    slicedPages = pages.slice(0, 11)
  } else if (pagesCount - curP <= 5) {
    slicedPages = pages.slice(pagesCount - 11, pagesCount)
  } else if (curP > 6) {
    slicedPages = pages.slice(curP - 6, curP + 5)
  }

  const paginationElements = slicedPages.map(item => {
    return (
      <li key={item} className={classes.pagination__item + (currentPage === item ? ` ${classes.pagination__item_current}` : '')}
          onClick={ () => onPageChanged(item) }>
            {item}
      </li>
    )
  })

  return (
    <ul className={classes.pagination}>
      { paginationElements }
    </ul>
  )
}

export default Pagination;