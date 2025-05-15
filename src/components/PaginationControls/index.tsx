interface PaginationProps {
    page: number;
    lastPage: number;
    onPageChange: (newPage: number) => void;
    pagesPerView?: number;
    pageSize?: number;
    setPageSize?: (newPageSize: number) => void;
}

const PaginationControls = ({
    page,
    lastPage,
    onPageChange,
    pagesPerView = 3,
    pageSize,
    setPageSize,

}: PaginationProps) => {
    const defaultButtonStyle =
        "bg-emerald-500 text-white hover:bg-emerald-600 transition delay-20 duration-100 ease-in-out hover:-translate-y-1 hover:scale-110";

    const getPages = () => {
        const pages: (number | "...")[] = [];

        if (lastPage <= pagesPerView) {
            for (let i = 1; i <= lastPage; i++) pages.push(i);
        } else {
            const left = Math.max(1, page - 1);
            const right = Math.min(lastPage, page + 1);

            if (left > 2) pages.push(1, "...");
            else for (let i = 1; i < left; i++) pages.push(i);

            for (let i = left; i <= right; i++) pages.push(i);

            if (right < lastPage - 1) pages.push("...", lastPage);
            else for (let i = right + 1; i <= lastPage; i++) pages.push(i);
        }

        return pages;
    };

    return (
        <nav className="flex justify-between items-center mt-4 flex-col md:flex-row gap-4 text-sm md:text-md">
            <div className="flex items-center gap-2 justify-center flex-wrap">
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                    className={`px-3 py-1 rounded-md ${page === 1 ? "bg-gray-300 cursor-not-allowed" : defaultButtonStyle
                        }`}
                >
                    {"<"}
                </button>

                {getPages().map((p, i) =>
                    p === "..." ? (
                        <span
                            key={`ellipsis-${i}`}
                            className="px-3 py-1 rounded-md bg-gray-300 text-gray-600 cursor-not-allowed"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => onPageChange(p)}
                            className={`px-3 py-1 rounded-md ${p === page
                                ? "bg-orange-500 text-white"
                                : defaultButtonStyle
                                }`}
                        >
                            {p}
                        </button>
                    )
                )}

                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === lastPage}
                    className={`px-3 py-1 rounded-md ${page === lastPage
                        ? "bg-gray-300 cursor-not-allowed"
                        : defaultButtonStyle
                        }`}
                >
                    {">"}
                </button>
            </div>

            {setPageSize && (
                <div className="flex items-center gap-2 text-white">
                    <label htmlFor="pageSize">Itens por página:</label>
                    <select
                        id="pageSize"
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        value={pageSize}
                        className="bg-emerald-500 text-white rounded-md p-1"
                    >
                        {[5, 10, 20, 50].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </nav>
    );
};

export default PaginationControls;
