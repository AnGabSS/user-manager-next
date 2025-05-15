export interface PaginationInterface {
  page: number;
  totalPages: number;
  pagesPerView: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}
