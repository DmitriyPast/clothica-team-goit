import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      previousLabel="←"
      onPageChange={selected => onPageChange(selected.selected + 1)}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}