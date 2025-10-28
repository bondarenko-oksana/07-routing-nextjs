import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className= { css.wrapper } >
    
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        pageCount={totalPages}
        forcePage={currentPage - 1}
        onPageChange={(ev) => onPageChange(ev.selected + 1)}
        containerClassName={css.pagination}
        pageClassName={css.page}
        activeClassName={css.active}
        disabledClassName={css.disabled}
      />
    </div>
  );
}