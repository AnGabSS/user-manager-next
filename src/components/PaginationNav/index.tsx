interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  pagesPerView?: number;
  setPageSize?: (newPageSize: number) => void;
}

const PaginationNav = ({
  page,
  totalPages,
  onPageChange,
  pagesPerView = 4,
  setPageSize,
}: PaginationProps) => {
  const startPage = Math.floor((page - 1) / pagesPerView) * pagesPerView + 1;
  const endPage = Math.min(startPage + pagesPerView - 1, totalPages);

  //Default button style, used when the button can be clicked
  //Estilo de botão padrão, usado quando o botão pode ser clicado
  const defaultButtonStyle =
    "bg-emerald-500 text-white hover:bg-emerald-600 transition delay-20 duration-100 ease-in-out hover:-translate-y-1 hover:scale-110";

  return (
    <nav className="flex justify-center items-center gap-2 py-4 flex-col md:flex-row text-sm md:text-md">
      <div className="flex justify-center items-center gap-2 py-4">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 rounded-md ${
            page === 1 ? "bg-gray-300 cursor-not-allowed" : defaultButtonStyle
          }`}
        >
          {"<"}
        </button>

        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-3 py-1 rounded-md ${
              pageNumber === page
                ? "bg-orange-500 text-white"
                : defaultButtonStyle
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded-md ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : defaultButtonStyle
          }`}
        >
          {">"}
        </button>
      </div>

      {setPageSize && (
        <article className="text-center">
          <select
            value={pagesPerView}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="bg-emerald-500 text-white rounded-md px-10 md:px-3 py-1 mx-4"
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </select>
          Items por página
        </article>
      )}
    </nav>
  );
};

export default PaginationNav;
